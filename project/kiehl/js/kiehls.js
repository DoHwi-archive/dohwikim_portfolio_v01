$("document").ready(function(){





    // 배너 페이드인아웃

    $(".banner-con").each(function(index){
        $(this).attr("data-a",index);
    });

    $(".banner-btn").each(function(index){
        $(this).attr("data-a",index);
    });


    $(".banner-btn").click(function(){


        var i= $(this).attr("data-a");

        // 배너페이드인아웃
        $(".banner-con").fadeOut(1000);
        $(".banner-con").eq(i).fadeIn(1000);

        // 버튼애들 불들어오기
        $(".banner-btn").removeClass("on");
        $(".banner-btn").eq(i).addClass("on");

    });


    // 배너버튼 강제클릭

    var ck=0;

    setInterval(function(){

        ck++;

        if(ck>2){
            ck=0;
        }

        $(".banner-btn").eq(ck).trigger("click");

    },4500);






    // 탭버전 배너 페이드, 버튼강제클릭
    $(".tm-bann").each(function(index){
        $(this).attr("data-b",index);
    });

    $(".tm-btn").each(function(index){
        $(this).attr("data-b",index);
    });



    $(".tm-btn").click(function(){


        var ii= $(this).attr("data-b");

        // 배너페이드인아웃
        $(".tm-bann").fadeOut(1000);
        $(".tm-bann").eq(ii).fadeIn(1000);

        // 버튼애들 불들어오기
        $(".tm-btn").removeClass("on");
        $(".tm-btn").eq(ii).addClass("on");

    });

    // 배너버튼 강제클릭

    var cktm=0;

    setInterval(function(){

        cktm++;

        if(cktm>2){
            cktm=0;
        }

        $(".tm-btn").eq(cktm).trigger("click");

    },4500);





 

    // ----------------------------------------

    var c=0;

    $(".head-search").click(function(){
        

        if(c==0){
            $(".search-box").css({
                display:"block"
            });

            c++;
        }else if(c==1){
            $(".search-box").css({
                display:"none"
            });

            c--;
        }


    });
   



    // -----------------------------------------------------------------

    // hidden-menu  메뉴 클릭


    $(".h-big").each(function(index){
        $(this).attr("data-b",index);
    });

    $(".h-small-wrap").each(function(index){
        $(this).attr("data-b",index);
    });


    $(".h-big").click(function(){


        var hm=$(this).attr("data-b");

        $(".h-small-wrap[data-b!="+hm+"]").css({display:"none"});
        $(".h-small-wrap[data-b="+hm+"]").css({display:"block"});


    });


    // --------------------------------------------------------------------

    // 히든메뉴 끄고 켜기

    $(".hidden-x").click(function(){

        $(".hidden-opacity").css({display:"none"});

    });




    $(".head-sub-icon").click(function(){

        $(".hidden-opacity").css({display:"block"});

    });



    // ------------------------------------------------------------------------


    $(window).scroll(function(){


        sct = $(window).scrollTop();

        if(sct>10){
            $(".top-btn").css({opacity:1});
        }else if(sct<10){
            $(".top-btn").css({opacity:0});
        }

    });


    $(".top-btn").click(function(){

        $("html,body").animate({
            scrollTop:0,
            // 그냥 top:0하면 안됨
        },800);

    });








});
// end