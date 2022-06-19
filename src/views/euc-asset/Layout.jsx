import React, { Component } from 'react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase.js';
import { doc, collection, addDoc, updateDoc, getDocs, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut } from "firebase/auth";
import { async } from '@firebase/util';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: null,
            username: null,
        };
    }

    componentDidMount() {
        this.getData();

        const getClass = $('.' + this.props.active);
        getClass.addClass('active');
        getClass.parents('.xn-openable').addClass('active');

        $('#onclik-modal').click(function () {
            $('#resclik-modal').click();
        })
    }

    getData = async (e) => {
        const self = this;
        auth.onAuthStateChanged(async function (user) {
            var cek = null;
            if (user) {
                const res = query(collection(db, "euc_asset"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    let res = doc.data();

                    $.each(res, function (key, value) {
                        $('#' + key + '_dtl').text(value);
                        $('input[name="' + key + '"]').val(value);
                    });
                    var username = user.email.substring(2, user.email.length - 3);
                    $('input[name="username"], input[name="username_old"]').val(username);
                    $('input[name="password_edt"]').val('');
                    $('#id_edt').val(doc.id);

                    self.setState({ nama: res.nama, username: res.username });
                    cek = + 1;
                });
            }

            if (!user || !cek) {
                window.location.href = '/euc-asset/login';
            }
        });
    }

    handleUpdateAkun = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let data = {};
        for (let [key, val] of formData.entries()) {
            data[key] = val;
        }


        try {
            $('.btn-submit').html('Update <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');
            const auth = getAuth();
            const credential = EmailAuthProvider.credential(
                "u@" + data.username_old + ".co",
                data.password,
            );
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                updateEmail(auth.currentUser, "u@" + data.username + ".co").then(async () => {
                    const result = doc(db, "euc_asset", data.id_edt);

                    if (data.password_edt) {
                        await updateDoc(result, {
                            nama: data.nama,
                            password: data.password_edt,
                        });
                        updatePassword(auth.currentUser, data.password_edt);
                    } else {
                        await updateDoc(result, {
                            nama: data.nama,
                        });
                    }

                    this.notify('success', 'Data Akun EUC Asset berhasil di update');
                    this.getData();
                    $('.close-edt').click();
                    $('.btn-submit').html('Update').removeAttr('disabled');
                }).catch((err) => {
                    this.notify('error', 'Username yang anda masukkan tidak diperbolehkan / ' + err.message);
                    $('.btn-submit').html('Update').removeAttr('disabled');
                    $('input[name="username"]').focus().val(data.username_old);
                    return
                });
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

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
                                    <img src="/assets/images/users/no-image.jpg" alt="Asset" />
                                </a>
                                <div className="profile">
                                    <div className="profile-image">
                                        <img src="/assets/images/users/no-image.jpg" alt="Asset" />
                                    </div>
                                    <div className="profile-data">
                                        <div className="profile-data-name">{this.state.nama}</div>
                                        <div className="profile-data-title">EUC Asset</div>
                                    </div>
                                </div>
                            </li>
                            <li className="xn-title">Main Menu</li>
                            <li className="adm-dahboard">
                                <Link to="/euc-asset/">
                                    <span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span>
                                </Link>
                            </li>
                            <li className='data-device'>
                                <Link to="/euc-asset/data-device">
                                    <span className="fa fa-laptop" /> <span className="xn-text">Data Device Kantor</span>
                                </Link>
                            </li>
                            <li className='device-perbaikan'>
                                <Link to="/euc-asset/device-perbaikan">
                                    <span className="fa fa-hdd-o" /> <span className="xn-text">Material Bahan Perbaikan</span>
                                </Link>
                            </li>
                            <li className='permintaan-sparepart'>
                                <Link to="/euc-asset/permintaan-sparepart">
                                    <span className="fa fa-archive" /> <span className="xn-text">Permintaan Sparepart</span>
                                </Link>
                            </li>
                            <li className="xn-title">Pengaturan Akun</li>
                            <li>
                                <a href="#" id='onclik-modal'><span className="fa fa-user-circle" /> <span className="xn-text">Akun</span></a>
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
                                    <h2 style={{ color: '#fff', marginTop: '10px' }}>Panel EUC Asset</h2>
                                </li>
                            </ul>

                            {this.props.children}

                            <button id='resclik-modal' data-toggle="modal" data-target="#modal-akun" hidden>on</button>
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

                {/* Modal Akun */}
                <div className="modal fade" id="modal-akun" tabIndex={-1} role="dialog" aria-labelledby="modal-akunLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <form onSubmit={this.handleUpdateAkun}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button className="close close-edt" data-dismiss="modal"><span>×</span></button>
                                    <h5 className="modal-title" id="modal-akunLabel">Kelola Akun</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-md-3">Nama Lengkap</label>
                                        <div className="col-md-9">
                                            <input type="hidden" name="id_edt" id="id_edt" />
                                            <input type="text" name="nama" className="form-control" required placeholder="Nama Lengkap..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Username</label>
                                        <div className="col-md-9">
                                            <input type="text" name="username" className="form-control" required placeholder="Username..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3">Password</label>
                                        <div className="col-md-9">
                                            <input type="hidden" name="username_old" />
                                            <input type="hidden" name="password" />
                                            <input type="text" name="password_edt" className="form-control" placeholder="Password..." minLength={6} />
                                            <i className='text-info'>* Biarkan kosong jika tidak ingin mengganti</i>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                    <button type="submit" className="btn btn-primary btn-submit">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <ToastContainer />
            </div >
        );
    }
}