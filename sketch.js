var treino = true;

function setup(){
	createCanvas(500,500);
	background(0);

	n = new RedeNeural(2,3,1);

	dataset = {
		entradas:
			[[1, 1],
			[1, 0],
			[0, 1],
			[0, 0]],
		saidas:
			[[0],
			[1],
			[1],
			[0]]
	}
}

function draw(){
	if (treino){
		for (var i = 0; i < 10000; i++) {
			var index = floor(random(4));
			n.treino(dataset.entradas[index], dataset.saidas[index]);
		}

		if (n.predict([0,0])[0] < 0.04 && n.predict([1,0])[0] > 0.98){
			treino = false;
			console.log("terminou	");
		}
	}
}