$(document).ready(function(){


  // 슬릭con애들에게 순서값을 부여
  // item_legth = 요소 컬렉션의 길이
  var item_length = $('.your-class .sk-con').length - 1;
  $('.your-class .sk-con').each(function (index, item) { 
    $(item).addClass('nth' + index);
  });


  // your-class-slick
  // 슬릭 옵션설정
  $('.your-class').slick({

    dots: true,
    centerMode: false,
    autoplay : false,
    // 자동 스크롤 여부
    centerPadding: '0px', 
    // 얘가 센터모드에 들어간 패딩값 = 0으로 해주는게 좋음
    slidesToShow: 3,
    autoplaySpeed : 2000,
    // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    nextArrow:$('.next'),
    prevArrow:$('.prev'),
    draggable : true,



    // 반응형 웹 구현
    responsive: [ 
    {  
      breakpoint: 960, //화면 사이즈
      settings: {
        slidesToShow: 4
      } 
    },
    { 
      breakpoint: 768, //화면 사이즈
      settings: {    
        slidesToShow: 5
      } 
    }]

  });


  // -------------------------------------------------


  //이거 안적으면 기본 슬릭형태 ㅇㅇ
  //수행되는 작업은 다음과 같다

  // 1-.slick_slide_main 요소에서 'beforeChange' 이벤트를 수신합니다.
  $('.your-class').on('beforeChange', function(event, slick, currentSlide, nextSlide){

    // 2-이벤트가 실행되면 .slick_slide_main 내 .m_box 클래스가 있는 모든 요소에서 slick-active 클래스가 제거됩니다.
    $('.your-class').find('.sk-con').removeClass('slick-active');


      //다음 슬라이드가 마지막 슬라이드에서 첫 번째 슬라이드로 이동하는지 확인합니다
      //( currentSlide = 첫 번째 슬라이드 / nextSlide = 마지막 슬라이드 )
      if(item_length === currentSlide && nextSlide === 0){


        //이 조건이 충족되면 setTimeout을 사용하여  nth0, nth1 및 nth2 클래스가 있는 특정 요소에 'slick-active' 클래스를 추가합니다.
        setTimeout(function(){
          $('.your-class').find('.sk-con.nth0').addClass('slick-active');
          $('.your-class').find('.sk-con.nth1').addClass('slick-active');
          $('.your-class').find('.sk-con.nth2').addClass('slick-active');
          // 센터에 보여지는 컨텐츠가 3개라서 0, 1, 2 이렇게 3개에 추가됨

        });


      //다음 슬라이드가 첫 번째 슬라이드에서 마지막 슬라이드로 이동하는지 확인합니다  
      //( currentSlide = 첫 번째 슬라이드 / nextSlide = 마지막 슬라이드 )
      }else if(item_length === nextSlide && currentSlide === 0){


        //이 조건이 충족되면 setTimeout을 사용하여  nth0, nth1 및 nth2 클래스가 있는 특정 요소에 'slick-active' 클래스를 추가합니다. 
        //( active 를 마지막 요소까지 추가합니다. )
        setTimeout(function(){
          $('.your-class').find('.sk-con.nth'+item_length).addClass('slick-active');
          $('.your-class').find('.sk-con.nth0').addClass('slick-active');
          $('.your-class').find('.sk-con.nth1').addClass('slick-active');
        });

      }


  });

  $('.slick_slide_main').on('afterChange', function(event, slick, currentSlide, nextSlide){
    // console.log('afterChange');
  });






  // 전체 스크립트

  // var item_length = $('.slick_slide_main .m_box').length - 1;
  // $('.slick_slide_main .m_box').each(function (index, item) { 
  //   $(item).addClass('nth' + index);
  // });
  // ----------------------------------------------------------------------------------------------
  // $('.slick_slide_main').slick({
  //   dots: true,
  //   autoplay : false,			// 자동 스크롤 사용 여부s
  //   autoplaySpeed : 5000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
  //   centerMode: false,
  //   centerPadding: '0px',
  //   slidesToShow: 3
  // });
  //  ---------------------------------------------------------------------------------------------
  // $('.slick_slide_main').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //   $('.slick_slide_main').find('.m_box').removeClass('slick-active');
  //     if(item_length === currentSlide && nextSlide === 0){
  //       setTimeout(function(){
  //         $('.slick_slide_main').find('.m_box.nth0').addClass('slick-active');
  //         $('.slick_slide_main').find('.m_box.nth1').addClass('slick-active');
  //         $('.slick_slide_main').find('.m_box.nth2').addClass('slick-active');
  //         // 센터에 보여지는 컨텐츠가 3개라서 0, 1, 2 이렇게 3개에 추가됨
  //       });
  //     }else if(item_length === nextSlide && currentSlide === 0){
  //       setTimeout(function(){
  //         $('.slick_slide_main').find('.m_box.nth'+item_length).addClass('slick-active');
  //         $('.slick_slide_main').find('.m_box.nth0').addClass('slick-active');
  //         $('.slick_slide_main').find('.m_box.nth1').addClass('slick-active');
  //       });
  //     }
  // });
  // $('.slick_slide_main').on('afterChange', function(event, slick, currentSlide, nextSlide){
  //   // console.log('afterChange');
  // });


















});