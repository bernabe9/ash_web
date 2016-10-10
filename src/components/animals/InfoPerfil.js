import React, { PropTypes } from 'react';
import Spinner from '../common/SpinnerComponent';
import ImageLightBox from '../common/ImageLightBox';
import * as valid from '../../util/validateForm';
import { Sticky } from 'react-sticky';
import EditAnimalButton from './EditAnimalButton';

const InfoPerfil = ({ animal, loading, animalId, styleClass, loadingfunc }) => {
  let imagen = animal.profile_image;
  let especieOption = animal.species == "Perro" || animal.species == "Gato";
  return (
    <div className={(styleClass ? styleClass+' ' : '')+ 'perfil-box'}>
      { loading ? (<Spinner active={loading} />) : (
      <div>
        <ImageLightBox imageStyle={'perfil-image center'}
                        imageSmall={imagen}
                        imageFull={imagen}/>
        <Sticky>
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
                <tr>
                  <td>VACUNADO:</td>
                  <td>{especieOption &&
                        (animal.vaccines ? <font color="green"> SI </font>
                                          : <font color="red"> NO </font>)}
                  </td>
                </tr>
                <tr>
                  <td>CASTRADO:</td>
                  <td>{especieOption &&
                        (animal.castrated ? <font color="green"> SI </font>
                                          : <font color="red"> NO </font>)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="edit-button">
              <EditAnimalButton loading={loadingfunc} animal={animal} route_id={animalId}/>
            </div>
          </div>
        </Sticky>
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
  loadingfunc: func.isRequired
};

export default InfoPerfil;
