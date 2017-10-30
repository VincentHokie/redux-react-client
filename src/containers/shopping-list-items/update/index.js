import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Navigation from "../../micros/navigation"
import FlashMsg from "../../micros/flash-message"
import FormError from "../../form/error"
import FormButton from "../../form/button"
import BackButton from "../../micros/back-button"

var GLOBAL = require("../../../globals")

const UpdateShoppingListItem = props => (

  <div className="container col-xs-12">

    <Navigation username={props.user_username} parent={this} pushNavigation={props.pushNavigation} />

    {props.general_msg ? <FlashMsg msg={props.general_msg} /> : null}

    <form onSubmit={props.handleSubmit} className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 form" name="create-shoppinglist">

      <h2 className="form-heading">Edit Andela Shopping List Item</h2>

      <div className="input-wrap">

        <div className="col-xs-12">
          <div className="form-group">

            {props.name_error ? <FormError error={props.name_error} /> : null}
            <input type="text" placeholder="Shopping List Item Name" name="name" className="form-control" required="required" autoFocus onChange={props.handleChange} value={props.name} disabled={props.loading || !props.retrieved ? "disabled" : false} />

          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">

            {props.amount_error ? <FormError error={props.amount_error} /> : null}
            <input type="number" min="1" placeholder="Item amount" name="amount" className="form-control" required="required" onChange={props.handleChange} value={props.amount} disabled={props.loading || !props.retrieved ? "disabled" : false} />

          </div>
        </div>

        <div className="col-xs-12">
          <FormButton loading={props.loading || !props.retrieved} title="Update Shopping List Item" />
        </div>

      </div>


    </form>

    <BackButton pushNavigation={props.pushNavigation} />

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(UpdateShoppingListItem)