//ANIMACIÓN DEL LOGO AL CARGAR LA PÁGINA
  document.addEventListener('DOMContentLoaded', () => {
            const logo = document.querySelector('header > a img');

            if (logo) {
                logo.classList.remove('prendido');
                void logo.offsetWidth;
                logo.classList.add('prendido');

                logo.addEventListener('animationend', () => {
                    logo.classList.remove('prendido');
                }, { once: true });
            }
        });

        
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


    // relaliza el funcionamiento de preder y apagar el modo oscuro y claro, ademas de guardar la preferencia del usuario en localStorage

document.addEventListener('DOMContentLoaded', () => {
  const btnTheme = document.getElementById('toggle-theme');

  // 1. Verificar si el usuario ya tenía activado el modo oscuro anteriormente
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // 2. Evento para alternar el tema al hacer clic
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      // Guardar la preferencia en localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
});