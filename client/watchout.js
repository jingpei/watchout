// *TO-DO*
// animate the enemies

// global options //

var gameOptions = {
  height: 450,
  width: 700,
  radius: 10,
  nEnemies: 30,
  padding: 20
}

// Player Constructor //
var Player = function(id){
  this.id = 'p' + id;
  this.class = 'player'
  this.fill = "lightgreen";
  this.r = 10;
}

Player.prototype.checkCollisions = function(){
  // compare position of this player to positions of all enemies
  // from http://tinyurl.com/nl7vyxu
  var node = d3.select('#' + this.id);
  var cx = Number(node.attr("cx"));
  var cy = Number(node.attr("cy"));
  var r = Number(node.attr("r"));
  var target;
  var tcx;
  var tcy;
  var tr;
  var xd;
  var yd;
  var wt;


  for(var i = 0; i<enemies.length; i++){
   target = d3.select('#e' + i)
   tcx = Number(target.attr("cx"));
   tcy = Number(target.attr("cy"));
   tr = Number(target.attr("r"));
   
   xd = cx - tcx;
   yd = cy - tcy;
   wt = r + tr;  
    
    if(xd * xd + yd * yd <= wt * wt){
      return true;
    }
  }
};

// Enemy Constructor //

var Enemy = function(id) {
  this.id = 'e' + id;
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

// helper functions //

var makeEntities = function(entity, n) {
  entities = []
  for(var i=0; i<n; i++){
    var e = new entity(i);
    entities.push(e);
  }
  return entities;
}


  // enables dragging of player //
function dragmove(d) {
  //selects the node
  d3.select(this)
      //sets its cx / cy to cursor position or edge of canvas
      .attr("cx", d.x = Math.max(gameOptions.radius, Math.min(gameOptions.width - gameOptions.radius, d3.event.x)))
      .attr("cy", d.y = Math.max(gameOptions.radius, Math.min(gameOptions.height - gameOptions.radius, d3.event.y)));
}

//event handler for dragging
var drag = d3.behavior.drag()
    .on("drag", dragmove);


// build the game //

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
  .attr('id',function(d) { return d.id })
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('fill', function(d){return d.fill})
  .attr('r', function(d){return d.r});

//Make the Player
var player = makeEntities(Player, 1)

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
      })).transition().duration(1500)
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y}) 

}, 1000)

var stats = {
  collisions: 0,
  currentScore : 0,
  highScore : 0 
};


setInterval(function(){ 
    stats.currentScore++;
    d3.selectAll('.current').select('span').text(stats.currentScore + '')
  if(player[0].checkCollisions()){
    stats.collisions++;
    stats.highScore = Math.max(stats.highScore,stats.currentScore);
    stats.currentScore = 0;
    d3.selectAll('.high').select('span').text(stats.highScore + '')
    d3.selectAll('.collisions').select('span').text(stats.collisions + '')
    d3.selectAll('.current').select('span').text(stats.currentScore + '')
  } 
  }, 100);








 














