import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from './views/admin/Home';
import TambahPegawai from "./views/admin/TambahPegawai";
import DataPegawai from "./views/admin/DataPegawai";
import NotFound from "./views/errors/NotFound";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="admin/" element={<AdminHome />} />
        <Route path="admin/tambah-pegawai" element={<TambahPegawai />} />
        <Route path="admin/data-pegawai" element={<DataPegawai />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    );
  }
}