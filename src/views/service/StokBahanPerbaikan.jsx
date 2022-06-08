import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import Layout from "./Layout";

export default class RiwayatPerbaikan extends Component {
    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            const res = query(collection(db, "it_service"), where("uid", "==", user.uid));
            const result = await getDocs(res);
            let service_id = '';
            result.forEach((doc) => {
                service_id = doc.id;
            });

            self.getData(service_id);
        });
    }

    getData = async (service_id) => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();

        const result = await getDocs(query(collection(db, "bahan_perbaikan")));
        let i = 1;
        result.forEach(async (dta) => {
            var res = dta.data();
            table.row.add({
                0: i,
                1: res.nomor_series,
                2: res.nama_device,
                3: res.kategori,
                4: res.stok,
                5: res.tahun_pembuatan,
                6: res.tahun_keluar
            }).draw();

            i++;
        });
    }

    render() {
        return (
            <div>
                <Layout active="stok-bahan">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Riwayat Perbaikan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Riwayat Perbaikan</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>Kode Device (No Series)</th>
                                                        <th>Nama Device</th>
                                                        <th>Kategori</th>
                                                        <th>Stok</th>
                                                        <th>Tahun Pembuatan</th>
                                                        <th>Tahun Keluar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* END DEFAULT DATATABLE */}

                                </div>
                            </div>

                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}