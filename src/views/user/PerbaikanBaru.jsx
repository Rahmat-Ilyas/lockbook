import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";
import Select from 'react-select';

export default class PerbaikanBaru extends Component {
    state = {
        pegawai_id: '',
        nama_device: '',
        no_series: '',
        problem: '',

        placehoder: 'Pilih Device',
        option: [],
        value: [],
        status_value: { value: 'proses', label: 'Diproses' },
        perbaikan_id: '',
    }

    async componentDidMount() {
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

        const data_device = await getDocs(query(collection(db, "data_device")));
        let option = [];
        let value = [];
        data_device.forEach((doc) => {
            let res = doc.data();
            let no_ser = res.nomor_series ? ' / ' + res.nomor_series : '';
            option.push({ value: doc.id, label: res.nama_device + no_ser });
        });
        this.setState({ option, value });
    }

    setItem = async (id) => {
        this.setState({ perbaikan_id: id });

        // Detail 
        const result = await getDoc(doc(db, "data_device", id));
        const dta = result.data();
        $('#nama_device_dtl').val(dta.nama_device);
        $('#no_series_dtl').val(dta.nomor_series ? dta.nomor_series : '-');
        this.setState({
            nama_device: dta.nama_device,
            no_series: dta.nomor_series
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeOption = async (e) => {
        this.setState({ value: e });
        this.setItem(e.value);
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
        this.setState({ value: null });
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
                                                            <label className="col-md-2">Pilih Device</label>
                                                            <div className="col-md-10">
                                                                <Select options={this.state.option} value={this.state.value} placeholder={this.state.placehoder} onChange={this.handleChangeOption} id="status-chg" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-2">Nama Device</label>
                                                            <div className="col-md-10">
                                                                <input type="text" name="nama_device" className="form-control" id="nama_device_dtl" required placeholder="Nama Device (Isi Otomatis)" readOnly style={{ color: 'black' }} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-2">Nomor Series</label>
                                                            <div className="col-md-10">
                                                                <input type="text" name="no_series" className="form-control" id="no_series_dtl" placeholder="Nomor Series (Isi Otomatis)" readOnly style={{ color: 'black' }} />
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