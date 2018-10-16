import * as React from 'react';
import { ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import Button from 'reactstrap/lib/Button';

interface CellACtionButtonGroupProps {
  hasView?: boolean;
  hasDelete?: boolean;
  hasEdit?: boolean;
  hasCopy?: boolean;
  style?: string;
  size?: string;
  color?: string;
  className?: string;
  hideAll?: boolean;
}

interface CellActionButtonGroupStates {
  dropdownOpen: boolean;
}

export class CellActionButtonGroup extends React.Component<CellACtionButtonGroupProps, CellActionButtonGroupStates> {
  constructor(props: CellACtionButtonGroupProps) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  dropdownGroup () {
    // TODO: further abstration is possible here. 
    const deleteBtn = (this.props.hasDelete) ? (<DropdownItem color={this.props.color} size={this.props.size}>Delete</DropdownItem>) : '';
    const editBtn = (this.props.hasEdit) ? (<DropdownItem color={this.props.color} size={this.props.size}>Edit</DropdownItem>) : '';
    const copyBtn = (this.props.hasCopy) ? (<DropdownItem color={this.props.color} size={this.props.size}>Copy</DropdownItem>) : '';
    const viewBtn = (this.props.hasView) ? (<DropdownItem color={this.props.color} size={this.props.size}>View</DropdownItem>) : '';
    return (
    <ButtonGroup>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret={true} color={this.props.color} size={this.props.size}>
                  Action
                </DropdownToggle>
                <DropdownMenu>
                  {deleteBtn}
                  {editBtn}
                  {copyBtn}
                  {viewBtn}
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
    );
  }

  iconGroup () {
    // TODO: tool tips
    return (
      <ButtonGroup>
        {(this.props.hasDelete) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size}><FontAwesomeIcon icon={faTrashAlt} /></Button>}
        {(this.props.hasEdit) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size}><FontAwesomeIcon icon={faPencilAlt} /></Button>}
        {(this.props.hasCopy) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size}><FontAwesomeIcon icon={faCopy} /></Button>}
        {(this.props.hasView) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size}><FontAwesomeIcon icon={faEye} /></Button>}
      </ButtonGroup>
    );
  }

  render() {
      if (this.props.style === 'dropdown') {
        return (
          this.dropdownGroup()
        );
      } else {
        return (
          this.iconGroup()
        );
      }
    }
  }