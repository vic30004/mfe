import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));
import Header from "./components/Header";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthApp onSignIn={() => setIsSignIn(true)} />
              </Route>
              <Route path='/' component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
