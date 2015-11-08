(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Alert = React.createClass({
  displayName: "Alert",

  render: function render() {
    return React.createElement(
      "header",
      { className: this.props.ganador === "¡Vaya, ha habido un empate!" ? "empate" : this.props.ganador === "¡HAN GANADO LAS X!\n¡ENHORABUENA JUGADOR 1!" ? "gana_X" : "gana_0" },
      this.props.ganador
    );
  }
});

module.exports = Alert;

},{}],2:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var Alert = require('./Alert.jsx');
var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";
var GANAX = "¡HAN GANADO LAS X!\n¡ENHORABUENA JUGADOR 1!";
var GANA0 = "¡HAN GANADO L0S 0!\n¡ENHORABUENA JUGADOR 2!";
var EMPATE = "¡Vaya, ha habido un empate!";

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      turno: JUGADORX,
      valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
      gana: ""
    };
  },
  appClick: function appClick(numeroFila, numeroColumna) {
    var valores = this.state.valores;
    var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
    valores[numeroFila][numeroColumna] = nuevoValor;
    var empate = true;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (valores[i][j] === '-') {
          empate = false;
        }
      }
    }
    if (empate) {
      this.state.gana = EMPATE;
    }
    if (valores[1][1] !== '-' && (valores[1][1] === valores[0][0] && valores[1][1] === valores[2][2] || valores[1][1] === valores[2][0] && valores[1][1] === valores[0][2] || valores[1][1] === valores[1][0] && valores[1][1] === valores[1][2] || valores[1][1] === valores[0][1] && valores[1][1] === valores[2][1])) {
      this.state.gana = valores[1][1] === 'X' ? GANAX : GANA0;
    }
    if (valores[0][0] !== '-' && (valores[0][0] === valores[0][1] && valores[0][0] === valores[0][2] || valores[0][0] === valores[1][0] && valores[0][0] === valores[2][0])) {
      this.state.gana = valores[0][0] === 'X' ? GANAX : GANA0;
    }
    if (valores[2][2] !== '-' && (valores[2][2] === valores[1][2] && valores[2][2] === valores[0][2] || valores[2][2] === valores[2][1] && valores[2][2] === valores[2][0])) {
      this.state.gana = valores[2][2] === 'X' ? GANAX : GANA0;
    }
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
      valores: this.state.valores,
      gana: this.state.gana
    });
  },
  render: function render() {
    var texto;
    texto = "Turno del " + this.state.turno;
    var ganador;
    ganador = this.state.gana;
    if (ganador === "") {
      return React.createElement(
        'div',
        null,
        React.createElement(Cabecera, { texto: texto }),
        React.createElement(Tablero, { valores: this.state.valores, manejadorTableroClick: this.appClick })
      );
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement(Cabecera, { texto: texto }),
        React.createElement(Tablero, { valores: this.state.valores, manejadorTableroClick: this.appClick }),
        React.createElement(Alert, { ganador: ganador })
      );
    }
  }
});

module.exports = App;

},{"./Alert.jsx":1,"./Cabecera.jsx":3,"./Tablero.jsx":5}],3:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
  displayName: "Cabecera",

  render: function render() {
    return React.createElement(
      "header",
      { className: "cabecera" },
      this.props.texto
    );
  }
});

module.exports = Cabecera;

},{}],4:[function(require,module,exports){
'use strict';

var casillaStyle = {
  height: '100px',
  width: '100px'
};

var Casilla = React.createClass({
  displayName: 'Casilla',

  casillaClick: function casillaClick() {
    if (this.props.valor === "-") {
      this.props.manejadorCasillaClick(this.props.indiceFila, this.props.indiceColumna);
    }
  },
  render: function render() {
    return React.createElement(
      'button',
      { style: casillaStyle, className: this.props.valor === "-" ? "clickable" : this.props.valor === "X" ? "no_clickable_X" : "no_clickable_0", onClick: this.casillaClick },
      this.props.valor
    );
  }
});

module.exports = Casilla;

},{}],5:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");
var Tablero = React.createClass({
  displayName: "Tablero",

  tableroClick: function tableroClick(numeroFila, numeroColumna) {
    this.props.manejadorTableroClick(numeroFila, numeroColumna);
  },
  render: function render() {
    var casillas = this.props.valores.map((function (valoresFila, indiceFila) {
      var fila = valoresFila.map((function (valor, indiceColumna) {
        var mykey = "" + indiceFila + indiceColumna;
        return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila, indiceColumna: indiceColumna, key: mykey, manejadorCasillaClick: this.tableroClick });
      }).bind(this));
      return React.createElement(
        "div",
        { key: "fila" + indiceFila },
        fila
      );
    }).bind(this));
    return React.createElement(
      "div",
      null,
      casillas
    );
  }
});

module.exports = Tablero;

},{"./Casilla.jsx":4}],6:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");

ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":2}]},{},[6]);
