/* ============================================================
   JACK OF ALL TRADES — LUXURY INTERACTIONS
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled background
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scroll direction fade out/in (Navigation contents)
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      // Scrolling down -> fade out contents
      navbar.classList.add('nav-hidden');
    } else {
      // Scrolling up -> fade in contents
      navbar.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
    
    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // 1b. Mobile Hamburger Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinksContainer.classList.contains('open'));
    });
    
    // Close menu when a link is clicked
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 1c. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 1.5 Typewriter Effect for Headlines
  const headings = document.querySelectorAll('.title-xl, .title-lg, .title-md');
  headings.forEach(heading => {
    if (!heading.classList.contains('reveal')) {
      heading.classList.add('reveal');
    }
    
    let delay = 0;
    const walk = (node) => {
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        if (!text.trim()) return;
        const fragment = document.createDocumentFragment();
        // Split by spaces to group words
        const words = text.split(/(\s+)/);
        words.forEach(word => {
          if (!word.trim()) {
            fragment.appendChild(document.createTextNode(word));
          } else {
            // Wrap the word to prevent its characters from breaking across lines
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            for (let i = 0; i < word.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.className = 'char-reveal';
              charSpan.textContent = word[i];
              charSpan.style.transitionDelay = `${delay}s`;
              wordSpan.appendChild(charSpan);
              delay += 0.015;
            }
            fragment.appendChild(wordSpan);
          }
        });
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === 1) {
        Array.from(node.childNodes).forEach(walk);
      }
    };
    Array.from(heading.childNodes).forEach(walk);
  });

  // 2. Scroll Reveal Animations (Bidirectional)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Reverse animation when scrolling out
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('active');
        }
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // 3. 3D Card Hover & Flip for all interactive cards
  // Note: We attach the flip to the parent container that has the perspective, 
  // and we rotate the element itself. 
  // In the updated HTML, the rotating element is the `.interactive-card` or `.skill-card-container` itself.
  
  const interactiveCards = document.querySelectorAll('.interactive-card');
  
  interactiveCards.forEach(card => {
    // 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
      // Do not tilt if the card is already flipped to its back
      if (card.classList.contains('flipped')) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg for ultra-subtle luxury feel
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset tilt on mouse leave
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('flipped')) {
        card.style.transform = `perspective(2000px) rotateX(0) rotateY(0)`;
      }
    });
    
    // Flip interaction on click
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (card.classList.contains('flipped')) {
        card.style.transform = `perspective(2000px) rotateY(180deg)`;
      } else {
        card.style.transform = `perspective(2000px) rotateX(0) rotateY(0)`;
      }
    });
  });
  
  // 4. Fill Ticker Content Dynamically
  const tickers = document.querySelectorAll('.ticker');
  const tickerItems = [
    "Jack of All Trades",
    "Social Media Specialist",
    "Digital Marketer",
    "AI Generalist",
    "Creative Thinker",
    "Continuous Learner"
  ];
  
  tickers.forEach(ticker => {
    let html = '';
    // Duplicate 4 times to ensure smooth infinite scrolling even on ultrawide monitors
    for(let i = 0; i < 4; i++) {
      tickerItems.forEach(item => {
        html += `<div class="ticker-item">${item} <span class="ticker-separator">♦</span></div>`;
      });
    }
    ticker.innerHTML = html;
  });
  
  // 5. Skill Cards (Interaction replaced by CSS hover)
  // JS expanding logic removed per user request for premium hover only
});
