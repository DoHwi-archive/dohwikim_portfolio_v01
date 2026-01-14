$(document).ready(function(){



    //header fixed 
    $(window).scroll(function(){

        var sct=$(window).scrollTop();
        var hh=$("header").height();

        if(sct>hh){
            $("header").css({
                backgroundColor:"#fff",
                borderBottom:"2px solid #ececec"
            });
            $(".h-menu-wrap a").css({
                color:"#4c4c4c",
            });
        }
        else if(sct<hh){
            $("header").css({
                backgroundColor:"transparent",
                borderBottom:"0"
            });
            $(".h-menu-wrap a").css({
                color:"#ececec",
            });
            $(".h-menu-color a").css({
                color:"#4c4c4c",
            });
        }

    });




    // 헤더> KR 스르륵 내려오기
    var kr=0;
    
    $(".h-kr-wrap").click(function(){

        if(kr==0){
            $(".kr-slide-wrap").animate({height:96,paddingTop:10,paddingBottom:10});
            kr++;
        }else if(kr==1){
            $(".kr-slide-wrap").animate({height:0,paddingTop:0,paddingBottom:0});
            kr=0;
        }
        

    });
    



    //제품 호버시 top 10px 이동
    $(".pro-con").hover(function(){

        $(this).animate({
            top:-10,
            
        },200);

    },function(){

        $(this).animate({
            top:0,
        },200);

    });
    // -----------------------------------------------------------------
    //  배너 페이드

    var ben=0;

    setInterval(function(){

        if(ben>2){
            ben=0;
        }

        $(".bann").removeClass("bann-active");
        $(".bann").eq(ben).addClass("bann-active");

        ben++;

    },4000);


    //-------------------------------------------------------------------
    // 아이스크림 - 서브페이지

    $(".ice-tab").each(function(index){
        $(this).attr("data-a",index);
    });
    $(".ice-con").each(function(index){
        $(this).attr("data-a",index);
    });


    $(".ice-tab").click(function(){

        var tck=$(this).attr("data-a");

        $(".ice-con").fadeOut(100);
        $(".ice-con").eq(tck).fadeIn(100);

        // 볼더
        $(".ice-circle").removeClass("tabbing");
        $(".ice-circle").eq(tck).addClass("tabbing");

    });



    // -----------------------------------------------------------------
    //진보적 가치-클릭 내려오기

    var rr=0;

    $(".c-top").click(function(){

        if(rr==0){

            $(".c-sub-menu").animate({
                height:300,
            },200);
            $(".unfold-title").animate({
                height:430,
            },200);
            $(".minus-btn").css({display:"block"});

            rr++;

        }else if(rr==1){

            $(".c-sub-menu").animate({
                height:0,
                
            },200);
            $(".unfold-title").animate({
                height:95,
            },200);
            $(".minus-btn").css({display:"none"});

            rr=0;

        }

    });




    // ------------------------------------------------------------
    //company  클릭 연동

    $(".year").each(function(index){
        $(this).attr("data-y",index);
    });
    $(".ex-ab").each(function(index){
        $(this).attr("data-y",index);
    });


    $(".year").click(function(){

        var ycl=$(this).attr("data-y");

        $(".ex-ab").fadeOut(100);
        $(".ex-ab").eq(ycl).fadeIn(100);

        $(".ex-ab").removeClass("ex-ab-click");
        $(".ex-ab").eq(ycl).addClass("ex-ab-click");

        $(".year").removeClass("year-click");
        $(".year").eq(ycl).addClass("year-click");

    });




    // ---------------------------------------------------
    // top btn

    $("#top-btn").click(function(){
        $("html,body").animate({
            scrollTop:0,
        },400);
    });


    $(window).scroll(function(){

        if(sct>hh){
            $("#top-btn").css({opacity:1});
        }else if(sct<hh){
            $("#top-btn").css({opacity:0});
        }

    });





});