import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout(props) {
    return (
        <div>
            <div className="page-container">
                <div className="page-sidebar">
                    <ul className="x-navigation">
                        <li className="xn-logo">
                            <a href="index.html">Joli Admin</a>
                            <a href="#!" className="x-navigation-control" />
                        </li>
                        <li className="xn-profile">
                            <a href="#!" className="profile-mini">
                                <img src="assets/images/users/avatar.jpg" alt="John Doe" />
                            </a>
                            <div className="profile">
                                <div className="profile-image">
                                    <img src="assets/images/users/avatar.jpg" alt="John Doe" />
                                </div>
                                <div className="profile-data">
                                    <div className="profile-data-name">John Doe</div>
                                    <div className="profile-data-title">Web Developer/Designer</div>
                                </div>
                                <div className="profile-controls">
                                    <a href="pages-profile.html" className="profile-control-left"><span className="fa fa-info" /></a>
                                    <a href="pages-messages.html" className="profile-control-right"><span className="fa fa-envelope" /></a>
                                </div>
                            </div>
                        </li>
                        <li className="xn-title">Navigation</li>
                        <li className="active">
                            <a href="index.html"><span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span></a>
                        </li>
                        <li className="xn-openable">
                            <a href="#!"><span className="fa fa-files-o" /> <span className="xn-text">Pages</span></a>
                            <ul>
                                <li><a href="pages-gallery.html"><span className="fa fa-image" /> Gallery</a></li>
                                <li><a href="pages-profile.html"><span className="fa fa-user" /> Profile</a></li>
                                <li><a href="pages-address-book.html"><span className="fa fa-users" /> Address Book</a></li>
                            </ul>
                        </li>
                        <li className="xn-title">Components</li>
                        <li className="xn-openable">
                            <a href="#!"><span className="fa fa-cogs" /> <span className="xn-text">UI Kits</span></a>
                            <ul>
                                <li><a href="ui-widgets.html"><span className="fa fa-heart" /> Widgets</a></li>
                                <li><a href="ui-elements.html"><span className="fa fa-cogs" /> Elements</a></li>
                                <li><a href="ui-buttons.html"><span className="fa fa-square-o" /> Buttons</a></li>
                                <li><a href="ui-panels.html"><span className="fa fa-pencil-square-o" /> Panels</a></li>
                                <li><a href="ui-icons.html"><span className="fa fa-magic" /> Icons</a><div className="informer informer-warning">+679</div></li>
                                <li><a href="ui-typography.html"><span className="fa fa-pencil" /> Typography</a></li>
                                <li><a href="ui-portlet.html"><span className="fa fa-th" /> Portlet</a></li>
                                <li><a href="ui-sliders.html"><span className="fa fa-arrows-h" /> Sliders</a></li>
                                <li><a href="ui-alerts-popups.html"><span className="fa fa-warning" /> Alerts &amp; Popups</a></li>
                                <li><a href="ui-lists.html"><span className="fa fa-list-ul" /> Lists</a></li>
                                <li><a href="ui-tour.html"><span className="fa fa-random" /> Tour</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /> <span className="xn-text">Log Out</span></a>
                        </li>
                    </ul>
                </div>
                <div id="content">
                    <div className="page-content">
                        <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
                            <li className="xn-icon-button">
                                <a href="#!" className="x-navigation-minimize"><span className="fa fa-dedent" /></a>
                            </li>
                        </ul>

                        {props.children}

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
                                <a href="pages-login.html" className="btn btn-success btn-lg">Yes</a>
                                <button className="btn btn-default btn-lg mb-control-close">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}