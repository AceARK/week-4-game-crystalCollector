// Pseudocode


var game = {
	targetScoreValue : 0,
	crystalValues : [],
	alphaValue : 0,
	betaValue : 0,
	gammaValue : 0,
	omegaValue : 0,
	score : 0,

// 1. Generate target score randomly between 19 and 120 (Math.random)

	generateTargetScore : function generateTargetScore() {

		targetScoreValue = Math.floor((Math.random()*101)+19);
		$("#targetScore").html(targetScoreValue);
		console.log(targetScoreValue);
	},

// 2. Generate crystal values randomly between 1 and 12 (Math.random)

	generateCrystalValues :function generateCrystalValues() {
		// 3. Every crystal must have different score (push each value into array, check if generated random is in array, if not, push, else generate new)
		  // create 4 random numbers
		for(i=0; i<4; i++){                 
            var randomNumber = Math.floor((Math.random()*12)+1);
            // if array is not empty, check for same values
            if(this.crystalValues.length == 0){              
              this.crystalValues.push(randomNumber);
            }
            else {
            // if random number is not a part of the array
              if(this.crystalValues.indexOf(randomNumber) == -1){  
              	 // push it to array
                this.crystalValues.push(randomNumber);    
              }
              else {
              	// if not empty, get new random number
                var randomNumber = Math.floor((Math.random()*12)+1); 
              }
            }
          }

      	$('.gem').each(function(){
		   $(this).attr("data-crystalvalue",(crystalValues[]));
		});
      
          

		// this.alphaValue = this.crystalValues[0];
		// this.betaValue = this.crystalValues[1];
		// this.gammaValue = this.crystalValues[2];
		// this.omegaValue = this.crystalValues[3];

		// $("#alpha").attr("data-crystalvalue", this.alphaValue);
		// $("#beta").attr("data-crystalvalue", this.betaValue);
		// $("#gamma").attr("data-crystalvalue", this.gammaValue);
		// $("#omega").attr("data-crystalvalue", this.omegaValue);

		// console.log(this.alphaValue);
		// console.log(this.betaValue);			//// BUG -> crystal values sometimes become undefined.
		// console.log(this.gammaValue);
		// console.log(this.omegaValue);
	},

// 4. On click of crystal, score = score + crystal value. Keep checking after each addition if score > targetscore.

	checkScore : function checkScore() {
		// adding crystalValue to score
		this.score = this.score + ($(".gem").data("crystalvalue"));
		if(this.score == this.targetScoreValue){
			this.wins++;
			$("#wins").html(this.wins);
			this.reset();
		}
		if(this.score > this.targetScoreValue){
			this.losses++;
			$("#losses").html(this.losses);
			this.reset();
		}
		$("#score").html(this.score);
		
	},

// 5. If score > target score, you lose message, losses ++, generate another random target score and crystal values. (call reset())
// 6. If score == target score, you win message, wins++, generate another random target score and crystal values. (call reset())

	reset : function reset() {
		this.crystalValues = [];
		$(".gem").data("crystalValue","");
		this.targetScoreValue = 0;
		$("#targetScore").html("");
		this.score = 0;
		$("#score").html("");
	}

}


$( document ).ready(function() {

	game.generateTargetScore();
	game.generateCrystalValues();
    // console.log(targetScoreValue);
    $(".gem").on("click", function(){
    	game.checkScore();
    });

});
