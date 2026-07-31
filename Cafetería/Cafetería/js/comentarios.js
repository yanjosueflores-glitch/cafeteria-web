
    // Configuración de tu proyecto Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDwFpW_mjXwUquo7YftNUIfI__f-bL492I",
        authDomain: "estacion-cafe.firebaseapp.com",
        databaseURL: "https://estacion-cafe-default-rtdb.firebaseio.com",
        projectId: "estacion-cafe",
        storageBucket: "estacion-cafe.firebasestorage.app",
        messagingSenderId: "892634658481",
        appId: "1:892634658481:web:bda27aa5c3b78668cfd490"
    };

    // Inicializamos Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Referencia a la "carpeta" de comentarios dentro de la base de datos
    const refComentarios = db.ref("comentarios");

    // Función que dibuja todos los comentarios en pantalla
    function mostrarComentarios(comentarios) {
        let lista = document.getElementById("listaComentarios");
        lista.innerHTML = "";

        comentarios.forEach(function(c) {
            let bloque = `
                <div class="comentario">
                    <h3>${c.nombre}</h3>
                    <p>${c.estrellas}</p>
                    <p>${c.comentario}</p>
                    <small>${c.fecha}</small>
                </div>
            `;
            lista.innerHTML += bloque;
        });
    }

    // Escuchamos cambios en tiempo real: cada vez que alguien agrega
    // un comentario (tú o cualquier visitante), esto se ejecuta automáticamente
    refComentarios.on("value", function(snapshot) {
        let datos = snapshot.val();
        let comentarios = [];

        if (datos) {
            comentarios = Object.values(datos);
        }

        mostrarComentarios(comentarios);
    });

    // Evento del formulario
    document.getElementById("formComentario").addEventListener("submit", function(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombreComentario").value;
        let estrellas = document.getElementById("calificacion").value;
        let comentario = document.getElementById("textoComentario").value;
        let fecha = new Date().toLocaleDateString();

        let nuevoComentario = {
            nombre: nombre,
            estrellas: estrellas,
            comentario: comentario,
            fecha: fecha
        };

        // Guardamos el comentario en Firebase (no en localStorage)
        refComentarios.push(nuevoComentario);

        this.reset();
    });
