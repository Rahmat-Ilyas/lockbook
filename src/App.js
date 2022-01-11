import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/admin/Home';
import Layout from "./components/Layout";

export default function routes() {
    return(
      <Router>
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/profil" exact element={<Layout/>} />
            {/*<Route path="/profil/:name" exact component={ProfilDetail} />*/}
            {/*<Route component={Notfound} />*/}
        </Routes>
      </Router>
    );
}