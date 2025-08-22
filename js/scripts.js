$(function () {
  "use strict";

  /* ===============================  Navbar Menu  =============================== */

  var wind = $(window);

  function noScroll() {
    window.scrollTo(0, 0);
  }

  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".topnav");

    if (bodyScroll > 300) {
      navbar.addClass("nav-scroll");
    } else {
      navbar.removeClass("nav-scroll");
    }
  });

  var open = false,
    navDark = $(".topnav.dark"),
    logoChan = $(".topnav.dark .logo img");

  $(".topnav .menu-icon").on("click", function () {
    open = !open;

    $(".hamenu").toggleClass("open");

    if (open) {
      $(".hamenu").animate({ left: 0 });

      $(".topnav .menu-icon .text").addClass("open");

      navDark.addClass("navlit");
      logoChan.attr("src", "img/logo/logo-white.png");

      window.addEventListener("scroll", noScroll);
    } else {
      $(".hamenu").delay(300).animate({ left: "-100%" });

      $(".topnav .menu-icon .text").removeClass("open");

      navDark.removeClass("navlit");
      logoChan.attr("src", "img/logo-dark.png");

      window.removeEventListener("scroll", noScroll);
    }
  });

  $(".hamenu .menu-links .main-menu > li").on("mouseenter", function () {
    $(this).css("opacity", "1").siblings().css("opacity", ".5");
  });

  $(".hamenu .menu-links .main-menu > li").on("mouseleave", function () {
    $(".hamenu .menu-links .main-menu > li").css("opacity", "1");
  });

  $(".main-menu > li .dmenu").on("click", function () {
    $(".main-menu").addClass("gosub");
    $(this).parent().parent().find(".sub-menu").addClass("sub-open");
  });

  $(".main-menu .sub-menu li .sub-link.back").on("click", function () {
    $(".main-menu").removeClass("gosub");
    $(".main-menu .sub-menu").removeClass("sub-open");
  });

  /* ===============================  Swiper slider  =============================== */

  // var parallaxSlider;
  // var parallaxSliderOptions = {
  //   speed: 3000,
  //   autoplay: true,
  //   parallax: true,
  //   loop: true,
  //   pagination: {
  //     el: ".slider .parallax-slider .swiper-pagination",
  //     clickable: true,
  //   },
  //   on: {
  //     init: function () {
  //       var swiper = this;
  //       for (var i = 0; i < swiper.slides.length; i++) {
  //         $(swiper.slides[i])
  //           .find(".bg-img")
  //           .attr({
  //             "data-swiper-parallax": 0.75 * swiper.width,
  //           });
  //       }
  //     },
  //     resize: function () {
  //       this.update();
  //     },
  //   },

  //   pagination: {
  //     el: ".slider .parallax-slider .swiper-pagination",
  //     type: "fraction",
  //   },

  //   navigation: {
  //     nextEl: ".slider .parallax-slider .next-ctrl",
  //     prevEl: ".slider .parallax-slider .prev-ctrl",
  //   },
  // };
  // parallaxSlider = new Swiper(
  //   ".slider .parallax-slider",
  //   parallaxSliderOptions
  // );

  // var parallaxSliderOptions = {
  //   speed: 3000,
  //   mousewheel: true,
  //   parallax: true,
  //   loop: true,
  //   pagination: {
  //     el: ".slide-full .parallax-slider .swiper-pagination",
  //     clickable: true,
  //   },
  //   on: {
  //     init: function () {
  //       var swiper = this;
  //       for (var i = 0; i < swiper.slides.length; i++) {
  //         $(swiper.slides[i])
  //           .find(".bg-img")
  //           .attr({
  //             "data-swiper-parallax": 0.75 * swiper.width,
  //           });
  //       }
  //     },
  //     resize: function () {
  //       this.update();
  //     },
  //   },

  //   pagination: {
  //     el: ".slide-full .parallax-slider .swiper-pagination",
  //     type: "fraction",
  //   },

  //   navigation: {
  //     nextEl: ".slide-full .parallax-slider .next-ctrl",
  //     prevEl: ".slide-full .parallax-slider .prev-ctrl",
  //   },
  // };
  // parallaxSlider = new Swiper(
  //   ".slide-full .parallax-slider",
  //   parallaxSliderOptions
  // );

  //-----------work-carousel metro-------------//
  var swiperWorkMetro = new Swiper(".metro .swiper-container", {
    slidesPerView: 2,
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    centeredSlides: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
    },

    pagination: {
      el: ".metro .swiper-pagination",
      type: "progressbar",
    },

    navigation: {
      nextEl: ".metro .next-ctrl",
      prevEl: ".metro .prev-ctrl",
    },
  });

  var swiperWorkColspace = new Swiper(".colspace .swiper-container", {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    centeredSlides: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },

    pagination: {
      el: ".colspace .swiper-pagination",
      type: "progressbar",
    },

    navigation: {
      nextEl: ".colspace .next-ctrl",
      prevEl: ".colspace .prev-ctrl",
    },
  });

  //-------------portfolio---------------//
  var swiperWorkSlider = new Swiper(".slider-scroll .swiper-container", {
    slidesPerView: 2,
    spaceBetween: 30,
    mousewheel: true,
    centeredSlides: true,
    speed: 1000,
    loop: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
      },
    },

    navigation: {
      nextEl: ".slider-scroll .next-ctrl",
      prevEl: ".slider-scroll .prev-ctrl",
    },
  });
  //--------blog----------------//
  // var swiperBlogImg = new Swiper(".blog .swiper-img", {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   speed: 800,
  //   loop: true,
  //   effect: "fade",

  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  //   },
  //   pagination: {
  //     el: ".blog .controls .swiper-pagination",
  //     type: "fraction",
  //   },

  //   navigation: {
  //     nextEl: ".next-ctrl",
  //     prevEl: ".prev-ctrl",
  //   },
  // });

  // var swiperBlogContent = new Swiper(".blog .swiper-content", {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   speed: 800,
  //   loop: true,

  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  //   },

  //   pagination: {
  //     el: ".blog .controls .swiper-pagination",
  //     type: "fraction",
  //   },

  //   navigation: {
  //     nextEl: ".blog .controls .next-ctrl",
  //     prevEl: ".blog .controls .prev-ctrl",
  //   },
  // });

  /* ===============================  Mouse Hover  =============================== */

  $(".about .items").on("mouseenter", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".social .icon").on("click", function () {
    $(this).parent().toggleClass("active");
  });

  $(".team .item .img").on("mouseenter", function () {
    $(".team .item .img").addClass("filter");
    $(this).removeClass("filter");
  });

  $(".team .item .img").on("mouseleave", function () {
    $(".team .item .img").removeClass("filter");
  });

  /* ===============================  Var Background image  =============================== */

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  /* ===============================  slick Carousel  =============================== */

  $(".testimonials .slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: ".prev",
    nextArrow: ".next",
    dots: false,
    autoplay: true,
    fade: true,
    asNavFor: ".slider-nav",
  });

  $(".testimonials .slider-nav").slick({
    slidesToShow: 1,
    asNavFor: ".slider-for",
    arrows: false,
    dots: false,
    focusOnSelect: true,
  });

  /* ===============================  drawsvg icon  =============================== */

  var anim = true;
  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop();
    var _target = $(".about").offset().top - 75;
    if (bodyScroll >= _target) {
      if (anim) {
        $(".about .svg-icon").each(function () {
          var $svg = $(".svg-icon").drawsvg({
            duration: 4000,
          });
          $svg.drawsvg("animate");
        });
        anim = false;
      }
    }
  });

  /* ===============================  YouTubePopUp  =============================== */

  $("a.vid").YouTubePopUp();

  /* ===============================  parallaxie  =============================== */

  $(".parallaxie").parallaxie({
    speed: 0.2,
    size: "cover",
  });

  /* ===============================  justifiedGallery  =============================== */
  //*----------project---------------//
  $(".justified-gallery").justifiedGallery({
    rowHeight: 400,
    lastRow: "nojustify",
    margins: 15,
  });

  /* ===============================  blog-grid  =============================== */

  var blgImg = $(".blog-grid .post-img .img").outerHeight() + 120;

  $(".blog-grid .bg-pattern").css("height", blgImg);
});

// === window When Loading === //

/* ===============================  SPLITTING TEXT  =============================== */
/* ===============================  SPLITTING  =============================== */
$(window).on("load", function () {
  Splitting();

  var imageUp = document.getElementsByClassName("thumparallax");
  new simpleParallax(imageUp, {
    delay: 1,
  });

  var imageDown = document.getElementsByClassName("thumparallax-down");
  new simpleParallax(imageDown, {
    orientation: "down",
    delay: 1,
  });

  /* ===============================  isotope Masonery  =============================== */

  $(".gallery").isotope({
    itemSelector: ".items",
  });

  var $gallery = $(".gallery").isotope();

  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });
});

/* ===============================  Hide / show navbar  =============================== */

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("#navi").outerHeight();
$(window).on("scroll", function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st > navbarHeight) {
    $("#navi").css("top", "-100px");
  } else {
    if (st + $(window).height() < $(document).height()) {
      $("#navi").css("top", "0");
    }
  }

  lastScrollTop = st;
}

/* ===============================  Preloader page  =============================== */

// paceOptions = {
//   ajax: true,
//   document: true,
//   eventLag: false,
// };

// Pace.on("done", function () {
//   $("#preloader").addClass("isdone");
//   $(".loading-text").addClass("isdone");
// });

/* ===============================  Wow Animation  =============================== */

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

$(document).ready(function () {
  "use strict";

  //Scroll back to top

  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

/* ===============================  fade slideshow  =============================== */
$(window).scroll(function () {
  var scrolled = $(this).scrollTop();
  $(".slider .caption").css({
    transform: "translate3d(0, " + -(scrolled * 0.2) + "px, 0)",
    opacity: 1 - scrolled / 600,
  });
});

/* ===============================  Loader  =============================== */

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none";
  }, 1000);
});

/*-=============blog===================*/
var videoSwiper = new Swiper(".videoSwiper", {
  slidesPerView: 3,
  spaceBetween: 40, // Adjust spacing between slides
  loop: false, // No infinite loop to avoid partial peeking
  centeredSlides: false, // Prevents extra partial slides from showing
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".video-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }, // Large screens show exactly 3
  },
});

/*--============================================================== */

/* Hero Slider Layout JS */
const hero_slider_layout = new Swiper(".hero-slider-layout .swiper", {
  slidesPerView: 1,
  speed: 1000,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
});
/* Hero Slider Layout JS End */
/*--============================================================== */

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 992) {
    // desktop only
    document
      .querySelectorAll(".nav-item.dropdown")
      .forEach(function (dropdown) {
        let link = dropdown.querySelector(".dropdown-toggle");
        let menu = dropdown.querySelector(".dropdown-menu");

        dropdown.addEventListener("mouseenter", function () {
          link.classList.add("show");
          menu.classList.add("show");
        });

        dropdown.addEventListener("mouseleave", function () {
          link.classList.remove("show");
          menu.classList.remove("show");
        });
      });
  }
});
/*--============================================================== */
