import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messages from '../../constants/apiMessage';
import * as animalActions from '../../actions/animalActions';
import '../../styles/animal-form.scss';
import UploadImageMessage from '../../components/common/UploadImageMessage';
import ImagesDropzone from '../../components/common/ImagesDropzone';
import ModalAnimalButtons from '../../components/common/ModalAnimalButtons';
import { toastr } from 'react-redux-toastr';
import loadImage from 'blueimp-load-image';

class AddGalleryModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      images: [],
      imagesPreview: [],
      images_to_send: 0,
      uploading_images: false,
      success_uploading_images: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let success_upload = this.state.success_uploading_images;
    let noMoreImages = nextProps.sended_images === this.state.images_to_send;
    if (!nextProps.success_image) {
      success_upload = false;
      this.setState({ success_uploading_images: false });
    }
    if (noMoreImages) {
      this.props.actions.showPerfilAnimalImages(this.props.id, 1);
      if (success_upload) {
        let cantImgs = this.state.images.length;
        toastr.info('Galeria', messages.GALLERY_ADD_IMAGEN(cantImgs));
      } else {
        toastr.error('Galeria', messages.GALLERY_LOAD_ERROR);
      }
      this.props.onClose();
    }
  }

  sendImages() {
    this.setState({
      images_to_send: this.state.images.length + this.props.sended_images
    });

    for (let image of this.state.images) {
      const reader = new FileReader();
      const file = image;
      reader.readAsDataURL(file);
      reader.onload = (upload) => {
        this.props.actions.uploadImageAnimal(upload.target.result, this.props.id);
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ uploading_images: true });
    if (this.state.images.length > 0) {
      this.props.onToggleBackdrop();
      this.sendImages();
    } else {
      this.props.onClose();
    }
  }

  onDrop(imgs) {
    let { images, imagesPreview } = this.state;
    for (let image of imgs) {
      const options = {
        maxWidth: 300,
        orientation: true
      };
      const updateResults = (img) => {
        img.name = image.name;
        imagesPreview.push(img);
        this.setState({ imagesPreview });
      };
      loadImage(image, updateResults, options);
    }
    images = images.concat(imgs);
    this.setState({ images });
  }

  onDeleteImage(imageName) {
    let { images, imagesPreview } = this.state;
    for (let i = 0; i < images.length; i++) {
      if (images[i].name == imageName) {
        images.splice(i, 1);
        imagesPreview.splice(i, 1);
      }
    }
    this.setState({ images, imagesPreview });
  }

  render() {
    const loadingImagesView = (<UploadImageMessage />);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> AGREGAR IMAGENES </h2>
                    <ImagesDropzone title="Galeria"
                                    images={this.state.imagesPreview}
                                    onDrop={this.onDrop}
                                    onDelete={this.onDeleteImage} />
                    <ModalAnimalButtons title="GUARDAR"
                                        onSubmit={this.onSubmit}
                                        onClose={this.props.onClose} />
                  </div>);

    return (
      <div id="modal">
        { this.state.uploading_images ? loadingImagesView : body }
      </div>
    );
  }
}

const { object, func, string, number } = PropTypes;

AddGalleryModal.propTypes = {
  id: string.isRequired,
  sended_images: number.isRequired,
  onClose: func.isRequired,
  onToggleBackdrop: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  success_image: state.animalForm.success_image,
  sended_images: state.animalForm.sended_images
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddGalleryModal);
