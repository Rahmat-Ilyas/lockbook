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

        const result = await getDocs(query(collection(db, "perbaikan"), where('service_id', '==', service_id), orderBy("tggl_masuk", 'asc')));
        let i = 1;
        result.forEach(async (dta) => {
            var res = dta.data();
            var pegawai = await getDoc(doc(db, "pegawai", res.pegawai_id));
            var pgw = pegawai.data();
            var badge_color = '';
            if (res.status == 'ditinjau') badge_color = 'badge-info';
            else if (res.status == 'proses') badge_color = 'badge-warning';
            else if (res.status == 'panding') badge_color = 'badge-primary';
            else if (res.status == 'batal') badge_color = 'badge-danger';
            else if (res.status == 'selesai') badge_color = 'badge-success';

            table.row.add({
                0: i,
                1: pgw.nip,
                2: pgw.nama,
                3: res.nama_device,
                4: res.no_series ? res.no_series : '-',
                5: res.problem,
                6: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                7: res.tggl_keluar ? new Date(res.tggl_keluar.seconds * 1000).toLocaleDateString() : '-',
                8: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
            }).draw();

            i++;
        });
    }

    render() {
        return (
            <div>
                <Layout active="riwayat-perbaikan">
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
                                                        <th>B/N</th>
                                                        <th>Nama Pegawai</th>
                                                        <th>Nama Device</th>
                                                        <th>Nomor Series</th>
                                                        <th width="350">Problem</th>
                                                        <th>Tggl Masuk</th>
                                                        <th>Tggl Keluar</th>
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
                    </div >
                </Layout >
            </div >
        );
    }
}