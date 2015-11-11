var Alert = React.createClass({
  render: function(){
    alert(this.props.ganador);
    return (
      <header className={this.props.ganador==="¡Vaya, ha habido un empate!" ? "empate":
      (this.props.ganador==="¡HAN GANADO LAS X!\n¡ENHORABUENA JUGADOR 1!" ? "gana_X":"gana_0")}>
        {this.props.ganador} Pulsa reiniciar para la revancha
      </header>
    )
  }
});

module.exports = Alert;
