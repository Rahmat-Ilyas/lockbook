import React, { Component } from 'react';
import { auth } from '../../config/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";

export default class Login extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                window.location.href = '/admin';
            }
        });
    }

    state = {
        username: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        signInWithEmailAndPassword(auth, 'x@' + username + '.co', password)
            .then((userCredential) => {
                // Signed in
                window.location.href = '/admin';
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <div className="login-container" style={{ height: '100vh' }}>
                    <div className="login-box animated fadeInDown">
                        <div className="login-logo" />
                        <div className="login-body">
                            <div className="login-title"><strong>Welcome</strong>, Please login</div>
                            <form action="index.html" className="form-horizontal" method="post" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input type="text" name="username" className="form-control" placeholder="Username" value={username} onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6">
                                        <a href="#" className="btn btn-link btn-block">Forgot your password?</a>
                                    </div>
                                    <div className="col-md-6">
                                        <button type='submit' className="btn btn-info btn-block">Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="login-footer">
                            <div className="pull-left">
                                © 2014 AppName
                            </div>
                            <div className="pull-right">
                                <a href="#">About</a> |
                                <a href="#">Privacy</a> |
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
} 