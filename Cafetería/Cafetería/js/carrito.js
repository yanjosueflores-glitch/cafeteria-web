let total = 0;
let cantidadTotal = 0;

function agregarPedido(boton,nombre,precio){

    let tarjeta = boton.parentElement;

    let cantidad = parseInt(
        tarjeta.querySelector(".cantidad").value
    );

    let subtotal = precio * cantidad;

    total += subtotal;

    cantidadTotal += cantidad;

    let lista = document.getElementById("listaPedido");

    let item = document.createElement("div");

    item.classList.add("itemPedido");

    item.innerHTML = `
        <span>
            ${nombre} x ${cantidad}
        </span>

        <span>
            S/ ${subtotal.toFixed(2)}
        </span>
    `;

    lista.appendChild(item);

    document.getElementById("cantidadProductos").innerText =
        "Productos agregados: " + cantidadTotal;

    document.getElementById("totalPedido").innerText =
        "Total: S/ " + total.toFixed(2);

        localStorage

}


