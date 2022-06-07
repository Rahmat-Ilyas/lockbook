import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import Layout from "./Layout";

export default class ITService extends Component {
    componentDidMount() {
        this.getData();
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
                6: `<button class="btn btn-success btn-edit" data-toggle="modal" data-target="#modal-edit" data-id="` + doc.id + `"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-delete" data-toggle="modal" data-target="#modal-delete" data-id="` + doc.id + `"><i class="fa fa-trash"></i> Hapus</button>`
            }).draw();
            no += 1;
        });

        $('.btn-edit').click(async function () {
            let id = $(this).attr('data-id');
            $('#uid').val(id);
            const result = await getDoc(doc(db, "it_service", id));
            $.each(result.data(), function (key, val) {
                $('input[name="' + key + '_edt"], textarea[name="' + key + '_edt"]').val(val);
            });
        });

        $('.btn-delete').click(function () {
            let id = $(this).attr('data-id');
            $('.btn-delete-conf').attr('data-id', id);
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAdd = async (e) => {
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
                $('#form-add')[0].reset();
                $('.close-add').click();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-submit').html('Submit').removeAttr('disabled');

    }

    handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let data = {};
        for (let [key, val] of formData.entries()) {
            data[key] = val;
        }

        $('.btn-submit-edt').html('Update <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        try {
            const result = doc(db, "it_service", data.id_edt);

            await updateDoc(result, {
                nama: data.nama_edt,
                telepon: data.telepon_edt,
                alamat: data.alamat_edt,
                spesialis: data.spesialis_edt,
            });

            this.notify('success', 'Data IT Service berhasil di update');
            this.getData();
            $('.close-edt').click();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-submit-edt').html('Update').removeAttr('disabled');
    }

    handleDelete = async (e) => {
        e.preventDefault();
        $('.btn-delete-conf').html('Hapus <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
        try {
            let id = e.target.getAttribute("data-id");
            await deleteDoc(doc(db, "it_service", id));

            this.notify('success', 'Data IT Service berhasil di hapus');
            this.getData();
            $('.close-del').click();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-delete-conf').html('Hapus').removeAttr('disabled');
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

    render() {
        return (
            <div>
                <Layout active="device-perbaikan">
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

                {/* Modal Tambah */}
                <div className="modal fade" id="tesModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close close-add" data-dismiss="modal"><span>×</span></button>
                                <h4 className="modal-title" id="myModalLabel">Tambah Data IT Service</h4>
                            </div>
                            <form className="form-horizontal" id="form-add" onSubmit={this.handleAdd}>
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
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                    <button className="btn btn-primary btn-lg pull-right btn-submit" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Modal Edit */}
                <div className="modal fade" id="modal-edit" tabIndex={-1} role="dialog" aria-labelledby="modal-editLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <form id="form-edit" onSubmit={this.handleEdit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button className="close close-edt" data-dismiss="modal"><span>×</span></button>
                                    <h5 className="modal-title" id="modal-editLabel">Edit Data</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-md-3">Nama Lengkap</label>
                                        <div className="col-md-9">
                                            <input type="hidden" name="id_edt" id="uid" />
                                            <input type="text" name="nama_edt" className="form-control" required placeholder="Nama Lengkap..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Telepon</label>
                                        <div className="col-md-9">
                                            <input type="text" name="telepon_edt" className="form-control" required placeholder="Telepon..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Alamat</label>
                                        <div className="col-md-9">
                                            <textarea name="alamat_edt" className="form-control" required rows="5" placeholder="Alamat..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Spesialis/Keahlian</label>
                                        <div className="col-md-9">
                                            <input type="text" name="spesialis_edt" className="form-control" required placeholder="Spesialis/Keahlian..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                    <button type="submit" className="btn btn-primary btn-submit-edt">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal Hapus */}
                <div className="modal fade" id="modal-delete" tabIndex={-1} role="dialog" aria-labelledby="modal-deleteLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close close-del" data-dismiss="modal"><span>×</span></button>
                                <h5 className="modal-title" id="modal-deleteLabel">Hapus Data</h5>
                            </div>
                            <div className="modal-body">
                                <p>Yakin ingin menghapus data ini?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <a href="#" className="btn btn-danger btn-delete-conf" onClick={this.handleDelete}>Hapus</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}