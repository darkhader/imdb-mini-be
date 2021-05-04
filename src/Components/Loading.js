import React, { Component } from 'react'
import './loading.css'
export default class Loading extends Component {
  render(props) {
    return (
        <div className="lds-hourglass"></div>
    )
  }
}
