import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FormError from "../form/error"
import FormButton from "../form/button"
import FlashMsg from "../micros/flash-message"

var GLOBAL = require("../../globals")

const SignUp = props => (


  <div className="container col-xs-12">

    {props.general_msg ? <FlashMsg msg={props.general_msg} /> : null}

    <center className={props.success ? "" : "hidden-lg hidden-md hidden-sm hidden-xs"} style={{ clear: "left", "margin-bottom": "20px" }}><a href='/login' className='btn btn-success' role='button' onClick={props.pushNavigation}>Login now</a></center>

    <img src='/static/images/shopping-list.jpg' alt="decorative shopping list" className="col-sm-6 hidden-xs" />

    <form onSubmit={props.handleSubmit} className="col-sm-6 col-xs-12 form-sign-up form" name="sign-up">

      <h2 className="form-heading">Andela Shopping List</h2>
      <p className="col-xs-12">Fill this in real quick and begin using our awesome features!</p>

      <div className="input-wrap">

        <div className="form-group">
          <label htmlFor="username">Username</label><br />
          {props.username_error ? <FormError error={props.username_error} /> : null}
          <input type="text" placeholder="Username" name="username" className="form-control" required="required" autoFocus id="username" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} value={props.username} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label><br />
          {props.email_error ? <FormError error={props.email_error} /> : null}
          <input type="email" placeholder="vince@hotmail.com" name="email" className="form-control" required="required" id="email" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} value={props.email} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label><br />
          {props.password_error ? <FormError error={props.password_error} /> : null}
          <input type="password" placeholder="Enter Password" name="password" className="form-control" required="required" id="password" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} value={props.password} />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Re-Enter Password</label><br />
          {props.password2_error ? <FormError error={props.password2_error} /> : null}
          <input type="password" placeholder="Enter Password" name="password2" className="form-control" required="required" id="password2" onChange={props.handleChange} disabled={props.loading ? "disabled" : false} value={props.password2} />
        </div>

        <div className="checkbox">
          <label>
            <input type="checkbox" required /> I have read and agreed to the Andela Shopping list terms and conditions
        </label>
        </div>

        <FormButton loading={props.loading} title="Sign Up" />

      </div>

    </form>

  </div>


)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignUp)