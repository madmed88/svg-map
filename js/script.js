/*jslint browser: true*/
/*global $, Raphael, tinycolor, map*/

var mapRaphael = {};
var stateValues = {};

var updateMap = function (event) {
    "use strict";
    var name, valuesArray, thisValue, saturation, color, maxValue, minValue;
    $('#fields :input').each(function () {
        name = $(this).attr("name");
        thisValue = $(this).val();
        stateValues[name] = thisValue;
        valuesArray = Object.keys(stateValues).map(function (key) { return stateValues[key]; });
        minValue = Math.min.apply(null, valuesArray);
        maxValue = Math.max.apply(null, valuesArray);
        saturation = ((thisValue - minValue) / (maxValue - minValue)) * 100;
        color = tinycolor("hsv(100%, " + saturation + "%, 100%)");
        mapRaphael[name].attr({fill: color.toHexString()});
    });
};

$(document).ready(function () {
    "use strict";
	var theMap = map,
        width = $('#canvas').width(),
        height = $('#canvas').height() * 0.99,
        svgWidth = 512, // The original SVG's width
        svgHeight = 1047, // The original SVG's height
        paper = new Raphael('canvas', '100%', '100%'),
        stateValue = [],
        state;

	// the following line makes the Raphael paper fill its canvas
	paper.setViewBox(0, 0, svgWidth, svgHeight, true);

	// Draw Map and store Raphael paths
	for (state in theMap) {
        if (theMap.hasOwnProperty(state)) {
            mapRaphael[state] = paper.path(theMap[state]);
            $('#fields').append('<tr><td align="right">' + state + '</td><td align="left"><input type="text" name="' + state + '" /></td></tr>');
        }
	}

    $('#fields :input').each(function () {
        $(this).on("input", null, null, updateMap);
    });
});

