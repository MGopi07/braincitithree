(function () {
  const section = document.getElementById("zigzag");
  const flyer = section.querySelector(".flyer");
  const flyerWrap = section.querySelector(".flyer-inner");
  const imgA = document.getElementById("flyerImgA");
  const imgB = document.getElementById("flyerImgB");
  const products = Array.from(section.querySelectorAll(".product"));

  /* IMPORTANT: target the inner frame <img> so flyer aligns visually */
  const slots = products.map(
    (p) =>
      p.querySelector("[data-slot] .frame-img") ||
      p.querySelector("[data-slot]")
  );

  if (!flyer || !flyerWrap || !imgA || !imgB || products.length === 0) return;

  /* Timing & motion */
  const lerpFactor = 0.05; // Still used for smooth movement *towards* the target during scroll
  const posTol = 1; // Lower tolerance for snapping
  const sizeTol = 1; // Lower tolerance for snapping
  const HOLD_MS = 50;
  let holdTimer = null;
  let isSnapping = true; // New flag to control snapping behavior

  const state = {
    x: 0,
    y: 0,
    w: flyerWrap.offsetWidth,
    h: flyerWrap.offsetHeight,
    tx: 0,
    ty: 0,
    tw: flyerWrap.offsetWidth,
    th: flyerWrap.offsetHeight,
  };

  let currentIdx = 0;
  let desiredIdx = 0;
  let pendingIdx = null; // Represents the index we are actively trying to animate to and crossfade

  function updateTargetFromSlot(slotEl) {
    if (!slotEl) return;
    const r = slotEl.getBoundingClientRect();
    const s = section.getBoundingClientRect();
    state.tw = r.width;
    state.th = r.height;
    state.tx = r.left - s.left + (r.width - state.tw) / 2;
    state.ty = r.top - s.top + (r.height - state.th) / 2;
  }

  function near(a, b, t) {
    return Math.abs(a - b) <= t;
  }
  function atDestination() {
    return (
      near(state.x, state.tx, posTol) &&
      near(state.y, state.ty, posTol) &&
      near(state.w, state.tw, sizeTol) &&
      near(state.h, state.th, sizeTol)
    );
  }

  function animate() {
    state.x += (state.tx - state.x) * lerpFactor;
    state.y += (state.ty - state.y) * lerpFactor;
    state.w += (state.tw - state.w) * lerpFactor;
    state.h += (state.th - state.h) * lerpFactor;

    flyerWrap.style.width = state.w + "px";
    flyerWrap.style.height = state.h + "px";
    flyerWrap.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;

    // Logic to trigger image crossfade and active state
    if (
      pendingIdx !== null &&
      desiredIdx === pendingIdx &&
      atDestination() &&
      currentIdx !== pendingIdx
    ) {
      if (!holdTimer) {
        holdTimer = setTimeout(() => {
          const el = products[pendingIdx];
          const url = el.dataset.img;
          const alt = el.dataset.alt || "";
          crossfadeTo(url, alt);
          products.forEach((p) => p.classList.remove("is-active"));
          el.classList.add("is-active");
          currentIdx = pendingIdx;
          pendingIdx = null; // Reset pendingIdx after the action is complete
          holdTimer = null;
        }, HOLD_MS);
      }
    } else if (holdTimer) {
      // Clear the hold timer if the conditions for hold are no longer met
      clearTimeout(holdTimer);
      holdTimer = null;
    }

    // IMPORTANT: Ensure pendingIdx is updated to desiredIdx if a new target is observed.
    // This ensures that when the flyer moves close to a new desired target, the
    // crossfade logic in the block above can activate.
    if (desiredIdx !== currentIdx && pendingIdx === null) {
      pendingIdx = desiredIdx;
    }

    requestAnimationFrame(animate);
  }

  /* Crossfade */
  let topIsA = true;
  function crossfadeTo(url, alt) {
    const topImg = topIsA ? imgA : imgB;
    const botImg = topIsA ? imgB : imgA;

    // If the top image already has the correct URL and is visible, do nothing
    if (
      topImg.getAttribute("src") === url &&
      topImg.classList.contains("is-visible")
    )
      return;

    const doSwap = () => {
      botImg.onload = () => {
        botImg.onload = null; // Clear onload to prevent multiple calls
        botImg.classList.add("is-visible");
        topImg.classList.remove("is-visible");
        topIsA = !topIsA; // Toggle which image is 'top'
      };
      botImg.alt = alt || "";
      botImg.src = url;

      // If the image is already complete (from cache), trigger visibility immediately
      if (botImg.complete) {
        botImg.classList.add("is-visible");
        topImg.classList.remove("is-visible");
        topIsA = !topIsA;
      }
    };
    setTimeout(doSwap, 10); // Small delay to ensure render cycle
  }

  /* Init */
  function init() {
    if (slots[0]) {
      const r = slots[0].getBoundingClientRect();
      const s = section.getBoundingClientRect();
      state.w = state.tw = r.width;
      state.h = state.th = r.height;
      state.x = state.tx = r.left - s.left + (r.width - state.w) / 2;
      state.y = state.ty = r.top - s.top + (r.height - state.h) / 2;

      flyerWrap.style.width = state.w + "px";
      flyerWrap.style.height = state.h + "px";
      flyerWrap.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      flyer.style.opacity = "1"; // Make flyer visible after initial positioning
    }

    const url0 = products[0].dataset.img;
    const alt0 = products[0].dataset.alt || "";
    imgA.src = url0;
    imgA.alt = alt0;
    imgA.classList.add("is-visible");
    imgB.src = url0;
    imgB.alt = alt0;
    imgB.classList.remove("is-visible");
    products[0].classList.add("is-active");

    requestAnimationFrame(animate); // Start the animation loop
  }

  /* Observe which product is “current” */
  const productObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Only act if the element is intersecting the root (viewport)
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const idx = products.indexOf(el);
        if (idx < 0) return;

        // When a new product intersects, update the desired target
        desiredIdx = idx;
        // Immediately set pendingIdx to desiredIdx to signal a new target is being aimed for
        pendingIdx = idx;
        updateTargetFromSlot(slots[idx]);
        isSnapping = false; // Allow smooth movement when a new target is observed
      });
    },
    {
      // The product needs to be at least 10% visible
      threshold: 0.1,
      // The root margin ensures that the observer considers elements
      // intersecting when they are 20% from the bottom of the viewport.
      // This is crucial for triggering updates *before* the product
      // is fully centered, giving the animation time.
      rootMargin: "0px 0px -20% 0px",
    }
  );

  // Observe all product elements
  products.forEach((p) => productObserver.observe(p));

  /* Keep target on resize */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Update target based on the currently desired, active, or first product
      updateTargetFromSlot(slots[desiredIdx] || slots[currentIdx] || slots[0]);
      // After resize, force a snap to the new target position to prevent glitches
      state.x = state.tx;
      state.y = state.ty;
      state.w = state.tw;
      state.h = state.th;
      flyerWrap.style.width = state.w + "px";
      flyerWrap.style.height = state.h + "px";
      flyerWrap.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      isSnapping = true; // Re-enable snapping behavior after resize adjustment
    }, 60); // Debounce resize events
  });

  /* Preload images */
  (function preload() {
    products.forEach((p) => {
      const u = p.dataset.img;
      if (u) {
        const i = new Image();
        i.decoding = "async";
        i.src = u;
      }
    });
  })();

  init();
})();

//-------our process----//

var swiper = new Swiper(".mySwiper-process", {
  slidesPerView: 1,
  spaceBetween: 50,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
  on: {
    init: function () {
      let activeSlide = this.slides[this.activeIndex];
      if (activeSlide) {
        let mainbox = activeSlide.querySelector(".mainbox");
        if (mainbox) {
          mainbox.classList.add("active");
        }
      }
    },
    slideChangeTransitionEnd: function () {
      document.querySelectorAll(".swiper-slide .mainbox").forEach((el) => {
        el.classList.remove("active");
      });
      let activeSlide = this.slides[this.activeIndex];
      if (activeSlide) {
        let mainbox = activeSlide.querySelector(".mainbox");
        if (mainbox) {
          mainbox.classList.add("active");
        }
      }
    },
  },
});

/*-----------*/

var swiper = new Swiper(".phone-slider", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "fade", // you can also try 'slide', 'cube', 'coverflow'
  speed: 800,
});

/*---------faq----------*/

var $titleTab = $(".title_tab");
$(".Accordion_item:eq(0)")
  .find(".title_tab")
  .addClass("active")
  .next()
  .stop()
  .slideDown(300);
$titleTab.on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).next().stop().slideUp(500);
    $(this).next().find("p").removeClass("show");
  } else {
    $(this).addClass("active");
    $(this).next().stop().slideDown(500);
    $(this).parent().siblings().children(".title_tab").removeClass("active");
    $(this).parent().siblings().children(".inner_content").slideUp(500);
    $(this)
      .parent()
      .siblings()
      .children(".inner_content")
      .find("p")
      .removeClass("show");
    $(this).next().find("p").addClass("show");
  }
});
//-------end faq-----//
