var rook = function(){

//	var domain3 = DOMAIN([[0,1], [0,1], [0,1]]) ([60,20,5]);
//	var domain2 = DOMAIN([ [0,1], [0,1] ]) ([60,20]);

var domain3 = DOMAIN([[0,1], [0,1], [0,1]]) ([20,5,5]);
var domain2 = DOMAIN([ [0,1], [0,1] ]) ([20,5]);

	//funzione che restituisce un cilindro pieno
	var cyl_solid = function (parms){
		var r = parms[0]; //raggio della circonferenza inferiore
		var h = parms[1];
		var r1 = parms[2] || r; //raggio della circonferenza superiore
		var r2 = parms[3] || 0; //raggio della circonferenza interna

		var controls = [ [r,0,0], [r,r,0], [-r,r,0], [-r,-r,0], [r,-r,0], [r,0,0] ];
		var nubs = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 3, 4, 4, 4])(controls);

		var controls1 = [ [r1,0,h], [r1,r1,h], [-r1,r1,h], [-r1,-r1,h], [r1,-r1,h], [r1,0,h] ];
		var nubs1 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 3, 4, 4, 4])(controls1);

		var controls2 = [ [r2,0,0], [r2,r2,0], [-r2,r2,0], [-r2,-r2,0], [r2,-r2,0], [r2,0,0] ];
		var nubs2 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 3, 4, 4, 4])(controls2);

		var controls3 = [ [r2,0,h], [r2,r2,h], [-r2,r2,h], [-r2,-r2,h], [r2,-r2,h], [r2,0,h] ];
		var nubs3 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 3, 4, 4, 4])(controls3);

		var cyl0 = BEZIER(S1)([nubs,nubs2]);
		var cyl1 = BEZIER(S1)([nubs1,nubs3]);

		//var cyl = CUBIC_HERMITE(S2)([cyl0,cyl1,[0,0,-3],[0,0,3]]);
		var cyl = BEZIER(S2)([cyl0, cyl1]);

		var mapped = MAP(cyl)(domain3);
		return mapped;
	};

	//funzione che crea un cilindro col bordo smussato
	var cyl_surf = function (parms){
		var r = parms[0]; //raggio della circonferenza inferiore
		var h = parms[1];

		var controls = [ [r,0,0], [r,r,0], [-r,r,0], [-r,0,0] ];
		var nubs = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 2, 2])(controls);

		var controls1 = [ [r,0,h], [r,r,h], [-r,r,h], [-r,0,h] ];
		var nubs1 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 2, 2])(controls1);

		var cyl0 = CUBIC_HERMITE(S1)([nubs,nubs1,[0,4,0],[0,-4,0]]);

		var controls2 = [ [-r,0,0], [-r,-r,0], [r,-r,0], [r,0,0] ];
		var nubs2 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 2, 2])(controls2);

		var controls3 = [ [-r,0,h], [-r,-r,h], [r,-r,h], [r,0,h] ];
		var nubs3 = NUBS(S0)(2)([ 0, 0, 0, 1, 2, 2, 2])(controls3);

		var cyl1 = CUBIC_HERMITE(S1)([nubs2,nubs3,[0,-4,0],[0,4,0]]);

		var cyl = BEZIER(S2)([cyl0, cyl1]);

		var mapped = MAP(cyl)(domain3);
		return mapped;
	};

	var corona = function(params){

		var alpha = params[0]; //angolo della fetta di corona
		var r = params[1]; //raggio esterno
		var r1 = params[2]; //raggio interno
		var h = params[3]; //altezza

		var domainCerchio = DOMAIN([[0,alpha],[0,h], [r1,r]])([15,15, 10]);

		var pun = function (p){
				return [ p[2]*SIN(p[0]), p[2]* COS(p[0]), p[1] ];
		}

		var mapped = MAP(pun)(domainCerchio);

		return mapped;

	};

	var alpha = PI/5; //angolo sezione corona
 	var beta = (2*PI - 6*alpha)/6; //spazio angolare tra una sezione della corona e l' altra

 	var coronaStruct = STRUCT([ corona([alpha,5.5, 5, 2.3]), 
 		R([0,1])([beta+alpha])(corona([alpha,5.5, 5, 2.3])),
 		R([0,1])([2*(beta+alpha)])(corona([alpha,5.5, 5, 2.3])),
 		R([0,1])([3*(beta+alpha)])(corona([alpha,5.5, 5, 2.3])),
 		R([0,1])([4*(beta+alpha)])(corona([alpha,5.5, 5, 2.3])),
 		R([0,1])([5*(beta+alpha)])(corona([alpha,5.5, 5, 2.3]))
 		]);

	var chess_rook = COLOR([1,1,1])(STRUCT([

		COLOR([0,1,0.8])(cyl_solid([7.5,0.2])), 
		T([2])([0.2])(cyl_solid([ 7.5,0.8 ])), 
		T([2])([1])(cyl_solid([ 7.2, 0.2])), 
		T([2])([1.2])(cyl_surf([ 7,0.8 ])), T([2])([1.2])(cyl_solid([ 7.1,0.8 ])),
		T([2])([2])(cyl_surf([ 5.7,0.4 ])), T([2])([2])(cyl_solid([ 5.8,0.4 ])),
		T([2])([2.4])(cyl_solid([ 5.2, 0.2])), 
		T([2])([2.6])(cyl_surf([ 5.5,0.4 ])), T([2])([2.6])(cyl_solid([ 5.6, 0.4 ])),
		T([2])([3])(cyl_solid([ 5, 7, 3.8 ])),
		T([2])([10])(cyl_surf([ 4.2,0.4 ])), T([2])([10])(cyl_solid([ 4.3, 0.4 ])),
		T([2])([10.4])(cyl_surf([ 5.5,0.4 ])), T([2])([10.4])(cyl_solid([ 5.6,0.4 ])),
		T([2])([10.8])(cyl_solid([ 5.1, 0.2 ])),
		T([2])([11])(cyl_solid([ 5.5, 0.2 ])),
		T([2])([11.2])(coronaStruct)

		])); 

	return chess_rook;
};

var scmodel = rook();

//DRAW(scmodel);