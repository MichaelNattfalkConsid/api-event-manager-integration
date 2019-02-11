function collectCssFromButton(t){return{bgColor:t.css("background-color"),textColor:t.css("color"),borderColor:t.css("border-color"),textShadow:t.css("text-shadow"),boxShadow:t.css("box-shadow"),width:t.css("width"),text:t.text()}}function redLoadingButton(t,e){t.fadeOut(500,function(){var n=[eventIntegrationAdmin.loading+"&nbsp;&nbsp;&nbsp;",eventIntegrationAdmin.loading+".&nbsp;&nbsp;",eventIntegrationAdmin.loading+"..&nbsp;",eventIntegrationAdmin.loading+"..."];t.css("background-color","rgb(51, 197, 255)"),t.css("border-color","rgb(0, 164, 230)"),t.css("color","white"),t.css("text-shadow","0 -1px 1px rgb(0, 164, 230),1px 0 1px rgb(0, 164, 230),0 1px 1px rgb(0, 164, 230),-1px 0 1px rgb(0, 164, 230)"),t.css("box-shadow","none"),t.css("width","85px"),t.html(n[0]),t.fadeIn(500);var o=1;EventManagerIntegration.timerId=setInterval(function(){o>3&&(o=0),t.html(n[o]),++o},500),void 0!=e&&e()})}function restoreButton(t,e){t.fadeOut(500,function(){t.css("background-color",e.bgColor),t.css("color",e.textColor),t.css("border-color",e.borderColor),t.css("text-shadow",e.textShadow),t.css("box-shadow",e.boxShadow),t.css("width",e.width),t.text(e.text),t.fadeIn(500),clearTimeout(EventManagerIntegration.timerId)})}EventManagerIntegration=EventManagerIntegration||{},EventManagerIntegration.Admin=EventManagerIntegration.Admin||{},EventManagerIntegration.Admin.AcceptDeny=function(t){function e(){t(function(){this.handleEvents()}.bind(this))}return e.prototype.changeAccepted=function(e,n){t.ajax({url:eventintegration.ajaxurl,type:"post",data:{action:"accept_or_deny",value:e,postId:n},beforeSend:function(o){var a=t("#post-"+n);1==e?(a.find(".deny").removeClass("hidden"),a.find(".accept").addClass("hidden")):0==e&&(a.find(".deny").addClass("hidden"),a.find(".accept").removeClass("hidden"))}})},e.prototype.handleEvents=function(){t(document).on("click",".accept",function(n){n.preventDefault();var o=t(n.target).attr("postid");e.prototype.changeAccepted(1,o)}.bind(this)),t(document).on("click",".deny",function(n){n.preventDefault();var o=t(n.target).attr("postid");e.prototype.changeAccepted(0,o)}.bind(this))},new e}(jQuery),EventManagerIntegration=EventManagerIntegration||{},EventManagerIntegration.Admin=EventManagerIntegration.Admin||{},EventManagerIntegration.Admin.DrawMap=function(t){function e(){t(function(){"object"==typeof google&&"object"==typeof google.maps&&"event_page_event-options"===pagenow&&(this.init(),this.handleEvents())}.bind(this))}var n,o,a=eventIntegrationAdmin.options.areaCoordinates;return e.prototype.init=function(){var t=new google.maps.Map(document.getElementById("draw-map-area"),{zoom:13,center:{lat:56.04673,lng:12.69437},disableDefaultUI:!0,zoomControl:!0}),e={strokeWeight:2,fillOpacity:.45,fillColor:"#1e90ff",strokeColor:"#0480FF"};if(a){e.paths=a,n=new google.maps.Polygon(e);for(var o=new google.maps.LatLngBounds,r=0;r<a.length;r++)o.extend(a[r]);t.fitBounds(o)}else n=new google.maps.drawing.DrawingManager({drawingMode:google.maps.drawing.OverlayType.POLYGON,drawingControl:!0,drawingControlOptions:{position:google.maps.ControlPosition.TOP_CENTER,drawingModes:["polygon"]},polygonOptions:e});n.setMap(t),n.addListener("overlaycomplete",function(t){this.polygonComplete(t)}.bind(this))},e.prototype.polygonComplete=function(e){o=e.overlay;var a=e.overlay.getPath(),r=[];if(a.length>8)return this.clearMap(),t("#clear-draw-map").after('<div class="notice error"><p>Exceeded maximum amount of 8 points. Please try again.</p></div>'),void t(".notice",drawDiv).delay(3e3).fadeOut();for(var i=0;i<a.length;i++){var s=a.getAt(i);r.push({lat:s.lat(),lng:s.lng()})}this.saveDrawOptions(r),e.type!=google.maps.drawing.OverlayType.MARKER&&(n.setDrawingMode(null),n.setOptions({drawingControl:!1}))},e.prototype.saveDrawOptions=function(e){t.ajax({url:eventintegration.ajaxurl,type:"post",dataType:"json",data:{action:"save_draw_points",coordinates:e},error:function(t){console.log(t)}})},e.prototype.clearMap=function(){a=null,this.init()},e.prototype.handleEvents=function(){document.getElementById("clear-draw-map").addEventListener("click",function(t){t.preventDefault(),this.clearMap()}.bind(this))},new e}(jQuery);var EventManagerIntegration=EventManagerIntegration||{};EventManagerIntegration.loading=!1,EventManagerIntegration.data={action:"import_events",value:""},EventManagerIntegration.timerId=null,jQuery(document).ready(function(t){t("#importevents").click(function(){if(!EventManagerIntegration.loadingOccasions){EventManagerIntegration.loadingOccasions=!0;var e=t(this),n=collectCssFromButton(e);redLoadingButton(e,function(){EventManagerIntegration.data.value=e.attr("id"),jQuery.post(ajaxurl,EventManagerIntegration.data,function(t){EventManagerIntegration.loadingOccasions=!1,restoreButton(e,n),location.reload()})})}})}),EventManagerIntegration=EventManagerIntegration||{},EventManagerIntegration.Admin=EventManagerIntegration.Admin||{},EventManagerIntegration.Admin.Oauth=function(t){function e(){t(function(){t(".oauth-access").addClass("hidden"),this.handleEvents()}.bind(this))}return e.prototype.requestOauth=function(e,n){t.ajax({url:eventintegration.ajaxurl,type:"post",dataType:"json",data:{action:"request_oauth",client:e,secret:n},success:function(e){e.success?(t(".error").addClass("hidden"),t(".updated").removeClass("hidden").empty().append("<p>"+e.data.message+"</p>"),t("#oauth-access").before("<p>"+e.data.url+"</p>"),t(".oauth-request").addClass("hidden"),t(".oauth-access").removeClass("hidden")):(t(".updated").addClass("hidden"),t(".error").removeClass("hidden").empty().append("<p>"+e.data+"</p>"))},error:function(t){console.log(t)}})},e.prototype.accessOauth=function(e){t.ajax({url:eventintegration.ajaxurl,type:"post",dataType:"json",data:{action:"access_oauth",verifier:e},success:function(e){e.success?(t(".error").addClass("hidden"),location.reload()):(t(".updated").addClass("hidden"),t(".error").removeClass("hidden").empty().append("<p>"+e.data+"</p>"))},error:function(t){console.log(t)}})},e.prototype.deleteOauth=function(){t.ajax({url:eventintegration.ajaxurl,type:"post",data:{action:"delete_oauth"},success:function(t){console.log(t),location.reload()},error:function(t){console.log(t)}})},e.prototype.handleEvents=function(){t("#oauth-request").submit(function(n){n.preventDefault();var o=t("#client-key").val(),a=t("#client-secret").val();e.prototype.requestOauth(o,a)}.bind(this)),t("#oauth-access").submit(function(n){n.preventDefault();var o=t("#verification-token").val();console.log(o),e.prototype.accessOauth(o)}.bind(this)),t("#oauth-authorized").submit(function(t){t.preventDefault(),e.prototype.deleteOauth()}.bind(this))},new e}(jQuery);