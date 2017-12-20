'use strict';

/**
 * @ngdoc directive
 * @name spectrometerApp.directive:barsChart
 * @description
 * # barsChart
 */
angular.module('spectrometerApp')
  .directive('barsChart', function () {
    return {
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
          window.onresize = function() {
             scope.$apply();
            };

           var chart = d3.select(element[0])
           var parentheight = element[0].parentElement.clientHeight;
           var parentwidth = element[0].parentElement.clientWidth;
           var svg = chart.append("svg"),
              margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = parentwidth-margin.left-margin.right,
              height = parentheight-margin.top-margin.bottom;

            svg.style('width', '100%').style('height', '100%');
            var x = d3.scaleLinear()
                  .rangeRound([0, width]);
            var y = d3.scaleLinear()
                  .rangeRound([height, 0]).domain([0, 500]);

            var g = svg.append("g")
              .attr("transform", "translate("+margin.left+","+margin.top+")");

            var x_axis = g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", "translate(0," + height + ")");
            var y_axis = g.append("g").attr("class", "axis axis--y");

            x_axis.call(d3.axisBottom(x));
            y_axis.call(d3.axisLeft(y).ticks(10));

            var valueline = d3.line()
              .x(function(d) { return x(d.channel); })
              .y(function(d) { return y(d.signal); })
              .curve(d3.curveBasis);;


            var bars = g.selectAll(".bar");
            var line = g.append("path")
                              .attr("fill", "none")
                              .attr("stroke", "OrangeRed")
                              .attr("stroke-linejoin", "round")
                              .attr("stroke-linecap", "round")
                              .attr("stroke-width", 1.5);

            var initialized = false;
            var scalestep = 10;

            var olddata = {};
            scope.$watch(attrs.data, function(newdata) {
             if (newdata){
                 var data = [];
                 Object.keys(newdata).forEach(function(key){
                      if (key.length<2){

                        data.push({channel : scope.channels[key], signal : +newdata[key]});
                      }
                  });

                  olddata = newdata;

                  x.domain([d3.min(data, function(d) { return d.channel;})-40,
                            d3.max(data, function(d) { return d.channel;})+40]);
                  y.domain([0, Math.ceil(d3.max(data, function(d) { return d.signal+1; })/scalestep)*scalestep]);
                  x_axis.transition().duration(300).call(d3.axisBottom(x));
                  y_axis.transition().duration(300).call(d3.axisLeft(y).ticks(4));



                  var bars = g.selectAll(".bar").data(data, function(d) { return d.channel;});

                  bars.enter().append("rect")
                      .attr("class", "bar")
                      .attr("y", y(0))
                      .attr("height", height - y(0));
                  bars.transition().duration(300)
                    .attr('opacity', 0.5)
                    .attr("x", function(d) {return x(d.channel-10);})
                    .attr("width", x(680) - x(660))
                    .attr("y", function(d) { return y(d.signal);})
                    .attr("height", function(d) { return height - y(d.signal);});

                  line.datum(data)
                    .transition()
                    .duration(300)
                    .attr("d", valueline(data));
              }
            }, true);
         }
    };
  });
