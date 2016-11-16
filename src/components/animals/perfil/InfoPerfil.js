import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from '../../common/SpinnerComponent';
import ImageLightBox from '../../common/ImageLightBox';
import { ButtonGroup } from 'react-bootstrap';
import * as valid from '../../../util/validateForm';
import StickyResponsive from '../../common/StickyResponsive';
import EditAnimalButton from './EditAnimalButton';
import DeleteAnimalButton from './DeleteAnimalButton';

const InfoPerfil = ({ animal, loading, animalId, styleClass, loadingfunc, exportPerfil }) => {
  let imagen = animal.profile_image;
  let especieOption = animal.species == "Perro" || animal.species == "Gato";
  const adoptable = animal.type === 'Adoptable';
  const adopted = (
    <Link className="adopted-animal" to={`/adoptantes/${animal.adopter_id}`}>
      ADOPTADO
    </Link>
  );
  const notAdopted = (<font className="negative-animal"> EN ADOPCIÓN </font>);
  const notAvailable = (<font className="not-available-animal"> NO DISPONIBLE </font>);
  const availableStatus = animal.available ? notAdopted : notAvailable;

  return (
    <div className={(styleClass ? styleClass+' ' : '')+ 'perfil-box'}>
      { loading ? (<Spinner active={loading} />) : (
      <div>
        <ImageLightBox imageStyle={'perfil-image center'}
                        imageSmall={imagen}
                        imageFull={imagen}/>
        <StickyResponsive>
          <div className="center tabel-div">
            <table className="table-borderless">
              <tbody>
                <tr>
                  <td><b>NOMBRE:</b></td>
                  <td><b>{animal.name}</b></td>
                </tr>
                <tr>
                  <td>NÚM. DE CHIP:</td>
                  <td>{animal.chip_num ? animal.chip_num : '-'}</td>
                </tr>
                <tr>
                  <td>ESPECIE:</td>
                  <td>{animal.species}</td>
                </tr>
                <tr>
                  <td>SEXO:</td>
                  <td>{animal.sex}</td>
                </tr>
                <tr>
                  <td>RAZA:</td>
                  <td>{animal.race ? animal.race : '-'}</td>
                </tr>
                <tr>
                  <td>PESO:</td>
                  <td>{animal.weight ? animal.weight.toString().concat(' KG')
                                      : '-' }
                  </td>
                </tr>
                <tr>
                  <td>EDAD:</td>
                  <td >{valid.getAge(animal.birthdate).concat(' Años')}</td>
                </tr>
                <tr>
                  <td>FEC. DE NAC.:</td>
                  <td >{animal.birthdate}</td>
                </tr>
                <tr>
                  <td>FEC. DE ING.:</td>
                  <td>{animal.admission_date}</td>
                </tr>
                <tr>
                  <td>FEC. DE MUERTE:</td>
                  <td>{animal.death_date ? animal.death_date : '-'}</td>
                </tr>
                {especieOption &&
                <tr>
                  <td>VACUNADO:</td>
                  {animal.vaccines ?
                    <td className="positive-animal"> SI </td> :
                    <td className="negative-animal"> NO </td>
                  }
                </tr>}
                {especieOption &&
                <tr>
                  <td>CASTRADO:</td>
                  {animal.castrated ?
                    <td className="positive-animal"> SI </td> :
                    <td className="negative-animal"> NO </td>
                  }
                </tr>}
                {especieOption &&
                <tr>
                  <td>ESTADO:</td>
                  <td>
                    { adoptable && (animal.adopted ? adopted : availableStatus) }
                  </td>
                </tr>}
              </tbody>
            </table>
            <div className="perfil-buttons-wrapper">
              <ButtonGroup>
                <DeleteAnimalButton {...{ animalId }}/>
                <button
                  type="button"
                  className="btn export-perfil bg-orange-color"
                  onClick={exportPerfil}>PDF
                </button>
                <EditAnimalButton loading={loadingfunc}
                                  animal={animal}
                                  routeId={animalId} />
              </ButtonGroup>
            </div>
          </div>
        </StickyResponsive>
      </div>
      )}
    </div>
  );
};

const { object, string, bool, func } = PropTypes;

InfoPerfil.propTypes = {
  animal: object.isRequired,
  loading: bool.isRequired,
  styleClass: string,
  animalId: string.isRequired,
  loadingfunc: func.isRequired,
  exportPerfil: func.isRequired
};

export default InfoPerfil;
