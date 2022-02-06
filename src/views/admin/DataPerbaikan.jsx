import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default class DataPerbaikan extends Component {
    async componentDidMount() {
        var table = $('#tableTable').DataTable();

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
                                            <table className="table" id="tableTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>NIP</th>
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