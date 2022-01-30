import React, { Component } from 'react';
import Layout from "./Layout";

export default class AdminHome extends Component {

    render() {
        return (
            <div>
                <Layout active="adm-dahboard">
                    <div>
                        <ul className="breadcrumb">
                            <li><a href="/#">Home</a></li>
                            <li className="active">Dashboard</li>
                        </ul>

                        <div className="page-content-wrap">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* START WIDGET SLIDER */}
                                    <div className="widget widget-default widget-carousel">
                                        <div className="owl-carousel" id="owl-example">
                                            <div>
                                                <div className="widget-title">Total Visitors</div>
                                                <div className="widget-subtitle">27/08/2014 15:23</div>
                                                <div className="widget-int">3,548</div>
                                            </div>
                                            <div>
                                                <div className="widget-title">Returned</div>
                                                <div className="widget-subtitle">Visitors</div>
                                                <div className="widget-int">1,695</div>
                                            </div>
                                            <div>
                                                <div className="widget-title">New</div>
                                                <div className="widget-subtitle">Visitors</div>
                                                <div className="widget-int">1,977</div>
                                            </div>
                                        </div>
                                        <div className="widget-controls">
                                            <a href="/#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                    </div>
                                    {/* END WIDGET SLIDER */}
                                </div>
                                <div className="col-md-3">
                                    {/* START WIDGET MESSAGES */}
                                    <div className="widget widget-default widget-item-icon">
                                        <div className="widget-item-left">
                                            <span className="fa fa-envelope" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">48</div>
                                            <div className="widget-title">New messages</div>
                                            <div className="widget-subtitle">In your mailbox</div>
                                        </div>
                                        <div className="widget-controls">
                                            <a href="/#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                    </div>
                                    {/* END WIDGET MESSAGES */}
                                </div>
                                <div className="col-md-3">
                                    {/* START WIDGET REGISTRED */}
                                    <div className="widget widget-default widget-item-icon">
                                        <div className="widget-item-left">
                                            <span className="fa fa-user" />
                                        </div>
                                        <div className="widget-data">
                                            <div className="widget-int num-count">375</div>
                                            <div className="widget-title">Registred users</div>
                                            <div className="widget-subtitle">On your website</div>
                                        </div>
                                        <div className="widget-controls">
                                            <a href="/#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                    </div>
                                    {/* END WIDGET REGISTRED */}
                                </div>
                                <div className="col-md-3">
                                    {/* START WIDGET CLOCK */}
                                    <div className="widget widget-info widget-padding-sm">
                                        <div className="widget-big-int plugin-clock">00:00</div>
                                        <div className="widget-subtitle plugin-date">Loading...</div>
                                        <div className="widget-controls">
                                            <a href="/#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
                                        </div>
                                        <div className="widget-buttons widget-c3">
                                            <div className="col">
                                                <a href="/#"><span className="fa fa-clock-o" /></a>
                                            </div>
                                            <div className="col">
                                                <a href="/#"><span className="fa fa-bell" /></a>
                                            </div>
                                            <div className="col">
                                                <a href="/#"><span className="fa fa-calendar" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END WIDGET CLOCK */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}