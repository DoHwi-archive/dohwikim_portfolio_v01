$(window).on("load", function (){

	AOS.init();

	
	$(function () {
		initScrollTriggers();
	});
	

	// -----------------------------
	// ScrollTrigger 모음 (
	// -----------------------------
	function initScrollTriggers() {
		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.matchMedia({

			// PC (1200px 이상)
			"(min-width: 1200px)": function () {
				createVisualPC();      // #visual 관련 PC용 스크롤 애니메이션
				createAboutSplit();    // #about 타이틀 split 애니메이션
				createTechstackTriggers();
				createProjectTriggers();  // #project 업다운
				createEffectTriggers();  // #effect 배경색변경
				createFooterTriggers();  //footer h2 애니메이션
				
			},

			// 모바일/태블릿 (1199px 이하)
			"(max-width: 1199px)": function () {
				createVisualMO();      // #visual 관련 모바일용 스크롤 애니메이션
				createAboutSplit();    // #about 타이틀 split 애니메이션 (모바일에서도 동일하게 사용)
				createTechstackTriggers();
				createProjectTriggers();  // #project 업다운
				createEffectTriggers();   // #effect 배경색변경
				createFooterTriggers();  //footer h2 애니메이션
				
			}

		});
	}

	// -----------------------------
	// #visual : PC 버전
	// -----------------------------
	function createVisualPC() {

		const $videoBox   = $(".video-box");
		const $scrollWrap = $(".scroll-wrap");

		if (!$videoBox.length || !$scrollWrap.length) return;

		gsap.registerPlugin(ScrollTrigger);

		// refresh(리사이즈/로드) 때마다 값 다시 계산되게 함수로 빼기
		const getOffsetTop = () => $videoBox.offset().top;
		const getTotalHeight = () => $scrollWrap.outerHeight(true) - $(window).outerHeight(true);

		const tl = gsap.timeline({
			scrollTrigger: {
			trigger: ".scroll-box",
			pin: true,
			start: "top top",
			end: () => "+=" + getTotalHeight(),   //  함수형으로(리프레시 대응)
			scrub: true,
			invalidateOnRefresh: true,            //  refresh 때 tween 값 재계산
			// markers: true,

			onEnter() {
				$("#header").removeClass("black");
				$("#top").removeClass("white");
			},
			onLeave() {
				$("#header").addClass("black");
				$("#top").addClass("white");
			},
			onEnterBack() {
				$("#header").removeClass("black");
				$("#top").removeClass("white");
			},
			onLeaveBack() {
				$("#header").addClass("black");
				$("#top").addClass("white");
			}
		}
	});

	tl
		.to(".video-wrap", { y: () => -getOffsetTop() }, "a")

		// ✅ from은 immediateRender 때문에 깜빡일 수 있어서 false 주기
		.from("#visual .absolute", {
			transform: "translate3d(0, -100%, 0)",
			immediateRender: false
		}, "a")

		.to("#visual .absolute", {
			top: "50%",
			yPercent: 50,
			transform: "translate(0, -100%)",
			width: "100%"
		}, "a")

		.to("#visual .video-box", { width: "100%" }, "a");
	}


		

	// -----------------------------
	// #about : split 텍스트 애니메이션
	// -----------------------------
	function createAboutSplit() {
		ScrollTrigger.create({
			trigger: "#project",
			start: "top 90%",   // 화면 32% 지점쯤 올 때 실행
			once: true,
			onEnter: function () {
			$(".split").each(function () {
				var text = this;
				text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

				$(this).find("span").each(function (i) {
				$(this).addClass("num" + i);
				$(this).css("animation-delay", (i / 15) + "s");
				});
			});
			}
		});
	}

	// -----------------------------
	// #techStack 
	// -----------------------------
	function createTechstackTriggers() {
		// #techStack 관련 ScrollTrigger들
		gsap.registerPlugin(ScrollTrigger);

		// tech-box
		// gsap.to("#techStack .container .tech-box", {
		// 	y: 0,
		// 	opacity: 1,
		// 	ease: "power2.out",
		// 	duration: 1.4,
		// 	scrollTrigger: {
		// 		trigger: "#techStack",
		// 		start: "top 80%",
		// 		once: true, 
		// 		markers: true
		// 	}
		// });

		// arrow-box
		gsap.to("#techStack .container .arrow-box", {
			y: 5,
			opacity: 1,
			ease: "none",
			duration: 1.0,
			scrollTrigger: {
				trigger: "#techStack .tech-box",
				start: "bottom 100%",   // 섹션이 화면 아래에서 올라올 때
				once: true, 
				// markers: true
			}
		});

		// work-box
		gsap.to("#techStack .container .work-box", {
			y: -30,
			opacity: 1,
			ease: "none",
			duration: 0.3,
			scrollTrigger: {
				trigger: "#techStack",
				start: "bottom 98%",   // 섹션이 화면 아래에서 올라올 때
				once: true, 
				// markers: true
			}
		});
	}	


	// -----------------------------
	// #project
	// -----------------------------
	function createProjectTriggers() {
		// #project 관련 ScrollTrigger들

		// 위로 살짝 올라가는 그룹
		gsap.to("#project .list .item:nth-child(2n)", {   // 짝수 아이템
			y: -60,                                // 위로
			ease: "none",
			scrollTrigger: {
				trigger: "#project",
				start: "top bottom",   // 섹션이 화면 아래에서 올라올 때
				end: "bottom top",     // 섹션이 위로 사라질 때까지
				scrub: true,           // 스크롤에 따라 부드럽게 연동
				// markers: true,
			}
		});

		// 아래로 내려가는 그룹
		gsap.to("#project .list .item:nth-child(2n+1)", { // 홀수 아이템
			y: 60,                                 // 아래로
			ease: "none",
			scrollTrigger: {
				trigger: "#project",
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			}
		});

	}	

	function createEffectTriggers() {
		gsap.to("#effect", {
			backgroundColor: "#000",
			duration: 0.25,
			ease: "power2.out",
			once: true,
			scrollTrigger: {
				trigger: "#effect",
				start: "top 70%",
				toggleActions: "play none none reverse", 
			}
		});
	}

	function createBalloonTriggers() {
		// #balloon 관련 ScrollTrigger들
	}	


	function createFooterTriggers() {
		// footer 관련 ScrollTrigger들
		ScrollTrigger.create({
			trigger: "#footer",
			start: "top 85%",   // footer가 화면에 거의 다가왔을 때
			once: true,
			onEnter: function () {

			// footer 안의 h2(클래스 split-footer)만 대상
			const $title = $("#footer h2.split-footer");

			$title.each(function () {
				const text = this.textContent; // 원래 문자열만 가져오기

				// 텍스트를 글자 단위로 <span>으로 감싸기
				this.innerHTML = text.replace(/\S/g, "<span>$&</span>");

				// 각 글자(span)에 순서별 클래스 + 애니메이션 딜레이 부여
				$(this).find("span").each(function (i) {
				$(this).addClass("char-" + i);
				$(this).css("animation-delay", (i / 20) + "s");
				});
			});

			}
		});
	}


	// GSAP
	// ------------------------------------------------------------------------


	// 순서값 세우는 (✔ 실무에서 가장 많이 사용하는 방법)
	$("#project .item, #project .item .btn").each(function(p, el) {
		el.dataset.pro = p;
	});

	// 호버
	$("#project .item").hover(
		function () {

			// 버튼 나타내기
			$(this).find(".btn").css({ right: "0" });

			// border 효과 넣기
			$(this).find(".img_bg").css({
				"border-top-left-radius": "500px",
				"border-bottom-right-radius": "120px",
			});
			$(this).find(".in h2").css({"transform" : "translateY(-80px)"});
		},
		function () {
			
			// 버튼 초기 위치로 숨기기
			$(this).find(".btn").css({ right: "-150%" });

			// border 원래대로 복귀
			$(this).find(".img_bg").css({
				"border-top-left-radius": "0",
				"border-bottom-right-radius": "0",
			});
			$(this).find(".in h2").css({"transform" : "translateY(0)"});
		}
	);



	// ------------------------------------------------------------------
	// popup창 띄우기 (#project)

	$("#project .item .bg").on("click", function () {

		// 1) popup 클래스가 없으면 종료
		if (!$(this).hasClass("popup")) return;

		// 2) 어떤 팝업 콘텐츠를 열지 (lig / guvina 등)
		const popupKey = $(this).data("popup");   // 예: "lig", "guvina"

		// 3) 클릭한 item의 타이틀도 같이 넣고 싶으면
		const $item  = $(this).closest(".item");
		const title  = $item.find(".top_txt h3").text();

		$("#project-popup .popup-title").text(title);

		// 4) 팝업 안의 모든 콘텐츠를 숨기고 → 해당 콘텐츠만 보여주기
		$("#project-popup .popup-content").hide();
		$('#project-popup .popup-content[data-popup="' + popupKey + '"]').show();

		// 5) 팝업 열기 + 스크롤 잠금
		$("#project-popup").fadeIn(200);
		$("body").addClass("no-scroll");

		// 6) (중요) swiper가 있다면: display:none 상태에서 생성하면 깨질 수 있어서
		//    보여준 다음 update 해주는 게 안전
		//    아래는 필요할 때만 사용(너 swiper 변수명에 맞게)
		// setTimeout(() => { ligSwiper.update(); }, 0);
		// setTimeout(() => { guvinaSwiper.update(); }, 0);
	});

	// 닫기버튼
	$(".popup-close").on("click", function(){
		$("#project-popup").fadeOut(200);
		$("body").removeClass("no-scroll");
	});


	// ------------------------------------------------------------------
	// TOP btn
	const $topBtn = $("#TOPbtn");
    const $visual = $("#visual");
    const visualH = $visual.outerHeight(); // visual 높이값

    // 스크롤 시 표시/숨김
    $(window).on("scroll", function(){
        const scrollTop = $(this).scrollTop();

        if(scrollTop > visualH){
            $topBtn.fadeIn(300);
        } else {
            $topBtn.fadeOut(300);
        }
    });

    // TOP 버튼 클릭 시 맨 위로 이동
    $topBtn.on("click", function(){
        $("html, body").stop().animate({
            scrollTop: 0
        }, 600);
    });






	
});
// end