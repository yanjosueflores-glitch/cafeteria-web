document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('appleCarousel');
  const flechaIzq = document.getElementById('flechaIzq');
  const flechaDer = document.getElementById('flechaDer');

  if (carousel && flechaIzq && flechaDer) {
    const scrollCantidad = 340;

    flechaDer.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollCantidad, behavior: 'smooth' });
    });

    flechaIzq.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollCantidad, behavior: 'smooth' });
    });
  }
});