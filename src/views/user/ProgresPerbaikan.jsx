import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Layout from "./Layout";
import Select from 'react-select';
import { async } from '@firebase/util';

let option = [];
let value = [];

export default class ProgresPerbaikan extends Component {
    state = {
        placehoder: 'Pilih Perbaikan'
    }
    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            const result = await getDocs(query(collection(db, "perbaikan"), where("uid", "==", user.uid), where("status", "not-in", ["selesai", "batal"])));
            let i = 1;
            result.forEach((doc) => {
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
        $('#nama_device_dtl').text(dta.nama_device);
        $('#no_series_dtl').text(dta.no_series ? dta.no_series : '-');
        $('#problem_dtl').text(dta.problem);
        var date = new Date(dta.tggl_masuk.seconds * 1000).toLocaleDateString();
        $('#tggl_masuk_dtl').text(date);
        $('#proccess_by_dtl').text(dta.proccess_by ? dta.proccess_by : '-');
        var badge_color = '';
        if (dta.status == 'ditinjau') badge_color = 'badge-info';
        else if (dta.status == 'proses') badge_color = 'badge-warning';
        else if (dta.status == 'panding') badge_color = 'badge-primary';
        $('#status_dtl').html('<span class="badge ' + badge_color + '">' + dta.status.toUpperCase() + '</span>');

        // Timeline
        const timeline = await getDocs(query(collection(db, "status_perbaikan"), where("perbaikan_id", "==", id), orderBy('created_at', 'desc')));

        let html = '';
        var i = 1;
        timeline.forEach((doc) => {
            let tml = doc.data();
            var active = '';
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var d = new Date(tml.created_at.seconds * 1000);
            var date = monthNames[d.getMonth()] + ' ' + String(d.getDate()).padStart(2, '0');
            var time = d.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
            if (i == 1) active = 'tracking-active';

            html += `
            <div class="tracking-item ${active}">
                <div class="tracking-icon status-intransit">
                    <i class="fas fa-circle"></i>
                </div>
                <div class="tracking-date">${date}<span>${time}</span></div>
                <div class="tracking-content">${tml.header}<span>${tml.keterangan}</span></div>
            </div>
            `
            i++;
        });
        $('#timline-progress').html(html);
    }

    render() {
        return (
            <div>
                <Layout active="progres-perbaikan">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Progres Perbaikan</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', minHeight: '75vh' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-tasks" /> Progres Perbaikan</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* START DEFAULT DATATABLE */}
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div className="col-sm-5">
                                                            <h2>Detail Barang/Device</h2>
                                                            <hr />
                                                            <div>
                                                                <label>Pilih Perbaikan Yang Sedang Berlangsung</label>
                                                                <Select options={option} defaultValue={value} placeholder={this.state.placehoder} onChange={this.handleChange} />

                                                                <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th width="130">Nama Device</th>
                                                                            <td width="10">:</td>
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
                                                                            <th>Ditangani Oleh</th>
                                                                            <td>:</td>
                                                                            <td id='proccess_by_dtl'>-</td>
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
                                                        <div className="col-sm-6">
                                                            <h2 className="text-center">Timeline Progres</h2>
                                                            <hr />
                                                            <div className="tracking-list" id="timline-progress">
                                                                <h4 className='text-center' style={{ marginTop: "50px" }}><i>Belum ada data perbaikan yang berlangsung</i></h4>
                                                                {/* <div className="tracking-item tracking-active">
                                                                    <div className="tracking-icon status-delivered">
                                                                        <i className="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 10<span>05:01 PM</span></div>
                                                                    <div className="tracking-content">
                                                                        Sedang Diproses
                                                                        <span>Perbaikan sedang berlangsung, mohon tunggu</span>
                                                                    </div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i className="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 02<span>04:08 PM</span></div>
                                                                    <div className="tracking-content">Panding<span>Barang yang dibutuhkan tidak tersedia, sedang dipesan</span></div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i className="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 01<span>05:25 PM</span></div>
                                                                    <div className="tracking-content">Sedang Diproses<span>Tim IT Service (Rahmat Ilyas) telah menerima pengajuan perbaikan anda. Silahkan bawah barang anda ke Departemen IT</span></div>
                                                                </div>
                                                                <div className="tracking-item">
                                                                    <div className="tracking-icon status-intransit">
                                                                        <i className="fas fa-circle"></i>
                                                                    </div>
                                                                    <div className="tracking-date">Feb 01<span>08:58 AM</span></div>
                                                                    <div className="tracking-content">Sedang Ditinjau<span>Pengajuan perbaikan baru berhasil di input</span></div>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* END DEFAULT DATATABLE */}

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