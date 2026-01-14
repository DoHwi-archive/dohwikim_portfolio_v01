$(document).ready(function(){

  $('.platform-box').click(function (e) {
    if (e.target.id === 'form1') {
        $('.platform-box1').addClass('open');
        $('.platform-box1.open .close-wrap').addClass('none');
        $('.platform-box2').removeClass('open');
        $('.platform-box3').removeClass('open');
        $('.platform-box4').removeClass('open');
        $('.platform-box2.open .close-wrap').removeClass('none');
        $('.platform-box3.open .close-wrap').removeClass('none');
        $('.platform-box4.open .close-wrap').removeClass('none');
    } else if (e.target.id === 'form2') {
        $('.platform-box2').addClass('open');
        $('.platform-box2.open .close-wrap').addClass('none');
        $('.platform-box1').removeClass('open');
        $('.platform-box3').removeClass('open');
        $('.platform-box4').removeClass('open');
        $('.platform-box1.open .close-wrap').removeClass('none');
        $('.platform-box3.open .close-wrap').removeClass('none');
        $('.platform-box4.open .close-wrap').removeClass('none');
    } else if (e.target.id === 'form3') {
        $('.platform-box3').addClass('open');
        $('.platform-box3.open .close-wrap').addClass('none');
        $('.platform-box2').removeClass('open');
        $('.platform-box1').removeClass('open');
        $('.platform-box4').removeClass('open');
        $('.platform-box2.open .close-wrap').removeClass('none');
        $('.platform-box1.open .close-wrap').removeClass('none');
        $('.platform-box4.open .close-wrap').removeClass('none');
    } else if (e.target.id === 'form4') {
        $('.platform-box4').addClass('open');
        $('.platform-box4.open .close-wrap').addClass('none');
        $('.platform-box2').removeClass('open');
        $('.platform-box3').removeClass('open');
        $('.platform-box1').removeClass('open');
        $('.platform-box2.open .close-wrap').removeClass('none');
        $('.platform-box3.open .close-wrap').removeClass('none');
        $('.platform-box1.open .close-wrap').removeClass('none');
    }
  });
  




















});