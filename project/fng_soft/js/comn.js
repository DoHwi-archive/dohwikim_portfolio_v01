/*****************************************************************************
* Gnb Menu
*****************************************************************************/
$(function(){
	$.fn.gnb = function(tar, sub)
	{
		return this.each(function(){
		//return start
			var $gnb = $(this),
				 $tar = parseInt(tar-1),
				 $sub = parseInt(sub-1),
				 $ul = $('li>ul', $gnb),
				 $li = $('>li', $gnb),
				 $a = $('>li>a', $gnb)
			;

			$ul.hide();
			function gnbSet()
			{
				$ul.not($ul.eq($tar)).hide();
				$ul.eq($tar).stop(true,true).slideDown('fast');
				$a.not($a.eq($tar)).removeClass('selected');
				$a.eq($tar).addClass('selected');
				$ul.eq($tar).find('>li').eq($sub).addClass('on');
			}

			gnbSet();

			$a.on('mouseenter focusin', function(){
				if( $(this).hasClass('selected') ) return;
				$a.removeClass('selected');
				$(this).addClass('selected');
				$ul.hide();
				$(this).next('ul').stop().slideDown('fast');
			});

			$gnb.on('mouseleave', function(){
				gnbSet();
			});

		//rerurn end
		});
	};
	$('.gnb_list').gnb(9,9);//고정될 부분

	$(function(){
		$("div#gnb_sub_menu").hide();
		$(".gnb > ul.gnb_list > li > ul > li.on1").mouseover(function(){
			$("div.jq_gnb_trd_list1").show();
		}).mouseout(function(){
			$("div#gnb_sub_menu").hide();
		});

		$("div#gnb_sub_menu").hide();
		$(".gnb > ul.gnb_list > li > ul > li.on2").mouseover(function(){
			$("div.jq_gnb_trd_list2").show();
		}).mouseout(function(){
			$("div#gnb_sub_menu").hide();
		});

		$("div#gnb_sub_menu").hide();
		$(".gnb > ul.gnb_list > li > ul > li.on3").mouseover(function(){
			$("div.jq_gnb_trd_list3").show();
		}).mouseout(function(){
			$("div#gnb_sub_menu").hide();
		});

		$("div#gnb_sub_menu").hide();
		$(".gnb > ul.gnb_list > li > ul > li.on4").mouseover(function(){
			$("div.jq_gnb_trd_list4").show();
		}).mouseout(function(){
			$("div#gnb_sub_menu").hide();
		});
	});


/*****************************************************************************
* Lnb Menu
*****************************************************************************/
	jQuery(function($){
	
		var menu_v = $('div.menu_v');
		var sItem = menu_v.find('>ul>li');
		var ssItem = menu_v.find('>ul>li>ul>li');
		var lastEvent = null;
		
		sItem.find('>ul').css('display','none');
		menu_v.find('>ul>li>ul>li[class=active]').parents('li').attr('class','active');
		menu_v.find('>ul>li[class=active]').find('>ul').css('display','block');

		function menu_vToggle(event){
			var t = $(this);
			
			if (this == lastEvent) return false;
			lastEvent = this;
			setTimeout(function(){ lastEvent=null }, 200);
			
			if (t.next('ul').is(':hidden')) {
				sItem.find('>ul').slideUp(100);
				t.next('ul').slideDown(100);
			} else if(!t.next('ul').length) {
				sItem.find('>ul').slideUp(100);
			} else {
				t.next('ul').slideUp(100);
			}
			
			if (t.parent('li').hasClass('active')){
				t.parent('li').removeClass('active');
			} else {
				sItem.removeClass('active');
				t.parent('li').addClass('active');
			}
		}
		sItem.find('>a').click(menu_vToggle).focus(menu_vToggle);
		
		function subMenuActive(){
			ssItem.removeClass('active');
			$(this).parent(ssItem).addClass('active');
		}; 
		ssItem.find('>a').click(subMenuActive).focus(subMenuActive);
		
		//icon
		menu_v.find('>ul>li>ul').prev('a').append('<span class="i"></span>');
	});
});

/*****************************************************************************
* tab
*****************************************************************************/
$(function () {
	$(".tab_cont").hide();
		$(".tab ul li").eq(0).addClass("selected");
		$(".tab_cont").eq(0).show();
		$(".tab ul li").click(function(){
			$(".tab ul li").removeClass()
			$(this).addClass("selected");
			$(".tab_cont").hide();
			$(".tab_cont").eq($(this).index()).show();
			return false;
	});
});

/*****************************************************************************
* table toggle
*****************************************************************************/

$(function () {
	$(".tr_visible a").click(function() {
		$(this).parent().parent().nextUntil(".tr_visible").toggle();
		return false;
	});
});

/*****************************************************************************
* 팝업창
*****************************************************************************/
function popup_window(url, winname, opt)
{
	window.open(url, winname, opt);
}
	
/*****************************************************************************
* 플레시 호출
*****************************************************************************/
function MakeFlash(ImgUrl,Wid,Hei){
	document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+ Wid +"' height='"+ Hei +"'>");
	document.write("<param name='movie' value='"+ ImgUrl +"'>");
	document.write("<param name='quality' value='high'>");
	document.write("<param name='wmode' value='transparent'>");
	document.write("<embed src='"+ ImgUrl +"' width='"+ Wid +"' height='"+ Hei +"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' wmode='transparent'></embed></object>");
}


/**************************** 다운 GNB ***************************/
$(function(){//Jqery Start

	$('#header').each(function () {

		var $window = $(window), // Window 객체
			$header = $(this),   // 헤더

			// 헤더의 복제
			$headerClone = $header.contents().clone(),

			// 헤더 복제 컨테이너
			$headerCloneContainer = $('<div id="header_clone"></div>'),

			// HTML의 위쪽에서 헤더의 저변까지의 거리 = 헤더의 최고 위치 + 헤더의 높이
			threshold = $header.offset().top + $header.outerHeight();

		// 컨테이너 헤더의 복제를 삽입
		$headerCloneContainer.append($headerClone);

		// 컨테이너를 body의 마지막에 삽입
		$headerCloneContainer.appendTo('body');

		// 스크롤시에 작업을 수행하지만, 횟수를 1 초당 15까지 제한
		$window.on('scroll', $.throttle(1000 / 15, function () {
			if ($window.scrollTop() > threshold) {
				$headerCloneContainer.addClass('visible');
			} else {
				$headerCloneContainer.removeClass('visible');
			}
		}));

		// 스크롤 이벤트를 발생시켜 초기 위치를 결정
		$window.trigger('scroll');
	});

});//Jquery End

/**************************** 우측 GNB ***************************/

$(function(){//Jqery Start

    var duration = 600;

    // aside ----------------------------------------
    var $aside = $('.aside');
    var $asidButton = $aside.find('button')
        .on('click', function(){
            $aside.toggleClass('open');
            if($aside.hasClass('open')){
                $aside.stop(true).animate({right: '-70px'}, duration, 'easeOutQuad');
				$asidButton.find('img').attr('src', '/images/ico/ico_btn_on1.png');
            }else{
                $aside.stop(true).animate({right: '-300px'}, duration, 'easeInQuad');
				$asidButton.find('img').attr('src', '/images/ico/ico_btn1.png');
            };
        });

	$( "#header .container .aside button" ).click(function() {
	  $( ".overlayer" ).fadeToggle("slow");
	});

});//Jquery End

/**************************** go top ***************************/

$(function(){//Jqery Start

//화면이 50px 이동시
	var offset = 100;

	$("a.go_top").hide();

	$(window).scroll(function(){
		if($(this).scrollTop() > offset){
			$("a.go_top").fadeIn(500);
		}else{
			$("a.go_top").fadeOut(500);
		}
	});
	
	// 버튼 클릭시 맨위로 이동
	$("a.go_top").click(function(){
		$('html, body').animate({
			scrollTop:0
		},400);
			return false;
	});

});//Jquery End

/**************************** portfolio img over  ***************************/

$(function(){//Jqery Start

	var duration = 500;

	var $images = $('.portfolio_cont ul li');

	$( ".portfolio_cont ul li" ).mouseover(function(){
		$(this).find( ".over_bg, .over_txt" ).stop(true).fadeIn( "fast" );
	})
	$( ".portfolio_cont ul li" ).mouseout(function(){
		$(this).find( ".over_bg, .over_txt" ).stop(true).fadeOut( "fast" );
	});

});//Jquery End

/**************************** portfolio_sub img over  ***************************/

$(function(){//Jqery Start

	var duration = 500;

	var $images = $('.portfolio_sub_cont ul li');

	$( ".portfolio_sub_cont ul li" ).mouseover(function(){
		$(this).find( ".over_bg, .over_txt" ).stop(true).fadeIn( "fast" );
	})
	$( ".portfolio_sub_cont ul li" ).mouseout(function(){
		$(this).find( ".over_bg, .over_txt" ).stop(true).fadeOut( "fast" );
	});

});//Jquery End

/**************************** clients img over  ***************************/

jQuery(window).load(function(){//Jqery Start

 var img_btns = jQuery("div.clients div.container div.clients_cont ul li");
 
 img_btns.bind("mouseover focus",function(){ 
  //on일 경우 : 2번쨰 파라미터 값으로 0 넘겨줌
  set_btn(jQuery(this), 0); 
 });
 img_btns.bind("mouseout blur",function(){  
  //off일 경우 : 2번쨰 파라미터 값으로 0 넘겨줌
  set_btn(jQuery(this), 1); 
 });
 
      
});

function set_btn(mybtn, num){

 // 이미지 src를 가져와 뒤에 확장자가 시작하는 인덱스 번호 가져오기 
 var srt_num = mybtn.children("img").attr("src").indexOf(".")+1;
 
 // 확장자 시작하는 인덱스번호로 확장자 읽어오기 
 var my_img = mybtn.children("img").attr("src").substring(srt_num);
 
 switch(num){
 
  // on 
  case 0:
   mybtn.children("img").attr("src",mybtn.children("img").attr("src").replace("_off."+my_img,"_on."+my_img));
   break;
  // off
  case 1:
   mybtn.children("img").attr("src",mybtn.children("img").attr("src").replace("_on."+my_img,"_off."+my_img));
   break;
 }
 
}//Jquery End

/**************************** 퀵메뉴 이동  ***************************/

jQuery(document).ready(function($) {
        $("#quick_menu ul li a").click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:$(this.hash).offset().top + -66}, 500);
        });
});


/**************************** tab_inside  ***************************/

$(document).ready(function(){
	$(".tab_inside_cont").hide();
		$(".tab_inside > ul > li").eq(0).addClass("selected");
		$(".tab_inside_cont").eq(0).show();
		$(".tab_inside > ul > li").click(function(){
			$(".tab_inside > ul > li").removeClass("selected");
			$(this).addClass("selected");
			$(".tab_inside_cont").hide();
			$(".tab_inside_cont").eq($(this).index()).show();
			return false;
	});
});

/**************************** tab_menu  ***************************/

$(document).ready(function(){
	$('[class*=_menu_cont]').hide();
	$('[class*=_detailTag]').each(function(){
		var classNms = $(this).attr('class').split('_');
		var idx = $('.'+classNms[0]+'_detailTag').index($(this));
		if(idx == 0){
			$(this).addClass('selected');
			$('.'+classNms[0]+'_menu_cont:eq('+idx+')').show();
		}
	})
	$('[class*=_detailTag]').on('click',function(){
		var classNms = $(this).attr('class').split('_');
		var detailObjs = $('.'+classNms[0]+'_detailTag');
	
		detailObjs.removeClass('selected');
		
		var idx = $(this).closest('div').find('.'+classNms[0]+'_detailTag').index($(this));
		
		$('.'+classNms[0]+'_detailTag:eq('+idx+')').addClass('selected')
		$('.'+classNms[0]+'_menu_cont').hide();
		$('.'+classNms[0]+'_menu_cont:eq('+idx+')').show();
	})
});

/**************************** company  ***************************/
$(function(){
	var $animation_elements = $('.company_cont ul li');
	var $window = $(window);

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);
	 
	  $.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);
	 
		if ((element_bottom_position >= window_top_position) &&
			(element_top_position <= window_bottom_position)) {
		  $element.addClass('on');
		} else {
		  $element.removeClass('on');
		}
	  });
	}

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

});


/**************************** biz_cont  ***************************/
$(document).ready(function(){
	$(".biz_wrap a.btn").click(function(){
		var divObj = $(this).closest('div[class^=biz_cont]').next('.detail');//biz_cont로 시작하는 class
		
		if(divObj.filter(':visible').length == 0)
		{
			divObj.slideDown();
		}else
		{
			divObj.slideUp();
		}
		$('.detail').not(divObj).slideUp();
	});
});

/**************************** biz_list_warp  ***************************/
$(document).ready(function(){
	
	$(".biz_list_warp a.btn").click(function(){
		var divObj = $(this).closest('.biz_list_warp a.btn').next('.detail');//biz_cont로 시작하는 class
		
		if(divObj.filter(':visible').length == 0)
		{
			divObj.slideDown();
		}else
		{
			divObj.slideUp();
		}
		$('.detail').not(divObj).slideUp();
	});

});



/****************************   ***************************/
function mainSlide(){
	$('.main_slide').on('init', function(slick) {
		$('.ms_control .btn_prev').on('click', function(){
			$('.main_slide').slick('slickPrev');
		});
		$('.ms_control .btn_next').on('click', function(){
			$('.main_slide').slick('slickNext');
		});
		$('.main_slide').find('.ms_sec.slick-active').addClass('afterOn');
		$('.main_slide').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			//console.log(currentSlide);
			$('.main_slide .ms_sec').removeClass('afterOn');
		});
		$('.main_slide').on('afterChange', function(event, slick, currentSlide){
			//console.log(currentSlide);
			$('.main_slide').find('.ms_sec.slick-active').addClass('afterOn');
		});
	}).slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		pauseOnHover: false
	});
}

function sTab(){
	$('.s_tab a').click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		var targetOffset = $(target).offset();
		var targetPos = targetOffset.top-130;
		$('html, body').animate({scrollTop : targetPos}, 600);
	});
}

$(function(){
	mainSlide();
	sTab();
	$('.btn_scroll_down').on('click', function(event){
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top + -80}, 500);
	});
});


// $(function(){
// 	$('.main_slide').slick({
// 		dots: true,
// 		infinite: true,
// 		speed: 500,
// 		fade: true,
// 		cssEase: 'linear',
// 		autoplay: true,
// 		autoplaySpeed: 5000,
// 		arrows: false,
// 		pauseOnHover: false
// 	});
// });
