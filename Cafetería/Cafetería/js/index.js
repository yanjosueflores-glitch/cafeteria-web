 
    // Asegura que el código corra cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('header > a img');

    if (logo) {
        // Remueve por seguridad si ya existía
        logo.classList.remove('prendido');
        
        // Truco del offsetWidth para reiniciar el flujo de la animación
        void logo.offsetWidth;

        // Añade la clase que activa el parpadeo inmediatamente
        logo.classList.add('prendido');

        // Limpia la clase al terminar la animación (opcional)
        logo.addEventListener('animationend', () => {
            // Nota: Si quieres que el logo se quede encendido permanentemente 
            // al final, te sugiero NO remover la clase aquí, a menos que 
            // tu CSS ya lo maneje de otra forma.
            logo.classList.remove('prendido');
        }, { once: true }); // 'once' evita que se acumulen listeners
    }
});


    const ruleban=document.querySelector(".ruleban");
    const rulebanimg=document.querySelectorAll(".rulebanimg");
    const imgban=document.querySelectorAll(".area");

    let index=0;

    function mostrarRulebanimg(i){

        if(i>=rulebanimg.length){
            index=0;
        }else if(i<0){
            index=rulebanimg.length-1;
        }else{
            index=i;
        }

        ruleban.style.transform=`translateX(-${index*100}%)`;

        imgban.forEach(area=>area.classList.remove("active"));
        imgban[index].classList.add("active");
    }

    document.querySelector(".luego").onclick=()=>{
        mostrarRulebanimg(index+1);
    }

    document.querySelector(".antes").onclick=()=>{
        mostrarRulebanimg(index-1);
    }

    imgban.forEach((area,i)=>{
        area.onclick=()=>{
            mostrarRulebanimg(i);
        }
    });

    setInterval(()=>{
        mostrarRulebanimg(index+1);
    },16000);
