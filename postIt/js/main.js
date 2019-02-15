var margin = { left: 80, right: 10, top: 50, bottom: 100};

var width = 1010 - margin.left - margin.right;
var height = 705 - margin.top - margin.bottom;

var start_end_colors = ["#E5ECFF", "#CCD8FF", "#B3C5FF", "#809EFF", "#4D77FF"];

d3.json("data/stickynotes.json").then(function(data){
	console.log(data);

			var tip = d3.tip()
				.attr('class', 'd3-tip')
				.offset([-10, 0])
				.html(function(d) {
					d3.select(".d3-tip")
						.style('background-color', d.color)
						.style('color', 'white')
						.style('text-align', 'left')
						.style('max-width', '450px')
						.style('font-weight', '300')
						.style('letter-spacing', '1px')
						.style('padding', '30px 50px')
						.style('line-height', '1.3em');
					return "<strong>Impact Area:</strong> " + d.impactName + "</br>" +
						   "<strong>Category:</strong> " + d.category + "</br>" +
						   "<strong>Priority:</strong> " + d.priority + "</br>" +
						   "<strong>Difficulty:</strong> " + d.difficulty + "</br>" +
						   "<strong>Description:</strong> " + d.postItText.join("") + "</br>";
			})
	
		var x = d3.scaleLinear()
			.domain([-1, 10])
			.range([0, width]);
	
		var y = d3.scaleLinear()
			.domain([-1, 10])
			.range([height, 0]);
	
		var g = d3.select("#chart-area").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
		g.call(tip);
		
		var svg = d3.select("#color-legend").append("svg")
					.attr("width", 300)
					.attr("height", 300);

		svg.append("g")
			.attr("class", "legendOrdinal");

		var xAxis = d3.axisBottom(x)
			.ticks(0);
		
		g.append("g")
			.attr("class", "x-axis")
			.attr("transform", "translate(0, " + height + ")")
			.call(xAxis);
	
		var yAxis = d3.axisLeft(y)
			.ticks(0);

		g.append("g")
			.attr("class", "y-axis")
			.call(yAxis);
	
		
		var rectangles = g.selectAll("rect")
							.data(data);
	
		rectangles.enter()
			.append("rect")
				.attr("class", "postIt")
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
				.attr("x", function(d){
					return x(d.difficulty + Math.random() - .5);
				})
				
	
				.attr("y", function(d){
					return y(d.priority + Math.random() + .2);
				})
				.attr("width", 45)
				.attr("height", 45)
				.attr("fill", function(d){
					return d.color;
				})
				.attr("stroke", "white")
				.attr("stroke-width", "2px");
	
			g.append("text")
				.attr("class", "x axis-label")
				.attr("x", width / 2)
				.attr("y", height + 60)
				.attr("font-size", "20px")
				.attr("text-anchor", "middle")
				.text("Low to high difficulty");	
	
			g.append("text")
				.attr("class", "y axis-label")
				.attr("x", -(height / 2))
				.attr("y", -60)
				.attr("font-size", "20px")
				.attr("text-anchor", "middle")
				.attr("transform", "rotate(-90)")
				.text("Priority");

});