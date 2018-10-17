/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface Props {
    modalTitle: string;
    children: React.ReactNode;
    buttonLabel: string;
    buttonColor: string;
    buttonSize: string;
    buttonTooltip?: string;
    keyboard?: boolean;
    className?: string;
}

interface States {
    modal: boolean;
}

class ModalExample extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button size={this.props.buttonSize} color={this.props.buttonColor} onClick={this.toggle} data-toggle="tooltip" title={this.props.buttonTooltip}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
          <ModalBody>
              {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;