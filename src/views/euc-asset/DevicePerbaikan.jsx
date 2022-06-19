import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import Layout from "./Layout";

export default class DevicePerbaikan extends Component {
    componentDidMount() {
        this.getData();
    }

    state = {
        nama_device: '',
        kategori: '',
        stok: '',
        tahun_pembuatan: '',
        tahun_keluar: '',
    }

    getData = async () => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();
        const result = await getDocs(collection(db, "bahan_perbaikan"));
        let no = 1;
        result.forEach((doc) => {
            let res = doc.data();
            table.row.add({
                0: no,
                1: res.nama_device,
                2: res.kategori,
                3: res.stok,
                4: res.tahun_pembuatan,
                5: res.tahun_keluar,
                6: `<button class="btn btn-success btn-edit" data-toggle="modal" data-target="#modal-edit" data-id="` + doc.id + `"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-delete" data-toggle="modal" data-target="#modal-delete" data-id="` + doc.id + `"><i class="fa fa-trash"></i> Hapus</button>`
            }).draw();
            no += 1;
        });

        $('.btn-edit').click(async function () {
            let id = $(this).attr('data-id');
            $('#uid').val(id);
            const result = await getDoc(doc(db, "bahan_perbaikan", id));
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

        const { nama_device, kategori, stok, tahun_pembuatan, tahun_keluar } = this.state;
        $('.btn-submit').html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        try {
            await addDoc(collection(db, "bahan_perbaikan"), {
                nama_device: nama_device,
                kategori: kategori,
                stok: stok,
                tahun_pembuatan: tahun_pembuatan,
                tahun_keluar: tahun_keluar,
            });

            this.notify('success', 'Stok Bahan Perbaikan baru berhasil ditambah');
            this.getData();
            $('#form-add')[0].reset();
            $('.close-add').click();
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
            const result = doc(db, "bahan_perbaikan", data.id_edt);

            await updateDoc(result, {
                nama_device: data.nama_device_edt,
                kategori: data.kategori_edt,
                stok: data.stok_edt,
                tahun_pembuatan: data.tahun_pembuatan_edt,
                tahun_keluar: data.tahun_keluar_edt,
            });

            this.notify('success', 'Stok Bahan Perbaikan berhasil di update');
            this.getData();
            $('.close-edt-more').click();
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
            await deleteDoc(doc(db, "bahan_perbaikan", id));

            this.notify('success', 'Stok Bahan Perbaikan berhasil di hapus');
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
                            <li className="active">Stok Bahan Perbaikan</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Stok Bahan Perbaikan</h3>
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
                                                        <th>Nama Device</th>
                                                        <th>Kategori</th>
                                                        <th>Stok</th>
                                                        <th>Tahun Pembuatan</th>
                                                        <th>Tahun Keluar</th>
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
                                <h4 className="modal-title" id="myModalLabel">Tambah Stok Bahan Perbaikan</h4>
                            </div>
                            <form className="form-horizontal" id="form-add" onSubmit={this.handleAdd}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-md-3">Nama Device</label>
                                        <div className="col-md-9">
                                            <input type="text" name="nama_device" onChange={this.handleChange} className="form-control" required placeholder="Nama Device..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Kategori</label>
                                        <div className="col-md-9">
                                            <input type="text" name="kategori" onChange={this.handleChange} className="form-control" required placeholder="Kategori..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Stok</label>
                                        <div className="col-md-9">
                                            <input type="number" name="stok" onChange={this.handleChange} className="form-control" required placeholder="Stok..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Tahun Pembuatan</label>
                                        <div className="col-md-9">
                                            <input type="number" name="tahun_pembuatan" onChange={this.handleChange} className="form-control" required placeholder="Tahun Pembuatan..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3">Tahun Keluar</label>
                                        <div className="col-md-9">
                                            <input type="number" name="tahun_keluar" onChange={this.handleChange} className="form-control" required placeholder="Tahun Keluar..." />
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
                                    <button className="close close-edt-more" data-dismiss="modal"><span>×</span></button>
                                    <h5 className="modal-title" id="modal-editLabel">Edit Data</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-md-3">Nama Device</label>
                                        <div className="col-md-9">
                                            <input type="hidden" name="id_edt" id="uid" />
                                            <input type="text" name="nama_device_edt" className="form-control" required placeholder="Nama Device..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Kategori</label>
                                        <div className="col-md-9">
                                            <input type="text" name="kategori_edt" className="form-control" required placeholder="Kategori..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Stok</label>
                                        <div className="col-md-9">
                                            <input type="number" name="stok_edt" className="form-control" required placeholder="Stok..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Tahun Pembuatan</label>
                                        <div className="col-md-9">
                                            <input type="number" name="tahun_pembuatan_edt" className="form-control" required placeholder="Tahun Pembuatan..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Tahun Keluar</label>
                                        <div className="col-md-9">
                                            <input type="number" name="tahun_keluar_edt" className="form-control" required placeholder="Tahun Keluar..." />
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