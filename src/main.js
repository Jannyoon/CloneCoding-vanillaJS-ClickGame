'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';
import { Reason } from './game.js';
/*
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5; //게임 진행 기간
*/

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

//const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
gameFinishBanner.setClickListener(()=>{
  game.start();
});


game.setGameStopListener((reason)=>{
  if (reason===Reason.cancel) gameFinishBanner.showWithText('replay');
  else if (reason===Reason.win) gameFinishBanner.showWithText('YOU WON');
  else gameFinishBanner.showWithText('YOU LOST');

});