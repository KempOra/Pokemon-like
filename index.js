//creates canvas as constant and gives context (2d or 3d)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//creates canvas size
canvas.width = 1024
canvas.height = 576

//gives canvas a fill colour and internal size for fill
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

//creates containers for map and player
const image = new Image()
image.src = './img/gameMap.png'

const playerImg = new Image()
playerImg.src = './img/char/playerDown.png'

class Sprite { //creates class for sprite
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage (this.image, this.position.x, this.position.y)
    }
}
const background = new Sprite({position: {
    x: 176,
    y: -70
    },
    image: image
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
//creating animate loop
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage (playerImg, 
       
       0,//crop position for Spritesheet
       0,
       playerImg.width / 4,//crop size
       playerImg.height,
       canvas.width / 2 - playerImg.width / 4 / 2, //render location using full size of sprite sheet
       canvas.height / 2 - playerImg.height / 2,
       playerImg.width / 4,
       playerImg.height)
    
    if (keys.w.pressed && lastKey === 'w') background.position.y +=3 
    else if (keys.a.pressed && lastKey === 'a') background.position.x +=3 
    else if (keys.s.pressed && lastKey === 's') background.position.y -=3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -=3
    
}
animate()


let lastKey = ''//lets movent change when multi key press
window.addEventListener('keydown', (e) =>{//event listener for movement key presses
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
window.addEventListener('keyup', (e) =>{
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