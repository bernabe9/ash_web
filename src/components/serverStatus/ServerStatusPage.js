import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as serverStatusActions from '../../actions/serverStatusActions';
import '../../styles/server-status.scss';
import { Label } from 'react-bootstrap';

class ServerStatusPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { serverStatus } = this.props;
    let online = serverStatus.online ? 'Conectado' : 'No conectado';
    let statusClass = serverStatus.online ? 'success' : 'danger';
    return (
      <div className="status-container">
        <span>Estado del servidor: </span>
        <Label bsStyle={statusClass}>{online}</Label>
      </div>
    );
  }
}

const { object } = PropTypes;

ServerStatusPage.propTypes = {
  serverStatus: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ serverStatus: state.serverStatus });

const mapDispatch = (dispatch) => ({ actions: bindActionCreators(serverStatusActions, dispatch) });

export default connect(mapState, mapDispatch)(ServerStatusPage);
