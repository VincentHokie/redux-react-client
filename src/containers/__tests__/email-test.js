import React from 'react';
import { shallow, mount, render } from 'enzyme';

import EmailConfirm from '../email_confirm.component.js';

import App from '../../App.js';

import { BrowserRouter, MemoryRouter } from 'react-router-dom'

var GLOBAL = require("../../globals.js")
var fetchMock = require("fetch-mock");
var expect = require("chai").expect;
import "../localStorage.js";

describe('Email confirmation', () => {
  let wrapper;

  it('wraps content in a div with .container.col-xs-12 classes', () => {

    localStorage.setItem("globals", JSON.stringify({ "logged_in": false }));
    wrapper = shallow(<EmailConfirm />)
    expect(wrapper.find('.container.col-xs-12').length).equal(1);

  });

  describe('State Behaviour', () => {

    beforeEach(() => {
      localStorage.setItem("globals", JSON.stringify({ "logged_in": false }));
      wrapper = mount(<EmailConfirm />);
    })

    it('if the theres processing going on, the input is not editable', () => {

      wrapper.setState({ loading: false });
      expect(wrapper.find('input').prop("disabled")).equal(false);

      wrapper.setState({ loading: true });
      expect(wrapper.find('input').prop("disabled")).equal("disabled");

    })

    it('if the theres a form error, the error should show', () => {

      wrapper.setState({ email_error: false });
      expect(wrapper.find('span.label').length).equal(0);

      wrapper.setState({ email_error: "Error" });
      expect(wrapper.find('span.label').length).equal(1);

    })

    it('if the theres a flash message, expect the FlashMsg component, otherwise dont', () => {

      wrapper.setState({ general_msg: false });
      expect(wrapper.find('.message').length).equal(0);

      wrapper.setState({ general_msg: "A flash message" });
      expect(wrapper.find('FlashMsg').length).equal(1);

    })

  })

  describe('Flash Message Behaviour', () => {

    it('if a flash message is brought from a previous route, expect it to be shown', () => {

      localStorage.setItem("globals", JSON.stringify({ "flash": "Message", "logged_in": false }));
      wrapper = mount(<EmailConfirm />)

      expect(wrapper.find('.alert.message').length).equal(1);
      expect(wrapper.find('.alert.message').html()).contain("Message");

    })

  })

  describe('API interaction Behaviour', () => {

    beforeEach(() => {
      localStorage.setItem("globals", JSON.stringify({ "logged_in": false }));
    })

    it('success responses are handled properly', (done) => {

      fetchMock.post(GLOBAL.baseUrl + "/v1/auth/reset-password", {
        status: 200,
        body: { success: "Were here" }
      })

      wrapper = mount(<EmailConfirm />)

      var input = wrapper.find('input');
      input.simulate("change", { target: { value: "vince@gmail.com", name: "email" } });

      wrapper.find('form').simulate("submit", { preventDefault() { } });
      wrapper.setState({ general_msg: "Were here" });

      setTimeout(function () {

        expect(wrapper.state().general_msg).equal("Were here");

        expect(wrapper.find("FlashMsg").length).equal(1);
        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/auth/reset-password");

        done();

      }, 100);

    })


    it('error responses are handled properly', (done) => {

      fetchMock.post(GLOBAL.baseUrl + "/v1/auth/reset-password", {
        status: 200,
        body: { error: "Were here" }
      })

      wrapper = mount(<EmailConfirm />)

      var input = wrapper.find('input');
      input.simulate("change", { target: { value: "vince@gmail.com", name: "email" } });

      wrapper.find('form').simulate("submit", { preventDefault() { } });

      setTimeout(function () {

        expect(wrapper.state().general_msg).equal("Were here");

        expect(wrapper.find("FlashMsg").length).equal(1);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/auth/reset-password");

        done();

      }, 100);

    })


    it('form error message responses are handled properly', (done) => {

      fetchMock.post(GLOBAL.baseUrl + "/v1/auth/reset-password", {
        status: 200,
        body: { error: { email: ["Were here"] } }
      })

      wrapper = mount(<EmailConfirm />)

      var input = wrapper.find('input');
      input.simulate("change", { target: { value: "vince@gmail.com", name: "email" } });

      wrapper.find('form').simulate("submit", { preventDefault() { } });
      wrapper.setState({ email_error: "Were here" });

      setTimeout(function () {

        expect(wrapper.state().email_error).equal("Were here");

        expect(wrapper.find("FormError").length).equal(1);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/auth/reset-password");

        done();

      }, 100);

    })

    it('non-json error message responses are handled properly', (done) => {

      fetchMock.post(GLOBAL.baseUrl + "/v1/auth/reset-password", {
        status: 200,
        body: "Unauthorized access"
      })

      wrapper = mount(<EmailConfirm />)

      var input = wrapper.find('input');
      input.simulate("change", { target: { value: "vince@gmail.com", name: "email" } });

      wrapper.find('form').simulate("submit", { preventDefault() { } });

      setTimeout(function () {

        expect(wrapper.state().general_msg).equal("Check your internet connection and try again");
        expect(wrapper.find("FlashMsg").length).equal(1);

        expect(fetchMock.called()).equal(true);
        expect(fetchMock.lastUrl()).equal(GLOBAL.baseUrl + "/v1/auth/reset-password");

        done();

      }, 100);

    })

    afterEach(() => {
      expect(fetchMock.calls().unmatched).to.be.empty;
      fetchMock.restore();
    })

  })




})