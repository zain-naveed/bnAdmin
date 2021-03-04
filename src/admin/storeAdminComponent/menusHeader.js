import React from 'react';
import {Link} from 'react-router-dom';
export default function MenusHeader(){
    return (
        <>
        		<div class="horizontal-main hor-menu clearfix side-header" style={{borderTop:"0px"}}>
				<div class="horizontal-mainwrapper container clearfix">
				
					<nav class="horizontalMenu clearfix">
						<ul class="horizontalMenu-list">
							<li aria-haspopup="true"><a href="#" class="sub-icon"><i class="bx bx-home-circle menu-icon"></i> Dashboard <span class="badge badge-success horizontal-badge">2</span><i class="fe fe-chevron-down horizontal-icon"></i></a>
								<ul class="sub-menu">
									<li aria-haspopup="true"><a href="index.html" class="slide-item">E-Commerce</a></li>
									<li aria-haspopup="true"><a href="index2.html" class="slide-item">Analytics</a></li>
								</ul>
							</li>
							<li aria-haspopup="true"><a href="#" class="sub-icon"><i class="bx bx-box menu-icon"></i> Advanced UI <i class="fe fe-chevron-down horizontal-icon"></i></a>
								<ul class="sub-menu">
									<li aria-haspopup="true"><a href="accordion.html" class="slide-item"> Accordion</a></li>
									<li aria-haspopup="true"><a href="carousel.html" class="slide-item" >Carousel</a></li>
									<li aria-haspopup="true"><a href="collapse.html" class="slide-item">Collapse</a></li>
									<li aria-haspopup="true" class="sub-menu-sub "><a href="#">Userlist</a>
										<ul class="sub-menu">
											<li aria-haspopup="true"><a href="userlist.html" class="slide-item">Userlist</a></li>
											<li aria-haspopup="true"><a href="userlist2.html" class="slide-item">Userlist2</a></li>
										</ul>
									</li>
									<li aria-haspopup="true" class="sub-menu-sub "><a href="#">Filemanager</a>
										<ul class="sub-menu">
											<li aria-haspopup="true"><a href="file-manager.html" class="slide-item">File-manager</a></li>
											<li aria-haspopup="true"><a href="file-manager-list.html" class="slide-item">File-manager-List</a></li>
										</ul>
									</li>
									<li aria-haspopup="true" class="sub-menu-sub "><a href="#">Widgets</a>
										<ul class="sub-menu">
											<li aria-haspopup="true"><a href="widgets.html" class="slide-item">Widgets</a></li>
											<li aria-haspopup="true"><a href="chart-widgets.html" class="slide-item">Chart Widgets</a></li>
										</ul>
									</li>
									<li aria-haspopup="true"><a href="modals.html" class="slide-item">Modals</a></li>
									<li aria-haspopup="true"><a href="timeline.html" class="slide-item">Timeline</a></li>
									<li aria-haspopup="true"><a href="sweet-alert.html" class="slide-item">Sweet Alert</a></li>
									<li aria-haspopup="true"><a href="rating.html" class="slide-item">Ratings</a></li>
									<li aria-haspopup="true"><a href="counters.html" class="slide-item">Counters</a></li>
									<li aria-haspopup="true"><a href="search.html" class="slide-item">Search</a></li>
									<li aria-haspopup="true"><a href="blog.html" class="slide-item">Blog</a></li>
								</ul>
							</li>
							<li aria-haspopup="true"><a href="#" class="sub-icon"><i class="bx bx-tone menu-icon"></i> Elements<i class="fe fe-chevron-down horizontal-icon"></i></a>
								<div class="horizontal-megamenu clearfix">
									<div class="container">
										<div class="mega-menubg hor-mega-menu">
											<div class="row">
												<div class="col-lg-3 col-md-12 col-xs-12 link-list">
													<ul>
														<li><h3 class="fs-14 mb-1 mt-2">Elements</h3></li>
														<li aria-haspopup="true"><a href="alerts.html" class="slide-item">Alerts</a></li>
														<li aria-haspopup="true"><a href="avatar.html" class="slide-item">Avatar</a></li>
														<li aria-haspopup="true"><a href="breadcrumbs.html" class="slide-item">Breadcrumbs</a></li>
														<li aria-haspopup="true"><a href="buttons.html" class="slide-item">Buttons</a></li>
														<li aria-haspopup="true"><a href="badge.html" class="slide-item">Badge</a></li>
														<li aria-haspopup="true"><a href="dropdown.html" class="slide-item">Dropdown</a></li>
														<li aria-haspopup="true"><a href="thumbnails.html" class="slide-item">Thumbnails</a></li>
														<li aria-haspopup="true"><a href="images.html" class="slide-item">Images</a></li>
														<li aria-haspopup="true"><a href="list-group.html" class="slide-item">List Group</a></li>

													</ul>
												</div>
												<div class="col-lg-3 col-md-12 col-xs-12 link-list">
													<ul>
														<li aria-haspopup="true"><a href="navigation.html" class="slide-item">Navigation</a></li>
														<li aria-haspopup="true"><a href="pagination.html" class="slide-item">Pagination</a></li>
														<li aria-haspopup="true"><a href="popover.html" class="slide-item">Popover</a></li>
														<li aria-haspopup="true"><a href="progress.html" class="slide-item">Progress</a></li>
														<li aria-haspopup="true"><a href="spinners.html" class="slide-item">Spinners</a></li>
														<li aria-haspopup="true"><a href="media-object.html" class="slide-item">Media Object</a></li>
														<li aria-haspopup="true"><a href="typography.html" class="slide-item">Typography</a></li>
														<li aria-haspopup="true"><a href="tooltip.html" class="slide-item">Tooltip</a></li>
														<li aria-haspopup="true"><a href="toast.html" class="slide-item">Toast</a></li>
														<li aria-haspopup="true"><a href="tags.html" class="slide-item">Tags</a></li>
													</ul>
												</div>
												<div class="col-lg-3 col-md-12 col-xs-12 link-list">
													<ul>
														<li aria-haspopup="true"><a href="tabs.html" class="slide-item">Tabs</a></li>
														<li><h3 class="fs-14 mb-1 mt-2">Apps</h3></li>
														<li aria-haspopup="true"><a href="cards.html" class="slide-item">Cards</a></li>
														<li aria-haspopup="true"><a href="darggablecards.html" class="slide-item">Darggablecards</a></li>
														<li aria-haspopup="true"><a href="rangeslider.html" class="slide-item">Range-slider</a></li>
														<li aria-haspopup="true"><a href="calendar.html" class="slide-item">Calendar</a></li>
														<li aria-haspopup="true"><a href="image-compare.html" class="slide-item">Image-compare</a></li>
														<li aria-haspopup="true"><a href="notification.html" class="slide-item">Notification</a></li>
														<li aria-haspopup="true"><a href="widget-notification.html" class="slide-item">Widget-notification</a></li>
														<li aria-haspopup="true"><a href="treeview.html" class="slide-item">Treeview</a></li>

													</ul>
												</div>
												<div class="col-lg-3 col-md-12 col-xs-12 link-list">
													<ul>
														<li><h3 class="fs-14 mb-1 mt-2">Icons <span class="badge badge-success ">New</span></h3></li>
														<li aria-haspopup="true"><a href="icons.html" class="slide-item">Icons</a></li>
														<li><h3 class="fs-14 mb-1">Maps</h3></li>
														<li aria-haspopup="true"><a href="map-leaflet.html" class="slide-item">Mapel Maps</a></li>
														<li aria-haspopup="true"><a href="map-vector.html" class="slide-item">Vector Maps</a></li>

														<li><h3 class="fs-14 mb-1">Tables</h3></li>
														<li aria-haspopup="true"><a href="table-basic.html" class="slide-item">Basic Tables</a></li>
														<li aria-haspopup="true"><a href="table-data.html" class="slide-item">Data Tables</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
							
                         	</ul>
					</nav>
					
				</div>
			</div>
     	
	
       </>
    )
}