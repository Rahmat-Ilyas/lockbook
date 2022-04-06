import React, { Component } from 'react';
import $ from 'jquery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase.js';
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_pegawai: null,
            username: null,
            uid: null,
        };
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
                    self.setState({ nama_pegawai: res.nama, username: res.username, uid: res.uid });
                    cek = + 1;
                });
            }

            if (!user || !cek) {
                window.location.href = '/user/login';
            }
        });

        const getClass = $('.' + this.props.active);
        getClass.addClass('active');
    }

    handleLogout = (e) => {
        e.preventDefault();
        signOut(auth);
    }

    render() {
        return (
            <div>
                <div className="page-container page-navigation-top">
                    <div className="page-content">
                        <div className="container">
                            <ul className="x-navigation x-navigation-horizontal">
                                <li className="xn-logo bg-info text-center" style={{ width: '150px' }}>
                                    <img src="/img/vale-alt.png" alt="image" width="100" height="50" style={{ padding: '2px 0' }} />
                                </li>
                                <li>
                                    <h3 style={{ color: '#fff', marginTop: '15px', marginLeft: '10px' }}>Panel User/Pegawai</h3>
                                </li>
                                <li className="xn-openable pull-right">
                                    <a href="#"><span className="xn-text profile-data-name">{this.state.nama_pegawai}</span> <i className="fa fa-user"></i></a>
                                    <ul className="animated zoomIn" style={{ padding: '8px' }}>
                                        {/* <li>
                                            <a href="#" className="btn-modal-akun" data-toggle="modal" data-target="#modal-akun"><span className="fa fa-user" /> Akun</a>
                                        </li> */}
                                        <li>
                                            <a href="#" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /> Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul className="x-navigation x-navigation-horizontal drop-shadow" style={{ borderTop: '1px solid white' }}>
                                <li className="adm-dahboard">
                                    <Link to="/user/">
                                        <span className="fa fa-home" /> <span className="xn-text">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="perbaikan-baru">
                                    <Link to="/user/perbaikan-baru">
                                        <span className="fa fa-tools" /> <span className="xn-text">Ajukan Perbaikan</span>
                                    </Link>
                                </li>
                                <li className="progres-perbaikan">
                                    <Link to="/user/progres-perbaikan">
                                        <span className="fa fa-tasks" /> <span className="xn-text">Progres Perbaikan</span>
                                    </Link>
                                </li>
                                <li className="riwayat-perbaikan">
                                    <Link to="/user/riwayat-perbaikan">
                                        <span className="fa fa-history" /> <span className="xn-text">Riwayat Perbaikan</span>
                                    </Link>
                                </li>
                                <li className="profil">
                                    <Link to="/user/profil">
                                        <span className="fa fa-id-card" /> <span className="xn-text">Profil Pegawai</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {this.props.children}


                    </div>
                </div>

                <div className="message-box animated fadeIn" data-sound="alert" id="mb-signout">
                    <div className="mb-container">
                        <div className="mb-middle">
                            <div className="mb-title"><span className="fa fa-sign-out" /> Log <strong>Out</strong> ?</div>
                            <div className="mb-content">
                                <p>Are you sure you want to log out?</p>
                                <p>Press No if youwant to continue work. Press Yes to logout current user.</p>
                            </div>
                            <div className="mb-footer">
                                <div className="pull-right">
                                    <a href="pages-login.html" className="btn btn-success btn-lg" onClick={this.handleLogout}>Yes</a>
                                    <button className="btn btn-default btn-lg mb-control-close">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div >
        );
    }
}