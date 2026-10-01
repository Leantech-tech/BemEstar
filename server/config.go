package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

// Config agrupa as variáveis de ambiente do servidor.
type Config struct {
	DBHost  string
	DBPort  string
	DBName  string
	DBUser  string
	DBPass  string
	Port    string
	SiteDir string
}

// ConfigFromEnv lê a configuração das variáveis de ambiente,
// aplicando valores padrão quando não definidas.
func ConfigFromEnv() Config {
	return Config{
		DBHost:  envOr("DB_HOST", "148.230.78.155"),
		DBPort:  envOr("DB_PORT", "5031"),
		DBName:  envOr("DB_NAME", "locacao"),
		DBUser:  envOr("DB_USER", "postgres"),
		DBPass:  os.Getenv("DB_PASSWORD"),
		Port:    envOr("PORT", "8080"),
		SiteDir: envOr("SITE_DIR", ".."),
	}
}

// DSN monta a string de conexão do PostgreSQL.
func (c Config) DSN() string {
	dsn := fmt.Sprintf(
		"host=%s port=%s dbname=%s user=%s sslmode=disable connect_timeout=3",
		c.DBHost, c.DBPort, c.DBName, c.DBUser,
	)
	if c.DBPass != "" {
		dsn += " password=" + c.DBPass
	}
	return dsn
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// loadEnvFile carrega um arquivo .env simples (linhas CHAVE=VALOR),
// sem sobrescrever variáveis já definidas no ambiente.
func loadEnvFile(path string) {
	data, err := os.ReadFile(path)
	if err != nil {
		return
	}
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		key, value, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		key = strings.TrimSpace(key)
		value = strings.Trim(strings.TrimSpace(value), `"'`)
		if _, exists := os.LookupEnv(key); !exists {
			os.Setenv(key, value)
		}
	}
	if abs, err := filepath.Abs(path); err == nil {
		log.Printf("carregado %s", abs)
	}
}
