var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher.js');
var Constants = require('../constants/TresEnRayaConstants.js');

module.exports = {
  jugarPosicion: function(x,y) {
    TresEnRayaDispatcher.dispatch({
      type : Constants.ActionTypes.JUGAR_POSICION,
      x : x,
      y : y
    });
  },
  reinicio: function() {
    TresEnRayaDispatcher.dispatch({
      type : Constants.ActionTypes.REINICIO
    });
  },
  closeModal: function() {
    TresEnRayaDispatcher.dispatch({
      type : Constants.ActionTypes.CLOSEMODAL
    });
  }
};
