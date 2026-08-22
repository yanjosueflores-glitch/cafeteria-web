
//notificacion alerta
function mostrarNotificacion(texto) {
  const noti = document.createElement("div");
  noti.className = "notificacion-carrito";
  noti.textContent = texto;
  document.body.appendChild(noti);

  setTimeout(() => noti.classList.add("mostrar"), 10);
  setTimeout(() => {
    noti.classList.remove("mostrar");
    setTimeout(() => noti.remove(), 300);
  }, 2000);
}

