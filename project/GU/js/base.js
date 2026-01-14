$(document).ready(function(){


  // ----------------------------------------------------------
  // monitor - main - header - language(select)
  const label = document.querySelector('.label');
  const options = document.querySelectorAll('.optionItem');

  // 모든 옵션에서 langActive 클래스 제거
  const removeActiveClassFromOptions = function() {
      options.forEach(function(option) {
          option.classList.remove('langActive');
      });
  };

  // 클릭한 옵션의 텍스트를 라벨 안에 넣음
  const handleSelect = function(item) {
      label.innerHTML = item.textContent;
      label.parentNode.classList.remove('langActive');
  };

  // 옵션 클릭시 클릭한 옵션을 넘김
  options.forEach(function(option){
      option.addEventListener('click', function(){
          removeActiveClassFromOptions(); // 모든 옵션에서 langActive 클래스 제거
          handleSelect(option);
          option.classList.add('langActive'); // 선택한 옵션에 클래스 추가
      });
  });

  // 라벨을 클릭시 옵션 목록이 열림/닫힘
  label.addEventListener('click', function(){
      if(label.parentNode.classList.contains('langActive')) {
          label.parentNode.classList.remove('langActive');
          removeActiveClassFromOptions(); // 모든 옵션에서 langActive 클래스 제거
      } else {
          label.parentNode.classList.add('langActive');
      }
  });


    //   --------------------------------------------------
    //   monitor - sub - 1
    //   버튼 클릭이벤트 (다중선택)


    $('#side-menu-bar>.container>.side-menu-con').on('click', function() {
        $(this).toggleClass('smOpen');
    });

    //   --------------------------------------------------
    //   monitor - sub - 5 - 2
    //   버튼 클릭이벤트 (다중선택)


    $('#gun-setting .gun-btn-control .gun-control-each a').on('click', function(){
        if ($(this).hasClass('GUNon')) { 
            $(this).removeClass('GUNon');
            
        }else {
            $(this).addClass('GUNon');
            
        }
    });
 
  

























































  
  
  





  
});//end