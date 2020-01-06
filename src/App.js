import React from "react";
import { Route } from "react-router-dom";

import styles from "./App.less";
import SiderDemo from './layout/Basic'

const App = () => {
  return (
    <div>
      {/* <Route path="/" component={Main} /> */}
      <SiderDemo />
    </div>
  );
};

export default App;
