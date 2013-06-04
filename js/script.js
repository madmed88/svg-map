$( document ).ready(function() {
	var tnMap = map;
	var width = $('#canvas').width();
	var height = $('#canvas').height() * 0.99;

	// The original SVG's width and height
	var svgWidth = 512;
	var svgHeight = 1047;

	var paper = Raphael('canvas', '100%', '100%');

	// the following line makes the Raphael paper fill its canvas
	paper.setViewBox(0, 0, svgWidth, svgHeight, true);

	var tnRaphael = {};

	// Draw Map and store Raphael paths
	for (var state in tnMap) {
	  tnRaphael[state] = paper.path(tnMap[state]);
	}
});
