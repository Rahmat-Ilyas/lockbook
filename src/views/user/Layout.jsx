import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase.js';
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default class Layout extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(async function (user) {
            var cek = null;
            if (user) {
                const res = query(collection(db, "pegawai"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
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
                                <li className="xn-logo">
                                    <a href="index.html">Joli Admin</a>
                                    <a href="#" className="x-navigation-control" />
                                </li>
                                <li className="xn-openable pull-right">
                                    <a href="#"><span className="xn-text">Rahmat Ilyas</span> <i className="fa fa-user"></i></a>
                                    <ul className="animated zoomIn" style={{ padding: '8px' }}>
                                        <li><a href="#!"><span className="fa fa-user" /> Akun</a></li>
                                        <li><a href="#" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /> Logout</a></li>
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
            </div >
        );
    }
}