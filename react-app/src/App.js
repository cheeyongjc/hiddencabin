import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/homepage/home';
import Splashpage from './components/splashpage/splashpage';
import CabinForm from './components/cabin/cabinForm';
import { authenticate } from './store/session';
import OneCabin from './components/cabin/cabin';
import ReviewForm from './components/review/reviewForm';
import EditCabin from './components/cabin/editCabin';
import Footer from './components/navigation/footer';
// import UsersList from './components/UsersList';
// import User from './components/User';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route path='/splash' exact={true}>
          <Splashpage />
        </Route>

        <Route path='/' exact={true} >
          <Home />
        </Route>

        <Route path='/createCabin' exact={true} >
          <CabinForm />
        </Route>

        <Route path='/cabins/:id' exact={true} >
          <OneCabin />
          <ReviewForm />
        </Route>

        <Route path='/cabins/edit/:id' exact={true}>
          <EditCabin />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
