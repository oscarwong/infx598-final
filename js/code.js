var margin = {
    top: 32,
    right: 50,
    bottom: 20,
    left: 50
};

var width = 240 - margin.left - margin.right;
var height = 240 - margin.top - margin.bottom;
var labelMargin = 8;

var scale = d3.scale.linear()
    .domain([0, 100])
    .range ([0, 100])

d3.csv('test.csv')
  .row(function(d) {
      d.maxdmg = +d.maxdmg,
      d.startarmor = +d.startarmor,
      d.movspeed = +d.movspeed,
      d.tr = +d.tr,
      d.basestr = +d.basestr
      return d;
})
.get(function(error, rows) {
    var star = d3.starPlot()
      .width(width)
      .properties([
          'Max damage',
          'Armor',
          'Movement speed',
          'Turn rate',
          'Strength'
      ])
       .scales(scale)
       .labels([
          'Max damage',
          'Armor',
          'Movement speed',
          'Turn rate',
          'Strength'
       ])
       .title(function(d) { return d.hero; })
       .margin(margin)
       .labelMargin(labelMargin)
               
    rows.forEach(function(d, i) {
      star.includeLabels(i % 4 === 0 ? true : false);

      var wrapper = d3.select('#target').append('div')
        .attr('class', 'wrapper')

      var svg = wrapper.append('svg')
        .attr('class', 'chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', width + margin.top + margin.bottom)

      var starG = svg.append('g')
        .datum(d)
        .call(star)
        .call(star.interaction)

      var interactionLabel = wrapper.append('div')
        .attr('class', 'interaction label')

      var circle = svg.append('circle')
        .attr('class', 'interaction circle')
        .attr('r', 5)

      var interaction = wrapper.selectAll('.interaction')
        .style('display', 'none');

      svg.selectAll('.star-interaction')
        .on('mouseover', function(d) {
          svg.selectAll('.star-label')
            .style('display', 'none')

          interaction
            .style('display', 'block')

          circle
            .attr('cx', d.x)
            .attr('cy', d.y)

          $interactionLabel = $(interactionLabel.node());
          interactionLabel
            .text(d.key + ': ' + d.datum[d.key])
            .style('left', d.xExtent - ($interactionLabel.width() / 2))
            .style('top', d.yExtent - ($interactionLabel.height() / 2))
        })
        .on('mouseout', function(d) {
          interaction
            .style('display', 'none')

          svg.selectAll('.star-label')
            .style('display', 'block')
        })
    });
});