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


document.getElementById("formReserva")
.addEventListener("submit", function(e){

    e.preventDefault();

    let nombre =
    document.getElementById("nombre").value;

    let correo =
    document.getElementById("correo").value;

    let fecha =
    document.getElementById("fecha").value;

    let hora =
    document.getElementById("hora").value;

    let personas =
    document.getElementById("personas").value;

    let fila = `
        <tr>
            <td>${nombre}</td>
            <td>${correo}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${personas}</td>
        </tr>
    `;

    document.querySelector(
        "#tablaReservas tbody"
    ).innerHTML += fila;

    console.log(nombre);
    console.log(correo);
    console.log(fecha);
    console.log(hora);
    console.log(personas);

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