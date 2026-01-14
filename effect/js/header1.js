$(document).ready(function(){


  $(".depth-1").each(function(index){
    $(this).attr("data-a",index);
  });

  $(".depth-2-wrap").each(function(index){
    $(this).attr("data-b",index);
  });


  
  $(".depth-1").hover(function(){


    var hv=$(this).attr("data-a");
    var hd=$(this).attr("data-b");
    

    $(".depth-2-wrap").eq(hv).animate({height:70},50);
    $(".depth-2-wrap a").removeClass("on-opacity").fadeIn(100);
       

  },function(){

    $(".depth-2-wrap").animate({height:0},10);
    $(".depth-2-wrap a").addClass("on-opacity").fadeOut(100);
    

  });








});