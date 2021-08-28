import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/homepage/home';
import Splashpage from './components/splashpage/splashpage';
import CabinForm from './components/cabin/cabinForm';
import { authenticate } from './store/session';
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

        <ProtectedRoute path='/' exact={true} >
          <Home />
        </ProtectedRoute>

        <ProtectedRoute path='/createCabin' exact={true} >
          <CabinForm />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
