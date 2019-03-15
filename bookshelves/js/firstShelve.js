var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

d3.json("data/rppforcs.json").then(function(data){
	data = data.filter(function(d){
		return d.levelOfEvidence == 3;
		
	});
	console.log(data);
	// console.log(data.length);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
			.html(function(d) { while (d.levelOfEvidence == 3) {
                    var text = "<p>" + d.resources + "</p><br>";
				    return text;
                }	
			})
	var tag = d3.tip()
	.attr('class', 'd3-tip')
			.html(function(d) {
				var text = "<p>" + d.rationaleStatement + "</p>";
				return text;
			})
	
	var g = d3.select('#firstShelve')
		.append('svg')
			.attr('width', 726)
			.attr('height', 200)
			.attr('fill', 'white');			// .attr('fill', '#a08464');
	
	g.call(tip);
	g.call(tag);

	var rectangles = g.selectAll("rect")
		.data(data.filter(function(d){
			return d.levelOfEvidence === 3;
		}));

	rectangles.enter()
		.append('rect')
			.attr('x', function(d, i) {
				return (i * 120);
			})
			.attr('y', 0)
			.attr('width', 120)
			.attr('height', 150);

	rectangles.enter()
			.append('rect')
				.attr('x', function(d, i) {
					return (i * 120);
				})
				.attr('y', 40)
				.attr('width', 118)
				.attr('height', 110)
				.attr('fill', function(d) {
					return d.color;
				})
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide);


// detail rectangles
	rectangles.enter()
	.append('rect')
		.attr('x', function(d, i) {
			return (i * 120);
		})
		.attr('y', 40)
		.attr('width', 118)
		.attr('height', 110)
		.attr('fill', function(d){
			return '#6AB39D';
	});
});