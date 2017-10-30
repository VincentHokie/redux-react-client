import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Paginate = props => (

  <li className={props.page == props.chosen_page ? "active" : ""}>
    <a href="#" data-page-number={props.page} onClick={props.page_selected}>{props.page}</a>
  </li>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Paginate)