$(document).ready(function(){


    // var swiper = new Swiper(".efSwiper_1", {
    //   slidesPerView: 7,
    //   spaceBetween: 25,
    //   loop: true,
    //   mousewheel: false,
    //   keyboard: false,
    //   speed: 4000,
    //   autoplay: {
    //     delay: 0,            // 쉬는 시간 없이
    //     disableOnInteraction: false
    //   },
    //   freeMode: true,
    //   freeModeMomentum: false,
    //   effect: "slide",
    // });

    // var swiper = new Swiper(".efSwiper_2", {
    //   slidesPerView: 7,
    //   spaceBetween: 25,
    //   loop: true,
    //   mousewheel: false,
    //   keyboard: false,
    //   speed: 4000,
    //   autoplay: {
    //     delay: 0,            // 쉬는 시간 없이
    //     disableOnInteraction: false,
    //     reverseDirection: true
    //   },
    //   freeMode: true,
    //   freeModeMomentum: false,
    //   effect: "slide",
    // });



    var swiper = new Swiper(".LigSwiper", {
      slidesPerView: 1.5,
      spaceBetween: 30,
    //   centeredSlides: true,
      loop: true,
      pagination: {
        el: ".popup-content .swiper-pagination",
        clickable: true,
      },
    });

    




});