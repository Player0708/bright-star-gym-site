document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    const toggleMenu = () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    function closeMenu() {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
    
    // IntersectionObserver for scroll animations (modern, efficient)
    const initScrollAnimations = () => {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target;
              element.classList.add('fade-in');
              
              if (element.classList.contains('card')) {
                const index = element.dataset.index || 0;
                element.style.animationDelay = `${0.1 * index}s`;
              }
              
              observer.unobserve(element);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -20% 0px'
        });
        
        animateElements.forEach(el => observer.observe(el));
      } else {
        // Fallback for older browsers
        const checkElements = () => {
          const viewportHeight = window.innerHeight;
          const triggerPos = viewportHeight * 0.7;
          
          animateElements.forEach(el => {
            if (!el.classList.contains('fade-in')) {
              const elPos = el.getBoundingClientRect().top;
              if (elPos < triggerPos) {
                el.classList.add('fade-in');
                
                if (el.classList.contains('card')) {
                  const index = el.dataset.index || 0;
                  el.style.animationDelay = `${0.1 * index}s`;
                }
              }
            }
          });
        };
        
        let ticking = false;
        window.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              checkElements();
              ticking = false;
            });
            ticking = true;
          }
        }, { passive: true });
        
        checkElements();
      }
    };
    
    // Optimized counter animation
    const animateCounters = () => {
      const counters = [
        { el: document.getElementById('membersCount'), target: 1500, duration: 2000 },
        { el: document.getElementById('trainersCount'), target: 12, duration: 1500 },
        { el: document.getElementById('classesCount'), target: 35, duration: 1800 },
        { el: document.getElementById('yearsCount'), target: 8, duration: 1200 }
      ];
      
      const animateCounter = (counter) => {
        const startTime = performance.now();
        const duration = counter.duration;
        const startValue = 0;
        const endValue = counter.target;
        
        const updateCounter = (timestamp) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const value = Math.floor(progress * endValue);
          counter.el.textContent = value;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        
        requestAnimationFrame(updateCounter);
      };
      
      counters.forEach(counter => {
        if (counter.el) animateCounter(counter);
      });
    };
    
    // Optimized gallery slider
    const initGallery = () => {
      const gallerySlider = document.querySelector('.gallery-slider');
      const galleryDots = document.querySelectorAll('.gallery-dot');
      let galleryScrollInterval;
      let currentIndex = 0;
      
      const updateDots = (index) => {
        galleryDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      };
      
      const scrollToSlide = (index) => {
        const slides = document.querySelectorAll('.gallery-item');
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        gallerySlider.scrollTo({
          left: slides[index].offsetLeft - 30,
          behavior: 'smooth'
        });
        
        currentIndex = index;
        updateDots(currentIndex);
      };
      
      galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSlide(index));
      });
      
      const startAutoScroll = () => {
        galleryScrollInterval = setInterval(() => {
          scrollToSlide((currentIndex + 1) % document.querySelectorAll('.gallery-item').length);
        }, 5000);
      };
      
      gallerySlider.addEventListener('mouseenter', () => clearInterval(galleryScrollInterval));
      gallerySlider.addEventListener('mouseleave', startAutoScroll);
      
      startAutoScroll();
    };
    
    // Smooth scrolling for anchor links
    const initSmoothScrolling = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    // Progress bar
    const initProgressBar = () => {
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
        
        // Navbar scroll effect
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
        
        // Back to top button
        document.getElementById('backToTop').classList.toggle('active', window.scrollY > 300);
      }, { passive: true });
    };
    
    // Initialize everything
    initScrollAnimations();
    animateCounters();
    initGallery();
    initSmoothScrolling();
    initProgressBar();
    
    // Floating elements for hero section (lighter version)
    const initFloatingElements = () => {
      const container = document.getElementById('floatingElements');
      if (!container) return;
      
      for (let i = 0; i < 15; i++) { // Reduced from 20 to 15
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Simplified styling
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 40 + 10}px;
          height: ${Math.random() * 40 + 10}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          background: rgba(100, 255, 218, ${Math.random() * 0.3});
          border-radius: 50%;
          animation: float ${Math.random() * 15 + 10}s linear infinite ${Math.random() * 5}s;
          opacity: 0;
          will-change: transform;
        `;
        
        container.appendChild(element);
      }
    };
    
    initFloatingElements();
  });