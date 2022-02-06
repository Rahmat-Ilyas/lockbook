import React, { Component } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Layout from "./Layout";

export default class PerbaikanBaru extends Component {
    state = {
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

        $('.btn-submit').html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
        const { nip, nama, telepon, alamat } = this.state;

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
                createUserWithEmailAndPassword(auth, 'x@' + nip + '.co', nip).then(async (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const uid = user.uid;

                    await addDoc(collection(db, "pegawai"), {
                        uid: uid,
                        nip: nip,
                        nama: nama,
                        telepon: telepon,
                        alamat: alamat,
                    });

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
                <Layout active="perbaikan-baru">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Ajukan Perbaikan</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-tools" /> Ajukan Perbaikan</h2>
                                </div>
                                <div className="page-content-wrap">
                                    <hr style={{ marginTop: '-5px' }} />
                                    <div className="row justify-content-center">
                                        <div className="col-md-2">
                                        </div>
                                        <div className="col-md-8">
                                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                                <div className="panel panel-default">
                                                    <div className="panel-heading ui-draggable-handle">
                                                        <h3 className="panel-title"><strong>Input Data Perbaikan</strong></h3>
                                                    </div>
                                                    <div className="panel-body" style={{ padding: "30px" }}>
                                                        <div className="form-group">
                                                            <label className="col-md-2">Nama Device</label>
                                                            <div className="col-md-10">
                                                                <input type="text" name="nama_device" onChange={this.handleChange} className="form-control" required placeholder="Nama Device..." />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-2">Nomor Series (Optional)</label>
                                                            <div className="col-md-10">
                                                                <input type="number" name="no_series" onChange={this.handleChange} className="form-control" required placeholder="Nomor Series..." />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-2">Problem/Keluhan</label>
                                                            <div className="col-md-10">
                                                                <textarea name="problem" onChange={this.handleChange} className="form-control" required rows="5" placeholder="Problem/Keluhan..." />
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
                            </div>
                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}