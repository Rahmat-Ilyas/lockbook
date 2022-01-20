import React, { Component } from 'react';
import Layout from "./Layout";

export default class TambahPegawai extends Component {

    render() {
        return (
            <div>
                <Layout active="adm-addpegawai">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="/#">Home</a></li>
                            <li className="/#">Kelola Pegawai</li>
                            <li className="active">Tambah Pegawai</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row justify-content-center">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8">
                                    <form className="form-horizontal">
                                        <div className="panel panel-default">
                                            <div className="panel-heading ui-draggable-handle">
                                                <h3 className="panel-title"><strong>Tambah Data Pegawai Baru</strong></h3>
                                            </div>
                                            <div className="panel-body" style={{ padding: "30px" }}>
                                                <div className="form-group">
                                                    <label className="col-md-2">Text</label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" defaultValue="Some text value..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Password</label>
                                                    <div className="col-md-10">
                                                        <input type="password" className="form-control" defaultValue="password" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Readonly</label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" readOnly defaultValue="Readonly value" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Disabled</label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" readOnly defaultValue="Disabled value" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Placeholder</label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" placeholder="Fill this field please" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Text area</label>
                                                    <div className="col-md-10">
                                                        <textarea className="form-control" rows={5} defaultValue={""} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-2">Label</label>
                                                    <div className="col-md-10">
                                                        <p className="form-control-static">Static form control</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="panel-footer">
                                                <button className="btn btn-default">Clear Form</button>
                                                <button className="btn btn-primary pull-right">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div >
                </Layout >
            </div >
        );
    }
}