document.addEventListener('DOMContentLoaded', () => {
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
        
    // --- ANIMACIÓN DEL LOGO ---
    const logo = document.querySelector('header > a img');

    if (logo) {
        logo.classList.remove('prendido');
        void logo.offsetWidth; // Reinicia animación
        logo.classList.add('prendido');

        logo.addEventListener('animationend', () => {
            logo.classList.remove('prendido');
        }, { once: true });
    }

    // --- LÓGICA DEL CARRUSEL ---
    const ruleban = document.querySelector(".ruleban");
    const rulebanimg = document.querySelectorAll(".rulebanimg");
    const imgban = document.querySelectorAll(".area");
    const btnLuego = document.querySelector(".luego");
    const btnAntes = document.querySelector(".antes");

    let index = 0;

    function mostrarRulebanimg(i) {
        if (i >= rulebanimg.length) {
            index = 0;
        } else if (i < 0) {
            index = rulebanimg.length - 1;
        } else {
            index = i;
        }

        // Desplaza horizontalmente la tira de banners
        ruleban.style.transform = `translateX(-${index * 100}%)`;

        // Actualiza el indicador activo
        imgban.forEach(area => area.classList.remove("active"));
        if (imgban[index]) {
            imgban[index].classList.add("active");
        }
    }

    // Botones de navegación
    if (btnLuego) {
        btnLuego.onclick = () => mostrarRulebanimg(index + 1);
    }

    if (btnAntes) {
        btnAntes.onclick = () => mostrarRulebanimg(index - 1);
    }

    // Clic en los puntos/barras de posición
    imgban.forEach((area, i) => {
        area.onclick = () => mostrarRulebanimg(i);
    });

    // Auto-reproducción cada 16 segundos
    setInterval(() => {
        mostrarRulebanimg(index + 1);
    }, 16000);

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

// Imagen del bloque 3: foto
document.addEventListener('DOMContentLoaded', function() {
    const inputFoto = document.getElementById('foto-input');
    const contenidoDropzone = document.getElementById('comunidad-contenido-dropzone');

    if (inputFoto && contenidoDropzone) {
      inputFoto.addEventListener('change', function(e) {
        const archivo = e.target.files[0];
        
        if (archivo && archivo.type.startsWith('image/')) {
          const reader = new FileReader();

          reader.onload = function(event) {
            // Reemplaza el ícono por la imagen cargada manteniendo las clases de tu CSS
            contenidoDropzone.innerHTML = `
              <img src="${event.target.result}" class="comunidad-imagen-previa" alt="Vista previa">
              <span class="comunidad-texto-instruccion" style="color: #d4a359; font-size: 13px; text-decoration: underline;">Haz clic para cambiar la foto</span>
            `;
          };

          reader.readAsDataURL(archivo);
        }
      });
    }
  });



  //clima
  // Obtener clima en tiempo real (Coordenadas de Lima por defecto)
async function getWeatherData(lat = -12.0464, lon = -77.0428) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();

    if (data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;

      // Actualizar Temperatura
      document.getElementById('weather-temp').textContent = `${temp}°C`;

      // Actualizar Texto de Condición
      document.getElementById('weather-cond').textContent = getWeatherStatusText(code);
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