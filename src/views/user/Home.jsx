import React, { Component } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy, updateDoc } from "firebase/firestore";
import Layout from "./Layout";

export default class AdminUser extends Component {
    state = {
        jum_berlangsung: 0,
        jum_total: 0,
    }
    async componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            const berlangsung = await getDocs(query(collection(db, "perbaikan"), where("uid", "==", user.uid), where("status", "not-in", ["selesai", "batal"])));
            let jum_berlangsung = 0;
            berlangsung.forEach((doc) => {
                jum_berlangsung += 1;
            });

            const total = await getDocs(query(collection(db, "perbaikan"), where("uid", "==", user.uid)));
            let jum_total = 0;
            total.forEach((doc) => {
                jum_total += 1;
            });

            self.setState({ jum_berlangsung, jum_total });

            const pemberitahuan = await getDocs(query(collection(db, "pemberitahuan"), where("uid", "==", user.uid), where("view", "==", true)));
            let pemberitahuan_html = ``;
            pemberitahuan.forEach((doc) => {
                var res = doc.data();
                var bg_alert = 'alert-info-alt';
                if (res.status == 'proses') {
                    bg_alert = 'alert-info-alt';
                } else if (res.status == 'panding') {
                    bg_alert = 'alert-warning-alt';
                } else if (res.status == 'selesai') {
                    bg_alert = 'alert-success-alt';
                } else if (res.status == 'batal') {
                    bg_alert = 'alert-danger-alt';
                }

                var d = new Date(res.created_at.seconds * 1000);
                var date = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
                var time = d.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });

                pemberitahuan_html += `
                <div class="alert `+ bg_alert + `" style="background-color:" role="alert">
                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <strong>(`+ date + ` ` + time + `) ` + res.title + `:</strong> ` + res.message + ` <a href="#" data-id="` + doc.id + `" class='alert-link lihat-detail'>Lihat detail</a>
                </div>`;
            });

            $('.pemberitahuan').html(pemberitahuan_html);
        });

        $(document).on('click', '.lihat-detail', async function () {
            var data_id = $(this).attr('data-id');
            const pemberitahuan = doc(db, "pemberitahuan", data_id);
            await updateDoc(pemberitahuan, {
                view: false,
            });
            window.location.href = '/user/progres-perbaikan';
        });
    }

    render() {
        return (
            <div>
                <Layout active="adm-dahboard">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#">Panel Pegawai</a></li>
                            <li className="active">Daashboard</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', minHeight: '75vh' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-home" /> Dashboard</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-4">
                                            {/* START WIDGET MESSAGES */}
                                            <div className="widget widget-default widget-item-icon">
                                                <div className="widget-item-left">
                                                    <span className="fa fa-tools" />
                                                </div>
                                                <div className="widget-data">
                                                    <div className="widget-int num-count">{this.state.jum_berlangsung}</div>
                                                    <div className="widget-title">Pengajuan Perbaikan</div>
                                                </div>
                                                <div className="widget-controls">
                                                    <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                                </div>
                                            </div>
                                            {/* END WIDGET MESSAGES */}
                                        </div>
                                        <div className="col-md-4">
                                            {/* START WIDGET REGISTRED */}
                                            <div className="widget widget-default widget-item-icon">
                                                <div className="widget-item-left">
                                                    <span className="fa fa-history" />
                                                </div>
                                                <div className="widget-data">
                                                    <div className="widget-int num-count">{this.state.jum_total}</div>
                                                    <div className="widget-title">Total Perbaikan</div>
                                                </div>
                                                <div className="widget-controls">
                                                    <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                                </div>
                                            </div>
                                            {/* END WIDGET REGISTRED */}
                                        </div>
                                        <div className="col-md-4">
                                            {/* START WIDGET CLOCK */}
                                            <div className="widget widget-info widget-padding-sm">
                                                <div className="widget-big-int plugin-clock">00:00</div>
                                                <div className="widget-subtitle plugin-date">Loading...</div>
                                                <div className="widget-controls">
                                                    <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
                                                </div>
                                                <div className="widget-buttons widget-c3">
                                                    <div className="col">
                                                        <a href="#!"><span className="fa fa-clock-o" /></a>
                                                    </div>
                                                    <div className="col">
                                                        <a href="#!"><span className="fa fa-bell" /></a>
                                                    </div>
                                                    <div className="col">
                                                        <a href="#!"><span className="fa fa-calendar" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* END WIDGET CLOCK */}
                                        </div>

                                        <div className="col-md-12">
                                            <div className='pemberitahuan'>

                                            </div>
                                            <div className="panel panel-default">
                                                <div className="panel-body panel-body-image">
                                                    <img src="/assets/images/bg.jpg" alt="Ocean" height="250" />
                                                    <a href="#" className="panel-body-inform">
                                                        <span className="fa fa-heart-o" />
                                                    </a>
                                                </div>
                                                <div className="panel-body">
                                                    <h3>Selamat Datang</h3>
                                                    <p>Selamat Datang di Departement IT PT Vale Indonesia Tbk.</p>
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