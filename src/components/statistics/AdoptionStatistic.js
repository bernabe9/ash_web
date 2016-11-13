import React, { PropTypes } from 'react';
import { Bar } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';
import moment from 'moment';

const AdoptionStatistic = ({ info, loading, options, startDate, endDate, showDates, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let last3Months = "Cantidad de animales adoptados en los últimos meses";
  let startString = moment(showDates.startDate).format("DD/MM/YYYY");
  let endString = moment(showDates.endDate).format("DD/MM/YYYY");
  let dateDecided = `Cantidad de animales adoptados del ${startString} al ${endString}`;
  return (
    <div>
      <div className="statistic-title">{ showDates.startDate === '' ? last3Months : dateDecided }:</div>
      <div className="adoption-statistic-container">
        <Input styleClass="stat-input"
                name="startDate"
                label="Fecha Inicial"
                type="date"
                value={startDate}
                error={errors.startDate}
                onChange={onChange} />
        <Input styleClass="stat-input"
               name="endDate"
               label="Fecha Final"
               type="date"
               value={endDate}
               error={errors.endDate}
               onChange={onChange} />
        <div className="redraw-chart-button">
          <button className="button-show redraw-chart-button-style" onClick={onClick}>Ver Resultado</button>
        </div>
      </div>
      { loading ? spinner : (<Bar data={info} options={options} />) }
    </div>
  );
};

const { object, bool, string, func } = PropTypes;

AdoptionStatistic.propTypes = {
  info: object.isRequired,
  options: object.isRequired,
  loading: bool.isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  showDates: object.isRequired,
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
