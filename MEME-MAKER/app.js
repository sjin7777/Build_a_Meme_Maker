'use strict';


///* 1.0 - The Power of Canveas */
// 1. index.html에 canvas 태그 추가
//      - HTML의 element > canvas 태그: canvas API 창으로, JS로 그래픽을 그릴 수 있게 해주는 API
//      - WebGL API로 2D 그래픽이나 3D 그래픽을 그릴 수 있음 (이 강의에서는 2D 그래픽만 할 예정)






///* 1.1 - Our First Drawing */
const canvas = document.querySelector('canvas');

// 그림을 그리기 위해서는 context를 얻어야 함 (context = 붓, 브러쉬, 페인트 브러쉬)
const ctx = canvas.getContext('2d');

// styles.css에서 canvas에 border가 검정색인 정사각형 그리기 (body로 가운데 정렬)

// css에는 일단 기본값만 설정해놓고, 값들 수정은 JS에서 할 예정
canvas.width = 800;
canvas.height = 800;


// 참고. 그려진 canvas 정사각형의 맨 왼쪽 위에 있는 꼭지점 좌표가 (0,0)이고 여기가 기준임
if(false) {
    // fillRect(arg1, arg2, arg3, arg4): 단축함수. 사각형을 채우는 함수
    //      - arg1: 원하는 x좌표
    //      - arg2: 원하는 y좌표
    //      - arg3: width
    //      - arg4: height
    ctx.fillRect(50, 50, 100, 200); 
    // 기존 ctx를 기준으로 (x, y) 이동 후, 100 * 200인 직사각형을 그리고 지정한 border의 색으로 직사각형을 채움


    // strokeRect(arg1, arg2, arg3, arg4): 단축함수. 사각형을 그리는 함수
    //      - arg1: 원하는 x좌표
    //      - arg2: 원하는 y좌표
    //      - arg3: width
    //      - arg4: height
    ctx.strokeRect(100, 100, 100, 200); 
    // 기존 ctx를 기준으로 (x, y) 이동 후, 100 * 200인 직사각형을 그리고 지정한 border의 색으로 직사각형을 그림
}






///* 1.2 - Paths */

// canvas에서 그림을 그릴 때 과정이 매우 중요하고 필수적임
// 기본적으로 코드에서 모든 단계들을 하나씩 다 해야 함
// beginPath()를 이용하여 원한다면 canvas로 그린 그림들을 다른 경로로 나눌 수도 있음


/* rect(), stroke(), fill() */
if(false) {
    // rect(arg1, arg2, arg3, arg4): 선 만들기  (선만 만들고 색은 적용하지 않아서 보이지 않음)
    ctx.rect(50, 50, 100, 100);     

    // strock(): ctx.rect()로 선 만든거에서 선 보이게 하기  
    ctx.stroke();
    
    // strock(): ctx.rect()로 선 만든거에서 색 채우기
    ctx.fill();
}

/* 마지막 정사각형만 다른 색으로 채워보기 */
if(false) {
    // 전부 red로 바뀜
    // 이유: 같은 경로의 일부이기 때문에 모든 경로에 영향을 끼침

    ctx.rect(50, 50, 100, 100);
    ctx.rect(150, 150, 100, 100);
    ctx.rect(250, 250, 100, 100);
    ctx.fill();     // 위에 만든 사각형의 선들을 다 채움

    ctx.rect(350, 350, 100, 100);       
    ctx.fillStyle = 'red';      // 채우는 색 변경

    // ctx.fill();     // 모든 사각형 색 변경됨

    // setTimeout을 이용하여 확인해보기
    // => 3개의 검정색 정사각형이 있었다가, 4초 뒤에 정사각형이 1개 더 추가되면서 모든 정사각형이 빨간색으로 변경됨
    setTimeout(() => {ctx.fill();}, 4000);
}

if(false) {
    // beginPath()는 이전 경로와 단절한다는 뜻
    // beginPath()를 이용하여 경로를 바꾸고 원하는대로 마지막 정사각형만 색이 다르게 채움

    ctx.rect(50, 50, 100, 100);
    ctx.rect(150, 150, 100, 100);
    ctx.rect(250, 250, 100, 100);
    ctx.fill();     // 위에 만든 사각형의 선들을 다 채움

    // beginPath(): 새 경로 생성. 이전 경로와 완전히 분리되어 있음
    ctx.beginPath();
    ctx.rect(350, 350, 100, 100);       
    ctx.rect(450, 450, 100, 100);       
    ctx.fillStyle = 'red';      // 채우는 색 변경
    ctx.fill();
}





///* 1.3 - move To and line To */
// shortcut function(단절함수): rect(), fillRect(), ... 
// fillRect(): 사각형 생성 후 색을 채움
// rect(): 사각형 생성
// fill(): 색을 채움

/* shortcut function를 사용하지 않고 사각형 생성하기 */
// 브러쉬는 항상 (0,0)좌표에서 시작하고, 브러쉬의 좌표를 움직여야 함

// moveTo(x, y): ctx(브러쉬)를 x와 y로 이동시킴 (선을 긋지 않으면서 ctx를 움직일 수 있음)
// lineTo(x, y): 현재 좌표에서부터 (x, y)좌표까지 선을 그림 (선을 그으면서 ctx을 움직일 수 있음) 
//              (그러면 현재 위치의 좌표는 (x, y)로 바뀜)

if(false) {
    // ctx.rect(50, 50, 100, 100);
    // ctx.fill();

    // [현재 위치: (0, 0)]
    ctx.moveTo(50, 50);     // 아무것도 그리지 않고, (0,0) => (50, 50)으로 옮기기만 함  [현재 위치: (50, 50)]
    ctx.lineTo(150, 50);       // 좌표 (50, 50)에서부터 좌표(150, 50)까지 선을 그림 [현재 위치: (150, 50)]
    ctx.lineTo(150, 150);       // 좌표 (150, 50)에서부터 좌표(150, 150)까지 선을 그림 [현재 위치: (150, 150)]
    ctx.lineTo(50, 150);       // 좌표 (150, 150)에서부터 좌표(50, 150)까지 선을 그림 [현재 위치: (50, 150)]
    ctx.lineTo(50, 50);       // 좌표 (50, 150)에서부터 좌표(50, 50)까지 선을 그림 [현재 위치: (50, 50)]
    ctx.stroke();       // 선에 색을 넣음 (색을 채우기 전에는 이 함수를 이용해서 확인하며 그리기)
    ctx.fill();         // 사각형에 색을 채움

}





///* 1.4 - Drawing Project One */
/* fillRect()함수를 이용하여 집 그리기(집에 있는 벽, 문, 삼각형 지붕) */
// fillRect()함수 안에는 fill()함수와 rect()함수가 있음
// rect()함수 안에는 moveTo()함수와 lineTo()함수가 있음

if(false) {
    /* 벽 */
    // (200, 200)좌표에 가로 50, 세로 200인 채운 사각형
    ctx.fillRect(200, 200, 50, 200);
    // (400, 200)좌표에 가로 50, 세로 200인 채운 사각형
    ctx.fillRect(400, 200, 50, 200);

    /* 문 */
    // 문의 border 변경 (만들려는 도형의 속성을 변경한 후에 사각형을 만들어야 함!)
    ctx.lineWidth = 2;
    // (300, 300)좌표에 가로 50, 세로 100인 채운 사각형
    ctx.fillRect(300, 300, 50, 100);

    /* 천장 */
    // (200, 200)좌표에 가로 200, 세로 20인 채운 사각형
    ctx.fillRect(200, 200, 200, 20);

    /* 지붕 (삼각형) */
    // moveTo()를 이용하여 (200, 200) 좌표로 이동
    ctx.moveTo(200, 200);
    // lineTo()를 이용하여 () 좌표로 이동하며 선 그리기
    // 집의 중앙 좌표 - 두번쨰벽(x축에서 400인 좌표에서 시작하고 두께가 50)이므로 
    //              x = 325, y = 약간만 높게 설정(대충 100)
    ctx.lineTo(325, 100);
    ctx.lineTo(450, 200);
    // ctx.stroke();        // 지붕 그릴 때 사용
    ctx.fill();
}



///* 1.5 - Drawing Project Two */
/* fillRect()함수를 이용하여 사람 그리기 */

if(false) {
    /* 팔 */
    ctx.fillRect(210, 200, 15, 100);
    ctx.fillRect(350, 200, 15, 100);

    /* 몸통 */
    ctx.fillRect(260, 200, 60, 200);

    /* 머리 */
    // arct(x, y, r, startAngle, endAngle): 원 그리기
    ctx.arc(290, 150, 50, 0, 2 * Math.PI);
    ctx.fill();

    /* 눈 */
    ctx.beginPath();
    ctx.fillStyle = 'white';      // 색을 변경하기 전에, 새로운 path가 필요한지 아닌지 생각해봐야함
    // ctx.arc(310, 160, 8, 0, 2 * Math.PI);        // 원
    ctx.arc(310, 160, 8, Math.PI, 2 * Math.PI);     // 반원
    ctx.arc(270, 160, 8, Math.PI, 2 * Math.PI);

    ctx.fill();

}




///* 2.0 - Painting Lines */
/* 나중에 생성할 그림판의 프로토타입 만들기 */

// 보드를 클릭할 때마다 선 그리기
if(false) {

    // 클릭을 listen하기 위해 생성
    canvas.addEventListener('click', onClick);

    // 선 두께
    ctx.lineWidth = 2;

    // 처음 시작할 때의 좌표 지정 (onClick함수 안에 넣든 여기 넣든 자유)
    // ctx.moveTo(0, 0);
    
    function onClick(event) {
        // (clientX, clientY), (layerX, layerY) => window와 관련된 x, y 좌표 확인
        // (offsetX, offsetY) => 클릭한 x, y 좌표 확인
        // console.log(event);

        
        // 처음 시작할 때의 좌표 지정
        ctx.moveTo(0, 0);

        // 선 만들기
        ctx.lineTo(event.offsetX, event.offsetY);
        
        // 선 그리기
        ctx.stroke();

    }

}

/* 마우스를 움직이며 선 그리기 */
// 클릭으로 만든 것을 mousemove로 만들기
if(false) {

    canvas.addEventListener('mousemove', onClick);

    ctx.lineWidth = 2;
    
    function onClick(event) {
        // 처음 시작할 때의 좌표 지정
        ctx.moveTo(0, 0);

        // 선 만들기
        ctx.lineTo(event.offsetX, event.offsetY);

        // 선 그리기
        ctx.stroke();
    }

}

/* 마우스를 움직이며 선 그리기 - 색 추가*/
// 색을 array(배열)로 만들어서 선에 색 넣기
// 움직일 때마다, 또 새로운 선을 그릴 때마다 색을 다르게 하기
const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    ]

    
    if(false) {
        
        canvas.addEventListener('mousemove', onClick);
        
        ctx.lineWidth = 2;
        
        function onClick(event) {
        // 지정한 색으로 모든 선의 색이 변하지 않도록 새 경로 생성
        ctx.beginPath();

        // 처음 시작할 때의 좌표 지정
        ctx.moveTo(0, 0);
        
        // 무작위로 색 가져오기
        const color = colors[Math.floor(Math.random()*colors.length)];
        
        // 선 색 지정하기
        ctx.strokeStyle = color;

        // 선 만들기
        ctx.lineTo(event.offsetX, event.offsetY);
        
        // 선 그리기
        ctx.stroke();
    }

}

/* 클릭할 때마다 선이 그어지는 시작점을 변경하는 코드 만들어보기 */
if(false) {
    
    ctx.lineWidth = 2;
    canvas.addEventListener('click', changeStart);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    
    
    function changeStart(event) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

}
/* 클릭할 때마다 색이 달라지는 코드 만들어보기 */
if(true) {

    ctx.lineWidth = 2;
    canvas.addEventListener('click', changeColor);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    
    function changeColor(event) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.strokeStyle = color;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
}