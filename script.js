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
// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Optional: close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// Trending Now Modal logic
const trendingData = [
  {
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-force-1-07-mens-shoes-jBrhbr.png',
    title: 'Air Force 1',
    type: "Men's Shoes",
    desc: 'A timeless classic with modern comfort. The Air Force 1 is perfect for any occasion.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/pegasus-41-mens-road-running-shoes-2w8QwQ.png',
    title: 'Pegasus 41',
    type: 'Running',
    desc: 'Engineered for speed and comfort, Pegasus 41 is your go-to for daily runs.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-jordan-1-low-se-mens-shoes-83Lm6D.png',
    title: 'Jordan 1 Low',
    type: 'Lifestyle',
    desc: 'Iconic style meets everyday versatility. Jordan 1 Low is a must-have for sneaker lovers.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/zoom-vomero-5-mens-shoes-5QWp5Q.png',
    title: 'Vomero 5',
    type: "Men's Shoes",
    desc: 'Experience plush cushioning and bold design with the Vomero 5.',
    shop: '#'
  }
];

// Featured Collections Data
const featuredData = [
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/air-max-lifestyle.jpg',
    title: 'Air Max',
    type: "Iconic Style",
    desc: 'Visible cushioning and timeless design make Air Max a cultural icon. Forever changing sneaker culture.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/jordan-lifestyle.jpg',
    title: 'Jordan',
    type: "Legendary",
    desc: 'Channel the spirit of MJ with iconic style and unmatched performance on and off the court.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/blazer-lifestyle.jpg',
    title: 'Blazer',
    type: "Classic",
    desc: 'From basketball court to skate park, the Blazer continues to define timeless street style.',
    shop: '#'
  }
];

// Shop by Sport Data
const sportData = [
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/running-action.jpg',
    title: 'Running',
    type: "Performance",
    desc: 'Built for speed and endurance with cutting-edge technology to power your run, whatever your pace.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/basketball-action.jpg',
    title: 'Basketball',
    type: "Court Ready",
    desc: 'Dominate the game with responsive cushioning, superior traction, and lightweight support.',
    shop: '#'
  },
  {
    img: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/football-action.jpg',
    title: 'Football',
    type: "Field Performance",
    desc: 'Engineered for speed, touch, and control to elevate your game on any surface.',
    shop: '#'
  }
];

// Unified modal system
window.openModal = function(collection, idx) {
  const modal = document.getElementById('product-modal');
  const modalBg = document.getElementById('product-modal-bg');
  let data;
  
  switch(collection) {
    case 'trending':
      data = trendingData[idx];
      break;
    case 'featured':
      data = featuredData[idx];
      break;
    case 'sport':
      data = sportData[idx];
      break;
    default:
      return;
  }
  
  document.getElementById('modal-img').src = data.img;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-type').textContent = data.type;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-shop').href = data.shop;
  
  modal.classList.remove('hidden');
  modalBg.classList.remove('hidden');
  
  // Add animation class
  modal.classList.add('animate-modal-in');
  
  // Auto-focus on close button for accessibility
  setTimeout(() => {
    const closeBtn = modal.querySelector('button');
    if (closeBtn) closeBtn.focus();
  }, 100);
};

window.closeModal = function() {
  const modal = document.getElementById('product-modal');
  const modalBg = document.getElementById('product-modal-bg');
  
  // Add animation class for closing
  modal.classList.add('animate-modal-out');
  
  // Wait for animation to complete
  setTimeout(() => {
    modal.classList.add('hidden');
    modalBg.classList.add('hidden');
    modal.classList.remove('animate-modal-out', 'animate-modal-in');
  }, 200);
};

// Maintain backward compatibility with original trending modal functions
window.openTrendingModal = function(idx) {
  window.openModal('trending', idx);
};
window.closeTrendingModal = function() {
  window.closeModal();
};

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeModal();
  }
});

// Initialize AOS if it exists
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }
});