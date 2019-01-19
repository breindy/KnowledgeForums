var margin = { left: 100, right: 10, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


d3.json("data/literatureGap.json").then(function(data){
	console.log(data);

});