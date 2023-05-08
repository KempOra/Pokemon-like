const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cxt.fillStyle = 'white'
cxt.fillRect(0, 0, canvas.width, canvas.height)