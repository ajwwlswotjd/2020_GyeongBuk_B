const log = console.log;

class BoothApp {

	constructor(boothList){
		this.boothList = boothList;
		this.canvas = document.querySelector("#map");
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.size = this.width/10;
		this.init();
	}

	init(){
		this.drawDefault();
	}

	drawDefault(){
		
		for(let y = 0; y < this.width; y+=this.size){
			for(let x = 0; x < this.height; x+=this.size){
				this.drawRect(x,y);
			}		
		}

		this.boothList.forEach(booth=>{
			// let x1 = booth.position.split(",")[0]*40;
			// let x2 = ((booth.position.split(",")[0]*1)+1)*40;
			// let y = booth.position.split(",")[1]*40;
			// this.drawRect(x1,y,"#22b8cf",true);
			// this.drawRect(x2,y,"#22b8cf",true);
		});

		let booth = this.boothList[0];
		let x1 = booth.position.split(",")[0]*40;
			let x2 = ((booth.position.split(",")[0]*1)+1)*40;
			let y = booth.position.split(",")[1]*40;
			this.drawRect(x1,y,"#22b8cf",true);
			this.drawRect(x2,y,"#22b8cf",true);

	}

	drawRect(x,y,color = "#a7a7a7",fill = false){
		if(fill) this.ctx.fillStyle = color;
		else this.ctx.strokeStyle = color;
		if(fill) this.ctx.fillRect(x,y,this.size,this.size);
		else this.ctx.strokeRect(x,y,this.size,this.size);;
	}

}


window.addEventListener("load",()=>{


	fetch('js/booth.json').then(res=> {return res.json()}).then(json=>{
		let boothApp = new BoothApp(json.map(x=>{return new Booth(x.lv,x.name,x.position,x.price)}));
	});
});

class Booth {
	constructor(lv,name,position,price){
		this.lv = lv;
		this.name = name;
		this.position = position;
		this.price = price;
	}
}