var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

d3.json("data/rppforcs.json").then(function(data){
	data = data.filter(function(d){
		return d.impactArea == 'Economic and Workforce Development';
	});
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
			.attr('height', 250);
	
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
			.attr('y', 25)
			.attr('width', 120)
			.attr('height', 150)
			.attr('fill', 'transparent')
			.attr('stroke', 'black')
			.attr('stroke-width', '1px, 10px, 1px, 1px');


	rectangles.enter()
			.append('rect')
				.attr('x', function(d, i) {
					return (i * 120);
				})
				.attr('y', 25)
				.attr('width', function(d) {
					if (d.levelOfEvidence == 0) {
						return 120;
					}
					if (d.levelOfEvidence == 1) {
						return 40;
					}
					if (d.levelOfEvidence == 2) {
						return (40 * 2);
					}
					if (d.levelOfEvidence == 3) {
						return (40 * 3);
					}
					
				})
				.attr('height', 150)
				.attr('fill', function(d) {
					if (d.levelOfEvidence == 0) {
						return 'transparent';
					}
					else { return d.color; }

				})
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide);
});

