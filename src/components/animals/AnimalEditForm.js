import React, { PropTypes } from 'react';
import SelectInput from '../common/SelectInput';
import Input from '../common/Input';
import ProfileDropzone from './ProfileDropzone';
import { Checkbox } from 'react-bootstrap';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';

const AnimalEditForm = ({ animal, species, profilePic, onSave, onClose, onChange, onDropProfile, errors }) => {
  const genders = [ { id: "male", name: "Macho" },
                    { id: "female", name: "Hembra" } ];
  let fecha_cumple = animal.birthdate &&
                                animal.birthdate.length == 10
                                ? animal.birthdate.substring(0, animal.birthdate.length - 3)
                                : animal.birthdate;
  const checkboxCastrated = (<Checkbox className="animal-input animal-checkbox"
                                      name="castrated"
                                      onChange={onChange}
                                      checked={animal.castrated}>
                              Castrado
                            </Checkbox>);

  const checkboxVaccines = (<Checkbox className="animal-input animal-checkbox"
                                      name="vaccines"
                                      onChange={onChange}
                                      checked={animal.vaccines}>
                              Vacunas
                            </Checkbox>);
  let showCheckboxes = animal.species_id == "1" || animal.species_id == "2";
  return (
    <div>
      <div className="dropzones-container">
        <ProfileDropzone profilePic={profilePic}
                         onDrop={onDropProfile} />
      </div>
      <div className="form-container">
        <div className="animal-form">
          <Input styleClass="profile-animal-input"
                          name="chip_num"
                          label="Num. Chip"
                          type="text"
                          value={animal.chip_num != null ? animal.chip_num : ""}
                          onChange={onChange}
                          error={errors.chip_num}/>
          <Input styleClass="profile-animal-input"
                          name="name"
                          label="Nombre"
                          type="text"
                          value={animal.name != null ? animal.name : ""}
                          onChange={onChange}
                          error={errors.name}/>
          <SelectInput styleClass="profile-animal-input"
                      name="species_id"
                      label="Especie"
                      value={animal.species_id.toString()}
                      onChange={onChange}
                      options={species}
                      edit={true}
                      error={errors.species_id}/>
          <SelectInput styleClass="profile-animal-input"
                          name="sex"
                          label="Sexo"
                          value={animal.sex}
                          onChange={onChange}
                          options={genders}
                          edit={false}
                          error={errors.sex}/>
          <Input styleClass="profile-animal-input"
                          name="race"
                          label="Raza"
                          type="text"
                          value={animal.race != null ? animal.race : ""}
                          onChange={onChange}
                          error={errors.race}/>
          <Input styleClass="profile-animal-input"
                          name="birthdate"
                          label="Fecha de Nacimiento"
                          type="month"
                          value={fecha_cumple}
                          onChange={onChange}
                          error={errors.dates}/>
          <Input styleClass="profile-animal-input"
                        name="admission_date"
                        label="Fecha de Ingreso"
                        type="date"
                        value={animal.admission_date}
                        onChange={onChange}
                        error={errors.dates}/>
          <Input styleClass="profile-animal-input"
                        name="death_date"
                        label="Fecha de Muerte"
                        type="date"
                        value={animal.death_date != null ? animal.death_date : ""}
                        onChange={onChange}
                        error={errors.dates}/>
        { showCheckboxes ? checkboxCastrated : ''}
        { showCheckboxes ? checkboxVaccines : ''}
          </div>
          <div className="animal-buttons">
            <input className="btn submit-button"
                      type="submit"
                      value="GUARDAR"
                      onClick={onSave}/>
            <button className="btn cancel-button" onClick={onClose}>
              CANCELAR
            </button>
          </div>
      </div>
    </div>
  );
};

const { object, array, func } = PropTypes;

AnimalEditForm.propTypes = {
  animal: object.isRequired,
  species: array.isRequired,
  profilePic: object.isRequired,
  onSave: func.isRequired,
  onClose: func.isRequired,
  onChange: func.isRequired,
  onDropProfile: func.isRequired,
  errors: object.isRequired
};

export default AnimalEditForm;
