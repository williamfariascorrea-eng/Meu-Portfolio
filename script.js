'use strict';

// Anti-clickjacking
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

// Disable right-click (opcional - pode remover se quiser)
document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

// Disable keyboard shortcuts de devtools e cópia
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' || 
    e.key === 'u' && e.ctrlKey || 
    e.key === 's' && e.ctrlKey || 
    e.key === 'p' && e.ctrlKey || 
    e.ctrlKey && e.shiftKey && e.key === 'I' ||
    e.ctrlKey && e.shiftKey && e.key === 'J' ||
    e.ctrlKey && e.shiftKey && e.key === 'C'
  ) {
    e.preventDefault();
  }
});

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================
// ANIMAÇÃO AO SCROLL (REVEAL)
// ===============================
const revealElements = document.querySelectorAll('.glass-card, .project-card, .skill-card, .testimonial-card, .differential-card');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('reveal', 'active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ===============================
// CARROSSEL (GALERIA)
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (track && slides.length > 0) {
  let currentIndex = 0;
  let autoPlay;

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startAutoPlay() {
    autoPlay = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  startAutoPlay();
  
  prevBtn.addEventListener('click', () => {
    clearInterval(autoPlay);
    goToSlide(currentIndex - 1);
    startAutoPlay();
  });
  
  nextBtn.addEventListener('click', () => {
    clearInterval(autoPlay);
    goToSlide(currentIndex + 1);
    startAutoPlay();
  });
}

// ===============================
// PARTÍCULAS PREMIUM + FUNDO ANIMADO
// ===============================

// Criar elementos flutuantes no fundo
function createFloatingElements() {
  const container = document.body;
  const shapes = ['circle', 'square', 'triangle'];
  const colors = ['#6c63ff', '#f97316', '#8b85ff', '#fb923c', '#5046e5'];
  
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 40 + 15;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * 8;
    
    element.style.cssText = `
      position: fixed;
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      opacity: 0.08;
      border-radius: ${shape === 'circle' ? '50%' : '0'};
      clip-path: ${shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
      animation: float ${duration}s ease-in-out ${delay}s infinite;
      z-index: -1;
      pointer-events: none;
    `;
    
    container.appendChild(element);
  }
}

// Adicionar gradient animado no fundo
function addAnimatedGradient() {
  const gradient = document.createElement('div');
  gradient.className = 'animated-gradient';
  gradient.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(108, 99, 255, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(139, 133, 255, 0.08) 0%, transparent 60%);
    animation: gradientMove 15s ease-in-out infinite;
    z-index: -2;
    pointer-events: none;
  `;
  document.body.appendChild(gradient);
}

// Inicializar elementos do fundo
createFloatingElements();
addAnimatedGradient();

// Partículas principais
if (typeof tsParticles !== 'undefined') {
  tsParticles.load("particles", {
    fullScreen: { enable: false },
    particles: {
      number: { 
        value: 40,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: { 
        value: ["#6c63ff", "#f97316", "#8b85ff", "#fb923c", "#ffffff"]
      },
      links: {
        enable: true,
        color: "#6c63ff",
        distance: 150,
        opacity: 0.2
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce"
        }
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.2
        }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 1.5,
          minimumValue: 0.3
        }
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.6
          }
        },
        push: {
          quantity: 3
        }
      }
    },
    background: {
      color: "transparent"
    }
  });
}

// ===============================
// NÚMEROS ANIMADOS (STATISTICS)
// ===============================
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumber = (element) => {
  const target = parseInt(element.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
};

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(num => animateNumber(num));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statObserver.observe(heroStats);
}