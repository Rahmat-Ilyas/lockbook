import React, { Component, useState, useEffect } from 'react';
import $, { each } from 'jquery';
import { toast } from 'react-toastify';
import DataTable from 'datatables.net';
import { db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, updateDoc, query, where } from "firebase/firestore";
import Layout from "./Layout";

export default class DataPegawai extends Component {
    state = {
        uid: '',
        nip: '',
        nama: '',
        telepon: '',
        alamat: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let data = {};
        for (let [key, val] of formData.entries()) {
            data[key] = val;
        }

        $('.btn-submit').html('Update <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        try {
            // const result = query(collection(db, "pegawai"), where("nip", "==", nip));
            // const result = await getDoc(query(doc(db, "pegawai"), where("nip", "==", nip)));


            // const result = await getDocs(res);
            const result = doc(db, "pegawai", data.id);

            await updateDoc(result, {
                nip: data.nip,
                nama: data.nama,
                telepon: data.telepon,
                alamat: data.alamat,
                // password: data.nip,
            });

            $('.modal').hide();
            this.notify('success', 'Data pegawai baru berhasil ditambah');
            this.getData();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-submit').html('Update').removeAttr('disabled');

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

    async getData() {
        var table = $('#tablePegawai').DataTable();
        table.clear().draw();

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
                5: `<button class="btn btn-success btn-edit" data-toggle="modal" data-target="#modal-edit" data-id=` + doc.id + `><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</button>`
            }).draw();
            no += 1;
        });

        $('.btn-edit').click(async function () {
            let id = $(this).attr('data-id');
            $('#uid').val(id);
            const result = await getDoc(doc(db, "pegawai", id));
            $.each(result.data(), function (key, val) {
                $('input[name="' + key + '"], textarea[name="' + key + '"]').val(val);
            });
        });
    }

    async componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <Layout active="adm-dtapegawai">
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
                                            <h3 className="panel-title">Data Pegawai</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table" id="tablePegawai">
                                                <thead>
                                                    <tr>
                                                        <th width="10">No</th>
                                                        <th>B/N</th>
                                                        <th>Nama Pegawai</th>
                                                        <th>Telepon</th>
                                                        <th width="350">Alamat</th>
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

                    {/* Modal Edit */}
                    <div className="modal fade" id="modal-edit" tabIndex={-1} role="dialog" aria-labelledby="modal-editLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modal-editLabel">Edit Data</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group row">
                                            <label className="col-md-3">B/N</label>
                                            <div className="col-md-9">
                                                <input type="hidden" name="id" id="uid" />
                                                <input type="number" name="nip" className="form-control" required placeholder="B/N..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Nama Lengkap</label>
                                            <div className="col-md-9">
                                                <input type="text" name="nama" className="form-control" required placeholder="Nama Lengkap..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Telepon</label>
                                            <div className="col-md-9">
                                                <input type="text" name="telepon" className="form-control" required placeholder="Telepon..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Alamat</label>
                                            <div className="col-md-9">
                                                <textarea name="alamat" className="form-control" required rows="5" placeholder="Alamat..." />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                        <button type="submit" className="btn btn-primary btn-submit">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </Layout >
            </div >
        );
    }
}