// this is the single boundary builder
class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48 //this is the tile size(px) x4 as its zoomed 400%
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Sprite { //creates class for sprite
    constructor({ position, velocity, image, frames = { max:1 } }) {
        this.position = position
        this.image = image
        this.frames = frames
        
        this.image.onload = () => {
        this.width = this.image.width / this.frames.max,
        this.height = this.image.height
        console.log(this.height)
        }
    }

    draw() {
        c.drawImage (
            this.image, 
       
            0,//crop position for Spritesheet
            0,
            this.image.width / this.frames.max,//crop size
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            )
    }
}
