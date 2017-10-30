import React from 'react';
import { shallow, mount, render } from 'enzyme';

import UpdateShoppingListItem from '../update_shopping_list_item.component.js';

import App from '../../App.js';

import { BrowserRouter, MemoryRouter } from 'react-router-dom'


var GLOBAL = require("../../globals.js")
var fetchMock = require("fetch-mock");
var expect = require("chai").expect;
import "../localStorage.js";
let url_param = JSON.parse('{"params": {"id" : 1, "item_id" : 1 }}');

describe('Update Shopping list item', () => {
  let wrapper;

  it('wraps content in a div with .col-xs-12 class if user is logged in', () => {

    fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
      status: 200,
      body: []
    })

    localStorage.setItem("globals", JSON.stringify({ "logged_in": true }));
    wrapper = mount(<UpdateShoppingListItem match={url_param} />)
    expect(wrapper.find('.container.col-xs-12').length).equal(1);

  });

  describe('Behaviour', () => {

    beforeEach(() => {
      localStorage.setItem("globals", JSON.stringify({ "logged_in": true }));

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)

    })

    it('if the theres processing going on, the input is not editable', () => {

      wrapper.setState({ loading: false });
      wrapper.setState({ retrieved: true });
      expect(wrapper.find('input[name="name"]').prop("disabled")).equal(false);

      wrapper.setState({ loading: true });
      expect(wrapper.find('input[name="name"]').prop("disabled")).equal("disabled");

      wrapper.setState({ loading: false });
      wrapper.setState({ retrieved: false });
      expect(wrapper.find('input[name="name"]').prop("disabled")).equal("disabled");

    })

    it('if the theres a form error, the error should show', () => {

      expect(wrapper.find('FormError').length).equal(0);

      wrapper.setState({ name_error: "Error" });
      expect(wrapper.find('FormError').length).equal(1);

    })

    it('if the theres a flash message, expect the .message class, otherwise dont', () => {

      wrapper.setState({ general_msg: false });
      expect(wrapper.find('FlashMsg').length).equal(0);

      wrapper.setState({ general_msg: "A flash message" });
      expect(wrapper.find('FlashMsg').length).equal(1);

    })
  })

  describe('Flash Message Behaviour', () => {

    beforeEach(() => {
      localStorage.setItem("globals", JSON.stringify({ "flash": "Message", "logged_in": true }));

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
    })

    it('if the theres processing going on, the input is not editable', () => {

      expect(wrapper.find('.alert.message').length).equal(1);
      expect(wrapper.find('.alert.message').html()).contain("Message");

      fetchMock.restore();


    })

  })

  describe('API interaction Behaviour', () => {
    let list_data, item_data;

    beforeEach(() => {

      localStorage.setItem("globals", JSON.stringify({ "logged_in": true }));

      list_data = '{"item_id": "1","name":"Honda Accord Crosstour","amount":"1000"}';
    
    })

    afterEach(() => {

      expect(fetchMock.calls().unmatched).to.be.empty;
      fetchMock.restore();

    })

    it('form submission done properly and success responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: list_data
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      expect(wrapper.state().loading).equal(true);
      expect(wrapper.state().retrieved).equal(false);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().retrieved).equal(true);
        expect(wrapper.state().name).equal("Honda Accord Crosstour");
        expect(wrapper.state().amount).equal("1000");
        
        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1");

        done();

      }, 100);

    })

    it('form submission done properly and success responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 401,
        body: "Unauthorized access"
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().general_msg).equal("Check your internet connection and try again");

        //expect( wrapper.state().general_msg ).equal("Check your internet connection and try again");
        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1");

        done();

      }, 100);

    })

    it('form submission done properly and success responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: { error: "Were here" }
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)

      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().general_msg).equal("Were here");

        //expect( wrapper.state().general_msg ).equal("Check your internet connection and try again");
        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1");

        done();

      }, 100);

    })



    it('form submission done properly and error responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })

      fetchMock.put(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1", {
        status: 200,
        body: { success: "Were here" }
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      wrapper.find('input[name="name"]').simulate("change", { target: { value: "vince" } });
      wrapper.find('form').simulate("submit", { preventDefault() { } });

      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().general_msg).equal("Were here");
        expect(wrapper.find(".message").length).equal(1);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1");

        done();

      }, 100);

    })


    it('form submission done properly and error responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })

      fetchMock.put(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1", {
        status: 200,
        body: { error: "Were here" }
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      wrapper.find('input[name="name"]').simulate("change", { target: { value: "vince" } });
      wrapper.find('form').simulate("submit", { preventDefault() { } });

      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().general_msg).equal("Were here");
        expect(wrapper.find(".message").length).equal(1);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1");

        done();

      }, 100);

    })

    it('form submission done properly and error responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })

      fetchMock.put(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1", {
        status: 200,
        body: "Unauthorized access"
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      wrapper.find('input[name="name"]').simulate("change", { target: { value: "vince" } });
      wrapper.find('form').simulate("submit", { preventDefault() { } });
      
      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().general_msg).equal("Check your internet connection and try again");

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1");

        done();

      }, 100);

    })


    it('form submission done properly and form error message responses are handled properly', (done) => {

      fetchMock.get(GLOBAL.baseUrl + "/v2/shoppinglists/1/items/1", {
        status: 200,
        body: []
      })
      
      fetchMock.put(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1", {
        status: 200,
        body: { error: { name: ["Name error"], amount: ["Amount error"] } }
      })

      wrapper = mount(<UpdateShoppingListItem match={url_param} />)
      wrapper.find('input[name="name"]').simulate("change", { target: { value: "vince" } });
      wrapper.find('form').simulate("submit", { preventDefault() { } });

      expect(wrapper.state().loading).equal(true);

      setTimeout(function () {

        expect(wrapper.state().loading).equal(false);
        expect(wrapper.state().name_error).equal("Name error");
        expect(wrapper.state().amount_error).equal("Amount error");
        expect(wrapper.find("span.label").length).equal(2);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/shoppinglists/1/items/1");

        done();

      }, 100);

    })

  })



})