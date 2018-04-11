var screenHeight;
function getScreenHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
function setScreenHeight(){
  screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}
export  { getScreenHeight, setScreenHeight }
