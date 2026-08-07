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

let total = 0;
let cantidadTotal = 0;

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
    // Obtenemos el contenedor div.itemPedido
    let item = botonEliminar.closest(".itemPedido");

    // Recuperamos cuánto valía este ítem individual
    let subtotalItem = parseFloat(item.dataset.subtotal);
    let cantidadItem = parseInt(item.dataset.cantidad);

    // Descontamos del total general
    total -= subtotalItem;
    cantidadTotal -= cantidadItem;

    // Evitamos posibles decimales negativos por imprecisión
    if (total < 0) total = 0;
    if (cantidadTotal < 0) cantidadTotal = 0;

    // Eliminamos el HTML de la lista
    item.remove();

    // Refrescamos pantallas
    actualizarTotales();
}

// 2. ELIMINAR TODOS LOS PRODUCTOS A LA VEZ
function vaciarTodo() {
    let lista = document.getElementById("listaPedido");
    
    // Dejamos el contenedor vacío
    lista.innerHTML = "";

    // Reiniciamos contadores
    total = 0;
    cantidadTotal = 0;

    // Refrescamos pantallas
    actualizarTotales();
}

// Función auxiliar para actualizar los <h3> del resumen
function actualizarTotales() {
    document.getElementById("cantidadProductos").innerText =
        "Productos agregados: " + cantidadTotal;

    document.getElementById("totalPedido").innerText =
        "Total: S/ " + total.toFixed(2);
}


function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.producto');
    const botones = document.querySelectorAll('.btn-filtro');

    // Cambia la clase activa en el botón presionado
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
