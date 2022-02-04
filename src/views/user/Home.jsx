import React, { Component } from 'react';
import Layout from "./Layout";

export default class AdminHome extends Component {

    render() {
        return (
            <div>
                <Layout active="adm-dahboard">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="#">Panel Pegawai</a></li>
                            <li className="active">Daashboard</li>
                        </ul>

                        <div className="panel panel-default" style={{ marginTop: '-10px' }}>
                            <div className="panel-body">
                                <div className="page-title">
                                    <h2><span className="fa fa-home" /> Dashboard</h2>
                                </div>

                                <div className="page-content-wrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Add class <code>.page-navigation-top</code> to <code>.page-container</code> to use top navigation
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