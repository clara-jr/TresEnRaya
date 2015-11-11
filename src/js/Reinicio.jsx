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
    <button style={reinicioStyle} onClick={this.reinicioClick}>
      Reiniciar
    </button>
   )
  }
});

module.exports = Reinicio;
