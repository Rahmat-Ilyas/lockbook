import React, { Component } from 'react';
import { auth, db } from '../../config/firebase.js';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import Layout from "./Layout";

export default class AdminUser extends Component {
    state = {
        jum_berlangsung: 0,
        jum_baru: 0,
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

            const berlangsung = await getDocs(query(collection(db, "perbaikan"), where("service_id", "==", service_id), where("status", "in", ["proses", "panding"])));
            let jum_berlangsung = 0;
            berlangsung.forEach((doc) => {
                jum_berlangsung += 1;
            });

            const baru = await getDocs(query(collection(db, "perbaikan"), where('status', '==', 'ditinjau')));
            let jum_baru = 0;
            baru.forEach((doc) => {
                jum_baru += 1;
            });

            self.setState({ jum_berlangsung, jum_baru });
        });
    }

    render() {
        return (
            <div>
                <Layout active="adm-dahboard">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Dashboard</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-4">
                                    {/* START WIDGET MESSAGES */}
                                    <div className="widget widget-default widget-item-icon">
                                        <div className="widget-item-left">
                                            <span className="fa fa-laptop" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">{this.state.jum_baru}</div>
                                            <div className="widget-title">Data Device Kantor</div>
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
                                            <span className="fa fa-hdd-o" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">{this.state.jum_berlangsung}</div>
                                            <div className="widget-title">Device Bahan Perbaikan</div>
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
                </Layout>
            </div>
        );
    }
}