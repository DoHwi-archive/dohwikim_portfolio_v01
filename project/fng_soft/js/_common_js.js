//------------------------------------------------------------------------------------------------
// 일반적으로 어느 홈페이지개발에서나 사용 가능한 JAVASCRIPT 함수
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
//  자주 사용되는 함수. -- comment by 김기영
//------------------------------------------------------------------------------------

function setCookie(name,value,domain) {
	// cookie 를 설정
	// name - cookie 명
	// value - cookie 에 들어갈 값
	// return - 없음
	var argc = setCookie.arguments.length;
	var argv = setCookie.arguments ;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;

	document.cookie = name + "=" + escape(value) +
		((expires==null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path==null) ? "; path=/" : ("; path=" + path)) +
		((domain==null) ? "; domain" : ("; domain=" + domain)) +
		((secure==true) ? "; secure" : "");
} 


function getCookie(name){
	
	// cookie 값을 확인
	// name - 알고자하는 쿠키의 이름
	// return - cookie 존재시 cookie 의 값, 미존재시 ''
	
	name=name+'=';
	var tmp = document.cookie;
	var sidx = tmp.indexOf(name);
	if(sidx == -1) return '';
	sidx = sidx + name.length;
	var eidx = tmp.indexOf(';', sidx);
	if(eidx == -1)eidx = tmp.length;
	return unescape(tmp.substring(sidx, eidx));
}


function selectAll(obj) {
	
	// object (text,textarea) 에 포커스를 지정하고 모든 영역을 선택함
	// obj - object (JAVA object)
	// return - 없음

	if (obj.type!='hidden'&&obj.style.display!='none') {
		obj.focus();
	}
}


function toNextObj(obj1,len,obj2) {

	// obj1 (text) 의 입력이 len 일경우 obj2 로 포커스를 이동
	// obj1 - 테스트될 object
	// len - 다음 object 로 넘어갈 길이
	// obj2 - 다음 object
	// return - none
	// 비고 - onkeyup event function 에서 사용할 수 있음

	if (obj1!=null&&obj2!=null) {
		if (obj1.value.length>=len) selectAll(obj2);
	}
}

function checkFunc(func,value) {
	var aTemp;
	if (func=='') return '';
	var aTemp=(func+'////////').split("/");
	switch (aTemp[0]) {
	case 'noneorlen' :
		if (value.length==0||value.length==parseInt(aTemp[1])) return '';
		return aTemp[2];
	case 'checklen' :
		if (value.length==parseInt(aTemp[1])) return '';
		return aTemp[2];
	default          :
		return '알 수 없는 함수적용';
	}
}

function checkVar(obj,strNE,iFloat,strNN,iMin,iMax,strOF) {

	// 입력값의 유효성여부를 확인함
	// obj - 확인할 object
	// strNE - 입력값이 공백일경우(스페이스만 입력한 경우 포함) 표시할 오류 내용. 이값이 '' 일경우 오류를 내지 않음
	// ------------- 이하는 strNN 까지 지정시 유효
	// 숫자 확인 부분으로 숫자뒤 문자가 입력되어도 숫자로 변경시킨다. ('223f'->'223')
	// 음수는 입력할 수 없음
	// iFloat - 소숫점이하 자리 - 이 이하로 입력된 값은 라운드됨. 9 일경우 형식을 변화시키지 않음(전화번호등의  입력시)
	// strNN - 숫자로 변경이 되지 않을 때의 표시할 오류 내용
	// ------------- 이하는 strOF 까지 지정시 유효
	// 변경된 수치의 유효범위를 확인
	// iMin - 수치의 최소값
	// iMax - 수치의 최대값
	// strOF - 범위를 벗어났을때 표시할 오류 내용
	// return - 정상시 true, 오류시 해당 object 로 focus 이동후 false 를 return
	
	var value,pow;
	var aTemp,func,szAlert;
	if (typeof(obj)=='undefined') return true;
	value=obj.value.replace(/^[ ]+/g,'').replace(/[ ]+$/g,'');
	if (value==''&&strNE=='') return true;
	aTemp=(strNE+'##').split('##');
	strNE=aTemp[0];
	func=aTemp[1];
	if (value=='') {
		if (strNE!='') {
			alert(strNE);
			selectAll(obj);
			return false;
		}
		selectAll(obj);
		return true;
	}
	if ((szAlert=checkFunc(func,value))!='') {
		alert(szAlert);
		selectAll(obj);
		return false;
	}
	if (typeof(strNN)!='undefined') {
		if (iFloat==0) value=parseInt(obj.value,10);
		else {
			value=parseFloat(obj.value);
			if (!isNaN(value)) {
				pow=Math.pow(10,iFloat);
				value=Math.round(value*pow)/pow;
			}
		}
		if (isNaN(value)) {
			if (strNN!='') alert(strNN);
			selectAll(obj);
			return false;
		}
		if (iFloat!=9) obj.value=value;
		if ((szAlert=checkFunc(func,''+value))!='') {
			alert(szAlert);
			selectAll(obj);
			return false;
		}
		if (obj.value<0) {
			alert('음수는 입력하실 수 없습니다.');
			selectAll(obj);
			return false;
		}
		if (typeof(iMin)!='undefined') {
			if (parseInt(obj.value)<parseInt(iMin)) {
				if (strOF!='') alert(strOF);
				selectAll(obj);
				return false;
			}
		}
		if (typeof(iMax)!='undefined') {
			if (parseInt(obj.value)>parseInt(iMax)) {
				if (strOF!='') alert(strOF);
				selectAll(obj);
				return false;
			}
		}
//	} else {
//		if (obj.value.indexOf("'")!=-1) {
//			alert("'는 입력하실 수 없습니다.");
//			selectAll(obj);
//			return false;
//		}
	}
	return true;
}




function getCheckValues(formname,itemname,idx,needall,getfrom,exceptdisabled) {
	
//	 내용 : 체크박스에 할당된 값을 얻는다.
//	  같은 이름을 가진 체크박스가 여럿일때 유용하다.
//	 입력 :
//	   formname - form name
//	   itemname - checkbox name (같은 역할을 하는 것은 같은 이름으로 만든다.)
//	   idx - value 중의 위치 (value 는 '|' 로 묶여 있다. 이로 구분된 인덱스를 말한다.) default:0
//	   needall - check 여부에 관계없이 넣을 것인가.
//	     false 일 경우 check 된 항목의 값들을 "|" 로 묶어 반환한다.
//	     true 일 경우 check 되지 않은 항목의 값도 얻는다. (모든 값을 얻고자 할때 사용)
//	   getfrom - 값을 얻을 아이템의 이름,
//	     check 된 항목의 값을 checkbox 자체가 아닌 다른 항목의 값에서 얻을 수 있도록 한다.
//	     null 이거나  일 경우 itemname 을 사용한다.
//	  exceptdisabled - true 일 경우. disabled 된 항목을 확인 항목에서 제외시킨다.
//	  반환 : "|" 로 구분된 지정된(선택된) 항목의 값
//	
//	 szCodes - 리턴 값
//	 bNeedAll - <- needall
//	 iIdx - <- idx
//	 szValue - checkbox 의 값. "|" 로 구분된 항목중 idx 번째의 값
//	 szGetFrom - <- getfrom
//	 bExceptDisabled - <- exceptdisabled
	
	var szCodes,bNeedAll,iIdx,szValue,szGetFrom,bExceptDisabled;

//	변수 초기화 및 입력된 사항을 점검

	szCodes='';
	iIdx=0;
	if (typeof(idx)!='undefined') iIdx=idx;
	bNeedAll=false;
	if (typeof(needall)!='undefined') bNeedAll=needall;
	szGetFrom=itemname
	if (typeof(getfrom)!='undefined') {
		if (getfrom!=null&&getfrom!='') szGetFrom=getfrom;
	}
	bExceptDisabled=false;
	if (typeof(exceptdisabled)!='undefined') bExceptDisabled=exceptdisabled;
	
	if (document.all[formname].elements[itemname]==null) ;
	else
//		'' 항목이 있을 경우 처리한다.
		if (document.all[formname].elements[itemname].length==null) {
//			'' checkbox 가 하나일 경우의 처리
			szValue=(document.all[formname].elements[szGetFrom].value+'||||').split('|')[iIdx+0];
//			'' 값이 없으면 리턴할 것이 없으므로 무시한다.
			if (szValue!='') {
//				'' bExceptDisabled 가 true 일 경우 disabled 된 항목은 무시한다.
				if (!bExceptDisabled||!document.all[formname].elements[itemname].disabled) {
//					'' bNeedAll 이 true 이면 항상 그렇지 않으면 checked 일 경우 값을 얻는다.
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
//			'' checkbox 가 여럿 일 경우 각 cjeckbox 에 대해 확인을 하고
//			'' 얻은 값을 "|" 로 묶는다.
			for (i=0;i<document.all[formname].elements[itemname].length;i++) {
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



function retManAge(szJumin1,szJumin2) {

	// 주민번호를 통해 만나이를 계산함
	// szJumin1 - 주민번호 앞자리
	// szJumin2 - 주민번호 뒷자리
	// return - 만나이

	today		= new Date();
	sysDate		= today.toLocaleString();
	sysYear		= sysDate.slice(6,10);
	sysMonDay	= sysDate.slice(0,2) + sysDate.slice(3,5);

	regYear		= szJumin1.slice(0,2);
	regMonDay	= szJumin1.slice(2,6);
	regSex		= szJumin2.slice(0,1);

	if(regSex=="1" || regSex=="2") regYear="19"+regYear; else regYear = "20"+regYear;

	iAge=parseFloat(sysYear)-parseFloat(regYear)-1;
	iMon=parseFloat(sysMonDay)-parseFloat(regMonDay);

	if(iMon>=0)	iAge=iAge+1;

	return iAge;
}




function checkRegisterNum(regno1,regno2) {

	// 주민번호 유효성확인
	// regno1 - 주민번호 앞자리
	// regno2 - 주민번호 뒷자리
	// return - true or false

	var i = 0;
 	var curYear;
	var curMonth;
 	var birthYear = 0;//출생연도 저장
	var birthMonth = 0;//출생월 저장
 	var Sum = 0;
	var Mod = 0;
	var YearIn = 0;
	var MonthIn = 0;
	var DateIn = 0;
	if (regno1.length!=6 || regno2.length!=7)	return false;
	
	var regno = regno1 + "-" + regno2;
	for( i=0 ; i < 14 ; i++ )
    {//주민번호 14자리를 한자리씩 체크
    	if(i != 6)
        {//대쉬(-)를 제외한 모든 입력값이 0 ~ 9 사이의 값인지 체크
			if( (regno.charAt(i) <= "0") && (regno.charAt(i) >= "9") )	return false;
		}
	}

	birthYear	= regno1.slice(0,2);
	birthMonDay	= regno1.slice(2,6);

	if( regno.charAt(7) == '3' || regno.charAt(7) == '4') birthYear = "20" + birthYear;
	else
	{
		birthYear = "19" + birthYear;

		for( i = 0 ; i < 13 ; i++ )
   		{
			if( i == 0)			YearIn+=parseInt(regno.charAt(i))*10;
			if( i == 1)			YearIn+=parseInt(regno.charAt(i));
  			if( i == 2)			MonthIn+=parseInt(regno.charAt(i))*10;
  		    if( i == 3)			MonthIn+=parseInt(regno.charAt(i));
			if( i == 4)			DateIn+=parseInt(regno.charAt(i))*10;
			if( i == 5)			DateIn+=parseInt(regno.charAt(i));
			if( i < 6)			Sum+=parseInt(regno.charAt(i))*(i+2);
			if( i > 6 && i < 9 )Sum+=parseInt(regno.charAt(i))*(i+1);
   			if( i > 8)			Sum+=parseInt(regno.charAt(i))*(i-7);
		} //end for

		Mod=11-(Sum%11);

		if((11-(Sum%11))>=10) Mod-=10;
		if( Mod!=parseInt(regno.charAt(13)) ) {return false;}
		if( MonthIn < 1 || MonthIn > 12 || DateIn < 1 || DateIn > 31 ) {return false;}
		if( (MonthIn ==4 || MonthIn == 6 || MonthIn == 9 || MonthIn == 11 ) && DateIn > 30 ) {return false;}
		if( MonthIn ==2 && DateIn > 29 ) {return false;}
	}

	return true;
}






// 이메일 주소검사  - 함수 변경 (김기영)
function checkEMail(obj,strNN) {
	// email 의 유효성확인 (정규식)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false
	
	var email = obj.value;
	if(email){
		var pattern = /^(.+)@(.+)$/;
		var atom = "\[^\\s\\(\\)<>#@,;:!\\\\\\\"\\.\\[\\]\]+";
		var word="(" + atom + "|(\"[^\"]*\"))";
		var user_pattern = new RegExp("^" + word + "(\\." + word + ")*$");
		var ip_pattern = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
		var domain_pattern = new RegExp("^" + atom + "(\\." + atom +")*$");

		var arr = email.match(pattern);
		
		// @, . 문자 검사
		if (!arr){
			//return "Email address seems incorrect (check @ and .'s)";
			if(strNN) alert(strNN);
			else alert("이메일 주소가 올바르지 않습니다. \n\n['@', '.' 문자를 확인 하여 주십시오.]");
			obj.focus();
			selectAll(obj);
			return false;
		}
		
		// 계정 형태 검사
		if (!arr[1].match(user_pattern)){
			//return "The username doesn't seem to be valid.";
			if(strNN) alert(strNN);
			else alert("이메일 주소가 올바르지 않습니다. \n\n[사용자 계정을 확인 하여 주십시오.]");
			obj.focus();
			selectAll(obj);
			return false;
		} 
		
		// IP 형태 검사
		var ip = arr[2].match(ip_pattern);
		if (ip) {
			for (var i=1; i<5; i++){
			  if (ip[i] > 255){
					//return "Destination IP address is invalid!";
					if(strNN) alert(strNN);
					else alert("이메일 주소가 올바르지 않습니다. \n\n[아이피 주소를 확인하여 주십시오.]");
					obj.focus();
					selectAll(obj);
					return false;
				} 
			}
		}else{
			// 도메인 형태 검사		
			if (!arr[2].match(domain_pattern)){
				//return "The domain name doesn't seem to be valid.";
				if(strNN) alert(strNN);
				else alert("이메일 주소가 올바르지 않습니다. \n\n[도메인을 확인하여 주십시오.]");
				obj.focus();
				selectAll(obj);
				return false;
			}
			var domain = arr[2].match(new RegExp(atom,"g"));
			if (domain.length<2){
				// return "This address is missing a hostname!";
				if(strNN) alert(strNN);
				else alert("이메일 주소가 올바르지 않습니다. \n\n[도메인이 누락되었습니다.]");
				obj.focus();
				selectAll(obj);
				return false;
			}
			if (domain[domain.length-1].length<2 || domain[domain.length-1].length>3){
				// return "The address must end in a three-letter domain, or two letter country.";
				if(strNN) alert(strNN);
				else alert("이메일 주소가 올바르지 않습니다. \n\n[도메인형식이 맞지 안습니다.]");
				obj.focus();
				selectAll(obj);
				return false;
			}
				 
		}
	}
	return true; 
} 


function getRadioValue(objForm,objRadio,dV) {

	// 라디오버튼의 결과값을 확인
	// objForm - 라디오버튼이 속한 폼의 이름
	// objRadio - 라디오버튼의 이름
	// dV - 선택항목이 없을 경우의 리턴값
	// return - 선택항목지정시 선택된 값, 미지정시 dV

	var defaultValue;
	if (getRadioValue.arguments.length>=3) defaultValue=dV;
	else defaultValue=-1

	var iSellCode,bNoItem;
	iSellCode=defaultValue;
	if (objForm=='') objForm="_no form_"
	if (objRadio=='') objRadio="_no radio_"
	if (document.forms(objForm)==null) return iSellCode;
	if (document.forms(objForm).elements(objRadio)==null) return iSellCode;

	var i;
	bNoItem=true;
	for (i=0;i<1000;i++) {
		if (document.forms(objForm).elements(objRadio)[i]==null) break;
		bNoItem=false;
		if (document.forms(objForm).elements(objRadio)[i].checked) {
			iSellCode=document.forms(objForm).elements(objRadio)[i].value;
			break;
		}
	}
	if (bNoItem) {
		if (document.forms(objForm).elements(objRadio)!=null) {
			if (document.forms(objForm).elements(objRadio).checked) {
				iSellCode=document.forms(objForm).elements(objRadio).value;
			}
		}
	}
	return iSellCode;
}



function getSelectValue(objForm,objRadio,dV) {
	// 내용 : select 에 선택 값을 돌려준다.
	//   (select object 의 value 를 가져 오는 것과 달리
	//   multi select 일 경우 선택된 모든 항목의 값을 "," 로 묶어 돌려 준다)
	// 입력 :
	//   objForm - select object 가 있는 form 의 아이디
	//   objRadio - select object 의 아이디 (이름이 안 맞지만 이해하기를.)
	//   dV - 선택된 값이 없을 경우 default 값. default:-1
	// 반환 : "," 로 엮인 선택된 항목의 value 들
	// 주의 : 선택은 됬지만 값이 없을 경우는 처리 대상에서 제외된다.

	// defaultValue - 선택된 항목이 없을 경우 설정할 값
	var defaultValue;
	if (getSelectValue.arguments.length>=3) defaultValue=dV;
	else defaultValue=-1

	// iSellCode - return 할 값
	var iSellCode;

	// 입력된 값을 정돈한다.
	iSellCode=defaultValue;
	if (objForm=='') objForm="_no form_"
	if (objRadio=='') objRadio="_no radio_"
	if (document.forms(objForm)==null) return iSellCode;
	if (document.forms(objForm).elements(objRadio)==null) return iSellCode;

	// i - iterator
	// len - option 의 수
	// val - return 할 값
	var i,len,val;

	// option 의 갯수를 얻고 return 할 값을 초기화 한다.
	len=document.forms(objForm).elements(objRadio).options.length;
	val='';
	// 각 option 에 대해
	for (i=0;i<len;i++) {
		if (document.forms(objForm).elements(objRadio).options[i].selected&&document.forms(objForm).elements(objRadio).options[i].value!='') {
			// 선택되어 있고 값이 있다면 return 할 값에 추가한다. (값이 여럿일 경우 "," 로 분리한다.)
			if (val!='') val+=',';
			val+=document.forms(objForm).elements(objRadio).options[i].value;
		}
	}
	if (val!='') iSellCode=val;
	return iSellCode;
}







//---------------------------------------------------------------------------------
// 숫자를 제외한 다른 키 입력시 에러 메세지 반환  -- comment by 김기영
//---------------------------------------------------------------------------------


//-- 폼값에서 문자를 삭제하고 숫자만 남기는 함수
function stripcharval(obj){
	var validstr = "0123456789";
	var ReturnVal = "";
	for (i = 0; i < obj.value.length; i++){
		if(validstr.indexOf(obj.value.substring(i, i+1)) >= 0){
			ReturnVal=ReturnVal+obj.value.substring(i, i+1);
		}
	}
	obj.value = ReturnVal;
}


//-- 숫자만 입력가능하게 하는 함수
function fnChkNum(obj){
	var validstr = "0123456789";
	var ReturnVal = "";
	var mode = true;
	for (i = 0; i < obj.value.length; i++){
		if(validstr.indexOf(obj.value.substring(i, i+1)) >= 0){
			ReturnVal=ReturnVal+obj.value.substring(i, i+1);
		}else{
			mode = false;
		}
	}
	if(!mode){
		alert("숫자만 입력 가능 합니다.")
	}
	obj.value = ReturnVal;
}


//---------------------------------------------------------------------------------
// 필터링 함수  -- program by 김기영
//---------------------------------------------------------------------------------
// 콘텐츠 값에서 필터값이 포함되어 있는지를 확인하여 필터대상값이 포함 된경우 해당 필터값을 반환하는 함수
// filter : 필터값 ( ',' 로 단어를 구분)
// content : 필터링 대상 문자열
// return value : 필터링에 걸린경우 필터링 단어, 필터링에 안걸린경우 ""
function doFiltering(filter,content){
	var trim_pattern = /(^\s*)|(\s*$)/g; // \s 공백 문자 // 양쪽 공백 없애기 trim()
	var s = filter.split(",");

	if(content){
		for (i=0; i<s.length; i++){
			s[i] = s[i].replace(trim_pattern, "");

			if (s[i]=="") continue;
			if (content.indexOf(s[i]) != -1) return s[i];
		}
	}
	return "";
}

//-------------------------------------------------------------------------------------------
// 기타 함수 -- comment by 김기영
//-------------------------------------------------------------------------------------------


function m2p(m) {

	// '제곱미터'를 '평'으로 변환
	// m - '제곱미터'값
	// return - '평'으로 변환된 값

	return Math.round(m*0.3025*100)/100;
}

function p2m(p) {

	// '평'을 '제곱미터'로 변환
	// p - '평'값
	// return - '제곱미터'로 변환된 값

	return Math.round(p/0.3025*100)/100;
}
function m2y(m) {

	// '미터'를 '야드'으로 변환
	// m - '미터'값
	// return - '야드'으로 변환된 값

	return Math.round(m*1.0936*100)/100;
}


function y2m(y) {

	// '야드'을 '미터'로 변환
	// y - '야드'값
	// return - '미터'로 변환된 값

	return Math.round(y*0.9144*100)/100;
}


function getValue(szContent,szName) {
	var iStart,iEnd;
	szName=szName+'=';
	while (1) {
		iEnd=szContent.length;
		iStart=szContent.indexOf(szName);
		if (iStart==-1) return '';
		if (iStart==0||szContent.charAt(iStart-1)==';') break;
		szContent=szContent.substring(iStart+1,iEnd);
	}
	szContent=szContent.substring(iStart,iEnd);
	iEnd=szContent.indexOf(';');
	szContent=szContent.substring(0,iEnd);
	return szContent.split(szName)[1];
}

function makeItem() {
	this.value='';
	return this;
}

function makeArray(n) {
	var i;
	this.length=n;
	for (i=0;i<n;i++) this[i]=new makeItem();
	return this;
}




//----------------------------------------------------------------------------------------------------
// 오브젝트 관련 함수 (태그) -- comment by 김기영)
//----------------------------------------------------------------------------------------------------
function getRowIndex(obj) {
	while (1) {
		if (obj==null) break;
		if (obj.tagName=='TR') break;
		obj=obj.parentElement;
	}
	if (obj==null) return -1;
	return obj.rowIndex;
}

function insertRow(szTableName,iIOffset) {
	var objTBL,objTR,iOff;
	objTBL=document.all[szTableName];
	if (objTBL==null) return null;
	if (typeof(iIOffset)=='undefined') iOffset=0; else iOffset=iIOffset;
	objTR=objTBL.insertRow(objTBL.rows.length-iOffset);
	return objTR;
}

function insertCol(objTR,vclass,valign,vvalue) {
	objTD=objTR.insertCell();
	objTD.className=vclass;
	objTD.align=valign;
	objTD.innerHTML=vvalue;
	return objTD;
}

function addContentRow(szFormName,szFieldName,szContent) {
	var obj;
	obj=document.all[szFormName];
	if (obj==null) return '';
	if (szFieldName!='') obj=obj[szFieldName];
	if (obj==null) return '';
	obj.value+='::'+szContent;
	return obj.value;
}

function addContentCol(szContent,szName,szValue) {
	return szContent+szName+'='+szValue+';';
}

function deleteRow(szTableName,iRow,iIRowPerContent) {
	var iRowPerContent,objTBL,i;
	if (typeof(iIRowPerContent)=='undefined') iRowPerContent=1; else iRowPerContent=iIRowPerContent;
	objTBL=document.all[szTableName];
	if (objTBL==null) return 0;
	for (i=0;i<iRowPerContent;i++) objTBL.deleteRow(iRow);
	return i;
}

function deleteContentRow(szFormName,szFieldName,iIndex) {
	var obj,i,aszContent,szContent,szReturn;
	obj=document.all[szFormName];
	if (obj==null) return '';
	if (szFieldName!='') obj=obj[szFieldName];
	if (obj==null) return '';

	szReturn='';

	if (iIndex<0) return szReturn;
	aszContent=obj.value.split('::');
	for (i=1,szContent='';i<aszContent.length;i++)
		if (i-1!=iIndex) szContent+=('::'+aszContent[i]); else szReturn=aszContent[i];
	obj.value=szContent;

	return szReturn;
}

function deleteContentHit(objElement,szTableName,szFormName,szFieldName,iIHeadings,iIRowPerContent) {
	var iRowPerContent,iHeadings,iRow;
	if (typeof(iIRowPerContent)=='undefined') iRowPerContent=1; else iRowPerContent=iIRowPerContent;
	if (typeof(iIHeadings)=='undefined') iHeadings=0; else iHeadings=iIHeadings;

	iRow=getRowIndex(objElement);
	if (iRow==-1) return '';

	deleteRow(szTableName,iRow,iRowPerContent);
	return deleteContentRow(szFormName,szFieldName,(iRow-iHeadings)/iRowPerContent);
}

function deleteContentHas(szName,szValue,szTableName,szFormName,szFieldName,iIHeadings,iIRowPerContent) {
	var iRowPerContent,iHeadings,iRow,iDeleted;
	iDeleted=0;
	if (typeof(iIRowPerContent)=='undefined') iRowPerContent=1; else iRowPerContent=iIRowPerContent;
	if (typeof(iIHeadings)=='undefined') iHeadings=0; else iHeadings=iIHeadings;

	var obj,aszTemp,i,szTemp;
	szTemp='';
	obj=document.all[szFormName];
	if (obj==null) return '';
	if (szFieldName!='') obj=obj[szFieldName];
	if (obj==null) return '';
	aszTemp=obj.value.split('::');
	for (i=1;i<aszTemp.length;i++) {
		if (getValue(aszTemp[i],szName)==''+szValue) {
			iRow=(i-1-iDeleted)*iRowPerContent+iHeadings;
			deleteRow(szTableName,iRow,iRowPerContent);
			szTemp=szTemp+'::'+deleteContentRow(szFormName,szFieldName,(iRow-iHeadings)/iRowPerContent);
		}
	}
	return szTemp;
}



//----------------------------------------------------------------------
//* ajax 호출을 위한 class
//* 생성자 파라미터
//*   url
//*   postParam - post 방식으로 호출할 경우 전달될 파라미터. null 일 경우 get 방식으로 동작함.
//*     ex) "id=xxx&name=yyy" 
//*   callbackFn - async 방식으로 호출할 경우 callback function. null 일 경우 sync 방식으로 동작함.
//*     한 개의 파라미터가 필요하며 이 파라미터에는 this pointer 가 전달된다.
//*     ex) function (obj) { alert(obj.responseText); }
//* 메쏘드
//*   setProcIdx(procIdx) - procIdx 설정(procIdx 는 사용하는 곳에서 정해진 값으로 마지막으로 보낸 call 인지 확인하는 데 사용할 수 있다.
//*   getProcIdx()
//*   setRequestHeader(key, value) - request header 설정. ajax 객체의 setRequestHeader 와 동일
//*   call(onlySucc) - 설정된 파라미터로 호출시도. onlySucc - async 방식일 때 성공시에만 callback 을 호출함(생략가능. 생략시 true).
//*     sync 방식일 경우 return 값은 성공여부.
//*     async 방식일 경우 성공시에 callbackFn 이 호출됨. (onlySucc 에 false 일 경우 무조건 호출됨)
//*   abort() - ajax 객체의 abort() 과 동일
//*   getResponseXML() - 성공후 처리해야 되며. ajax 객체의 responseXML 과 동일
//*   getResponseText() - 성공후 처리해야 되며. ajax 객체의 responseText 과 동일
//*   getResponseHeader(header) - ajax 객체의 getResponseHeader(header) 과 동일
//*   getAllResponseHeaders() - ajax 객체의 getAllResponseHeaders() 과 동일
//----------------------------------------------------------------------
function AjaxCall(url, postParam, callbackFn) {
	this.obj = null;
	this.url = url;
	this.postParam = postParam;
	this.callbackFn = callbackFn;
	this.onlySucc = true;
	this.procIdx = 0;

	var tthis = this;
	
	if (this.obj == null) {
		if (window.XMLHttpRequest) {
			this.obj = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			this.obj = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
	if (this.postParam == "") {
		this.postParam = null;
	}
	
	//* private
	this.callback__ = function () {
		if (tthis.callbackFn != null) {
			if (tthis.obj.readyState == 4) {
				if (tthis.obj.status == 200) {
					tthis.callbackFn(tthis);
					return ;
				}
			}

			if (! tthis.onlySucc) {
				tthis.callbackFn(tthis);
			}
		}
	};
	
	this.setProcIdx = function (procIdx) {
		this.procIdx = procIdx;
	}
	
	this.getProcIdx = function () {
		return this.procIdx;
	}
	
	this.setRequestHeader = function (key, value) {
		this.obj.setRequestHeader(key, value);
	};
	
	this.call = function (onlySucc) {
		var method = (this.postParam == null ? "GET" : "POST"); 
		var sync = (this.callbackFn == null);
		var rval;

		if (onlySucc == undefined || onlySucc != false) {
			this.onlySucc = true; 
		} else {
			this.onlySucc = false;
		}
		
		//* open 하면 값이 없어 질수 있으므로 초기화는 open 뒤에
		this.obj.open(
			method,
			this.url,
			!sync
			);
		
		this.obj.onreadystatechange = (sync ? function () {} : this.callback__);

		if (method == "POST") {
			this.obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		}

		this.obj.send(this.postParam);
		
		if (sync) {
			if (this.obj.readyState == 4) {
				if (this.obj.status == 200) {
					return true;
				}
			}
			
			return false;
		}
		
		return true;
	};
	
	this.abort = function () {
		this.obj.abort();
	};
	
	this.getResponseText = function () {
		return this.obj.responseText;
	};

	this.getResponseXML = function () {
		return this.obj.responseXML;
	};
	
	this.getResponseHeader = function (header) {
		this.obj.getResponseHeader(header);
	};
	
	this.getAllResponseHeaders = function () {
		return this.obj.getAllResponseHeaders();
	};
}

//----------------------------------------------------------------------------------------------------
// 입력키코드값 (-- program by 김기영)
//----------------------------------------------------------------------------------------------------
function getKeyCode(e){
  var keyVal
	if (window.event) { 
       // IE에서 이벤트를 확인하기 위한 설정 
        keyVal = window.event.keyCode; 
    } else if (e) { 
      // FireFox에서 이벤트를 확인하기 위한 설정 
        keyVal = e.which; 
    }
	return keyVal;
}



//----------------------------------------------------------------------------------------------------
// 플래시 및 오브젝트 쓰기 함수 (-- comment by 김기영)
//----------------------------------------------------------------------------------------------------

function object_write(id){
  document.write(id.innerHTML) ;
}



//----------------------------------------------------------------------------------------------------
// 공백제거 (-- program by 김기영)
//----------------------------------------------------------------------------------------------------
function trim(str) { // 공백 삭제 함수
	var mkstr="";
	
	for (i = 0; i < str.length; i++){
		if((str.substring(i, i+1)!=" ")){
			mkstr+=str.substring(i, i+1);
		}
	}
	return mkstr;
}


function writeFlash(id, url, w, h) {
	var str = "";
	str = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' width="+w+" height="+h+" id='"+id+"'>";
	str += "<param name=movie value=\""+url+"\">";
	str += "<param name=play value=true>";
	str += "<param name=quality value=high>";
	str += "<param name=wmode value=transparent>";
	str += "<embed src=\""+url+"\" width="+w+" height="+h+" quality=high type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'>";
	str += "</embed>";
	str += "</object>";
	document.write(str);	
}


//----------------------------------------------------------------------------------------------------
// window.onload 함수 다중 호출
//----------------------------------------------------------------------------------------------------
function addLoadFunc(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}



//----------------------------------------------------------------------------------------------------

var NS4 = (document.layers) ? 1 : 0;
var IE = (document.all) ? 1 : 0;
var DOM = (document.getElementById) ? 1 : 0;

if ((!NS4)&&(!IE)&&(!DOM)) alert('This site requires that you upgrade\nto at least Internet Explorer 4.0 or Netscape Navigator 4.0.\nWe apologize  for any inconvenience this may cause.');


/*****************************************************************************
* content div 영역 데이터 로드 - location.href 대체
*****************************************************************************/
jQuery.ajaxSetup({cache:false});
/**
 * 공통함수::
 * 파라미터로 입력된 url로 화면 전환. - location.href 대체, get 방식
 * <p>ex ) 파라미터의 객체의 초기화 <br/>
 *  var params = []; <br/>
 *  params.push({name:"parSrchOpt1", value:grpCd}); <br/>
 *  params.push({name:"parSrchOpt2", value:mbrSno}); <br/>
 *  위와 같이 하거나 또는 <br/>
 *  var form = $('#srchForm');<br/> 
 *	 $('input[name=parTgtSno]', form).val('');<br/>
 *	 var params = form.serializeArray();  <br/>
 * <p> 함수 사용 예시
 *  loadContents('/MGXXXM00CN.do', params); 
 * @param {String} url - 이동할 화면 주소 
 * @param {String} data - 이동할 때 파라미터로 넘겨야 할 json array object
 * @version 0.1
 * @sdoc /inc/_common_js.js
 */
function loadContents(url, data, complete) {
	data = data || '';
	if (typeof data === 'object') {
		data = jQuery.param(data);
	}
	top.location.href = data ? (url + '?' + data) : url;
}

function loadContentsCurrentPage(url, data) {
	data = data || '';
	if (typeof data === 'object') {
		data = jQuery.param(data);
	}
	window.location.href = data ? (url + '?' + data) : url;
}

function submitPost(url, parm, target) {
	var f = document.createElement('form');

	var objs, value;
	for (var p = 0, lp = parm.length; p < lp; p ++) {
		var key = parm[p].name;
		var value = parm[p].value;
		objs = document.createElement('input');
		objs.setAttribute('type', 'hidden');
		objs.setAttribute('name', key);
		objs.setAttribute('value', value);
		f.appendChild(objs);
	}

	if (target) {
		f.setAttribute('target', target);
	}
	f.setAttribute('method', 'post');
	f.setAttribute('action', url);

	document.body.appendChild(f);
	
	f.submit();
}

