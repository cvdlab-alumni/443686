var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);
var domain3 = DOMAIN([[0,1], [0,1], [0,1]]) ([15,15,15]);

var controls1 = [[0,-2,-2],[20,-1,-1]]; // p0, p1, t0, t1
var c1 = BEZIER(S0)(controls1);
var curve1 = MAP(c1)(domain1);
//DRAW(curve1);
var controls2 = [[0,2,-2],[20,1,-1]];  // p0, p1, t0, t1
var c2 = BEZIER(S0)(controls2);
var curve2 = MAP(c2)(domain1);
//DRAW(curve2);

var controls21 =[[0,-2,-2],[20,-1,-1]];
var controls22 =[[0,-2,2],[20,-1,1]];
var c21 = BEZIER(S0)(controls21);
var c22 = BEZIER(S0)(controls22);
var s12a = BEZIER(S1)([c21,c22]);
var pannello_inferiore = MAP(s12a)(domain2);

var controls11 =[[0,2,2],[20,1,1]];
var controls12 =[[0,2,-2],[20,1,-1]];
var c11 = BEZIER(S0)(controls11);
var c12 = BEZIER(S0)(controls12);
var s12b = BEZIER(S1)([c11,c12]);
var pannelli_superiore= MAP(s12b)(domain2);
//DRAW(pannelli_superiore);

var s12h = CUBIC_HERMITE(S1)([c1,c2,[0,0,-3],[0,0,3]]);
var pl = MAP(s12h)(domain2); //pannelli laterali
//DRAW(pl);
var pannelli_laterali = STRUCT([pl, R([1,2])([PI])(pl) ]);
//DRAW(pannelli_laterali);

//coda fusoliera
var controls9 = [ [20, 1, -1 ], [21,1,-1 ] ];
var controls10 = [ [20,-1, -1 ], [21,-1,-1 ] ];
var c9 = BEZIER(S0)(controls9);
var c10 = BEZIER(S0)(controls10);
var s910 = CUBIC_HERMITE(S1)([c9,c10,[0,0,-3],[0,0,3]]);
var coda1 = MAP(s910)(domain2);
//DRAW(coda1);
var controls91 = [ [20, 1, 1 ], [21,1,1 ] ];
var controls101 = [ [20,-1, 1 ], [21,-1,1 ] ];
var c9101 = BEZIER(S0)(controls91);
var c9102 = BEZIER(S0)(controls101);
var s9101 = CUBIC_HERMITE(S1)([c9101,c9102,[0,0,3],[0,0,-3]]);
var coda2 = MAP(s9101)(domain2);
//DRAW(coda2);

var tappo_coda = MAP(CUBIC_HERMITE(S2)([s910,s9101, [1,0,0],[-1,0,0] ]))(domain3);

var parte1 = STRUCT([pannelli_laterali, pannello_inferiore, pannelli_superiore, tappo_coda]);
//DRAW(parte1);

//############### BLOCCO 2 ######################àà

var controls3 = [ [-11,-2,0], [0,-2,0] ]; 
var c3 = BEZIER(S0)(controls3);
var controls4 = [ [-11,2,0], [0,2,0] ]; 
var c4 = BEZIER(S0)(controls4);
var s34 = CUBIC_HERMITE(S1)([c3,c4,[0,0,-3],[0,0,3]]);
var pl1 = MAP(s34)(domain2); //pannelli laterali
//DRAW(pl1);
var pannelli_laterali1 = STRUCT([T([2])([-2])(pl1), T([2])([2])(R([1,2])([PI])(pl1))]);
//DRAW(pannelli_laterali1);

var controls31 = [ [-11,-2,2 ], [0,-2,2 ] ];
var controls32 = [ [-11,-2,-2 ], [0,-2,-2 ] ];
var c5 = BEZIER(S0)(controls31);
var c6 = BEZIER(S0)(controls32);
var s56 = BEZIER(S1)([c5,c6]);
var pannello_inferiore1 = MAP(s56)(domain2);

//separatore posti piloti
var controls33 = [ [-5,2,2 ], [-6,2,2 ] ];
var controls34 = [ [-5,2,-2 ], [-6,2,-2 ] ];
var c51 = BEZIER(S0)(controls33);
var c61 = BEZIER(S0)(controls34);
var s561 = BEZIER(S1)([c51,c61]);
var pannello_superiore1 = MAP(s561)(domain2);

var parte2 = STRUCT( [ pannelli_laterali1, pannello_inferiore1, pannello_superiore1]);

//punta fusoliera
var controls5 = [ [-11,2,2 ], [-17,2,2 ] ];
var controls6 = [ [-11,-2,2 ], [-17,-2,2 ] ];
var c53 = BEZIER(S0)(controls5);
var c63 = BEZIER(S0)(controls6);
var s562 = CUBIC_HERMITE(S1)([c53,c63,[0,0,3],[0,0,-3]]);
var punta1 = MAP(s562)(domain2);
//DRAW(punta1);
var controls7 = [ [-11,2,-2], [-17,2,-2 ] ];
var controls8 = [ [-11,-2,-2 ], [-17,-2,-2 ] ];
var c7 = BEZIER(S0)(controls7);
var c8 = BEZIER(S0)(controls8);
var s78 = CUBIC_HERMITE(S1)([c7,c8,[0,0,-3],[0,0,3]]);
var punta2 = MAP(s78)(domain2);
//DRAW(punta2);

var punta3 = MAP(CUBIC_HERMITE(S2)([s562,s78, [-2,0,0],[2,0,0] ]))(domain3);
//DRAW(punta3);

var parte3 = STRUCT( [ punta3 ]);
//DRAW(parte3);


var fusoliera = STRUCT([ parte1, parte2, parte3]);
//DRAW(fusoliera);


//############################################################################## ALI #########################################

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

var ali = STRUCT([ T([0,2])([-11,2])(surf), T([0,2])([-11,-2])(surf1) ]);



//################################################################################# ALETTONE ##########################################################

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
//DRAW(alettone);

var airplane = STRUCT([ fusoliera, ali, R([0,2])([PI])(T([0])([-20])(R([1,2])([PI])(S([0,1,2])([0.7,0.7,0.7])(alettone)))) ]);


//##################################################### PISTA ##############################################à

var controls3 = [ [40,-4,80], [-40,-4,80] ]; 
var c3 = BEZIER(S0)(controls3);
var controls4 = [ [40,-4,-80], [-40,-4,-80] ]; 
var c4 = BEZIER(S0)(controls4);
var s34 = BEZIER(S1)([c3,c4]);
var controls5 = [ [40,-8,80], [-40,-8,80] ]; 
var c5 = BEZIER(S0)(controls5);
var controls6 = [ [40,-8,-80], [-40,-8,-80] ]; 
var c6 = BEZIER(S0)(controls6);
var s56 = BEZIER(S1)([c5,c6]);
var strada = MAP(BEZIER(S2)([s34,s56]))(domain3);
//DRAW(strada);




DRAW(STRUCT([ strada, COLOR([0.4,0.5,0.6])(airplane)]));