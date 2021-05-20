package main

import (
    "embed"
    "io/fs"
    "log"
    "net/http"
    "os"
    "fmt"
    "html"
)

func main() {
    useOS := len(os.Args) > 1 && os.Args[1] == "live"
    http.Handle("/", http.FileServer(getFileSystem(useOS)))
    http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })
    http.ListenAndServe(":8888", nil)
}

//go:embed ui/build
var embededFiles embed.FS

func getFileSystem(useOS bool) http.FileSystem {
    if useOS {
        log.Print("using live mode")
        return http.FS(os.DirFS("static"))
    }

    log.Print("using embed mode")
    fsys, err := fs.Sub(embededFiles, "ui/build")
    if err != nil {
        panic(err)
    }

    return http.FS(fsys)
}
