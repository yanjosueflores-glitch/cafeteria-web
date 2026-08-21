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
    let intervaloRuleta; // Variable para almacenar el temporizador

    // Función para (re)iniciar el contador de 7 segundos
    function iniciarTemporizador() {
        clearInterval(intervaloRuleta);
        intervaloRuleta = setInterval(() => {
            mostrarRulebanimg(index + 1);
        }, 7000);
    }

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
        btnLuego.onclick = () => {
            mostrarRulebanimg(index + 1);
            iniciarTemporizador(); // Reinicia la cuenta
        };
    }

    if (btnAntes) {
        btnAntes.onclick = () => {
            mostrarRulebanimg(index - 1);
            iniciarTemporizador(); // Reinicia la cuenta
        };
    }

    // Clic en los puntos/barras de posición
    imgban.forEach((area, i) => {
        area.onclick = () => {
            mostrarRulebanimg(i);
            iniciarTemporizador(); // Reinicia la cuenta
        };
    });

    // Inicia la auto-reproducción al cargar la página
    iniciarTemporizador();

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