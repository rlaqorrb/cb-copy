// 목적 : 기상청에서 제공하는 API를 이용하여 실시간으로 날씨정보를 알려주는 기능을 만들 것이다.
// 개념 설명 : API란  Application Programming Interface의 약자로 다른 사람이 만들어놓은 프로그램의 서비스를 제공 받을 수 있다.
// API 참고 영상 : https://youtu.be/ckSdPNKM2pY



// 공공데이터 포털에서 '기상청_단기예보 ((구)_동네예보) 조회서비스'를 이용하기 위한 변수
// 링크 : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
// 위 링크로 들어가서 제일 밑에 샘플코드(JavaScript)에서 2열(var ulr : ···) ~ 9열(queryParams ···)까지 복사하여 붙여넣는다. (현재 붙여넣은 상태)

/*
문법 설명 : 

<변수>
어떤 값을 저장할 수 있는 '변수'는 var, let, const키워드로 선언할 수 있다.
var 변수이름 = 값;
형태로 사용할 수 있다.
var 변수이름; <-- 이렇게 쓰면 변수를 '선언'했다고 말한다.
변수이름 = 값; <-- 이렇게 쓰면 선언된 변수에 값을 '할당'한다.
JS는 다른 언어들과는 다르게 변수를 선언하고 아무 값도 할당하지 않으면  undifined 라는 자료형을 변수에 할당하여 저장한다.
var 자리에 let이나 const를 넣어서 선언해도 된다.

var, let, const의 차이점은
var은 선언과 할당이 자유롭고
let은 한번 선언한 변수이름을 다시 사용하여 변수를 선언하면 에러가 발생한다. 할당은 자유롭다.
const는 한번 선언하고 할당하면 그 이후로는 바꿀 수 없는 상수 역할을 한다. 재선언과 재할당을 하면 에러가 발생한다.

변수이름을 '식별자'라고 하는데 이는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다. (나중에 배울 함수, 클래스 등의 이름도 식별자라고 한다.)
식별자는 특수문자를 제외한 문자, 숫자, 언더스코어(_), 달러기호($)를 포함할 수 있다.
단, 식별자는 특수문자를 제외한 문자, 언더스코어(_), 달러기호($)로 시작해야 한다. 숫자로 시작하는 것은 허용하지 않는다.
예약어는 식별자로 사용할 수 없다.
ㄴ예약어는 프로그래밍 언어에서 사용되고 있거나 사용될 예정인 단어를 말한다. 자바스크립트의 예약어는 '예약어.txt' 파일을 참고하라.

네이밍 컨벤션이라는게 있는데 이는 하나 이상의 영어 단어로 구성된 식별자를 만들 때 가독성 좋게 단어를 한눈에 구분하기 위해 규정한 명명 규칙이다.
ㄴ자세한 것은 '네이밍 컨벤션.txt'를 참고하라.
*/

// API의 매개변수 base_date 부분에 들어갈 날짜를 만드는 코드
var time = new Date(); // new 연산자를 사용하여 Date 객체를 생성하였다. Date객체는 현재 날짜와 시간을 가져온다.
console.log(time); // console.log()를 사용하면 어떤 값의 결과를 콘솔창에 출력해볼 수 있다. 출력 : 'Fri Aug 26 2022 19:28:31 GMT+0900 (한국 표준시)'
// 현재 필요한 날짜의 형태는 YYYYMMDD형태이므로 위 값을 변형해주도록 하겠다.
var year = time.getFullYear(); // .getFullYear() 매서드를 이용해 현재 날짜(년도)를 가져와서 year 변수에 할당한다. 값 : 2022
var month = time.getMonth(); // .getMonth() 매서드를 이용해 현재 월을 가져와 month 변수에 할당한다. 값 : 7
// .getMonth() 매서드로 가져온 값이 7인데(현재 8월) Date() 객체는 날짜(달)을 0월부터 센다.(1월 = 0, 2월 = 1, 8월 = 7)
// 따라서 month 변수에 +1을 하여 제대로된 값을 만들 것이다.
month = month + 1; // month 변수에 1을 더했다. 값 : 8
var date = time.getDate(); // .getDate() 매서드를 이용해 현재 날짜(일)을 가져와 date 변수에 할당한다. 값 : 26
// 여기서 월과 일은 한자리 숫자인 경우 MMDD의 행태가 아니기 때문에 앞에 0을 붙여줘야한다.
/*
문법설명 : 

<if ... else 조건문>
조건문은 주어진 조건식의 평과 결과에 따라 코드 블록(블록문)의 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.
자바스크립트는 if ... else 문과 switch 문으로 두 가지 조건문을 제공하는데 지금은 if ... else 문만 알아볼 것이다.

if ... else 문의 형태는 아래와 같다

if (조건식) {
  / /조건식이 참(true)이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓(false)이면 이 코드 블록이 실행된다.
}

조선식을 추가하여 조선에 따라 실행될 코드 블록을 늘리고 싶으면 else if 문을 사용한다.

if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2){
  // 조선식2가 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}

else if 문과 else 문은 옵션이다. 즉, 사용할 수도 있고 사용하지 않을 수도 있다.
ㄴ조건식은 '조건식.txt'를 참고하라.
*/
if (month < 10) { // month가 10보다 작으면; 한자리 수이면
  month = '0' + month; // 문자 0을 더함. 문자와 숫자를 더하면 숫자는 문자 취급됨. 값 : 08
} else { // month가 10보다 작지 않으면; 두자리 수이면
  month = '' + month; // month가 숫자이면 다른값과 덧셈이 되므로 문자로 바꿔준다.
}

if (date < 10) {
  date = '0' + date;
} else {
  date = '' + date;
}

var currentTime = year + month + date; // year, month, date를 더하여 currentTime 변수에 저장한다. 문자를 더하므로 20220826의 형태로 나온다.
console.log(currentTime); // 출력(현재날짜 22년 8월 26일) : 20220826
console.log('done 1st');

let hours = time.getHours();
let min = time.getMinutes();

let baseTime = hours + '' + min + '';
console.log(baseTime);


// API를 요청하기 위한 콜백URL과 매개변수(parameter)를 변수로 선언해 놓았다. queryParams 변수가 매개변수 부분이다.
// API 참고 설명 '기상청41_단기예보 조회서비스_오픈API활용가이드_최종.zip'을 보면 각 매개변수의 의미를 알 수 있다.
var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*API에 접근하기위한 콜백url이다. 자세한 정보를 위해 "초단기예보조회"를 사용한다.*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'DBO0O5lmmpRpgEHTwRRW1qHYboYqorcaMrDH4JwzdLN72V4bg2fvmHzeS%2BAXdBMAh00uZ26qUqbRN1YuuCo2eg%3D%3D'; /*공공데이터 포덜에서 활용신청을 하여 인증키를 발급받고 문자열 타입으로 '서비스키' 부분에 넣는다.*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*받을 자료의 형식 ; XML과 JSON으로 받을 수 있다. 기본값은 XML인데 우리는 JSON으로 쓰도록 한다. JSON에 대한 자세한 내용은 'JSON.txt'를 참고하라. */
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(currentTime); /*요청하는 자료의 기준일. YYYYMMDD 형식으로 날짜를 표시한다. 위에서 만든 currentTime 변수를 넣는다.*/
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(baseTime); /**/


// nx, ny ; 날씨 정보의 위치이다. '기상청41_단기예보 조회서비스_오픈API활용가이드_최종.zip'에 있는 스프레드시트 문서를 참고하여 원하는 위치의 좌표를 알 수 있다.
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
console.log(url);
let apiUrl = url + queryParams;
console.log(apiUrl);

$.ajax({
  url : apiUrl,
  dataType : "json",
  type : "GET",
  async : "false",
  success : function(resp){
    console.log('done');
    console.log(resp);
    let short = resp.response.body.items;
    let lgt =short.item[0].fcstValue + "kA";
    console.log(short.item[0].category + " 낙뢰 : " + lgt);
    $('.lgt').html(lgt);

    let pty;
    switch(parseInt(short.item[7].fcstValue)){
      case 0:
        pty = "없음";
        break;
      case 1:
        pty = "비";
        break;
      case 2:
        pty = "비/눈";
        break;
      case 3:
        pty = "눈";
        break;
      case 5:
        pty = "빗방울";
        break;
      case 6:
        pty = "빗방울눈날림";
        break;
      case 7:
        pty = "눈날림";
        break;
      default:
        pty = "error";
    }
    pty = pty;
    console.log(short.item[7].category + " 강수형태 : " + pty);
    $('.pty').html(pty);

    let rn1 = short.item[12].fcstValue;
    console.log(short.item[12].category + " 1시간 강수량 : " + rn1);
    $('.rn1').html(rn1);
    

    let sky;
    switch(parseInt(short.item[18].fcstValue)){
      case 1:
        sky = "맑음";
        break;
      case 3:
        sky = "구름많음";
        break;
      case 4:
        sky = "흐림";
        break;
    }
    console.log(short.item[18].category + " 하늘상태 : " + sky);
    $('.sky').html(sky);

    let t1h = short.item[24].fcstValue;
    console.log(short.item[24].category + " 기온 : " + t1h + "℃");
    $('.t1h').html(t1h);

    let reh = short.item[30].fcstValue;
    console.log(short.item[30].category + " 습도 : " + reh + "%");
    $('.reh').html(reh);

    console.log(short.item[36].category + " 동서바람성분 : " + short.item[36].fcstValue + "m/s");

    console.log(short.item[43].category + " 남북바람성분 : " + short.item[43].fcstValue + "m/s");

    console.log(short.item[48].category + " 풍향 : " + short.item[48].fcstValue + "°");

    let wsd = short.item[54].fcstValue;
    console.log(short.item[54].category + " 풍속 : " + wsd + "m/s");
    $('.wsd').html(wsd);
  }
})


/*
T1H 기온 | ℃
RN1 1시간 강수량
SKY 하늘상태 | 맑음(1), 구름많음(3), 흐림(4)
UUU 동서바람성분 | m/s
VVV 남북바람성분 | m/s
REH 습도 | %
PTY 강수형태 | 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
LGT 낙뢰 | 에너지밀도(0.2~100kA(킬로암페어)/㎢)
VEC 풍향 | deg
WSD 풍속 | m/s
*/