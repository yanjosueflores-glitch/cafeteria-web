
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