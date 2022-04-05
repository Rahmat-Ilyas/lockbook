import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";

export default class PerbaikanBaru extends Component {
    state = {
        pegawai_id: '',
        nama_device: '',
        no_series: '',
        problem: '',
    }

    componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            var cek = null;
            if (user) {
                const res = query(collection(db, "pegawai"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    let res = doc.data();
                    self.setState({ pegawai_id: doc.id });
                    cek = + 1;
                });
            }
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        $('.btn-submit').html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
        const { pegawai_id, nama_device, no_series, problem } = this.state;

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            let uid = user.uid;
            const perbaikan = await addDoc(collection(db, "perbaikan"), {
                uid: uid,
                pegawai_id: pegawai_id,
                nama_device: nama_device,
                no_series: no_series,
                problem: problem,
                tggl_masuk: serverTimestamp(),
                tggl_keluar: '',
                proccess_by: '',
                service_id: '',
                status: 'ditinjau',
            });

            await addDoc(collection(db, "status_perbaikan"), {
                perbaikan_id: perbaikan.id,
                status: 'ditinjau',
                header: 'Sedang Ditinjau',
                keterangan: 'Pengajuan perbaikan baru berhasil di input',
                created_at: serverTimestamp(),
            });

            this.notify('success', 'Data perbaikan baru berhasil diajukan');
            this.clearForm();
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
                                                                <input type="number" name="no_series" onChange={this.handleChange} className="form-control" placeholder="Nomor Series..." />
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