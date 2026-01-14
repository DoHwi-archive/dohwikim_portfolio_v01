$(function() {
	//header hover
	$("#header .depth01 > li").hover(function(){
		$(this).find(".depth02").stop().slideDown();
	}, function(){
		$(this).find(".depth02").stop().slideUp();
	});

	//header scroll
	$("html, body").on("mousewheel DOMMouseScroll", function(e){
		const delta = e.originalEvent.deltaY;
		const detail = e.originalEvent.detail;
		
		if(delta < 0 || detail < 0){
			//위로 스크롤
			$("#header").removeClass("down");
		}else{ 
			//아래로 스크롤
			$("#header").addClass("down");
		}
	});

	$(window).on("load scroll", function(){
		const wh = $(window).scrollTop();

		if(wh <= 0){
			$("#header").removeClass("down");
		}
	});

	//footer menu copy
	$("#header nav .depth01").clone().appendTo("#footer .footer-nav");
	$("#footer .footer-nav .depth02").remove();
	$("#footer .footer-nav .depth01 > li").eq(3).nextAll().remove();

	//footer select click
	$("#footer .select").on("click", function(){
		$(this).find("ul").stop().slideToggle();
		$(this).toggleClass("on");
	});

	//sitemap
	$("#header nav .depth01").clone().appendTo("#sitemap .nav .pc, #sitemap .nav .moblie");

	$("#header .sitemap").on("click", function(){
		$("#sitemap").show();
	});
	$("#sitemap .close, #sitemap .depth02 > li > a").on("click", function(){
		$("#sitemap").hide();
		$("#sitemap .moblie .depth02").stop().slideUp();
	});

	//moblie sitemap
	$("#sitemap .moblie .depth01 > li").on("click", function(){
		$("#sitemap .moblie .depth02").stop().slideUp();
		$(this).find(".depth02").stop().slideToggle();
	});

	//top_button
	$("#top").on("click", function(){
		$("html, body").stop().animate({ scrollTop: 0 });
		$("#header").removeClass("down");
	});

	//sub lnb
	const here = location.pathname;

	$("#header .depth02").each(function(i){
		const li = $(this).find("li");
		for(let k=0; k<8; k++){
			const a = li.find("a").eq(k);
			if(here == a.attr("href")){
				const a_siblings = a.parents(".depth02").siblings().attr("href");
				const a_href = a.attr("href");
				const a_text = a.text();
				$(".lnb .location01").find("a").attr("href", a_siblings);
				$(".lnb .location02").find("a").attr("href", a_href);
				$(".lnb .location02").not(".blank").find("a").text(a_text);
			}
		}
	});

	//tab-menu lnb
	var $winUrl = location.pathname;
	lnbFn($(".tab-menu ul li"));

	function lnbFn(obj){
		obj.find("a").each(function(){
			$menuUrl01= $(this).attr("href");
			$res = $menuUrl01.split("/");
			var resLast = $res[$res.length-1];
			//console.log(resLast)
			if ($winUrl.match(resLast)){
				$(this).parent().addClass("on");
			}
		});
	}
});