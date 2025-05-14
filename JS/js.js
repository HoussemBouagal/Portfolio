    // Initialize Typed.js
    document.addEventListener('DOMContentLoaded', function() {
      new Typed("#typed2", {
        strings: ["Software Engineer 👨‍💻", "Data Scientist 📊📈", "Machine Learning Engineer 🤖🧠"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
      });
      
      // Set current year in footer
      document.getElementById('year').textContent = new Date().getFullYear();
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      menuToggle.textContent = sidebar.classList.contains('-translate-x-full') ? '≡' : '×';
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCounters, 20);
        } else {
          counter.innerText = target;
        }
      });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-show');
          
          // Start counter animation when stats section is visible
          if (entry.target.id === 'About') {
            setTimeout(animateCounters, 500);
          }
        }
      });
    }, {
      threshold: 0.1
    });
    
    document.querySelectorAll('.section-animate').forEach(section => {
      observer.observe(section);
    });

    // Certificate modal functions
    function showCertificate(imageSrc) {
      const modal = document.getElementById('certificateModal');
      const img = document.getElementById('certificateImg');
      img.src = imageSrc;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
      document.getElementById('certificateModal').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    // Form submission
    const form = document.getElementById('myForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.reset();
          successMessage.classList.remove('hidden');
          
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 5000);
        } else {
          alert("An error occurred while sending. Please try again.");
        }
      }).catch(error => {
        alert("Sending failed. Please try later.");
      });
    });
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        
        // إخفاء الدائرة بسلاسة بعد تحميل الصفحة
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 1000);
      });
      
