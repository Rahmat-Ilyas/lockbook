import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase.js';
import { signOut } from "firebase/auth";

export default class Layout extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) {
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
                            <li className="xn-logo">
                                <a href="index.html">Joli Admin</a>
                                {/* <a href="/#" className="x-navigation-control"></a> */}
                            </li>
                            <li className="xn-title">Main Menu</li>
                            <li className="adm-dahboard">
                                <Link to="/admin/">
                                    <span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span>
                                </Link>
                            </li>
                            <li className="xn-openable">
                                <a href="/#"><span className="fa fa-id-card" /> <span className="xn-text">Kelola Pegawai</span></a>
                                <ul>
                                    <li className="adm-addpegawai">
                                        <Link to="/admin/tambah-pegawai"><span className="fa fa-user-plus" /> Tambah Pegawai</Link>
                                    </li>
                                    <li className="adm-dtapegawai">
                                        <Link to="/admin/data-pegawai"><span className="fa fa-users" /> Data Pegawai</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="admin/data-pengerjaan">
                                    <span className="fa fa-file-alt" /> <span className="xn-text">Data Pengerjaan</span>
                                </Link>
                            </li>
                            <li className="xn-title">Pengaturan Akun</li>
                            <li>
                                <a href="/#"><span className="fa fa-user-circle" /> <span className="xn-text">Akun</span></a>
                            </li>
                            <li>
                                <a href="/#" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /> <span className="xn-text">Log Out</span></a>
                            </li>
                        </ul>
                    </div>
                    <div id="content" style={{ height: '100vh' }}>
                        <div className="page-content">
                            <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
                                <li className="xn-icon-button">
                                    <a href="/#" className="x-navigation-minimize"><span className="fa fa-dedent" /></a>
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