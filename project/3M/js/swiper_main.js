// ✅ 전역에서 사용할 Swiper 초기화 함수
window.initSwipers = function () {
  // 메인 배너
  new Swiper(".mainSwiper", {
    speed: 2200,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    parallax: true,
    slideActiveClass: 'aniOn',
    pagination: {
      el: "#mainSW-progress .swiper-pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
      },
      formatFractionCurrent: n => (n < 10 ? '0' + n : n),
      formatFractionTotal: n => (n < 10 ? '0' + n : n),
    },
    navigation: {
      nextEl: "#mainSW-progress .swiper-button-next",
      prevEl: "#mainSW-progress .swiper-button-prev",
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        const line = document.querySelector(".autoplay-progress svg");
        if (line) line.style.setProperty("--progress", 1 - progress);
      },
    },
  });

  // 모바일 배너
  new Swiper(".MO-B-Swiper", {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 3600,
      disableOnInteraction: true,
    },
    speed: 1000,
    parallax: true,
    pagination: {
      el: "#mo-Banner .swiper-pagination",
      type: "fraction",
    },
  });

  // 섹션 3 - 전문가용
  new Swiper(".tS_Swiper_1", {
    grabCursor: true,
    pagination: {
      el: ".tSwipe-1 .swiper-pagination",
      clickable: true,
    },
  });

  // 섹션 3 - 소비자용
  new Swiper(".tS_Swiper_2", {
    grabCursor: true,
    pagination: {
      el: ".tSwipe-2 .swiper-pagination",
      clickable: true,
    },
  });

  // 섹션 5 - 브랜드 슬라이더
  const swiperSlides = document.querySelectorAll(".Swiper_sec5");
  swiperSlides.forEach((el, i) => {
    el.classList.add("swiper-" + i);
    new Swiper(".swiper-" + i, {
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 40000,
      loop: true,
      slidesPerView: "auto",
      freemode: true,
    });
  });
};

