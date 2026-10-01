# ============================================================
# 1. Estágio Frontend: Compilação dos assets JS com esbuild
# ============================================================
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# ============================================================
# 2. Estágio Backend: Compilação do servidor em Go
# ============================================================
FROM golang:1.24-alpine AS backend-builder
ENV GOTOOLCHAIN=auto
WORKDIR /app
COPY server/go.mod server/go.sum ./server/
WORKDIR /app/server
RUN go mod download
COPY server/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server-app .

# ============================================================
# 3. Estágio Final: Imagem leve de produção (Alpine)
# ============================================================
FROM alpine:latest
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copia os arquivos do frontend compilados
COPY --from=frontend-builder /app/index.html ./index.html
COPY --from=frontend-builder /app/assets ./assets

# Copia o executável do servidor Go
COPY --from=backend-builder /app/server-app ./server-app

# Variáveis de ambiente para o container
ENV PORT=8080
ENV SITE_DIR=.

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:8080/ || exit 1

CMD ["./server-app"]
