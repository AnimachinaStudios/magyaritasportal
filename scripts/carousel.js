(function() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let index = 0;
  const count = dots.length;

  function goToSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[i].classList.add('active');
    index = i;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
  });

  setInterval(() => {
    goToSlide((index + 1) % count);
  }, 5000);
})();
