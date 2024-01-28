'use strict';

const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const gameWinSound = new Audio('./sound/game_win.mp3');

export function playCarrot(){
  playSound(carrotSound);
}
export function playBg(){
  playSound(bgSound);
}
export function playBug(){
  playSound(bugSound);
}
export function playAlert(){
  playSound(alertSound);
}
export function playWin(){
  playSound(gameWinSound);
}

export function stopCarrot(){
  stopSound(carrotSound);
}
export function stopBg(){
  stopSound(bgSound);
}
export function stopBug(){
  stopSound(bugSound);
}
export function stopAlert(){
  stopSound(alertSound);
}
export function stopWin(){
  stopSound(gameWinSound);
}



function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}
