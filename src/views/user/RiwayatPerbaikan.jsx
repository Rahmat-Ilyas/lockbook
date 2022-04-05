import React, { Component } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import Layout from "./Layout";

export default class RiwayatPerbaikan extends Component {
    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            var table = $('#dataTable').DataTable();
            table.clear().draw();

            const result = await getDocs(query(collection(db, "perbaikan"), where("uid", "==", user.uid)));
            let i = 1;
            result.forEach((doc) => {
                var res = doc.data();
                var badge_color = '';
                if (res.status == 'ditinjau') badge_color = 'badge-info';
                else if (res.status == 'proses') badge_color = 'badge-warning';
                else if (res.status == 'panding') badge_color = 'badge-primary';
                else if (res.status == 'batal') badge_color = 'badge-danger';
                else if (res.status == 'selesai') badge_color = 'badge-success';

                table.row.add({
                    0: i,
                    1: res.nama_device,
                    2: res.no_series ? res.no_series : '-',
                    3: res.problem,
                    4: res.proccess_by ? res.proccess_by : '-',
                    5: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                    6: res.tggl_keluar ? new Date(res.tggl_keluar.seconds * 1000).toLocaleDateString() : '-',
                    7: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
                }).draw();

                i++;
            });
        });
    }

    render() {
        return (
            <div>
                <Layout active="riwayat-perbaikan">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Riwayat Perbaikan</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', minHeight: '75vh' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-history" /> Riwayat Perbaikan</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* START DEFAULT DATATABLE */}
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title">Data Riwayat Perbaikan</h3>
                                                    <ul className="panel-controls">
                                                    </ul>
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table" id="dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th width="10">No</th>
                                                                <th>Nama Device</th>
                                                                <th>Nomor Series</th>
                                                                <th width="350">Problem</th>
                                                                <th>Ditangani Oleh</th>
                                                                <th>Tggl Masuk</th>
                                                                <th>Tggl Diambil</th>
                                                                <th>Status</th>
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
                            </div>
                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}