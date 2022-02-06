import React, { Component } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Layout from "./Layout";

export default class TambahPegawai extends Component {
    state = {
        uid: '',
        nip: '',
        nama: '',
        telepon: '',
        alamat: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { uid, nip, nama, telepon, alamat } = this.state;
        $('.btn-submit').html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        try {
            const res = query(collection(db, "pegawai"), where("nip", "==", nip));

            const result = await getDocs(res);
            var cek;
            result.forEach((doc) => {
                cek = + 1;
            });

            if (cek) {
                alert("NIP telah terdaftar!");
            } else {
                // createUserWithEmailAndPassword(auth, 'x@' + nip + '.co', nip).then((userCredential) => {
                //     // Signed in
                //     const user = userCredential.user;
                //     this.setState({ uid: user.uid });
                // });

                await addDoc(collection(db, "pegawai"), {
                    uid: uid,
                    nip: nip,
                    nama: nama,
                    telepon: telepon,
                    alamat: alamat,
                    password: nip,
                });

                alert('Data pegawai baru berhasil ditambah');
                this.clearForm();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        $('.btn-submit').html('Submit').removeAttr('disabled');

    }

    clearForm = (e) => {
        $('form')[0].reset();
    }

    render() {
        return (
            <div>
                <Layout active="adm-addpegawai">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="#!">Kelola Pegawai</li>
                            <li className="active">Tambah Pegawai</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row justify-content-center">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8">
                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="panel panel-default">
                                            <div className="panel-heading ui-draggable-handle">
                                                <h3 className="panel-title"><strong>Tambah Data Pegawai Baru</strong></h3>
                                            </div>
                                            <div className="panel-body" style={{ padding: "30px" }}>
                                                <div className="form-group">
                                                    <label className="col-md-2">NIP</label>
                                                    <div className="col-md-10">
                                                        <input type="number" name="nip" onChange={this.handleChange} className="form-control" required placeholder="NIP..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Nama Lengkap</label>
                                                    <div className="col-md-10">
                                                        <input type="text" name="nama" onChange={this.handleChange} className="form-control" required placeholder="Nama Lengkap..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Telepon</label>
                                                    <div className="col-md-10">
                                                        <input type="text" name="telepon" onChange={this.handleChange} className="form-control" required placeholder="Telepon..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Alamat</label>
                                                    <div className="col-md-10">
                                                        <textarea name="alamat" onChange={this.handleChange} className="form-control" required rows="5" placeholder="Alamat..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2"></label>
                                                    <div className="col-md-10">
                                                        <span className="text-info">Note: Username dan Password default pegawai sama dengan nip masing-masing</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel-footer">
                                                <button className="btn btn-default btn-lg" type="button" onClick={this.clearForm}>Clear Form</button>
                                                <button className="btn btn-primary btn-lg pull-right btn-submit" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}