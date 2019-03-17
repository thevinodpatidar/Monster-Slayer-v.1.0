
new Vue({
    el:'#app',
    data: {  
    name:"Monster",
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
},
    methods: {
        startGame: function(event){
            this.gameIsRunning = true;
            this.name = event.target.value;
            this.playerHealth = 100,
            this.monsterHealth = 100
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits '+this.name+' for ' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10,20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits '+this.name+' hard for ' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <=90){
                this.playerHealth += 10;
            }
            else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(5,12)
            this.playerHealth -= damage;
            
            this.turns.unshift({
                isPlayer: false,
                text: this.name+ ' hits Player for ' + damage
            })
            this.checkWin();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <=0){
                if(confirm('You Won! New Game?')){  
                    this.giveUp();
                    this.gameIsRunning = true;
                }
                else{
                    this.monsterHealth =100;
                    this.playerHealth = 100;
                    this.gameIsRunning = false;
                    this.turns = [];
                }
                return true;
            }
            else if(this.playerHealth <=0){
                if(confirm('You Lost! New Game?')){
                    this.giveUp();
                } 
                else{
                    this.monsterHealth =100;
                    this.playerHealth = 100;
                    this.gameIsRunning = false;
                    this.turns = [];
                }
                return true;
            }
            return false;
        }
    },
});