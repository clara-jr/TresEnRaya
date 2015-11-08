const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Alert = require('./Alert.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";
const GANAX = "¡HAN GANADO LAS X!\n¡ENHORABUENA JUGADOR 1!";
const GANA0 = "¡HAN GANADO L0S 0!\n¡ENHORABUENA JUGADOR 2!";
const EMPATE = "¡Vaya, ha habido un empate!";

var App = React.createClass({
  getInitialState: function(){
    return {
      turno: JUGADORX,
      valores: [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
      ],
      gana: ""
    };
  },
  appClick: function(numeroFila, numeroColumna){
    let valores = this.state.valores;
    let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
    valores[numeroFila][numeroColumna] = nuevoValor;
    let empate = true;
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        if (valores[i][j] === '-') {
          empate = false;
        }
      }
    }
    if (empate) {
      this.state.gana = EMPATE;
    }
    if ( (valores[1][1] !== '-') &&
         ( (valores[1][1] === valores[0][0] && valores[1][1] === valores[2][2]) ||
           (valores[1][1] === valores[2][0] && valores[1][1] === valores[0][2]) ||
           (valores[1][1] === valores[1][0] && valores[1][1] === valores[1][2]) ||
           (valores[1][1] === valores[0][1] && valores[1][1] === valores[2][1]) )
       ) {
          this.state.gana = valores[1][1] === 'X' ? GANAX:GANA0;
    }
    if ( (valores[0][0] !== '-') &&
         ( (valores[0][0] === valores[0][1] && valores[0][0] === valores[0][2]) ||
           (valores[0][0] === valores[1][0] && valores[0][0] === valores[2][0]) )
       ) {
          this.state.gana = valores[0][0] === 'X' ? GANAX:GANA0;
    }
    if ( (valores[2][2] !== '-') &&
         ( (valores[2][2] === valores[1][2] && valores[2][2] === valores[0][2]) ||
           (valores[2][2] === valores[2][1] && valores[2][2] === valores[2][0]) )
       ) {
          this.state.gana = valores[2][2] === 'X' ? GANAX:GANA0;
    }
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
      gana: this.state.gana
    });
  },
  render: function(){
    var texto;
    texto = "Turno del " + this.state.turno;
    var ganador;
    ganador = this.state.gana;
    if (ganador === "") {
      return(
          <div>
            <Cabecera texto={texto}/>
            <Tablero valores={this.state.valores} manejadorTableroClick={this.appClick}/>
          </div>
      )
    }
    else {
      return(
          <div>
            <Cabecera texto={texto}/>
            <Tablero valores={this.state.valores} manejadorTableroClick={this.appClick}/>
            <Alert ganador={ganador}/>
          </div>
      )
    }
  }
});

module.exports = App;
