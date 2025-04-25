// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  // Close on link click or outside click
  navLinks.addEventListener('click', function(e) {
    // Only close if a link is clicked
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
    }
  });
  document.addEventListener('click', function(e) {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('active');
    }
  });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

// Contact Form Thank You Message
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');
if (contactForm && thankYouMessage) {
  contactForm.addEventListener('submit', function (e) {
    setTimeout(() => {
      thankYouMessage.style.display = 'block';
    }, 1000);
  });
}

// Particle Canvas - Futuristic Animated Background
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // Particle system
  const particles = [];
  const particleCount = 60;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.3,
      vy: (Math.random() - 0.5) * 1.3,
      radius: Math.random() * 3 + 2,
      color: `hsl(${Math.random()*360}, 100%, 60%)`
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.closePath();
      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      // Draw lines to nearby particles
      for (let j = i+1; j < particles.length; j++) {
        let p2 = particles[j];
        let dist = Math.hypot(p.x-p2.x, p.y-p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(0,255,220,0.09)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// --- Responsive Navbar Hide/Show with Shorter Delay and Pause on Interaction ---
(function() {
  let lastScrollY = window.scrollY;
  let ticking = false;
  let hideTimeout = null;
  let interacting = false;
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const HIDE_DELAY = 1700; // milliseconds
  function showNavbar() {
    navbar.style.transform = 'translateY(0)';
    navbar.style.boxShadow = '';
  }
  function hideNavbar() {
    if (!interacting && window.scrollY > 0) {
      navbar.style.transform = 'translateY(-110%)';
      navbar.style.boxShadow = 'none';
    } else {
      navbar.style.transform = 'translateY(0)';
      navbar.style.boxShadow = '';
    }
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        showNavbar();
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          hideNavbar();
        }, HIDE_DELAY);
        lastScrollY = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }
  // Pause hiding on interaction
  function pauseHide() {
    interacting = true;
    showNavbar();
    if (hideTimeout) clearTimeout(hideTimeout);
  }
  function resumeHide() {
    interacting = false;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hideNavbar();
    }, HIDE_DELAY);
  }
  navbar.addEventListener('mouseenter', pauseHide);
  navbar.addEventListener('mouseleave', resumeHide);
  navbar.addEventListener('focusin', pauseHide);
  navbar.addEventListener('focusout', resumeHide);
  window.addEventListener('scroll', onScroll);
  // Always show on load
  showNavbar();
})();

// --- Hero Image Responsive Control (Mobile) ---
function controlHeroImageMobile() {
  const heroImg = document.querySelector('.hero-image img');
  if (!heroImg) return;
  const isMobile = window.innerWidth <= 600;
  if (isMobile) {
    // Use 80vw, but max 440px for very large phones, min 180px for small
    let imgSize = Math.max(180, Math.min(window.innerWidth * 0.8, 440));
    heroImg.style.width = imgSize + 'px';
    heroImg.style.height = imgSize + 'px';
    heroImg.style.aspectRatio = '1/1';
    heroImg.style.objectFit = 'cover';
    heroImg.style.borderRadius = '50%';
    heroImg.style.display = 'block';
    heroImg.style.margin = '0 auto';
    heroImg.style.animation = 'floatHeroImgMobile 2.8s ease-in-out infinite alternate';
  } else {
    heroImg.style.width = '';
    heroImg.style.height = '';
    heroImg.style.aspectRatio = '';
    heroImg.style.objectFit = '';
    heroImg.style.borderRadius = '';
    heroImg.style.display = '';
    heroImg.style.margin = '';
    heroImg.style.animation = '';
  }
}
window.addEventListener('DOMContentLoaded', controlHeroImageMobile);
window.addEventListener('resize', controlHeroImageMobile);

// --- Set default to dark mode on load ---
window.addEventListener('DOMContentLoaded', function() {
  if (!document.body.classList.contains('dark-mode')) {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }
});

// --- Navbar Progress Bar ---
(function() {
  const progressBar = document.createElement('div');
  progressBar.className = 'navbar-progress';
  document.querySelector('.navbar').appendChild(progressBar);
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = percent + '%';
  });
})();

// --- Animated Navbar Underline --- (REMOVED)
// (function() { /* Underline effect removed by user request */ })();

// --- Neon Glow on Navbar Hover ---
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.addEventListener('mouseenter', function() {
    navbar.classList.add('glow');
  });
  navbar.addEventListener('mouseleave', function() {
    navbar.classList.remove('glow');
  });
})();

// --- Particle Trail Cursor Over Navbar ---
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.addEventListener('mousemove', function(e) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = (e.clientX - 4) + 'px';
    particle.style.top = (e.clientY - 4) + 'px';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 700);
  });
})();

// --- Floating Action Button (FAB) for Theme, Dark/Light, Voice ---
(function() {
  // Remove old theme/voice buttons from navbar if present
  const oldThemeBtn = document.getElementById('themeToggle');
  if (oldThemeBtn) oldThemeBtn.remove();
  const oldVoiceBtn = document.getElementById('voiceNavBtn');
  if (oldVoiceBtn) oldVoiceBtn.remove();

  // FAB container
  const fabContainer = document.createElement('div');
  fabContainer.className = 'fab-container';
  // Main FAB
  const fabMain = document.createElement('button');
  fabMain.className = 'fab-main';
  fabMain.title = 'Quick Actions';
  fabMain.innerHTML = '✦';
  // Actions
  const fabActions = document.createElement('div');
  fabActions.className = 'fab-actions';

  // Dark/Light Mode Action
  const fabDark = document.createElement('button');
  fabDark.className = 'fab-action';
  fabDark.title = 'Toggle Dark/Light';
  fabDark.innerHTML = '🌙';
  fabDark.onclick = function() {
    document.body.classList.toggle('dark-mode');
    fabDark.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  };

  // Theme Color Action
  const themes = [
    {
      name: 'default',
      bg: 'linear-gradient(135deg, #181824 0%, #23243a 100%)',
      color: '#e3e3e3',
      navbar: 'rgba(24,24,36,0.20)'
    },
    {
      name: 'cyberpunk',
      bg: 'linear-gradient(120deg, #2d006e 0%, #00fff0 100%)',
      color: '#fff',
      navbar: 'rgba(0,255,220,0.18)'
    },
    {
      name: 'aurora',
      bg: 'linear-gradient(120deg, #23243a 0%, #00ffd0 100%)',
      color: '#23243a',
      navbar: 'rgba(0,255,220,0.10)'
    },
    {
      name: 'sunset',
      bg: 'linear-gradient(120deg, #ff9966 0%, #ff5e62 100%)',
      color: '#23243a',
      navbar: 'rgba(255,153,102,0.16)'
    },
    {
      name: 'forest',
      bg: 'linear-gradient(120deg, #134e5e 0%, #71b280 100%)',
      color: '#fff',
      navbar: 'rgba(19,78,94,0.18)'
    },
    {
      name: 'matrix',
      bg: 'linear-gradient(120deg, #000000 0%, #00ff87 100%)',
      color: '#00ff87',
      navbar: 'rgba(0,255,135,0.09)'
    },
    {
      name: 'ocean',
      bg: 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 100%)',
      color: '#fff',
      navbar: 'rgba(33,147,176,0.18)'
    },
    {
      name: 'rose',
      bg: 'linear-gradient(120deg, #ffafbd 0%, #ffc3a0 100%)',
      color: '#23243a',
      navbar: 'rgba(255,175,189,0.13)'
    },
    // --- Futuristic Themes ---
    {
      name: 'neon dream',
      bg: 'linear-gradient(120deg, #0f2027 0%, #2c5364 50%, #00ffd0 100%)',
      color: '#00ffd0',
      navbar: 'rgba(0,255,208,0.18)'
    },
    {
      name: 'galaxy',
      bg: 'linear-gradient(120deg, #20002c 0%, #cbb4d4 100%)',
      color: '#fff',
      navbar: 'rgba(80,0,100,0.15)'
    },
    {
      name: 'hologram',
      bg: 'linear-gradient(120deg, #00f2fe 0%, #4facfe 100%)',
      color: '#27293d',
      navbar: 'rgba(0,242,254,0.14)'
    },
    {
      name: 'future grid',
      bg: 'repeating-linear-gradient(135deg, #181824 0 10px, #00ffd0 10px 12px, #23243a 12px 22px)',
      color: '#00ffd0',
      navbar: 'rgba(0,255,208,0.13)'
    },
    {
      name: 'vaporwave',
      bg: 'linear-gradient(120deg, #ff6a00 0%, #ee0979 50%, #a1c4fd 100%)',
      color: '#fff',
      navbar: 'rgba(255,106,0,0.13)'
    },
    {
      name: 'hyperblue',
      bg: 'linear-gradient(120deg, #000428 0%, #004e92 100%)',
      color: '#00ffd0',
      navbar: 'rgba(0,78,146,0.18)'
    }
  ];

  let themeIndex = 0;
  const fabTheme = document.createElement('button');
  fabTheme.className = 'fab-action';
  fabTheme.title = 'Toggle Theme';
  fabTheme.innerHTML = '🎨';
  fabTheme.onclick = function() {
    themeIndex = (themeIndex + 1) % themes.length;
    const t = themes[themeIndex];
    document.body.style.background = t.bg;
    document.body.style.color = t.color;
    document.querySelector('.navbar').style.background = t.navbar;
  };

  // Voice Nav Action
  const fabVoice = document.createElement('button');
  fabVoice.className = 'fab-action';
  fabVoice.title = 'Voice Nav';
  fabVoice.innerHTML = '🎤';
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    fabVoice.onclick = function() {
      recognition.start();
    };
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const navLinks = document.getElementById('navLinks');
      if (!navLinks) return;
      const links = navLinks.querySelectorAll('a');
      for (const link of links) {
        const text = link.textContent.toLowerCase();
        if (transcript.includes(text)) {
          link.click();
          break;
        }
      }
    };
  } else {
    fabVoice.disabled = true;
    fabVoice.title = 'Voice not supported';
    fabVoice.style.opacity = '0.5';
  }

  // Assemble actions
  fabActions.appendChild(fabDark);
  fabActions.appendChild(fabTheme);
  fabActions.appendChild(fabVoice);
  fabContainer.appendChild(fabActions);
  fabContainer.appendChild(fabMain);
  document.body.appendChild(fabContainer);

  // Show/hide actions on main FAB click
  fabMain.addEventListener('click', function(e) {
    fabContainer.classList.toggle('active');
  });
  // Hide on outside click
  document.addEventListener('click', function(e) {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove('active');
    }
  });
})();

// --- Futuristic Custom Cursor ---
(function() {
  // Remove any existing cursor elements
  document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(e => e.remove());
  // Create cursor elements
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);
  document.body.appendChild(dot);
  // Move cursor
  window.addEventListener('mousemove', function(e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });
  // Click effect
  window.addEventListener('mousedown', function() {
    ring.classList.add('active');
  });
  window.addEventListener('mouseup', function() {
    ring.classList.remove('active');
  });
  // Hide cursor on input/textarea
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.display = 'none';
      ring.style.display = 'none';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.display = '';
      ring.style.display = '';
    });
  });
})();
