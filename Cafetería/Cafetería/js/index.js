document.addEventListener('DOMContentLoaded', () => {
    
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
        btnLuego.onclick = () => mostrarRulebanimg(index + 1);
    }

    if (btnAntes) {
        btnAntes.onclick = () => mostrarRulebanimg(index - 1);
    }

    // Clic en los puntos/barras de posición
    imgban.forEach((area, i) => {
        area.onclick = () => mostrarRulebanimg(i);
    });

    // Auto-reproducción cada 16 segundos
    setInterval(() => {
        mostrarRulebanimg(index + 1);
    }, 16000);

});