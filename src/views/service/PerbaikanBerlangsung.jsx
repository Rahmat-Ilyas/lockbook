import React, { Component } from 'react';
import Layout from "./Layout";

export default class AdminUser extends Component {

    render() {
        return (
            <div>
                <Layout active="perbaikan-berlangsung">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Perbaikan Berlangsung</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Perbaikan Yang Sedang Berlangsung</h3>
                                            <ul className="panel-controls">
                                                <li><a href="#!" className="panel-collapse"><span className="fa fa-angle-down" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="col-sm-5">
                                                    <h2>Perbaikan Yang Diproses</h2>
                                                    <hr />
                                                    <div>
                                                        <label>Pilih Perbaikan Yang Sedang Berlangsung</label>
                                                        <select className="form-control select">
                                                            <option value="1">Toshiba/35552727388</option>
                                                            <option value="2">Samsung/233322232</option>
                                                        </select>

                                                        <table className="table table-striped" style={{ marginTop: '20px' }}>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Pemilik</th>
                                                                    <td>:</td>
                                                                    <td>Wahyuni</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>B/N</th>
                                                                    <td>:</td>
                                                                    <td>9688577</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Nama Device</th>
                                                                    <td>:</td>
                                                                    <td>Toshiba</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Nomor Series</th>
                                                                    <td>:</td>
                                                                    <td>35552727388</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Problem</th>
                                                                    <td>:</td>
                                                                    <td>Sering mati sendiri</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Tanggal Masuk</th>
                                                                    <td>:</td>
                                                                    <td>02/02/2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Status</th>
                                                                    <td>:</td>
                                                                    <td>Diproses</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-sm-5">
                                                    <h2 className="text-center">Update Status & Progres Perbaikan</h2>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <label>Status Perbaikan</label>
                                                            <select className="form-control select">
                                                                <option value="1">Diproses</option>
                                                                <option value="2">Panding</option>
                                                                <option value="2">Selesai</option>
                                                                <option value="2">Cancel</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <label>Keterangan Progres</label>
                                                            <textarea name="" className="form-control" rows="5" placeholder="Masukkan keterangan progres perbaikan..."></textarea>
                                                        </div>
                                                        <div className="col-sm-12" style={{ marginTop: '10px' }}>
                                                            <button className="btn btn-success">Update Status</button>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                        <h4>Progres Perbaikan</h4>
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Tanggal</th>
                                                                    <th>Status</th>
                                                                    <th>Keterangan</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>01/02/2022 10:13</td>
                                                                    <td>Diproses</td>
                                                                    <td>Pesanan anda sedang diproses</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}