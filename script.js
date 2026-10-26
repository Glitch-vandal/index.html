document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const animateNumber = (el) => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      if (target % 1 !== 0) {
        el.textContent = `${value.toFixed(1)}${suffix}`;
      } else {
        el.textContent = `${Math.round(value)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const countTargets = document.querySelectorAll("[data-target]");
  countTargets.forEach((el) => {
    el.textContent = "0";
    animateNumber(el);
  });

  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    const height = bar.dataset.height || 0;
    bar.style.height = `${height}%`;
  });

  const progressBars = document.querySelectorAll(".progress span");
  progressBars.forEach((bar) => {
    const width = bar.dataset.width || 0;
    requestAnimationFrame(() => {
      bar.style.width = `${width}%`;
    });
  });

  const cardHoverGlow = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(94,234,212,0.12), rgba(15,22,38,0.86) 36%)`;
  };

  const resetCardGlow = (event) => {
    event.currentTarget.style.background = "";
  };

  document.querySelectorAll(".panel, .metric-card, .risk-card").forEach((card) => {
    card.addEventListener("mousemove", cardHoverGlow);
    card.addEventListener("mouseleave", resetCardGlow);
  });

  const tabButton = document.querySelector(".tab-btn");
  if (tabButton) {
    tabButton.addEventListener("click", () => {
      tabButton.classList.toggle("active");
    });
  }
});
