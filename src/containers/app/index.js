import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'

//import custom components
import Login from "../login"
import EmailConfirm from "../email-confirm"
import PasswordReset from "../password-reset"
import SignUp from "../sign-up"

import ShoppingLists from "../shopping-lists/view"
import CreateShoppingList from "../shopping-lists/create"
import UpdateShoppingList from "../shopping-lists/update"

import UpdateShoppingListItem from "../shopping-list-items/update"

import NotFound from "../404"

var vex = require('vex-js')
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-os'


const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/sign-up' component={SignUp} />
      <Route exact path='/shopping-lists' component={ShoppingLists} />
      <Route exact path='/shopping-list/new' component={CreateShoppingList} />
      <Route exact path='/shopping-list/:id/edit' component={UpdateShoppingList} />
      <Route exact path='/shopping-list/:id/item/:item_id/edit' component={UpdateShoppingListItem} />
      <Route exact path='/email-confirmation' component={EmailConfirm} />
      <Route exact path='/password-reset/:token' component={PasswordReset} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  </div>
)

export default App