import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FlashMsg from "../micros/flash-message"
import FormError from "../form/error"
import FormButton from "../form/button"

var GLOBAL = require("../../globals")

const EmailConfirm = props => (

  <div className="container col-xs-12">

    {props.general_msg ? <FlashMsg msg={props.general_msg} /> : null}

    <form onSubmit={props.handleSubmit} className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 form-login form">

      <h2 className="form-heading">Andela Shopping List</h2>

      <div className="input-wrap">

        {props.email_error ? <FormError error={props.email_error} /> : null}
        <input type="email" placeholder="Your email address" name="email" className="form-control" required="required" autoFocus onChange={props.handleChange} disabled={props.loading ? "disabled" : false} />

        <FormButton loading={props.loading} title="Verify Email" />

      </div>

      <p className="col-xs-8 col-xs-offset-2">We will send an email to the email address you enter above, ensure you use the link within 10 minutes or it will expire.</p>

      <p className="col-xs-8 col-xs-offset-2">or try and <a href="/login" onClick={props.pushNavigation}>login</a> again</p>

    </form>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(EmailConfirm)