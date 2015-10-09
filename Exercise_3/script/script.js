//Take a moment to set up the drawing environment yourself
var width = $('.canvas').width(),
    height = $('.canvas').height();

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    .append('g');




d3.csv('data/world_bank_2013.csv',
    function(d){
        var newRow ={
        country: d.country,
        GDP: +d.GDP,
        GDP_per_capita: +d.GDP_per_capita,
        IPH_100: +d.internet_users_per_100
        };
        return newRow;
}, 
    function(errors,rows){
    var minGDPPerCap= d3.min(rows, function(d) {return d.GDP_per_capita;}),
        maxGDPPerCap= d3.max(rows, function(d) {return d.GDP_per_capita;});

    var minPctUser= d3.min(rows, function(d) {return d.IPH_100;}),
        maxPctUser= d3.max(rows, function(d) {return d.IPH_100;});

    var scaleX = d3.scale.linear()
        .domain([minGDPPerCap,maxGDPPerCap])
        .range([0, width]);
    var scaleY = d3.scale.linear()
        .domain([minPctUser,maxPctUser])
        .range([height, 0]);

    rows.forEach(function(country){
        var xPos = scaleX(country.GDP_per_capita)
        var yPos = scaleY(country.IPH_100)
        var node = canvas.append ('g')
        .attr('class','country')
        .attr('transform','translate ('+xPos+','+yPos+')');
        node
            .append('circle')
            .attr('r',10)
            .style('fill-opacity',.5);
        node
            .append('text')
            .text(country.country);
        });

 
})





