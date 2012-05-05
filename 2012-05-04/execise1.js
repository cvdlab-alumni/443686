var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var p0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var p1 = p0.map(function (p) {return [p[0],p[1],p[2]+10] });
var p2 = p0.map(function (p) {return [p[0],p[1],p[2]+20] });
var p3 = p0.map(function (p) {return [p[0],p[1],p[2]+30] });
var p4 = p0.map(function (p) {return [p[0],p[1],p[2]+40] });

var p5 = [[5,0,40.1]];


var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var c4 = BEZIER(S0)(p4);

var c5 = BEZIER(S0)(p5);


var wing = BEZIER(S1)([c0,c1,c2,c3,c4,c5]);
var surf = MAP(wing)(domain2);
//DRAW(surf);

var p0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var p1 = p0.map(function (p) {return [p[0],p[1],p[2]-10] });
var p2 = p0.map(function (p) {return [p[0],p[1],p[2]-20] });
var p3 = p0.map(function (p) {return [p[0],p[1],p[2]-30] });
var p4 = p0.map(function (p) {return [p[0],p[1],p[2]-40] });

var p5 = [[5,0,-40.1]];


var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var c4 = BEZIER(S0)(p4);

var c5 = BEZIER(S0)(p5);


var wing1 = BEZIER(S1)([c0,c1,c2,c3,c4,c5]);
var surf1 = MAP(wing1)(domain2);
//DRAW(surf1);

DRAW(STRUCT([surf, surf1]));