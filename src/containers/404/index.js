import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../css/404.css';

const NotFound = props => (

  <div className="body-404">

    <div className="container">

      <section className="error-wrapper">
        <i className="icon-404"></i>
        <h1>404</h1>
        <h2>page not found</h2>
        <p className="page-404">Something went wrong or that page doesn’t exist yet. <a href="index.html" onClick={this.pushNavigation}>Return Home</a></p>
      </section>

    </div>

  </div>

)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(NotFound)