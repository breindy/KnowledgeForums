var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

d3.json("data/rppforcs.json").then(function(data){
	data = data.filter(function(d){
		return d.impactArea == 'Economic and Workforce Development';
	});
	console.log('economic length');
	console.log(data.length);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
			.html(function(d) {
                while (d.impactArea == "Economic and Workforce Development") {
                    var text = "<p>" + d.rationaleStatement + "</p><br>";
				    text += "<p>Level of evidence: " + d.levelOfEvidence + "</p><br>";
				    return text;
                }	
			})
	
	var g = d3.select('#economic')
		.append('svg')
			.attr('width', data.length * 120)
			.attr('height', 200)
			.attr('fill', '#a08464');
	
	g.call(tip);

	var rectangles = g.selectAll("rect")
		.data(data.filter(function(d){
			return d.impactArea === 'Economic and Workforce Development';
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
				.attr('width', function(d) {
					if (d.levelOfEvidence == 0) {
						return 10;
					}
					if (d.levelOfEvidence == 1) {
						return 40;
					}
					if (d.levelOfEvidence == 2) {
						return (40 * 2);
					}
					if (d.levelOfEvidence == 3) {
						return (40 * 3 - 2);
					}
					
				})
				.attr('height', 110)
				.attr('fill', function(d) {
					return d.color;
				})
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
// detail rectangles
	rectangles.enter()
	.append('rect')
		.attr('x', function(d, i) {
			return (i * 120);
		})
		.attr('y', 40)
		.attr('width', function(d) {
			if (d.levelOfEvidence == 0) {
				return 5;
			}
			if (d.levelOfEvidence == 1) {
				return 20;
			}
			if (d.levelOfEvidence == 2) {
				return (20 * 2);
			}
			if (d.levelOfEvidence == 3) {
				return (20 * 3);
			}
		})
		.attr('height', 110)
		.attr('fill', function(d){
			return '#70C1F3';
	});
				
});

