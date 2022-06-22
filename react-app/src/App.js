import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import "./components/BookApi/style.css";

//not authenticated
import NavigationBar from "./components/Landing/Nav/index.js";
import LandingPage from "./components/Landing/LandingPage";
import FooterBottom from "./components/Footer/FooterBottom";

//testing components here..
// eslint-disable-next-line
import ProxyHome from "./components/proxyHome";
import PageNotFound from "./components/PageNotFound";

//when user is authenticated
import ThoughtMain from "./components/ThoughtsPage/ThoughtMain";
import ThoughtDetail from "./components/ThoughtDetailPage/ThoughtDetail";
import AddThought from "./components/FormComponent/AddThought";
import EditThought from "./components/FormComponent/EditThought";
import SearchDisplay from "./components/Landing/SearchDisplay/SearchDisplay";
import SearchEmpty from "./components/Landing/SearchDisplay/SearchEmpty";
import CategoryDisplay from "./components/Landing/Categories/CategoryDisplay";
import MyThoughts from "./components/Landing/MyThoughts/MyThoughts";
import FooterLogged from "./components/Footer/FooterLogged";

//Search component for google books API.
import Main from "./components/BookApi/Main";

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

  // if (!user) {
  //   return (
  //     <BrowserRouter>
  //       <NavigationBar status="user-not-logged"></NavigationBar>
  //       <Switch>
  //         <Route path="/" exact={true}>
  //           <LandingPage status="default" />
  //         </Route>
  //         <Route path="/login" exact={true}>
  //           <LandingPage status="user-login" />
  //         </Route>
  //         <Route path="/signup" exact={true}>
  //           <LandingPage status="userSignUp" />
  //         </Route>
  //         <Route>
  //           <PageNotFound status="not-logged" />
  //         </Route>
  //       </Switch>
  //       <Footer />
  //     </BrowserRouter>
  //   );
  // }

  return (
    <div>
      {!user ? (
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
            <Route>
              <PageNotFound status="not-logged" />
            </Route>
          </Switch>
          <FooterBottom />
        </BrowserRouter>
      ) : (
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
              <ThoughtMain />
            </ProtectedRoute>
            <ProtectedRoute path="/thoughts/add" exact={true}>
              <AddThought />
            </ProtectedRoute>
            <ProtectedRoute path="/thoughts/:thoughtId/edit">
              <EditThought />
            </ProtectedRoute>
            <ProtectedRoute path="/thoughts/:thoughtId" exact={true}>
              <ThoughtDetail />
            </ProtectedRoute>
            <ProtectedRoute path="/search/:searchId" exact={true}>
              <SearchDisplay />
            </ProtectedRoute>
            <ProtectedRoute path="/search/" exact={true}>
              <SearchEmpty />
            </ProtectedRoute>
            <ProtectedRoute path="/categories/:categoryId" exact={true}>
              <CategoryDisplay />
            </ProtectedRoute>
            <ProtectedRoute path="/my-thoughts" exact={true}>
              <MyThoughts />
            </ProtectedRoute>
            <ProtectedRoute path="/books/" exact={true}>
              <Main />
            </ProtectedRoute>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
          <FooterLogged />
        </BrowserRouter>
      )}
    </div>
  );

  // return (
  //   loaded && (
  //     <BrowserRouter>
  //       <NavigationBar status="user-is-logged"></NavigationBar>
  //       <Switch>
  //         <Route path="/login" exact={true}>
  //           <LoginForm />
  //         </Route>
  //         <Route path="/sign-up" exact={true}>
  //           <SignUpForm />
  //         </Route>
  //         <ProtectedRoute path="/" exact={true}>
  //           <ThoughtMain />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/add" exact={true}>
  //           <AddThought />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/:thoughtId/edit">
  //           <EditThought />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/:thoughtId" exact={true}>
  //           <ThoughtDetail />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/search/:searchId" exact={true}>
  //           <SearchDisplay />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/search/" exact={true}>
  //           <SearchEmpty />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/categories/:categoryId" exact={true}>
  //           <CategoryDisplay />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/my-thoughts" exact={true}>
  //           <MyThoughts />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/books/" exact={true}>
  //           <Main />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/users" exact={true}>
  //           <UsersList />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/users/:userId" exact={true}>
  //           <User />
  //         </ProtectedRoute>
  //         <Route>
  //           <PageNotFound />
  //         </Route>
  //       </Switch>
  //       <FooterLogged />
  //     </BrowserRouter>
  //   )
  // );
  // return (
  //   loaded && (
  //     <BrowserRouter>
  //       <NavigationBar status="user-is-logged"></NavigationBar>
  //       <Switch>
  //         <Route path="/login" exact={true}>
  //           <LoginForm />
  //         </Route>
  //         <Route path="/sign-up" exact={true}>
  //           <SignUpForm />
  //         </Route>
  //         <ProtectedRoute path="/" exact={true}>
  //           <ThoughtMain />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/add" exact={true}>
  //           <AddThought />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/:thoughtId/edit">
  //           <EditThought />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/thoughts/:thoughtId" exact={true}>
  //           <ThoughtDetail />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/search/:searchId" exact={true}>
  //           <SearchDisplay />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/search/" exact={true}>
  //           <SearchEmpty />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/categories/:categoryId" exact={true}>
  //           <CategoryDisplay />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/my-thoughts" exact={true}>
  //           <MyThoughts />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/books/" exact={true}>
  //           <Main />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/users" exact={true}>
  //           <UsersList />
  //         </ProtectedRoute>
  //         <ProtectedRoute path="/users/:userId" exact={true}>
  //           <User />
  //         </ProtectedRoute>
  //         <Route>
  //           <PageNotFound />
  //         </Route>
  //       </Switch>
  //       <FooterLogged />
  //     </BrowserRouter>
  //   )
  // );
}

export default App;
