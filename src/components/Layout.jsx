import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        {/* START PAGE CONTAINER */}
        <div className="page-container">
          {/* START PAGE SIDEBAR */}
          <div className="page-sidebar">
            {/* START X-NAVIGATION */}
            <ul className="x-navigation">
              <li className="xn-logo">
                <a href="index.html">Joli Admin</a>
                <a href="#" className="x-navigation-control" />
              </li>
              <li className="xn-profile">
                <a href="#" className="profile-mini">
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
                <a href="#"><span className="fa fa-files-o" /> <span className="xn-text">Pages</span></a>
                <ul>
                  <li><a href="pages-gallery.html"><span className="fa fa-image" /> Gallery</a></li>
                  <li><a href="pages-profile.html"><span className="fa fa-user" /> Profile</a></li>
                  <li><a href="pages-address-book.html"><span className="fa fa-users" /> Address Book</a></li>
                  <li className="xn-openable">
                    <a href="#"><span className="fa fa-clock-o" /> Timeline</a>
                    <ul>
                      <li><a href="pages-timeline.html"><span className="fa fa-align-center" /> Default</a></li>
                      <li><a href="pages-timeline-simple.html"><span className="fa fa-align-justify" /> Full Width</a></li>
                    </ul>
                  </li>
                  <li className="xn-openable">
                    <a href="#"><span className="fa fa-envelope" /> Mailbox</a>
                    <ul>
                      <li><a href="pages-mailbox-inbox.html"><span className="fa fa-inbox" /> Inbox</a></li>
                      <li><a href="pages-mailbox-message.html"><span className="fa fa-file-text" /> Message</a></li>
                      <li><a href="pages-mailbox-compose.html"><span className="fa fa-pencil" /> Compose</a></li>
                    </ul>
                  </li>
                  <li><a href="pages-messages.html"><span className="fa fa-comments" /> Messages</a></li>
                  <li><a href="pages-calendar.html"><span className="fa fa-calendar" /> Calendar</a></li>
                  <li><a href="pages-tasks.html"><span className="fa fa-edit" /> Tasks</a></li>
                  <li><a href="pages-content-table.html"><span className="fa fa-columns" /> Content Table</a></li>
                  <li><a href="pages-faq.html"><span className="fa fa-question-circle" /> FAQ</a></li>
                  <li><a href="pages-search.html"><span className="fa fa-search" /> Search</a></li>
                  <li className="xn-openable">
                    <a href="#"><span className="fa fa-file" /> Blog</a>
                    <ul>                                    
                      <li><a href="pages-blog-list.html"><span className="fa fa-copy" /> List of Posts</a></li>
                      <li><a href="pages-blog-post.html"><span className="fa fa-file-o" />Single Post</a></li>
                    </ul>
                  </li>
                  <li className="xn-openable">
                    <a href="#"><span className="fa fa-sign-in" /> Login</a>
                    <ul>                                    
                      <li><a href="pages-login.html">App Login</a></li>
                      <li><a href="pages-login-website.html">Website Login</a></li>
                      <li><a href="pages-login-website-light.html"> Website Login Light</a></li>
                    </ul>
                  </li>
                  <li className="xn-openable">
                    <a href="#"><span className="fa fa-warning" /> Error Pages</a>
                    <ul>                                    
                      <li><a href="pages-error-404.html">Error 404 Sample 1</a></li>
                      <li><a href="pages-error-404-2.html">Error 404 Sample 2</a></li>
                      <li><a href="pages-error-500.html"> Error 500</a></li>
                    </ul>
                  </li>                            
                </ul>
              </li>
              <li className="xn-openable">
                <a href="#"><span className="fa fa-file-text-o" /> <span className="xn-text">Layouts</span></a>
                <ul>
                  <li><a href="layout-boxed.html">Boxed</a></li>
                  <li><a href="layout-nav-toggled.html">Navigation Toggled</a></li>
                  <li><a href="layout-nav-top.html">Navigation Top</a></li>
                  <li><a href="layout-nav-right.html">Navigation Right</a></li>
                  <li><a href="layout-nav-top-fixed.html">Top Navigation Fixed</a></li>                            
                  <li><a href="layout-nav-custom.html">Custom Navigation</a></li>
                  <li><a href="layout-frame-left.html">Frame Left Column</a></li>
                  <li><a href="layout-frame-right.html">Frame Right Column</a></li>
                  <li><a href="layout-search-left.html">Search Left Side</a></li>
                  <li><a href="blank.html">Blank Page</a></li>
                </ul>
              </li>
              <li className="xn-title">Components</li>
              <li className="xn-openable">
                <a href="#"><span className="fa fa-cogs" /> <span className="xn-text">UI Kits</span></a>                        
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
              <li className="xn-openable">
                <a href="#"><span className="fa fa-pencil" /> <span className="xn-text">Forms</span></a>
                <ul>
                  <li>
                    <a href="form-layouts-two-column.html"><span className="fa fa-tasks" /> Form Layouts</a>
                    <div className="informer informer-danger">New</div>
                    <ul>
                      <li><a href="form-layouts-one-column.html"><span className="fa fa-align-justify" /> One Column</a></li>
                      <li><a href="form-layouts-two-column.html"><span className="fa fa-th-large" /> Two Column</a></li>
                      <li><a href="form-layouts-tabbed.html"><span className="fa fa-table" /> Tabbed</a></li>
                      <li><a href="form-layouts-separated.html"><span className="fa fa-th-list" /> Separated Rows</a></li>
                    </ul> 
                  </li>
                  <li><a href="form-elements.html"><span className="fa fa-file-text-o" /> Elements</a></li>
                  <li><a href="form-validation.html"><span className="fa fa-list-alt" /> Validation</a></li>
                  <li><a href="form-wizards.html"><span className="fa fa-arrow-right" /> Wizards</a></li>
                  <li><a href="form-editors.html"><span className="fa fa-text-width" /> WYSIWYG Editors</a></li>
                  <li><a href="form-file-handling.html"><span className="fa fa-floppy-o" /> File Handling</a></li>
                </ul>
              </li>
              <li className="xn-openable">
                <a href="tables.html"><span className="fa fa-table" /> <span className="xn-text">Tables</span></a>
                <ul>                            
                  <li><a href="table-basic.html"><span className="fa fa-align-justify" /> Basic</a></li>
                  <li><a href="table-datatables.html"><span className="fa fa-sort-alpha-desc" /> Data Tables</a></li>
                  <li><a href="table-export.html"><span className="fa fa-download" /> Export Tables</a></li>                            
                </ul>
              </li>
              <li className="xn-openable">
                <a href="#"><span className="fa fa-bar-chart-o" /> <span className="xn-text">Charts</span></a>
                <ul>
                  <li><a href="charts-morris.html"><span className="xn-text">Morris</span></a></li>
                  <li><a href="charts-nvd3.html"><span className="xn-text">NVD3</span></a></li>
                  <li><a href="charts-rickshaw.html"><span className="xn-text">Rickshaw</span></a></li>
                  <li><a href="charts-other.html"><span className="xn-text">Other</span></a></li>
                </ul>
              </li>                    
              <li>
                <a href="maps.html"><span className="fa fa-map-marker" /> <span className="xn-text">Maps</span></a>
              </li>                    
              <li className="xn-openable">
                <a href="#"><span className="fa fa-sitemap" /> <span className="xn-text">Navigation Levels</span></a>
                <ul>                            
                  <li className="xn-openable">
                    <a href="#">Second Level</a>
                    <ul>
                      <li className="xn-openable">
                        <a href="#">Third Level</a>
                        <ul>
                          <li className="xn-openable">
                            <a href="#">Fourth Level</a>
                            <ul>
                              <li><a href="#">Fifth Level</a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>                            
                </ul>
              </li>
            </ul>
            {/* END X-NAVIGATION */}
          </div>
          {/* END PAGE SIDEBAR */}
          <div id="content">
          </div>
        </div>
        {/* END PAGE CONTAINER */}
        {/* MESSAGE BOX*/}
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
        {/* END MESSAGE BOX*/}
      </div>
  );
}