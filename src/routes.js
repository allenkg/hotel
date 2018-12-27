import React from 'react';
import App from "./containers/App";
import { Route } from "react-router";
import Main from "./containers/Main.container";


export default (
  <Route component={App}>
    <Route path="/" component={Main}>
    </Route>
  </Route>
)