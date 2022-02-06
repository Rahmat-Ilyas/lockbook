import React, { Component } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default class RiwayatPerbaikan extends Component {
    async componentDidMount() {
        var table = $('#tablePegawai').DataTable();

        const result = await getDocs(collection(db, "pegawai"));
        let no = 1;
        result.forEach((doc) => {
            let res = doc.data();
            table.row.add({
                0: '1',
                1: 'Toshiba',
                2: '-',
                3: 'Sering mati sendiri',
                4: 'Rahmat Ilyas',
                5: '02/02/2022',
                6: '-',
                7: 'Diproses',
            }).draw();
            no += 1;
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
                                                    <table className="table" id="tablePegawai">
                                                        <thead>
                                                            <tr>
                                                                <th width="10">No</th>
                                                                <th>Nama Device</th>
                                                                <th>Nomor Series</th>
                                                                <th width="350">Problem</th>
                                                                <th>Tggl Masuk</th>
                                                                <th>Tggl Diambil</th>
                                                                <th>Ditangani Oleh</th>
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