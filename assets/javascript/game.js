// Pseudocode

// game object with functions -> generate random target value, generate random crystal values, reset, check score to target value
// 1. Generate random target value
// 2. Generate random crystal values
// 3. Reset all values
// 4. check score to target value

// Game object 
var game = {
	targetValue : 0,
	crystalValues : [],
	score : 0,
	wins : 0,
	losses : 0,
	numberOfCrystals : 4,

	generateRandomTargetValue : function generateRandomTargetValue() {
		this.targetValue = Math.floor(Math.random()*102 + 19);
		$("#targetScore").html(this.targetValue);
		console.log("target value - " + this.targetValue);
	},

	generateRandomCrystalValues : function generateRandomCrystalValues() {
		for(var i=0; i<this.numberOfCrystals; i++){
			var randomNumber = Math.floor(Math.random()*12 + 1);
			while(this.crystalValues.indexOf(randomNumber) != -1){
				var randomNumber = Math.floor(Math.random()*12 + 1);
			}
			this.crystalValues.push(randomNumber);
		}		
	},

	attachValuesToCrystal : function attachValuesToCrystal() {
		// Attaching each crystal with a value from crystalValues
		$('.crystal').each(function(){
		  $(this).data("crystalvalue", game.crystalValues.pop());
		});
	},

	checkScore : function checkScore(crystalValue) {
		this.score = crystalValue + this.score;
		$("#score").html(this.score);
		// If score = targetValue
		if(this.score == this.targetValue) {
			this.wins++;
			$("#wins").html(this.wins);
			this.reset();
		}
		if(this.score > this.targetValue) {
			this.losses++;
			$("#losses").html(this.losses);
			this.reset();
		}
	},

	reset : function reset() {
		this.targetValue = 0;
		this.crystalValues = [];
		this.score = 0; 
		$("#score").html(this.score);
		this.generateRandomTargetValue();
		this.generateRandomCrystalValues();
		this.attachValuesToCrystal();
	}	
};

$(document).ready(function(){

	game.generateRandomTargetValue();

	game.generateRandomCrystalValues();

	// Call function to attach values from crystalValues to each crystal
	game.attachValuesToCrystal();

	$('.crystal').on("click", function(){
		// play sound
		$("#gemClick")[0].currentTime = 0;
    	$("#gemClick")[0].play();
		var value = $(this).data("crystalvalue");
		game.checkScore(value);
	});

});



