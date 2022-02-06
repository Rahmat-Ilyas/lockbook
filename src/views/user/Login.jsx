import React, { Component } from 'react';
import $ from 'jquery';
import { auth, db } from '../../config/firebase.js';
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cekUser: null,
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        const self = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                $('html').css('display', 'none');
                self.cekUser(user).then(() => {
                    console.log(user.uid);
                    if (self.state.cekUser) {
                        window.location.href = '/user';
                    }
                    $('html').css('display', '');
                });
            }
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        $('.btn-submit').html('Log In <i class="fa fa-spinner fa-spin"></i>').attr('disabled', '');

        const res = query(collection(db, "pegawai"), where("nip", "==", username), where("password", "==", password));
        const result = await getDocs(res);
        var cek = null;
        var id;
        result.forEach((doc) => {
            id = doc.id;
            cek = + 1;
        });

        if (cek) {
            createUserWithEmailAndPassword(auth, 'x@' + username + '.co', username).then(async (userCredential) => {
                // Signed in
                const uid = userCredential.user.uid;
                const update = doc(db, "pegawai", id);
                await updateDoc(update, {
                    uid: uid
                });
                window.location.href = '/user';
            }).catch((error) => {
                if (error.code == 'auth/email-already-in-use') {
                    signInWithEmailAndPassword(auth, 'x@' + username + '.co', username).then((user) => {
                        this.cekUser(user);
                        if (!this.state.cekUser) {
                            $('.error-msg').removeAttr('hidden').text("Username atau password salah!");
                            $('.btn-submit').html('Log In').removeAttr('disabled');
                            return 0;
                        }
                        window.location.href = '/user';
                    }).catch((error) => {
                        const errorMessage = error.message;
                        $('.error-msg').removeAttr('hidden').text(errorMessage);
                    });
                } else {
                    const errorMessage = error.message;
                    $('.error-msg').removeAttr('hidden').text(errorMessage);
                }
                $('.btn-submit').html('Log In').removeAttr('disabled');
            });
        } else {
            signInWithEmailAndPassword(auth, 'x@' + username + '.co', password).then((user) => {
                this.cekUser(user);
                if (!this.state.cekUser) {
                    $('.error-msg').removeAttr('hidden').text("Username atau password salah!");
                    $('.btn-submit').html('Log In').removeAttr('disabled');
                    return 0;
                }
                window.location.href = '/user';
            }).catch((error) => {
                const errorMessage = error.message;
                $('.error-msg').removeAttr('hidden').text(errorMessage);
                $('.btn-submit').html('Log In').removeAttr('disabled');
            });
        }
    }

    cekUser = async (user) => {
        const res = query(collection(db, "pegawai"), where("uid", "==", user.uid));
        const result = await getDocs(res);
        var cek = null;
        result.forEach((doc) => {
            cek = + 1;
        });

        this.setState({ cekUser: cek });
        console.log(cek);
    }

    render() {
        const { username, password } = this.state;
        let d = new Date();
        return (
            <div>
                <div className="login-container" style={{ height: '100vh' }}>
                    <div className="login-box animated fadeInDown">
                        <div className="text-center">
                            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Login Pegawai</h2>
                        </div>
                        <div className="login-body">
                            <div className="login-title"><strong>Welcome</strong>, Please login</div>
                            <form action="index.html" className="form-horizontal" method="post" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input type="text" name="username" className="form-control" placeholder="NIP" value={username} onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={this.handleChange} required />
                                        <h5 className='text-danger error-msg' style={{ marginTop: '8px' }} hidden></h5>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <button type='submit' className="btn btn-info btn-block btn-submit">Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="login-footer">
                            <div className="pull-left">
                                © {d.getFullYear()} LockBook
                            </div>
                            <div className="pull-right">
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
} 