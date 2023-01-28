const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')
const botom = document.querySelector('.bottom')

let canvasSize
let elementsSize
let enemyPosition = []
let level = 0
let lives = 3 
let keyUndefined = true
const playerPosition = {
    x:undefined, 
    y:undefined,
}
const giftPosition = {
    x:undefined,
    y:undefined,
}
let contenLetter
let winMove
let i = 0
let active
let playerTime
let displayButtom = false

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
document.addEventListener('keydown', move)

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
    game.font = elementsSize+"px Arial"
    //game.textBaseline =  "middle"
    game.fillStyle = '#25abe6'
    game.clearRect(0,0,canvasSize,canvasSize)

    mapColumn.forEach((row,indexRow) => {
        row.forEach((col,indexCol)=>{
            const posY = elementsSize*(indexRow)
            const posX = elementsSize*(indexCol)
            if(col == 'O'){
                game.drawImage(start,posX,posY,elementsSize,elementsSize)
                if(!playerPosition.x && !playerPosition.y && keyUndefined){
                    playerPosition.x = posX
                    playerPosition.y = posY
                    keyUndefined = false
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
        game.clearRect(playerPosition.x,playerPosition.y,elementsSize,elementsSize)
        game.drawImage(explode,playerPosition.x,playerPosition.y,elementsSize,elementsSize)
        game.drawImage(player,playerPosition.x+elementsSize/4,playerPosition.y+elementsSize/4,elementsSize/2,elementsSize/2)
        levelFail()
    }
    game.drawImage(player,playerPosition.x,playerPosition.y,elementsSize,elementsSize)
}
function levelWin(){
    //enemyPosition = []
    //keyArray = true
    level++
    keyUndefined = true
    playerPosition.x=undefined
    playerPosition.y=undefined
    startGame()
}

function gameWin(){
    displayButtom = true
    /*  
    localStorage    --  funciona solo en el frontend, guarda una variable en un navegador
    no funciona como un objeto, funcionan con metodos:
    getItem --  leer un valor guardado en el localStorage del navegador (localStorage.getItem('nombre')
    setItem --  guardar en el localStorage del navegador (localStorage.setItem('nombre','valor'))
    removeItem('')  --  elimina la variable
    */
    //game.clearRect(0,0,canvasSize,canvasSize)
    clearInterval(timeInterbval)
    let recorTime = localStorage.getItem('record_time')
    if(recorTime){
        active = false
        if(recorTime >= playerTime){
            localStorage.setItem('record_time', playerTime)
            contenLetter = 'NEW RECORD'
            winMove = setInterval(animationWin,100)
        }else{
            contenLetter = '- GAME WIM -'
            winMove = setInterval(animationWin,100)
        }
    }else{
        contenLetter = 'PRIMER JUGADOR'
        winMove = setInterval(animationWin,100)
        localStorage.setItem('record_time', playerTime)
    }
}

function animationWin(){
    if(i <= 14 && active == false){
        i++
        game.clearRect(0,canvasSize-elementsSize*i,canvasSize,canvasSize/3+elementsSize*i)
    }else{
        active = true
        i--
        game.clearRect(0,0,canvasSize,canvasSize)
        if(i == 10){
            clearInterval(winMove)
       }
    }
    let positionRect = canvasSize-elementsSize*i
    let sizeHeightRect = canvasSize/2.5
    let sizeImgLetter = elementsSize*0.7
    game.drawImage(backgroundWin,0,canvasSize-elementsSize*i,canvasSize,sizeHeightRect)
    game.fillText('CONGRATULATIONS',canvasSize*0.17,(positionRect)+canvasSize/6,canvasSize,sizeHeightRect+elementsSize*i)
    game.fillText(contenLetter,canvasSize*0.27,(positionRect)+canvasSize/3.8,canvasSize,sizeHeightRect+elementsSize*i)
    game.drawImage(showTimePoint,canvasSize*0.32,(positionRect)+canvasSize/2.2,elementsSize*5,elementsSize*2)
    game.fillText(playerTime,canvasSize*0.40,(positionRect)+canvasSize/1.85,canvasSize,sizeHeightRect+elementsSize*i)
    /*
    game.drawImage(letterF,canvasSize*0.28+sizeImgLetter*1,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.drawImage(letterO,canvasSize*0.28+sizeImgLetter*2,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.drawImage(letterL,canvasSize*0.28+sizeImgLetter*3,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.drawImage(letterL,canvasSize*0.28+sizeImgLetter*4,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.drawImage(letterO,canvasSize*0.28+sizeImgLetter*5,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.drawImage(letterW,canvasSize*0.28+sizeImgLetter*6,(positionRect)+canvasSize/3.3,sizeImgLetter,sizeImgLetter)
    game.clearRect(canvasSize*0.28+sizeImgLetter*7.65,(positionRect)+canvasSize/3.4,elementsSize,elementsSize)
    */
    game.drawImage(loadFollow,canvasSize*0.28+sizeImgLetter*7.65,(positionRect)+canvasSize/3.4,elementsSize,elementsSize)
    botom.addEventListener('click', followGame)

    if(displayButtom == true){
        setTimeout(()=>{botom.style.display = "block"},2000)
        displayButtom = false
    }
}
function followGame(event){
    
    //let clickX = event.offsetX
    //let clickY = event.offsetY
    //console.log(event)
    //if( 456 < clickX && clickX < 513 && 452 < clickY && clickY < 483 ){
        level = 0
        lives = 3
        startTime = undefined
        keyUndefined = true
        playerPosition.x=undefined
        playerPosition.y=undefined
        backInicio = setInterval(animationWin,100)
        setTimeout(()=>{location.reload()},2000)
        botom.style.display = "none"
        botom.style.height = "500px"
        
    //}
}

function levelFail(){
    lives--
    if(lives <= 0){
        level = 0
        lives = 3
        startTime = undefined
        setTimeout(()=>{location.reload()},300)
    }
    keyUndefined = true
    playerPosition.x=undefined
    playerPosition.y=undefined
    setTimeout(startGame,500)
    showlives()  
}
showlives()
//      .join('')   --- une los elementos de un array con lo que establesiste en la comilla
function showlives(){
    const heartArray = Array(lives).fill(emojis['HEART'])
    spanLives.innerHTML = heartArray.join('')
    //spanLives.innerHTML = emojis['HEART'].repeat(lives)
}
function showTime(){
    playerTime = Date.now() - startTime
    spanTime.innerHTML = playerTime
    
    //  setTimeout(()=>console.log('hola'),1000)    --  ejecuta la funcion una sola ves despues del tiempo concurrido
    //  setInterval(()=>console.log('hola'),1000)    --  ejecuta la funcion cada sierto tiempo definido
    //  clearInterval(nombre del interbalo)     --  detiene el tiempo del interbalo nombrado
}

