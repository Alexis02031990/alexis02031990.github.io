/**
 * Scripts améliorés pour le portfolio moderne
 * Interactions, animations et fonctionnalités professionnelles
 */

// ============================================================
// NAVBAR - Scroll Effect
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  const updateNavbarHeight = () => {
    document.body.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
  };
  updateNavbarHeight();
  new ResizeObserver(updateNavbarHeight).observe(navbar);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// ============================================================
// SMOOTH SCROLL POUR LES LIENS INTERNES
// ============================================================
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

// ============================================================
// ANIMATIONS AO SCROLL (Intersection Observer)
// ============================================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer tous les éléments avec classe 'fade-in'
document.querySelectorAll('.card, .section-title, .experience-card, .skill-item').forEach(el => {
  observer.observe(el);
});

// ============================================================
// ACTIVE NAV LINK - Mettre à jour le lien actif
// ============================================================
function updateActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Appeler au chargement
updateActiveLink();

// ============================================================
// LAZY LOADING - Images
// ============================================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================================
// RIPPLE EFFECT - Boutons au clic
// ============================================================
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================================
// TÉLÉCHARGEMENT CV - Fonction pour télécharger le CV en PDF
// ============================================================
const downloadBtn = document.getElementById('download-cv');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const element = document.getElementById('experience-content');
    if (!element) return;

    const opt = {
      margin: 10,
      filename: 'CV-Alexis-NGUEFACK.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).save().from(element).save();
  });
}

// ============================================================
// FORMULAIRE CONTACT - Validation et submission
// ============================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    
    // Validation simple
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();
    
    if (!name || !email || !message) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Veuillez entrer une adresse email valide', 'error');
      return;
    }

    // Soumettre le formulaire (via FormSubmit ou votre service)
    console.log('Formulaire soumis:', { name, email, message });
    showNotification('Message envoyé avec succès!', 'success');
    
    // Réinitialiser le formulaire
    this.reset();
  });
}

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

/**
 * Valider une adresse email
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Afficher une notification
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#16c784' : type === 'error' ? '#e94560' : '#0f3460'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease forwards;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Copier le contenu dans le presse-papiers
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copié dans le presse-papiers!', 'success');
  }).catch(() => {
    showNotification('Erreur lors de la copie', 'error');
  });
}

// ============================================================
// PERFORMANCE - Précharger les ressources critiques
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Précharger les images critiques
  const criticalImages = document.querySelectorAll('img[data-preload]');
  criticalImages.forEach(img => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = img.dataset.preload;
    document.head.appendChild(preloadLink);
  });
});

// ============================================================
// MENU MOBILE - Fermer le menu après clic
// ============================================================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      toggler.click();
    }
  });
});

// ============================================================
// ANIMATIONS KEYFRAMES CSS DYNAMIQUES
// ============================================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 600ms ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('✅ Portfolio moderne chargé avec succès!');
