package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	loadEnvFile(filepath.Join(filepath.Dir(mustExePath()), ".env"))

	cfg := ConfigFromEnv()

	conn, err := sql.Open("postgres", cfg.DSN())
	if err != nil {
		log.Fatalf("configurar conexão: %v", err)
	}

	// O site funciona sem banco: a API fica indisponível (503) e o
	// frontend usa os dados de exemplo embutidos.
	var db *sql.DB
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := conn.PingContext(ctx); err != nil {
		log.Printf("AVISO: banco indisponível (%v) — a API de imóveis ficará fora do ar e o site usará os dados de exemplo", err)
		conn.Close()
	} else {
		db = conn
		defer db.Close()
		log.Printf("conectado ao banco %s@%s:%s/%s", cfg.DBUser, cfg.DBHost, cfg.DBPort, cfg.DBName)
	}

	app := &App{db: db}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/imoveis", app.listImoveis)
	mux.HandleFunc("GET /api/imoveis/{id}", app.getImovel)
	mux.HandleFunc("GET /api/empresa", app.getEmpresa)
	mux.Handle("/", staticHandler(cfg.SiteDir))

	addr := ":" + cfg.Port
	log.Printf("servidor em http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}

func mustExePath() string {
	if exe, err := os.Executable(); err == nil {
		if abs, err := filepath.Abs(exe); err == nil {
			return abs
		}
	}
	return "."
}
