import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

var GLOBAL = require("../../../globals")

var vex = require('vex-js')
vex.defaultOptions.className = 'vex-theme-os'

var btoa = require('btoa')

const Item = props => (

  <div className={props.show ? "" : "hidden-lg hidden-md hidden-sm hidden-xs"}>

    <li className={props.chosen == props.list ? "list-group-item col-xs-12 shopping-list-items showAddItemForm" : "list-group-item col-xs-12 shopping-list-items"} id={props.item.item_id} style={{ padding: '0' }}>

      <label className="col-md-10 col-xs-12" style={{ padding: '5px 0 5px 5px' }}><input type="checkbox" onChange={props.handleItemCheckboxChange} checked={props.checked == "1" ? "checked" : false} /> {props.item.name} - UgX {props.item.amount} </label>

      <div className="col-md-1 col-xs-8" style={{ padding: '0' }}>

        <a href={"/shopping-list/" + props.item.list_id + "/item/" + props.item.item_id + "/edit"} onClick={props.pushNavigation} className="col-xs-12 btn btn-primary" style={{ padding: '5px 0' }}>
          <i className="fa fa-edit"></i>
        </a>

      </div>

      <div className="col-md-1 col-xs-4 delete_form" style={{ padding: '0' }}>
        <button className="btn btn-danger col-xs-12" onClick={props.handleDeleteItem} data-listid={props.item.list_id} data-itemid={props.item.item_id} type="button" style={{ padding: '5px 0' }}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>

    </li>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Item)