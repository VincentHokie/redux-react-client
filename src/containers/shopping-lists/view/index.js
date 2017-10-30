import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../../css/view-shopping-list.css';

import Navigation from "../../micros/navigation"
import Item from "../../micros/list-item"
import List from "../../micros/list"
import Paginate from "../../micros/paginator"

import FlashMsg from "../../micros/flash-message"

import FormError from "../../form/error"

var GLOBAL = require("../../../globals")

var vex = require('vex-js')
vex.defaultOptions.className = 'vex-theme-os'

var btoa = require('btoa')



// Map through lists and return linked lists
// const listNode = props.list_data ? props.list_data.map((list) => {
//   return (<List chosen={props.chosen_list_id} thisone={list.list_id} list={list} handleListSelect={props.handleListSelect} key={list.list_id} pushNavigation={props.pushNavigation} />)
// }) : "";

// // Map through items and return linked items
// const itemNode = props.item_data ? props.item_data.map((item) => {
//   return (<Item chosen={props.chosen_list_id} item={item} key={item.item_id} list={item.list_id} pushNavigation={props.pushNavigation} />)
// }) : "";

// // Create list pagination
// const pagination_rows_lists = [];
// var pages = Math.ceil(props.num_of_records_lists / props.lists_per_page)

// for (var i = 0; i < pages; i++) {
//   pagination_rows_lists.push(<Paginate page={i + 1} key={i + 1} page_selected={props.list_page_selected} chosen_page={props.list_page_selected} />);
// }

// // Create item pagination
// const pagination_rows_items = [];
// var pages = Math.ceil(props.num_of_records_items / props.items_per_page)

// for (var i = 0; i < pages; i++) {
//   pagination_rows_items.push(<Paginate page={i + 1} key={i + 1} page_selected={props.item_page_selected} chosen_page={props.item_page_selected} />);
// }

let listNode = ""
let itemNode = ""
let pagination_rows_items = ""
let pagination_rows_lists = ""


const ShoppingLists = props => (

  <div className="sh-list-container">

    <Navigation username={props.user_username} parent={this} pushNavigation={props.pushNavigation} />

    {props.general_msg ? <FlashMsg msg={props.general_msg} /> : null}

    <div className="col-xs-12">

      <div className={props.hide_items ? "panel panel-default col-sm-6 col-xs-12 hideSomething" : "panel panel-default col-sm-6 col-xs-12"} id="list-panel">

        <div className="panel-heading col-xs-12" style={{ marginBottom: "15px" }}>
          <h4 className="col-xs-10">Shopping lists <img src='/static/images/loading.gif' alt="loading gif" className={!props.getting_lists ? "hideSomething" : "col-xs-1"} style={{ padding: '0' }} /></h4>

          <a href="/shopping-list/new" className="btn btn-success col-xs-2" style={{ padding: '10px 0' }} onClick={props.pushNavigation}>
            <i className="fa fa fa-plus-circle"></i>
          </a>

        </div>

        <div className="col-xs-12">

          <div className="col-xs-5 col-xs-offset-1">
            <label style={{ float: "left" }}>Lists per page</label>
            <div className="form-group">
              <select className="form-control" name="select_lists_per_page" onChange={props.numberOfListsPerPageChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>


          <form onSubmit={props.handleSearchSubmit} className="form">
            <div className="col-xs-5 col-xs-offset-1">
              <label style={{ float: "left" }}>List search</label>
              <div className="form-group">
                <input placeholder="Search word" className="form-control" name="search_word_list" onChange={props.handleChange} />
              </div>
            </div>
          </form>

        </div>

        <div className="panel-body col-xs-12">

          <h5 className="alert alert-info col-xs-12"><strong>Click a shopping list to see its items</strong></h5>

          {listNode}

        </div>

        <div className={props.showing_all_lists ? "hidden-lg hidden-md hidden-sm hidden-xs" : "panel-footer col-xs-12"}>
          <ul className="pagination" style={{ margin: "0" }}>
            {pagination_rows_lists}
          </ul>
        </div>

      </div>


      <div className={props.hide_items ? "panel panel-default col-sm-5 col-sm-offset-1 col-xs-12" : "panel panel-default col-sm-5 col-sm-offset-1 col-xs-12 hidden-xs"} id="list-items-panel">

        <div className="panel-heading col-xs-12" style={{ marginBottom: "15px" }}>

          <button className="btn hidden-md hidden-lg hidden-sm col-xs-1" onClick={props.handleBackButtonOnItems} id="back-to-lists" style={{ padding: '10px 0' }}><i className="fa fa-arrow-circle-left"></i></button>

          <h4 className="col-xs-10">Shopping list items <img src='/static/images/loading.gif' alt="loading gif" className={!props.getting_items ? "hideSomething" : "col-xs-1"} style={{ padding: '0' }} /> </h4>

          <button id="create-shopping-list-item" onClick={props.toggleShowItemForm} className="btn btn-success col-sm-2 col-xs-1" style={{ padding: '10px 0' }}><i className="fa fa fa-plus-circle"></i></button>

        </div>

        <div className="panel-body">

          <div className={!props.chosen_list_id ? "hideSomething" : "col-xs-12"}>

            <div className="col-xs-5 col-xs-offset-1">
              <label style={{ float: "left" }}>Items per page</label>
              <div className="form-group">
                <select className="form-control" name="select_items_per_page" onChange={props.numberOfItemsPerPageChange}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            <form onSubmit={props.handleItemSearchSubmit} className="form">
              <div className="col-xs-5 col-xs-offset-1">
                <label style={{ float: "left" }}>Item Search</label>
                <div className="form-group">
                  <input placeholder="Search word" className="form-control" name="search_word_item" onChange={props.handleChange} />
                </div>
              </div>
            </form>

          </div>

          <h4 className="col-xs-12" style={{ textAlign: "left" }}>Shopping list - <span id="list-name">{props.chosen_list ? props.chosen_list : null}</span></h4>
          <h4 className="col-xs-12" style={{ textAlign: "left" }}>Items</h4>

          <div className={props.show_add_item ? 'well well-sm col-xs-12 showAddItemForm' : 'well well-sm col-xs-12'} id="new-item-form">

            <h5>Enter shopping list item to add below!</h5>

            <form onSubmit={props.handleSubmit} id="addItemForm" className="form">

              <div className="row">

                <div className="col-xs-6">
                  <div className="form-group">

                    {props.name_error ? <FormError error={props.name_error} /> : null}
                    <input type="text" placeholder="Shopping List Item Name" name="name" className="form-control" required="required" autoFocus onChange={props.handleChange} disabled={props.loading ? "disabled" : false} value={props.name} />

                  </div>
                </div>

                <div className="col-xs-6">
                  <div className="form-group">

                    {props.amount_error ? <FormError error={props.amount_error} /> : null}
                    <input type="number" min="1" placeholder="Shopping List Item Amount" name="amount" className="form-control" required="required" onChange={props.handleChange} value={props.amount} disabled={props.loading ? "disabled" : false} />

                  </div>
                </div>


                <div className="col-xs-12">
                  <button className={props.loading ? "btn btn-md btn-sign-up col-xs-11" : "btn btn-md btn-sign-up col-xs-12"}
                    disabled={props.loading || !props.chosen_list ? "disabled" : false} type="submit">Create Item</button>
                  {props.loading ? <img src='/static/images/loading.gif' alt="loading gif" className="col-xs-1" /> : null}
                </div>


              </div>

            </form>

          </div>


          <ul className="list-group col-xs-12" style={{ marginTop: "20px" }}>

            {itemNode}

          </ul>

        </div>

        <div className={props.showing_all_items || !props.chosen_list_id ? "hidden-lg hidden-md hidden-sm hidden-xs" : "panel-footer col-xs-12"}>
          <ul className="pagination" style={{ margin: "0" }}>
            {pagination_rows_items}
          </ul>
        </div>

      </div>

    </div>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(ShoppingLists)