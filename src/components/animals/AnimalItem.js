import React, { PropTypes } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router';
import MiniInfoPerfil from './MiniInfoPerfil';
import '../../styles/animal-perfil.scss';

const AnimalItem = ({ animal, selectedAnimalId, onClick }) => {

  const focusedbutton = (<i className="material-icons arrow-button">arrow_drop_up</i>);
  const unfocusedbutton = (<i className="material-icons arrow-button">arrow_drop_down</i>);
  const showAnimal = selectedAnimalId === animal.id.toString();
  const adopt = (<div className="adopted-animal"> ADOPTADO </div>);
  const notAdopt = (<div className="not-adopted-animal"> EN ADOPCIÓN </div>);

  return (
    <div>
      <div className={showAnimal ? 'selected-item-container' :'animal-item-container'}>
        <button className="button-show" onClick={() => onClick(animal.id)}>
          {showAnimal ? focusedbutton : unfocusedbutton}
        </button>
        <div className="animal-name">{animal.name}</div>
        <div className="animal-state not-so-dark-grey-color"> {animal.species} </div>
        <div className="animal-state"> {animal.id % 2 === 1 ? adopt : notAdopt} </div>
        <div className="view-info-icon">
          <Link className="link-style" to={`/animales/${animal.id}`}>
            <i className="material-icons dark-grey-color">description</i>
          </Link>
        </div>
      </div>
      <Collapse in={showAnimal}>
        <div className="center-me">
            <MiniInfoPerfil animal={animal} />
        </div>
      </Collapse>
    </div>
  );
};

const { object, string, func } = PropTypes;

AnimalItem.propTypes = {
  animal: object.isRequired,
  selectedAnimalId: string.isRequired,
  onClick: func.isRequired
};

export default AnimalItem;
