const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')

window.addEventListener('load', startGame)

function startGame(){
    game.fillRect(0,0,100,100)
    //dibuja un rectangulo relleno en la posicion x,y (--.fillRect(x, y, width, height);)
    
    //dibuja un texto .fillText('Platzi')
    game.clearRect(0,0,50,50)
}