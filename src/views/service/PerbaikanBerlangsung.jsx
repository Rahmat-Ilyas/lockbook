import React, { Component } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";
import Select from 'react-select';

let option = [];
let value = [];

export default class AdminUser extends Component {
    state = {
        placehoder: 'Pilih Perbaikan'
    }

    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            const res = query(collection(db, "it_service"), where("uid", "==", user.uid));
            const result = await getDocs(res);
            let service_id = '';
            result.forEach((doc) => {
                service_id = doc.id;
            });

            const perbaikan = await getDocs(query(collection(db, "perbaikan"), where("service_id", "==", service_id), where("status", "in", ["proses", "panding"])));
            let i = 1;
            perbaikan.forEach((doc) => {
                let res = doc.data();
                let no_ser = res.no_series ? ' / ' + res.no_series : '';
                option.push({ value: doc.id, label: res.nama_device + no_ser });
                if (i == 1) {
                    value.push({ value: doc.id, label: res.nama_device + no_ser });
                    self.setState({ placehoder: res.nama_device + no_ser });
                    self.setItem(doc.id);
                }
                i++;
            });
        });


    }

    handleChange = async (e) => {
        this.setItem(e.value);
    }

    setItem = async (id) => {
        // Detail 
        const result = await getDoc(doc(db, "perbaikan", id));
        const dta = result.data();
        var pegawai = await getDoc(doc(db, "pegawai", dta.pegawai_id));
        var pgw = pegawai.data();
        $('#nama_pegawai').text(pgw.nama);
        $('#nip_pegawai').text(pgw.nip);
        $('#nama_device_dtl').text(dta.nama_device);
        $('#no_series_dtl').text(dta.no_series ? dta.no_series : '-');
        $('#problem_dtl').text(dta.problem);
        var date = new Date(dta.tggl_masuk.seconds * 1000).toLocaleDateString();
        $('#tggl_masuk_dtl').text(date);
        $('#proccess_by_dtl').text(dta.proccess_by ? dta.proccess_by : '-');
        var badge_color = '';
        if (dta.status == 'proses') badge_color = 'badge-warning';
        else if (dta.status == 'panding') badge_color = 'badge-primary';
        $('#status_dtl').html('<span class="badge ' + badge_color + '">' + dta.status.toUpperCase() + '</span>');

        // Timeline
        const timeline = await getDocs(query(collection(db, "status_perbaikan"), where("perbaikan_id", "==", id), orderBy('created_at', 'desc')));

        let html = '';
        var i = 1;
        timeline.forEach((doc) => {
            let tml = doc.data();
            var d = new Date(tml.created_at.seconds * 1000);
            var date = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
            var time = d.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });

            html += `
            <tr>
                <td>${i}</td>
                <td>${date} <b>${time}</b></td>
                <td style="text-transform: capitalize;">${tml.status}</td>
                <td>${tml.keterangan}</td>
            </tr>
            `
            i++;
        });
        $('#timline-progress').html(html);
    }

    render() {
        return (
            <div>
                <Layout active="perbaikan-berlangsung">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Perbaikan Berlangsung</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Perbaikan Yang Sedang Berlangsung</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="col-sm-5">
                                                    <h2>Perbaikan Yang Diproses</h2>
                                                    <hr />
                                                    <div>
                                                        <label>Pilih Perbaikan Yang Sedang Berlangsung</label>
                                                        <Select options={option} defaultValue={value} placeholder={this.state.placehoder} onChange={this.handleChange} />

                                                        <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                            <tbody>
                                                                <tr>
                                                                    <th width="130">Pemilik</th>
                                                                    <td width="10">:</td>
                                                                    <td id='nama_pegawai'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>B/N</th>
                                                                    <td>:</td>
                                                                    <td id='nip_pegawai'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Nama Device</th>
                                                                    <td>:</td>
                                                                    <td id='nama_device_dtl'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Nomor Series</th>
                                                                    <td>:</td>
                                                                    <td id='no_series_dtl'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Problem</th>
                                                                    <td>:</td>
                                                                    <td id='problem_dtl'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Tanggal Masuk</th>
                                                                    <td>:</td>
                                                                    <td id='tggl_masuk_dtl'>-</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Status</th>
                                                                    <td>:</td>
                                                                    <td id='status_dtl'>-</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-sm-5">
                                                    <h2 className="text-center">Update Status & Progres Perbaikan</h2>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <label>Status Perbaikan</label>
                                                            <select className="form-control select">
                                                                <option value="proses">Diproses</option>
                                                                <option value="panding">Panding</option>
                                                                <option value="selesai">Selesai</option>
                                                                <option value="batal">Cancel</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <label>Keterangan Progres</label>
                                                            <textarea name="" className="form-control" rows="5" placeholder="Masukkan keterangan progres perbaikan..."></textarea>
                                                        </div>
                                                        <div className="col-sm-12" style={{ marginTop: '10px' }}>
                                                            <button className="btn btn-success">Update Status</button>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                        <h4>Progres Perbaikan</h4>
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Tanggal</th>
                                                                    <th>Status</th>
                                                                    <th>Keterangan</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id='timline-progress'>
                                                                <tr>
                                                                    <td colSpan={4} className="text-center">Belum ada data perbaikan yang berlangsung</td>
                                                                    {/* <td>1</td>
                                                                    <td>01/02/2022 10:13</td>
                                                                    <td>Diproses</td>
                                                                    <td>Pesanan anda sedang diproses</td> */}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}