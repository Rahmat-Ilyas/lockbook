import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default class ITService extends Component {
    async componentDidMount() {
        var table = $('#tablePegawai').DataTable();
        table.row.add({
            0: '1',
            1: 'Wahyudin Annur',
            2: '082345643778',
            3: 'Jl. Bunga harapan, tanete',
            4: 'Instalasi perangkat lunak',
            5: `<button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</button>`
        }).draw();
        table.row.add({
            0: '2',
            1: 'Muhammad Hasan',
            2: '082886868548',
            3: 'Jl. Kemakmuran, tanete',
            4: 'Spesialis Hardware',
            5: `<button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</button>`
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
                <Layout active="it-service">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="#!">Kelola Pegawai</li>
                            <li className="active">Data Pegawai</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Data IT Service</h3>
                                            <ul className="panel-controls">
                                                <li>
                                                    <a className="bg-info" href="#!" style={{ width: '120px', borderRadius: '0', color: '#fff', textDecoration: 'none' }}><span className="fa fa-plus" /> Tambah Data</a>
                                                </li>
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="tablePegawai">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>Nama Pegawai</th>
                                                        <th>Telepon</th>
                                                        <th width="350">Alamat</th>
                                                        <th>Spesialis/Keahlian</th>
                                                        <th width="200">Aksi</th>
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