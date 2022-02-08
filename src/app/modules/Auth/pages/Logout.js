import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LayoutSplashScreen } from '../../../../_metronic/layout'
import * as auth from '../_redux/authRedux'
import StorageHelper from '../../../../helpers/storage.helper'
import { ACCESS_TOKEN_KEY } from '../../../../constants'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    const { hasAuthToken } = this.props
    StorageHelper.removeItem('ACCESS_TOKEN_KEY')
    StorageHelper.removeItem('User')
    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />
  }
}

Logout.propTypes = {
  hasAuthToken: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }), auth.actions)(Logout)
