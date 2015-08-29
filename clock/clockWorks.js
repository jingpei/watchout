// make the clock
  //follow the tutorial

var currentTime;

currentTime = function() {
  var currentTime, hour, minute, second, now;
  currentTime = new Date();
  seconds = currentTime.getSeconds();
  minutes = currentTime.getMinutes();
  hour = currentTime.getHours() + minutes / 60

  return data = [
  { unit: 'seconds',
    numeric: seconds
  }, { unit: 'minutes',
    numeric: minutes 
  }, { unit: 'hours',
       numeric: hour 
  }
  
  ];
};

var width, height, offSetX, offSetY, pi, scaleSecs, scaleMins, scaleHours;
width = 400;
height = 200;
offSetX = 150;
offSetY = 100;

pi = Math.PI;
scaleSecs = d3.scale.linear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
scaleMins = d3.scale.linear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
scaleHours = d3.scale.linear().domain([0, 11 + 59/60]).range([0, 2 * pi]);




vis = d3.selectAll(".chart")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

  clockGroup = vis.append("svg:g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");


  clockGroup.append("svg:circle")
  .attr("r", 70).attr("fill", "none")
  .attr("class", "clock outercircle")

  // clockGroup.append("svg:circle")
  // .attr("r", 4)
  // .attr("fill", "black")
  // .attr("class", "clock innercircle");



  var render;

  render = function(data) {
    var hourArc, minuteArc, secondArc

    clockGroup.selectAll(".clockhand").remove();

    secondArc = d3.svg.arc()
      .innerRadius(60)
      .outerRadius(70)
      .startAngle(function (d) {
        return 0; 
        // return scaleSecs(d.numeric);
      })
      .endAngle(function (d) {
        return scaleSecs(d.numeric);
      });

    minuteArc = d3.svg.arc()
      .innerRadius(50)
      .outerRadius(60)
      .startAngle(function(d) {
          return 0;
      })
      .endAngle(function(d) {
        return scaleMins(d.numeric);
      });

    hourArc = d3.svg.arc()
      .innerRadius(40)
      .outerRadius(50)
      .startAngle(function(d) {
        return 0;
      })
      .endAngle(function(d) {
        return scaleHours(d.numeric % 12);
      });

      clockGroup.selectAll('.clockhand')
        .data(data)
        .enter()
        .append('svg:path')
        .transition()
        .duration(1000)
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


  setInterval(function() {
  var data;
  data = currentTime();
  return render(data);
}, 1000);


































// build the timer
  // user input
  // animation