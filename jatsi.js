window.onbeforeunload = function(e) {
   return 'Sure?';
};

var inputs = [[],[],[],[]];
var plus = [];
var button_divs = [];
var buttons = [];

var currentElement;

var current_layout = 0;
var button_layouts = [
	{"1":1,"2":2,"3":3,"4":4,"5":5},//Ykköset
	{"2":2,"4":4,"6":6,"8":8,"10":10},//Kakkoset
	{"3":3,"6":6,"9":9,"12":12,"15":15},//Kolmoset
	{"4":4,"8":8,"12":12,"16":16,"20":20},//Neloset
	{"5":5,"10":10,"15":15,"20":20,"25":25},//Vitoset
	{"6":6,"12":12,"18":18,"24":24,"30":30},//Kutoset
	
	{"2":2,"4":4,"6":6,"8":8,"10":10,"12":12},//Pari
	{"3":3,"6":6,"9":9,"12":12,"15":15,"18":18},//Kolme samaa
	{"4":4,"8":8,"12":12,"16":16,"20":20,"24":24},//Neljä samaa
	{"15":15},//Pieni suora
	{"20":20},//Iso suora
	{"50":50}//Jatsi
];
var button_layout_13 = ["1","2","3","4","5","6","7","8","9"];

for(var x = 0; x < 4; x++) {
	for(var x2 = 0; x2 < 19; x2++) {
		inputs[x][x2] = document.getElementById(x + "_" + x2);
	}
	plus[x] = document.getElementById("plus_" + x);
}

button_divs[0] = document.getElementById("buttons_left");

for(var x = 0; x < 12; x++) {
	buttons[x] = document.getElementById("button_" + x);
}

//*****************************************************

function loadLayoutArray(array) {
	var current_button = 0;
	for(var key in array) {
		buttons[current_button].style.visibility = "visible";
		buttons[current_button].innerHTML = key;
		current_button++;
	}
}

function hideButtons() {
	for(var x = 0; x < 9; x++) {
		buttons[x].style.visibility = "hidden";
		buttons[x].style.visibility = "hidden";
	}
}

function loadLayout13() {
	for(var x = 0; x < 9; x++) {
		buttons[x].style.visibility = "visible";
		buttons[x].innerHTML = button_layout_13[x];
	}
}

function _loadLayout(layout) {
	current_layout = layout;
	hideButtons();
	
	if(layout == 0) {
		button_divs[0].style.visibility = "hidden";
	} else {
		button_divs[0].style.visibility = "visible";
	}
	
	switch(layout) {
		case 1: loadLayoutArray(button_layouts[0]); break;
		case 2: loadLayoutArray(button_layouts[1]); break;
		case 3: loadLayoutArray(button_layouts[2]); break;
		case 4: loadLayoutArray(button_layouts[3]); break;
		case 5: loadLayoutArray(button_layouts[4]); break;
		case 6: loadLayoutArray(button_layouts[5]); break;
		
		case 7: loadLayoutArray(button_layouts[6]); break;
		case 8: loadLayoutArray(button_layouts[7]); break;
		case 9: loadLayoutArray(button_layouts[8]); break;
		case 10: loadLayoutArray(button_layouts[9]); break;
		case 11: loadLayoutArray(button_layouts[10]); break;
		case 12: loadLayoutArray(button_layouts[11]); break;
		case 13: loadLayout13(); break;
	}
}

_loadLayout(0);

function processButtonPress(button, input) {
	if(button.innerHTML == "_") {
		input.value = "";
	} else if(button.innerHTML == "-") {
		input.value = "-";	
	} else if(current_layout != 13) {
		if(button.innerHTML == "0") {
			input.value = "0";
			return;
		}
		var arr = button_layouts[current_layout-1];
		for(var key in arr)
		{
			if(key == button.innerHTML) {
				input.value = arr[key];
			}			
		}
	} else {
		input.value = input.value + button.innerHTML;
	}
}

function loadLayout() {
	if(currentElement != null) {
		var e = parseInt(currentElement.id.split("_")[1]);
		switch(e) {
			case 0: _loadLayout(0); break;
			case 1: _loadLayout(1); break;
			case 2: _loadLayout(2); break;
			case 3: _loadLayout(3); break;
			case 4: _loadLayout(4); break;
			case 5: _loadLayout(5); break;
			case 6: _loadLayout(6); break;
			case 9: _loadLayout(7); break;
			case 10: _loadLayout(13); break;
			case 11: _loadLayout(8); break;
			case 12: _loadLayout(9); break;
			case 13: _loadLayout(10); break;
			case 14: _loadLayout(11); break;
			case 15: _loadLayout(13); break;
			case 16: _loadLayout(13); break;
			case 17: _loadLayout(12); break;
		}	
	}
}

function onButtonPress(button) {
	processButtonPress(button, currentElement);
	calc();
}

//*****************************************************

function changeCurrentElement(newElement) {
	if(currentElement != null) {
		currentElement.style.backgroundColor = "#4b4b4b";
	}
	currentElement = newElement;
	currentElement.style.backgroundColor = "#323232";
}

function onElementClick(e)
{
	changeCurrentElement(e);
	loadLayout();
}

//*****************************************************

function calcTop(player) {
	var total = 0;
	for(var x = 1; x < 7; x++) {
		total += TryParseInt(inputs[player][x].value, 0);
	}
	return total;
}

function calcPlus(player) {
	var total = 0;
	for(var x = 1; x < 7; x++) {
		if(inputs[player][x].value != "") {
			total = total + -x*3 + TryParseInt(inputs[player][x].value, 0);
		}
	}
	return total;
}

function countFilledTop(player) {
	var total = 0;
	for(var x = 1; x < 7; x++) {
		if(inputs[player][x].value != "") {
			total++;
		}
	}
	return total;
}

function calcTotal(player) {
	let asdtotal = 0;
	for(var x = 7; x < 18; x++) {
		asdtotal += TryParseInt(inputs[player][x].value, 0);
	}
	return asdtotal;
}

function calcPlayer(player) {
	var top = calcTop(player);
	let asdplus = calcPlus(player);

	inputs[player][7].value = (top != 0) ? top : "";
	inputs[player][8].value = (top >= 63) ? "50" : ((countFilledTop(player) == 6) ? "-" : "");
	if(asdplus == 0) {
	    plus[player].innerText = "";
	}  else if(asdplus > 0) {
	    plus[player].innerText = "+" + asdplus;
	} else {
	    plus[player].innerText = asdplus;
	}
	
	var total = calcTotal(player);
	inputs[player][18].value = (total != 0) ? total : "";
}

function calc() {
	for(var x = 0; x < 4; x++) {
		calcPlayer(x);
	}
	calcTurn();
}

calc();

//*****************************************************

function calcNotEmpties(player) {
	var retValue = 0;
	for(var x = 1; x < 7; x++) {
		if(inputs[player][x].value != "") {
			retValue++;
		}
	}
	for(var x = 9; x < 18; x++) {
		if(inputs[player][x].value != "") {
			retValue++;
		}
	}
	return retValue;
}

function calcNumPlayers() {
	var retValue = 0;
	for(var x = 0; x < 4; x++) {
		if(inputs[x][0].value != "") {
			retValue++;
		}
	}
	return retValue;
}

function calcTurn() {
	var turn = null;
	var numplayers = calcNumPlayers();
	
	if(numplayers >= 1) {
		turn = 0;
	}
	if(numplayers >= 2) {
		if(calcNotEmpties(1) < calcNotEmpties(0)) {
			turn = 1;
		}
	}
	if(numplayers >= 3) {
		if(calcNotEmpties(2) < calcNotEmpties(1)) {
			turn = 2;
		}
	}
	if(numplayers >= 4) {
		if(calcNotEmpties(3) < calcNotEmpties(2)) {
			turn = 3;
		}
	}

	for(var x = 0; x < 4; x++) {
		inputs[x][0].style.color = "#ffffff";
	}
	if(turn != null) {
		inputs[turn][0].style.color = "red";
	}
	
}

//*****************************************************

function TryParseInt(str,defaultValue) {
     var retValue = defaultValue;
     if(str !== null) {
         if(str.length > 0) {
             if (!isNaN(str)) {
                 retValue = parseInt(str);
             }
         }
     }
     return retValue;
}


