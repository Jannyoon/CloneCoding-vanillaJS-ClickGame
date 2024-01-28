'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js'

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5; //게임 진행 기간

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined; //clearSetInterval 용


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick)

function onItemClick(item){
  if (!started) return;
  if (item === '.carrot'){
    console.log("당근!");
    console.log(score);
    score++;
    updateScoreBoard();
    if (score===CARROT_COUNT){
      finishGame(true);
    }
  }
  else if (item === '.bug'){
    console.log("벌레!")
    stopGameTimer();
    finishGame(false);
  }

}



gameBtn.addEventListener('click', ()=>{
  console.log('log');
  if (started){
    stopGame();
  }
  else {
    startGame();
  }
})



function startGame(){ //게임이 시작되면
  started = true;
  clearInterval(timer);
  sound.playBg();
  initGame(); // 필드에 사물들 배치 
  showStopButton(); //정지 버튼으로 바뀌어야 함
  showTimerAndScore(); // 타이머와 점수 버튼 다시 보여줌
  startGameTimer();
}

function stopGame(){
  started = false;
  sound.stopBg();
  score === CARROT_COUNT ? sound.playWin() : sound.playAlert();
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('replay');
  
}



function finishGame(win){
  started = false;
  sound.stopBg();
  score === CARROT_COUNT ? sound.playWin() : sound.playAlert();
  hideGameButton();
  gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
  

}

function showStopButton(){
  gameBtn.style.visibility = "visible";
  const icon = gameBtn.querySelector(".fa-solid");
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton(){
  gameBtn.style.visibility = 'hidden';
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
      finishGame(score===CARROT_COUNT)
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer(){
  clearInterval(timer);
}

function updateTimerText(time){
  const minutes = Math.floor(time/60);
  const seconds = time%60;
  gameTimer.innerText=`${minutes}:${seconds}`;
}


function initGame(){
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.initGame();
  //벌레와 당근을 생성한 뒤 field에 추가해줌
}

function updateScoreBoard(){
  gameScore.innerText = CARROT_COUNT-score;
}

