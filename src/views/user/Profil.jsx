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
                const res = query(collection(db, "pegawai"), where("uid", "==", user.uid));
                const result = await getDocs(res);
                result.forEach((doc) => {
                    let res = doc.data();
                    $.each(res, function (key, value) {
                        $('#' + key + '_dtl').text(value);
                        $('input[name="' + key + '"], textarea[name="' + key + '"]').val(value);
                    });
                    var username = user.email.substring(2, user.email.length - 3);
                    $('#username_dtl').text(username);
                    $('input[name="username"], input[name="username_old"]').val(username);
                    $('input[name="password_edt"]').val('');
                    $('#id_edt').val(doc.id);
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
                "x@" + data.username_old + ".co",
                data.password,
            );
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                updateEmail(auth.currentUser, "x@" + data.username + ".co").then(async () => {
                    const result = doc(db, "pegawai", data.id_edt);

                    if (data.password_edt) {
                        await updateDoc(result, {
                            nama: data.nama,
                            alamat: data.alamat,
                            telepon: data.telepon,
                            password: data.password_edt,
                        });
                        updatePassword(auth.currentUser, data.password_edt);
                    } else {
                        await updateDoc(result, {
                            nama: data.nama,
                            alamat: data.alamat,
                            telepon: data.telepon,
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
                <Layout active="profil">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#!">Panel Pegawai</a></li>
                            <li className="active">Profil Pegawai</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px', paddingBottom: '50px' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-id-card" /> Profil Pegawai</h2>
                                </div>
                                <div className="page-content-wrap">
                                    <hr style={{ marginTop: '-5px' }} />
                                    <div className="row justify-content-center">
                                        <div className="col-md-3" />
                                        <div className="col-md-6">
                                            <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={3} style={{ paddingTop: '20px' }}>
                                                            <h4 className='text-center'><b>Data Pegawai</b></h4>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th width="130">B/N</th>
                                                        <td width="10">:</td>
                                                        <td id='nip_dtl'>-</td>
                                                    </tr>
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
                                            <label className="col-md-3">B/N</label>
                                            <div className="col-md-9">
                                                <input type="hidden" name="id_edt" id="id_edt" />
                                                <input type="number" name="nip" className="form-control" required readOnly placeholder="B/N..." />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3">Nama Lengkap</label>
                                            <div className="col-md-9">
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