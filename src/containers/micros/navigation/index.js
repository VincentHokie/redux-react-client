import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../../css/template_logged_in.css';

var vex = require('vex-js')
vex.defaultOptions.className = 'vex-theme-os'

var GLOBAL = require("../../../globals")
var btoa = require('btoa')

const Navigation = props => (

  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a href="/login" className="navbar-brand" onClick={props.pushNavigation}>
          Andela Shopping List
          </a>
      </div>
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav navbar-right">
          <li><a><i className="fa fa-user"></i> Welcome  {props.username} </a></li>
          <li id="logoutButton" onClick={props.handleLogout}><a><i className="fa fa-power-off"></i> Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Navigation)