var fps = 60
var timer = 0
var deltaTime = 0
var deltaJunk = {"currentTime": 0, "lastTime": 0, "deltaMilli": 0, "doDelta": false}
var debug = false
var mouse = {"x": 0, "y": 0, "buttonsBinary": "00000000", "buttons": [0, 0, 0], "downed": [false, false, false]}
var keys = [
	{"pressed": false, "code": 38}, 
	{"pressed": false, "code": 40}, 
	{"pressed": false, "code": 37}, 
	{"pressed": false, "code": 39},
	{"pressed": false, "downed": false, "code": 88},
	{"pressed": false, "code": 16}]
var camera = {"x": 0, "y": 0}
var world = {"playerID": 0, "playerMovement": true, "roomSize": [24, 32], "roomOffset": [12, 5], "dialog": false, "dialogInstance": 0, "dialogName": "Shroom", "dialogText": "eat shit and die", "dialogFace": 1}

var bgColour = "#fff"
var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")

console.log(canvas.getBoundingClientRect())

canvas.addEventListener("click", begin)

ctx.imageSmoothingEnabled = false;

var sheets = [
	{"src": "assets/fonts/font.png"}, {"src": "assets/sheets/player.png"}, {"src": "assets/sheets/meiro.png"},
	{"src": "assets/sheets/shroom.png"}, {"src": "assets/tilesets/pipes.png"}, {"src": "assets/sheets/tyro.png"},
	{"src": "assets/sheets/faces.png"}, {"src": "assets/sheets/randomfunnies.png"}, {"src": "assets/tilesets/island.png"}
]

var audio = [
	
]

for(let i=0; i < sheets.length; i++){
	let img = new Image()
	img.src = sheets[i].src
	sheets[i].img = img
}

for(let i=0; i < audio.length; i++){
	let sound = new Audio()
	sound.src = audio[i].src
	sound.loop = audio[i].loop
	audio[i].aud = sound
}

var sprites = [
	{"fps": 6, "originX": 24, "originY": 48, "frames": [{"img": sheets[1].img, "x": 0, "y": 0, "sX": 0, "sY": 0, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 0, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 96, "sY": 0, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 0, "width": 48, "height": 64}]},
	{"fps": 6, "originX": 24, "originY": 48, "frames": [{"img": sheets[1].img, "x": 0, "y": 0, "sX": 0, "sY": 64, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 64, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 96, "sY": 64, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 64, "width": 48, "height": 64}]},
	{"fps": 6, "originX": 24, "originY": 48, "frames": [ {"img": sheets[1].img, "x": 0, "y": 0, "sX": 0, "sY": 128, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 128, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 96, "sY": 128, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 128, "width": 48, "height": 64}]},
	{"fps": 6, "originX": 24, "originY": 48, "frames": [{"img": sheets[1].img, "x": 0, "y": 0, "sX": 0, "sY": 192, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 192, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 96, "sY": 192, "width": 48, "height": 64},
		{"img": sheets[1].img, "x": 0, "y": 0, "sX": 48, "sY": 192, "width": 48, "height": 64}]},
	{"fps": 21, "originX": 50, "originY": 80, "frames": [
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 0, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 100, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 200, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 300, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 400, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 400, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 400, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 400, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 300, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 200, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 100, "sY": 0, "width": 100, "height": 100}, 
		{"img": sheets[2].img, "x": 0, "y": 0, "sX": 0, "sY": 0, "width": 100, "height": 100}]},
	{"fps": 21, "originX": 50, "originY": 80, "frames": [
		{"img": sheets[3].img, "x": 28, "y": 39, "sX": 0, "sY": 0, "width": 38, "height": 57}, 
		{"img": sheets[3].img, "x": 28, "y": 40, "sX": 38, "sY": 0, "width": 38, "height": 56}, 
		{"img": sheets[3].img, "x": 29, "y": 41, "sX": 76, "sY": 0, "width": 36, "height": 55}, 
		{"img": sheets[3].img, "x": 29, "y": 42, "sX": 112, "sY": 0, "width": 36, "height": 54}, 
		{"img": sheets[3].img, "x": 29, "y": 43, "sX": 148, "sY": 0, "width": 36, "height": 53}, 
		{"img": sheets[3].img, "x": 28, "y": 44, "sX": 184, "sY": 0, "width": 38, "height": 52}, 
		{"img": sheets[3].img, "x": 28, "y": 45, "sX": 222, "sY": 0, "width": 38, "height": 51}, 
		{"img": sheets[3].img, "x": 27, "y": 46, "sX": 260, "sY": 0, "width": 40, "height": 50}, 
		{"img": sheets[3].img, "x": 28, "y": 46, "sX": 300, "sY": 0, "width": 39, "height": 50}, 
		{"img": sheets[3].img, "x": 28, "y": 43, "sX": 339, "sY": 0, "width": 38, "height": 53}, 
		{"img": sheets[3].img, "x": 29, "y": 39, "sX": 377, "sY": 0, "width": 36, "height": 57}, 
		{"img": sheets[3].img, "x": 29, "y": 38, "sX": 413, "sY": 0, "width": 36, "height": 58}]},
	{"fps": 16, "originX": 58, "originY": 240, "frames": [
		{"img": sheets[5].img, "x": 0, "y": 0, "sX": 0, "sY": 0, "width": 116, "height": 252}]},
	{"fps": 1, "originX": 48, "originY": 80, "frames": [{"img": sheets[7].img, "x": 0, "y": 0, "sX": 0, "sY": 0, "width": 96, "height": 96}]},
	{"fps": 1, "originX": 57, "originY": 160, "frames": [{"img": sheets[7].img, "x": 0, "y": 0, "sX": 0, "sY": 96, "width": 113, "height": 174}]},
	{"fps": 1, "originX": 50, "originY": 80, "frames": [{"img": sheets[7].img, "x": 11, "y": 27, "sX": 96, "sY": 0, "width": 82, "height": 69}]},
	{"fps": 1, "originX": 57, "originY": 165, "frames": [{"img": sheets[7].img, "x": 0, "y": 0, "sX": 113, "sY": 69, "width": 105, "height": 189}]},
	{"fps": 1, "originX": 56, "originY": 94, "frames": [{"img": sheets[7].img, "x": 39, "y": 18, "sX": 0, "sY": 270, "width": 72, "height": 78}]},
	{"fps": 21, "originX": 50, "originY": 80, "frames": [
		{"img": sheets[3].img, "x": 24, "y": 40, "width": 51, "height": 56, "sX": 0, "sY": 57}, 
		{"img": sheets[3].img, "x": 32, "y": 38, "width": 41, "height": 58, "sX": 51, "sY": 57},
		{"img": sheets[3].img, "x": 32, "y": 38, "width": 42, "height": 58, "sX": 92, "sY": 57},
		{"img": sheets[3].img, "x": 31, "y": 39, "width": 47, "height": 57, "sX": 134, "sY": 57},
		{"img": sheets[3].img, "x": 34, "y": 41, "width": 45, "height": 55, "sX": 181, "sY": 57},
		{"img": sheets[3].img, "x": 34, "y": 40, "width": 42, "height": 56, "sX": 226, "sY": 57},
		{"img": sheets[3].img, "x": 32, "y": 38, "width": 46, "height": 58, "sX": 268, "sY": 57},
		{"img": sheets[3].img, "x": 29, "y": 37, "width": 48, "height": 59, "sX": 314, "sY": 57},
		{"img": sheets[3].img, "x": 25, "y": 40, "width": 51, "height": 56, "sX": 362, "sY": 57},
		{"img": sheets[3].img, "x": 27, "y": 38, "width": 41, "height": 58, "sX": 413, "sY": 57},
		{"img": sheets[3].img, "x": 26, "y": 38, "width": 42, "height": 58, "sX": 454, "sY": 57},
		{"img": sheets[3].img, "x": 22, "y": 39, "width": 47, "height": 57, "sX": 496, "sY": 57},
		{"img": sheets[3].img, "x": 21, "y": 41, "width": 45, "height": 55, "sX": 543, "sY": 57},
		{"img": sheets[3].img, "x": 24, "y": 40, "width": 42, "height": 56, "sX": 588, "sY": 57},
		{"img": sheets[3].img, "x": 22, "y": 38, "width": 46, "height": 58, "sX": 630, "sY": 57},
		{"img": sheets[3].img, "x": 23, "y": 37, "width": 48, "height": 59, "sX": 676, "sY": 57}]}
]

var instances = []
var classes = [
	{"classType": "player", "xVel": 0, "yVel": 0, "acc": 68, "runAcc": 56, "friction": 0.7, "noclip": false, "sprite": 2, "oldSprite": 2, "spriteTimer": 0, "frame": 0},
	{"classType": "deco", "sprite": 4, "spriteTimer": 0, "frame": 0},
	{"classType": "solid"},
	{"classType": "tileset", "tileset": sheets[4].img, "tileWidth": 32, "tileHeight": 32, "tiles": "00000000000000000000000000000000000"},
	{"classType": "npc", "activated": false, "flipped": false, "name": "Shroom", "text": ["Fard"], "face": 1, "idle": 4, "talk": 4, "sprite": 4, "spriteTimer": 0, "frame": 0}
]

var renderOrder = []

function keydown(evt){
	console.log(evt.keyCode)
	for(let i=0; i < keys.length; i++){
		if(evt.keyCode == keys[i].code){
			keys[i].pressed = true
		}
	}
}
function keyup(evt){
	for(let i=0; i < keys.length; i++){
		if(evt.keyCode == keys[i].code){
			keys[i].pressed = false
		}
	}
}

function mousedown(e){
	mouse.x = e.x - canvas.getBoundingClientRect().x
	mouse.y = e.y - canvas.getBoundingClientRect().y
	mouse.buttonsBinary = ("00000000"+e.buttons.toString(2)).slice(-8)
	mouse.buttons[0] = mouse.buttonsBinary[7]
	mouse.buttons[1] = mouse.buttonsBinary[6]
	mouse.buttons[2] = mouse.buttonsBinary[5]
}

window.onload = function(){
	document.addEventListener("keydown", keydown)
	document.addEventListener("keyup", keyup)
	
	document.getElementById("fullscreenButton").addEventListener("click", enterFullscreen)
	
	ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height)
	drawText(sheets[0].img, "Click to", (canvas.width - 96) / 2, canvas.height / 2 - 16, 16, 16, 12, 16, 32)
	drawText(sheets[0].img, "Start Game", (canvas.width - 120) / 2, canvas.height / 2, 16, 16, 12, 16, 32)
}

function begin(){
	canvas.removeEventListener("click", begin)
	
	loadArea("island", 0, 0)
	
	setInterval(gameLoop, (1 / fps) * 1000)
}

function gameLoop(){
	deltaJunk.currentTime = Date.now()
	deltaJunk.deltaMilli = deltaJunk.currentTime - deltaJunk.lastTime
	if(deltaJunk.doDelta){
		deltaTime = deltaJunk.deltaMilli / 1000
	}else{
		deltaJunk.doDelta = true
	}
	
	update()
	draw()
	
	deltaJunk.lastTime = Date.now()
}

function update(){
	timer += deltaTime
	
	updateObjects()
}

function draw(){			
	ctx.fillStyle = bgColour
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	sortInstances()
	drawObjects()
	drawUI()
	
	//if(debug){
		let localfps = 1 / deltaTime
		let fpsCounter = 0
		if(localfps >= 1){
			fpsCounter = Math.floor(localfps)
		}else{
			fpsCounter = Math.floor(localfps * 100) / 100
		}
		drawText(sheets[0].img, "FPS: ".concat(fpsCounter.toString()), 32, 32, 16, 16, 12, 16, 32)
	//}
}

function updateObjects(){
	for(let i=0; i < instances.length; i++){
		if(instances[i].active){
			let item = instances[i]
			switch(item.classType){
				case "player":
					world.playerID = item.index
					item.xVel = (item.xVel + (world.playerMovement * (item.acc + (keys[5].pressed * item.runAcc)) * (keys[3].pressed - keys[2].pressed))) * item.friction
					item.yVel = (item.yVel + (world.playerMovement * (item.acc + (keys[5].pressed * item.runAcc)) * (keys[1].pressed - keys[0].pressed))) * item.friction
					if(Math.abs(item.xVel) >= 0.01)item.x += item.xVel * deltaTime
					if(Math.abs(item.yVel) >= 0.01)item.y += item.yVel * deltaTime
					
					if(world.loop){
						item.x += -Math.floor(item.x / world.loopWidth) * world.loopWidth
						item.y += -Math.floor(item.y / world.loopHeight) * world.loopHeight
					}
					if(!item.noclip){doCollision(item)}
					if(keys[0].pressed || keys[1].pressed || keys[2].pressed || keys[3].pressed){
						//console.log(Math.atan(item.xVel, item.yVel))
						
						//slop unoptimized code to optimize later
						if(world.playerMovement){
							if(keys[0].pressed){
								item.sprite = 0
							}
							if(keys[1].pressed){
								item.sprite = 2
							}
							if(keys[2].pressed){
								item.sprite = 3
							}
							if(keys[3].pressed){
								item.sprite = 1
							}
							doSpriteAnim(item)
						}
					}else{
						item.spriteTimer = 0; item.frame = 1
					}
					
					if(keys[4].pressed){
						if(!keys[4].tapped){
							keys[4].tapped = true
							console.log("fard !!")
							getInteract(item)
					}
					}else{
						keys[4].tapped = false
					}
					
					//camera.x += (item.x - camera.x + (Math.sqrt(Math.abs(item.xVel / 48)) * item.xVel / 48) * 12) / 16
					//camera.y += (item.y - camera.y + (Math.sqrt(Math.abs(item.yVel / 48)) * item.yVel / 48) * 12) / 16
					if(!item.noclip){camera.x = minmax(item.x, -world.roomOffset[0] * 16, (world.roomSize[0] - world.roomOffset[0]) * 16); camera.y = minmax(item.y, -world.roomOffset[1] * 16, (world.roomSize[1] - world.roomOffset[1]) * 16)}else{camera.x = item.x; camera.y = item.y}
					break
				case "deco":
					doSpriteAnim(item)
					break
				case "npc":
					if(!item.activated){
						item.sprite = item.idle
					}
					item.flipped = (instances[world.playerID].x < item.x) 
					doSpriteAnim(item)
					break
			}
		}
	}
}

function drawObjects(){
	for(let i=0; i < renderOrder.length; i++){
		let item = instances[renderOrder[i][0]]
		if(item.visible){
			if(item.classType != "tileset"){
				switch(item.classType){
					case "solid":
						if(debug){ctx.fillStyle = "#f0f"
						ctx.fillRect(Math.floor(item.x - (camera.x - canvas.width/2)), Math.floor(item.y - (camera.y - canvas.height/2)), item.width, item.height - 24)
						ctx.fillStyle = "#808"; ctx.fillRect(Math.floor(item.x - (camera.x - canvas.width/2)), Math.floor(item.y - (camera.y - canvas.height/2)) + item.height - 32, item.width, 32)}
						break
					case "npc":
						ctx.save()
						ctx.translate(item.x - (camera.x - canvas.width/2), item.y - (camera.y - canvas.height/2))
						if(item.flipped)ctx.scale(-1, 1)
						if(between(item.x - (camera.x - canvas.width/2), -(item.width + sprites[item.sprite].originX), canvas.width + item.width + sprites[item.sprite].originX) && between(item.y - (camera.y - canvas.height/2), -(item.height + sprites[item.sprite].originY), canvas.height + item.height + sprites[item.sprite].originY)){
							drawSprite(item.sprite, item.frame, 0, 0, item.width, item.height)
						}
						ctx.restore()
						break
					default:
						//console.log(item.classType)
						if(between(item.x - (camera.x - canvas.width/2), -(item.width + sprites[item.sprite].originX), canvas.width + item.width + sprites[item.sprite].originX) && between(item.y - (camera.y - canvas.height/2), -(item.height + sprites[item.sprite].originY), canvas.height + item.height + sprites[item.sprite].originY)){
							drawSprite(item.sprite, item.frame, item.x - (camera.x - canvas.width/2), item.y - (camera.y - canvas.height/2), item.width, item.height)
						}
						break
				}		
			}else{
				if(between(item.x - (camera.x - canvas.width/2), -(item.width * item.tileWidth), canvas.width + (item.width * item.tileWidth)) && between(item.y - (camera.y - canvas.height/2), -(item.height * item.tileHeight), canvas.height + (item.height * item.tileHeight)))
				drawTiles(item.tileset, item.tiles, item.x - (camera.x - canvas.width/2), item.y - (camera.y - canvas.height/2), item.width, item.height, item.tileWidth, item.tileHeight)
			}
		}
	}
}

function drawSprite(spr, frm, x, y, width, height){
	let sprite = sprites[spr]
	let frame = sprite.frames[frm]
	ctx.drawImage(frame.img, frame.sX, frame.sY, frame.width, frame.height, Math.floor(x + frame.x - sprite.originX), Math.floor(y + frame.y - sprite.originY), frame.width, frame.height)
}

function addObject(classID, x, y, width, height, active, visible){
	let item = JSON.parse(JSON.stringify(classes[classID]))
	item.x = x; item.y = y; item.width = width; item.height = height; item.active = active; item.visible = visible
	item.index = instances.length
	//console.log(item)
	instances.push(item)
}

function drawText(font, string, x, y, width, height, kern, space, wrapLimit){
	for(let i=0; i < string.length; i++){
		ctx.drawImage(font, (string.charCodeAt(i) - 32) * width, 0, width, height, Math.floor(x + (i*kern - Math.floor(i/wrapLimit) * kern * wrapLimit)), Math.floor(y + (Math.floor(i/wrapLimit) * space)), width, height)
	}
}

function between(val, min, max){
	return(val > min && val < max)
}

function minmax(num, min, max){
	let parsed = parseInt(num)
	return Math.min(Math.max(parsed, min), max)
}

function enterFullscreen(){
	if(canvas.webkitRequestFullScreen){
		canvas.webkitRequestFullScreen()
	}else{
		canvas.mozRequestFullScreen()
	}    
}

function doSpriteAnim(item){
	let sprite = sprites[item.sprite]
	if(item.oldSprite != item.sprite){
		item.spriteTimer = 0
	}else{
		item.spriteTimer += deltaTime * sprite.fps
	}
	item.frame = Math.floor(item.spriteTimer - Math.floor(item.spriteTimer / sprite.frames.length) * sprite.frames.length)
	
	item.oldSprite = item.sprite
}

function doCollision(obj){
	for(let i=0; i < instances.length; i++){
		item = instances[i]
		switch(item.classType){
			case "solid":
				if(obj.classType == "player"){
					let distances = [Math.abs(item.x - obj.x - 8), Math.abs(item.y - obj.y + 16), Math.abs(item.x + item.width - obj.x + 8), Math.abs(item.y + item.height - obj.y - 8)]
					let smallest = {"val": 999, "index": 0}
					for(let j=0; j < distances.length; j++){
						if(distances[j] < smallest.val){
							smallest.val = distances[j]
							smallest.index = j
						}
					}
					if(between(obj.y, item.y + 16, item.y + item.height - 8) && between(obj.x, item.x - 8, item.x + item.width + 8)){
						switch(smallest.index){
							case 0:
								obj.x += item.x - obj.x - 8
								obj.xVel = 0
								break
							case 1:
								obj.y += item.y - obj.y + 16
								obj.yVel = 0
								break
							case 2:
								obj.x += item.x + item.width - obj.x + 8
								obj.xVel = 0
								break
							case 3:
								obj.y += item.y + item.height - obj.y - 8
								obj.yVel = 0
								break
						}
					}
				}
				break
			case "npc":
				if(obj.classType == "player"){
					let distances = [Math.abs(item.x - obj.x - 16), Math.abs(item.y - obj.y - 16), Math.abs(item.x + 16 - obj.x), Math.abs(item.y + 16 - obj.y)]
					let smallest = {"val": 999, "index": 0}
					for(let j=0; j < distances.length; j++){
						if(distances[j] < smallest.val){
							smallest.val = distances[j]
							smallest.index = j
						}
					}
					if(between(obj.y, item.y - 16, item.y + 16) && between(obj.x, item.x - 16, item.x + 16)){
						switch(smallest.index){
							case 0:
								obj.x += item.x - obj.x - 16
								obj.xVel = 0
								break
							case 1:
								obj.y += item.y - obj.y - 16
								obj.yVel = 0
								break
							case 2:
								obj.x += item.x + 16 - obj.x
								obj.xVel = 0
								break
							case 3:
								obj.y += item.y + 16 - obj.y
								obj.yVel = 0
								break
						}
					}
				}
				break
		}
	}
}

function drawTiles(tileset, tiles, x, y, width, height, tileWidth, tileHeight){
	if(tiles.length / 2 != width * height){throw new Error("Tile length does not equal the width and height")}
	for(let i=0; i < width * height; i++){
		let tileVal = parseInt(tiles[i*2].concat(tiles[i*2+1]), 16)
		if(tileVal != 0 && (between(x + (i - (Math.floor(i/width) * width)) * tileWidth, -(tileWidth), canvas.width + tileWidth) && between(y + Math.floor((i / width)) * tileHeight, -(tileHeight), canvas.height + tileHeight * 2))){
			let calcX = tileVal - Math.floor(tileVal / 16) * 16
			let calcY = Math.floor(tileVal / 16)
			ctx.drawImage(tileset, //image
			calcX * tileWidth, calcY * tileHeight, //crop pos
			tileWidth, tileHeight, //crop scale
			Math.floor(x + (i - (Math.floor(i/width) * width)) * tileWidth), Math.floor(y + Math.floor((i / width)) * tileHeight), //render pos
			tileWidth, tileHeight) //render size
		}
	}
}

function drawUI(){
	if(world.dialog){
		ctx.globalAlpha = 0.5
		ctx.fillStyle = "#000"
		ctx.fillRect(2, canvas.height - 102, canvas.width - 4, 100)
		ctx.globalAlpha = 1
		ctx.drawImage(sheets[6].img, world.dialogFace * 96, 0, 96, 96, 4, canvas.height - 100, 96, 96)
		drawText(sheets[0].img, world.dialogName, 2, canvas.height - 118, 16, 16, 12, 16, 32)
		drawText(sheets[0].img, world.dialogText, 104, canvas.height - 100, 16, 16, 12, 16, 32)
	}
}

function sortInstances(){
	renderOrder.splice(0, renderOrder.length)
	let listToSort = []
	for(let i=0; i < instances.length; i++){
		let item = [i, 0]
		switch(instances[item[0]].classType){
			case "solid":
				item[1] = instances[i].y + instances[i].height - 10
				break
			case "tileset":
				item[1] = -9999
				break
			default:
				item[1] = instances[i].y
				break
		}
		listToSort.push(item)
	}
	for(let k=0; k < listToSort.length; k++){
		for(let j=0; j < listToSort.length - 1; j++){
			let items = [listToSort[j], listToSort[j + 1]]
			if(items[0][1] > items[1][1]){
				listToSort[j] = items[1]; listToSort[j + 1] = items[0]
			}
		}
	}
	renderOrder = listToSort
}

function getInteract(obj){
	let end = false
	for(let i=0; i < instances.length; i++){
		item = instances[i]
		if(!end){
			switch(item.classType){
				case "npc":
					if(between(obj.y, item.y - 64, item.y + 64) && between(obj.x, item.x - 64, item.x + 64)){
						world.dialog = true
						//world.playerMovement = false
						world.dialogText = item.text[0]
						world.dialogFace = item.face
						world.dialogName = item.name
						end = true
					}
					break
			}
		}
	}
}

function loadArea(map, plrX, plrY){
	instances.splice(0, instances.length)
	switch(map){
		case "island":
			document.title = "Women Island"
			addObject(3, -16 * 32, -10 * 32, 32, 32, true, true)
			instances[instances.length - 1].tileWidth = 32; instances[instances.length - 1].tileHeight = 32; instances[instances.length - 1].tileset = sheets[8].img; instances[instances.length - 1].depthType = 0
			instances[instances.length - 1].tiles = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110304040404040404040404040404040404040404040404040404040404051111131414141414141414141414141414141414141414141414141414141415111113141414141414141414141414141414141414141414141414141414141511111314141435141414141414141414141414141414141414141414141414151111131414141414141414141414141414141414141414141414141414141415111113141414141414141414141414141414141414141414141414141414141511111314141414141414141414141414141414141414141414141414351414151111131414141414141414141414141414141414141414141414141414141415111113141414141414141414141414141414141414141414141414141414141511111314141414141414141414141414141414141414141414141414141414151111131414141414141414141414141414141414141414141414141414141415111113141414141414141414141414141414141414141414141414141414141511111335141414141414141414141414141414141414141414141414141414151111131414141414141414141414141414141414141414141414141414141415111113141414141414141414141414141414141414141414141414141414141511111314141414141414141414141414141414141414141414141414141414151111232424242424242424242424242424242424242424242424242424242425111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
			addObject(3, -160, 48, 12, 10, true, true)
			instances[instances.length - 1].tileWidth = 32; instances[instances.length - 1].tileHeight = 32; instances[instances.length - 1].tileset = sheets[8].img; instances[instances.length - 1].depthType = 1
			instances[instances.length - 1].tiles = "303131313131313131320000401414534141414154453132401414065151515107141442401414420000000040141442401414420000000040141442401435420000000040141442401414420000000040141442401414420000000040141442334141340000000033414134505151520000000050515152"
			addObject(4, 64, 0, 100, 100, true, true)
			instances[instances.length - 1].face = 2, instances[instances.length - 1].name = "Mario", instances[instances.length - 1].text[0] = "mario"
			addObject(4, -64, 0, 100, 100, true, true)
			instances[instances.length - 1].idle = 5, instances[instances.length - 1].talk = 5, instances[instances.length - 1].text[0] = "eat shit and die"
			addObject(4, 360, 96, 100, 100, true, true)
			instances[instances.length - 1].face = 3, instances[instances.length - 1].idle = 8, instances[instances.length - 1].name = "Berra", instances[instances.length - 1].talk = 8, instances[instances.length - 1].text[0] = "what the fuck!!!"
			addObject(4, -360, 96, 100, 100, true, true)
			instances[instances.length - 1].face = 4, instances[instances.length - 1].idle = 10, instances[instances.length - 1].name = "Fenius", instances[instances.length - 1].talk = 10, instances[instances.length - 1].text[0] = "I make the ptm"
			addObject(4, -360, 256, 100, 100, true, true)
			instances[instances.length - 1].face = 5, instances[instances.length - 1].idle = 11, instances[instances.length - 1].name = "Shiny Mega Gardevoir", instances[instances.length - 1].talk = 11, instances[instances.length - 1].text[0] = "gar"
			addObject(1, 1024, 0, 116, 252, true, true)
			instances[instances.length - 1].sprite = 6
			addObject(4, 32, 224, 96, 96, true, true)
			instances[instances.length - 1].face = 6, instances[instances.length - 1].idle = 7, instances[instances.length - 1].name = "Tomat", instances[instances.length - 1].talk = 7, instances[instances.length - 1].text[0] = "gf go brrrr"
			addObject(4, 244, 224, 96, 96, true, true)
			instances[instances.length - 1].face = 8, instances[instances.length - 1].idle = 12, instances[instances.length - 1].name = "Tomato", instances[instances.length - 1].talk = 12, instances[instances.length - 1].text[0] = "For the love of god please help me"
			addObject(1, -96, 2, 100, 100, true, true)
			instances[instances.length - 1].sprite = 9
			addObject(2, -128, 64, 256, 64, true, true)
			addObject(2, -128, 96, 64, 256, true, true)
			addObject(2, 128, 96, 64, 256, true, true)
			addObject(2, -512, -64, 64, 512, true, true)
			addObject(2, 448, -64, 64, 512, true, true)
			addObject(2, 448, -64, 64, 512, true, true)
			addObject(2, -480, -96, 960, 64, true, true)
			addObject(2, -480, 416, 960, 64, true, true)
			break
	}
	addObject(0, plrX, plrY, 48, 64, true, true)
}