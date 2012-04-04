//perimetro della struttura
var points_per = [ [0,0], [0,23], [10,23], [10, 17], [53, 17], [53, 4], [39, 4], [39, 0], [0, 0] ];
var perimetro = POLYLINE (points_per);

//vasca
var vasca = POLYLINE([ [1,1], [21,1], [21,10], [1,10], [1,1] ]);

var stanza1 = POLYLINE([ [1,17], [9,17]]);
var stanza2 = POLYLINE([ [5,17], [5,18]]);
var stanza3 = POLYLINE([ [5,19], [5,22]]);
var stanza4 = POLYLINE([ [5,20.8], [5.8,20.8]]);
var stanza5 = POLYLINE([ [6.8,20.8], [9,20.8]]);
var stanza6 = POLYLINE([ [7,22], [7, 21.2]]);

//stanzette della struttura
var stanza = STRUCT([ stanza1, stanza2, stanza3, stanza4, stanza5, stanza6]);


var muro1 = POLYLINE([ [7.3,15], [26.2,15]]);
var muro2 = POLYLINE([ [30,13.8], [40,13.8]]);
var muro3 = POLYLINE([ [25, 7.2], [34,7.2]]);
var muro4 = POLYLINE([ [31,13.8], [31,7.2], [32,13.8], [32,7.2]]);
var muro5 = POLYLINE([ [37,11.2], [42.2,11.2]]);
var muro6 = POLYLINE([ [44.8,14], [44.8,7]]);
var muro7 = POLYLINE([ [38,16], [51,16], [51,5], [41,5] ]);
var muro8 = POLYLINE([ [8,1], [1,1], [1,22], [9,22], [9,17]]);
//muri interni della struttura
var muri = STRUCT([muro8, muro7, muro6, muro5, muro4, muro3, muro2, muro1]);

//perimetro scala
var scala1 = POLYLINE([ [39,1], [36,1], [36,4], [39,4] ]);

var scala = function (n){
	var gradini = scala1;
	for (var i =1; i<n; i++){
		var x = 36+i*0.375;
		var a = [ [x, 1], [x,4] ];
		var g = POLYLINE(a);
		gradini = STRUCT([ gradini, g]);
	}
	return gradini;
}

//pianta finale della struttura
var plane = STRUCT([ perimetro, scala(8), vasca, muri, stanza ]);
DRAW(plane);