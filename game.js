const canvas = document.querySelector('#game')
const game =  canvas.getContext('2d')
const botom = document.querySelector('.bottom')
const contentInicio = document.querySelector('.inicio')
const dataPalyer = document.querySelector('.win__player')
const sendDataWin = document.querySelector('.content-send__data-win')
const botomInicio = document.querySelector('.inicio__botom')
const botomSendDataWin = document.querySelector('.send-data__localStorage')
const inicioContent = document.querySelector('.inicio__content-text')


const firstPlace = document.querySelector('.first__place')
const secondPlace = document.querySelector('.second__place')
const thirdPlace = document.querySelector('.third__place')
let namePlayerNow
botomInicio.addEventListener('click', ()=>{
    contentInicio.classList.add('inactive')
})

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

showlives()
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
    if(keyboardPress == 'ArrowUp'){
        if(playerPosition.y > 0){
            playerPosition.y -= elementsSize
            startGame()
        }
    }
    if(keyboardPress == 'ArrowDown'){
        if(playerPosition.y < canvasSize - elementsSize*1.5){
            playerPosition.y += elementsSize
            startGame()
        }
    }
    if(keyboardPress == 'ArrowLeft'){
        if(playerPosition.x > 0){
            playerPosition.x -= elementsSize
            startGame()
        }
    }
    if(keyboardPress == 'ArrowRight'){
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
    game.font = elementsSize+"px 'Space Mono'"
    //game.textBaseline =  "middle"
    game.fillStyle = 'rgb(40, 231, 126)'
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
                  enemyPosition.push({x: posX, y: posY,})
            }
        })
    })
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
    level++
    keyUndefined = true
    playerPosition.x=undefined
    playerPosition.y=undefined
    startGame()
}

function gameWin(){
    clearInterval(timeInterbval)
    active = false
    winMove = setInterval(animationWin,100)
    displayButtom = true
    /*  
    localStorage    --  funciona solo en el frontend, guarda una variable en un navegador
    no funciona como un objeto, funcionan con metodos:
    getItem --  leer un valor guardado en el localStorage del navegador (localStorage.getItem('nombre')
    setItem --  guardar en el localStorage del navegador (localStorage.setItem('nombre','valor'))
    removeItem('')  --  elimina la variable
    */
    let referencia = JSON.parse(localStorage.getItem('thirdPlayer'))
    if(localStorage.firstPlayer ){
        if(referencia.point >= playerTime){contenLetter = 'TOP THREE'}
        else if(referencia.point==null){contenLetter = 'TOP THREE'}
        else{contenLetter = '-GAME WIM-'
        botomSendDataWin.classList.add('inactive')}
    }else{contenLetter = '-1° PLAYER-'}
    botomSendDataWin.addEventListener('click',sendDataWinPlayers)
    botom.addEventListener('click', followGame)
    if(displayButtom == true){
        setTimeout(()=>{
            botom.style.display = "block"
            sendDataWin.classList.remove('inactive')},2000)
        displayButtom = false
    }
}
function sendDataWinPlayers(){
    if(dataPalyer.value == ""){
        console.log("ingrese un nombre")
    }else{
        botomSendDataWin.classList.add('inactive')
        addDataWinTable()
        inicioContent.classList.add('active')
    }
}
function addDataWinTable(){
    let referencia = JSON.parse(localStorage.getItem('thirdPlayer'))
    /* de esta manera se lee una objeto en el local store */
    if(localStorage.firstPlayer ){
        if(referencia.point >= playerTime){firstSecondThirt()}
        else if(referencia.point==null){firstSecondThirt()}
    }else{
        localStorage.setItem('firstPlayer', JSON.stringify({name:dataPalyer.value,point:playerTime}))
        localStorage.setItem('secondPlayer', JSON.stringify({name:null,point:null}))
        localStorage.setItem('thirdPlayer', JSON.stringify({name:null,point:null}))
    }
    dataPalyer.value = ''
    tableShowPlace()
}
tableShowPlace()
function tableShowPlace(){
    let first = JSON.parse(localStorage.getItem('firstPlayer'))
    let second = JSON.parse(localStorage.getItem('secondPlayer'))
    let third = JSON.parse(localStorage.getItem('thirdPlayer'))
    firstPlace.innerText = first.point + ' -- ' + first.name
    secondPlace.innerText = second.point + ' -- ' + second.name
    thirdPlace.innerText = third.point + ' -- ' + third.name
}

function firstSecondThirt(){
    const arraysLocalStorage = []
    arraysLocalStorage.push({name:dataPalyer.value,point:playerTime})
    arraysLocalStorage.push(JSON.parse(localStorage.getItem('firstPlayer')))
    arraysLocalStorage.push(JSON.parse(localStorage.getItem('secondPlayer')))
    arraysLocalStorage.push(JSON.parse(localStorage.getItem('thirdPlayer')))
    arraysLocalStorage.sort((a,b)=>a.point - b.point)
    if(arraysLocalStorage[0].point==null){
        arraysLocalStorage.shift()
        if(arraysLocalStorage[0].point==null){
            arraysLocalStorage.shift()
            arraysLocalStorage.push({name:null,point:null})
        }
    }
    localStorage.setItem('firstPlayer', JSON.stringify(arraysLocalStorage[0]))
    localStorage.setItem('secondPlayer', JSON.stringify(arraysLocalStorage[1]))
    localStorage.setItem('thirdPlayer', JSON.stringify(arraysLocalStorage[2]))
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
        }else if(i == 0){
            clearInterval(winMove)
            startGame()
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
    game.drawImage(loadFollow,canvasSize*0.28+sizeImgLetter*7.65,(positionRect)+canvasSize/3.4,elementsSize,elementsSize)
}
function followGame(event){
    inicioContent.classList.remove('active')
    level = 0
    lives = 3
    startTime = undefined
    keyUndefined = true
    playerPosition.x=undefined
    playerPosition.y=undefined
    botom.style.display = "none"
    sendDataWin.classList.add('inactive')
    botomSendDataWin.classList.remove('inactive')
    winMove = setInterval(animationWin,100)
}

function levelFail(){
    lives--
    if(lives <= 0){
        level = 0
        lives = 3
        startTime = undefined
        clearInterval(timeInterbval)
        setTimeout(setCanvasSize,300)
    }
    keyUndefined = true
    playerPosition.x=undefined
    playerPosition.y=undefined
    setTimeout(startGame,500)
     showlives()  
}

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

