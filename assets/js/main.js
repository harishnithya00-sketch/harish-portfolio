/**
 * Harish V - Portfolio Interactive Engine
 * Features: Mobile Nav, Skill Filters, Project Modals, Recruiter Fast-Track, Toast Notifications, Copy-to-Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSkillFilters();
  initModals();
  initCopyActions();
  initContactForm();
  initLiveTime();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll listener for sticky glass background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close mobile menu on click link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. SKILLS MATRIX FILTERING
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (filterValue === 'backend' && category === 'backend')) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. MODAL CONTROLLER (Projects & Recruiter Share)
   -------------------------------------------------------------------------- */
const projectData = {
  rainfall: {
    title: "Smart Rainfall & Reservoir Forecast Application",
    type: "Academic Full-Stack Project",
    stack: ["React Native", "Node.js", "Express", "MongoDB", "OpenWeatherMap API", "AsyncStorage"],
    overview: "A comprehensive full-stack mobile application engineered to provide hyper-local city and GPS-based rainfall forecasts coupled with real-time reservoir metrics and disaster warning alerts.",
    features: [
      "City & GPS-based 5-Day Rainfall Predictions integrated with OpenWeatherMap API",
      "Custom Reservoir Data Tracking with live storage gauges and capacity thresholds",
      "Secure user authentication and token/session handling via Node.js and MongoDB backend",
      "Bilingual interface supporting English and Tamil (தமிழ்) with instantaneous UI switching",
      "Offline persistence with AsyncStorage ensuring critical alerts remain accessible without network",
      "Automated alert notification module for flood and drought disaster prevention"
    ],
    architecture: "React Native Mobile Frontend ➔ Node.js/Express REST API Gateway ➔ MongoDB Clustered DB ➔ OpenWeatherMap & Reservoir Webhooks"
  },
  water: {
    title: "Weather & Water Resource Monitoring System",
    type: "Personal IoT & Cloud Project",
    stack: ["React Native", "MongoDB", "REST APIs", "Node.js", "Analytics"],
    overview: "A real-time monitoring and decision-support system built to empower farmers and municipal water resource managers with dynamic irrigation insights and reservoir tracking.",
    features: [
      "Real-time monitoring system supporting agricultural irrigation planning and water conservation",
      "Multilingual UI switching designed for seamless adoption across diverse demographics",
      "Custom RESTful APIs designed for high-throughput sensor data ingestion and query optimization",
      "Secure role-based authentication and structured data validation",
      "Scalable backend architecture with clean separation of concerns and maintainable modular services"
    ],
    architecture: "Mobile & Web Client ➔ REST Ingestion Layer ➔ MongoDB Time-Series Storage ➔ Irrigation Planning Engine"
  }
};

function initModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const projectDetailBtns = document.querySelectorAll('.open-project-modal');

  const modalTitle = document.getElementById('modalProjectTitle');
  const modalType = document.getElementById('modalProjectType');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalStack = document.getElementById('modalProjectStack');
  const modalFeatures = document.getElementById('modalProjectFeatures');
  const modalArch = document.getElementById('modalProjectArch');

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];

      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalType.textContent = data.type;
        modalDesc.textContent = data.overview;
        modalArch.textContent = data.architecture;

        modalStack.innerHTML = data.stack.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        modalFeatures.innerHTML = data.features.map(f => `<li><span style="color: var(--accent-cyan); margin-right: 8px;">▹</span>${f}</li>`).join('');

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

/* --------------------------------------------------------------------------
   4. TOAST NOTIFICATIONS & COPY ACTIONS
   -------------------------------------------------------------------------- */
const Toast = {
  show(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3500);
  }
};

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      Toast.show(successMsg || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    Toast.show(successMsg || 'Copied to clipboard!');
  } catch (err) {
    Toast.show('Unable to auto-copy. Please select and copy manually.', 'info');
  }
  document.body.removeChild(textArea);
}

function initCopyActions() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('harishnithya00@gmail.com', 'Copied Harish\'s Email: harishnithya00@gmail.com');
    });
  });

  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('+919791864950', 'Copied Harish\'s Phone: +91 9791864950');
    });
  });

  const copyPitchBtn = document.getElementById('copyRecruiterPitch');
  if (copyPitchBtn) {
    copyPitchBtn.addEventListener('click', () => {
      const recruiterSummary = `Harish V | Full Stack & Backend Developer
B.Tech IT (CGPA: 7.675) | Nandha Engineering College
3x Oracle Cloud Certified (OCI Generative AI Professional 2025, AI Foundations, Architect Associate)
Tech Stack: Java, Python, Node.js, Express, MongoDB, SQL, React Native, REST APIs
Email: harishnithya00@gmail.com | Phone: +91 9791864950
GitHub: https://github.com/harishnithya00-sketch/harish-portfolio`;
      copyToClipboard(recruiterSummary, 'Copied Harish\'s Recruiter Profile Summary!');
    });
  }
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      Toast.show('Please fill in all required fields.', 'info');
      return;
    }

    // Compose mailto link as direct action
    const mailtoUri = `mailto:harishnithya00@gmail.com?subject=${encodeURIComponent(`Portfolio Message from ${name}: ${subject || 'Opportunity Inquiry'}`)}&body=${encodeURIComponent(`Hi Harish,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    Toast.show(`Opening email client to reach Harish...`);
    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   6. LIVE TIME TICKER
   -------------------------------------------------------------------------- */
function initLiveTime() {
  const timeEl = document.getElementById('liveIstTime');
  if (!timeEl) return;

  function update() {
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const istTime = new Date().toLocaleTimeString('en-US', options);
    timeEl.textContent = `${istTime} IST`;
  }

  update();
  setInterval(update, 1000);
}
