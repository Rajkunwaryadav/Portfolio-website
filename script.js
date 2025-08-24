// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeNavigation();
  initializeAnimations();
  initializeTypingEffect();
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav-menu a').forEach(link => {
          link.addEventListener('click', function() {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
          });
      });
  }

  // Smooth scrolling for navigation links
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
}

// Animation functionality
function initializeAnimations() {
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
  });

  // Add interactive effects to skill tags
  document.querySelectorAll('.skill-tag').forEach(tag => {
      tag.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
      });
  });
}

// Typing effect for hero subtitle
function initializeTypingEffect() {
  const subtitle = document.querySelector('.hero .subtitle');
  if (subtitle) {
      const text = '.NET Developer';
      let index = 0;
      subtitle.textContent = '';

      function typeWriter() {
          if (index < text.length) {
              subtitle.textContent = text.slice(0, index + 1);
              index++;
              setTimeout(typeWriter, 100);
          }
      }

      // Start typing effect after hero animations
      setTimeout(typeWriter, 1800);
  }
}

// Scroll effects
function initializeScrollEffects() {
  let scrollTimer = null;

  // Throttled scroll handler for better performance
  window.addEventListener('scroll', function() {
      if (scrollTimer !== null) {
          clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(updateActiveNavigation, 10);
  });
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
  try {
      let current = '';
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 200;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              current = section.getAttribute('id');
          }
      });

      document.querySelectorAll('.nav-menu a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  } catch (error) {
      console.log('Navigation update error:', error);
  }
}

// Download resume function
function downloadResume() {
  const message = `Resume Download Instructions:
  
To enable resume download:
1. Save your PDF resume as 'Rajkunwar_Yadav_Resume.pdf'
2. Upload it to your web server in the same folder as this website
3. The download will work automatically

Alternative: You can print this portfolio page as PDF for now.

Would you like to print this page as PDF instead?`;
  
  if (confirm(message)) {
      window.print();
  }
}

// Add loading effect
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
      document.body.style.opacity = '1';
  }, 100);
});

// Helper functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to project cards
  document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
      });
  });

  // Add click effects to contact items
  document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', function() {
          const emailElement = this.querySelector('p');
          const phoneElement = this.querySelector('p');
          
          if (emailElement && emailElement.textContent.includes('@')) {
              window.location.href = 'mailto:' + emailElement.textContent;
          } else if (phoneElement && phoneElement.textContent.includes('+91')) {
              window.location.href = 'tel:' + phoneElement.textContent;
          }
      });
  });
});