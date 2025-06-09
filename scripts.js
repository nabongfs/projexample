// GSAP ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

// Minimal region menu flyout logic
    const btn = document.getElementById('region-btn');
    const menu = document.getElementById('region-menu');
    btn.addEventListener('click', () => {
      const open = menu.getAttribute('aria-hidden') === 'false';
      menu.setAttribute('aria-hidden', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', (!open).toString());
    });
    // Close the menu on click outside or Esc
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === "Escape") {
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    // Default: menu is hidden
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
// GSAP Infinite Marquee
document.addEventListener("DOMContentLoaded", function() {
  const marquee = document.getElementById("gsap-marquee");
  if (!marquee) return;

  // Duplicate the content for seamless looping
  marquee.innerHTML += marquee.innerHTML;

  // Get width of the original content (not the duplicated one)
  const items = marquee.children;
  let contentWidth = 0;
  for (let i = 0; i < items.length / 2; i++) {
    contentWidth += items[i].offsetWidth + parseInt(getComputedStyle(items[i]).marginRight || 0);
  }

  // Animate
  let tween = gsap.to(marquee, {
    x: -contentWidth,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % -contentWidth)
    }
  });

  // Pause on hover
  marquee.parentElement.addEventListener("mouseenter", () => tween.pause());
  marquee.parentElement.addEventListener("mouseleave", () => tween.resume());
});

// Animate light-scroll-section
document.querySelectorAll('.light-scroll-item').forEach(item => {
  const animationType = item.getAttribute('data-animate');
  let animProps = { opacity: 0, y: 50, scale: 0.95 };
  switch(animationType) {
    case 'fade-up':
      animProps = { opacity: 0, y: 50, scale: 1 };
      break;
    case 'slide-left':
      animProps = { opacity: 0, x: -50, scale: 1 };
      break;
    case 'slide-right':
      animProps = { opacity: 0, x: 50, scale: 1 };
      break;
    case 'scale-in':
      animProps = { opacity: 0, scale: 0.8 };
      break;
  }
  gsap.fromTo(item, animProps, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Animate scroll-section
document.querySelectorAll('.scroll-item').forEach(item => {
  const anim = item.getAttribute('data-animation');
  let props = { opacity: 0, y: 40 };
  switch(anim) {
    case 'fade-up':
      props = { opacity: 0, y: 40 };
      break;
    case 'slide-left':
      props = { opacity: 0, x: -40 };
      break;
    case 'slide-right':
      props = { opacity: 0, x: 40 };
      break;
    case 'scale-in':
      props = { opacity: 0, scale: 0.7 };
      break;
  }
  gsap.fromTo(item, props, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Card 3D hover and expand/collapse interactivity
document.querySelectorAll('.elegant-card').forEach(card => {
  const spot = card.querySelector('.card-light-spot');
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spot.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.10) 0%, transparent 66%)`;
  });
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
    spot.style.opacity = 1;
    card.style.transition = 'transform 0.46s cubic-bezier(.26, .95, .48, 1.48), box-shadow 0.35s cubic-bezier(.22,1.2,.42,1.2), border-color 0.3s cubic-bezier(.38,1.69,.65,1)';
    card.style.transform = 'scale(1.055) translateY(-10px)';
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
    spot.style.opacity = 0;
    card.style.transition = 'transform 0.55s cubic-bezier(.36,1.3,.46,1), box-shadow 0.39s cubic-bezier(.22,.61,.24,1), border-color 0.3s cubic-bezier(.38,1.69,.65,1)';
    card.style.transform = 'scale(1) translateY(0)';
  });
  card.addEventListener('focus', () => {
    card.classList.add('hovered');
    spot.style.opacity = 1;
    card.style.transition = 'transform 0.4s cubic-bezier(.36,1.3,.46,1)';
    card.style.transform = 'scale(1.045) translateY(-6px)';
  });
  card.addEventListener('blur', () => {
    card.classList.remove('hovered');
    spot.style.opacity = 0;
    card.style.transition = 'transform 0.46s cubic-bezier(.36,1.3,.46,1)';
    card.style.transform = 'scale(1) translateY(0)';
  });
  // Touch support
  card.addEventListener('touchstart', () => {
    card.classList.add('hovered');
    spot.style.opacity = 1;
  });
  card.addEventListener('touchend', () => {
    card.classList.remove('hovered');
    spot.style.opacity = 0;
  });
});

// Card expand/collapse toggle for show more buttons
document.querySelectorAll('.show-more-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const card = btn.closest('.elegant-card');
    // Collapse other cards
    document.querySelectorAll('.elegant-card.expanded').forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('expanded');
        otherCard.querySelector('.show-more-btn').textContent = 'Show more';
      }
    });
    card.classList.toggle('expanded');
    btn.textContent = card.classList.contains('expanded') ? 'Show less' : 'Show more';
  });
});

// Animated Metrics Section
function animateMetricNumber(el, target, decimals = 0, duration = 2) {
  gsap.fromTo(el, 
    { innerText: 0 }, 
    {
      innerText: target,
      duration: duration,
      ease: "power1.out",
      snap: { innerText: 1 / Math.pow(10, decimals) },
      onUpdate: function() {
        let val = Number(el.innerText);
        el.innerText = decimals > 0 ? val.toFixed(decimals) : Math.floor(val);
      }
    }
  );
}

// Animate metrics when section enters viewport
ScrollTrigger.create({
  trigger: "#metrics",
  start: "top 80%",
  once: true,
  onEnter: () => {
    document.querySelectorAll('.metric-number').forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = (el.getAttribute('data-target').split('.')[1] || '').length;
      animateMetricNumber(el, target, decimals, 2);
    });
  }
});

// Optional: navbar shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
