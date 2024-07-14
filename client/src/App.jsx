import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import SignupNGO from './Pages/SignUp-NGO';
import SignInOptions from './Pages/SignIn';
import NGOSignIn from './Pages/NgoSignin';
import MessSignIn from './Pages/MessSignin';
import SignupMess from './Pages/SignUp-Mess';
import CreateListing from './Pages/CreateListing';
import PrivateRoute from './Components/PrivateRoute';
import PrivateMessRoute from './Components/PrivateMessRoute';
import MessInterFace from './Pages/MessInterFace';
import NgoFoodListing from './Pages/NgoInterFace';
import FoodListing from './Pages/FoodListing';
// import FoodListing from './Pages/FoodListing';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signIn" element={<SignInOptions />} />
        <Route path='/ngo-signin' element={<NGOSignIn />} />
        <Route path='ngo-signup' element={<SignupNGO />} />
        <Route path='mess-signin' element={<MessSignIn />} />
        <Route path='mess-signup' element={<SignupMess />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path='createListing' element={<CreateListing />} />
          <Route path='myListing' element={<MessInterFace />} /> */}
          <Route path='messFoodListing' element={<NgoFoodListing />} />
          <Route path='foodListing/:listingID' element={<FoodListing />} />
        </Route>
        <Route element={<PrivateMessRoute />}>
          <Route path='createListing' element={<CreateListing />} />
          <Route path='myListing' element={<MessInterFace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
