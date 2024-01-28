'use strict';

//사용자에게 데이터를 보여줄 수 있음
export default class PopUp {
  constructor(){
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    
    this.popUpRefresh.addEventListener('click',()=>{
      this.onClick && this.onClick();
      this.hide();
    })

  } 
  setClickListener(onClick){
    this.onClick = onClick;
  }

  hide(){
    this.popUp.classList.add('pop-up--hide');
  }

  showWithText(text){
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }
  

}