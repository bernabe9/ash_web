import React, { PropTypes } from 'react';
import AddAnimalButton from './AddAnimalButton.js';
import { ButtonGroup } from 'react-bootstrap';

const AnimalListHeader = ({ exportXLS, exportPDF }) => {
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title section-title">
            <p>LISTADO
              <ButtonGroup>
                <button
                  className="btn btn-export bg-orange-color"
                  onClick={exportPDF}> PDF
                </button>
                <button
                  className="btn btn-export bg-dark-grey-color"
                  onClick={exportXLS}> XLS
                </button>
              </ButtonGroup>
            </p>
        </div>
        <div className="float-right">
          <AddAnimalButton />
        </div>
      </div>
    </div>
  );
};

const { func } = PropTypes;

AnimalListHeader.propTypes = {
  exportXLS: func.isRequired,
  exportPDF: func.isRequired
};

export default AnimalListHeader;
