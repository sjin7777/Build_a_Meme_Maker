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
ctx.lineWidth = 2;      // 붓 두께
let isPainting = false;     // 유저가 그리고 있는지 여부


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

    function onClick(event) {
        // 처음 시작할 때의 좌표 지정
        ctx.moveTo(0, 0);

        // 선 만들기
        ctx.lineTo(event.offsetX, event.offsetY);

        // 선 그리기
        ctx.stroke();
    }

}

/* 마우스를 움직이며 선 그리기 - 색 추가 */
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


/* 숙제? 근데 숙제 검사 안 해서 이런걸 원하는건지는 모르겠음 */
/* 1. 클릭할 때마다 선이 그어지는 시작점을 변경하는 코드 만들어보기 */
if(false) {
    
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
/* 2. 클릭할 때마다 색이 달라지는 코드 만들어보기 */
if(false) {

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






///* 2.1 - Mouse Painting */
/* 마우스가 눌려있는 채로 움직일 때부터 손가락을 뗄 때까지 그리기 */

if(false) {
    // moveTo(): 그리지 않으면서 좌표 이동 (0, 0) => (200, 200);
    ctx.moveTo(200, 200);

    // lineTo(): 그리면서 좌표 이동 (200, 200) => (400, 400)
    ctx.lineTo(400, 400);
    ctx.stroke();
}

if(true) {
    // 1. 유저가 canvas 위에서 마우스를 움직일 때마다 moveTo를 호출하기
    // 이유: 유저는 아직 클릭을 하지 않았고, 유저가 움직일 때, ctx를 움직여주어야 하기 때문
    //      클릭하면, 클릭한 곳에서부터 선을 그려야 함
    //      (유저의 마우스가 있는 곳으로 ctx을 움직이고 싶음)
    canvas.addEventListener('mousemove', onMove);

    function onMove(event) {
        // isPainting이 true이면, 유저가 마우스를 움직일 때 그리도록 하기
        if(isPainting) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            // 선을 다 그리면 함수 끝내기
            return;
        }
        
        
        // isPainting이 false면 ctx(붓)을 움직이기만 함
        ctx.moveTo(event.offsetX, event.offsetY);
    }


    // 2. 유저가 마우스를 눌렀는지 알아야 함
    // click은 마우스를 눌렀다가 뗐을 때 발생함
    // mousedown가 마우스를 눌렀을 때 발생함(누른 채로 있는 것)

    // 마우스를 눌렀을 때, 유저가 그리고 싶어하는 걸 그리게 하기
    canvas.addEventListener('mousedown', startPainting);

    // 유저가 그리고 있는지 여부를 나타내는 isPainting의 값을 true로 변경
    function startPainting() {
        isPainting = true;
    }


    // 3. 유저가 마우스를 뗐을 때
    canvas.addEventListener('mouseup', cancelPainting);

    // 유저가 그리고 있는지 여부를 나타내는 isPainting의 값을 false로 변경
    function cancelPainting() {
        isPainting = false;
        ctx.beginPath();
    }


    /* 정리 */
    // 1. 유저가 canvas위에 마우스를 올리면 즉시 마우스가 있는 곳으로 브러쉬를 움직임 (그리지는 않음) 
    //  => ctx.moveTo(event.offsetX, event.offsetY);

    // 2. 유저가 마우스를 누르면 isPainting이 true로 변경 
    //  => canvas.addEventListener('mousedown', startPainting);
    
    // 3. 만약 유저가 마우스를 누른채로 움직인다면, 유저가 있던 곳에서부터 움직이는 곳까지 선을 그림 (현재 isPainting true 상태)
    //  => ctx.lineTo(event.offsetX, event.offsetY);
    //     ctx.stroke();
    
    // 4. 마우스를 떼면 isPainting이 false가 되면서 선을 그리던게 return되고 브러쉬가 움직이기만 함 (현재 isPainting false 상태)
    //  => canvas.addEventListener('mouseup', cancelPainting);
    //     ctx.moveTo(event.offsetX, event.offsetY);

    



    // canvas 안에서 마우스를 누른 상태에서 canvas 밖으로 나갔다가 다시 안으로 되돌아와도 그림을 계속 그림
    //  => 이유: mouseup 이벤트가 실행되지 않았기 떄문 (canvas 밖으로 나갈 때까지 마우스를 누르고 있었기 때문에 onMouseUp함수는 실행되지 않음)
    //          그렇기 때문에 isPainting이 여전히 true임
    //          즉, 안으로 다시 돌아와서 더 이상 클릭을 하지 않아도 선이 그려지는 버그가 있음

    //  => 해결방법
    //  방법 1. canvas.addEventListener를 해주고 마우스가 떠났을 때를 감지하면 onMouseLeave 함수 호출
    //          즉, 유저가 canvas 안에서 벗어나게 되면 더이상 누르고 있지 않다는 걸 의미함
    //              => canvas.addEventListener('mouseleave', cancelPainting);
    //  방법 2. document에 mouseup 이벤트를 줌
    //          즉, 어디에서든지 마우스에서 손을 떼면 isPainting은 false가 됨
    //              => document.addEventListener('mouseup', cancelPainting);


    // 첫번째 방법으로 해결
    canvas.addEventListener('mouseleave', cancelPainting);

}






///* 2.2 - Line Width */
/* canvas 그림판에 선의 굵기를 수정할 수 있는 input 만들기 */
const lineWidth = document.querySelector('#line-width');

// 선의 굵기의 초기값을 5로 준다는 의미
// 초기값 설정은 html 파일에서 했음
ctx.lineWidth = lineWidth.value;

if(true) {
    // 1. html 파일에 input 태그 생성 (선의 굵기)
    //  - 기본값 5, 범위: 1~10, 단계: 0.5(값 설정 안했을 시 디폴트는 1)
    //      => <input id="line-width" type="range" value="5" min="1" max="10" />

    // 2. 선의 굵기를 조절하는 input 태그가 올라가거나 내려가는걸 알아차리는 Listener 생성하기
    lineWidth.addEventListener('change', onLineWidthChange);

    function onLineWidthChange(event) {
        // 모든 line들은 같은 path로 그려지기 때문에 새 경로로 시작해야 함
        // 여기있는 onLineWidthChange() 함수 아니면 cancelPainting() 함수(페인팅을 마치면 새 경로를 생성)에 넣어야함
        // ctx.beginPath();
        ctx.lineWidth = event.target.value;
    }

}




///* 2.3 - Paint Color part One */
/* Line 색 변경하기 */

const color = document.querySelector('#color');

if(true) {
    // 1. html 파일에 input 태그 생성 (색상)
    //      => <input id="color" type="color" />

    // 2. 색상을 선택할 수 있는 input 태그가 알아차리는 Listener 생성하기
    //  input에 EventListener를 추가한 후, 함수와 연결하고 ctx 변경
    color.addEventListener('change', onColorChange);

    // fillColor(), strokeColor() 사용
    // fillColor(): 사각형을 만들면 그 안에 채워주는 색상
    // strokeColor(): 사각형을 만들면 그 사각형의 선의 색상
    function onColorChange(event) {
        // console.log(event.target.value);
        ctx.strokeStyle = event.target.value;
        ctx.fillStyle = event.target.value;
    }    
    
}




// ctrl + shift + L => console.log();
// shift + alt + i



///* 2.4 - Paint Color part Two */
/* 사용자가 색상에 다른 옵션을 줄 수 있도록 하기 */
if(true) {
    // 1. 아래 링크에 있는 모든 색상들을 html파일에 넣기
    // https://flatuicolors.com/palette/defo
    /* 
        #1abc9c
        #3498db
        #34495e
        #27ae60
        #8e44ad
        #f1c40f
        #e74c3c
        #95a5a6
        #d35400
        #bdc3c7
        #2ecc71
        #e67e22
    */
    //  => <div class="color-option" style="background-color: #1abc9c;" data-color="#1abc9c"></div>
    //     <div class="color-option" style="background-color: #3498db;" data-color="#3498db"></div>
    //     <div class="color-option" style="background-color: #34495e;" data-color="#34495e"></div>
    //     <div class="color-option" style="background-color: #27ae60;" data-color="#27ae60"></div>
    //     <div class="color-option" style="background-color: #8e44ad;" data-color="#8e44ad"></div>
    //     <div class="color-option" style="background-color: #f1c40f;" data-color="#f1c40f"></div>
    //     <div class="color-option" style="background-color: #e74c3c;" data-color="#e74c3c"></div>
    //     <div class="color-option" style="background-color: #95a5a6;" data-color="#95a5a6"></div>
    //     <div class="color-option" style="background-color: #d35400;" data-color="#d35400"></div>
    //     <div class="color-option" style="background-color: #bdc3c7;" data-color="#bdc3c7"></div>
    //     <div class="color-option" style="background-color: #2ecc71;" data-color="#2ecc71"></div>
    //     <div class="color-option" style="background-color: #e67e22;" data-color="#e67e22"></div>
    

    // 2. style.css에서 index.html에 넣은 색상들이 보이도록 css 넣기
    //  => width, height 값을 주고, 
    //    cursor를 pointer로 해서 마우스를 가져다댔을때, 마우스 커서를 손가락으로 가리키는 커서로 바꾸기


    // 3. 브라우저에서 보여지는 색상들을 JS에서 접근하기
    //  - Array.from을 이용해서 배열로 생성
    //  - 배열이 아니라면, HTML Collection으로 주기 때문
    const colorOptions = Array.from(document.getElementsByClassName('color-option'));
    // console.log(colorOptions);


    // 4. 각 div에(color마다) EventListener 추가하기
    colorOptions.forEach(color => color.addEventListener('click', onColorClick));
    
    // color를 클릭할 때마다 호출됨
    // data-color를 활용해서 어떤 색상이 클릭되었는지 알아냄
    // data- : html 태그에 원하는 정보(문자열)를 넣을 수 있음 
    //      console.dir()로 확인해보았을 때, dataset에서 그 값을 확인 가능
    function onColorClick1(event) {
        console.dir(event.target.dataset.color);
    }


    // 5. 선택한 색상으로 ctx의 strokeStyle과 fillStyle의 값 바꿔주기
    function onColorClick2(event) {
        ctx.strokeStyle = event.target.dataset.color;
        ctx.fillStyle = event.target.dataset.color;
    }

    // 6. 유저에게 클릭한 색상으로 잘 작동되었다는걸 알려주기 위해 color 박스 안의 색깔을 클리갛 색깔로 바꾸어주기
    function onColorClick(event) {
        const colorValue = event.target.dataset.color; 
        ctx.strokeStyle = colorValue;
        ctx.fillStyle = colorValue;
        color.value = colorValue;
    }

}





///* 2.5 - Filling Mode */
/* 버튼 클릭시 선을 그리는 버튼이 아닌, 색깔을 채워넣을 수 있는 버튼 만들기 */

const modeBtn = document.querySelector('#mode-btn');
let isFilling = false;

if(true) {
    // 1. html 파일에서 color 관련 input 태그와 div 태그들을 한 개의 div 안에 넣어주기

    // 2. 클릭 시 그리기 모드 / 채우기 모드 버튼 생성
    //  => <button id="mode-btn">Fill</button>

    // 3. modeBtn에 이벤트리스너 추가
    //  - 클릭 시 모드를 변경하는 버튼(그리기 모드 / 채우기 모드)
    //  - 그리기 모드: 선 그림
    //  - 채우기 모드: canvas 전체를 채움
    modeBtn.addEventListener('click', onModeClick);

    // 클릭 시 isFilling 변경해주고, 버튼 글자 변경
    function onModeClick() {
        // 버튼 클릭 시 그리기 모드로 변경
        if(isFilling) {
            isFilling = false;
            modeBtn.innerText = 'Fill';

        // 버튼 클릭 시 채우기 모드로 변경
        } else {
            isFilling = true;
            modeBtn.innerText = 'Draw';
        }
    }

    // 4. canvas 채우기
    canvas.addEventListener('click', onCanvasClick);
    
    function onCanvasClick() {
        if(isFilling) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

}





///* 2.6 - Eraser */
/* 그림판을 초기화하는 버튼 만들기 */

const destroyBtn = document.querySelector('#destroy-btn');

if(true) {
    // 1. html 파일에 리셋 버튼 만들기
    //  => <button id="destroy-btn">Destroy</button>

    // 2. destroyBtn 클릭 시 리셋되는 이벤트리스너 생성
    destroyBtn.addEventListener('click', onDestroyClick);

    function onDestroyClick() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


/* 지우기 버튼 만들기 */

const eraserBtn = document.querySelector('#eraser-btn');

if(true) {
    // 1. html 파일에 지우기 버튼 만들기
    //  => <button id="eraser-btn">Eraser</button>

    // 2. eraserBtn 클릭 시 지워지는 이벤트리스너 생성
    eraserBtn.addEventListener('click', onEraserClick);

    function onEraserClick() {
        ctx.strokeStyle = 'white';
        // 채우기 모드일 때 이 버튼을 클릭하면, 그리기 모드로 변경해줌
        isFilling = false;
        modeBtn.innerText = 'Fill';
    }
}






///* 2.7 - Recap */
if(true) {
    // 1. range input 생성
    //  - 숫자 값으로 수정이 가능하고, 이 값의 최소와 최대를 조절해줄 수 있음
    //  - 단계도 설정 가능하며 value의 값은 디폴트 값을 의미
    //      => <input id="line-width" type="range" value="5" min="1" max="10" step="0.5" />
    //      => const lineWidth = document.querySelector('line-width');
    //  - JS보다 HTML element가 먼저 로드되기 때문에, JS가 실행될 때, ctx.lineWidth를 input의 기본값으로 초기화해주어야 함
    //      (lineWidth의 현재 값으로 딱 한번만 실행됨)
    //      => ctx.lineWidth = lineWidth.value;
    
    // 2. range input의 값이 변경될 때마다 ctx의 lineWidth의 값을 변경해주는 함수를 실행시키도록 이벤트리스너 추가
    //  - 변화를 감지해야 하므로 type은 change
    //      => lineWidth.addEventListener('change', onLineWidthChange);

    // 3. color input 생성
    //  - 현재 색상을 보여줌
    //      => <input id="color" type="color" />
    //      => const color = document.querySelector('#color');

    // 4. color input의 값이 변경될 때마다 색을 변경해주는 함수를 실행시키도록 이벤트리스너 추가
    //  - 변화를 감지해야 하므로 type은 change
    //      => color.addEventListener('change', onColorChange);

    // 5. 유저가 리스트 안에서 고를 수 있도록 12가지 색상을 div로 만들고 각각 style에 color를 지정해줌
    //  - 같은 class 이름으로 설정함
    //  - HTMLCollection 요소가 아닌 배열의 값이 필요하기 때문에 Array.form을 이용하여 Collection을 array로 변경
    //  - data-* attribute에 색상 코드를 넣어서 js에서도 접근이 가능하도록 함
    //  - html에서 data-* attribute를 사용하면 원하는 문자열 어떤 값이든 넣어줄 수 있음
    //      => <div class="color-option" style="background-color: #1abc9c;" data-color="#1abc9c"></div>
    //         <div class="color-option" style="background-color: #3498db;" data-color="#3498db"></div>
    //         <div class="color-option" style="background-color: #34495e;" data-color="#34495e"></div>
    //         <div class="color-option" style="background-color: #27ae60;" data-color="#27ae60"></div>
    //         <div class="color-option" style="background-color: #8e44ad;" data-color="#8e44ad"></div>
    //         <div class="color-option" style="background-color: #f1c40f;" data-color="#f1c40f"></div>
    //         <div class="color-option" style="background-color: #e74c3c;" data-color="#e74c3c"></div>
    //         <div class="color-option" style="background-color: #95a5a6;" data-color="#95a5a6"></div>
    //         <div class="color-option" style="background-color: #d35400;" data-color="#d35400"></div>
    //         <div class="color-option" style="background-color: #bdc3c7;" data-color="#bdc3c7"></div>
    //         <div class="color-option" style="background-color: #2ecc71;" data-color="#2ecc71"></div>
    //         <div class="color-option" style="background-color: #e67e22;" data-color="#e67e22"></div>
    //      => const colorOptions = Array.from(document.getElementsByClassName('color-option'));

    // 6. colorOptions 배열에 forEach를 사용해 onColorClick 함수를 가진 클릭 이벤트리스너를 추가함
    //  - 색깔 박스를 클릭 시, data-* attribute에서 color를 가져오도록 함
    //  - data-*에 원하는 데이터를 넣으면 JS에서 event.target.dataset이라는 값을 통해서 사용할 수 있음
    //  - 유저가 색깔을 클릭하면, 선의 색깔, 채우기 색깔, color input값도 바꾸어 줌
    //   (유저에게 클릭한 색깔로 바뀌었다는걸 알려주고 싶기 때문)
    //      => colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

    // 7. mode-btn 버튼 생성
    //  - 클릭 시 그리기모드 / 채우기모드로 변경해주는 버튼
    //      => <button id="mode-btn">Fill</button>
    //      => const modeBtn = document.querySelector('#mode-btn');

    // 8. mode-btn 버튼 클릭시 모드를 변경해주는 이벤트리스너 추가
    //  - fill(채우기 모드) 버튼 클릭 시, 그리기 모드를 멈추고 modeBtn 텍스트를 draw로 변경하여 유저에게 모드가 변경된걸 알려줌
    //   draw(그리기 모드) 버튼 클릭 시, 채우기 모드를 멈추고 modeBtn 텍스트를 Fill로 변경하여 유저에게 모드가 변경된걸 알려줌
    //      => modeBtn.addEventListener('click', onModeClick);

    // 9. 채우기 리스너 추가
    //      => canvas.addEventListener('click', onCanvasClick);
    //  - fillRect()를 이용하여 (x,y) 좌표를 넣고, canvas의 가로와 세로 길이를 넣음
    //  - 다 채워야 하므로 x, y의 좌표는 (0, 0)으로 설정
    //      => ctx.fillRect(0, 0, cavas.width, canvas.height);

    // 10. destroy-btn 버튼 생성
    //  - 클릭 시 그림들 리셋 해주는 버튼
    //      => <button id="destroy-btn">Destroy</button>
    //      => const destroyBtn = document.querySelector('#destroy-btn');
    
    // 11. destroy-btn 버튼 클릭시 초기화해주는 이벤트리스너 추가
    //  - 흰색으로 다 채우면 됨
    //      => destroyBtn.addEventListener('click', onDestroyClick);

    // 12. ereaser-btn 버튼 생성
    //  - 클릭 시 지워주는 버튼
    //      => <button id="eraser-btn">Eraser</button>
    //      => const eraserBtn = document.querySelector('#eraser-btn');

    // 13. ereaser-btn 버튼 클릭시 지워주는 이벤트리스너 추가
    //  - 흰색으로 그려주면 됨
    //  - 이 버튼 클릭 시 채우기모드는 종료됨
    //      => eraserBtn.addEventListener('click', onEraserClick);

}






///* 3.0 - Adding Images */
/* 밈 메이커 기능 만들기 */

const fileInput = document.querySelector('#file');

if(true) {
    /* 밈 메이커 기능 - canvas에 이미지 넣기, 이미지 위에 텍스트 넣기 */
    
    // 1. HTML에 input 추가하기
    //  => <input id="file" type="file" accept="image/*" />


    // 2. file 변경시 실행하는 이벤트리스너 생성
    fileInput.addEventListener('change', onFileChange);

    // 파일을 선택하면 브라우저의 메모리 속에 파일이 있게 되는데, JS를 이용해서 그 파일을 가리키는 URL을 얻기
    function onFileChange1(event) {
        // 파일명
        // console.dir(event.target.files[0].name);

        // 파일을 선택하면 업로드한 파일을 가져옴
        const file = event.target.files[0];
        
        // URL로 파일에 접근하기
        // 브라우저의 메모리에서 파일의 URL을 얻어옴
        // 현실에서는 존재하지 않는 URL이자 브라우저를 위한 URL
        // 브라우저가 자신의 메모리에 있는 파일을 드러내는 방식
        // 해당 URL은 이미지에 접근 가능한 브라우저를 위한 URL임(크롬)
        const url = URL.createObjectURL(file);
        console.log(url);   
        // blob:http://127.0.0.1:5501/471d6af6-128b-4d99-8bcf-363d3c9b3360


        // html의 <img src="" />를 JS로 씀
        const image = new Image();
        // 이미지 src에 브라우저의 메모리를 가리키는 URL 넣기
        image.src = url;
    }


    // 3. image에 이벤트리스너 생성
    function onFileChange(event) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        // blob:http://127.0.0.1:5501/471d6af6-128b-4d99-8bcf-363d3c9b3360

        const image = new Image();
        image.src = url;

        // 아래 코드와 같음
        image.onload = function() {
            // 이미지, 좌표(x, y), 크기(w, h)
            // canvas 크기로 설정
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            
            // 이미지를 다 그리고 나면 file input 비워서 다른 file로 선택할 수 있게 하기
            fileInput.value = null;
        }
        
        /* 
        image.addEventListener('load', onloadFile);
        function onloadFile() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            fileInput.value = null;
        } 
        */
    }

}
