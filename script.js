// 3D tilt effect for cards
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transition = 'transform 0.18s cubic-bezier(.4,0,.2,1), filter 0.18s';
    card.style.transform = `perspective(600px) rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.06)`;
    card.style.filter = 'brightness(1.07) saturate(1.1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.18s cubic-bezier(.4,0,.2,1), filter 0.18s';
    card.style.transform = '';
    card.style.filter = '';
  });
});