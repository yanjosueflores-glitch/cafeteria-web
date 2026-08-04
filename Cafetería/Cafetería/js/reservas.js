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