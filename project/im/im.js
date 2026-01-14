$(document).ready(function(){




    // header
    $(window).scroll(function(){

        var sct=$(window).scrollTop();


        if(sct>1){

            $("header").css({
                backgroundColor:"rgba(0,0,0,0)"
            });
            $(".dh-sig-wrap").css({
                display:"none"
            });

        }else if(sct<1){
            $(".dh-sig-wrap").css({
                display:"block"
            });
        }




    });











});