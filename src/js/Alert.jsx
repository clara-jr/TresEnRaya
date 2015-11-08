var Alert = React.createClass({
  render: function(){
    return (
      <header className="resultado">
        {this.props.ganador}
      </header>
    )
  }
});

module.exports = Alert;
