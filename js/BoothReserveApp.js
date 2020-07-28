const log = console.log;

class BoothReserveApp {

	constructor(boothList){
		this.boothList = boothList;
		this.canvas = document.querySelector("#map");
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.size = this.width/10;
		this.userColor = randomRGBColor();
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

		let x = Math.floor(e.offsetX/this.size)+1;
		let y = Math.floor(e.offsetY/this.size)+1;
		// log(this.boothList);
		
		let item = null;
		this.boothList.forEach(booth=> {
			let find = booth.postList.find(post=>{
				return post[0] == x && post[1] == y;
			});
			if(find !== undefined) item = booth;
		});
		if(item !== null){
			document.querySelector("#info_name").value = item.name;
			document.querySelector("#info_price").value = item.price.toLocaleString();
		}
	}

	mapLoading(){
		this.ctx.clearRect(0,0,this.width,this.height);
		for(let y = 0; y < this.width; y++){
			for(let x = 0; x < this.height; x++){
				this.strokeRect(x,y);
			}
		}
		this.boothList.forEach(booth=> this.drawBooth(booth));
	}

	strokeRect(x,y,color = "#a7a7a7"){
		this.ctx.strokeStyle = color;
		this.ctx.strokeRect(x * this.size, y * this.size, this.size,this.size);;
	}

	fillRect(x,y,color = "#a7a7a7"){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * this.size, y * this.size, this.size,this.size);;
	}	

	drawBooth(booth){
		let y = booth.position.split(",")[1]-1;
		let posts = booth.postList;
		posts.forEach(post=>{
			let x = post[0]-1;
			let y = post[1]-1;
			this.fillRect(x,y,booth.backColor);
		});

		let firstX = (posts[0][0]-1) * this.size;
		let lastX = (posts[posts.length-1][0]-1) * this.size;
		let center = firstX + ((lastX + this.size) - firstX) / 2;
		this.ctx.fillStyle = booth.fontColor;
		this.ctx.fillText(booth.name,center,y * this.size + this.size/2);
	}
}


window.addEventListener("load",()=>{

	fetch('js/booth.json').then(res=> {return res.json()}).then(json=>{
		let boothReserveApp = new BoothReserveApp(json.map(x=>{return new Booth(x.lv,x.name,x.position,x.price)}));
	});

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
	// return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
	return `rgb(${Math.floor(Math.random()*56+200)},${Math.floor(Math.random()*56+200)},${Math.floor(Math.random()*56+200)})`;
}

function reversedRGBColor(rgb){
	// let colors = rgb.split(",").map(x=> 255 - x.replace(/[^\d+$]/g,"")*1);
	// return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
	return `rgb(0,0,0)`;
}