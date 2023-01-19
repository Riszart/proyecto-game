const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
document.addEventListener('keydown', move)

const up = document.querySelector('#up')
const down = document.querySelector('#down')
const left = document.querySelector('#left')
const right = document.querySelector('#right')

right.addEventListener('click', move)
left.addEventListener('click', move)
down.addEventListener('click', move)
up.addEventListener('click', move)

const playerPosition = {
    x:undefined, 
    y:undefined,
}

function move(event){
  //console.log(event)   // --      ver para entender
    let nameTwo = event.key
    let nameOne = event.srcElement.id
    if(nameTwo=='ArrowUp'||nameTwo=='ArrowDown'||nameTwo=='ArrowLeft'||nameTwo=='ArrowRight') nameOne = ""
    if(nameOne == "up" || nameTwo == 'ArrowUp'){
        asss()
        playerPosition.y -= elementsSize
        movePlayer()
    }
    if(nameOne == "down" || nameTwo == 'ArrowDown'){
        asss()
        playerPosition.y += elementsSize
        movePlayer()
    }
    if(nameOne == "left" || nameTwo == 'ArrowLeft'){
        asss()
        playerPosition.x -= elementsSize
        movePlayer()
    }
    if(nameOne == "right" || nameTwo == 'ArrowRight'){
        asss()
        playerPosition.x += elementsSize
        movePlayer()
    }
}

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    }
    else{
        canvasSize = window.innerHeight * 0.8
    } 
    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)
    startGame()
}
function startGame(){
    const mapRows = maps[2].trim().split('\n')
    //  .split('')  divide un string en partes de array ( \n    divide por saltos de linea)
    const mapColumn = mapRows.map(element=>element.trim().split(''))
    // .trim()  limpia el string (elimina los espacios en blanco)

    elementsSize = (canvasSize/10)-1

    game.textAlign = "end"
    game.font =  elementsSize-10 +"px Arial"

    mapColumn.forEach((row,indexRow) => {
        row.forEach((col,indeceCol)=>{
            const emoji = emojis[col]
            const posX = elementsSize*(indexRow+1)
            const posY = elementsSize*(indeceCol+1)
            game.fillText(emoji,posX+15, posY)
            if(col=='O'){
                playerPosition.x = posX
                playerPosition.y = posY
            }
        })
    });
    movePlayer()
    
    /*for(let y = 1; y<=10; y++){
        for(let x = 1; x<=10; x++){
            game.fillText(emojis[mapColumn[y-1][x-1]], elementsSize*x+50, elementsSize*y)
        }
    }*/
    
    //  window.innerHeight  canvas.setAttribute('height',window.innerHeight*(numero)    )
    //  window.innerWidth   canvas.setAttribute('width',window.innerWidth*(numero)  )

    //  .fillstyle = 'color'
    //  .font = 'tamaño, fuente' -- ambos datos son pbligatorios
    //  .textAlign = 'posicionamiento'
    //  .fillRect(x,y,height,width)     dibuja un rectangulo relleno en la posicion x,y (--.fillRect(x, y, width, height);)
    //  .clearRect(x,y,height,width)
    //  .fillText('------',x,y)     dibuja un texto 
}
function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x+15, playerPosition.y)
}
function asss(){
    game.clearRect(playerPosition.x-elementsSize+10, playerPosition.y-elementsSize+12,elementsSize,elementsSize)
}


