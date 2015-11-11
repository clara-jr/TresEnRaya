var Alert = React.createClass({
  render: function(){
    alert(this.props.ganador);
    return (
      <span>Pulsa reiniciar para la revancha</span>
    )
  }
});

module.exports = Alert;
