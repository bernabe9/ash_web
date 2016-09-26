import React, { PropTypes } from 'react';

const SelectInput = ({ styleClass, name, label, onChange, defaultOption, value, error, options, edit }) => {
  let wrapperClass = `form-group ${styleClass}`;

  return (
    <div className={wrapperClass}>
      <label className="input-label" htmlFor={name}>{label}</label>
      <div className="field">
        <select name={name}
                onChange={onChange}
                className="form-control"
                value={value}>
          {!edit && <option value="">{defaultOption}</option>}
          {options.map(option => {
            return <option key={option.id} value={option.id}>{option.name}</option>;
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const { string, func, arrayOf, object, bool } = PropTypes;

SelectInput.propTypes = {
  styleClass: string,
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  defaultOption: string,
  value: string,
  error: string,
  edit: bool,
  options: arrayOf(object)
};

export default SelectInput;
