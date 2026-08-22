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




function agregarPedido(boton, nombre, precio) {
    let tarjeta = boton.parentElement;
    let cantidadInput = tarjeta.querySelector(".cantidad");
    let cantidad = parseInt(cantidadInput.value);

    // Validación básica por si ponen 0 o números negativos
    if (isNaN(cantidad) || cantidad <= 0) return;

    let subtotal = precio * cantidad;

    // Actualizamos acumuladores globales
    total += subtotal;
    cantidadTotal += cantidad;

    let lista = document.getElementById("listaPedido");
    let item = document.createElement("div");
    item.classList.add("itemPedido");

    // Guardamos los datos de ESTE ítem dentro del propio elemento HTML
    item.dataset.subtotal = subtotal;
    item.dataset.cantidad = cantidad;

    // Insertamos el texto + el botón de eliminar ("❌")
    item.innerHTML = `
        <span>${nombre} x ${cantidad}</span>
        <div>
            <span style="margin-right: 10px;">S/ ${subtotal.toFixed(2)}</span>
            <button onclick="eliminarItem(this)" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">❌</button>
        </div>
    `;

    lista.appendChild(item);

    // Actualizamos los textos en pantalla
    actualizarTotales();

    // Reseteamos el input a 1 tras agregar
    cantidadInput.value = 1;
}

// 1. ELIMINAR UN SOLO PRODUCTO
function eliminarItem(botonEliminar) {
   
    let item = botonEliminar.closest(".itemPedido");

  
    let subtotalItem = parseFloat(item.dataset.subtotal);
    let cantidadItem = parseInt(item.dataset.cantidad);

    total -= subtotalItem;
    cantidadTotal -= cantidadItem;

   
    if (total < 0) total = 0;
    if (cantidadTotal < 0) cantidadTotal = 0;


    item.remove();
    actualizarTotales();
}


function vaciarTodo() {
    let lista = document.getElementById("listaPedido");
   
    lista.innerHTML = "";

   
    total = 0;
    cantidadTotal = 0;

    actualizarTotales();
}


function actualizarTotales() {
    document.getElementById("cantidadProductos").innerText =
        "Productos agregados: " + cantidadTotal;

    document.getElementById("totalPedido").innerText =
        "Total: S/ " + total.toFixed(2);
}



function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.producto');
    const botones = document.querySelectorAll('.btn-filtro');

  
    botones.forEach(btn => btn.classList.remove('active'));
    if (event) {
        event.target.classList.add('active');
    }

    // Muestra u oculta los productos según la categoría seleccionada
    productos.forEach(prod => {
        const categoriaProducto = prod.getAttribute('data-category');
        
        if (categoria === 'todos' || categoriaProducto === categoria) {
            prod.style.display = 'block';
        } else {
            prod.style.display = 'none';
        }
    });
}


// Función para filtrar productos por texto en tiempo real
function buscarPorTexto() {
  const input = document.getElementById('searchInput');
  const texto = input.value.toLowerCase().trim();
  const productos = document.querySelectorAll('.contenedor-productos .producto');

  productos.forEach(producto => {
    const titulo = producto.querySelector('h4');
    if (titulo) {
      const nombre = titulo.textContent.toLowerCase();
      if (nombre.includes(texto)) {
        producto.style.display = '';
      } else {
        producto.style.display = 'none';
      }
    }
  });
}

// Escuchar el evento cuando el usuario escribe en el campo
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', buscarPorTexto);
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



function convertirMoneda() {
  const inputMonto = document.getElementById("monto").value;
  const monto = parseFloat(inputMonto);
  const tipoConversion = document.getElementById("tipoConversion").value;
  const divResultado = document.getElementById("resultado");

  if (isNaN(monto) || monto <= 0) {
    divResultado.textContent = "Inválido";
    divResultado.style.color = "#ff8a80";
    return;
  }

  const tasaDolar = 3.75;
  const tasaEuro = 4.05;

  let resultado = 0;
  let simbolo = "";

  switch (tipoConversion) {
    case "solesADolares":
      resultado = monto / tasaDolar;
      simbolo = "$";
      break;
    case "solesAEuros":
      resultado = monto / tasaEuro;
      simbolo = "€";
      break;
    case "dolaresASoles":
      resultado = monto * tasaDolar;
      simbolo = "S/";
      break;
    case "eurosASoles":
      resultado = monto * tasaEuro;
      simbolo = "S/";
      break;
  }

  divResultado.style.color = "#f3e5ab";
  divResultado.textContent = `Total: ${simbolo}${resultado.toFixed(2)}`;
}


document.addEventListener("DOMContentLoaded", () => {
    
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

   
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    totalTimeInSeconds--;
  }


  setInterval(updateCountdown, 1000);
  updateCountdown();