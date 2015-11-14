import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Header } from 'react-bootstrap';
import { Footer } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

var Alert = React.createClass({
  close() {
    this.props.manejadorCloseModal();
  },
  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.ganador}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.close}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = Alert;
