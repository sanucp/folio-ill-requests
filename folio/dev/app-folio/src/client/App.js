import React, { Component } from "react";
import "./app.css";
import UsrForm from "./components/userform";
import Biblo from "./components/biblo";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedDate } from "react-intl";
import Wrapper from "./components/wrapper";

export default class App extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <UsrForm />
          <br />
          <Biblo />
          <FormattedDate
            value={Date.now()}
            year="numeric"
            month="long"
            day="numeric"
            weekday="long"
          />
        </Wrapper>
      </div>
    );
  }
}
