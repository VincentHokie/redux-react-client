import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FlashMsg from "../micros/flash-message"
import FormError from "../form/error"
import FormButton from "../form/button"

var GLOBAL = require("../../globals")

const PasswordReset = props => (

  <div className="container col-xs-12">

    {props.general_msg ? <FlashMsg msg={props.general_msg} /> : null}

    <form onSubmit={props.handleSubmit} className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 form-login form">

      <h2 className="form-heading">Andela Shopping List</h2>

      <div className="input-wrap">

        {props.password_error ? <FormError error={props.password_error} /> : null}
        <input type="password" placeholder="Enter New Password" name="password" className="form-control" required="required" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} />

        {props.password_confirm_error ? <FormError error={props.password_confirm_error} /> : null}
        <input type="password" placeholder="Re-Enter New Password" name="password_confirm" className="form-control" required="required" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} />

        <FormButton loading={props.loading} title="Reset Password" />

      </div>

      <p className="col-xs-8 col-xs-offset-2"><a href="/login" onClick={props.pushNavigation}>Try login again</a> if youve had a thought or <a href="/sign-up">Sign Up</a> </p>

    </form>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(PasswordReset)