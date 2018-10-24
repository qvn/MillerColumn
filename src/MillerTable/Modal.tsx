/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import * as React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

interface Props {
    isOpen: boolean;
    toggleModal: Function;
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

export class Modal2 extends React.Component<Props, States> {
  constructor (props: Props) {
    super(props); 
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler () {
    this.props.toggleModal();
  }

  render () {
    return (
      <Modal isOpen={this.props.isOpen} className={this.props.className}>
          <ModalHeader >{this.props.modalTitle}</ModalHeader>
          <ModalBody>
              {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.clickHandler}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.clickHandler} >Cancel</Button>
          </ModalFooter>
       </Modal>
    );
  }
}

interface ModalContentProps {
  input: [string, string][];
}
export function NodeModal(props: ModalContentProps) {
  return (
    <div>
      {props.input.map((l, index) => 
    <FormGroup key={index}>
        <Label for="exampleText">{l[0]}</Label>
        <Input type="text" name="name" id={'Name'} placeholder={l[1]} />
    </FormGroup>
      )}</div>
  );
}
