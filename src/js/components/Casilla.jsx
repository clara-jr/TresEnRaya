var React = require('react');
var ReactDOM = require('react-dom');

var TresEnRayaActions = require('../actions/TresEnRayaActions');

const casillaStyle = {
  height: '100px',
  width: '100px'
};

let Casilla = React.createClass({
  casillaClick: function(){
    if (this.props.valor==="-") {
      TresEnRayaActions.jugarPosicion(this.props.indiceFila, this.props.indiceColumna);
    }
  },
  render: function(){
   return (
    <button style={casillaStyle} className={this.props.valor==="-" ? (this.props.terminado ? "no_clickable":"clickable"):(this.props.valor==="X" ? "no_clickable_X":"no_clickable_0")} onClick={this.casillaClick}>
      {this.props.valor}
    </button>
   )
  }
});

module.exports = Casilla;
