import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

//not authenticated
import NavigationBar from "./components/Landing/Nav/index.js";
import LandingPage from "./components/Landing/LandingPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch, loaded]);

  // if (!loaded) {
  //   return null;
  // }

  //If user is null then we only show login/signup forms.

  if (!user) {
    return (
      <BrowserRouter>
        <NavigationBar status="user-not-logged"></NavigationBar>
        <Switch>
          <Route path="/" exact={true}>
            <LandingPage status="default" />
          </Route>
          <Route path="/login" exact={true}>
            <LandingPage status="user-login" />
          </Route>
          <Route path="/signup" exact={true}>
            <LandingPage status="userSignUp" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    loaded && (
      <BrowserRouter>
        <NavigationBar status="user-is-logged"></NavigationBar>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/" exact={true}>
            <h1>My Home Page</h1>
          </ProtectedRoute>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
