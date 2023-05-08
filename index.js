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
        c.drawImage (this.image, 180, -70)
    }
}
const background = new Sprite({position: {
    x: 180,
    y: -70
    },
    image: image
})

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
}
animate()

//event listener for movement key presses
window.addEventListener('keydown', (e) =>{
switch (e.key){
    case 'w':
        break
    case 'a':
        break
    case 's':
        break
    case 'd':
        break
}
})