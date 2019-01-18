var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


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
			// .domain(data.map(function (d){
			// 	return d.priority;
			// }))
			// .domain([0, d3.max(data, function(d) { return d.priority; })])
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
	.ticks(4);
	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxis);

	var yAxis = d3.axisLeft(y)
		.ticks(5);
	g.append("g")
		.attr("class", "y-axis")
		.call(yAxis);

	var rectangles = g.selectAll("rect")
						.data(data);

	rectangles.enter()
		.append("rect")
			.attr("class", "postIt")
			.on("click", tip.show)
			.on("mouseout", tip.hide)
			.attr("x", function(d){
				return x(d.priority);
			})

			.attr("y", function(d){
				return y(d.difficulty);
			})
			.attr("width", 25)
			.attr("height", 25)
			.attr("fill", function(d){
				return d.color;
			});



		g.append("text")
			.attr("class", "x axis-label")
			.attr("x", width / 2)
			.attr("y", height + 60)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.text("Priority");	

		g.append("text")
			.attr("class", "y axis-label")
			.attr("x", -(height / 2))
			.attr("y", -60)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.text("Difficulty");	

});