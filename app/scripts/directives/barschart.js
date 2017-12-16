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

           //converting all data passed thru into an array
           console.log(element);
           //element[0] appends to the <bar-chart> tag
           var chart = d3.select(element[0])
           var parentheight = element[0].parentElement.clientHeight;
           var parentwidth = element[0].parentElement.clientWidth;
           console.log(parentheight);
           var svg = chart.append("svg"),
              margin = {top: 20, right: 20, bottom: 30, left: 40},
              //width = +svg.attr("width") - margin.left - margin.right,
              //height = +svg.attr("height") - margin.top - margin.bottom;
              width = parentwidth-margin.left-margin.right,
              height = parentheight-margin.top-margin.bottom;

            svg.style('width', '100%').style('height', '100%');
            var x = d3.scaleBand()
                  .range([0, width]);
            var y = d3.scaleLinear()
                  .range([height, 0]).domain([0, 500]);

            var g = svg.append("g")
              .attr("transform", "translate("+margin.left+","+margin.top+")");

            var x_axis = g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", "translate(0," + height + ")");
            var y_axis = g.append("g").attr("class", "axis axis--y");

            x_axis.call(d3.axisBottom(x));
            y_axis.call(d3.axisLeft(y).ticks(10));

            var bars = g.selectAll(".bar");
            var initialized = false;


            scope.$watch(attrs.data, function(newdata) {
             console.log(newdata);
             if (newdata){
             var data = [];
              Object.keys(newdata).forEach(function(key){
              if (key.length<2){
                data.push({channel : key, signal : +newdata[key]});
              }
              });

              console.log(data);

              x.domain(data.map(function(d) { return d.channel; }));
              y.domain([0, Math.ceil(d3.max(data, function(d) { return d.signal+1; })/200)*200]);
              x_axis.transition().duration(300).call(d3.axisBottom(x));
              y_axis.transition().duration(300).call(d3.axisLeft(y).ticks(4));

              var bars = g.selectAll(".bar").data(data, function(d) { return d.channel;});

              bars.enter().append("rect")
                  .attr("class", "bar")
                  .attr("y", y(0))
                  .attr("height", height - y(0));
              bars.transition().duration(300)
                .attr("x", function(d) {return x(d.channel);})
                .attr("width", x.bandwidth())
                .attr("y", function(d) { return y(d.signal);})
                .attr("height", function(d) { return height - y(d.signal);});

              }
            }, true);
           // var data = scope.$parent.data;
           //
           // chart.append('text').text("Test "+ scope.data.tempC);
           // //in D3, any selection[0] contains the group
           // //selection[0][0] is the DOM node
           // //but we won't need that this time
           //
           // //to our original directive markup bars-chart
           // //we add a div with out chart stling and bind each
           // //data entry to the chart
           //  chart.append("div").attr("class", "chart")
           //   .selectAll('div')
           //   .data(data).enter().append("div")
           //   .style('background-color', 'lightblue')
           //   .style('font-color', 'white')
           //   .style("width", function(d) { return d + "%"; })
           //   .text(function(d) { return d + "%"; });
           // //a little of magic: setting it's width based
           // //on the data value (d)
           // //and text all with a smooth transition
         }
    };
  });
