import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const FormButton = props => (
  <div className="col-xs-12" style={{ padding: "0" }}>

    <button type="submit" name="Submit" className={props.loading ? "btn btn-md btn-login col-xs-11" : "btn btn-md btn-login btn-block"} disabled={props.loading ? "disabled" : false}> {props.title} </button>
    {props.loading ? <img src='/static/images/loading.gif' alt="loading gif" className="col-xs-1" /> : null}

  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(FormButton)