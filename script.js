// Defensive Initialization
window.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons safely
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Star Particle Generation
  const starsContainer = document.getElementById("stars");
  const starCount = 100;

  if (starsContainer) {
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 3 + 2;
      const opacity = Math.random() * 0.5 + 0.3;
      const delay = Math.random() * 5;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--duration", `${duration}s`);
      star.style.setProperty("--opacity", opacity);
      star.style.animationDelay = `${delay}s`;
      starsContainer.appendChild(star);
    }
  }

  // GSAP Animations
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Timeline (Unified & Refined)
    const heroTl = gsap.timeline({ delay: 0.2 });

    // Ensure elements are invisible initially if they weren't hidden by Tailwind
    gsap.set(
      "#heroContent, #techBadges, #heroAvatar, #projectHeader, #contactSection",
      { autoAlpha: 0, y: 30 },
    );

    heroTl
      .to("#heroContent", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      })
      .fromTo(
        "#heroContent > *:not(#techBadges):not(.terminal-bar)",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .fromTo(
        ".terminal-bar",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        ".terminal-bar span",
        { autoAlpha: 0, x: -10 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .to("#techBadges", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.6")
      .fromTo(
        ".tech-badge-enhanced",
        { scale: 0.5, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
      .to(
        "#heroAvatar",
        { autoAlpha: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out" },
        "-=1.5",
      );

    // Hero Mouse Parallax
    const heroAvatar = document.getElementById("heroAvatar");
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;

      if (heroAvatar) {
        gsap.to(heroAvatar, {
          x: moveX * 2,
          y: moveY * 2,
          duration: 1,
          ease: "power2.out",
        });
      }
    });

    // Magnetic Buttons
    const magneticElements = document.querySelectorAll(
      ".btn-magnetic, .social-btn, .tech-badge-enhanced",
    );
    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });

    // Other Scroll Animations
    gsap.to("#aboutLeft, #aboutRight", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "#experience", start: "top 80%" },
    });

    // Projects & Contact reveal
    gsap.to("#projectHeader", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: { trigger: "#projects", start: "top 85%" },
    });

    const projectItems = document.querySelectorAll(".glass-card[id^='proj']");
    projectItems.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });

    gsap.to("#contactSection", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: { trigger: "#contactSection", start: "top 85%" },
    });
  }

  // Mobile Menu
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden"),
    );
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  // Nav Shrink
  const nav = document.getElementById("main-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("py-2");
      nav.classList.remove("py-6");
    } else {
      nav.classList.add("py-6");
      nav.classList.remove("py-2");
    }
  });

  // Cursor Glow
  const cursorGlow = document.querySelector(".cursor-glow");
  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }
});
