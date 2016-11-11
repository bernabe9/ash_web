import React, { PropTypes } from 'react';
import AddAnimalButton from './AddAnimalButton.js';
import { ButtonGroup } from 'react-bootstrap';

const AnimalListHeader = ({ exportXLS, exportPDF, animalsLength }) => {
  return (
    <div className="animal-header">
      <div className="float-left">
        <p>LISTADO</p>
      </div>
      <ButtonGroup>
        <button
          className="btn btn-export bg-orange-color"
          onClick={exportPDF}> PDF
        </button>
        { animalsLength > 0 &&
          <button
            className="btn btn-export bg-dark-grey-color"
            onClick={exportXLS}> XLS
          </button>
        }
      </ButtonGroup>
      <AddAnimalButton />
    </div>
  );
};

const { func, number } = PropTypes;

AnimalListHeader.propTypes = {
  exportXLS: func.isRequired,
  exportPDF: func.isRequired,
  animalsLength: number.isRequired
};

export default AnimalListHeader;
