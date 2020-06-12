import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Router, Redirect } from "react-router-dom";

import "styles.css"

import App from "@components/App";
import FlashCard from "@components/FlashCard";


const Root = (props) => {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={FlashCard} />
        </Switch>
      </App>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
