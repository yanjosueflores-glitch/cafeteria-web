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


// Configuración e inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwFpW_mjXwUquo7YftNUIfI__f-bL492I",
    authDomain: "estacion-cafe.firebaseapp.com",
    databaseURL: "https://estacion-cafe-default-rtdb.firebaseio.com",
    projectId: "estacion-cafe",
    storageBucket: "estacion-cafe.firebasestorage.app",
    messagingSenderId: "892634658481",
    appId: "1:892634658481:web:bda27aa5c3b78668cfd490"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const refReservas = db.ref("reservas");

// Array temporal que guarda los items de la comanda mientras se llena el formulario
let ordenActual = [];

// Dibuja la lista de items de la comanda que se van agregando
function mostrarOrdenActual() {
    let lista = document.getElementById("listaOrden");
    lista.innerHTML = "";

    ordenActual.forEach(function(item, index) {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item}
            <button type="button" class="btn btn-sm btn-outline-danger btn-quitar-item" data-index="${index}">✕</button>
        `;
        lista.appendChild(li);
    });
}

// Botón "Añadir" de la comanda personalizada
document.getElementById("btnAgregarOrden").addEventListener("click", function() {
    let input = document.getElementById("inputOrden");
    let texto = input.value.trim();

    if (texto === "") return;

    ordenActual.push(texto);
    mostrarOrdenActual();

    input.value = "";
    input.focus();
});

// Quitar un item de la comanda antes de enviar la reserva
document.getElementById("listaOrden").addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-quitar-item")) {
        let index = e.target.dataset.index;
        ordenActual.splice(index, 1);
        mostrarOrdenActual();
    }
});

// Dibuja la tabla completa de reservas registradas
function mostrarReservas(reservas) {
    let tbody = document.querySelector("#tablaReservas tbody");
    tbody.innerHTML = "";

    reservas.forEach(function(r) {
        let ordenTexto = (r.orden && r.orden.length > 0)
            ? r.orden.join(", ")
            : "—";

        let fila = `
            <tr>
                <td>${r.nombre}</td>
                <td>${r.correo}</td>
                <td>${r.fecha}</td>
                <td>${r.hora}</td>
                <td>${r.personas}</td>
                <td>${ordenTexto}</td>
            </tr>
        `;

        tbody.innerHTML += fila;
    });
}

// Escuchar cambios de Firebase en tiempo real
refReservas.on("value", function(snapshot) {
    let datos = snapshot.val();
    let reservas = [];

    if (datos) {
        reservas = Object.values(datos);
    }

    mostrarReservas(reservas);
});

// Envío del formulario de reserva
document.getElementById("formReserva").addEventListener("submit", function(e) {

    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let personas = document.getElementById("personas").value;

    let nuevaReserva = {
        nombre: nombre,
        correo: correo,
        fecha: fecha,
        hora: hora,
        personas: personas,
        orden: ordenActual
    };

    // Guardamos la reserva en Firebase
    refReservas.push(nuevaReserva);

    // Reiniciamos la comanda temporal para la siguiente reserva
    ordenActual = [];
    mostrarOrdenActual();

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


// Ejecutar al cargar la página y actualizar en segundo plano
document.addEventListener('DOMContentLoaded', () => {
  let userLat = -12.0464;
  let userLon = -77.0428;

  const initWeather = (lat, lon) => {
    userLat = lat;
    userLon = lon;
    getWeatherData(userLat, userLon);
  };

  // 1. Carga inicial
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => initWeather(pos.coords.latitude, pos.coords.longitude),
      () => initWeather(userLat, userLon)
    );
  } else {
    initWeather(userLat, userLon);
  }

  // 2. Auto-actualización cada 15 minutos (900,000 milisegundos)
  setInterval(() => {
    getWeatherData(userLat, userLon);
  }, 900000);
});

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene la ruta de la página actual (ej. "nosotros.html")
    const currentPage = window.location.pathname.split("/").pop();
    
    // Selecciona todos los enlaces dentro del menú
    const menuLinks = document.querySelectorAll(".menu li a");

    menuLinks.forEach(link => {
        // Compara el href del enlace con la página actual
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el nombre del archivo de la URL actual (ej: "carta.html")
    const currentPage = window.location.pathname.split("/").pop();
    
    // Selecciona todos los enlaces dentro del menú
    const menuLinks = document.querySelectorAll(".menu li a");

    menuLinks.forEach(link => {
        // Compara el valor href del enlace con el nombre del archivo actual
        // Si coinciden, añade la clase 'active'
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
      // Si llega a cero, reiniciamos la oferta a 2 horas para mantener la escasez activa
      totalTimeInSeconds = 2 * 3600;
    }

    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    // Formato con dos dígitos (ej. 01, 05, 09)
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    totalTimeInSeconds--;
  }

  // Ejecutamos cada 1 segundo (1000 ms)
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Ejecutar inmediatamente al cargar la página


  
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