package main

import (
	"os"
	"testing"
)

func TestConfigFromEnvDefaultsToCurrentSiteDir(t *testing.T) {
	old := map[string]*string{}
	for _, key := range []string{"SITE_DIR", "PORT", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"} {
		if v, ok := getenv(key); ok {
			value := v
			old[key] = &value
		} else {
			old[key] = nil
		}
		osUnsetenv(key)
	}
	defer func() {
		for _, key := range []string{"SITE_DIR", "PORT", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"} {
			if old[key] == nil {
				osUnsetenv(key)
			} else {
				osSetenv(key, *old[key])
			}
		}
	}()

	cfg := ConfigFromEnv()
	if cfg.SiteDir != "." {
		t.Fatalf("SiteDir esperado '.'; recebido %q", cfg.SiteDir)
	}
	if cfg.Port != "8080" {
		t.Fatalf("Port esperado '8080'; recebido %q", cfg.Port)
	}
}

func getenv(key string) (string, bool) {
	v, ok := os.LookupEnv(key)
	return v, ok
}

func osUnsetenv(key string) {
	_ = os.Unsetenv(key)
}

func osSetenv(key, value string) {
	_ = os.Setenv(key, value)
}
