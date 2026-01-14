$(document).ready(function(){






    // 배너애들순서값 세우기

    $(".banner-img").each(function(index){
        $(this).attr("data-a",index);
    });
    $(".banner-text").each(function(index){
        $(this).attr("data-a",index);
    });
    $(".banner-btn").each(function(index){
        $(this).attr("data-a",index);
    });



    var ww=$(window).width();

    // 클릭으로 연동시키기
    $(".banner-btn").click(function(){


        var i = $(this).attr("data-a");



        // 배너페이드인아웃
        $(".banner-img").fadeOut(1000);
        $(".banner-img").eq(i).fadeIn(1000);



        // 텍스트애들 자기자리로 들어오기
        if(ww<1200){
            
        }
        
        $("#banner-text-wrap>.banner-text[data-a!="+i+"]").animate({
            left:-700,
            opacity:0
            // display:"none"
            
        },1000);
        $("#banner-text-wrap>.banner-text[data-a="+i+"]").animate({
            left:0,
            opacity:1
            // display:"block"
        },1000);





        // 버튼애들 불들어오기
        $(".banner-btn").removeClass("on");
        $(".banner-btn").eq(i).addClass("on");
        

        



    });




    // 배너버튼 강제클릭

    var ck=0;

    setInterval(function(){

        ck++;

        if(ck>3){
            ck=0;
        }

        $(".banner-btn").eq(ck).trigger("click");

    },4500);






    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    // -------------------------------------------------------------------

    // section-1 슬라이드 버튼클릭하면 넘어가게

    var k=0;
    


    $("#right").click(function(){


        if(k==0){
            $("#long-container").animate({
                left:-100+"%"
            });

            k++;            
  
        }else if(k==1){
            $("#long-container").animate({
                left:0
            });

            k=0;
        }


    });



    var j=0;


    $("#left").click(function(){


        if(j==0){
            $("#long-container").animate({
                left:0
            });


           

        }

    });


    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    // 모바일용 배너 페이드인아웃

    var m=0;
    
    $("#mo-banner").click(function(){

        m++;

        if(m>3){
            m=0;
        }

        $(".banner-co").fadeOut(1000);
        $(".banner-co").eq(m).fadeIn(1000);


    });
    

    setInterval(function(){

        $("#mo-banner").trigger("click");

    },4500);


    // -----------------------------------------------------------
    // -----------------------------------------------------------
    // 히든왑 켜고 끄기


    $("#hd-close-btn").click(function(){


        $("#hidden-wrap").css({
            display:"none"
        });

    });


    $("#hidden-icon").click(function(){


        $("#hidden-wrap").css({
            display:"block"
        });

    });

    


    // --------------------------------------------------------------
    // 히든왑에 따라 바디고정(#wrap을 고정)

    $("#hidden-icon").click(function(){
        $("#wrap").css({
            position:"fixed"
        });
    });

    $("#hd-close-btn").click(function(){
        $("#wrap").css({
            position:"relative"
        });
    });

    


    // ----------------------------------------------------------------

    // 모바일-히든메뉴에서 각각 클릭하면 나오는거


    $(".mh-big-li").each(function(index){
        $(this).attr("data-c",index);
    });

    $(".mh-sub-wrap").each(function(index){
        $(this).attr("data-c",index);
    });




    $(".mh-big-li").click(function(){

        var z=$(this).attr("data-c");

        $(".mh-sub-wrap[data-c!="+z+"]").css({display:"none"});
        $(".mh-sub-wrap[data-c="+z+"]").css({display:"block"});

    });
    



    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------

    // 히든메뉴  메뉴 호버하면 서브ul/해당 사진 display:"block" 되기



    // .big/.small-wrap/.hd-img 연동
    $(".big").each(function(index){
        $(this).attr("data-d",index);
    });
    $(".small-wrap").each(function(index){
        $(this).attr("data-d",index);
    });
    $(".hd-img").each(function(index){
        $(this).attr("data-d",index);
    });


    $(".big").hover(function(){

        var r=$(this).attr("data-d");

        $(".small-wrap[data-d!="+r+"]").css({display:"none"});
        $(".small-wrap[data-d="+r+"]").css({display:"block"});

        $(".hd-img[data-d!="+r+"]").css({opacity:0});
        $(".hd-img[data-d="+r+"]").css({opacity:1});

    },function(){

    });


    // -----------------------------------------------------------------------

    // 헤더 스크롤하면 윗헤더 안보이게하기

    $(window).scroll(function(){


        sct = $(window).scrollTop();
        var ww=$(window).width();
       
        


        if(sct>0 && ww>1200){
            $("#up-header").css({display:"none"});
            $("header").css({
                height:80,
                backgroundColor:"transparent",
                marginTop:10
            });
        }else if(sct==0 && ww>1200){
            $("#up-header").css({display:"block"});
            $("header").css({
                height:120,
                backgroundColor:"#fff",
                marginTop:0
            });
        }


      

    });




    // ------------------------------------------------------------
    // 탭버전 히든메뉴: 메뉴클릭하면 서브메뉴 나오게

   
    $(".tabb-big").each(function(index){
        $(this).attr("data-f",index);
    });
    $(".tabb-small-wrap").each(function(index){
        $(this).attr("data-f",index);
    });

    $(".tabb-big").click(function(){

        var tabb=$(this).attr("data-f");

        $(".tabb-small-wrap[data-f!="+tabb+"]").css({display:"none"});
        $(".tabb-small-wrap[data-f="+tabb+"]").css({display:"block"});

    });

    // ---------------------------------------------------------------

    // 탭버전에서 히든아이콘 클릭하면 히든메뉴 나오게


    var ww=$(window).width();

    
        $("#tb-hidden-icon").click(function(){
            $("#hidden-wrap").css({display:"block"});
            $("#wrap").css({
                position:"fixed"
            });
        });
   


    // --------------------------------------------------------------------
    // 탑버튼 js

    $("#top-btn").click(function(){

        $("html,body").animate({
            scrollTop:0,
        },700);

    });

















});
// end