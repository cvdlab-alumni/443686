/* COLORI USATI */
	var grigio_chiaro = [1,0.94,0.86];
	var grigio_scuro = [0.87,0.83,0.81];
	var oro = [0.96,0.87,0.7];
	var roof_color = [0.8,0.51,0.4];

/* DETAILS: cornicione, bordi quadrati, ornamenti, colonne, finestre, porte */
	var door = function(a,l,p,s, alpha){
		var bordo = COLOR([0.86,0.7,0.2]) (STRUCT ([ SIMPLEX_GRID([ [s,-(l-2*s),s], [a],[p] ]), SIMPLEX_GRID([ [l],[-(a-s),s],[p] ]) ]));
		var sportello = COLOR([0.8,0.8,0.2])(T([0,2])([s,p])( R([0,2])([-alpha])(CUBOID([l-(2*s),a-s,0.05 ]))));
		return STRUCT([bordo,sportello]);
	};
	//DRAW(door(3,1,0.3,0.1,PI/2));

	var w = function(a,l,p,s, alpha, beta){ //altezza totale finestra, larghetta tot, profondità tot, spessore telaio
		var lv = (l-(2*s))/2;
		var lato = COLOR([0.96,0.87,0.7]) (CUBOID([s,a,p]));
		var lato2 = COLOR([0.96,0.87,0.7]) (CUBOID([lv*2,s,p]));
		var vetro = COLOR([0.5,1,1,0.5])(CUBOID([lv,a-(2*s),p]));
		var sportello = COLOR([0.86,0.7,0.2])(T([0,1,2])([s,s,p])( R([0,2])([-alpha])(CUBOID([lv,a-(2*s),0.05 ]))));
		var sportello2 = COLOR([0.86,0.7,0.2])(T([0,1,2])([l-s,s,p+0.005])( R([0,2])([beta-PI])(CUBOID([lv,a-(2*s),0.05 ]))));
		var object = STRUCT([lato,  T([0])([l-s])(lato), T([0,1])([s,a-s])(lato2), 
			T([0])([s])(lato2),T([0,1])([s,s])(vetro), T([0,1])([s+lv,s])(vetro), sportello, sportello2]);
		return object;
	};//DRAW(w(10,8,2,1, PI/4, PI/4));

	var wc = function(){
		var domain = DOMAIN([[0,1],[0,1]])([12,12]);
		var c1 = CUBIC_HERMITE(S0)([[0.4,0,0],[-0.4,0,0],[0,0.8,0],[0,-0.8,0]]);
		var c2 = CUBIC_HERMITE(S0)([[0.4,0,0.3],[-0.4,0,0.3],[0,0.8,0.3],[0,-0.8,0.3]]);
		var lowRing12 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
		var lowRing12_s1 = MAP(lowRing12)(domain);
		var b1 =  COLOR([0.5,1,1,0.5])(MAP(BEZIER(S1)([ BEZIER(S0)([[-0.4,0,0],[0.4,0,0]]), c1]))(domain));
		var b2 =  COLOR([0.5,1,1,0.5])(MAP(BEZIER(S1)([ BEZIER(S0)([[-0.4,0,0.3],[0.4,0,0.3]]), c2]))(domain));
		var b3 =  MAP(BEZIER(S1)([ BEZIER(S0)([ [-0.4,0,0.3],[0.4,0,0.3] ]), BEZIER(S0)([ [-0.4,0,0],[0.4,0,0] ]) ]))(domain);

		var b4 =  MAP(BEZIER(S1)([ c1, BEZIER(S0)([ [0.4,0.6,0],[-0.4,0.6,0] ]) ]))(domain);
		var b5 =  MAP(BEZIER(S1)([ c2, BEZIER(S0)([ [0.4,0.6,0.3],[-0.4,0.6,0.3] ]) ]))(domain);
		var b6 =  MAP(BEZIER(S1)([ BEZIER(S0)([ [-0.4,0.6,0.3],[0.4,0.6,0.3] ]), BEZIER(S0)([ [-0.4,0.6,0],[0.4,0.6,0] ]) ]))(domain);
		var b7 =  MAP(BEZIER(S1)([ BEZIER(S0)([ [-0.4,0.6,0],[-0.4,0.6,0.3] ]), BEZIER(S0)([ [-0.4,0,0],[-0.4,0,0.3] ]) ]))(domain);
		var b8 =  MAP(BEZIER(S1)([ BEZIER(S0)([ [0.4,0.6,0],[0.4,0.6,0.3] ]), BEZIER(S0)([ [0.4,0,0],[0.4,0,0.3] ]) ]))(domain);
		//var lowRing12_s2 = S([2])([-1])(lowRing12_s1);
		var lRing = STRUCT([b1,b2, COLOR(grigio_chiaro) (STRUCT([ lowRing12_s1,b3,b4,b5,b6,b7,b8]))]);
		return  lRing;
	};//DRAW(wc());
	var column = function(){
		var a = 4;
		var r = 0.2;
		//var domainColumn1 = INTERVALS(1)(12);
		var domainColumn2 = DOMAIN([[0,1],[0,1]])([12,12]);
		var tronco = COLOR(grigio_chiaro) (R([1,2])([-PI/2])(CYL_SURFACE([r,a])([32,2])));
		var base = T([0,2])([-0.35,-0.35])(CUBOID([0.7,0.5,0.7]));
		//dosso inferiore
		var c1 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,0,1.2],[0,0,-1.2]]);
		var c2 = CUBIC_HERMITE(S0)([[0.2,0.1,0],[-0.2,0.1,0],[0,0,0.8],[0,0,-0.8]]);
		var lowRing12 = CUBIC_HERMITE(S1)([c1,c2,[0,0.5,0],[0,0,0]]);
		var lowRing12_s1 = T([1])([0.5])(MAP(lowRing12)(domainColumn2));
		var lowRing12_s2 = S([2])([-1])(lowRing12_s1);
		var lRing =  COLOR([0.96,0.87,0.7]) (STRUCT([lowRing12_s1, lowRing12_s2]));
		//Capitello
		var p1 = CUBIC_HERMITE(S0)([[0,0.2,0],[0,-0.2,0],[1,0,0],[-1,0,0]]);	
		var p2 = CUBIC_HERMITE(S0)([[0,0.2,0.4],[0,-0.2,0.4],[1,0,0],[-1,0,0]]);
		var m1 = BEZIER(S0)([[0,0,0]]);
		var m2 = BEZIER(S0)([[0,0,0.4]]);
		var cap_supEst_R = MAP(BEZIER(S1)([p1,p2]))(domainColumn2);
		var cap_supFront_R = MAP(BEZIER(S1)([p1,m1]))(domainColumn2);
		var cap_supRear_R = MAP(BEZIER(S1)([p2,m2]))(domainColumn2);

		var cap_supEst_L = T([1])([-0.1])(S([0,1])([-1/2,-1/2])(cap_supEst_R));
		var cap_supFront_L = T([1])([-0.1])(S([0,1])([-1/2,-1/2])(cap_supFront_R));
		var cap_supRear_L = T([1])([-0.1])(S([0,1])([-1/2,-1/2])(cap_supRear_R));

		var cap_Right_union = STRUCT([cap_supEst_R,cap_supFront_R,cap_supRear_R,cap_supEst_L,cap_supFront_L,cap_supRear_L]);
		var cap_Right =  COLOR([0.96,0.87,0.7]) (T([0,1,2])([0.3,3.8,-0.2])(cap_Right_union));
		var cap_Left =  COLOR([0.96,0.87,0.7]) (S([0])([-1])(cap_Right));

		var sostegno =  COLOR([0.96,0.87,0.7]) (T([0,1,2])([-0.3,3.8,-0.2])(CUBOID([0.6, 0.2, 0.4])));

		var colonna = STRUCT([ base, lRing, tronco, cap_Left, cap_Right, cap_Left, sostegno ]);
		return colonna;
	}; //DRAW(column());
	var column1 = function(){
		var a = 4;
		var r = 0.2;
		//var domainColumn1 = INTERVALS(1)(12);
		var domainColumn2 = DOMAIN([[0,1],[0,1]])([12,12]);
		var tronco = COLOR(grigio_chiaro) (R([1,2])([-PI/2])(CYL_SURFACE([r,a])([32,2])));
		var base = T([0,2])([-0.35,-0.35])(CUBOID([0.7,0.2,0.7]));
		//dosso inferiore
		var c1 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,0,1.2],[0,0,-1.2]]);
		var c2 = CUBIC_HERMITE(S0)([[0.2,0.1,0],[-0.2,0.1,0],[0,0,0.8],[0,0,-0.8]]);
		var lowRing12 = CUBIC_HERMITE(S1)([c1,c2,[0,0.5,0],[0,0,0]]);
		var lowRing12_s1 = T([1])([0.2])(MAP(lowRing12)(domainColumn2));
		var lowRing12_s2 = S([2])([-1])(lowRing12_s1);
		var lRing =  COLOR([0.96,0.87,0.7]) (STRUCT([lowRing12_s1, lowRing12_s2]));

		var colonna = STRUCT([ base, lRing, tronco, T([1])([3.8])(base),  COLOR([0.96,0.87,0.7]) (T([1])([4])(S([1])([-1])(lRing))),
		 T([0,1,2])([-0.35,-0.5,-0.35])(CUBOID([0.7,0.5,0.7])) ]);
		return colonna;
	};//DRAW(column1());
	// cerchi
	var ornamento1 = function(){
		var domainC = DOMAIN([[0,1],[0,1]])([12,12]);
		var c1 = CUBIC_HERMITE(S0)([[0.3,0,0],[-0.3,0,0],[0,1.2,0],[0,-1.2,0]]);
		var c2 = CUBIC_HERMITE(S0)([[0.2,0,0.1],[-0.2,0,0.1],[0,0.8,0],[0,-0.8,0]]);
		var c3 = CUBIC_HERMITE(S0)([[0.2,0,0],[-0.2,0,0],[0,0.8,0],[0,-0.8,0]]);
		var lowRing12 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.5],[0,0,0]]);
		var lowRing23 = CUBIC_HERMITE(S1)([c3,c2,[0,0,0],[0,0,0]]);
		var lowRing12_s1 = STRUCT([ MAP(lowRing12)(domainC), MAP(lowRing23)(domainC) ]);
		var lowRing12_s2 = S([1])([-1])(lowRing12_s1);
		var lRing = STRUCT([lowRing12_s1, lowRing12_s2]);
		var lRingI = S([0,1,2])([1/2,1/2,1.3])(lRing);
		var c = T([1])([0.25])(S([0,1,2])([0.5,0.5,0.5])(R([1,2])([PI])(STRUCT([lRing, lRingI]))));
		return c;
	};//DRAW(ornamento1());
	// figura
	var ornamento2 = function(){
		var domainC = DOMAIN([[0,1],[0,1]])([12,12]);
		var sup = MAP(BEZIER(S1)([ BEZIER(S0)([[0.15,0,0],[-0.15,0,0],[0,0.15,0],[0,-0.15,0]]), 
			BEZIER(S0)([[0.15,0,0.05],[-0.15,0,0.05],[0,0.15,0.05],[0,-0.15,0.05]]) ]))(domainC);
		var sup2 = S([1])([-1])(sup);
		var sup3 =  MAP(BEZIER(S1)([ BEZIER(S0)([[0.15,0,0.05],[-0.15,0,0.05],[0,0.15,0.05],[0,-0.15,0.05]]), 
			BEZIER(S0)([[0.15,0,0.05],[-0.15,0,0.05],[0,-0.15,0.05],[0,0.15,0.05]]) ]))(domainC);
		var c = T([1])([0.3])(R([0,1])([-PI/2])(R([1,2])([PI])(STRUCT([ sup, sup2, sup3 ]))));
		return c;
	};//DRAW(ornamento2());
	// fasce
	var ornamento3 = function(){
		var b = CUBOID([0.03,0.5,0.05 ]);
		var c = T([2])([-0.05])(STRUCT([b, T([0])([0.06])(b), T([0])([0.12])(b)]));
		return c;
	}
	var ornamentoCentrale = function(){
		var combinazione = STRUCT( [ornamento3(), T([0])([0.355])(ornamento2()), T([0])([0.56])(ornamento3()),
			T([0])([0.905])(ornamento1()), T([0])([1.1])(ornamento3()), 
			T([0])([1.455])(ornamento2()) ,T([0])([1.66])(ornamento3()), T([0])([2.005])(ornamento1()), T([0])([2.2])(ornamento3()), T([0])([2.555])(ornamento2())
		 ]);
		var combinazione1 = T([0])([2.85])(S([0])([-1])(T([0])([-2.85])(combinazione)));
		var c = STRUCT([combinazione, combinazione1, T([0])([2.775])(ornamento3())]);
		return  COLOR([0.96,0.87,0.7]) (c);
	}; //DRAW(ornamentoCentrale());
	var ornamentoFrontale = function(){
		var combinazione = STRUCT([
				ornamento3(),
				T([0])([0.33])(ornamento2()),
				T([0])([0.51])(ornamento3()),
				T([0])([0.83])(ornamento1()),
				T([0])([1])(ornamento3())
			]);
		var combinazione1 = T([0])([1.33])(S([0])([-1])(T([0])([-1.33])(combinazione)));
		var c = STRUCT([combinazione, combinazione1, T([0])([1.33])(ornamento2()) ]);
		return c;
	};//DRAW(ornamentoFrontale());
	var ornamentoLaterale = function(){
		var combinazione = STRUCT([
			ornamento3(),
			T([0])([0.345])(ornamento2()),
			T([0])([0.54])(ornamento3()),
			T([0])([0.875])(ornamento1()),
			T([0])([1.06])(ornamento3()),
			T([0])([1.405])(ornamento2()),
			T([0])([1.6])(ornamento3()),
			T([0])([1.935])(ornamento1()),
			T([0])([2.12])(ornamento3()),
			T([0])([2.465])(ornamento2()),
			T([0])([2.66])(ornamento3()),
			T([0])([2.995])(ornamento1()),
			T([0])([3.18])(ornamento3()),
			T([0])([3.525])(ornamento2()),
			T([0])([3.72])(ornamento3()),
			T([0])([4.055])(ornamento1()),
			T([0])([4.24])(ornamento3()),
			T([0])([4.585])(ornamento2()),
			T([0])([4.78])(ornamento3())
			]);
		var combinazione1 = T([0])([4.95])(S([0])([-1])(T([0])([-4.95])(combinazione)));
		var c = R([0,2])([-PI/2])(STRUCT([combinazione,combinazione1]));
		return c;
	};//DRAW(ornamentoLaterale());

	var o1 = STRUCT([ ornamentoFrontale(), T([0])([2.65])(ornamentoLaterale())]);
	var o2 = T([2])([9.9])(S([2])([-1])(ornamentoFrontale()));
	var o12 = T([0])([2.85])(STRUCT([o1,o2]));
	var ornamenti = COLOR([0.96,0.87,0.7]) (STRUCT([o12,S([0])([-1])(o12)]));
	//DRAW(ornamenti);
	var ornamentoPorta = function(y,z){
		var domain = DOMAIN([[0,1],[0,1]])([12,12]);
		var c1 = CUBIC_HERMITE(S0)([[0,y,0],[0,-y,0],[0,0,z],[0,0,-z]]);
		var c2 = CUBIC_HERMITE(S0)([[0.05,y,0],[0.05,-y,0],[0.05,0,z],[0.05,0,-z]]);
		var c3 = BEZIER(S0)([[0,-y,0],[0,y,0]]);
		var c4 = BEZIER(S0)([[0.05,-y,0],[0.05,y,0]]);
		var forma_bassa = STRUCT([ MAP(CUBIC_HERMITE(S1)([c1,c2, [0,0,0],[0,0,0]]))(domain),
			MAP(CUBIC_HERMITE(S1)([c1,c3, [0,0,0],[0,0,0]]))(domain),
			MAP(CUBIC_HERMITE(S1)([c4,c2, [0,0,0],[0,0,0]]))(domain)
			]);
		return forma_bassa;
	};//DRAW(ornamentoPorta(0.2,0.8));
	var op = STRUCT([
		ornamentoPorta(0.2,0.8),
		T([1])([0.3])(ornamentoPorta(0.3,1.2))
		]);
	var op2 = T([0])([0.95])(op);
	var ornamentiPorta = COLOR([0.96,0.87,0.7])(STRUCT([op, op2, T([1])([0.4])(CUBOID([1,0.2,0.35]))]));
	//DRAW(ornamentiPorta);

	var cornicione = function(){
		var domainB = DOMAIN( [ [0,1], [0,1] ])([6,6]);
		var c1 =  COLOR([0.96,0.87,0.7]) (T([0,2])([-0.05,-0.05])(SIMPLEX_GRID ([ [11.1], [0.05,-0.05,0.05,-0.05,0.05,-0.4,0.05],[10] ])));
		var c2 = COLOR([1,0.94,0.86])( CUBOID([11,1,9.9]) );
		//parte di muro sporgente
		var be1 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [5.5,0,0] ]), BEZIER(S0)([ [0,0,4.95], [5.5,0,4.95] ]) ]))(domainB);
		var be2 = MAP(BEZIER(S1)([ BEZIER(S0)([ [-0.15,0.2,-0.15], [5.65,0.2,-0.15] ]), BEZIER(S0)([ [-0.15,0.2,5.1], [5.65,0.2,5.1] ]) ]))(domainB);
		var be3 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [5.5,0,0] ]), BEZIER(S0)([ [-0.15,0.2,-0.15], [5.65,0.2,-0.15] ]) ]))(domainB);
		var be4 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [-0.15,0.2,-0.15] ]), BEZIER(S0)([ [0,0,4.95], [-0.15,0.2,5.1] ]) ]))(domainB);
		var be1234 = STRUCT([be1, be2, be3, be4]);
		var be5 = T([0])([11])(S([0])([-1])(be1234));
		var be12345 = STRUCT([ be1234, be5 ]);
		var be6 = T([2])([9.9])(S([2])([-1])(be12345));
		var be = T([1])([0.8])(STRUCT([ be12345, be6 ]));
		//balconcino
		var b0 = STRUCT([ T([1])([0.2])(ornamentoCentrale()), CUBOID([5.7,1,0.4]) ]);
		var b1 = CUBOID([5.9,0.1,0.5]);

		var bez1 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [0,0.2,-0.15] ]), BEZIER(S0)([ [-2.95,0,0], [-3.1,0.2,-0.15] ]) ]))(domainB);
		var bez2 = MAP(BEZIER(S1)([ BEZIER(S0)([ [-2.95,0,0.5], [-3.1,0.2,0.5] ]), BEZIER(S0)([ [-2.95,0,0], [-3.1,0.2,-0.15] ]) ]))(domainB);
		var bez3 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0.2,0.5], [-3.1,0.2,0.5] ]), BEZIER(S0)([ [0,0.2,-0.15], [-3.1,0.2,-0.15] ]) ]))(domainB);
		var bez123 = STRUCT([ bez1, bez2, bez3 ]);
		var bez321 = S([0])([-1])(bez123);

		var b2 = T([0])([2.95])(STRUCT([ bez123, bez321 ]));

		var b_f = STRUCT([ T([0,2])([2.65,-0.4])(b0), T([0,1,2])([2.55,0.7,-0.5])(b1), T([0,1,2])([2.55,0.8,-0.5])(b2) ]);
		var b_r = T([2])([9.9])(S([2])([-1])(b_f));
		var c = STRUCT([c1,c2, be, b_r, b_f]);
		return c;
	}; //DRAW(cornicione());

/* BASEMENT: base e scalinate anteriore e posteriore */
	var base = CUBOID([11,0.5,9.9]);
	/* scalinata frontale */
	var scalaA = function (altezza, numero){ //altezza e numero gradini
		var i=0;
		var gradini=T([0,1])([-2.175-0.25*i, altezza*i])(CUBOID([4.35-0.5*i,altezza,1.5-0.25*i]));
		for (i =1; i<numero; i++){
			gradini = STRUCT([gradini, T([0,1])([-(4.35-0.5*i)/2, altezza*i])(CUBOID([4.35-0.5*i,altezza,1.5-0.25*i])) ]);
		}
		return COLOR(grigio_scuro) (gradini);
	};//DRAW(scalaA(0.2,5));
	/* scalinata retro (verso il giardino) */
	var scalaB = function (altezza, numero){ //altezza e numero gradini
		var i=0;
		var gradini=T([0,1])([-4.35/2, altezza*i])(CUBOID([4.35,altezza,1.05-0.21*i]));
		for (i =1; i<numero; i++){
			gradini = STRUCT([gradini, T([0,1])([-4.35/2, altezza*i])(CUBOID([4.35,altezza,1.05-0.21*i])) ]);
		}
		var muretto = COLOR(grigio_chiaro) (CUBOID([0.39,altezza*numero,1.05]));
		var scalinata = STRUCT([ T([0])([-(4.35/2)-0.39])(muretto), T([0])([(4.35/2)])(muretto), COLOR(grigio_scuro) (gradini) ]);
		return scalinata;
	};//DRAW(scalaB(0.2,5));
	/* basement */
	var basement = STRUCT([ base, T([0,2])([5.5,9.9])(scalaB(0.1,5)), T([0])([5.5])(R([0,2])([PI])(scalaA(0.1,5)))]);
	//DRAW(basement);

/* FIRST FLOOR: muri */
	var frontal_door = T([0])([0.05])(S([2])([-1])(door(3,1,0.1,0.1,0)));
	var frontal_window = T([2])([0.05])(S([2])([-1])(w(2,0.8,0.1,0.1,PI/3,0)));
	//laterale
	var parete1_frontale_piano1 = STRUCT([ SIMPLEX_GRID([ [3],[0.6,-2,1.4],[0.3] ]), SIMPLEX_GRID([ [1.1,-0.8,1.1], [-0.6,2], [0.3] ]) ]);
	//centrale
	var parete2_frontale_piano1 = function(){
		var c1 = STRUCT([
			 COLOR(grigio_chiaro)( STRUCT([ SIMPLEX_GRID([ [0.4,-0.8,0.8],[4],[0.3] ]),
			 SIMPLEX_GRID([ [-0.4,0.8],[0.6,-2,0.8],[0.3] ]),
			 SIMPLEX_GRID([ [-2,0.5],[-3,1],[0.3] ]) ]) ),
			 COLOR(oro) (T([2])([-0.05])(STRUCT([ SIMPLEX_GRID([[-2,0.05],[3],[0.05] ]), SIMPLEX_GRID([ [-2,1],[-3,0.05],[0.05] ]) ]))),
			 T([0,1])([0.4,0.6])(frontal_window), T([0,1])([0.8,3.4])(wc())
		 ]);
		var c2 = T([0])([5])(S([0])([-1])(c1));
		return STRUCT([c1,c2,T([0,1])([2,2.6])(S([2])([-1])(ornamentiPorta)),T([0])([1.95])(frontal_door)]);
	}//DRAW(parete2_frontale_piano1());
	var window_frontali = STRUCT([T([0,1])([1.1,0.6])(frontal_window), T([0,1])([9.1,0.6])(frontal_window) ])
	var fronte = STRUCT([ COLOR(grigio_chiaro)( STRUCT([parete1_frontale_piano1, T([0])([8])(parete1_frontale_piano1)]) ), window_frontali]) ;
	//DRAW(fronte);
	/* pareti laterali primo piano */
	var w1 = T([2])([0.8])(R([0,2])([PI/2])(S([2])([-1])(w(2,0.8,0.1,0.1, 3*PI/4,3*PI/4))));
	var window_laterali = STRUCT([ T([1,2])([0.6, 0.75])(w1), T([1,2])([0.6, 3.4])(w1), T([1,2])([0.6, 5.7])(w1), T([1,2])([0.6, 8.35])(w1) ]);
	var parete1_laterale_piano1 = STRUCT([ COLOR(grigio_chiaro)( STRUCT([ SIMPLEX_GRID([ [0.3],[0.6,-2,1.4],[9.9] ]), 
		SIMPLEX_GRID([ [0.3],[-0.6,2],[0.75,-0.8,1.85,-0.8,1.5,-0.8,1.85,-0.8,0.75] ]) ]) ), window_laterali ]);
	var parete2_laterale_piano1 = T([0,2])([11,9.9])(R([0,2])([PI])(parete1_laterale_piano1));

	var lato = STRUCT([parete1_laterale_piano1,parete2_laterale_piano1]);

	/*
	- primo piano retro
	*/
	var w2 = T([2])([0.25])(w(0.7,0.8,0.1,0.1,0,0));
	var retro_door = T([2])([0.05])(door(3,1.2,0.1,0.1,0));
	//retro-lato pareti
	var parete1_retro_piano1 = STRUCT([ COLOR(grigio_chiaro)(STRUCT([ SIMPLEX_GRID([ [3],[1.3,-0.7,2],[0.3] ]), 
		SIMPLEX_GRID([ [1.1,-0.8,1.1],[-1.3,0.7],[0.3] ]) ])), T([0,1])([1.1, 1.3])(w2) ]);
	var parete2_retro_piano1 = T([0])([8])(parete1_retro_piano1);
	var w3 = T([2])([0.8])(R([0,2])([PI/2])(w(0.7,0.8,0.1,0.1,0,0)));
	//retro-lato-interno
	var retro_lateral_door = T([0,2])([0.25,0.8])(R([0,2])([PI/2])(door(2.2,0.8,0.05,0.1,0)));
	var retro_lateral_door2 = S([0])([-1])(retro_lateral_door);
	var parete3_retro_piano1 = STRUCT([ COLOR(grigio_chiaro)( STRUCT([ SIMPLEX_GRID([ [0.3],[4],[0.65,-0.8,0.65] ]), 
		SIMPLEX_GRID([ [0.3],[-2.2,0.8,-0.7,0.3],[2.1] ]) ])), T([2])([0.65])(retro_lateral_door), T([0,1,2])([0.2,3,0.65])(w3)]);
	var parete4_retro_piano1 = R([0,2])([PI])(parete3_retro_piano1);
	var w4 = w(2,0.8,0.1,0.1,0,0);
	//retro-centrale parete
	var parete5_retro_piano1 = STRUCT([ COLOR(grigio_chiaro)(STRUCT([ SIMPLEX_GRID([ [0.55,-0.8,0.55,-1.2,0.55,-0.8,0.55],[4],[0.3] ]), SIMPLEX_GRID([ [-0.55,0.8,-2.3,0.8],[0.6,-2,1.4],[0.3] ]),
	SIMPLEX_GRID([ [-1.9,1.2],[-3,1],[0.3] ]) ])), T([0])([1.9])(retro_door), T([0,1,2])([0.55,0.6,0.2])(w4), T([0,1,2])([3.65,0.6,0.2])(w4) ]);

	var retro =  STRUCT([ T([2])([9.6])(parete1_retro_piano1), T([2])([9.6])(parete2_retro_piano1), 
		T([0,2])([2.7,7.8])(parete3_retro_piano1), T([0,2])([8.3,9.9])(parete4_retro_piano1), T([0,2])([3,7.8])(parete5_retro_piano1) ]) ;

	var p1= STRUCT([fronte, lato, retro]);//clone da usare per il secondo piano
	var colonne_piano1 = STRUCT([ T([0,2])([3,9.76])(column1()), T([0,2])([4.6,9.76])(column1()), 
		T([0,2])([6.4,9.76])(column1()), T([0,2])([8,9.76])(column1()),
		T([0])([3])(column1()), T([0])([4.6])(column1()), 
		T([0])([6.4])(column1()), T([0])([8])(column1()) ]);var colonne_piano1 = STRUCT([ T([0,2])([3,9.76])(column1()), T([0,2])([4.6,9.76])(column1()), 
		T([0,2])([6.4,9.76])(column1()), T([0,2])([8,9.76])(column1()),
		T([0])([3])(column1()), T([0])([4.6])(column1()), 
		T([0])([6.4])(column1()), T([0])([8])(column1()) ]);
	var primo_piano = STRUCT([fronte, lato, retro,T([0])([3])(parete2_frontale_piano1()), colonne_piano1]); 
	//DRAW( primo_piano );

/* FIRST CEILING */
	var balcone = function(){
		var domainB = DOMAIN( [ [0,1], [0,1] ])([6,6]);
		//parte superiore sporgente
		var be1 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0.1,-0.15], [0,0.1,0.15] ]), BEZIER(S0)([ [1.8,0.1,-0.15], [1.8,0.1,0.15] ]) ]))(domainB);
		var be2 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0.1,-0.15], [0,0,0] ]), BEZIER(S0)([ [1.8,0.1,-0.15], [1.8,0,0] ]) ]))(domainB);
		var b = COLOR(grigio_chiaro) (STRUCT([ CUBOID([ 1.8,0.1,0.15 ]),be1,be2, T([2])([-0.07])(CUBOID([1.8,0.02,0.07])) ]));
		//muretti
		var d = COLOR(grigio_scuro) (SIMPLEX_GRID([[0.5,-0.8,0.5],[0.4],[0.15] ]));
		//colonnine
		var col = COLOR(grigio_chiaro) (T([0,2])([0.05,0.075])(R([1,2])([-PI/2])(CYL_SURFACE([0.05,0.4])([32,2]))));
		
		var c = STRUCT([d,T([1])([0.4])(b), T([0])([0.58])(col), T([0])([0.76])(col), T([0])([0.94])(col), T([0])([1.12])(col)]);
		return c;
	}; //DRAW(balcone());
	var balconi = T([2])([0.05])(STRUCT([T([0,1,2])([2.9,5,-0.2])(balcone()),
		T([0,1,2])([4.6,5,-0.2])(balcone()),
		T([0,1,2])([6.3,5,-0.2])(balcone()) ]));
	var soffitto = STRUCT([ T([1])([4])( COLOR(grigio_scuro) (CUBOID([11,1,9.9]))), T([1])([4])(cornicione()), 
		balconi, T([2])([9.8])(S([2])([-1])(balconi)), T([0,1])([5.5,4.2])(ornamenti) 
		]); //DRAW(soffitto);

/* SECOND FLOOR */
	//var frontal_door2 = T([2])([0.05])(S([2])([-1])(door(2,0.7,0.1,0.1,0)));
	var frontal_door3 = T([2])([0.05])(S([2])([-1])(door(2,0.8,0.1,0.1,0)));
	var frontal_window2 = T([2])([0.05])(S([2])([-1])(w(0.7,0.8,0.1,0.1,0,0)));
	var w5 = w(0.7,0.8,0.1,0.1);
	//centrale
	var parete_frontale_piano2 = STRUCT([COLOR(grigio_chiaro) (STRUCT([ SIMPLEX_GRID([ [0.5,-0.8, 0.5],[4],[0.3] ]), 
		SIMPLEX_GRID([ [-0.5,0.8],[-2,0.8,-0.7,0.5],[0.3] ]) ])), T([0])([0.5])(frontal_door3), T([0,1])([0.5,2.8])(frontal_window2) ]);
	//laterale
	var parete1_frontale_piano2 = STRUCT([ COLOR(grigio_chiaro) (STRUCT([ SIMPLEX_GRID([ [0.4,-0.8,0.4],[4],[0.3] ]), 
		SIMPLEX_GRID([ [-0.4,0.8],[-2,0.8,-0.7,0.5],[0.3] ]) ])), T([0])([0.4])(frontal_door3), T([0,1])([0.4,2.8])(frontal_window2) ]);
	var parete2_frontale_piano2 = STRUCT( [ parete1_frontale_piano2, T([0])([3.4])(parete1_frontale_piano2) , 
		T([0])([1.6])(parete_frontale_piano2) ]);
	var colonne_piano2 = T([1])([5])(STRUCT([ T([0,2])([3,9.76])(column()), T([0,2])([4.6,9.76])(column()), 
		T([0,2])([6.4,9.76])(column()), T([0,2])([8,9.76])(column()),
		T([0])([3])(column()), T([0])([4.6])(column()), 
		T([0])([6.4])(column()), T([0])([8])(column()) ]));
	var secondo_piano = STRUCT([ T([1])([5])(p1), T([0,1])([3,5])(parete2_frontale_piano2), colonne_piano2 ]);
	//DRAW(secondo_piano);

	

/* SECOND CEILING: timpano, soffitto */
	//crea le decorazioni quadrate intorno al bordo
	var bordo = function(n,dim,t,d){
		var b = CUBOID(dim);
		for(var i=0;i<n;i++){
			b=STRUCT([b,T([d])([0.1*(i+1)])(CUBOID(dim))]);
		}
		return T([0,1,2])(t)(b);
	}

	var timpano = function(){
		var b = COLOR([0.96,0.87,0.7]) (CUBOID([2.95,0.1,5.15])); //base timpano
		var domainB = DOMAIN( [ [0,1], [0,1] ])([6,6]);
		var domainB2 = DOMAIN( [ [0,1], [0,1], [0,1] ])([6,6,6]);
		var be1 = BEZIER(S1)([ BEZIER(S0)([ [0,1.8,0], [0,2,0] ]), BEZIER(S0)([ [2.95,0,0], [3,0.2,0] ]) ]);
		var be2 = BEZIER(S1)([ BEZIER(S0)([ [0,1.8,5.15], [0,2,5.15] ]), BEZIER(S0)([ [2.95,0,5.15], [3,0.2,5.15] ]) ]);
		var be3 = COLOR([0.96,0.87,0.7]) (MAP(BEZIER(S2)([ be1,be2 ]))(domainB2));//parte superiore obliqua
		var s = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,1.8,0.2], [0,0,0.2] ]), BEZIER(S0)([ [2.95,0,0.2], [2.95,0,0.2] ]) ]))(domainB);
		var mezzo_timpano = STRUCT([b,T([1])([0.1])(STRUCT([be3,s]))
			,COLOR([0.96,0.87,0.7]) (bordo(29,[0.05,0.1,0.1],[0,-0.1,0],0 ))
			]);
		var timpano_completo = T([2])([-0.2])(STRUCT( [mezzo_timpano, S([0])([-1])(mezzo_timpano) ]));
		return STRUCT( [timpano_completo, T([2])([9.9])(S([2])([-1])(timpano_completo)) ]);
	}; //DRAW(timpano());
	var soffitto2 = function(){
		//sottotetto
		var domainB = DOMAIN( [ [0,1], [0,1] ])([6,6]);
		var be1 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [2.55,0,0] ]), BEZIER(S0)([ [0,0,4.95], [2.55,0,4.95] ]) ]))(domainB);
		var be2 = MAP(BEZIER(S1)([ BEZIER(S0)([ [-0.15,0.2,-0.15], [2.70,0.2,-0.15] ]), BEZIER(S0)([ [-0.15,0.2,5.1], [2.70,0.2,5.1] ]) ]))(domainB);
		var be3 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [2.55,0,0] ]), BEZIER(S0)([ [-0.15,0.2,-0.15], [2.70,0.2,-0.15] ]) ]))(domainB);
		var be4 = MAP(BEZIER(S1)([ BEZIER(S0)([ [0,0,0], [-0.15,0.2,-0.15] ]), BEZIER(S0)([ [0,0,4.95], [-0.15,0.2,5.1] ]) ]))(domainB);
		var be1234 = STRUCT([be1, be2, be3, be4]);
		var be5 = T([0])([11])(S([0])([-1])(be1234));
		var be12345 = STRUCT([ be1234, be5 ]);
		var be6 = T([2])([9.9])(S([2])([-1])(be12345));
		var be = COLOR([0.96,0.87,0.7]) (T([1])([0.8])(STRUCT([ be12345, be6 ])));

		var w_laterali = T([0,2])([0.25,0.8])(R([0,2])([PI/2])(w(0.5,0.8,0.1,0.1, 3*PI/4,3*PI/4)));
		//bordi dorati laterali
		var b = STRUCT([ SIMPLEX_GRID([ [0.3],[0.5],[0.75,-0.8,1.85,-0.8,0.75] ]),
			T([2])([0.75])(w_laterali),T([2])([3.4])(w_laterali),
			SIMPLEX_GRID([[0.3],[-0.5,0.5],[4.95]]),
			COLOR([0.96,0.87,0.7]) (T([2])([-0.1])(SIMPLEX_GRID([ [0.4],[-0.6,0.1,-0.2,0.1],[5.05] ])) ),
			COLOR([0.96,0.87,0.7]) (bordo(50,[0.1,0.1,0.05],[0.3,0.8,-0.1],2 ))
			]);
		var b1 = T([2])([9.9])(S([2])([-1])(b));
		var b01 = STRUCT([b1, b]);
		//bordi dorati frontali
		var w_frontali = T([2])([0.05])( S([2])([-1])(w(0.5,0.8,0.1,0.1, PI/2,3*PI/4)) );
		var c = STRUCT([
			SIMPLEX_GRID([ [1.1,-0.8,1.1],[0.5],[0.3] ]), T([0])([1.1])(w_frontali),
			SIMPLEX_GRID([[2.75],[-0.5,0.5],[0.3]]),
			COLOR([0.96,0.87,0.7]) (T([0,2])([-0.1,-0.1])(SIMPLEX_GRID([ [2.85],[-0.6,0.1,-0.2,0.1],[0.4] ])) ),
			COLOR([0.96,0.87,0.7]) (bordo(28,[0.05,0.1,0.1],[-0.1,0.8,-0.1],0 ))
			]);

		var bc = T([0])([5.2])(STRUCT([ b01,T([0])([0.3])(S([0])([-1])(c)),T([0,2])([0.3,9.9])(S([0,2])([-1,-1])(c)) ]));
		var cb = S([0])([-1])(bc);
		var retro_so = STRUCT([
			SIMPLEX_GRID([ [5.9],[1],[0.4] ]),
			COLOR([0.96,0.87,0.7]) (T([0])([-0.1])(SIMPLEX_GRID([ [6.1],[-0.4,0.1,-0.1,0.1],[0.6]])))
			 ]);
		var s = STRUCT([T([0])([5.5])(STRUCT([bc,cb])),
			T([0,2])([2.55,9.6])(retro_so),
			T([0,2])([2.55,0.3])(S([2])([-1])(retro_so)),
			T([0,1])([5.5,0.9])(timpano()),
			T([1])([0.2])(be) ]);
		return s;
	}; //DRAW(soffitto2());

/* ROOF */
	var tetto = function(){
		var domainRoof = DOMAIN( [ [0,1], [0,1] ])([6,6]);
		var domainRoof2 = DOMAIN( [ [0,1], [0,1],[0,1] ])([6,6,1]);
		var h_roof = 1.8;
		var h_roof1 = 1.5;//coordinate h e x del punto del 2° tetto
		var x_roof = 2;
		var controls1 = [ [0,0,0], [0,0,5.2] ];
		var controls2 = [[x_roof,h_roof1,0],[0,0,5.2]];
		var surf = MAP(BEZIER(S1)([ BEZIER(S0)(controls1), BEZIER(S0)(controls2) ]))(domainRoof); //facciata tetto laterale
		var controls3 = [ [5.5,h_roof1,0], [2.75,0,5.2] ];
		var surf2 = MAP(BEZIER(S1)([ BEZIER(S0)(controls3), BEZIER(S0)(controls2) ]))(domainRoof); //facciata superiore tetto laterale
		//blocco centrale
		var controls4 = [ [2.7,0,5.2], [5.7,h_roof,5.2] ];var controls41 = [ [2.7,0.1,5.2], [5.7,h_roof+0.1,5.2] ];
		var controls5 = [ [2.7,0,0], [5.7,h_roof,0] ];var controls51 = [ [2.7,0.1,0], [5.7,h_roof+0.1,0] ];
		var surf3 = MAP(BEZIER(S2)([ BEZIER(S1) ([BEZIER(S0)(controls4), BEZIER(S0)(controls5) ]),
			BEZIER(S1) ([BEZIER(S0)(controls41), BEZIER(S0)(controls51) ]) ]))(domainRoof2);
		var controls6 = [ [2.7,0,5.2], [5.7,0,5.2] ];
		var tetto1 = STRUCT([ surf, surf2, surf3 ]);
		var tetto2 = S([2])([-1])(tetto1);
		var tetto12 = STRUCT([ tetto1,tetto2]);
		var tetto3 = T([0])([11.4])(S([0])([-1])(tetto12));
		return COLOR([0.8,0.51,0.4])(STRUCT([tetto1,tetto2, tetto3]));
	}; //DRAW(tetto());




DRAW( STRUCT([primo_piano,T([1])([-0.5])(basement),soffitto,secondo_piano,  T([1])([9])(soffitto2()), T([0,1,2])([-0.2,10.2,5])(tetto()) ]));