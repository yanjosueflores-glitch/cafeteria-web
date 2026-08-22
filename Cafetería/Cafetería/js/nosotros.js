
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


document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el nombre del archivo de la URL actual (ej: "carta.html")
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