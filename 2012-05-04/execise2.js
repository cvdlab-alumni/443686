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

/*
var controls35 = [ [-11,2,2 ], [-15,2,2 ] ];
var controls36 = [ [-11,2,-2 ], [-15,2,-2 ] ];
var c52 = BEZIER(S0)(controls35);
var c62 = BEZIER(S0)(controls36);
var s562 = BEZIER(S1)([c52,c62]);
var pannello_superiore2 = MAP(s562)(domain2);

var parte2 = STRUCT( [ pannelli_laterali1, pannello_inferiore1, pannello_superiore1, pannello_superiore2 ]);
*/var parte2 = STRUCT( [ pannelli_laterali1, pannello_inferiore1, pannello_superiore1]);

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

//var parte3 = STRUCT( [T([2])([2])(punta1), T([2])([-2])(R([1,2])([PI])(punta1))]);
var parte3 = STRUCT( [ punta3 ]);
//DRAW(parte3);


var fusoliera = STRUCT([ parte1, parte2, parte3]);
DRAW(fusoliera);