import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default class Laporan extends Component {
    async componentDidMount() {
        var table = $('#dataTable').DataTable();

        table.row.add({
            0: '1',
            1: '23111998',
            2: 'Sriwani Ilyas',
            3: 'Toshiba',
            4: '-',
            5: 'Sering mati sendiri',
            6: 'Rahmat Ilyas',
            7: '02/02/2022',
            8: '-',
            9: 'Diproses',
        }).draw();
        table.row.add({
            0: '2',
            1: '14021998',
            2: 'Muhammad Ilham',
            3: 'Toshiba',
            4: '-',
            5: 'Sering mati sendiri',
            6: 'Wahyuddin',
            7: '02/02/2022',
            8: '-',
            9: 'Diproses',
        }).draw();

        const result = await getDocs(collection(db, "pegawai"));
        let no = 1;
        result.forEach((doc) => {
            let res = doc.data();

            no += 1;
        });
    }

    exportTable = (e) => {
        e.preventDefault();
        var file = e.currentTarget.getAttribute('data-file');
        $('#dataTable').tableExport({ type: file, escape: 'false' });
    }

    render() {
        return (
            <div>
                <Layout active="laporan">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Laporan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Laporan</h3>
                                            <div className="btn-group pull-right">
                                                <button className="btn btn-danger dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bars" /> Export Data</button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="#!" data-file="csv" onClick={this.exportTable}><img src="/img/icons/csv.png" width={24} /> CSV</a></li>
                                                    <li><a href="#!" data-file="excel" onClick={this.exportTable} ><img src="/img/icons/xls.png" width={24} /> XLS</a></li>
                                                    <li><a href="#!" data-file="pdf" onClick={this.exportTable}><img src="/img/icons/pdf.png" width={24} /> PDF</a></li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <label>Pilih Priode Laporan</label>
                                                    <input type="date" className="form-control" />
                                                </div>
                                            </div>
                                            <hr />
                                            <table className="table" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>B/N</th>
                                                        <th>Nama Pegawai</th>
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
                    </div >
                </Layout >
            </div >
        );
    }
}