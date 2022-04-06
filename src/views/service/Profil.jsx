import React, { Component } from 'react';
import $, { each } from 'jquery';
import { toast } from 'react-toastify';
import { auth, db } from '../../config/firebase.js';
import { doc, collection, addDoc, updateDoc, getDocs, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Layout from "./Layout";

export default class PerbaikanBaru extends Component {
    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        auth.onAuthStateChanged(async function (user) {
            if (user) {
                const res = query(collection(db, "it_service"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    let res = doc.data();
                    $.each(res, function (key, value) {
                        $('#' + key + '_dtl').text(value);
                        $('input[name="' + key + '"], textarea[name="' + key + '"]').val(value);
                    });
                    var username = user.email.substring(3, user.email.length - 3);
                    $('#username_dtl').text(username);
                    $('input[name="username"], input[name="username_old"]').val(username);
                    $('input[name="password_edt"]').val('');
                    $('#id_edt').val(doc.id);
                    $('.profile-data-name').text(res.nama);
                });
            }
        });
    }

    handleUpdate = async (e) => {
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
                "xs@" + data.username_old + ".co",
                data.password,
            );
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                updateEmail(auth.currentUser, "xs@" + data.username + ".co").then(async () => {
                    const result = doc(db, "it_service", data.id_edt);

                    if (data.password_edt) {
                        await updateDoc(result, {
                            nama: data.nama,
                            alamat: data.alamat,
                            telepon: data.telepon,
                            spesialis: data.spesialis,
                            password: data.password_edt,
                        });
                        updatePassword(auth.currentUser, data.password_edt);
                    } else {
                        await updateDoc(result, {
                            nama: data.nama,
                            alamat: data.alamat,
                            telepon: data.telepon,
                            spesialis: data.spesialis,
                        });
                    }

                    this.notify('success', 'Data Profil Pegawai berhasil di update');
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

    render() {
        return (
            <div>
                <Layout active="profil-akun">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Akun & Profil</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* START DEFAULT DATATABLE */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Akun & Profil</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row justify-content-center">
                                                <div className="col-md-3" />
                                                <div className="col-md-6">
                                                    <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                        <thead>
                                                            <tr>
                                                                <th colSpan={3} style={{ paddingTop: '20px' }}>
                                                                    <h4 className='text-center'><b>Data Profil IT Service</b></h4>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>Nama Lengkap</th>
                                                                <td>:</td>
                                                                <td id='nama_dtl'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Alamat</th>
                                                                <td>:</td>
                                                                <td id='alamat_dtl'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Telepon</th>
                                                                <td>:</td>
                                                                <td id='telepon_dtl'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Spesialis</th>
                                                                <td>:</td>
                                                                <td id='spesialis_dtl'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Username</th>
                                                                <td>:</td>
                                                                <td id='username_dtl'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Password</th>
                                                                <td>:</td>
                                                                <td>********</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                    <div className='text-center'>
                                                        <button className='btn btn-success' data-toggle="modal" data-target="#modal-akun"><i className='fa fa-user-edit'></i> Update Data</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END DEFAULT DATATABLE */}
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* Modal Akun */}
                    <div className="modal fade" id="modal-akun" tabIndex={9999} role="dialog" aria-labelledby="modal-akunLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <form onSubmit={this.handleUpdate}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button className="close close-edt" data-dismiss="modal"><span>×</span></button>
                                        <h5 className="modal-title" id="modal-akunLabel">Update Profil</h5>
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
                                            <label className="col-md-3">Telepon</label>
                                            <div className="col-md-9">
                                                <input type="text" name="telepon" className="form-control" required placeholder="Telepon..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Alamat</label>
                                            <div className="col-md-9">
                                                <textarea name="alamat" className="form-control" required rows="5" placeholder="Alamat..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Spesialis</label>
                                            <div className="col-md-9">
                                                <input type="text" name="spesialis" className="form-control" required placeholder="Spesialis..." />
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

                </Layout >
            </div >
        );
    }
}