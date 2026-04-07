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

		// createMainVisualStage();
		// createHeroDoneToggle(); // ✅ 추가

		ScrollTrigger.matchMedia({

			// PC (1024px 이상)
			"(min-width: 1024px)": function () {
				createMainVisualStage();  //메인비주얼
				createHeroDoneToggle();   //메인비주얼
				createAboutSplit();    // #about 타이틀 split 애니메이션
				createProjectTriggers();  // #project 업다운
				createBalloonTriggers();  // #balloon 배경색변경
				createFooterTriggers();  //footer h2 애니메이션
				
			},

			// 태블릿 (1023px 이하)
			"(max-width: 1023px) and (min-width: 768px)": function () {
				createAboutSplit();
				createBalloonTriggers();   
				createFooterTriggers(); 
			},
			// 모바일 (768px 이하)
			"(max-width: 767px) and (min-width: 320px)": function () {
				createAboutSplit();
				createBalloonTriggers();
				createFooterTriggers();
			}

		});
		ScrollTrigger.refresh();
	}

	
	


	// -----------------------------
	// #mainVisual 
	// -----------------------------
	function createMainVisualStage(){

	// 요소 체크
		const mainVisual = document.getElementById("mainVisual");
		const heroMotion = document.getElementById("mainVisualMotion");
		const card = document.getElementById("card");
		if(!mainVisual || !heroMotion || !card) return;

		// 초기값(깜빡임 방지)
		gsap.set(heroMotion, { y: 0, opacity: 1 });
		gsap.set(card, { y: 60, opacity: 0.15 });

		// ✅ 메인비주얼 스크롤 애니메이션(페이드 + 축소 + 내부요소 모션)
		gsap.to("#mainVisual", {
			scale: 0.6,
			opacity: 0,
			ease: "none",
			scrollTrigger: {
			trigger: "#mainVisual",
			start: "top top",
			end: "bottom top",
			scrub: true,
			// markers: true,
			}
		});

		gsap.to("#mainVisualMotion", {
			y: -80,
			opacity: 0.4,
			ease: "none",
			scrollTrigger: {
			trigger: "#mainVisual",
			start: "top top",
			end: "bottom top",
			scrub: true,
			}
		});

		gsap.to("#card", {
			y: 0,
			opacity: 1,
			ease: "none",
			scrollTrigger: {
			trigger: "#mainVisual",
			start: "top top",
			end: "bottom top",
			scrub: true,
			}
		});

		// ✅ 메인비주얼을 “완전히 지나쳤을 때” 클래스 붙이고, 다시 올라오면 제거
		ScrollTrigger.create({
			trigger: "#mainVisual",
			start: "top top",
			end: "bottom top",
			onLeave: () => mainVisual.classList.add("scrollMainV"),
			onEnterBack: () => mainVisual.classList.remove("scrollMainV"),
		});
	}







	function createHeroDoneToggle(){
		const stage = document.getElementById("stage");
		if(!stage) return;

		ScrollTrigger.create({
			trigger: stage,
			start: "top top",
			end: "bottom top",
			onLeave: () => document.body.classList.add("hero-done"),
			onEnterBack: () => document.body.classList.remove("hero-done"),
			invalidateOnRefresh: true,
			// markers: true,
		});
	}

	// -----------------------------
	// #project : split 텍스트 애니메이션
	// -----------------------------
	function createAboutSplit() {
		ScrollTrigger.create({
			trigger: "#project",
			start: "top 32%",   // 화면 32% 지점쯤 올 때 실행
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

	// -----------------------------
	// #balloon
	// -----------------------------
	function createBalloonTriggers() {
		ScrollTrigger.create({
			trigger: "#balloon",
			start: "top 70%",
			onEnter: () => gsap.to("#balloon", {
			backgroundColor: "#000",
			duration: 0.25,
			ease: "power2.out",
			overwrite: "auto"
			}),
			onLeaveBack: () => gsap.to("#balloon", {
			backgroundColor: "",
			duration: 0.25,
			ease: "power2.out",
			overwrite: "auto"
			}),
			once: false,
			invalidateOnRefresh: true,
			// markers: true,
		});
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


	// 순서값 세우는 
	$("#project .item, #project .item .btn").each(function(p, el) {
		el.dataset.proj = p;
	});

	// 호버
	if ($(window).width() > 1050) {

		$("#project .item").hover(
			function () {

				$(this).find(".btn").css({ right: "0" });

				$(this).find(".img_bg").css({
					"border-top-left-radius": "600px",
					"border-bottom-right-radius": "120px",
				});

				$(this).find(".in h2").css({ "transform": "translateY(-80px)" });

			},
			function () {

				$(this).find(".btn").css({ right: "-150%" });

				$(this).find(".img_bg").css({
					"border-top-left-radius": "0",
					"border-bottom-right-radius": "0",
				});

				$(this).find(".in h2").css({ "transform": "translateY(0)" });

			}
		);

	}

	// ------------------------------------------------------------------
	// problem_answer창 띄우기 (#problem)
	
	$("#problem .problem_summary").on("click", function () {
		const $box = $(this).closest(".detail_box");
		const $answer = $box.find(".problem_answer");
		const isOpen = $answer.is(":visible");

		// 전부 닫기 + 아이콘 초기화
		$("#problem .problem_answer").stop(true, true).slideUp(250);
		$("#problem .problem_arrow i").removeClass("fa-minus").addClass("fa-plus");

		// 방금 열려있던 걸 다시 누른 게 아니면 열기
		if (!isOpen) {
			$answer.stop(true, true).slideDown(250);
			$box.find(".problem_arrow i").removeClass("fa-plus").addClass("fa-minus");
		}
	});



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