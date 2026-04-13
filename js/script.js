// ═══════════════════════════════════════
// NAVBAR SCROLL SHADOW
// ═══════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 60
    ? '0 4px 30px rgba(123,47,255,0.22)' : 'none';
});

// ═══════════════════════════════════════
// MOBILE TOGGLE
// ═══════════════════════════════════════
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ═══════════════════════════════════════
// ACTIVE NAV ON SCROLL
// ═══════════════════════════════════════
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ═══════════════════════════════════════
// ACCORDION
// ═══════════════════════════════════════
document.querySelectorAll('.acc-header').forEach(header => {
  header.addEventListener('click', () => {
    const item   = header.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => {
      i.classList.remove('open');
      const ic = i.querySelector('.acc-header i');
      if (ic) ic.className = 'fas fa-chevron-right';
    });
    if (!isOpen) {
      item.classList.add('open');
      const ic = header.querySelector('i');
      if (ic) ic.className = 'fas fa-chevron-down';
    }
  });
});

// ═══════════════════════════════════════
// PLATFORM TABS
// ═══════════════════════════════════════
document.querySelectorAll('.platform-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
  tab.addEventListener('mouseenter', () => {
    document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ═══════════════════════════════════════
// SCROLL REVEAL (no stat-item)
// ═══════════════════════════════════════
const revealEls = document.querySelectorAll(
  '.service-card, .platform-tab, .acc-item, .portfolio-card'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════
// COUNTER ANIMATION — standalone, no DOMContentLoaded
// ═══════════════════════════════════════
function animateCounter(el) {
  const target    = parseInt(el.getAttribute('data-target'));
  const suffix    = el.getAttribute('data-suffix') || '';
  const duration  = 2000;
  const steps     = 60;
  const increment = Math.ceil(target / steps);
  let current     = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, duration / steps);
}

window.addEventListener('load', () => {
  const counterEls = document.querySelectorAll('.counter');

  if (counterEls.length === 0) {
    console.warn('No .counter elements found!');
    return;
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  counterEls.forEach(el => counterObserver.observe(el));
});

// ═══════════════════════════════════════
// MODAL
// ═══════════════════════════════════════
const bookCallBtn   = document.querySelector('.btn-book-call');
const bookCallModal = document.getElementById('bookCallModal');
const modalClose    = document.getElementById('modalClose');

if (bookCallBtn) {
  bookCallBtn.addEventListener('click', () => {
    bookCallModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}
if (modalClose) {
  modalClose.addEventListener('click', () => {
    bookCallModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}
if (bookCallModal) {
  bookCallModal.addEventListener('click', (e) => {
    if (e.target === bookCallModal) {
      bookCallModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ═══════════════════════════════════════
// PORTFOLIO SLIDER
// ═══════════════════════════════════════
window.addEventListener('load', () => {
  const slider = document.getElementById('portfolioSlider');
  const dotsContainer = document.getElementById('sliderDots');

  if (!slider || !dotsContainer) return;

  let isDesktop = window.innerWidth >= 1400;

  function buildDots() {
    isDesktop = window.innerWidth >= 1400;
    dotsContainer.innerHTML = '';

    const count = isDesktop ? 2 : 4;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.classList.add('dot');
      if (i === 0) span.classList.add('active');
      span.setAttribute('data-index', i);
      dotsContainer.appendChild(span);
    }

    bindDots();
  }

  function setActiveDot(index) {
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    if (dots[index]) dots[index].classList.add('active');
  }

  function bindDots() {
    document.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        const cards = slider.querySelectorAll('.portfolio-card');

        if (isDesktop) {
          // dot 0 → card 0, dot 1 → card 2
          const cardIndex = index === 0 ? 0 : 2;
          if (cards[cardIndex]) {
            slider.scrollTo({ left: cards[cardIndex].offsetLeft - slider.offsetLeft, behavior: 'smooth' });
          }
        } else {
          if (cards[index]) {
            slider.scrollTo({ left: cards[index].offsetLeft - slider.offsetLeft, behavior: 'smooth' });
          }
        }

        setActiveDot(index);
      });
    });
  }

  slider.addEventListener('scroll', () => {
    const card = slider.querySelector('.portfolio-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24;
    const scrollIndex = Math.round(slider.scrollLeft / cardWidth);

    if (isDesktop) {
      // cards 0-1 → dot 0, cards 2-3 → dot 1
      setActiveDot(scrollIndex >= 2 ? 1 : 0);
    } else {
      setActiveDot(scrollIndex);
    }
  });

  // Init
  buildDots();

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    }, 200);
  });
});


// ═══════════════════════════════════════
// CONTACT FORM — EmailJS
// ═══════════════════════════════════════
window.addEventListener('load', () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName    = document.getElementById("fullName");
    const email       = document.getElementById("email");
    const phone       = document.getElementById("phone");
    const requirement = document.getElementById("requirement");
    const pageUrl     = document.getElementById("gamedevpageUrl");
    const submitBtn   = document.querySelector(".fcf-submit-btn");

    if (pageUrl) pageUrl.value = window.location.href;

    [fullName, email, phone, requirement].forEach(input => {
      input.style.borderColor = "#ccc";
    });

    let isValid = true;

    if (fullName.value.trim().length < 3) {
      isValid = false;
      fullName.style.borderColor = "red";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.style.borderColor = "red";
      alert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^(\+|0)?[\d\s\-()]{7,20}$/;
    if (!phonePattern.test(phone.value.trim())) {
      isValid = false;
      phone.style.borderColor = "red";
    } else {
      phone.style.borderColor = "";
    }

    if (requirement.value.trim().length < 10) {
      isValid = false;
      requirement.style.borderColor = "red";
    }

    if (!isValid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    submitBtn.disabled = true;

    const templateParams = {
      name:     fullName.value.trim(),
      email:    email.value.trim(),
      phone:    phone.value.trim(),
      message:  requirement.value.trim(),
      page_url: pageUrl ? pageUrl.value : window.location.href,
      time:     new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send("service_h38sdpk", "template_lbjyykk", templateParams);
      if (response.status === 200) {
        setTimeout(() => { window.location.href = "https://sdlccorp.com/thank-you/"; }, 100);
      } else {
        throw new Error("Email failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to send message. Please try again later.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "GET FREE PROJECT ESTIMATE";
    }
  });
});


const bookForm = document.getElementById('bookForm');
if (bookForm) {
  bookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'https://calendly.com/sdlccorp/requirement-discussion-meeting';
  });
}


window.addEventListener('load', () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName    = document.getElementById("fullName");
    const email       = document.getElementById("email");
    const phone       = document.getElementById("phone");
    const requirement = document.getElementById("requirement");
    const pageUrl     = document.getElementById("gamedevpageUrl");
    const submitBtn   = document.querySelector(".fcf-submit-btn");

    if (pageUrl) pageUrl.value = window.location.href;

    [fullName, email, phone, requirement].forEach(input => {
      input.style.borderColor = "#ddd";
    });

    let isValid = true;

    if (fullName.value.trim().length < 3) {
      isValid = false;
      fullName.style.borderColor = "red";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.style.borderColor = "red";
      alert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^(\+|0)?[\d\s\-()]{7,20}$/;
    if (!phonePattern.test(phone.value.trim())) {
      isValid = false;
      phone.style.borderColor = "red";
    } else {
      phone.style.borderColor = "";
    }

    if (requirement.value.trim().length < 10) {
      isValid = false;
      requirement.style.borderColor = "red";
    }

    if (!isValid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    submitBtn.disabled = true;

    const templateParams = {
      name:     fullName.value.trim(),
      email:    email.value.trim(),
      phone:    phone.value.trim(),
      message:  requirement.value.trim(),
      page_url: pageUrl ? pageUrl.value : window.location.href,
      time:     new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send("service_h38sdpk", "template_lbjyykk", templateParams);
      if (response.status === 200) {
        document.getElementById("contactForm").reset(); 
        setTimeout(() => {
          window.location.href = "https://sdlccorp.com/thank-you/";
        }, 100);
      } else {
        throw new Error("Email failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to send message. Please try again later.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit →";
      document.getElementById("contactForm").reset();
    }
  });
});

window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    window.location.reload();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.acc-item')
  const overlayImg = document.getElementById('genreOverlayImg')

  items.forEach(item => {
    const header = item.querySelector('.acc-header')
    header.addEventListener('click', () => {
      items.forEach(i => {
        i.classList.remove('open')
        i.querySelector('i').className = 'fas fa-chevron-right'
      })
      item.classList.add('open')
      header.querySelector('i').className = 'fas fa-chevron-down'

      // ← just change src directly, no opacity animation
      const img = item.getAttribute('data-img')
      overlayImg.src = 'assets/images/' + img
    })
  })
})

function validateAndSubmitBookForm() {
  const fields = [
    {
      id: 'bookFullName',
      check: v => v.trim().length >= 3,
      msg: 'Full name must be at least 3 characters.'
    },
    {
      id: 'bookEmail',
      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid email address.'
    },
    {
      id: 'bookPhone',
      check: v => /^[+\d\s\-()]{7,15}$/.test(v.trim()),
      msg: 'Please enter a valid phone number.'
    },
    {
      id: 'bookCompany',
      check: v => v.trim().length >= 2,
      msg: 'Please enter your company or studio name.'
    },
    {
      id: 'bookProjectType',
      check: v => v !== '',
      msg: 'Please select a project type.'
    },
    {
      id: 'bookBudget',
      check: v => v !== '',
      msg: 'Please select a budget range.'
    },
    {
      id: 'bookMessage',
      check: v => v.trim().length >= 20,
      msg: 'Please describe your project (min 20 characters).'
    }
  ];

  let isValid = true;

  fields.forEach(({ id, check, msg }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById('err-' + id);

    if (!check(el.value)) {
      el.style.borderColor = '#ff4d4d';
      errEl.textContent = msg;
      isValid = false;
    } else {
      el.style.borderColor = '';
      errEl.textContent = '';
    }

    el.addEventListener('input', () => {
      if (check(el.value)) {
        el.style.borderColor = '';
        errEl.textContent = '';
      }
    });
  });

  if (!isValid) return;

  // All valid — redirect
  window.location.href = 'https://sdlccorp.com/thank-you/';
}

function validateAndSubmitConsult() {
  const fields = [
    {
      id: 'consultName',
      check: v => v.trim().length >= 3,
      msg: 'Full name must be at least 3 characters.'
    },
    {
      id: 'consultEmail',
      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid email address.'
    },
    {
      id: 'consultPhone',
      check: v => /^[+\d\s\-()]{7,15}$/.test(v.trim()),
      msg: 'Please enter a valid phone number.'
    },
    {
      id: 'consultRequirement',
      check: v => v.trim().length >= 10,
      msg: 'Please describe your requirements (min 10 characters).'
    }
  ];

  let isValid = true;

  fields.forEach(({ id, check, msg }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById('err-' + id);

    if (!check(el.value)) {
      el.style.borderColor = 'red';
      errEl.textContent = msg;
      isValid = false;
    } else {
      el.style.borderColor = '';
      errEl.textContent = '';
    }

    el.addEventListener('input', () => {
      if (check(el.value)) {
        el.style.borderColor = '';
        errEl.textContent = '';
      }
    });
  });

  if (!isValid) return;

  // All valid — clear and redirect
  document.getElementById('consultForm').reset();
  window.location.href = 'https://sdlccorp.com/thank-you/';
}


const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length) {
  serviceCards[0].classList.add('featured');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('featured'));
      card.classList.add('featured');
    });
  });
}





