import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";
import Select from 'react-select';

export default class RequestSparepart extends Component {
    state = {
        nama_device: '',
        jumlah_dibutuhkan: '',
        keterangan: '',

        placehoder: 'Pilih Sparepart',
        option: [],
        value: [],
    }

    async componentDidMount() {
        const data_device = await getDocs(query(collection(db, "bahan_perbaikan")));
        let option = [];
        let value = [];
        data_device.forEach((doc) => {
            let res = doc.data();
            option.push({ value: doc.id, label: res.nama_device });
        });
        this.setState({ option, value });

        let uid = getAuth().currentUser.uid;
        const res = query(collection(db, "it_service"), where("uid", "==", uid));
        const user = await getDocs(res);
        let service_id;
        user.forEach((doc) => {
            service_id = doc.id;
        });

        this.getData(service_id);
    }

    setItem = async (id) => {
        const result = await getDoc(doc(db, "bahan_perbaikan", id));
        const dta = result.data();
        $('#nama_device_dtl').val(dta.nama_device);
        this.setState({
            nama_device: dta.nama_device
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
        const { nama_device, jumlah_dibutuhkan, keterangan } = this.state;

        try {
            let uid = getAuth().currentUser.uid;

            const res = query(collection(db, "it_service"), where("uid", "==", uid));
            const user = await getDocs(res);
            let request_by, service_id;
            user.forEach((doc) => {
                let res = doc.data();
                request_by = res.nama;
                service_id = doc.id;
            });

            await addDoc(collection(db, "request_sparepart"), {
                request_by,
                service_id,
                nama_device: nama_device,
                jumlah_dibutuhkan: jumlah_dibutuhkan,
                keterangan: keterangan,
                tggl_permintaan: serverTimestamp(),
                status: 'ditinjau',
            });

            this.notify('success', 'Sparepart berhasil dipesan');
            this.clearForm();
            this.getData(service_id);
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

    getData = async (service_id) => {
        var table = $('#dataTable').DataTable();
        table.clear().draw();

        const result = await getDocs(query(collection(db, "request_sparepart"), where('service_id', '==', service_id), orderBy("status", 'asc')));
        let i = 1;
        result.forEach(async (dta) => {
            var res = dta.data();
            var badge_color = '';
            if (res.status == 'ditinjau') badge_color = 'badge-info';
            else if (res.status == 'selesai') badge_color = 'badge-success';

            table.row.add({
                0: i,
                1: res.nama_device,
                2: res.jumlah_dibutuhkan + ' Unit',
                3: res.keterangan,
                4: new Date(res.tggl_permintaan.seconds * 1000).toLocaleDateString(),
                5: '<span class="badge ' + badge_color + '">' + res.status.toUpperCase() + '</span>',
            }).draw();

            i++;
        });
    }

    render() {
        return (
            <div>
                <Layout active="request-sparepart">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Request Sparepart</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading ui-draggable-handle">
                                            <h3 className="panel-title"><strong>Request Sparepart Komputer yang Habis</strong></h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-5" style={{ paddingRight: "20px" }}>
                                                    <h3 className='text-center'>Request Sparepart</h3>
                                                    <hr />
                                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <label className="col-md-3">Pilih Sparepart</label>
                                                            <div className="col-md-9">
                                                                <Select options={this.state.option} value={this.state.value} placeholder={this.state.placehoder} onChange={this.handleChangeOption} id="status-chg" />
                                                            </div>
                                                            <input type="hidden" name="nama_device" id="nama_device_dtl" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3">Jumlah Dibutuhkan</label>
                                                            <div className="col-md-9">
                                                                <input type="number" name="jumlah_dibutuhkan" onChange={this.handleChange} className="form-control" required placeholder="Jumlah Dibutuhkan" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3">Keterangan</label>
                                                            <div className="col-md-9">
                                                                <textarea name="keterangan" onChange={this.handleChange} className="form-control" required rows="5" placeholder="Keterangan..." />
                                                            </div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <button className="btn btn-default btn-lg" type="button" onClick={this.clearForm}>Clear Form</button>
                                                            <button className="btn btn-primary btn-lg pull-right btn-submit" type="submit">Submit</button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="col-md-7">
                                                    <h3 className='text-center'>Riwayat Permintaan Sparepart</h3>
                                                    <hr />
                                                    <table className="table" id="dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th width="10">No</th>
                                                                <th>Sparepart</th>
                                                                <th>Jmlh Diminta</th>
                                                                <th>Keterangan</th>
                                                                <th>Tggl Permintaan</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-7'>

                                </div>
                            </div>
                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}