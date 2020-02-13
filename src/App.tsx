import * as React from "react";
import Router from "@/routes/router";
import { hot } from "react-hot-loader/root";

const App = () => {
  return (
    <div>
      <Router />
    </div>
  );
};

export default hot(App);
