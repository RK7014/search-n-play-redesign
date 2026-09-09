# ---- Build ----
FROM golang:1.27-alpine AS build
WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/server ./cmd/server

# ---- Runtime ----
FROM alpine:3.20
RUN apk add --no-cache ca-certificates && \
    adduser -D -u 10001 appuser
COPY --from=build /out/server /usr/local/bin/server

USER appuser
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/server"]
