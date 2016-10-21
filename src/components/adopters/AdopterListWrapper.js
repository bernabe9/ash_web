import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as consts from '../../constants/apiConstants.js';
import * as adopterActions from '../../actions/adopterActions';
import AdopterListHeader from './AdopterListHeader';
import AdopterList from './AdopterList';
import '../../styles/animal-list.scss';
import { Tabs, Tab } from 'react-bootstrap';

class AdopterListWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAdopterId: '',
      loading: true,
      loadingList: true,
      currPage: 1,
      showBlacklist: false,
      rows: consts.ADOPTER_PAGE_SIZE,
      tabKey: 1
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.onToggleSearch = this.onToggleSearch.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    let filter = { blacklisted: false };
    this.props.actions.loadAdopters(rows, currPage, filter);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, loadingList: false });
    if (nextProps.adopters.firstPage) {
      this.setState({ currPage: 1 });
    }
  }

  componentWillUnmount() {
    this.props.actions.cleanAdopters();
  }

  onClick(adopterId) {
    const equalsId = this.state.selectedAdopterId === adopterId.toString();
    this.setState({ selectedAdopterId: equalsId ? '' : adopterId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let { adopters } = this.props;
    let nextPage = currPage + 1;
    this.setState({ currPage: nextPage, loading: true });
    this.props.actions.loadAdopters(rows, nextPage, adopters.filterParam);
  }

  onToggleSearch() {
    let { rows, showBlacklist } = this.state;
    let { filterParam } = this.props.adopters;
    let filter = Object.assign({}, filterParam);
    if (!showBlacklist) {
      filter.blacklisted = true;
    } else {
      filter.blacklisted = false;
    }
    this.setState({ showBlacklist: !showBlacklist, loadingList: true, currPage: 1 });
    this.props.actions.loadAdopters(rows, 1, filter);
  }

  startLoading() {
    this.setState({ loadingList: true });
  }

  handleSelect(tabKey) {
    if (tabKey != this.state.key) {
      this.setState({ tabKey });
      let { rows } = this.state;
      let { filterParam } = this.props.adopters;
      let filter = Object.assign({}, filterParam);
      filter.blacklisted = tabKey === 2;
      this.setState({ loadingList: true, currPage: 1 });
      this.props.actions.loadAdopters(rows, 1, filter);
    }
  }

  render() {
    const { adopters } = this.props;
    const showViewMore = this.state.currPage < adopters.totalPages;
    const tabContent = (
     <AdopterList adopters={adopters.adopters}
                onClick={this.onClick}
                selectedAdopterId={this.state.selectedAdopterId}
                showViewMore={showViewMore}
                onClickViewMore={this.onClickViewMore}
                loading={this.state.loading}
                loadingList={this.state.loadingList}/>);

    return (
      <div className="general-list">
        <AdopterListHeader startLoading={this.startLoading} />
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="AdopterList" animation={false}>
          <Tab eventKey={1} title="Adoptantes">{tabContent}</Tab>
          <Tab eventKey={2} title="Lista Negra">{tabContent}</Tab>
        </Tabs>
      </div>
    );
  }
}

const { object } = PropTypes;

AdopterListWrapper.propTypes = {
  adopters: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  adopters: state.adopters
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdopterListWrapper);
