//carrito compras
 const productos = [
  { id: 1, nombre: "Espresso", precio: 8.00, imagen: "prod1.png" },
  { id: 2, nombre: "Cappuccino", precio: 10.00, imagen: "prod2.png" },
  { id: 3, nombre: "Latte", precio: 7.00, imagen: "prod3.png" },
  { id: 4, nombre: "Americano", precio: 8.00, imagen: "prod10.webp" },
  { id: 5, nombre: "Cheesecake", precio: 12.00, imagen: "prod4.png" },
  { id: 6, nombre: "Brownie", precio: 9.00, imagen: "prod5.png" },
  { id: 7, nombre: "Torta de Chocolate", precio: 15.00, imagen: "prod6.png" },
  { id: 8, nombre: "Frappé de Café", precio: 11.00, imagen: "prod7.png" },
  { id: 9, nombre: "Té Helado", precio: 7.50, imagen: "prod8.png" },
  { id: 10, nombre: "Malteada de Fresa", precio: 13.00, imagen: "prod9.png" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];





function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 4 Agregar producto 
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito();
  renderizarCarrito();
}

// 5 Quitar o disminuir cantidad
function quitarDelCarrito(id) {
  const item = carrito.find(p => p.id === id);
  if (item.cantidad > 1) {
    item.cantidad -= 1;
  } else {
    carrito = carrito.filter(p => p.id !== id);
  }
  guardarCarrito();
  renderizarCarrito();
}

// 6 Vaciar carrito completo
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
}

// 
function toggleCarrito() {
  document.getElementById("panel-carrito").classList.toggle("visible");
}

// 
function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  contenedor.innerHTML = "";

  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>S/ ${subtotal.toFixed(2)}</span>
      <button onclick="quitarDelCarrito(${item.id})">-</button>
      <button onclick="agregarAlCarrito(${item.id})">+</button>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById("total-carrito").textContent = `S/ ${total.toFixed(2)}`;
  document.getElementById("contador-carrito").textContent =
    carrito.reduce((total, item) => total + item.cantidad, 0);
}


renderizarCarrito();