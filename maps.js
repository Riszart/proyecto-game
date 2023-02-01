const bomb = new Image
bomb.src = 'img/riesgo.png'
const player = new Image
player.src = 'img/player.png'
const gift = new Image
gift.src = 'img/caja-de-regalo.png'
const start = new Image
start.src = 'img/hogar.png'
const explode = new Image
explode.src = 'img/nuclear.png'
const backgroundWin = new Image
backgroundWin.src = 'img/fondo-data.webp' 
const showTimePoint = new Image
showTimePoint.src = 'img/place-background.jpg'
const loadFollow = new Image
loadFollow.src = 'img/continuo.png'

const emojis={
  //'-':' ',
  //'O':'🚪',
  //'X':'✅',
  //'I':'🎁',
  //'PLAYER':'🚴‍♀️', 
  //'BOMB_COLLISION':'🔥',
  //'GAME_OVER':'👎',
  //'WIN':'🏆',
  'HEART':'🧡',
}
const maps=[];
maps.push(`
  IXXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  -XXXXXXXXXXXXXX
  OXXXXXXXXXXXXXX
`)
maps.push(`
  I--XXXXXXXXXXXX
  X--XXXXX-XX-XXX
  XX----XXXX-XXXX
  X--XX----XXXXXX
  X-XXX--XXXX-XXX
  X-XXXX-XXXX-XXX
  X---XX--XXX-XXX
  XX---XX-----XXX
  XXXX---XXXXX-XX
  XXXXX-XXXXXX-XX
  XXXXX-----XX-XX
  XXXXX-XXXXXX-XX
  XXXXX-XX-----XX
  XXXXX-XX-XXX-XX
  XXXO-----XXXXXX
  `)
  maps.push(`
  I-----XXXXX-XXX
  -XXXX-XXXXX-XXX
  XX----XXXX--XXX
  XX-XXXXXXX-XXXX
  XX-----XXX-XXXX
  XXXXXX-X---XXXX
  XX-----X-XXXXXX
  XX-XXXXX-XXXXXX
  XX---------XXXX
  XX-XXXXXXX-XXXX
  XXXXXXXXXX-XXXX
  XXXXXXXXXX-XXXX
  XXXXXXXXX--XXXX
  XXXXXX------XXX
  XXXXXXXXXXX---O
`)