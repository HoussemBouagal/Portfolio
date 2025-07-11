/**
 * Main Application Initializer
 * Implements professional coding standards with ergonomic considerations
 */
class PortfolioApp {
  constructor() {
    this.init();
  }

  /**
   * Initialize all application components
   */
  init() {
    this.setupDOMReadyHandlers();
    this.setupPageLoader();
  }

  /**
   * Setup handlers for DOMContentLoaded event
   */
  setupDOMReadyHandlers() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initTypedJS();
      this.updateCopyrightYear();
      this.setupMobileMenu();
      this.setupScrollToTop();
      this.setupIntersectionObserver();
      this.setupCertificateModals();
      this.setupFormSubmission();
    });
  }

  /**
   * Initialize Typed.js animation with error handling
   */
  initTypedJS() {
    const typedElement = document.getElementById('typed2');
    if (!typedElement || !window.Typed) return;

    try {
      new Typed(typedElement, {
        strings: ["Freelancer 👨‍💻", "Machine Learning Engineer 🤖, "Data Scientist 📊📈"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        smartBackspace: true,
        cursorChar: '|',
        shuffle: false,
        fadeOut: false
      });
    } catch (error) {
      console.error('Typed.js initialization failed:', error);
      typedElement.textContent = "Professional Developer";
    }
  }

  /**
   * Update copyright year in footer
   */
  updateCopyrightYear() {
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  /**
   * Setup mobile menu toggle with ARIA attributes
   */
  setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!menuToggle || !sidebar) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      sidebar.classList.toggle('-translate-x-full');
      menuToggle.textContent = isExpanded ? '≡' : '×';
    });
  }

  /**
   * Setup scroll-to-top button with smooth behavior
   */
  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    const scrollHandler = throttle(() => {
      const showButton = window.pageYOffset > 300;
      scrollToTopBtn.classList.toggle('opacity-0', !showButton);
      scrollToTopBtn.classList.toggle('invisible', !showButton);
      scrollToTopBtn.classList.toggle('opacity-100', showButton);
      scrollToTopBtn.classList.toggle('visible', showButton);
    }, 100);

    window.addEventListener('scroll', scrollHandler);
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      scrollToTopBtn.blur(); // Remove focus after click for better UX
    });
  }

  /**
   * Setup counter animations with Intersection Observer
   */
  setupIntersectionObserver() {
    const counters = document.querySelectorAll('.counter');
    const animatedSections = document.querySelectorAll('.section-animate');
    
    if (animatedSections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-show');
          
          if (entry.target.id === 'About' && counters.length > 0) {
            setTimeout(() => this.animateCounters(counters), 500);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedSections.forEach(section => observer.observe(section));
  }

  /**
   * Animate numerical counters
   * @param {NodeList} counters - List of counter elements
   */
  animateCounters(counters) {
    const speed = 200;
    let animationComplete = false;

    const animate = () => {
      if (animationComplete) return;

      let allComplete = true;
      
      counters.forEach(counter => {
        const target = +counter.dataset.target || 0;
        const current = +counter.textContent.replace(/\D/g, '') || 0;
        const increment = target / speed;
        
        if (current < target) {
          counter.textContent = Math.ceil(current + increment).toLocaleString();
          allComplete = false;
        } else {
          counter.textContent = target.toLocaleString();
        }
      });

      if (!allComplete) {
        requestAnimationFrame(animate);
      } else {
        animationComplete = true;
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Setup certificate modal functionality
   */
  setupCertificateModals() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this.closeModal(modal);
      }
    });

    // Close when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    // Delegate click events for certificate triggers
    document.body.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-certificate]');
      if (trigger) {
        e.preventDefault();
        this.showCertificate(modal, trigger.dataset.certificate);
      }
    });
  }

  /**
   * Show certificate modal
   * @param {HTMLElement} modal - Modal element
   * @param {string} imageSrc - Image source to display
   */
  showCertificate(modal, imageSrc) {
    const img = modal.querySelector('#certificateImg');
    if (!img) return;

    img.src = imageSrc;
    img.alt = 'Certificate preview';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  }

  /**
   * Close modal
   * @param {HTMLElement} modal - Modal element to close
   */
  closeModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    document.documentElement.style.paddingRight = '';
  }

  /**
   * Setup form submission with proper feedback
   */
  setupFormSubmission() {
    const form = document.getElementById('myForm');
    if (!form) return;

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!submitButton) return;
      
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      submitButton.setAttribute('aria-busy', 'true');

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        form.reset();
        
        if (successMessage) {
          successMessage.classList.remove('hidden');
          successMessage.setAttribute('aria-live', 'polite');
          setTimeout(() => successMessage.classList.add('hidden'), 5000);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        
        if (errorMessage) {
          errorMessage.classList.remove('hidden');
          errorMessage.setAttribute('aria-live', 'assertive');
          setTimeout(() => errorMessage.classList.add('hidden'), 5000);
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.setAttribute('aria-busy', 'false');
          submitButton.blur();
        }
      }
    });
  }

  /**
   * Setup page loader transition
   */
  setupPageLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity = '0';
      
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    });
  }
}

/**
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Initialize application
new PortfolioApp();
