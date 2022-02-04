import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin
import AdminHome from './views/admin/Home';
import TambahPegawai from "./views/admin/TambahPegawai";
import DataPegawai from "./views/admin/DataPegawai";
import LoginAdmin from "./views/admin/Login";

// User
import UserHome from './views/user/Home';
import PerbaikanBaru from './views/user/PerbaikanBaru';
import LoginUser from "./views/user/Login";

import NotFound from "./views/errors/NotFound";

export default class Web extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* User */}
          <Route path="/" exact element={<UserHome />} />
          <Route path="user/" exact element={<UserHome />} />
          <Route path="user/perbaikan-baru" exact element={<PerbaikanBaru />} />
          <Route path="user/login" exact element={<LoginUser />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin */}
          <Route path="admin/" exact element={<AdminHome />} />
          <Route path="admin/tambah-pegawai" exact element={<TambahPegawai />} />
          <Route path="admin/data-pegawai" exact element={<DataPegawai />} />
          <Route path="admin/login" exact element={<LoginAdmin />} />
        </Routes >

      </Router>
    );
  }
}