const EventEmitter = require('events').EventEmitter;

var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher.js');
var Constants = require('../constants/TresEnRayaConstants.js');
var turno = Constants.JUGADORX;
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var gana = "";
var terminado = false;
var showModal = false;

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
  getTurno: function () {
    return turno;
  },
  getValores: function () {
    return valoresTablero;
  },
  getGana: function () {
    return gana;
  },
  getTerminado: function () {
    return terminado;
  },
  getShowModal: function () {
    return showModal;
  },
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
});

TresEnRayaDispatcher.register(function (payload) {
  switch (payload.type) {
    case Constants.ActionTypes.JUGAR_POSICION:
      let nuevoValor = terminado ? valoresTablero[payload.x][payload.y]:(turno === Constants.JUGADORX ? 'X' : '0');
      turno = terminado ? Constants.TERMINADO:(turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX);
      valoresTablero[payload.x][payload.y] = nuevoValor;
      let empate = true;
      for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
          if (valoresTablero[i][j] === '-') {
            empate = false;
          }
        }
      }
      if (terminado===false) {
        if (empate) {
          gana = Constants.EMPATE;
          showModal = true;
        }
        if ( (valoresTablero[1][1] !== '-') &&
             ( (valoresTablero[1][1] === valoresTablero[0][0] && valoresTablero[1][1] === valoresTablero[2][2]) ||
               (valoresTablero[1][1] === valoresTablero[2][0] && valoresTablero[1][1] === valoresTablero[0][2]) ||
               (valoresTablero[1][1] === valoresTablero[1][0] && valoresTablero[1][1] === valoresTablero[1][2]) ||
               (valoresTablero[1][1] === valoresTablero[0][1] && valoresTablero[1][1] === valoresTablero[2][1]) )
           ) {
              gana = valoresTablero[1][1] === 'X' ? Constants.GANAX:Constants.GANA0;
              showModal = true;
        }
        if ( (valoresTablero[0][0] !== '-') &&
             ( (valoresTablero[0][0] === valoresTablero[0][1] && valoresTablero[0][0] === valoresTablero[0][2]) ||
               (valoresTablero[0][0] === valoresTablero[1][0] && valoresTablero[0][0] === valoresTablero[2][0]) )
           ) {
              gana = valoresTablero[0][0] === 'X' ? Constants.GANAX:Constants.GANA0;
              showModal = true;
        }
        if ( (valoresTablero[2][2] !== '-') &&
             ( (valoresTablero[2][2] === valoresTablero[1][2] && valoresTablero[2][2] === valoresTablero[0][2]) ||
               (valoresTablero[2][2] === valoresTablero[2][1] && valoresTablero[2][2] === valoresTablero[2][0]) )
           ) {
              gana = valoresTablero[2][2] === 'X' ? Constants.GANAX:Constants.GANA0;
              showModal = true;
        }
      }
      TresEnRayaStore.emitChange();
      break;
    case Constants.ActionTypes.REINICIO:
      turno = Constants.JUGADORX;
      for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
          valoresTablero[i][j] = '-';
        }
      }
      gana = "";
      terminado = false;
      TresEnRayaStore.emitChange();
      break;
    case Constants.ActionTypes.CLOSEMODAL:
      terminado = true;
      turno = Constants.TERMINADO;
      gana = "";
      showModal = false;
      TresEnRayaStore.emitChange();
      break;
  }
});

module.exports = TresEnRayaStore;
