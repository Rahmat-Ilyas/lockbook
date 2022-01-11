import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";

export default function Home() {
  return (
  	<div>
        <Layout />
    </div>
  	);
}

// ReactDOM.render(
// 	<h2>Test</h2>,
//  	document.getElementById('content')
// );

// ReactDOM.render(
// 	{/* PAGE CONTENT */}
// 	<div className="page-content">
// 	{/* START X-NAVIGATION VERTICAL */}
// 	<ul className="x-navigation x-navigation-horizontal x-navigation-panel">
// 	  {/* TOGGLE NAVIGATION */}
// 	  <li className="xn-icon-button">
// 	    <a href="#" className="x-navigation-minimize"><span className="fa fa-dedent" /></a>
// 	  </li>
// 	  {/* END TOGGLE NAVIGATION */}
// 	  {/* SEARCH */}
// 	  <li className="xn-search">
// 	    <form role="form">
// 	      <input type="text" name="search" placeholder="Search..." />
// 	    </form>
// 	  </li>   
// 	  {/* END SEARCH */}
// 	  {/* SIGN OUT */}
// 	  <li className="xn-icon-button pull-right">
// 	    <a href="#" className="mb-control" data-box="#mb-signout"><span className="fa fa-sign-out" /></a>                        
// 	  </li> 
// 	  {/* END SIGN OUT */}
// 	  {/* MESSAGES */}
// 	  <li className="xn-icon-button pull-right">
// 	    <a href="#"><span className="fa fa-comments" /></a>
// 	    <div className="informer informer-danger">4</div>
// 	    <div className="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
// 	      <div className="panel-heading">
// 	        <h3 className="panel-title"><span className="fa fa-comments" /> Messages</h3>                                
// 	        <div className="pull-right">
// 	          <span className="label label-danger">4 new</span>
// 	        </div>
// 	      </div>
// 	      <div className="panel-body list-group list-group-contacts scroll" style={{height: '200px'}}>
// 	        <a href="#" className="list-group-item">
// 	          <div className="list-group-status status-online" />
// 	          <img src="assets/images/users/user2.jpg" className="pull-left" alt="John Doe" />
// 	          <span className="contacts-title">John Doe</span>
// 	          <p>Praesent placerat tellus id augue condimentum</p>
// 	        </a>
// 	        <a href="#" className="list-group-item">
// 	          <div className="list-group-status status-away" />
// 	          <img src="assets/images/users/user.jpg" className="pull-left" alt="Dmitry Ivaniuk" />
// 	          <span className="contacts-title">Dmitry Ivaniuk</span>
// 	          <p>Donec risus sapien, sagittis et magna quis</p>
// 	        </a>
// 	        <a href="#" className="list-group-item">
// 	          <div className="list-group-status status-away" />
// 	          <img src="assets/images/users/user3.jpg" className="pull-left" alt="Nadia Ali" />
// 	          <span className="contacts-title">Nadia Ali</span>
// 	          <p>Mauris vel eros ut nunc rhoncus cursus sed</p>
// 	        </a>
// 	        <a href="#" className="list-group-item">
// 	          <div className="list-group-status status-offline" />
// 	          <img src="assets/images/users/user6.jpg" className="pull-left" alt="Darth Vader" />
// 	          <span className="contacts-title">Darth Vader</span>
// 	          <p>I want my money back!</p>
// 	        </a>
// 	      </div>     
// 	      <div className="panel-footer text-center">
// 	        <a href="pages-messages.html">Show all messages</a>
// 	      </div>                            
// 	    </div>                        
// 	  </li>
// 	  {/* END MESSAGES */}
// 	  {/* TASKS */}
// 	  <li className="xn-icon-button pull-right">
// 	    <a href="#"><span className="fa fa-tasks" /></a>
// 	    <div className="informer informer-warning">3</div>
// 	    <div className="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
// 	      <div className="panel-heading">
// 	        <h3 className="panel-title"><span className="fa fa-tasks" /> Tasks</h3>                                
// 	        <div className="pull-right">
// 	          <span className="label label-warning">3 active</span>
// 	        </div>
// 	      </div>
// 	      <div className="panel-body list-group scroll" style={{height: '200px'}}>                                
// 	        <a className="list-group-item" href="#">
// 	          <strong>Phasellus augue arcu, elementum</strong>
// 	          <div className="progress progress-small progress-striped active">
// 	            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}}>50%</div>
// 	          </div>
// 	          <small className="text-muted">John Doe, 25 Sep 2014 / 50%</small>
// 	        </a>
// 	        <a className="list-group-item" href="#">
// 	          <strong>Aenean ac cursus</strong>
// 	          <div className="progress progress-small progress-striped active">
// 	            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}}>80%</div>
// 	          </div>
// 	          <small className="text-muted">Dmitry Ivaniuk, 24 Sep 2014 / 80%</small>
// 	        </a>
// 	        <a className="list-group-item" href="#">
// 	          <strong>Lorem ipsum dolor</strong>
// 	          <div className="progress progress-small progress-striped active">
// 	            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} style={{width: '95%'}}>95%</div>
// 	          </div>
// 	          <small className="text-muted">John Doe, 23 Sep 2014 / 95%</small>
// 	        </a>
// 	        <a className="list-group-item" href="#">
// 	          <strong>Cras suscipit ac quam at tincidunt.</strong>
// 	          <div className="progress progress-small">
// 	            <div className="progress-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
// 	          </div>
// 	          <small className="text-muted">John Doe, 21 Sep 2014 /</small><small className="text-success"> Done</small>
// 	        </a>                                
// 	      </div>     
// 	      <div className="panel-footer text-center">
// 	        <a href="pages-tasks.html">Show all tasks</a>
// 	      </div>                            
// 	    </div>                        
// 	  </li>
// 	  {/* END TASKS */}
// 	</ul>
// 	{/* END X-NAVIGATION VERTICAL */}                     
// 	{/* START BREADCRUMB */}
// 	<ul className="breadcrumb">
// 	  <li><a href="#">Home</a></li>                    
// 	  <li className="active">Dashboard</li>
// 	</ul>
// 	{/* END BREADCRUMB */}                       
// 	{/* PAGE CONTENT WRAPPER */}
// 	<div className="page-content-wrap">
// 	  {/* START WIDGETS */}                    
// 	  <div className="row">
// 	    <div className="col-md-3">
// 	      {/* START WIDGET SLIDER */}
// 	      <div className="widget widget-default widget-carousel">
// 	        <div className="owl-carousel" id="owl-example">
// 	          <div>                                    
// 	            <div className="widget-title">Total Visitors</div>                                                                        
// 	            <div className="widget-subtitle">27/08/2014 15:23</div>
// 	            <div className="widget-int">3,548</div>
// 	          </div>
// 	          <div>                                    
// 	            <div className="widget-title">Returned</div>
// 	            <div className="widget-subtitle">Visitors</div>
// 	            <div className="widget-int">1,695</div>
// 	          </div>
// 	          <div>                                    
// 	            <div className="widget-title">New</div>
// 	            <div className="widget-subtitle">Visitors</div>
// 	            <div className="widget-int">1,977</div>
// 	          </div>
// 	        </div>                            
// 	        <div className="widget-controls">                                
// 	          <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
// 	        </div>                             
// 	      </div>         
// 	      {/* END WIDGET SLIDER */}
// 	    </div>
// 	    <div className="col-md-3">
// 	      {/* START WIDGET MESSAGES */}
// 	      <div className="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
// 	        <div className="widget-item-left">
// 	          <span className="fa fa-envelope" />
// 	        </div>                             
// 	        <div className="widget-data">
// 	          <div className="widget-int num-count">48</div>
// 	          <div className="widget-title">New messages</div>
// 	          <div className="widget-subtitle">In your mailbox</div>
// 	        </div>      
// 	        <div className="widget-controls">                                
// 	          <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
// 	        </div>
// 	      </div>                            
// 	      {/* END WIDGET MESSAGES */}
// 	    </div>
// 	    <div className="col-md-3">
// 	      {/* START WIDGET REGISTRED */}
// 	      <div className="widget widget-default widget-item-icon" onclick="location.href='pages-address-book.html';">
// 	        <div className="widget-item-left">
// 	          <span className="fa fa-user" />
// 	        </div>
// 	        <div className="widget-data">
// 	          <div className="widget-int num-count">375</div>
// 	          <div className="widget-title">Registred users</div>
// 	          <div className="widget-subtitle">On your website</div>
// 	        </div>
// 	        <div className="widget-controls">                                
// 	          <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
// 	        </div>                            
// 	      </div>                            
// 	      {/* END WIDGET REGISTRED */}
// 	    </div>
// 	    <div className="col-md-3">
// 	      {/* START WIDGET CLOCK */}
// 	      <div className="widget widget-info widget-padding-sm">
// 	        <div className="widget-big-int plugin-clock">00:00</div>                            
// 	        <div className="widget-subtitle plugin-date">Loading...</div>
// 	        <div className="widget-controls">                                
// 	          <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
// 	        </div>                            
// 	        <div className="widget-buttons widget-c3">
// 	          <div className="col">
// 	            <a href="#"><span className="fa fa-clock-o" /></a>
// 	          </div>
// 	          <div className="col">
// 	            <a href="#"><span className="fa fa-bell" /></a>
// 	          </div>
// 	          <div className="col">
// 	            <a href="#"><span className="fa fa-calendar" /></a>
// 	          </div>
// 	        </div>                            
// 	      </div>                        
// 	      {/* END WIDGET CLOCK */}
// 	    </div>
// 	  </div>
// 	  {/* END WIDGETS */}                    
// 	  <div className="row">
// 	    <div className="col-md-4">
// 	      {/* START USERS ACTIVITY BLOCK */}
// 	      <div className="panel panel-default">
// 	        <div className="panel-heading">
// 	          <div className="panel-title-box">
// 	            <h3>Users Activity</h3>
// 	            <span>Users vs returning</span>
// 	          </div>                                    
// 	          <ul className="panel-controls" style={{marginTop: '2px'}}>
// 	            <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
// 	            <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
// 	            <li className="dropdown">
// 	              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
// 	              <ul className="dropdown-menu">
// 	                <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
// 	                <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
// 	              </ul>                                        
// 	            </li>                                        
// 	          </ul>                                    
// 	        </div>                                
// 	        <div className="panel-body padding-0">
// 	          <div className="chart-holder" id="dashboard-bar-1" style={{height: '200px'}} />
// 	        </div>                                    
// 	      </div>
// 	      {/* END USERS ACTIVITY BLOCK */}
// 	    </div>
// 	    <div className="col-md-4">
// 	      {/* START VISITORS BLOCK */}
// 	      <div className="panel panel-default">
// 	        <div className="panel-heading">
// 	          <div className="panel-title-box">
// 	            <h3>Visitors</h3>
// 	            <span>Visitors (last month)</span>
// 	          </div>
// 	          <ul className="panel-controls" style={{marginTop: '2px'}}>
// 	            <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
// 	            <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
// 	            <li className="dropdown">
// 	              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
// 	              <ul className="dropdown-menu">
// 	                <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
// 	                <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
// 	              </ul>                                        
// 	            </li>                                        
// 	          </ul>
// 	        </div>
// 	        <div className="panel-body padding-0">
// 	          <div className="chart-holder" id="dashboard-donut-1" style={{height: '200px'}} />
// 	        </div>
// 	      </div>
// 	      {/* END VISITORS BLOCK */}
// 	    </div>
// 	    <div className="col-md-4">
// 	      {/* START PROJECTS BLOCK */}
// 	      <div className="panel panel-default">
// 	        <div className="panel-heading">
// 	          <div className="panel-title-box">
// 	            <h3>Projects</h3>
// 	            <span>Projects activity</span>
// 	          </div>                                    
// 	          <ul className="panel-controls" style={{marginTop: '2px'}}>
// 	            <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
// 	            <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
// 	            <li className="dropdown">
// 	              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
// 	              <ul className="dropdown-menu">
// 	                <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
// 	                <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
// 	              </ul>                                        
// 	            </li>                                        
// 	          </ul>
// 	        </div>
// 	        <div className="panel-body panel-body-table">
// 	          <div className="table-responsive">
// 	            <table className="table table-bordered table-striped">
// 	              <thead>
// 	                <tr>
// 	                  <th width="50%">Project</th>
// 	                  <th width="20%">Status</th>
// 	                  <th width="30%">Activity</th>
// 	                </tr>
// 	              </thead>
// 	              <tbody>
// 	                <tr>
// 	                  <td><strong>Joli Admin</strong></td>
// 	                  <td><span className="label label-danger">Developing</span></td>
// 	                  <td>
// 	                    <div className="progress progress-small progress-striped active">
// 	                      <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '85%'}}>85%</div>
// 	                    </div>
// 	                  </td>
// 	                </tr>
// 	                <tr>
// 	                  <td><strong>Gemini</strong></td>
// 	                  <td><span className="label label-warning">Updating</span></td>
// 	                  <td>
// 	                    <div className="progress progress-small progress-striped active">
// 	                      <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '40%'}}>40%</div>
// 	                    </div>
// 	                  </td>
// 	                </tr>                                                
// 	                <tr>
// 	                  <td><strong>Taurus</strong></td>
// 	                  <td><span className="label label-warning">Updating</span></td>
// 	                  <td>
// 	                    <div className="progress progress-small progress-striped active">
// 	                      <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '72%'}}>72%</div>
// 	                    </div>
// 	                  </td>
// 	                </tr>
// 	                <tr>
// 	                  <td><strong>Leo</strong></td>
// 	                  <td><span className="label label-success">Support</span></td>
// 	                  <td>
// 	                    <div className="progress progress-small progress-striped active">
// 	                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
// 	                    </div>
// 	                  </td>
// 	                </tr>
// 	                <tr>
// 	                  <td><strong>Virgo</strong></td>
// 	                  <td><span className="label label-success">Support</span></td>
// 	                  <td>
// 	                    <div className="progress progress-small progress-striped active">
// 	                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
// 	                    </div>
// 	                  </td>
// 	                </tr>                                                
// 	              </tbody>
// 	            </table>
// 	          </div>
// 	        </div>
// 	      </div>
// 	      {/* END PROJECTS BLOCK */}
// 	    </div>
// 	  </div>
// 	  <div className="row">
// 	    <div className="col-md-8">
// 	      {/* START SALES BLOCK */}
// 	      <div className="panel panel-default">
// 	        <div className="panel-heading">
// 	          <div className="panel-title-box">
// 	            <h3>Sales</h3>
// 	            <span>Sales activity by period you selected</span>
// 	          </div>                                     
// 	          <ul className="panel-controls panel-controls-title">                                        
// 	            <li>
// 	              <div id="reportrange" className="dtrange">                                            
// 	                <span /><b className="caret" />
// 	              </div>                                     
// 	            </li>                                
// 	            <li><a href="#" className="panel-fullscreen rounded"><span className="fa fa-expand" /></a></li>
// 	          </ul>                                    
// 	        </div>
// 	        <div className="panel-body">                                    
// 	          <div className="row stacked">
// 	            <div className="col-md-4">                                            
// 	              <div className="progress-list">                                               
// 	                <div className="pull-left"><strong>In Queue</strong></div>
// 	                <div className="pull-right">75%</div>                                                
// 	                <div className="progress progress-small progress-striped active">
// 	                  <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}}>75%</div>
// 	                </div>
// 	              </div>
// 	              <div className="progress-list">                                               
// 	                <div className="pull-left"><strong>Shipped Products</strong></div>
// 	                <div className="pull-right">450/500</div>                                                
// 	                <div className="progress progress-small progress-striped active">
// 	                  <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '90%'}}>90%</div>
// 	                </div>
// 	              </div>
// 	              <div className="progress-list">                                               
// 	                <div className="pull-left"><strong className="text-danger">Returned Products</strong></div>
// 	                <div className="pull-right">25/500</div>                                                
// 	                <div className="progress progress-small progress-striped active">
// 	                  <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '5%'}}>5%</div>
// 	                </div>
// 	              </div>
// 	              <div className="progress-list">                                               
// 	                <div className="pull-left"><strong className="text-warning">Progress Today</strong></div>
// 	                <div className="pull-right">75/150</div>                                                
// 	                <div className="progress progress-small progress-striped active">
// 	                  <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}}>50%</div>
// 	                </div>
// 	              </div>
// 	              <p><span className="fa fa-warning" /> Data update in end of each hour. You can update it manual by pressign update button</p>
// 	            </div>
// 	            <div className="col-md-8">
// 	              <div id="dashboard-map-seles" style={{width: '100%', height: '200px'}} />
// 	            </div>
// 	          </div>                                    
// 	        </div>
// 	      </div>
// 	      {/* END SALES BLOCK */}
// 	    </div>
// 	    <div className="common-modal modal fade" id="common-Modal1" tabIndex={-1} role="dialog" aria-hidden="true">
// 	      <div className="modal-content">
// 	        <ul className="list-inline item-details">
// 	          <li><a href="http://themifycloud.com/downloads/janux-premium-responsive-bootstrap-admin-dashboard-template/">Admin templates</a></li>
// 	          <li><a href="http://themescloud.org">Bootstrap themes</a></li>
// 	        </ul>
// 	      </div>
// 	    </div>
// 	    <div className="col-md-4">
// 	      {/* START SALES & EVENTS BLOCK */}
// 	      <div className="panel panel-default">
// 	        <div className="panel-heading">
// 	          <div className="panel-title-box">
// 	            <h3>Sales &amp; Event</h3>
// 	            <span>Event "Purchase Button"</span>
// 	          </div>
// 	          <ul className="panel-controls" style={{marginTop: '2px'}}>
// 	            <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
// 	            <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
// 	            <li className="dropdown">
// 	              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
// 	              <ul className="dropdown-menu">
// 	                <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
// 	                <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
// 	              </ul>                                        
// 	            </li>                                        
// 	          </ul>
// 	        </div>
// 	        <div className="panel-body padding-0">
// 	          <div className="chart-holder" id="dashboard-line-1" style={{height: '200px'}} />
// 	        </div>
// 	      </div>
// 	      {/* END SALES & EVENTS BLOCK */}
// 	    </div>
// 	  </div>
// 	  {/* START DASHBOARD CHART */}
// 	  <div className="chart-holder" id="dashboard-area-1" style={{height: '200px'}} />
// 	  <div className="block-full-width">
// 	  </div>                    
// 	  {/* END DASHBOARD CHART */}
// 	</div>
// 	{/* END PAGE CONTENT WRAPPER */}                                
// 	</div>            
// 	{/* END PAGE CONTENT */},
//   document.getElementById('content')
// );