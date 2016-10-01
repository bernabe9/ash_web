import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';
import EventItem from "./EventItem";
import '../../styles/animal-list.scss';

const EventList = ({ events, onClick, selectedEventId, showViewMore, onClickViewMore, loading }) => {
  const spinner = (<div className="spinner"> <Spinner spinnerName="three-bounce" noFadeIn /> </div>);
  return (
    <div className="m-right30">
      <div className="titles-container">
        <div className="title-inside">EVENTO</div>
        <div className="title-inside">FECHA</div>
      </div>
      { events.events.map(event => {
        return (
          <EventItem event={event} key={event.id}
                                      selectedEventId={selectedEventId}
                                      onClick={onClick}/>
        );
      })}
      <div className="view-more-container">
        {loading ? spinner : showViewMore ?
        <button className="button-show view-more-button" onClick={onClickViewMore}> Ver Más </button>: ''}
      </div>
    </div>
  );
};

const { object, func, string, bool } = PropTypes;

EventList.propTypes = {
  events: object.isRequired,
  onClick: func.isRequired,
  onClickViewMore: func,
  selectedEventId: string.isRequired,
  showViewMore: bool,
  loading: bool.isRequired
};

export default EventList;