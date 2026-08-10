/**
 * Krish Kumar Dey - Recruiter UX, Scroll Progress & Accessibility Engine
 * 
 * Features:
 * 1. Top Hairline Scroll Progress Bar Manager
 * 2. IntersectionObserver Active Navigation Section Tracking
 * 3. Subtle Scroll Reveal Observer (.reveal-on-scroll)
 * 4. One-Click Email Copy & Notification System
 */

function initRecruiterUX() {
  setupScrollProgressBar();
  setupActiveSectionObserver();
  setupScrollRevealObserver();
  setupEmailCopyHandler();
  setupResumeCtaHandler();
}

/* --------------------------------------------------------------------------
   Top Hairline Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function setupScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress.toFixed(1)}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   IntersectionObserver Active Section Navigation Indicator
   -------------------------------------------------------------------------- */
function setupActiveSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navLinks a.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          if (href === activeId) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   Subtle Scroll Reveal Observer (.reveal-on-scroll)
   -------------------------------------------------------------------------- */
function setupScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.section, .about-card, .focus-card, .project-tilt-card, .platform-card');
  if (!revealElements.length) return;

  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   One-Click Email Copy Handler
   -------------------------------------------------------------------------- */
function setupEmailCopyHandler() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const btnText = document.getElementById('copyBtnText');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'krishdey100@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (btnText) btnText.textContent = 'Copied!';
      copyBtn.style.borderColor = 'var(--color-emerald)';
      copyBtn.style.color = 'var(--color-emerald)';

      setTimeout(() => {
        if (btnText) btnText.textContent = 'Copy';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
    });
  });
}

/* --------------------------------------------------------------------------
   Resume CTA Handler Placeholder
   -------------------------------------------------------------------------- */
function setupResumeCtaHandler() {
  const resumeBtns = document.querySelectorAll('.btn-resume-cta');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume PDF Placeholder: Krish Kumar Dey CV is available upon request (krishdey100@gmail.com).');
    });
  });
}
