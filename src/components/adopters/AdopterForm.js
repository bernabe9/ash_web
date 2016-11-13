import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Checkbox } from 'react-bootstrap';
import ModalAnimalButtons from '../common/ModalAnimalButtons';

const AdopterForm = ({ adopter, onSave, onChange, onCancel, errors }) => {

  const errorsFullName = errors.firstName || errors.lastName;

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input"
                name="fullName"
                label="Nombre y Apellido *"
                type="text"
                value={adopter.fullName}
                onChange={onChange}
                error={errorsFullName}
                 />
        <Input styleClass="animal-input"
                name="ci"
                label="CI * (sin puntos ni guiones)"
                type="text"
                value={adopter.ci}
                onChange={onChange}
                error={errors.ci}
                 />
        <Input styleClass="animal-input"
                name="email"
                label="Email"
                type="text"
                value={adopter.email}
                onChange={onChange}
                error={errors.email}
                 />
        <Input styleClass="animal-input"
                name="phone"
                label="Teléfono *"
                type="text"
                value={adopter.phone}
                onChange={onChange}
                error={errors.phone}
                 />
        <Input styleClass="animal-input"
                name="homeAddress"
                label="Dirección *"
                type="text"
                value={adopter.homeAddress}
                onChange={onChange}
                error={errors.homeAddress}
                 />
        </div>
        <Input styleClass="adopter-input-desc"
                name="houseDescription"
                label="Descripción de la casa"
                type="textarea"
                value={adopter.houseDescription}
                onChange={onChange}
                error={errors.houseDescription}
                 />

      <div>
        <Checkbox className="animal-input animal-checkbox"
                  name="blacklisted"
                  onChange={onChange}
                  checked={adopter.blacklisted}>
          Lista Negra
        </Checkbox>
      </div>
      <ModalAnimalButtons title="INGRESAR" onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func } = PropTypes;

AdopterForm.propTypes = {
  adopter: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  errors: object.isRequired
};

export default AdopterForm;
