const log = console.log;

class BoothApplyApp {

	constructor(){
		this.canvas = document.querySelector("#map");
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.size = this.width/10;
		this.userColor = randomRGBColor();
		this.beforeX = null;
		this.beforeY = null;
		this.init();
	}

	init(){
		this.ctx.textBaseline = "middle";
		this.ctx.textAlign = 'center';
		this.ctx.font = "12px Arial";
		this.mapLoading();
		this.addEvent();
	}

	addEvent(){
		this.canvas.addEventListener("click",this.canvasClick);
	}

	canvasClick = e =>{

		let x = Math.floor(e.offsetX/this.size);
		let y = Math.floor(e.offsetY/this.size);
		
		if(x == 9){
			alert('선택할 수 없는 위치입니다.');
			return;
		}
		this.mapLoading();
		this.fillRect(x,y,this.userColor);
		this.fillRect(x+1,y,this.userColor);
		this.beforeX = x;
		this.beforeY = y;

		let txt = `(${x+1},${y+1}),(${x+2},${y+1})`;
		document.querySelector("#info_locate").value = txt;
	}

	mapLoading(){
		this.ctx.clearRect(0,0,this.width,this.height);
		for(let y = 0; y < this.width; y++){
			for(let x = 0; x < this.height; x++){
				this.strokeRect(x,y);
			}
		}
	}

	strokeRect(x,y,color = "#a7a7a7"){
		this.ctx.strokeStyle = color;
		this.ctx.strokeRect(x * this.size, y * this.size, this.size,this.size);;
	}

	fillRect(x,y,color = "#a7a7a7"){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * this.size, y * this.size, this.size,this.size);;
	}
}


window.addEventListener("load",()=>{

	let boothApplyApp = new BoothApplyApp();

});

class Booth {
	constructor(lv,name,position,price){
		this.lv = lv;
		this.name = name;
		this.position = position;
		this.price = price;
		this.postList = [];
		for(let i = 0; i <= this.lv; i++){
			let x = this.position.split(",")[0]*1;
			let y = this.position.split(",")[1]*1;
			this.postList.push([x+i,y]);
		}
		this.backColor = randomRGBColor();
		this.fontColor = reversedRGBColor(this.backColor);
	}
}

function randomRGBColor(){
	return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
	// return `rgb(${Math.floor(Math.random()*56+200)},${Math.floor(Math.random()*56+200)},${Math.floor(Math.random()*56+200)})`;
}

function reversedRGBColor(rgb){
	// let colors = rgb.split(",").map(x=> 255 - x.replace(/[^\d+$]/g,"")*1);
	// return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
	return `rgb(0,0,0)`;
}