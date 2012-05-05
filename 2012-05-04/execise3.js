var POLYPOINT = function (points) {
  return SIMPLICIAL_COMPLEX(points)(points.map(function (p,i) { 
    return [i];
  }));
}

var v = function (val, scalue){
	return val - (val*scalue);
}

var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);

//#################  parte centrale  ####################

var p0 = [[0,0,0],[7,-1.5,0],[7,1.5,0],[0,0,0]];
var p1 = p0.map(function (p) {return [v(p[0],0.3), v(p[1],0.3), p[2]+1]});
var p2 = p1.map(function (p) {return [v(p[0],0.2)+0.3, v(p[1],0.2), p[2]+2]});
var p3 = p2.map(function (p) {return [v(p[0],0.1)+0.2, v(p[1],0.1), p[2]+1]});

var p4 = p3.map(function (p) {return [p[0],p[1],p[2]+0.2] });
var p5 = p3.map(function (p) {return [p[0],p[1],p[2]+0.4] });
var p6 = p3.map(function (p) {return [p[0],p[1],p[2]+0.6] });
var p = [[1.5,0,4.5]];

var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var cp = BEZIER(S0)(p);
var controls = [c0, c1, c2, c3, cp];

//var curves = STRUCT(CONS(AA(MAP)(controls))(domain1));
//DRAW(curves);

var al = BEZIER(S1)(controls);
var al0 =  MAP(al)(domain2);
//DRAW(alettone);

//##################  parti laterali  ##################

// ######## ALETTONE SX #########
var p0 = [[10,0,0],[0,5,0],[0,-3,0],[10,0,0]];
var p1 = p0.map(function (p) {return [p[0],p[1],p[2]+2] });
var p2 = p0.map(function (p) {return [p[0],p[1],p[2]+4] });
var p3 = p0.map(function (p) {return [p[0],p[1],p[2]+6] });
var p4 = p0.map(function (p) {return [p[0],p[1],p[2]+8] });

var p5 = [[5,0,8.1]];


var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var c4 = BEZIER(S0)(p4);

var c5 = BEZIER(S0)(p5);

/*
var curves = STRUCT( CONS(AA(MAP)([c0,c1,c2,c3,c4])) (domain1) );
DRAW(curves);
*/

var wing = BEZIER(S1)([c0,c1,c2,c3,c4,c5]);
var surf = MAP(wing)(domain2);
//DRAW(surf);

var p6 =[ [2.5,0,-3] ];
var c6 = BEZIER(S0)(p6);
var wing1 = BEZIER(S1)([c0,c6]);
var surf1 = MAP(wing1)(domain2);

var al = STRUCT([surf1, surf]);
//DRAW(al2);

// ######## ALETTONE DX #########

var p0 = [[10,0,0],[0,5,0],[0,-3,0],[10,0,0]];
var p1 = p0.map(function (p) {return [p[0],p[1],p[2]-2] });
var p2 = p0.map(function (p) {return [p[0],p[1],p[2]-4] });
var p3 = p0.map(function (p) {return [p[0],p[1],p[2]-6] });
var p4 = p0.map(function (p) {return [p[0],p[1],p[2]-8] });

var p5 = [[5,0,-8.1]];


var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var c4 = BEZIER(S0)(p4);

var c5 = BEZIER(S0)(p5);

/*
var curves = STRUCT( CONS(AA(MAP)([c0,c1,c2,c3,c4])) (domain1) );
DRAW(curves);
*/

var wing = BEZIER(S1)([c0,c1,c2,c3,c4,c5]);
var surf3 = MAP(wing)(domain2);
//DRAW(surf);

var p6 =[ [2.5,0,3] ];
var c6 = BEZIER(S0)(p6);
var wing1 = BEZIER(S1)([c0,c6]);
var surf2 = MAP(wing1)(domain2);

var al2 = STRUCT([surf2, surf3]);

var alettone_laterale = STRUCT([T([2])([3])(al), T([2])([-3])(al2)]);

var alettone = STRUCT([T([0])([16])(R([0,1])([PI])(alettone_laterale)), S([0,1,2])([3,3,3])(R([1,2])([PI/2])(al0))]);
DRAW(alettone);