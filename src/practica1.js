/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
var estado = "Memory Game";
var tipoCarta = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin","8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.volteadas = 0;
	var array = new Array(16);
	var contador = 0;
	
	this.initGame = function(){
		var j = 0;
		for(var i = 0; i < 16; i++){
			j = randomCarta();
			array[i] = new MemoryGameCard(tipoCarta[j]);
			tipoCarta.splice(j, 1);
		}
		this.loop();
	}

	this.onClick = function(cardId){
		if((array[cardId].estado != 'found')){
			this.volteadas++;	
			array[cardId].flip();

			if(this.volteadas == 2){
				var dosComprobadas = false;
				this.volteadas = 0;
				var i = 0;

				while(dosComprobadas == false && i < array.length){					
					if(i != cardId && array[i].estado == "up"){
						if(array[i].compareTo(array[cardId])){
							dosComprobadas = true;
							array[cardId].found();
							array[i].found();
							estado = "Match Found";
							contador += 2;
							if(contador == 16){
								estado = "You Win!!";
							}	
						}
						else{
							dosComprobadas = true;
							estado = "Try again";
							setTimeout(this.voltear, 1000, cardId, i);
						}
					}
					i++;
				}
				dosComprobadas = false;
				i = 0;
			}
		}
	}

	this.draw = function(){
		gs.drawMessage(estado);
		for(var i = 0; i < array.length; i++){
			array[i].draw(gs, i);
		}
	}

	this.loop = function(){
		setInterval(this.draw, 16);
	}

	this.voltear = function(cardId, i){				
		array[cardId].flip();
		array[i].flip();
	}
};

var randomCarta = function(){
		var indice = 0;
		indice = Math.floor(tipoCarta.length * Math.random());
		return indice;
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */

MemoryGameCard = function(id) {
	this.IDcarta = id;
	this.estado = "down";

	this.returnID = function(){
		return this.IDcarta;
	}

	this.returnState = function(){
		return this.estado;
	}

	this.compareTo = function(otherCard){
		if(this.IDcarta == otherCard.IDcarta){
			return true;
		}
		else
			return false;
	}

	this.flip = function(){
		if(this.estado == "up"){
			this.estado = "down";
		}
		else if(this.estado == "down"){
			this.estado = "up";
		}
	}

	this.setEstado = function(cambio){
		this.estado = cambio;
	}
	this.found = function(){
		this.estado = "found";
	}
	
	this.draw = function(gs, pos){		
		if(this.estado == "down"){
			gs.draw("back", pos);	
		}
		else 
			gs.draw(this.IDcarta, pos);
	}
};
