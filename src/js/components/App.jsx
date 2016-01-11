var React = require('react');
var ReactDOM = require('react-dom');

const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Alert = require('./Alert.jsx');
const Reinicio = require('./Reinicio.jsx');

var TresEnRayaStore = require('../stores/TresEnRayaStores.js');
function getAppStateFromStore() {
  return {
    turno: TresEnRayaStore.getTurno(),
    valores: TresEnRayaStore.getValores(),
    gana: TresEnRayaStore.getGana(),
    terminado: TresEnRayaStore.getTerminado(),
    showModal: TresEnRayaStore.getShowModal()
  };
}

var App = React.createClass({
  getInitialState: function(){
    return getAppStateFromStore();
  },
  componentDidMount() {
    TresEnRayaStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    TresEnRayaStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getAppStateFromStore());
  },
  render: function(){
    var texto;
    texto = this.state.turno;
    var ganador;
    ganador = this.state.gana;
    return(
        <div>
          <Cabecera texto={texto}/>
          <Tablero terminado={this.state.terminado} valores={this.state.valores}/>
          <Reinicio/>
          <Alert ganador={ganador} showModal={this.state.showModal}/>
        </div>
    )
  }
});

module.exports = App;
