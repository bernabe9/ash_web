import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Checkbox } from 'react-bootstrap';
import ModalAnimalButtons from '../common/ModalAnimalButtons';

const AdopterForm = ({ adopter, onSave, onChange, onCancel, errors }) => {

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input"
                name="firstName"
                label="Nombre *"
                type="text"
                value={adopter.firstName}
                onChange={onChange}
                error={errors.firstName}
                 />
        <Input styleClass="animal-input"
                name="lastName"
                label="Apellido *"
                type="text"
                value={adopter.lastName}
                onChange={onChange}
                error={errors.lastName}
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
                type="tel"
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
        <Input styleClass="animal-input"
                name="houseDescription"
                label="Descripción de la casa"
                type="text"
                value={adopter.houseDescription}
                onChange={onChange}
                error={errors.houseDescription}
                 />
      </div>
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
