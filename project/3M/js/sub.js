// js/sub.js
// ✅ 동적으로 로드되며 mainPage.html 이 로드된 후 실행됨

//  #sec-3 버튼클릭 이미지활성화,텍스트활성화,버튼활성화 이벤트
$("#industry .i-img-con").each(function(index){
  $(this).attr("data-ii",index);
});
$("#industry .i-title-con").each(function(index){
  $(this).attr("data-ii",index);
});
$("#industry .i-btn-con").each(function(index){
  $(this).attr("data-ii",index);
});

$("#industry .i-btn-con").click(function(){

  var ick=$(this).attr("data-ii");

  $("#industry .i-img-con").fadeOut(50);
  $("#industry .i-img-con").eq(ick).fadeIn(50);

  $("#industry .i-title-con").fadeOut(50);
  $("#industry .i-title-con").eq(ick).fadeIn(50);

  $("#industry .i-btn-con").removeClass('i-btn-AC');
  $("#industry .i-btn-con").eq(ick).addClass('i-btn-AC');


});

$("#product .i-img-con").each(function(index){
  $(this).attr("data-iii",index);
});
$("#product .i-title-con").each(function(index){
  $(this).attr("data-iii",index);
});
$("#product .i-btn-con").each(function(index){
  $(this).attr("data-iii",index);
});

$("#product .i-btn-con").click(function(){

  var ick2=$(this).attr("data-iii");

  $("#product .i-img-con").fadeOut(50);
  $("#product .i-img-con").eq(ick2).fadeIn(50);

  $("#product .i-title-con").fadeOut(50);
  $("#product .i-title-con").eq(ick2).fadeIn(50);

  $("#product .i-btn-con").removeClass('i-btn-AC');
  $("#product .i-btn-con").eq(ick2).addClass('i-btn-AC');


});



// -----------------------------------------------
// scroll Go top btn 
$("#GO-top-btn").click(function(){

  $("html,body").animate({
      scrollTop:0,
  },1000);

});


$(function () {
  //-----------------------------------------------
  // 🔄 헤더 스크롤 시 클래스 변경 및 검색 버튼 토글
  let prevSct = 0;
  let isSearchActive = false;
  let isSlideMenuActive = false;

  function toggleSearch(button) {
    $("#sv-zone").toggleClass("sv-zone-visible");
    $("#tabMo-S-menu-zone").toggleClass("TM_slideOn");
    $(button).toggleClass("ACtive-search ACtive-search-TAB");
    isSearchActive = $(button).hasClass("ACtive-search") || $(button).hasClass("ACtive-search-TAB");
    if (isSearchActive) $("#header").removeClass("header-down");
  }

  $(document).on("click", ".search_btn, .search_btn_tab", function () {
    const w = $(window).width();
    if ((w >= 1100 && $(this).hasClass("search_btn")) || (w < 1100 && $(this).hasClass("search_btn_tab"))) {
      toggleSearch(this);
    }
  });

  $(window).on("scroll", function () {
    if (isSearchActive || isSlideMenuActive) return;
    let sct = $(this).scrollTop();
    if (sct > 50) {
      if (sct > prevSct) {
        $("#header").addClass("header-down");
      } else {
        $("#header").removeClass("header-down");
      }
    }
    prevSct = sct;
  });

  //-----------------------------------------------
  // ☰ 메뉴 토글 & 검색창 오픈 (모바일)
  function toggleTMsideBTN() {
    const menuZone = $("#tabMo-S-menu-zone");
    menuZone.toggleClass("TM_slideOn");
    isSlideMenuActive = menuZone.hasClass("TM_slideOn");

    if (isSlideMenuActive) {
      $("body").css("overflow", "hidden");
      $("#header, #tabMo-S-menu-zone").css("width", "100vw");
      $("#header").removeClass("header-down");
      $("#sv-zone").removeClass("SV_slideOn");
    } else {
      $("body").css("overflow", "auto");
      $("#header, #tabMo-S-menu-zone").css("width", "");
    }
  }

  function toggleSearchZone() {
    const searchZone = $("#sv-zone");
    if (searchZone.hasClass("SV_slideOn")) {
      searchZone.removeClass("SV_slideOn");
      $("body").css("overflow", "auto");
      $("#tabMo-S-menu-zone").removeClass("TM_slideOn");
    } else {
      searchZone.addClass("SV_slideOn");
      $("body").css("overflow", "hidden");
      $("#tabMo-S-menu-zone").removeClass("TM_slideOn");
    }
  }

  $(document).on("click", "#tamMo-header-inner .Menu-icon", toggleTMsideBTN);
  $(document).on("click", "#tabMo-s-btn", toggleSearchZone);

  //-----------------------------------------------
  // 🟡 헤더 메뉴 hover 시 depth2 fade 효과
  $("nav .menu, #header_menulist_wrap .menu").each(function (i) {
    $(this).attr("data-mn", i);
  });

  let activeMenu = null;

  $("nav .menu").hover(
    function () {
      let mn = $(this).data("mn");
      activeMenu = mn;
      $("#header").addClass("show-before");
      $("#header_menulist_wrap .menu").fadeOut(150).eq(mn).fadeIn(150);
    },
    function () {
      setTimeout(() => {
        if (!$("#header_menulist_wrap").is(":hover")) {
          $("#header").removeClass("show-before");
          $("#header_menulist_wrap .menu").fadeOut(150);
        }
      }, 10);
    }
  );

  $("#header_menulist_wrap").hover(
    () => $("#header").addClass("show-before"),
    () => {
      $("#header").removeClass("show-before");
      $("#header_menulist_wrap .menu").fadeOut(150);
    }
  );

  //-----------------------------------------------
  // 📜 스크롤 위치에 따라 배경색, 버튼 색상 등 전환
  document.addEventListener("scroll", function () {
    const change = document.querySelector("#BG-change");
    if (!change) return;

    const changeTop = change.getBoundingClientRect().top;
    const windowWidth = window.innerWidth;
    const head = document.querySelector("#header");
    const banner = document.querySelector("#banner");
    const bannerHeight = banner?.offsetHeight || 0;
    const scrollTop = window.scrollY;

    // 헤더 색상
    if (scrollTop >= bannerHeight) {
      head?.classList.add("headCOLOR");
    } else {
      head?.classList.remove("headCOLOR");
    }

    // 섹션 스타일 변경 (PC/모바일 다르게)
    const toggleClassSet = (active) => {
      $("#sec-1").toggleClass("bgRD_BK", active);
      $("#sec-3-tSwipe #find-prod-tit").toggleClass("findTit_AC", active);
      $(".tm-para-a-Box-3 a").toggleClass("btnWtoT", active);
      $(".tm-para-a-Box-3 a span").toggleClass("btnWtoT_span", active);
      $("#sec-2").toggleClass("sec2_bgWtoT", active);
      $(".parallax").css({ backgroundColor: active ? "transparent" : "white" });
      $(".parallax .para-tit, .parallax .para-next-title, .para-cont-ex, .para-cont-ex>span")
        .css({ color: active ? "#fff" : "#333" });

      
      // ------------------------------------------




    };

    if (windowWidth > 390) {
      toggleClassSet(changeTop <= 0);
    } else {
      toggleClassSet(changeTop <= -150);
    }
  });


  // 🖱️ 섹션 4: 호버 시 상세박스 보이기 (PC only)
  if (matchMedia("screen and (min-width: 1101px)").matches) {
    $("#sec-4 .Bcon").each(function (i) {
      $(this).attr("data-bc", i);
    });

    $("#sec-4 .Bcon").hover(
      function () {
        let idx = $(this).data("bc");
        $("#sec-4 .Bcon-hover-box").eq(idx).stop(true, true).fadeIn(300);
      },
      function () {
        $("#sec-4 .Bcon-hover-box").stop(true, true).fadeOut(300);
      }
    );
  }

  //-----------------------------------------------
  // ⬆ footer 메뉴 클릭 시 강조 스타일
  $("footer .toptop-2 .footer-menu").on("click", function () {
    $("footer .toptop-2 .footer-menu").removeClass("fm-AC");
    $(this).addClass("fm-AC");
  });

  //-----------------------------------------------
  // 📱 모바일 배너: 스크롤 방향에 따라 클래스 변경
  let lastScrollTop = 0;
  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const w = $(window).width();

    if (w >= 390) {
      if (scrollTop > lastScrollTop) {
        $("#mb-wrapper").addClass("Bannscroll");
      } else {
        $("#mb-wrapper").removeClass("Bannscroll");
      }
    }
    lastScrollTop = scrollTop;
  });
});
