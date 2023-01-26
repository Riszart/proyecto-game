const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')

let canvasSize
let elementsSize
let enemyPosition = []
let level = 0
let lives = 3 
//let keyArray = true
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

const bomb = new Image
bomb.src = 'img/Bomb_anim0001.png'
const player = new Image
player.src = 'img/player.png'
const gift = new Image
gift.src = 'img/caja-de-regalo.png'
const start = new Image
start.src = 'img/hogar.png'

const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
let timeInterbval
let startTime

function setCanvasSize(){   //se adacta al tamaño de pantalla
    if(window.innerHeight > window.innerWidth){
        canvasSize = Number((window.innerWidth * 0.9).toFixed(0))
    }
    else{
        canvasSize = Number((window.innerHeight * 0.9).toFixed(0))
    } 
    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)
    startGame()
}

function move(event){
  //console.log(event)   // --      ver para entender
    let keyboardPress = event.key
    if(!startTime){
        startTime = Date.now()
        timeInterbval = setInterval(showTime, 100)
    }
    if(/*nameOne == "up" ||*/ keyboardPress == 'ArrowUp'){
        if(playerPosition.y > 0){
            playerPosition.y -= elementsSize
            startGame()
        }
    }
    if(/*nameOne == "down" || */keyboardPress == 'ArrowDown'){
        if(playerPosition.y < canvasSize - elementsSize*1.5){
            playerPosition.y += elementsSize
            startGame()
        }
    }
    if(/*nameOne == "left" || */keyboardPress == 'ArrowLeft'){
        if(playerPosition.x > 0){
            playerPosition.x -= elementsSize
            startGame()
        }
    }
    if(/*nameOne == "right" ||*/ keyboardPress == 'ArrowRight'){
        if(playerPosition.x < canvasSize - elementsSize*1.5){
            playerPosition.x += elementsSize
            startGame()
        }
    }
}

function startGame(){
    const map = maps[level]
    if(!map){
        gameWin()
        return // terminar la funcion para evitar hacer render
    }
    enemyPosition = []
    const mapRows = map.trim().split('\n')
    //  .split('')  divide un string en partes de array ( \n    divide por saltos de linea)
    const mapColumn = mapRows.map(element=>element.trim().split(''))
    // .trim()  limpia el string (elimina los espacios en blanco)
    elementsSize = Number((canvasSize/15).toFixed(0))

    //game.textAlign = "start"
    //game.font =  "50px Arial"
    //game.textBaseline =  "middle"
    //game.fillStyle = 'red'

    game.clearRect(0,0,canvasSize,canvasSize)

    mapColumn.forEach((row,indexRow) => {
        row.forEach((col,indexCol)=>{
            const posY = elementsSize*(indexRow)
            const posX = elementsSize*(indexCol)

            if(col == 'O'){
                game.drawImage(start,posX,posY,elementsSize,elementsSize)
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            }else if(col == 'I'){
                game.drawImage(gift,posX,posY,elementsSize,elementsSize)
                giftPosition.x = posX
                giftPosition.y = posY
            }else if(col == 'X'){
                game.drawImage(bomb,posX,posY,elementsSize,elementsSize)
                //if(keyArray){
                  enemyPosition.push({x: posX, y: posY,})
                //} 
            }
        })
    })
    //keyArray = false
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
    const giftColisionX = playerPosition.x == giftPosition.x
    const giftColisionY = playerPosition.y  == giftPosition.y
    const colision = giftColisionX && giftColisionY

    if(colision){
        levelWin()
    }
    const enemyCollision = enemyPosition.find(enemy=>{
        const enemyCollisionX = enemy.x == playerPosition.x
        const enemyCollisionY = enemy.y == playerPosition.y
        return enemyCollisionX && enemyCollisionY
    })
    if(enemyCollision){
        levelFail()
    }
    game.drawImage(player,playerPosition.x,playerPosition.y,elementsSize,elementsSize)
}
function levelWin(){
    //enemyPosition = []
    //keyArray = true
    level++
    playerPosition.x=undefined
    playerPosition.y=undefined
    startGame()
}
function gameWin(){
/*  localStorage    --  funciona solo en el frontend, guarda una variable en un navegador
    no funciona como un objeto, funcionan con metodos:
    getItem --  leer un valor guardado en el localStorage del navegador (localStorage.getItem('nombre')
    setItem --  guardar en el localStorage del navegador (localStorage.setItem('nombre','valor'))
    removeItem  --  elimina la variable*/
    clearInterval(timeInterbval)
    let recorTime = localStorage.getItem('record_time')
    let playerTime = Date.now() - startTime
    //console.log(playerTime)
    if(recorTime){
        if(recorTime >= playerTime){
            localStorage.setItem('record_time', playerTime)
        }else{
            console.log('ssssssssssssss')
        }
        console.log('ya ganador')
    }else{
        localStorage.setItem('record_time', playerTime)
        console.log('primer ganador')
    }
}
function levelFail(){
    lives--
    if(lives <= 0){
        level = 0
        lives = 3
        startTime = undefined
    }
    playerPosition.x=undefined
    playerPosition.y=undefined
    startGame()
    showlives()  
}
showlives()
//      .join('')   --- une los elementos de un array con lo que establesiste en la comilla
function showlives(){
    const heartArray = Array(lives).fill(emojis['HEART'])
    spanLives.innerHTML = heartArray.join('')
    //spanLives.innerHTML = emojis['HEART'].repeat(lives)
}
//  setTimeout(()=>console.log('hola'),1000)    --  ejecuta la funcion una sola ves despues del tiempo concurrido
//  setInterval(()=>console.log('hola'),1000)    --  ejecuta la funcion cada sierto tiempo definido
//  clearInterval(nombre del interbalo)     --  detiene el tiempo del interbalo nombrado
function showTime(){
    spanTime.innerHTML = Date.now() - startTime
}

