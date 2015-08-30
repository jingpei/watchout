// make the clock
  //follow the tutorial


//Clock Class
  //takes hours, min, secs as input
  // (render) prototype method to append clock to dom using inputs
    //outputs a svg with circle and paths
  //currentTime is a prototype method
  //has own setIntervals to detect when to stop updating

var timers = [];

var Timer = function(hours, minutes, seconds, id){
  this.id = "t"+id;
  this.clockGroup;

  this.startHours = hours;
  this.startMinutes = minutes;
  this.startSeconds = seconds;
  this.remMilliseconds = (hours * 360000) +(minutes * 60000) + (seconds * 1000)
  
  var context = this
  //calcs what we have left
  var seconds = function() { return Math.floor(context.remMilliseconds/60); }
  var minutes = function() { return Math.floor(seconds()/60); }
  var hours = function() { return Math.floor(minutes()/60); }

  this.remHours = function() { return Math.floor(hours()/60)}
  this.remMinutes = function() { return minutes() % 60 }
  this.remSeconds = function() { return seconds() % 60 }
  this.a = function() { return this.remMilliseconds % 1000 }

}

Timer.prototype.countDown = function(){
  if(this.remMilliseconds === 0) { return; }
  this.remMilliseconds--;
  this.update(this.remTime());
  setTimeout(this.countDown.bind(this), 1);
}

Timer.prototype.startTime = function(){
  return data = [
    { unit: 'seconds',
      numeric: this.startSeconds
    }, { unit: 'minutes',
      numeric: this.startMinutes 
    }, { unit: 'hours',
      numeric: this.startHours 
    }
  ]
}

Timer.prototype.remTime = function() {
  return data = [
    { unit: 'seconds',
      numeric: this.remSeconds()
    }, { unit: 'minutes',
      numeric: this.remMinutes() 
    }, { unit: 'hours',
      numeric: this.remHours() 
    }
  ]
}

Timer.prototype.scaleSecs = d3.scale.linear().domain([0,60]).range([0, 2 * Math.PI]);

Timer.prototype.scaleMins = d3.scale.linear().domain([0, 20]).range([0, 2 * Math.PI]);

Timer.prototype.scaleHours = d3.scale.linear().domain([0, 10]).range([0, 2 * Math.PI]);


Timer.prototype.render = function(){
  var width, height, offSetX, offSetY, scaleSecs, scaleMins, scaleHours, div;
  width = 400;
  height = 200;
  offSetX = 150;
  offSetY = 100;

  div = d3.select('body')
    .append("div")
    .attr('id', this.id)
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

  this.clockGroup = div.append("svg:g")
    .attr("transform", "translate(" + offSetX + "," + offSetY + ")");


  this.clockGroup.append("svg:circle")
      .attr("r", 70)
      .attr("class", "clock outercircle");
    
    var secondBack = d3.svg.arc()
        .innerRadius(60)
        .outerRadius(70)
        .startAngle(0)
        .endAngle(2 * Math.PI);
        
    var minuteBack = d3.svg.arc()
        .innerRadius(50)
        .outerRadius(60)
        .startAngle(0)
        .endAngle(2 * Math.PI);

    var hourBack = d3.svg.arc()
        .innerRadius(40)
        .outerRadius(50)
        .startAngle(0)
        .endAngle(2 * Math.PI);

    this.clockGroup.append('svg:path')
      .attr('d', secondBack)
      .attr('class', 'clock secondback');

    this.clockGroup.append('svg:path')
      .attr('d', minuteBack)
      .attr('class', 'clock minuteback');
    
    this.clockGroup.append('svg:path')
      .attr('d', hourBack)
      .attr('class', 'clock hourback');

    this.clockGroup.append('span')
    .attr('class','time')
}

Timer.prototype.update = function(data){
  var hourArc, minuteArc, secondArc
  var context = this

  this.clockGroup.selectAll('#' + this.id).selectAll('.clockhand').remove();
  

  secondArc = d3.svg.arc()
    .innerRadius(60)
    .outerRadius(70)
    .startAngle(function (d) {
      return 0;
      // return scaleSecs(d.numeric);
    })
    .endAngle(function (d) {
      return context.scaleSecs(d.numeric); 
    });

  minuteArc = d3.svg.arc()
    .innerRadius(50)
    .outerRadius(60)
    .startAngle(function(d) {
        return 0;
    })
    .endAngle(function(d) {
      return context.scaleMins(d.numeric);
    });

  hourArc = d3.svg.arc()
    .innerRadius(40)
    .outerRadius(50)
    .startAngle(function(d) {
      return 0;
    })
    .endAngle(function(d) {
      return context.scaleHours(d.numeric);
    });

    this.clockGroup.selectAll('.clockhand')
      .data(data)
      .enter()
      .append('svg:path')
      .attr('d', function(d){
        if(d.unit === "seconds"){
          return secondArc(d);
        } else if(d.unit === "minutes"){
          return minuteArc(d);
        } else if(d.unit === "hours"){
          return hourArc(d);
        }
      })
      .attr('class', function(d){
        if(d.unit === "seconds"){
          return 'clockhand secondhand';
        } else if(d.unit === "minutes"){
          return 'clockhand minutehand';
        } else if(d.unit === "hours"){
          return 'clockhand hourhand';
        }
      });
  }

var timer = new Timer(10,20,30)
timer.render()
timer.update(timer.startTime());
timer.countDown();


// var currentTime;

// currentTime = function() {
//   var currentTime, hour, minute, second, now;
//   currentTime = new Date();
//   seconds = currentTime.getSeconds() + currentTime.getMilliseconds()/1000;
//   minutes = currentTime.getMinutes() + seconds/ 60;
//   hour = currentTime.getHours() + minutes / 60;

//   return data = [
//   { unit: 'seconds',
//     numeric: seconds
//   }, { unit: 'minutes',
//     numeric: minutes 
//   }, { unit: 'hours',
//        numeric: hour 
//   }
  
//   ];
// };



// pi = Math.PI;
// scaleSecs = d3.scale.linear().domain([0,60]).range([0, 2 * pi]);
// scaleMins = d3.scale.linear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
// scaleHours = d3.scale.linear().domain([0, 11 + 59/60]).range([0, 2 * pi]);



// vis = d3.selectAll(".chart")
//   .append("svg:svg")
//   .attr("width", width)
//   .attr("height", height);

//   clockGroup = vis.append("svg:g")
//   .attr("transform", "translate(" + offSetX + "," + offSetY + ")");


//   clockGroup.append("svg:circle")
//     .attr("r", 70)
//     .attr("class", "clock outercircle")
  
  // var secondBack = d3.svg.arc()
  //     .innerRadius(60)
  //     .outerRadius(70)
  //     .startAngle(0)
  //     .endAngle(2 *pi);
      
//   var minuteBack = d3.svg.arc()
//       .innerRadius(50)
//       .outerRadius(60)
//       .startAngle(0)
//       .endAngle(2 *pi);

//   var hourBack = d3.svg.arc()
//       .innerRadius(40)
//       .outerRadius(50)
//       .startAngle(0)
//       .endAngle(2 *pi);



//   clockGroup.append('svg:path')
//     .attr('d', secondBack)
//     .attr('class', 'clock secondback');

//   clockGroup.append('svg:path')
//     .attr('d', minuteBack)
//     .attr('class', 'clock minuteback');
  
//   clockGroup.append('svg:path')
//     .attr('d', hourBack)
//     .attr('class', 'clock hourback');

//   clockGroup.append('span')
//   .attr('class','time')




//   var render;

//   render = function(data) {
//     var hourArc, minuteArc, secondArc

//     clockGroup.selectAll(".clockhand").remove();

//     secondArc = d3.svg.arc()
//       .innerRadius(60)
//       .outerRadius(70)
//       .startAngle(function (d) {
//         return 0; 
//         // return scaleSecs(d.numeric);
//       })
//       .endAngle(function (d) {
//         return scaleSecs(d.numeric);
//       });

//     minuteArc = d3.svg.arc()
//       .innerRadius(50)
//       .outerRadius(60)
//       .startAngle(function(d) {
//           return 0;
//       })
//       .endAngle(function(d) {
//         return scaleMins(d.numeric);
//       });

//     hourArc = d3.svg.arc()
//       .innerRadius(40)
//       .outerRadius(50)
//       .startAngle(function(d) {
//         return 0;
//       })
//       .endAngle(function(d) {
//         return scaleHours(d.numeric % 12);
//       });

//       clockGroup.selectAll('.clockhand')
//         .data(data)
//         .enter()
//         .append('svg:path')
//         .transition()
//         .duration(1000)
//         .attr('d', function(d){
//           if(d.unit === "seconds"){
//             return secondArc(d);
//           } else if(d.unit === "minutes"){
//             return minuteArc(d);
//           } else if(d.unit === "hours"){
//             return hourArc(d);
//           }
//         })
//         .attr('class', function(d){
//           if(d.unit === "seconds"){
//             return 'clockhand secondhand';
//           } else if(d.unit === "minutes"){
//             return 'clockhand minutehand';
//           } else if(d.unit === "hours"){
//             return 'clockhand hourhand';
//           }
//         });


//   }


// //   setInterval(function() {
// //   var data;
// //   data = currentTime();
// //   return render(data);
// // }, 1);


// // static clock for styling
//   var data;
//   data = currentTime();
//   render(data)

























// build the timer
  // user input
  // animation