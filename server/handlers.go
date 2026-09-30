package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

// ImovelDTO é o formato exposto à API, pronto para o frontend consumir.
type ImovelDTO struct {
	ID           string   `json:"id"`
	Code         string   `json:"code"`
	Name         string   `json:"name"`
	Type         string   `json:"type"`
	Location     string   `json:"location"`
	Address      string   `json:"address"`
	Reference    string   `json:"referencePoint"`
	Capacity     int      `json:"capacity"`
	Bedrooms     int      `json:"bedrooms"`
	Suites       int      `json:"suites"`
	Beds         int      `json:"beds"`
	DoubleBeds   int      `json:"doubleBeds"`
	SingleBeds   int      `json:"singleBeds"`
	BunkBeds     int      `json:"bunkBeds"`
	SofaBeds     int      `json:"sofaBeds"`
	Bathrooms    int      `json:"bathrooms"`
	Parking      int      `json:"parkingSpaces"`
	SizeM2       *int     `json:"sizeM2"`
	Price        *string  `json:"price"`
	DailyPrice   *float64 `json:"dailyPrice"`
	WeekendPrice *float64 `json:"weekendPrice"`
	CleaningFee  *float64 `json:"cleaningFee"`
	SecurityDep  *float64 `json:"securityDeposit"`
	PriceNotes   string   `json:"priceNotes"`
	Available    bool     `json:"available"`
	Description  string   `json:"description"`
	Amenities    []string `json:"amenities"`
	Images       []string `json:"images"`
	Featured     bool     `json:"featured"`
	Checkin      string   `json:"checkin"`
	Checkout     string   `json:"checkout"`
	MinStay      int      `json:"minStay"`
	PetsAllowed  bool     `json:"petsAllowed"`
	EventsAllowed bool    `json:"eventsAllowed"`
	SmokingAllowed bool   `json:"smokingAllowed"`
	HouseRules   string   `json:"houseRules"`
	GuestInfo    string   `json:"guestInstructions"`
}

type App struct {
	db *sql.DB
}

// EmpresaDTO expõe os dados públicos da empresa vinculada ao site.
type EmpresaDTO struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	LegalName string `json:"legalName"`
	WhatsApp  string `json:"whatsapp"`
	Email     string `json:"email"`
	Address   string `json:"address"`
	City      string `json:"city"`
	State     string `json:"state"`
	Logo      string `json:"logo"`
}

// getEmpresa retorna os dados públicos da empresa vinculada via
// WhatsApp (?whatsapp=...). Sem correspondência, 404.
func (a *App) getEmpresa(w http.ResponseWriter, r *http.Request) {
	if a.db == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "banco de dados indisponível"})
		return
	}

	empresaID, ok := a.resolveEmpresa(r, r.URL.Query().Get("whatsapp"))
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "empresa não encontrada"})
		return
	}

	var e EmpresaDTO
	err := a.db.QueryRowContext(r.Context(), `
		SELECT id, coalesce(nullif(nome_fantasia, ''), razao_social, ''),
		       coalesce(razao_social, ''), coalesce(whatsapp, ''),
		       coalesce(email, ''), coalesce(endereco, ''),
		       coalesce(cidade, ''), coalesce(uf, ''), coalesce(logotipo_url, '')
		FROM empresas
		WHERE id = $1::uuid`, empresaID).Scan(
		&e.ID, &e.Name, &e.LegalName, &e.WhatsApp,
		&e.Email, &e.Address, &e.City, &e.State, &e.Logo,
	)
	if err != nil {
		respondError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, e)
}

// listImoveis retorna os imóveis ativos da empresa vinculada via
// WhatsApp (?whatsapp=...). Sem vínculo válido, retorna lista vazia.
func (a *App) listImoveis(w http.ResponseWriter, r *http.Request) {
	if a.db == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "banco de dados indisponível"})
		return
	}
	empresaID, ok := a.resolveEmpresa(r, r.URL.Query().Get("whatsapp"))
	if !ok {
		writeJSON(w, http.StatusOK, []ImovelDTO{})
		return
	}

	imoveis, err := a.fetchImoveis(r, "", empresaID)
	if err != nil {
		respondError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, imoveis)
}

// getImovel retorna um imóvel específico da empresa vinculada (ou 404).
func (a *App) getImovel(w http.ResponseWriter, r *http.Request) {
	if a.db == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "banco de dados indisponível"})
		return
	}
	id := r.PathValue("id")
	if !isUUID(id) {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "imóvel não encontrado"})
		return
	}

	empresaID, ok := a.resolveEmpresa(r, r.URL.Query().Get("whatsapp"))
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "imóvel não encontrado"})
		return
	}

	imoveis, err := a.fetchImoveis(r, id, empresaID)
	if err != nil {
		respondError(w, err)
		return
	}
	if len(imoveis) == 0 {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "imóvel não encontrado"})
		return
	}
	writeJSON(w, http.StatusOK, imoveis[0])
}

const imoveisQuery = `
	SELECT id, codigo, titulo, tipo, bairro, cidade,
	       endereco, numero, complemento, uf, cep, ocultar_endereco, ponto_referencia,
	       capacidade, quartos, suites, banheiros,
	       camas_casal, camas_solteiro, beliches, sofas_cama, vagas,
	       descricao_curta, descricao_completa,
	       valor_diaria, valor_diaria_fim_semana, taxa_limpeza, caucao, observacao_valores,
	       checkin_padrao::text, checkout_padrao::text, estadia_minima,
	       aceita_animais, permite_eventos, permite_fumar,
	       regras_adicionais, instrucoes_hospede
	FROM imoveis
	WHERE status = 'ATIVO'
	  AND ($1 = '' OR id = $1::uuid)
	  AND empresa_id = $2::uuid
	ORDER BY codigo`

// resolveEmpresa encontra a empresa pelo número de WhatsApp (somente
// dígitos, tolerando máscara/prefixo no cadastro). Sem correspondência,
// ok == false e nenhum dado deve ser exposto.
func (a *App) resolveEmpresa(r *http.Request, whatsapp string) (id string, ok bool) {
	digits := onlyDigits(whatsapp)
	if digits == "" {
		return "", false
	}

	err := a.db.QueryRowContext(r.Context(), `
		SELECT id FROM empresas
		WHERE regexp_replace(coalesce(whatsapp, ''), '\D', '', 'g') = $1
		LIMIT 1`, digits).Scan(&id)
	if err != nil {
		return "", false
	}
	return id, true
}

// onlyDigits remove tudo que não for número da string.
func onlyDigits(s string) string {
	var sb strings.Builder
	for _, c := range s {
		if c >= '0' && c <= '9' {
			sb.WriteRune(c)
		}
	}
	return sb.String()
}

func (a *App) fetchImoveis(r *http.Request, id, empresaID string) ([]ImovelDTO, error) {
	rows, err := a.db.QueryContext(r.Context(), imoveisQuery, id, empresaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []ImovelDTO
	index := map[string]int{}

	for rows.Next() {
		var (
			it                                          ImovelDTO
			tipo, bairro, cidade                        sql.NullString
			endereco, numero, complemento               sql.NullString
			uf, cep                                     sql.NullString
			ocultarEndereco                             sql.NullBool
			pontoReferencia                             sql.NullString
			capacity, bedrooms, suites, bathrooms       sql.NullInt64
			camasCasal, camasSolteiro, beliches, sofas  sql.NullInt64
			vagas, estadiaMinima                        sql.NullInt64
			descCurta, descCompleta                     sql.NullString
			diaria, diariaFds                           sql.NullFloat64
			taxaLimpeza, caucao                         sql.NullFloat64
			obsValores                                  sql.NullString
			checkin, checkout                           sql.NullString
			aceitaAnimais, permiteEventos, permiteFumar sql.NullBool
			regras, instrucoes                          sql.NullString
		)
		if err := rows.Scan(
			&it.ID, &it.Code, &it.Name, &tipo, &bairro, &cidade,
			&endereco, &numero, &complemento, &uf, &cep, &ocultarEndereco, &pontoReferencia,
			&capacity, &bedrooms, &suites, &bathrooms,
			&camasCasal, &camasSolteiro, &beliches, &sofas, &vagas,
			&descCurta, &descCompleta,
			&diaria, &diariaFds, &taxaLimpeza, &caucao, &obsValores,
			&checkin, &checkout, &estadiaMinima,
			&aceitaAnimais, &permiteEventos, &permiteFumar,
			&regras, &instrucoes,
		); err != nil {
			return nil, err
		}

		it.Type = tipo.String
		it.Capacity = int(capacity.Int64)
		it.Bedrooms = int(bedrooms.Int64)
		it.Suites = int(suites.Int64)
		it.Bathrooms = int(bathrooms.Int64)
		it.DoubleBeds = int(camasCasal.Int64)
		it.SingleBeds = int(camasSolteiro.Int64)
		it.BunkBeds = int(beliches.Int64)
		it.SofaBeds = int(sofas.Int64)
		it.Beds = it.DoubleBeds + it.SingleBeds + it.BunkBeds + it.SofaBeds
		it.Parking = int(vagas.Int64)
		it.MinStay = int(estadiaMinima.Int64)
		it.PetsAllowed = aceitaAnimais.Bool
		it.EventsAllowed = permiteEventos.Bool
		it.SmokingAllowed = permiteFumar.Bool
		it.Available = true
		it.Featured = false
		it.Amenities = []string{}
		it.Images = []string{}
		it.Location = joinLocation(bairro.String, cidade.String)
		it.Address = buildAddress(endereco.String, numero.String, complemento.String,
			bairro.String, cidade.String, uf.String, cep.String, ocultarEndereco.Bool)
		it.Reference = pontoReferencia.String
		it.Description = firstNonEmpty(descCompleta.String, descCurta.String)
		it.PriceNotes = obsValores.String
		it.Checkin = trimTime(checkin.String)
		it.Checkout = trimTime(checkout.String)
		it.HouseRules = regras.String
		it.GuestInfo = instrucoes.String

		if diaria.Valid && diaria.Float64 > 0 {
			price := fmt.Sprintf("R$ %s / noite", formatBRL(diaria.Float64))
			it.Price = &price
			d := diaria.Float64
			it.DailyPrice = &d
		}
		if diariaFds.Valid && diariaFds.Float64 > 0 {
			f := diariaFds.Float64
			it.WeekendPrice = &f
		}
		if taxaLimpeza.Valid && taxaLimpeza.Float64 > 0 {
			v := taxaLimpeza.Float64
			it.CleaningFee = &v
		}
		if caucao.Valid && caucao.Float64 > 0 {
			v := caucao.Float64
			it.SecurityDep = &v
		}

		index[it.ID] = len(out)
		out = append(out, it)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	if len(out) == 0 {
		return out, nil
	}

	ids := make([]string, len(out))
	for i := range out {
		ids[i] = out[i].ID
	}

	if err := a.attachPhotos(r, out, index, ids); err != nil {
		return nil, err
	}
	if err := a.attachAmenities(r, out, index, ids); err != nil {
		return nil, err
	}
	return out, nil
}

func (a *App) attachPhotos(r *http.Request, out []ImovelDTO, index map[string]int, ids []string) error {
	rows, err := a.db.QueryContext(r.Context(), `
		SELECT imovel_id, url
		FROM imovel_midias
		WHERE tipo = 'FOTO' AND imovel_id = ANY($1::uuid[])
		ORDER BY capa DESC, ordem ASC`, pqArray(ids))
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var imovelID, url string
		if err := rows.Scan(&imovelID, &url); err != nil {
			return err
		}
		if i, ok := index[imovelID]; ok && url != "" {
			out[i].Images = append(out[i].Images, mediaURL(url))
		}
	}
	return rows.Err()
}

// mediaURL reescreve URLs do bucket privado (Garage/S3) para passarem
// pelo endpoint público da API de locação, que entrega o arquivo.
func mediaURL(u string) string {
	if strings.Contains(u, "s3.leantechautomacao.com.br") {
		return "https://apilocacao.leantechautomacao.com.br/api/v1/storage/object?url=" + url.QueryEscape(u)
	}
	return u
}

func (a *App) attachAmenities(r *http.Request, out []ImovelDTO, index map[string]int, ids []string) error {
	rows, err := a.db.QueryContext(r.Context(), `
		SELECT ic.imovel_id, c.nome
		FROM imovel_comodidades ic
		JOIN comodidades c ON c.id = ic.comodidade_id
		WHERE ic.imovel_id = ANY($1::uuid[])
		ORDER BY c.nome`, pqArray(ids))
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var imovelID, nome string
		if err := rows.Scan(&imovelID, &nome); err != nil {
			return err
		}
		if i, ok := index[imovelID]; ok && nome != "" {
			out[i].Amenities = append(out[i].Amenities, nome)
		}
	}
	return rows.Err()
}

func joinLocation(bairro, cidade string) string {
	switch {
	case bairro != "" && cidade != "":
		return bairro + " · " + cidade
	case cidade != "":
		return cidade
	default:
		return bairro
	}
}

// buildAddress monta o endereço completo em uma linha. Quando o
// cadastro pede para ocultar o endereço, mostra só bairro/cidade.
func buildAddress(endereco, numero, complemento, bairro, cidade, uf, cep string, ocultar bool) string {
	if ocultar {
		return joinLocation(bairro, cidade)
	}

	var parts []string
	street := strings.TrimSpace(strings.Join([]string{endereco, numero}, ", "))
	street = strings.TrimSuffix(street, ", ")
	if street != "" {
		parts = append(parts, street)
	}
	if complemento != "" {
		parts = append(parts, complemento)
	}
	if bairro != "" {
		parts = append(parts, bairro)
	}
	city := cidade
	if uf != "" {
		city = strings.TrimSpace(cidade + " - " + uf)
	}
	if city != "" && city != "-" {
		parts = append(parts, city)
	}
	if cep != "" {
		parts = append(parts, "CEP "+cep)
	}
	return strings.Join(parts, ", ")
}

// trimTime remove os segundos de um horário vindo do banco ("14:00:00" -> "14:00").
func trimTime(t string) string {
	if h, _, ok := strings.Cut(t, ":"); ok {
		if m, _, ok2 := strings.Cut(t[len(h)+1:], ":"); ok2 {
			return h + ":" + m
		}
	}
	return t
}

func firstNonEmpty(values ...string) string {
	for _, v := range values {
		if v != "" {
			return v
		}
	}
	return ""
}

// formatBRL formata um valor com separador de milhar e vírgula decimal.
func formatBRL(v float64) string {
	formatted := fmt.Sprintf("%.2f", v)
	intPart, frac, _ := strings.Cut(formatted, ".")
	if frac == "00" {
		frac = ""
	} else {
		frac = "," + frac
	}

	n := len(intPart)
	if n <= 3 {
		return intPart + frac
	}
	var sb strings.Builder
	for i, digit := range intPart {
		if i > 0 && (n-i)%3 == 0 {
			sb.WriteByte('.')
		}
		sb.WriteRune(digit)
	}
	return sb.String() + frac
}

func pqArray(ids []string) interface{} {
	return "{" + strings.Join(ids, ",") + "}"
}

// isUUID valida o formato básico de um UUID antes de usá-lo na query.
func isUUID(s string) bool {
	if len(s) != 36 {
		return false
	}
	for i, c := range s {
		if i == 8 || i == 13 || i == 18 || i == 23 {
			if c != '-' {
				return false
			}
			continue
		}
		if !(c >= '0' && c <= '9' || c >= 'a' && c <= 'f' || c >= 'A' && c <= 'F') {
			return false
		}
	}
	return true
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func respondError(w http.ResponseWriter, err error) {
	writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
}
