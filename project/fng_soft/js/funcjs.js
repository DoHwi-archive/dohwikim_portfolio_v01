document.write('<script type="text/javascript" charset="utf-8" src="/inc/_common_js.js"></script>');

//----------------------------------------------------------------------------------------------------
//-- 아이디&비밀번호 검사 함수
//----------------------------------------------------------------------------------------------------

// 아이디 유효성검사  - 프로그램 (김기영)
function checkID(obj,strNN) {
	// 아이디의 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false

	if(obj.value){
		// 문자열 검사
		var reg_id = /[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]{6,20}$/;
		if(!reg_id.test(obj.value)){ 
			alert("아이디는 영문, 숫자, 특수문자 6~20 자 이여야 합니다.");
			selectAll(obj);
			return false;
		} 
		
		return true;
	}
}

// 비밀번호 유효성검사  - 프로그램 (김기영)
function checkPW(obj,strNN) {
	// 비밀번호 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false
	
	if(obj.value){
		// 문자열 검사
		var reg_id = /[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]{6,20}$/;
		if(!reg_id.test(obj.value)){ 
			alert("비밀번호는 영문, 숫자, 특수문자 6~20 자 이여야 합니다.");
			selectAll(obj);
			return false;
		} 
		
		return true;
	}
}

// 코드 유효성검사  - 프로그램 (김기영)
function checkCode(obj,strNN) {
	// 코드의 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false
	
	// 자리수 검사
	if((obj.value.length < 2) || (obj.value.length > 20)){
		if(strNN) alert(strNN);
		else alert("2~20자의 코드를 입력해 주십시오.");
		selectAll(obj);
		return false;
	}

	// 문자열 검사
	var validstr = "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var targetstr = obj.value.toUpperCase();
	for (i = 0; i < targetstr.length; i++){
		if(validstr.indexOf(targetstr.substring(i, i+1)) < 0){
			if(strNN) alert(strNN);
			else alert("숫자 또는 영문자만 가능 합니다.");
			selectAll(obj);
			return false;
		}
	}
	
	return true;
}
//----------------------------------------------------------------------------------------------------
//-- 우편번호 검색 팝업창 호출 함수
//----------------------------------------------------------------------------------------------------
function openpost(FORM,ZIP1,ZIP2,ADDR1,ADDR2) {
	
	// URL : 우편번호 팝업의 위치
	// FORM : 폼이름
	// ZIP1 : 우편번호 앞자리 입력 input box 이름
	// ZIP2 : 우편번호 뒷자리 입력 input box 이름
	// ADDR1 : 주소1 input box 이름
	// 우편번호 조회창을 띄움

	var winobj;
	winobj=window.open('/section/zipcode/reg_address.html?param_form='+FORM+'&param_zipcode1='+ZIP1+'&param_zipcode2='+ZIP2+'&param_addr1='+ADDR1+'&param_addr2='+ADDR2,'post','toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=435,height=180');
	if (winobj!=null) winobj.focus();
}



//----------------------------------------------------------------------------------------------------
//-- 화면인쇄함수
//----------------------------------------------------------------------------------------------------

var PrintForHtmlContent; 
function printDiv () { 
   if (document.all && window.print) { 
       window.onbeforeprint = beforeDivs; 
       window.onafterprint = afterDivs; 
       window.print(); 
   } 
} 
function beforeDivs () { 
   if (document.all) { 
       var rng = document.body.createTextRange( ); 
       if (rng!=null) { 
           //alert(rng.htmlText); 
           PrintForHtmlContent = rng.htmlText; 
           rng.pasteHTML("<table border=0 align=center><tr><td align=center>" + document.all["PrintArea"].innerHTML + "</td></tr></table>"); 
       } 
   } 
} 
function afterDivs () { 
   if (document.all) { 
       var rng = document.body.createTextRange( ); 
           if (rng!=null) { 
                       rng.pasteHTML(PrintForHtmlContent); 
           } 
   } 
} 




//----------------------------------------------------------------------
//* 배너 스크롤  class
//* 속성
//*   type : 스크롤 방향 구분(1:수직 스크롤, 2:수평 스크롤)
//*   leftRightDirection : 수평 스크롤 방향 구분(1:왼쪽, 2:오른쪽)
//*   pausemouseover : 마우스 포인터 over 시 스크롤 정지 여부(true:정지, false:정지 안함)
//*   layerwidth : 스크롤내용이 보여지는 영역 가로 사이즈
//* 사용법
//* var bannerScroll = new BannerScroll(); 
//* bannerScroll.name = "bs_1"; 
//* bannerScroll.type = 2; 
//* bannerScroll.pausemouseover = true; 
//* bannerScroll.add("배너1");
//* bannerScroll.add("배너2");
//* bannerScroll.add("배너3");
//* bannerScroll.start();
//----------------------------------------------------------------------
function BannerScroll() {
	this.version = "0.1";
	this.name = "bannerScroll";
	this.item = new Array();
	this.itemcount = 0;
	this.currentspeed = 0;
	this.scrollspeed = 20;
	this.pausedelay = 1000;
	this.pausemouseover = false;
	this.stop = false;
	this.type = 2;
	this.leftRightDirection = 1;
	this.layerwidth = 100;
	this.height = 100;
	this.width = 100;
	this.stopHeight = 0;

	this.add = function() {
		var text = arguments[0];
		this.item[this.itemcount] = text;
		this.itemcount = this.itemcount + 1;
	};

	this.start = function() {
	    this.display();
	    this.currentspeed = this.scrollspeed;
	    setTimeout(this.name+'.scroll()',this.currentspeed);
	};

	this.display = function() {
	    document.write('<div id="'+this.name+'" style="height:'+this.height+'px; width:'+this.layerwidth+'px; position:relative;overflow:hidden;z-index:1" onmouseover="'+this.name+'.mouseover();" onmouseout="'+this.name+'.mouseout();">');
	
	    for (var i = 0; i < this.itemcount; i++) {
			if ( this.type == 1) {
			    document.write('<div id="'+this.name+'item'+i+'" style="left:0px; width:'+this.width+'px; position:absolute;top:'+(this.height*i+1)+'px;">');
			    document.write(this.item[i]);
			    document.write('</div>');
			} else if ( this.type == 2 ) {
			    document.write('<div id="'+this.name+'item'+i+'" style="left:'+(this.width*i+1)+'px; width:'+this.width+'px; position:absolute; top:0px;">');
			    document.write(this.item[i]);
			    document.write('</div>');
			}
	    }
	 
	    document.write('</div>');
	};

	this.scroll = function()
	{
		this.currentspeed = this.scrollspeed;
	 
		if( !this.stop ) {
			for (i = 0; i < this.itemcount; i++) {
			    obj = document.getElementById(this.name+'item'+i).style;
				
				if( this.type == 1 ) {
	            	obj.top = (parseInt(obj.top) - 2) + "px";
	                
					if( parseInt(obj.top) <= this.height*(-1) ) {
						obj.top = (this.height * (this.itemcount-1)) + "px";
						this.currentspeed = this.pausedelay;
					}
	                     
	                //if ( parseInt(obj.top) == 0 || ( this.stopHeight > 0 && this.stopHeight - parseInt(obj.top) == 0 ) )
				} else if ( this.type == 2 ) {
			     	if (this.leftRightDirection == 1) {
						obj.left = (parseInt(obj.left) - 1) + "px";
					
						if ( parseInt(obj.left) <= this.width*(-1) )
						{
						    obj.left = (parseInt(obj.left) + (this.width * (this.itemcount))) + "px";
							this.currentspeed = this.pausedelay;
						}
					} else {
						obj.left = (parseInt(obj.left) + 1) + "px";

						if ( parseInt(obj.left) >= this.layerwidth )
						{
						    obj.left = (parseInt(obj.left) - (this.width * (this.itemcount))) + "px";
						    this.currentspeed = this.pausedelay;
						}
					}
				}
			}
		}
	     
		window.setTimeout(this.name+".scroll()",this.currentspeed);
	};
     
	this.mouseover = function() {
		if ( this.pausemouseover )
		{
			this.stop = true;
	    }
	};
     
	this.mouseout = function ()
	{
		if ( this.pausemouseover )
		{
			this.stop = false;
		}
	};
}

function SelectItem(value, text) {
	this.text = text;
	this.value = value;
	this.text = text;
	this.getValue = function () {
		return this.value;
	};
	this.getText = function () {
		return this.text;
	};
}



//----------------------------------------------------------------------
//* 내용 : 체크박스에 할당된 값을 얻는다.
//*   같은 이름을 가진 체크박스가 여럿일때 유용하다.
//* 입력 :
//*   formname - form name
//*   itemname - checkbox name (같은 역할을 하는 것은 같은 이름으로 만든다.)
//*   idx - value 중의 위치 (value 는 '|' 로 묶여 있다. 이로 구분된 인덱스를 말한다.) default:0
//*   needall - check 여부에 관계없이 넣을 것인가.
//*     false 일 경우 check 된 항목의 값들을 "|" 로 묶어 반환한다.
//*     true 일 경우 check 되지 않은 항목의 값도 얻는다. (모든 값을 얻고자 할때 사용)
//*   getfrom - 값을 얻을 아이템의 이름,
//*     check 된 항목의 값을 checkbox 자체가 아닌 다른 항목의 값에서 얻을 수 있도록 한다.
//*     null 이거나 '' 일 경우 itemname 을 사용한다.
//*   exceptdisabled - true 일 경우. disabled 된 항목을 확인 항목에서 제외시킨다.
//* 반환 : "|" 로 구분된 지정된(선택된) 항목의 값
//----------------------------------------------------------------------
function getCheckValues(formname,itemname,idx,needall,getfrom,exceptdisabled) {
	/*
	'' szCodes - 리턴 값
	'' bNeedAll - <- needall
	'' iIdx - <- idx
	'' szValue - checkbox 의 값. "|" 로 구분된 항목중 idx 번째의 값
	'' szGetFrom - <- getfrom
	'' bExceptDisabled - <- exceptdisabled
	*/
	var szCodes,bNeedAll,iIdx,szValue,szGetFrom,bExceptDisabled;

	/*
	'' 변수 초기화 및 입력된 사항을 점검
	*/
	szCodes='';
	iIdx=0;
	if (typeof(idx)!='undefined') iIdx=idx;
	bNeedAll=false;
	if (typeof(needall)!='undefined') bNeedAll=needall;
	szGetFrom=itemname;
	if (typeof(getfrom)!='undefined') {
		if (getfrom!=null&&getfrom!='') szGetFrom=getfrom;
	}
	bExceptDisabled=false;
	if (typeof(exceptdisabled)!='undefined') bExceptDisabled=exceptdisabled;
	
	if (document.all[formname].elements[itemname]==null) ;
	else
		/*
		'' 항목이 있을 경우 처리한다.
		*/
		if (document.all[formname].elements[itemname].length==null) {
			/*
			'' checkbox 가 하나일 경우의 처리
			*/
			szValue=(document.all[formname].elements[szGetFrom].value+'||||').split('|')[iIdx+0];
			/*
			'' 값이 없으면 리턴할 것이 없으므로 무시한다.
			*/
			if (szValue!='') {
				/*
				'' bExceptDisabled 가 true 일 경우 disabled 된 항목은 무시한다.
				*/
				if (!bExceptDisabled||!document.all[formname].elements[itemname].disabled) {
					/*
					'' bNeedAll 이 true 이면 항상 그렇지 않으면 checked 일 경우 값을 얻는다.
					*/
					if (bNeedAll) {
						szCodes=szValue;
					} else {
						if (document.all[formname].elements[itemname].checked) {
							szCodes=szValue;
						}
					}
				}
			}
		} else {
			/*
			'' checkbox 가 여럿 일 경우 각 cjeckbox 에 대해 확인을 하고
			'' 얻은 값을 "|" 로 묶는다.
			*/
			for (var i=0;i<document.all[formname].elements[itemname].length;i++) {
				szValue=(document.all[formname].elements[szGetFrom][i].value+'||||').split('|')[iIdx+0];
				if (szValue!='') {
					if (!bExceptDisabled||!document.all[formname].elements[itemname][i].disabled) {
						if (bNeedAll) {
							if (szCodes!='') szCodes+='|';
							szCodes+=szValue;
						} else {
							if (document.all[formname].elements[itemname][i].checked) {
								if (szCodes!='') szCodes+='|';
								szCodes+=szValue;
							}
						}
					}
				}
			}
		}
	return szCodes;
}

/*****************************************************************************
* checkbox all 선택
*****************************************************************************/
function checkAll(obj, chl){
	if (obj.checked) {
		if($('.'+chl).prop("disabled") != 'disabled'){
			$('.'+chl).prop("checked",true);
		}
	} else {
		$('.'+chl).prop("checked",false);
	}
}

