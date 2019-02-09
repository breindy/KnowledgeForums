var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;

d3.json("data/rppforcs.json").then(function(data){
	console.log(data);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
			.html(function(d) {
				var text = "<p>" + d.rationaleStatement + "</p><br>";
				text += "<p>Level of evidence: " + d.levelOfEvidence + "</p><br>";
				return text;		
			})
	
	var g = d3.select('#agency')
		.append('svg')
			.attr('width', 600)
			.attr('height', 200)
			.attr('fill', '#a08464');
	
	g.call(tip);

	var rectangles = g.selectAll("rect")
		.data(data);

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
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
				.attr('fill', function(d){
					return d.color;
				});

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
				return '#F0C564';
			});

				// g.append("text")
				// 	.attr("x", (100))
				// 	.attr("y", -(160))
				// 	.attr("font-size", "16px")
				// 	.attr("text-anchor", "middle")
				// 	.attr("transform", "rotate(90)")
				// 	.text("AJF")

				// g.append("text")
				// 	.attr("x", (100))
				// 	.attr("y", -(300))
				// 	.attr("font-size", "16px")
				// 	.attr("text-anchor", "middle")
				// 	.attr("transform", "rotate(90)")
				// 	.text("AJF");
	

});

