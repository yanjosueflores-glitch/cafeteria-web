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

    const refComentarios = db.ref("comentarios");

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

//activa el color dorado de las secciones nosotros, carta, promociones, reservas y comentarios al hacer clic en ellas y desactiva el color dorado de las demás secciones
document.addEventListener("DOMContentLoaded", () => {
   
    const currentPage = window.location.pathname.split("/").pop();
   
    const menuLinks = document.querySelectorAll(".menu li a");

    menuLinks.forEach(link => {
 
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});


 // Definimos la duración inicial de la oferta (ejemplo: 1 hora, 45 minutos, 30 segundos)
  let totalTimeInSeconds = (1 * 3600) + (45 * 60) + 30;

  function updateCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (totalTimeInSeconds <= 0) {
      totalTimeInSeconds = 2 * 3600;
    }

    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    totalTimeInSeconds--;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown(); 


  
  // Ejecutamos cada 1 segundo (1000 ms)
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Ejecutar inmediatamente al cargar la página


 const API_KEY = 'TU_API_KEY_AQUI'; // Consigue tu clave gratuita en openweathermap.org
const CIUDAD = 'Lima,PE';

async function obtenerClimaActual() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&units=metric&lang=es&appid=${API_KEY}`
    );
    const data = await res.json();
    
    const temp = Math.round(data.main.temp);
    const descripcionRaw = data.weather[0].description;
    const iconCode = data.weather[0].icon; 
    const esNoche = iconCode.endsWith('n'); // Detecta si en Lima ya oscureció

    // Formatear texto en español correcto
    let estadoTexto = descripcionRaw.charAt(0).toUpperCase() + descripcionRaw.slice(1);
    
    // Ajustar texto si es de noche y el reporte dice "cielo claro"
    if (esNoche && estadoTexto.toLowerCase().includes('claro')) {
      estadoTexto = 'Despejado';
    }

    // Actualizar texto en HTML
    document.getElementById('weather-text').textContent = `${temp}°C - ${estadoTexto}`;

    // Cambiar ícono dinámicamente desde OpenWeatherMap
    const iconImg = document.getElementById('weather-icon');
    if (iconImg) {
      iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

  } catch (error) {
    console.error('Error al consultar el clima:', error);
    // Si falla la conexión, muestra un estado nocturno por defecto
    document.getElementById('weather-text').textContent = '18°C - Nublado';
  }
}

// Llama a la función al cargar la página
obtenerClimaActual();

// Opcional: Actualiza el clima automáticamente cada 15 minutos (900,000 ms)
setInterval(obtenerClimaActual, 900000);