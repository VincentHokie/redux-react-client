import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

var GLOBAL = require("../../../globals")

var vex = require('vex-js')
vex.defaultOptions.className = 'vex-theme-os'

var btoa = require('btoa')

const List = props => (

  <div className={props.show ? "col-xs-12 shopping-list" : "hidden-lg hidden-md hidden-sm hidden-xs"}>

    <div className={props.chosen == props.thisone ? "alert alert-default col-md-10 col-xs-12 chosen-alert" : "alert alert-default col-md-10 col-xs-12"} onClick={props.handleListSelect} data-listname={props.list.name} id={props.list.list_id}>
      <strong>{props.list.name}</strong> -  {props.list.date_time ? props.list.date_time[0] : props.list.date_time}
    </div>

    <div className="col-md-1 col-xs-8" style={{ padding: '0' }}>

      <a href={"/shopping-list/" + props.list.list_id + "/edit"} onClick={props.pushNavigation} className="col-xs-12 btn btn-primary" style={{ padding: '5px 0' }}>
        <i className="fa fa-edit"></i>
      </a>

    </div>

    <div className="col-md-1 col-xs-4 delete_form" style={{ padding: '0' }}>
      <button className="btn btn-danger col-xs-12" onClick={props.handleDeleteList} data-listid={props.list.list_id} type="button" style={{ padding: '5px 0' }}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(List)