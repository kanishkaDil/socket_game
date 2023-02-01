package main

import (
	"fmt"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func main() {
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":8000", nil)

	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})
	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", server)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":8000", nil)
}
