import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { doc, collection, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import Layout from "./Layout";

export default class DataPerbaikan extends Component {
    async componentDidMount() {
        var table = $('#dataTable').DataTable();
        table.clear().draw();

        const result = await getDocs(query(collection(db, "perbaikan"), orderBy("tggl_masuk", 'asc')));
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
                6: res.proccess_by ? res.proccess_by : '-',
                7: new Date(res.tggl_masuk.seconds * 1000).toLocaleDateString(),
                8: res.tggl_keluar ? new Date(res.tggl_keluar.seconds * 1000).toLocaleDateString() : '-',
                9: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
            }).draw();

            i++;
        });
    }

    render() {
        return (
            <div>
                <Layout active="data-perbaikan">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Data Perbaikan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Data Perbaikan</h3>
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
                                                        <th width="300">Problem</th>
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
                    </div >
                </Layout >
            </div >
        );
    }
}