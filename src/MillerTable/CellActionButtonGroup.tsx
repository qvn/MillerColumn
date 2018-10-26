import * as React from 'react';
import { ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faCopy, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'reactstrap/lib/Button';
// TODO: refactor into two different component instead of one for both dropdown and icon button groups
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
    // TODO: tool tips in reactjs and avoid hard coding
    return (
      <ButtonGroup>
        {(this.props.hasView) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size} data-toggle="tooltip" data-placement="top" title="View Details"><FontAwesomeIcon icon={faEye} /></Button>}
        {(this.props.hasEdit) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size} data-toggle="tooltip" data-placement="top" title="Edit Details"><FontAwesomeIcon icon={faPencilAlt} /></Button>}
        {(this.props.hasDelete) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size} data-toggle="tooltip" data-placement="top" title="Delete Item"><FontAwesomeIcon icon={faTrashAlt} /></Button>}
        {(this.props.hasCopy) && (!this.props.hideAll) && <Button color={this.props.color} size={this.props.size} data-toggle="tooltip" data-placement="top" title="Copy Item and All Children"><FontAwesomeIcon icon={faCopy} /></Button>}
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

interface CellActionButtonProps {
  style?: string;
  size?: string;
  color?: string;
  className?: string;
  hidden?: boolean;
  onClick?: Function;
}

interface DeleteBtnProps extends CellACtionButtonGroupProps {
  index: number;
  // onClick: (index: number) => Function;
  onClick: Function;
}

export function DeleteCellBtn (props: DeleteBtnProps) {
  function handleClick () {
    console.log('delete' + props.index.toString());
    props.onClick(props.index);
  }
  return (
        <Button 
          size={props.size} 
          color={props.color} 
          data-toggle="tooltip" 
          data-placement="top" 
          title="View Details"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
  );
}

export function ViewCellBtn (props: CellActionButtonProps) {
  return (
    <Button 
      color={props.color} 
      size={props.size} 
      data-toggle="tooltip" 
      data-placement="top" 
      title="View Details"
    >
        <FontAwesomeIcon icon={faEye} />
    </Button>
  );
}

export function EditCellBtn(props: CellActionButtonProps) {
  return (
    <Button color={props.color} size={props.size} data-toggle="tooltip" data-placement="top" title="View Details"><FontAwesomeIcon icon={faPencilAlt} /></Button>
  );
}

export function CopyCellBtn(props: CellActionButtonProps) {
  return (
    <Button color={props.color} size={props.size} data-toggle="tooltip" data-placement="top" title="View Details"><FontAwesomeIcon icon={faCopy} /></Button>
  );
}

export function NewCellBtn(props: CellActionButtonProps) {

  function handleClick () {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <Button 
      color={props.color} 
      size={props.size} 
      onClick={handleClick}
      data-toggle="tooltip" 
      data-placement="top" 
      title="View Details"
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
}
