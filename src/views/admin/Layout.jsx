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
                const res = query(collection(db, "admin"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    cek = + 1;
                });
            }

            if (!user || !cek) {
                window.location.href = '/admin/login';
            }
        });

        const getClass = $('.' + this.props.active);
        getClass.addClass('active');
        getClass.parents('.xn-openable').addClass('active');
    }

    handleLogout = (e) => {
        e.preventDefault();
        signOut(auth);
    }

    render() {
        return (
            <div>
                <div className="page-container" style={{ height: '100vh' }}>
                    <div className="page-sidebar">
                        <ul className="x-navigation">
                            <li className="xn-logo bg-info text-center" style={{ width: '220px' }}>
                                <img src="/img/vale-alt.png" alt="image" width="100" height="50" style={{ padding: '2px 0' }} />
                            </li>
                            <li className="xn-profile">
                                <a href="#" className="profile-mini">
                                    <img src="/assets/images/users/no-image.jpg" alt="Administrator" />
                                </a>
                                <div className="profile">
                                    <div className="profile-image">
                                        <img src="/assets/images/users/no-image.jpg" alt="Administrator" />
                                    </div>
                                    <div className="profile-data">
                                        <div className="profile-data-name">Nur Winda</div>
                                        <div className="profile-data-title">Administrator</div>
                                    </div>
                                </div>
                            </li>
                            <li className="xn-title">Main Menu</li>
                            <li className="adm-dahboard">
                                <Link to="/admin/">
                                    <span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span>
                                </Link>
                            </li>
                            <li className="xn-openable">
                                <a href="#!"><span className="fa fa-id-card" /> <span className="xn-text">Kelola Pegawai</span></a>
                                <ul>
                                    <li className="adm-addpegawai">
                                        <Link to="/admin/tambah-pegawai"><span className="fa fa-user-plus" /> Tambah Pegawai</Link>
                                    </li>
                                    <li className="adm-dtapegawai">
                                        <Link to="/admin/data-pegawai"><span className="fa fa-users" /> Data Pegawai</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='data-perbaikan'>
                                <Link to="/admin/data-perbaikan">
                                    <span className="fa fa-tools" /> <span className="xn-text">Data Perbaikan</span>
                                </Link>
                            </li>
                            <li className='it-service'>
                                <Link to="/admin/it-service">
                                    <span className="fa fa-users-cog" /> <span className="xn-text">Tim IT Service</span>
                                </Link>
                            </li>
                            <li className='laporan'>
                                <Link to="/admin/laporan">
                                    <span className="fa fa-file-alt" /> <span className="xn-text">Laporan</span>
                                </Link>
                            </li>
                            <li className="xn-title">Pengaturan Akun</li>
                            <li>
                                <a href="#!"><span className="fa fa-user-circle" /> <span className="xn-text">Akun</span></a>
                            </li>
                            <li>
                                <a href="#!" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /> <span className="xn-text">Log Out</span></a>
                            </li>
                        </ul>
                    </div>
                    <div id="content" style={{ height: '100vh' }}>
                        <div className="page-content">
                            <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
                                <li className="xn-icon-button">
                                    <a href="#!" className="x-navigation-minimize"><span className="fa fa-dedent" /></a>
                                </li>
                            </ul>

                            {this.props.children}

                        </div>
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