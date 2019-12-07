class Matriz{
	constructor (linhas, colunas){
		this.linhas = linhas;
		this.colunas = colunas;

		this.celula = [];

		for (let i = 0; i < linhas ; i++) {
			let arr = [];
			for (let j = 0; j < colunas; j++) { arr.push(0); }
			this.celula.push(arr);
		}
	}


	static arrayParaMatriz(arr){
		let matriz = new Matriz(arr.length, 1);

		matriz.map((elm, i, j)=>{
			return arr[i];
		});
		return matriz;
	}

	static matrizParaArray(obj){
		let arr = [];

		obj.map((elm, i, j)=>{
			arr.push(elm);
		});
		return arr;
	}

	print(){ console.table(this.celula); }

	reandomizar(){
		this.map((elm, i, j)=>{
			return Math.random()*2 - 1;
			//return Math.floor(Math.random()*10);
		});
	}

	static map(A, func){
		let matriz = new Matriz(A.linhas, A.colunas);

		matriz.celula = A.celula.map((arr, i) =>{
			return arr.map((elm, j) =>{ return func(elm, i,j); });			
		});

		return matriz;
	}

	

	map(func){
		this.celula = this.celula.map((arr, i) =>{
			return arr.map((elm, j) =>{ return func(elm, i,j); });			
		});

		return this;
	}


	static escalar_multiplicar(A, escalar){
		var matriz = new Matriz(A.linhas, A.colunas);
		matriz.map((elem, i, j)=>{ return A.celula[i][j] * escalar; });
		return matriz;
	}


	static hadamard(A,B){
		var matriz = new Matriz(A.linhas, A.colunas);
		matriz.map((elem, i, j)=>{ return A.celula[i][j] * B.celula[i][j]; });
		return matriz;
	}


	static add(A,B){
		var matriz = new Matriz(A.linhas, A.colunas);
		matriz.map((elem, i, j)=>{ return A.celula[i][j] + B.celula[i][j]; });
		return matriz;
	}

	static sub(A,B){
		var matriz = new Matriz(A.linhas, A.colunas);
		matriz.map((elem, i, j)=>{ return A.celula[i][j] - B.celula[i][j]; });
		return matriz;
	}

	static multiplicar(A,B){
		var matriz = new Matriz(A.linhas, B.colunas);

		matriz.map((elem, i, j)=>{
			let soma = 0;
			for (let k = 0; k < A.colunas; k++) {
			 	let elm1 = A.celula[i][k];
			 	let elm2 = B.celula[k][j];
			 	soma += elm1*elm2;
			} 
			return soma;
		});
		return matriz;
	}

	static transposta(A){
		var matriz = new Matriz(A.colunas, A.linhas);
		matriz.map((elem, i, j)=>{ return A.celula[j][i]; });
		return matriz;
	}
}