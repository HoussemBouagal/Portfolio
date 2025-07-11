/**
 * Portfolio Application - Customized for Houssem's Portfolio
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
      this.setupMobileMenu();
      this.setupScrollToTop();
      this.setupIntersectionObserver();
      this.setupFormSubmission();
      this.setupSmoothScrolling();
    });
  }

  /**
   * Initialize Typed.js animation for the home section
   */
  initTypedJS() {
    const typedElement = document.getElementById('typed2');
    if (!typedElement || !window.Typed) return;

    try {
      new Typed(typedElement, {
        strings: [
          "Freelancer 👨‍💻", 
          "AI Developer 🤖", 
          "Data Scientist 📊",
          "Software Engineer 💻"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        smartBackspace: true,
        cursorChar: '|'
      });
    } catch (error) {
      console.error('Typed.js initialization failed:', error);
      typedElement.textContent = "Professional Developer";
    }
  }

  /**
   * Setup mobile menu toggle functionality
   */
  setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      menuToggle.textContent = sidebar.classList.contains('-translate-x-full') ? '≡' : '×';
    });

    // Close menu when clicking on nav items (mobile only)
    if (window.innerWidth < 768) {
      const navItems = document.querySelectorAll('#sidebar nav a');
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          sidebar.classList.add('-translate-x-full');
          menuToggle.textContent = '≡';
        });
      });
    }
  }

  /**
   * Setup scroll-to-top button with smooth behavior
   */
  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Setup intersection observer for animated sections
   */
  setupIntersectionObserver() {
    const animatedSections = document.querySelectorAll('.section-animate');
    if (!animatedSections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          
          // Special handling for counter animation in About section
          if (entry.target.id === 'About') {
            this.animateCounters();
          }
        }
      });
    }, {
      threshold: 0.1
    });

    animatedSections.forEach(section => observer.observe(section));
  }

  /**
   * Animate counter numbers in About section
   */
  animateCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const speed = 200;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(this.animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Setup form submission with AJAX
   */
  setupFormSubmission() {
    const form = document.getElementById('myForm');
    if (!form) return;

    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="bi bi-arrow-repeat animate-spin mr-2"></i> Sending...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          if (successMessage) {
            successMessage.classList.remove('hidden');
            setTimeout(() => {
              successMessage.classList.add('hidden');
            }, 5000);
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again later.');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
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
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
