import React, { Component } from "react";
import axios from '../axios';
import { ROOT_API } from '../statics';
import Modal from 'react-modal';
class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal(props) {
    this.setState({ showModal: false });

  }
  _handleTextChange = event =>
    this.props.onNameSignin &&
    this.props.onNameSignin(event.target.value);
  _handleTextChange1 = event =>
    this.props.onCMTSignin &&
    this.props.onCMTSignin(event.target.value);
  _onLogout = () => {
    axios({
      url: `${ROOT_API}/api/auth/logout`,
      method: "Delete",

    }).then(response => {
      console.log(response);
      window.location.href = `https://imdb-mini.xyz/ `



      // toggleLoading(false);
    }).catch(error => {

      console.log(error)


    });
  };
  render() {
    const display = this.props.username ? (
      <div>
        <h2 className="d-flex justify-content-center">Xin chào, {this.props.username}</h2>
        
          <button 
            className="btn btn-danger btn-block d-flex justify-content-center mt-3"
            onClick={this._onLogout}>
            LogOut
        </button>
        

      </div>

    ) : (
        <div>
          <button
            className="btn btn-primary btn-block"
            onClick={this.handleOpenModal}
          >Login</button>
          <Modal
            {...this.props}
            bsSize="small"
            aria-labelledby="contained-modal-title-sm"
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <form className="col-3">
              <input
                onChange={this._handleTextChange}
                className="form-control"
                type="text"
                placeholder="Email"
              />
              <input
                onChange={this._handleTextChange1}
                className="form-control"
                type="password"
                placeholder="Password"
              />

            </form>
            <button className="btn btn-primary" onClick={this.handleCloseModal}
              onClick={this.props.onLogin}>Đăng nhập</button>
            <button className="btn btn-secondary" onClick={this.handleCloseModal}>Thoát</button>
          </Modal>
        </div>
        // <button
        //   className="btn btn-primary btn-block"
        //   onClick={this.props.onLogin}
        // >
        //   Login
        // </button>

      );
    return <div className="col-3 profile_panel text-right">{display}</div>;
  }
}

export default ProfilePanel;
