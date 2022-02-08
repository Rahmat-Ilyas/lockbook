import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin
import AdminHome from './views/admin/Home';
import TambahPegawai from "./views/admin/TambahPegawai";
import DataPegawai from "./views/admin/DataPegawai";
import DataPerbaikan from "./views/admin/DataPerbaikan";
import ITService from "./views/admin/ITService";
import Laporan from "./views/admin/Laporan";
import LoginAdmin from "./views/admin/Login";

// Service
import ServiceHome from './views/service/Home';
import DataPerbaikanBaru from "./views/service/DataPerbaikanBaru";
import RiwayatPerbaikanProses from "./views/service/RiwayatPerbaikan";
import PerbaikanBerlangsung from "./views/service/PerbaikanBerlangsung";
import LoginService from "./views/service/Login";

// User
import UserHome from './views/user/Home';
import PerbaikanBaru from './views/user/PerbaikanBaru';
import ProgresPerbaikan from './views/user/ProgresPerbaikan';
import RiwayatPerbaikan from './views/user/RiwayatPerbaikan';
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
               <Route path="user/progres-perbaikan" exact element={<ProgresPerbaikan />} />
               <Route path="user/riwayat-perbaikan" exact element={<RiwayatPerbaikan />} />
               <Route path="user/login" exact element={<LoginUser />} />
               <Route path="*" element={<NotFound />} />

               {/* Admin */}
               <Route path="admin/" exact element={<AdminHome />} />
               <Route path="admin/tambah-pegawai" exact element={<TambahPegawai />} />
               <Route path="admin/data-pegawai" exact element={<DataPegawai />} />
               <Route path="admin/data-perbaikan" exact element={<DataPerbaikan />} />
               <Route path="admin/it-service" exact element={<ITService />} />
               <Route path="admin/laporan" exact element={<Laporan />} />
               <Route path="admin/login" exact element={<LoginAdmin />} />

               {/* Service */}
               <Route path="service/" exact element={<ServiceHome />} />
               <Route path="service/data-perbaikan-baru" exact element={<DataPerbaikanBaru />} />
               <Route path="service/riwayat-perbaikan" exact element={<RiwayatPerbaikanProses />} />
               <Route path="service/perbaikan-berlangsung" exact element={<PerbaikanBerlangsung />} />
               <Route path="service/login" exact element={<LoginService />} />
            </Routes >

         </Router>
      );
   }
}