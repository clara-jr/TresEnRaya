const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Alert = require('./Alert.jsx');
const Reinicio = require('./Reinicio.jsx');
const JUGADORX = "Turno del jugador 1 - las X";
const JUGADOR0 = "Turno del jugador 2 - los 0";
const TERMINADO = "¡El juego ha terminado! Pulsa reiniciar para la revancha";
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
      gana: "",
      terminado: false
    };
  },
  setInitialState: function(){
    this.state.turno = JUGADORX;
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        this.state.valores[i][j] = '-';
      }
    }
    this.state.gana = "";
    this.state.terminado = false;
    this.setState({
      turno: this.state.turno,
      valores: this.state.valores,
      gana: this.state.gana,
      terminado: this.state.terminado
    });
  },
  appClick: function(numeroFila, numeroColumna){
    let valores = this.state.valores;
    let nuevoValor = this.state.terminado ? valores[numeroFila][numeroColumna]:(this.state.turno === JUGADORX ? 'X':'0');
    valores[numeroFila][numeroColumna] = nuevoValor;
    let empate = true;
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        if (valores[i][j] === '-') {
          empate = false;
        }
      }
    }
    if (this.state.terminado===false) {
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
    }
    this.setState({
      turno: this.state.terminado ? TERMINADO:(this.state.turno === JUGADORX ? JUGADOR0:JUGADORX),
      valores: this.state.valores,
      gana: this.state.gana,
      terminado: this.state.terminado
    });
  },
  render: function(){
    var texto;
    texto = this.state.turno;
    var ganador;
    ganador = this.state.gana;
    if (ganador === "") {
      return(
          <div>
            <Cabecera texto={texto}/>
            <Tablero terminado={this.state.terminado} valores={this.state.valores} manejadorTableroClick={this.appClick}/>
            <Reinicio manejadorReinicioClick={this.setInitialState}/>
          </div>
      )
    }
    else {
      this.state.terminado = true;
      this.state.turno = TERMINADO;
      this.state.gana = "";
      this.setState({
        turno: this.state.turno,
        gana: this.state.gana,
        terminado: this.state.terminado
      });
      return(
          <div>
            <Cabecera texto={texto}/>
            <Tablero terminado={this.state.terminado} valores={this.state.valores} manejadorTableroClick={this.appClick}/>
            <Reinicio manejadorReinicioClick={this.setInitialState}/>
            <Alert ganador={ganador}/>
          </div>
      )
    }
  }
});

module.exports = App;
