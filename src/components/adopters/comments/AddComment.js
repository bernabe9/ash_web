import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from '../../../actions/commentActions';
import * as valid from '../../../util/validateForm';
import Input from '../../common/Input';
import Spinner from 'react-spinkit';
import '../../../styles/comments.scss';

class AddComment extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      comment: { text: '' },
      errors: { text: '' },
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({
        loading: false,
        comment: { text: '' }
      });
    } else if (nextProps.errors) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.props.actions.cleanCommentForm();
  }

  onChange(e) {
    e.preventDefault();
    let { value } = e.target;
    let { comment, errors } = this.state;
    comment.text = value;
    errors.text = valid.validateEmptyField(value);
    this.setState({ comment, errors });
  }

  onSubmit() {
    let { comment, errors } = this.state;
    const { actions, adopterId } = this.props;
    errors.text = valid.validateEmptyField(comment.text);
    this.setState({ errors });
    if (valid.notErrors(errors)) {
      actions.cleanCommentForm();
      this.setState({ loading: true });
      actions.addComment(comment, adopterId);
    }
  }

  render() {
    const { comment, loading } = this.state;
    const { errors } = this.props;
    const submitButton = (
      <input type="button"
              className="btn comment-submit-btn"
              value="COMENTAR"
              onClick={this.onSubmit}/>
    );
    const loadingButton = (
      <div className="btn comment-submit-btn">
        <Spinner spinnerName="three-bounce" noFadeIn />
      </div>
    );

    return (
      <div>
        <Input styleClass="description-input"
                name="description"
                placeholder="Escribe un comentario..."
                type="textarea"
                value={comment.text}
                error={errors.text || errors}
                onChange={this.onChange} />
        { loading ? loadingButton : submitButton }
      </div>
    );
  }
}

const { object, string } = PropTypes;

AddComment.propTypes = {
  adopterId: string.isRequired,
  errors: string.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  success: state.commentForm.success,
  errors: state.commentForm.errors
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddComment);
