function sigmoid(x) { return 1 / (1 + Math.exp(-x));}

function dsigmoid(x){ return x * (1-x); }

class RedeNeural{
	constructor(e_nodes, o_nodes, s_nodes){
		this.e_nodes = e_nodes; //node de entrada
		this.o_nodes = o_nodes; //node oculta
		this.s_nodes = s_nodes; //node de saída

		this.bias_eo = new Matriz(this.o_nodes, 1);
		this.bias_eo.reandomizar();
		this.bias_os = new Matriz(this.s_nodes, 1);  
		this.bias_os.reandomizar();		

		this.w1_eo = new Matriz(this.o_nodes, this.e_nodes); //1 peso node oculta
		this.w1_eo.reandomizar();

		this.w2_os = new Matriz(this.s_nodes, this.o_nodes); //2 peso node oculta - saída
		this.w2_os.reandomizar();
		
		this.lr = 0.1;
	}

	feedfoward(arr){ }



	treino(arr, target){
		// 		FEEDFOWARD
		// Entrada -> Oculta
		let entrada = Matriz.arrayParaMatriz(arr);
		let oculta = Matriz.multiplicar(this.w1_eo, entrada);

		oculta = Matriz.add(oculta, this.bias_eo);
		oculta.map(sigmoid);

		// Oculta -> Saída
		let saida = Matriz.multiplicar(this.w2_os, oculta);
		saida = Matriz.add(saida, this.bias_os);
		saida.map(sigmoid);
		




		// 		BACKPROPAGATION

		//  Saída -> Oculta
		let resposta = Matriz.arrayParaMatriz(target);
		let erro_saida = Matriz.sub(resposta, saida);
		let d_saida = Matriz.map(saida, dsigmoid);
		let oculta_T = Matriz.transposta(oculta);

		let gradient = Matriz.hadamard(d_saida, erro_saida);
		gradient = Matriz.escalar_multiplicar(gradient, this.lr);

		this.bias_os = Matriz.add(this.bias_os, gradient);

		let w_os_delta = Matriz.multiplicar(gradient, oculta_T);		
		this.w2_os = Matriz.add(this.w2_os, w_os_delta );
		


		//  Oculta -> Entrada
		let w_os_T = Matriz.transposta(this.w2_os );
		let erro_oculto = Matriz.multiplicar(w_os_T, erro_saida);
		let d_oculta = Matriz.map(oculta, dsigmoid);
		let entrada_T = Matriz.transposta(entrada);


		let gradient_O = Matriz.hadamard(erro_oculto, d_oculta);
		gradient_O = Matriz.escalar_multiplicar(gradient_O, this.lr);

		this.bias_eo = Matriz.add(this.bias_eo, gradient_O);

		let w_eo_delta = Matriz.multiplicar(gradient_O, entrada_T);	
		this.w1_eo = Matriz.add(this.w1_eo, w_eo_delta );
		//w_eo_delta.print();
	}

	predict(arr){
		// 		FEEDFOWARD
		// Entrada -> Oculta
		let entrada = Matriz.arrayParaMatriz(arr);
		let oculta = Matriz.multiplicar(this.w1_eo, entrada);

		oculta = Matriz.add(oculta, this.bias_eo);
		oculta.map(sigmoid);

		// Oculta -> Saída
		let saida = Matriz.multiplicar(this.w2_os, oculta);
		saida = Matriz.add(saida, this.bias_os);
		saida.map(sigmoid);
		
		saida = Matriz.matrizParaArray(saida);
		return saida;
		//w_eo_delta.print();
	}
}