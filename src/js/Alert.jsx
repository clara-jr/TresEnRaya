var Alert = React.createClass({
  render: function(){
    return (
      <header className="cabecera">
        {this.props.ganador}
      </header>
    )
  }
});

module.exports = Alert;
