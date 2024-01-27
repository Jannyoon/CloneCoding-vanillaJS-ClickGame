'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5; //게임 진행 기간

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect(); //필드의 전체적인 사이즈, 포지션 알 수 있음
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


let started = false;
let score = 0;
let timer = undefined; //clearSetInterval 용

gameBtn.addEventListener('click', ()=>{
  console.log('log');
  if (started){
    stopGame();
  }
  else {
    startGame();
  }
  started = !started;
})

function startGame(){ //게임이 시작되면
  initGame(); // 필드에 사물들 배치 
  showStopButton(); //정지 버튼으로 바뀌어야 함
  showTimerAndScore(); // 타이머와 점수 버튼 다시 보여줌
  startGameTimer();
}

function stopGame(){

}

function showStopButton(){
  const icon = gameBtn.querySelector(".fa-play");
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}


function showTimerAndScore(){
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec); //초기에 타이머에 보여주는 함수

  timer = setInterval(()=>{
    if (remainingTimeSec<=0){
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);

  }, 1000);
}

function updateTimerText(time){
  const minutes = Math.floor(time/60);
  const seconds = time%60;
  gameTimer.innerText=`${minutes}:${seconds}`;
}
function initGame(){
  field.innerHTML = ''; //초기화 작업
  gameScore.innerText = CARROT_COUNT;
  //벌레와 당근을 생성한 뒤 field에 추가해줌
  addItem('carrot', CARROT_COUNT, 'img/carrot.png')
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

//뭐를 추가, 몇 개를 추가, 이미지 경로
function addItem(className, count, imgPath){
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i=0; i<count; i++){
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src',imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max){
  return (Math.random()*(max-min)+min);
}
