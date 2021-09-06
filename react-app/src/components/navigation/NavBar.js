import './navbar.css';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import Demo from '../demo/demo';


const NavBar = ({ isLoaded }) => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const handleCreate = (e) => {
    history.push(`/createCabin`);
  }

  let userSession;
  if (user) {
    userSession = (
      <div className='navbar'>
        <NavLink className='navLinkHome' to='/' exact={true} activeClassName='active'>HiddenCabin</NavLink>
        <button className='createCabinButton' onClick={handleCreate}>Create Cabin</button>
        <div className='navLogout'><LogoutButton /></div>
      </div>
    )
  } else {
    userSession = (
      <div className='navbar'>
        <NavLink className='navLinkHome' to='/' exact={true} activeClassName='active'>HiddenCabin</NavLink>
        <NavLink className='navLogin' to='/login' exact={true} activeClassName='active'>Login</NavLink>
        <NavLink className='navSignup' to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
        {/* <div className='navDemo'>
          <Demo />
        </div> */}
      </div>
    )
  }
  return (
    <>
      {userSession}
    </>
  )
}
export default NavBar;

  //   return (
  //     <nav>
  //       <ul>
  //         <li>
  //           <NavLink to='/' exact={true} activeClassName='active'>
  //             Home
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to='/login' exact={true} activeClassName='active'>
  //             Login
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //             Sign Up
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to='/users' exact={true} activeClassName='active'>
  //             Users
  //           </NavLink>
  //         </li>
  //         <li>
  //           <LogoutButton />
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  //
