import React, { Component, PropTypes } from 'react';
import AddEventModal from '../../../containers/modal/AddEventModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class AddEventButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { showModal: false };
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onClose() {
    this.setState({ showModal: false });
  }

  onOpen() {
    this.setState({ showModal: true });
  }

  render() {
    let { userPermission } = this.props;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
                      <div>
                        <button className="button-add-images" data-tip data-for="add-event" onClick={this.onOpen}>
                          <Icon className="add-button orange-color" name="plus-circle"/>
                        </button>
                        <ReactTooltip id="add-event" delayShow={500} place="left" type="warning" effect="solid">
                          {message.TOOLTIP_ADD_ANIMAL_EVENT}
                        </ReactTooltip>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <AddEventModal onClose={this.onClose} animalId={this.props.animalId} />
                        </Modal>
                      </div>
                    );

    return (
      <div>
        { showButton ? button : '' }
      </div>
    );
  }
}

const { string } = PropTypes;

AddEventButton.propTypes = {
  userPermission: string.isRequired,
  animalId: string.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(AddEventButton);
