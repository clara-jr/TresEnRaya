import { Button } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

const reinicioStyle = {
  height: '50px',
  width: '100px',
  margin: '20px'
};

let Reinicio = React.createClass({
  reinicioClick: function(){
    this.props.manejadorReinicioClick();
  },
  render: function(){
   return (
    <Button bsStyle="primary" style={reinicioStyle} onClick={this.reinicioClick}>
      Reiniciar
    </Button>
   )
  }
});

module.exports = Reinicio;
