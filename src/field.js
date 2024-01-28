'use strict';
import * as sound from './sound.js'

const CARROT_SIZE = 80;

export default class Field{
  constructor(carrotCount, bugCount){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount; 
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect(); //필드의 전체적인 사이즈, 포지션 알 수 있음
    this.field.addEventListener('click',this.onClick);
  }
  

  initGame(){
    this.field.innerHTML = ''; //초기화 작업
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    this._addItem('carrot', this.carrotCount, './img/carrot.png')
    this._addItem('bug', this.bugCount, './img/bug.png');
  }
  
  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }


  //private Function expression
  _addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i=0; i<count; i++){
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src',imgPath);
      item.style.position = 'absolute';
      const x = this.randomNumber(x1, x2);
      const y = this.randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  
  randomNumber(min, max){
    return (Math.random()*(max-min)+min);
  }


  onClick=(event)=>{
    const target = event.target;
    if (target.matches('.carrot')){
      target.remove(); //타겟 없애야 합니다..
      sound.playCarrot();
      this.onItemClick && this.onItemClick('.carrot'); //나머지 다른 함수 받아와서 처리
    }
    else if (target.matches('.bug')){
      sound.playBug();
      this.onItemClick && this.onItemClick('.bug');
    }

  }
}