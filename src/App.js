import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

// Admin
import AdminHome from './views/admin/Home';
import TambahPegawai from "./views/admin/TambahPegawai";
import DataPegawai from "./views/admin/DataPegawai";
import LoginAdmin from "./views/admin/Login";
// User
import UserHome from './views/user/Home';
import LoginUser from "./views/user/Login";

import NotFound from "./views/errors/NotFound";

export default class App extends Component {
  render() {
    return (
      <Routes>
        {/* Admin */}
        <Route path="admin/" exact element={<AdminHome />} />
        <Route path="admin/tambah-pegawai" exact element={<TambahPegawai />} />
        <Route path="admin/data-pegawai" exact element={<DataPegawai />} />
        <Route path="admin/login" exact element={<LoginAdmin />} />

        {/* Admin */}
        <Route path="user/" exact element={<AdminHome />} />
        <Route path="user/tambah-pegawai" exact element={<TambahPegawai />} />
        {/* <Route path="user/data-pegawai" exact element={<DataPegawai />} /> */}
        <Route path="user/login" exact element={<LoginUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    );
  }
}