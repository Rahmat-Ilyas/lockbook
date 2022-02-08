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
            nama: null,
            username: null,
        };
    }

    componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            var cek = null;
            if (user) {
                const res = query(collection(db, "it_service"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    let res = doc.data();
                    self.setState({ nama: res.nama, username: res.username });
                    cek = + 1;
                });
            }

            if (!user || !cek) {
                window.location.href = '/service/login';
            }
        });

        // const user = auth.currentUser;

        // if (user) {
        //     this.setState({ nama: user.nama, username: user.username });
        // }

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
                                        <div className="profile-data-name">{this.state.nama}</div>
                                        <div className="profile-data-title">IT Service</div>
                                    </div>
                                </div>
                            </li>
                            <li className="xn-title">Main Menu</li>
                            <li className="adm-dahboard">
                                <Link to="/service/">
                                    <span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span>
                                </Link>
                            </li>
                            <li className='data-perbaikan'>
                                <Link to="/service/data-perbaikan-baru">
                                    <span className="fa fa-tools" /> <span className="xn-text">Data Perbaikan Baru</span>
                                </Link>
                            </li>
                            <li className='perbaikan-berlangsung'>
                                <Link to="/service/perbaikan-berlangsung">
                                    <span className="fa fa-clipboard-check" /> <span className="xn-text">Perbaikan Berlangsung</span>
                                </Link>
                            </li>
                            <li className='riwayat-perbaikan'>
                                <Link to="/service/riwayat-perbaikan">
                                    <span className="fa fa-history" /> <span className="xn-text">Riwayat Perbaikan</span>
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
                                <li>
                                    <h2 style={{ color: '#fff', marginTop: '10px' }}>Panel TIM IT Service</h2>
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
                <ToastContainer />
            </div >
        );
    }
}