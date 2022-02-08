import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase.js';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Layout from "./Layout";

export default class ITService extends Component {
    componentDidMount() {
        const self = this;
        self.getData()
    }

    state = {
        uid: '',
        nama: '',
        telepon: '',
        alamat: '',
        spesialis: '',
        username: '',
    }

    getData = async () => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();
        const result = await getDocs(collection(db, "it_service"));
        let no = 1;
        result.forEach((doc) => {
            let res = doc.data();
            table.row.add({
                0: no,
                1: res.nama,
                2: res.telepon,
                3: res.alamat,
                4: res.spesialis,
                5: res.username,
                6: `<button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                        <button class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</button>`
            }).draw();
            no += 1;
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { uid, nama, telepon, alamat, spesialis, username } = this.state;
        $('.btn-submit').html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        try {
            const res = query(collection(db, "it_service"), where("username", "==", username));

            const result = await getDocs(res);
            var cek;
            result.forEach((doc) => {
                cek = + 1;
            });

            if (cek) {
                this.notify('warn', 'Username telah terdaftar!');
            } else {
                await addDoc(collection(db, "it_service"), {
                    uid: uid,
                    nama: nama,
                    telepon: telepon,
                    alamat: alamat,
                    spesialis: spesialis,
                    username: username,
                    password: username,
                });

                this.notify('success', 'Data IT Service baru berhasil ditambah');
                this.getData();
                this.clearForm();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-submit').html('Submit').removeAttr('disabled');

    }

    notify = (status, message) => {
        var config = {
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
        };
        if (status == 'success') toast.success(message, config);
        else if (status == 'info') toast.info(message, config);
        else if (status == 'warn') toast.warn(message, config);
        else if (status == 'error') toast.error(message, config);
    }

    clearForm = (e) => {
        $('form')[0].reset();
        $('.modal .close').click();
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
                                                    <a className="bg-info" href="#!" style={{ width: '120px', borderRadius: '0', color: '#fff', textDecoration: 'none' }} data-toggle="modal" data-target="#tesModal"><span className="fa fa-plus" /> Tambah Data</a>
                                                </li>
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>Nama</th>
                                                        <th>Telepon</th>
                                                        <th width="300">Alamat</th>
                                                        <th>Spesialis/Keahlian</th>
                                                        <th>Username</th>
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

                {/* Modal */}
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="modal fade" id="tesModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button className="close" data-dismiss="modal"><span>×</span></button>
                                    <h4 className="modal-title" id="myModalLabel">Tambah Data IT Service</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-md-3">Nama Lengkap</label>
                                        <div className="col-md-9">
                                            <input type="text" name="nama" onChange={this.handleChange} className="form-control" required placeholder="Nama Lengkap..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Telepon</label>
                                        <div className="col-md-9">
                                            <input type="text" name="telepon" onChange={this.handleChange} className="form-control" required placeholder="Telepon..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Alamat</label>
                                        <div className="col-md-9">
                                            <textarea name="alamat" onChange={this.handleChange} className="form-control" required rows="5" placeholder="Alamat..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Spesialis/Keahlian</label>
                                        <div className="col-md-9">
                                            <input type="text" name="spesialis" onChange={this.handleChange} className="form-control" required placeholder="Spesialis/Keahlian..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Username</label>
                                        <div className="col-md-9">
                                            <input type="text" name="username" onChange={this.handleChange} className="form-control" required placeholder="Username..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3"></label>
                                        <div className="col-md-9">
                                            <span className="text-info">Note: Password default sama dengan username yang terdaftar</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-default btn-lg" type="button" onClick={this.clearForm}>Close</button>
                                    <button className="btn btn-primary btn-lg pull-right btn-submit" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div >
        );
    }
}