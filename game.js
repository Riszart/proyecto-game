const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')

let canvasSize
let elementsSize
let enemyPosition = []
let level = 0
let lives = 3 
const playerPosition = {
    x:undefined, 
    y:undefined,
}
const giftPosition = {
    x:undefined,
    y:undefined,
}

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


function move(event){
  //console.log(event)   // --      ver para entender
    let nameTwo = event.key
    let nameOne = event.srcElement.id
    if(nameTwo=='ArrowUp'||nameTwo=='ArrowDown'||nameTwo=='ArrowLeft'||nameTwo=='ArrowRight') nameOne = ""
    if(nameOne == "up" || nameTwo == 'ArrowUp'){
        if(playerPosition.y > elementsSize+15){
            playerPosition.y -= elementsSize
            startGame()
        }
    }
    if(nameOne == "down" || nameTwo == 'ArrowDown'){
        if(playerPosition.y < canvasSize - elementsSize){
            playerPosition.y += elementsSize
            startGame()
        }
    }
    if(nameOne == "left" || nameTwo == 'ArrowLeft'){
        if(playerPosition.x > elementsSize+15){
            playerPosition.x -= elementsSize
            startGame()
        }
    }
    if(nameOne == "right" || nameTwo == 'ArrowRight'){
        if(playerPosition.x < canvasSize - elementsSize){
            playerPosition.x += elementsSize
            startGame()
        }
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
    const map = maps[level]
    const mapRows = map.trim().split('\n')
    //  .split('')  divide un string en partes de array ( \n    divide por saltos de linea)
    const mapColumn = mapRows.map(element=>element.trim().split(''))
    // .trim()  limpia el string (elimina los espacios en blanco)
    if(!map){
        gameWin()
        return // terminar la funcion para evitar hacer render
    }
    elementsSize = (canvasSize/10)-1

    game.textAlign = "end"
    game.font =  elementsSize-5 +"px Arial"

    enemyPosition = []
    game.clearRect(0,0,canvasSize,canvasSize)
    mapColumn.forEach((row,indexRow) => {
        row.forEach((col,indeceCol)=>{
            const emoji = emojis[col]
            const posY = elementsSize*(indexRow+1)
            const posX = elementsSize*(indeceCol+1)
            game.fillText(emoji,posX+15, posY)
            if(col=='O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if(col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            }else if(col == 'X'){
                enemyPosition.push({
                        x: posX,
                        y: posY,
                    })
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
    const giftColisionX = playerPosition.x.toFixed('0') == giftPosition.x.toFixed('0') 
    const giftColisionY = playerPosition.y.toFixed('0')  == giftPosition.y.toFixed('0') 
    const colision = giftColisionX && giftColisionY
    
    if(colision){
        levelWin()
    }
    const enemyCollision = enemyPosition.find(enemy=>{
        const enemyCollisionX = enemy.x.toFixed('3') == playerPosition.x.toFixed('3')
        const enemyCollisionY = enemy.y.toFixed('3') == playerPosition.y.toFixed('3')
        return enemyCollisionX && enemyCollisionY
    })
    if(enemyCollision){
        levelFail()
    }
    game.fillText(emojis['PLAYER'], playerPosition.x+15, playerPosition.y)
}
function levelWin(){
    level++
    startGame()
}
function gameWin(){
    console.log('saaaaaaaaaaaaaaaaaaaaaaaa')
}
function levelFail(){
    lives--
    if(lives <= 0){
        level = 0
        lives = 3
    }
    playerPosition.x=undefined
    playerPosition.y=undefined
    startGame()  
}
