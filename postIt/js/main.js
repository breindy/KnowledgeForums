var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 1000 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;


d3.json("data/stickynotes.json").then(function(data){
	console.log(data);

			var tip = d3.tip().attr('class', 'd3-tip')
			.html(function(d) {
				var text = "<strong>Impact Area:</strong> " + d.impactName + "</br>";
				text += "<strong>Category:</strong> " + d.category + "</br>";
				text += "<strong>Priority:</strong> " + d.priority + "</br>";
				text += "<strong>Difficulty:</strong> " + d.difficulty + "</br>";
				text += "<strong>Description:</strong> " + d.postItText + "</br>";
				return text;
			});
	
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
					return y(d.priority + Math.random() + .5);
				})
				.attr("width", 40)
				.attr("height", 40)
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