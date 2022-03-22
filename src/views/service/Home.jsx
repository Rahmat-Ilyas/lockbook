import React, { Component } from 'react';
import Layout from "./Layout";

export default class AdminUser extends Component {

    render() {
        return (
            <div>
                <Layout active="adm-dahboard">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="#!">Home</a></li>
                            <li className="active">Dashboard</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-4">
                                    {/* START WIDGET MESSAGES */}
                                    <div className="widget widget-default widget-item-icon">
                                        <div className="widget-item-left">
                                            <span className="fa fa-tools" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">48</div>
                                            <div className="widget-title">Data Perbaikan Baru</div>
                                        </div>
                                        <div className="widget-controls">
                                            <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                    </div>
                                    {/* END WIDGET MESSAGES */}
                                </div>
                                <div className="col-md-4">
                                    {/* START WIDGET REGISTRED */}
                                    <div className="widget widget-default widget-item-icon">
                                        <div className="widget-item-left">
                                            <span className="fa fa-hourglass-half" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">2</div>
                                            <div className="widget-title">Perbaikan Berlangsung</div>
                                        </div>
                                        <div className="widget-controls">
                                            <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                    </div>
                                    {/* END WIDGET REGISTRED */}
                                </div>
                                <div className="col-md-4">
                                    {/* START WIDGET CLOCK */}
                                    <div className="widget widget-info widget-padding-sm">
                                        <div className="widget-big-int plugin-clock">00:00</div>
                                        <div className="widget-subtitle plugin-date">Loading...</div>
                                        <div className="widget-controls">
                                            <a href="#!" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                        <div className="widget-buttons widget-c3">
                                            <div className="col">
                                                <a href="#!"><span className="fa fa-clock-o" /></a>
                                            </div>
                                            <div className="col">
                                                <a href="#!"><span className="fa fa-bell" /></a>
                                            </div>
                                            <div className="col">
                                                <a href="#!"><span className="fa fa-calendar" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END WIDGET CLOCK */}
                                </div>
                                
                               <div className="col-md-12">
                                <div className="panel panel-default">                            
                                  <div className="panel-body panel-body-image">
                                    <img src="assets/images/bg.jpg" alt="Ocean" height="250"  />
                                    <a href="#" className="panel-body-inform">
                                      <span className="fa fa-heart-o" />
                                    </a>
                                  </div>
                                  <div className="panel-body">
                                    <h3>Selamat Datang</h3>
                                    <p>Selamat Datang di Departement IT PT Vale Indonesia Tbk.</p>
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