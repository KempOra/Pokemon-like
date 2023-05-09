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

//creates containers for map and player
const image = new Image()
image.src = './img/gameMap.png'

const forImg = new Image()
forImg.src = './img/foregroundMap.png'

const playerImg = new Image()
playerImg.src = './img/char/playerDown.png'



const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2, //render location using full size of sprite sheet
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImg,
    frames: {
        max: 4
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


const movables = [background, ...boundaries, foreground]

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

   player.draw()
foreground.draw()
   let moving = true
   player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
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