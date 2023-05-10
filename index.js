//creates canvas as constant and gives context (2d or 3d)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//creates canvas size
canvas.width = 1024
canvas.height = 576

//building an array scan loop to build collision zone
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {// 70 is the length of tiles used in map
collisionsMap.push(collisions.slice(i, 70 + i))
}
const battleMap = []
for (let i = 0; i < battlezones.length; i += 70) {// 70 is the length of tiles used in map
battleMap.push(battlezones.slice(i, 70 + i))
}

const boundaries = []

//offset for total map
const offset = {
    x:176,
    y:-130
}
//
//total boundaries creator
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))

    })
})
const battleZoneTiles = []

battleMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        battleZoneTiles.push(
            new Boundary({
                position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))

    })
})
console.log(battleZoneTiles)
//creates containers for map and player
const image = new Image()
image.src = './img/gameMap.png'

const forImg = new Image()
forImg.src = './img/foregroundMap.png'

const playerDownImg = new Image()
playerDownImg.src = './img/char/playerDown.png'

const playerLeftImg = new Image()
playerLeftImg.src = './img/char/playerLeft.png'

const playerRightImg = new Image()
playerRightImg.src = './img/char/playerRight.png'

const playerUpImg = new Image()
playerUpImg.src = './img/char/playerUp.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2, //render location using full size of sprite sheet
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImg,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImg,
        down: playerDownImg,
        left: playerLeftImg,
        right: playerRightImg,
    }
})
const background = new Sprite({position: {
    x: offset.x,
    y: offset.y
    },
    image: image
})
const foreground = new Sprite({position: {
    x: offset.x,
    y: offset.y
    },
    image: forImg
})
//container to tell if key is pressed
const keys= {
    w: {
        pressed: false
    },a: {
        pressed: false
    },s: {
        pressed: false
    },d: {
        pressed: false
    }
}


const movables = [background, ...boundaries, foreground, ...battleZoneTiles]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return(rectangle1.position.x + rectangle1.width/2 >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width/2 &&
        rectangle1.position.y <= rectangle2.position.y + (rectangle2.height /3) &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
}
//creating animate loop
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    
    boundaries.forEach((Boundary) => {
        Boundary.draw()

        
})
battleZoneTiles.forEach((battleZone) => {
    battleZone.draw()
    
})
   player.draw()
foreground.draw()

if(keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed){
    for (let i = 0; i < battleZoneTiles.length; i++){
        const battleZone = battleZoneTiles[i]
        const overLappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) 
        - Math.max(player.position.x, battleZone.position.x)) 
        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
        - Math.max(player.position.y, battleZone.position.y))
        
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: battleZone
        }) &&
        overLappingArea > (player.width * player.height) / 2 && Math.random() < 0.01
       ){console.log('colliding BZ')
    break
    }


}
}
   let moving = true
   player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const Boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary, position: {
                x: Boundary.position.x,
                y: Boundary.position.y + 3
            }}
            })
           ){console.log('colinding')
           moving = false
        break
        }


    }

        if (moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const Boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary, position: {
                x: Boundary.position.x + 3,
                y: Boundary.position.y 
            }}
            })
           ){console.log('colinding')
           moving = false
        break
        }


    }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x += 3
         })
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const Boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary, position: {
                x: Boundary.position.x,
                y: Boundary.position.y - 3
            }}
            })
           ){console.log('colinding')
           moving = false
        break
        }


    }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const Boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary, position: {
                x: Boundary.position.x - 3,
                y: Boundary.position.y 
            }}
            })
           ){console.log('colinding')
           moving = false
        break
        }


    }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }
    
}
animate()


let lastKey = ''//lets movent change when multi key press
window.addEventListener('keydown', (e) =>{//event listener for movement key press down
switch (e.key){
    case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
    case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
    case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
    case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
})
window.addEventListener('keyup', (e) =>{//event listener for movement key release
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        }
    })