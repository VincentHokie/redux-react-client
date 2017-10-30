import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../../css/back_button.css';

const BackButton = props => (

  <div id="backButton" className="col-lg-offset-4 col-md-offset-3 col-sm-1 col-sm-offset-2 col-xs-2">
    <a href="/shopping-lists" className="col-xs-12 btn" onClick={props.pushNavigation}>
      <i className="fa fa-hand-o-left"></i>Back
		      </a>
  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(BackButton)