//muri: spessore muri in cemento 0.3, spessore pareti in vetro 0.1. altezza fissa dei muri è 2
var z = 5;

var muro1 = SIMPLEX_GRID([ [-1,0.3], [-1,21], [z]]);
var muro2 = SIMPLEX_GRID([ [-1,4], [-22,0.3], [z]]);
var muro3 = SIMPLEX_GRID([ [-1,8], [-17,0.1], [z]]);
var muro4 = SIMPLEX_GRID([ [-5,4], [-22,0.1], [z]]);
var muro5 = SIMPLEX_GRID([ [-9,0.3], [-17,5.1], [z]]);
var muro6 = SIMPLEX_GRID([ [-5,0.1], [-17,5], [z]]);
var muro7 = SIMPLEX_GRID([ [-5,4], [-20,0.1], [z]]);
var muro8 = SIMPLEX_GRID([ [-7.2,20], [-15,0.3], [z]]);
var muro9 = SIMPLEX_GRID([ [-39,13], [-16,0.3], [z]]);
var muro10 = SIMPLEX_GRID([ [-52,0.3], [-5,11.3], [z]]);
var muro11 = SIMPLEX_GRID([ [-42,10], [-5,0.3], [z]]);
var muro12 = SIMPLEX_GRID([ [-31,11], [-5,0.1], [z]]);
var muro13 = SIMPLEX_GRID([ [-45.4,0.1], [-7,7], [z]]);
var muro14 = SIMPLEX_GRID([ [-26,9], [-7.2,0.3], [z]]);
var muro15 = SIMPLEX_GRID([ [-32,0.1], [-7.5,6], [z]]);
var muro16 = SIMPLEX_GRID([ [-33,0.1], [-7.5,6], [z]]);
var muro17 = SIMPLEX_GRID([ [-31,10], [-13.5,0.1], [z]]);
var muro18 = SIMPLEX_GRID([ [-38,5.5], [-11.5,0.3], [z]]);

var muri = STRUCT ([ muro1, muro2, muro3, muro4, muro5, muro6, muro7, muro8, muro9, muro10, muro11, muro12, muro13, muro14, muro15, muro16, muro17, muro18]);

//spessore tetto
var zz = [-z, 0.3];

var tetto1 = SIMPLEX_GRID([ [10], [-13,10], zz]);
var tetto2 = SIMPLEX_GRID([ [-25,28], [-4,13], zz]);

var tetti = STRUCT( [ tetto1, tetto2 ]);

//spessore base
var zzz = 3;
var pav1 = SIMPLEX_GRID([ [1], [23], [zzz]]);
var pav2 = SIMPLEX_GRID([ [-1, 38], [1], [zzz]]);
var pav3 = SIMPLEX_GRID([ [10], [-17,6], [zzz]]);
var pav4 = SIMPLEX_GRID([ [52], [-10, 7], [zzz]]);
var pav5 = SIMPLEX_GRID([ [-21, 31], [-4, 6], [zzz]]);
var pav6 = SIMPLEX_GRID([ [-21, 15], [-1, 3], [zzz]]);
var pav7 = SIMPLEX_GRID([ [-1, 20], [-1, 9], [zzz-0.2]]);

var h = zzz; //altezza scale
var n = 8; //numero gradini
var hs = h/n; //altezza scalino
var xs = 3/n; //lunghezza scalino

var scalino1 = SIMPLEX_GRID([ [-36,3], [-1,3], [hs] ]);
var scalino2 = SIMPLEX_GRID([ [-36,3-xs], [-1,3], [-hs,hs] ]);
var scalino3 = SIMPLEX_GRID([ [-36,3-2*xs], [-1,3], [-2*hs,hs] ]);
var scalino4 = SIMPLEX_GRID([ [-36,3-3*xs], [-1,3], [-3*hs,hs] ]);
var scalino5 = SIMPLEX_GRID([ [-36,3-4*xs], [-1,3], [-4*hs,hs] ]);
var scalino6 = SIMPLEX_GRID([ [-36,3-5*xs], [-1,3], [-5*hs,hs] ]);
var scalino7 = SIMPLEX_GRID([ [-36,3-6*xs], [-1,3], [-6*hs,hs] ]);
var scalino8 = SIMPLEX_GRID([ [-36,3-7*xs], [-1,3], [-7*hs,hs] ]);

var scale = STRUCT( [scalino8, scalino7, scalino6, scalino5, scalino4, scalino3, scalino2, scalino1 ]);

var pavimento = STRUCT([ pav1, pav2, pav3, pav4, pav5, pav6, pav7, scale ]);

//DRAW(pavimento);

var draw3D = STRUCT( [ muri, tetti, T([2])([-h]) (pavimento) ]);

DRAW(draw3D);