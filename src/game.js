'use strict';
//게임 버튼, 게임 타이머
import * as sound from './sound.js';
import Field from './field.js';

//Builder Pattern
export default class GameBuil {
  withGameDuration(duration){
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num){
    this.carrotCount = num;
    return this;
  }
  withBugCount(num){
    this.bugCount = num;
    return this;
  }

  build(){
    return new Game(
      this.gameDuration,
      this.carrotCount, 
      this.bugCount
    ) 
  }
}




class Game{
  constructor(gameDuration, carrotCount, bugCount){
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
  
    this.started = false;
    this.score = 0;
    this.timer = undefined; //clearSetInterval 용this.

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameBtn = document.querySelector('.game__button');    
    this.gameBtn.addEventListener('click', ()=>{
      console.log('log');
      if (this.started){
        this.stop();
      }
      else {
        this.start();
      }
    })

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick)
    
  }

  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;

  }
    
  start(){ //게임이 시작되면
    this.started = true;
    clearInterval(this.timer);
    sound.playBg();
    this.initGame(); // 필드에 사물들 배치 
    this.showStopButton(); //정지 버튼으로 바뀌어야 함
    this.showTimerAndScore(); // 타이머와 점수 버튼 다시 보여줌
    this.startGameTimer();
  }

  stop(){
    this.started = false;
    sound.stopBg();
    this.score === this.carrotCount ? sound.playWin() : sound.playAlert();
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop('cancel');
  }
  

  finish(win){
    this.started = false;
    sound.stopBg();
    win ? sound.playWin() : sound.playAlert();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');    
  }


  onItemClick = (item)=>{
    if (!this.started) return;
    if (item === '.carrot'){
      this.score++;
      this.updateScoreBoard();
      if (this.score===this.carrotCount){
        this.finish(true);
      }
    }
    else if (item === '.bug'){
      this.finish(false);
    }
  }
  
  showStopButton(){
    this.gameBtn.style.visibility = "visible";
    const icon = this.gameBtn.querySelector(".fa-solid");
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  hideGameButton(){
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore(){
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer(){
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec); //초기에 타이머에 보여주는 함수

    this.timer = setInterval(()=>{
      if (remainingTimeSec<=0){
        clearInterval(this.timer);
        this.finish(this.score===this.carrotCount)
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer(){
    clearInterval(this.timer);
  }

  updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    this.gameTimer.innerText=`${minutes}:${seconds}`;
  }
    
  updateScoreBoard(){
    this.gameScore.innerText = this.carrotCount-this.score;
  }

  initGame(){
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.initGame();
    //벌레와 당근을 생성한 뒤 field에 추가해줌
  }


  
  
}