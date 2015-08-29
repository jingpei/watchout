// start slingin' some d3 here. X
// draw enemies in svg X
// make it so the e move random X
// make a player X
// detect when enemies touches 
// keep track of the users score
// animate the enemies

//svg canvas
//var Player class
  //collision detections
//var Enemies class 
//scoreboard update
//setIntervals for game loop
  //updating positions of players and enemies

var gameOptions = {
  height: 450,
  width: 700,
  radius: 30,
  nEnemies: 30,
  padding: 20
}


var Player = function(id){
  this.id = id;
  this.class = 'player'
  this.fill = "lightgreen";
  this.r = 10;
}

Player.prototype.checkCollisions = function(){
  var enemies = d3.selectAll('.enemies')
  // get x and y using select('#id')
  var node = d3.select('.player');

  var cx = node.attr("cx");
  var cy = node.attr("cy");
  var r = node.attr("r");

  var overlap = function(entity){
    var zone = {}
      zone.top  = entity.attr("cy") + (0.5 * entity.attr('r'));
      zone.bottom  = entity.attr("cy") - (0.5 * entity.attr('r'));
      zone.right = entity.attr("cx") + (0.5 * entity.attr('r'));
      zone.left = entity.attr("cx") - (0.5 * entity.attr('r'));
    
    return zone;
  }

  var dangerZone = {
    top: cx - (0.5 * r),
    bottom: cx + (0.5 * r),
    left: cy - (0.5 * r),
    right: cy + (0.5 * r)
  }

  //loop and check at that time if the x and y's have overlap
  for(var i = 0; i < enemies.length; i++){
    //check enemies cx, cy, r
    zone = overlap(enemies[i]);

  }

  // if collision update scoreboard

}


//declairing functions to enable dragging of player
function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(gameOptions.radius, Math.min(gameOptions.width - gameOptions.radius, d3.event.x)))
      .attr("cy", d.y = Math.max(gameOptions.radius, Math.min(gameOptions.height - gameOptions.radius, d3.event.y)));
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);


var Enemy = function() {
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  this.class = 'enemy'
  this.fill = 'lightblue'
  this.r = 10;
}

Enemy.prototype.updatePosition = function() {
  this.x = this.x //+ //random direction
  this.y = this.y //+ //random direction
}


var Scoreboard = {
  currentScore: 0,
  highScore:0
}


//helper function
var makeEntities = function(entity, n) {
  entities = []
  for(var i=0; i<n; i++){
    var e = new entity();
    entities.push(e);
  }
  return entities;
}



//create the gameboard
var gameBoard = d3.selectAll('body')
    .append('svg')
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height)
    .append("g")
    .selectAll('g');



//Make the enemies
var enemies = makeEntities(Enemy, 20);

//Append the enemies
gameBoard
  .data(enemies)
  .enter()
  .append('circle')
  .attr('class', 'enemies')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('fill', function(d){return d.fill})
  .attr('r', function(d){return d.r});


//Make the Player
var player = [new Player(1)]

//Append the Player
gameBoard
  .data(player)
  .enter()
  .append('svg:circle')
  .attr('class', 'player')
  .attr('id',function(d) { return d.id })
  .attr('cx', 200)
  .attr('cy', 200)
  .attr('fill', function(d) { return d.fill })
  .attr('r', function(d) { return d.r })
  .call(drag);


//Breathing life into our enemies
setInterval(function(){
  d3.selectAll('.enemies')
  .data(
    d3.range(enemies.length).map(function() {
      return { x: Math.random()*gameOptions.width,
               y: Math.random()*gameOptions.height
             }
      })).transition().duration(850)
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y}) 

}, 1000)

//check player position for overlap
setInterval(function(){ player[0].checkCollisions() }, 100);








 














