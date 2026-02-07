$(document).ready(function(){


    // 헤더 높이값 
    function setHeaderHeight(){
        const header = document.querySelector("#header");
        const headerH = header.offsetHeight;

        document.documentElement.style.setProperty(
            "--header-height", 
            headerH + "px"
        );
    }
    // 반응형이라면 같이 써줘야함
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);


    // 헤더메뉴 호버(addClass)
    $("#header .menu.menuDropDown").hover(
        function(){ $(this).addClass("is-open");},
        function(){ $(this).removeClass("is-open");}
    );





  
    // 검색창 button클릭 href이동
    document.querySelectorAll(".option_button").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = btn.dataset.href;
        });
    });




    // 검색창 x버튼 제어
    const searchInput = document.getElementById("templateSearch_input");
    const clearBtn = document.querySelector(".templateDelete_icon");

    // 처음엔 숨김
    clearBtn.style.display = "none";

    // 입력 감지
    searchInput.addEventListener("input", () => {
        clearBtn.style.display = searchInput.value ? "block" : "none";
    });

    // 클릭 시 input 초기화
    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchInput.focus();           // UX 포인트: 다시 입력 가능
        clearBtn.style.display = "none";
    });



    // input 클릭 → 열림 / 바깥 클릭 → 닫힘
    $("#templateSearch_input").on("focus", function () {
        $(".suggest_list").addClass("listIS_open");
    });
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".templateSearch_box").length) {
            $(".suggest_list").removeClass("listIS_open");
        }
    });





    

    // 1섹션 알아보기 호버이벤트 (각각)
    $(".contLooking .gridItem article").hover(function(){

        $(this).find(".divItem_txt .divHover_moreBtn").css("opacity",1);

    },function(){

        $(this).find(".divItem_txt .divHover_moreBtn").css("opacity",0);

    });

    

    
    $(function () {

    const $iconClone = $("nav .navIconLink")
        .clone(true)              // 이벤트 포함
        .removeAttr("id")         // id 충돌 방지
        .addClass("is-cloned");   // 스타일 분리용 클래스

    $(".templateSearch .templateSearch_bottom_box").append($iconClone);

    });
    



    // 카드 전체 클릭: .profile(카드) 클릭 시 이동
    $(document).on("click", "#consultant_boxGrid .gridItem.profile", function (e) {
        // 버튼/링크/폼요소를 누른 경우는 카드 클릭으로 처리하지 않음
        if ($(e.target).closest("button, a, input, textarea, select, label").length) return;

        e.preventDefault();
        alert("프로필 링크 페이지로 이동합니다.");
        // location.href = "...";
    });

    // 내부 버튼: 프로필 보기
    $(document).on("click", "#consultant_boxGrid .profileInner_btn .profile_link", function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("프로필 보기 버튼 클릭");
        // location.href = "...";
    });

    // 내부 버튼: 예약하기
    $(document).on("click", "#consultant_boxGrid .profileInner_btn .reservation_link", function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("예약하기 페이지로 이동합니다.");
        // location.href = "...";
    });


});
// end