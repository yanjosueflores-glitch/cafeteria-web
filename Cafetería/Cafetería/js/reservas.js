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


// Array temporal que guarda los items de la comanda mientras se llena el formulario
let ordenActual = [];

// Cargamos las reservas guardadas anteriormente (o un array vacío si no hay ninguna)
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

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
function mostrarReservas() {
    let tbody = document.querySelector("#tablaReservas tbody");
    tbody.innerHTML = "";

    reservas.forEach(function(r) {
        let ordenTexto = r.orden.length > 0
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

    // Agregamos la reserva al array y la guardamos en localStorage
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Volvemos a dibujar la tabla completa
    mostrarReservas();

    // Reiniciamos la comanda temporal para la siguiente reserva
    ordenActual = [];
    mostrarOrdenActual();

    this.reset();

});

// Mostramos las reservas guardadas apenas se carga la página
mostrarReservas();


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


//reloj digital

function actualizarReloj() {
    const ahora = new Date();
    
    let horas = String(ahora.getHours()).padStart(2, '0');
    let minutos = String(ahora.getMinutes()).padStart(2, '0');
    let segundos = String(ahora.getSeconds()).padStart(2, '0');

    const reloj = document.getElementById('reloj-digital');
    if (reloj) {
        reloj.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

actualizarReloj();
setInterval(actualizarReloj, 1000);


actualizarReloj();
setInterval(actualizarReloj, 1000);


function actualizarReloj() {
    const ahora = new Date();
    
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const elemHoras = document.getElementById('horas');
    const elemMinutos = document.getElementById('minutos');
    const elemSegundos = document.getElementById('segundos');

    if (elemHoras && elemMinutos && elemSegundos) {
        elemHoras.textContent = horas;
        elemMinutos.textContent = minutos;
        elemSegundos.textContent = segundos;
    }
}
      //abierto y cerrado de la cafeteria


actualizarReloj();
setInterval(actualizarReloj, 1000);



actualizarReloj();
setInterval(actualizarReloj, 1000);

function actualizarRelojYEstado() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    // 1. Actualizar números del reloj
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');

    // 2. Definir Horario de Atención (Ejemplo: 08:00 a 22:00)
    const horaApertura = 8;  // 8:00 AM
    const horaCierre = 22;   // 10:00 PM

    const dotElement = document.getElementById('status-dot');
    const textElement = document.getElementById('status-text');

    // 3. Evaluar si la cafetería está abierta o cerrada
    if (horas >= horaApertura && horas < horaCierre) {
        // ABIERTO
        dotElement.className = 'dot abierto';
        textElement.textContent = 'ABIERTO';
        textElement.style.color = '#2ecc71';
    } else {
        // CERRADO
        dotElement.className = 'dot cerrado';
        textElement.textContent = 'CERRADO';
        textElement.style.color = '#e74c3c';
    }
}

// Ejecutar la función cada segundo
setInterval(actualizarRelojYEstado, 1000);

// Ejecutar una vez al cargar la página
actualizarRelojYEstado();

// Clima
// Obtener clima en tiempo real (Coordenadas de Lima por defecto)
async function getWeatherData(lat = -12.0464, lon = -77.0428) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();

    if (data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;

      // Espera 1.5 segundos mostrando "Cargando..." antes de poner el clima real
      setTimeout(() => {
        const tempEl = document.getElementById('weather-temp');
        const condEl = document.getElementById('weather-cond');

        if (tempEl) tempEl.textContent = `${temp}°C`;
        if (condEl) condEl.textContent = getWeatherStatusText(code);
      }, 800); // <-- Cambia a 2000 si quieres que dure 2 segundos completos
    }
  } catch (error) {
    console.error("Error al cargar datos del clima:", error);
  }
}

// Convertir código de la API a texto
function getWeatherStatusText(code) {
  if (code === 0) return 'SOLEADO';
  if (code >= 1 && code <= 3) return 'PARCIALMENTE NUBLADO';
  if (code >= 45 && code <= 48) return 'NIEBLA';
  if (code >= 51 && code <= 67) return 'LLUVIA';
  if (code >= 80 && code <= 82) return 'CHUBASCOS';
  if (code >= 95) return 'TORMENTA';
  return 'DESPEJADO';
}

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