import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from './views/admin/Home';
import TambahPegawai from "./views/admin/TambahPegawai";
import DataPegawai from "./views/admin/DataPegawai";
import LoginAdmin from "./views/admin/Login";
import NotFound from "./views/errors/NotFound";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="admin/" exact element={<AdminHome />} />
        <Route path="admin/tambah-pegawai" exact element={<TambahPegawai />} />
        <Route path="admin/data-pegawai" exact element={<DataPegawai />} />
        <Route path="admin/login" exact element={<LoginAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    );
  }
}