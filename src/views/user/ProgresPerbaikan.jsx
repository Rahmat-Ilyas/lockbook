import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { db } from '../../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default class ProgresPerbaikan extends Component {
    async componentDidMount() {
        var table = $('#tablePegawai').DataTable();

        const result = await getDocs(collection(db, "pegawai"));
        let no = 1;
        result.forEach((doc) => {
            let res = doc.data();
            table.row.add({
                0: no,
                1: res.nip,
                2: res.nama,
                3: res.telepon,
                4: res.alamat,
                5: `<button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</button>`
            }).draw();
            no += 1;
        });
    }

    render() {
        return (
            <div>
                <Layout active="progres-perbaikan">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Progres Perbaikan</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', minHeight: '75vh' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-tasks" /> Progres Perbaikan</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* START DEFAULT DATATABLE */}
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div className="col-sm-5">
                                                            <h2>Detail Barang/Device</h2>
                                                            <hr />
                                                            <div>
                                                                <label>Pilih Perbaikan Yang Sedang Berlangsung</label>
                                                                <select className="form-control select">
                                                                    <option value="1">Toshiba/35552727388</option>
                                                                    <option value="2">Samsung/233322232</option>
                                                                </select>

                                                                <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Nama Device</th>
                                                                            <td>:</td>
                                                                            <td>Toshiba</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Nomor Series</th>
                                                                            <td>:</td>
                                                                            <td>35552727388</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Problem</th>
                                                                            <td>:</td>
                                                                            <td>Sering mati sendiri</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Tanggal Masuk</th>
                                                                            <td>:</td>
                                                                            <td>02/02/2022</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Tanggal Keluar</th>
                                                                            <td>:</td>
                                                                            <td>-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Ditangani Oleh</th>
                                                                            <td>:</td>
                                                                            <td>Rahmat Ilyas</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Status</th>
                                                                            <td>:</td>
                                                                            <td>Diproses</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h2 className="text-center">Timeline Progres</h2>
                                                            <hr />
                                                            <div className="tracking-list">
                                                                <div className="tracking-item tracking-active">
                                                                    <div className="tracking-icon status-delivered">
                                                                        <i class="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 10<span>05:01 PM</span></div>
                                                                    <div className="tracking-content">
                                                                        Sedang Diproses
                                                                        <span>Perbaikan sedang berlangsung, mohon tunggu</span>
                                                                    </div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i class="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 02<span>04:08 PM</span></div>
                                                                    <div className="tracking-content">Panding<span>Barang yang dibutuhkan tidak tersedia, sedang dipesan</span></div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i class="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 01<span>05:25 PM</span></div>
                                                                    <div className="tracking-content">Sedang Diproses<span>Tim IT Service (Rahmat Ilyas) telah menerima pengajuan perbaikan anda. Silahkan bawah barang anda ke Departemen IT</span></div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i class="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 01<span>08:58 AM</span></div>
                                                                    <div className="tracking-content">Sedang Ditinjau<span>Pengajuan perbaikan baru berhasil di input</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* END DEFAULT DATATABLE */}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}