import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const FormError = props => (
  <span className="label label-danger">{props.error}<br /></span>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(FormError)