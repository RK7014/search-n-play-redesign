// Package migrations embeds the SQL migration files so the server binary
// can apply them on startup without requiring a separate CLI tool.
package migrations

import "embed"

//go:embed *.sql
var Files embed.FS
