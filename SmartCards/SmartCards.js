var vMaxCols = 30;
var vMaxRows = 333;
var applyPatchesOK = false;

define( [
	"qlik",
	"css!./css/style.css",
	"./Properties"
],
function (qlik,style,properties) {
	'use strict';	
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : vMaxCols,
					qHeight : vMaxRows
				}]				
			},			
		},				
		definition: properties,
		support: {
			export: true,
			exportData: true,
			snapshot: true
		},
		prePaint: function(d) {
			/*var DimSort = 'OTHER_SORT_DESCENDING';
            if(this.backendApi.model.layout.qHyperCube.qMeasureInfo[0].qMax <= 0) {
            	DimSort = 'OTHER_SORT_ASCENDING';
            }
            if(!applyPatchesOK){
            	this.backendApi.applyPatches([
					{
						"qPath": "/qHyperCubeDef/qDimensions/0/qOtherTotalSpec/qOtherMode",
						"qOp": "replace",
						"qValue": '"OTHER_COUNTED"'
					},
					{
						"qPath": "/qHyperCubeDef/qDimensions/0/qOtherTotalSpec/qOtherCounted/qv",
                		"qOp": "replace",
                		"qValue": '"' + vMaxRows + '"'
                	},
                	{
						"qPath": "/qHyperCubeDef/qDimensions/0/qOtherTotalSpec/qOtherSortMode",
                		"qOp": "replace",
                		"qValue": '"' + DimSort + '"'
                	}
				], true);
				applyPatchesOK = true;
			}*/			
        },
        
		paint: function ( $element, layout) {
			var app = qlik.currApp(this);
			var vddd = new Date();
			var vnnn = vddd.getTime();
			var vrrr = vnnn.toString();
			var vSufixId = vrrr.substr(vrrr.length - 5);
			var self = this;
			// I can get the app id, useful for server, but check that it needs it
			// if I'm on desktop then look for the id in the thumbnail, if I can't find it change to a blank image
			// enrich the url of the image only for desktops that have a thumbnail
			
			var currentLocation = String(window.location);		
			var vCloudBool = false;
			var vDesktopBool = false;
			var vServerBool = true;
			if(currentLocation.indexOf('qlikcloud.com') > 0){
				vCloudBool = true;
				vServerBool = false;
			}
			if(currentLocation.indexOf('localhost:4848') > 0){
				vDesktopBool = true;
				vServerBool = false;
			}

			var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
			var config = {
			    host: window.location.hostname,
			    prefix: prefix,
			    port: window.location.port,
			    isSecure: window.location.protocol === "https:"
			};
            var vServerURLBasic = ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix ;									
			var vServerURL = vServerURLBasic.replace('/single/','/');
			//If I am in the cloud and without image url I have to use:
			//https://tenantid.eu.qlikcloud.com/api/v1/apps/appid/media/files/image.png

			//If I am on Desktop and without image url I have to use the id, only informed in the thumbnail:
			var appId = false;
			if(vCloudBool || vServerBool){
				appId = app.id;
			}else{
				if(app.model.layout.qThumbnail.qUrl){
					appId = app.model.layout.qThumbnail.qUrl;
					appId = appId.replace('/media/','');
					appId = appId.substring(0,appId.indexOf('/'));				
				}
			}
			
			var vDimValues = layout.qHyperCube.qSize.qcy;
			var vMeaValues = layout.qHyperCube.qSize.qcx;
			
			var vCurrentDimension = layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0];
			vCurrentDimension = vCurrentDimension.replace('=','');
			var vGlobalMatrix = new Array();
			var vTagsMatrix = new Array();
			var myJsonDataRow = [];
			var vDimJsonRow = [];			
			var loopValues = new Array(vDimValues);
			var vDimArray = new Array(vDimValues);
			var vDimArrayId = new Array(vDimValues);
			var vDimBGArray = new Array(vDimValues);
			var vDimImgArray = new Array(vDimValues);
			var vDimIconArray = new Array(vDimValues);
			var vDimIconColArray = new Array(vDimValues);
			
			var vBehavior = layout.behavior;
			var qVar;
			if(vBehavior == 'var'){
				qVar = layout.behaviorvariable;
			}
			
			// the measures properties values				
			layout.qHyperCube.qMeasureInfo.forEach(function (m,n) {				
				var vPaddingType = m.paddingtype;
				if(vPaddingType == true){
					vPaddingType = '%';
				}else{
					vPaddingType = 'px';
				}
				//Text
         		switch (m.tagtype){
         			case 'text':
         				var vTextColor;
         				var vText = layout.qHyperCube.qGrandTotalRow[n].qText;
         				var vBold = 'normal';
     					if(m.textstylebold){
     						vBold =  'bold';
     					}
         				
         				var vItalic = 'normal';
         				if(m.textstyleitalic){
     						vItalic = 'italic';
     					}

         				var vUnderlined = 'none;'
						if(m.textstyleunderline){
     						vUnderlined = 'underline';
     					}
     		
         				var vShadow = '';
         				
     					if(m.textstyleshadow){
         					vShadow = 'SmartCards-shadow-' + m.textstyleshadowtype;
         				}
         				vTextColor = m.textsinglecolor.color;		         		
		         		
		         		myJsonDataRow = {
		         			"type":m.tagtype,
		         			"text":vText,
		         			"size":m.textsize,
		         			"paddingleft":m.textpaddingleft + vPaddingType,
		         			"paddingright":m.textpadding + vPaddingType,
		         			"paddingtop":m.textpaddingtop + vPaddingType,
		         			"position":m.textposition,
		         			"align":m.textalign,
		         			"font":m.textfont,
		         			"color":vTextColor,
		         			"bold":vBold,
		         			"italic":vItalic,
		         			"underlined":vUnderlined,
		         			"shadow":vShadow,
		         			"footer":m.textfooterbool
		         		};
		    		break;

					case 'separator':						
						var vSepColor;
						if(m.sepdivcolorbool){
		         			vSepColor = m.sepdivcustomcolor;
		         		}else{
		         			vSepColor = m.sepdivsinglecolor.color;
		         		}		         		
		         		myJsonDataRow = {
		         			"type":m.tagtype,		         			
		         			"height":m.sepdivheight + vPaddingType,
		         			"left":m.sepdivleft + vPaddingType,
		         			"top":m.sepdivtop + vPaddingType,
		         			"bottom":m.sepdivbottom + vPaddingType,
		         			"width": + m.sepdivwidth + vPaddingType,
		         			"color":vSepColor
		         		};												
					break;

					case 'icon':
						
						var vIcon = m.icon;						
						if(m.icontype){
							vIcon = 'custom';
						}
						
						myJsonDataRow = {
							"type":m.tagtype,
							"size":m.textsize,
							"paddingleft":m.textpaddingleft + vPaddingType, 
							"paddingright":m.textpadding + vPaddingType,
							"paddingtop":m.textpaddingtop + vPaddingType,
							"position":m.textposition,
							"align":m.textalign,
							"icon":vIcon
						};						
					break;
					case 'image':						
						var vMarginLeft = 'auto';
						var vMarginRight = 'auto';
						switch (m.textalign){
							case 'left':
								vMarginLeft = '0px';
								vMarginRight = 'auto';
							break;
							case 'right':
								vMarginLeft = 'auto';
								vMarginRight = '0px';
							break;
							case 'center':
								vMarginLeft = 'auto';
								vMarginRight = 'auto';
							break;
						}
						myJsonDataRow = {
							"type":m.tagtype,
							"paddingleft":m.textpaddingleft + vPaddingType, 
							"paddingright":m.textpadding + vPaddingType,
							"paddingtop":m.textpaddingtop + vPaddingType,
							"position":m.textposition,
							"align":m.textalign,
							"alignl":vMarginLeft,
							"alignr":vMarginRight,
							"width":m.imgspanwidth,
							"height":m.imgspanheight
						};						
					break;
					default:
					break;
         		}         		
				vTagsMatrix.push(myJsonDataRow);         		
         	})
			var vBackgroundColorBool = layout.backgroundcolorbool;
			var vBackgroundColor = layout.backsinglecolor.color;
			if(!vBackgroundColorBool){
            	vBackgroundColor = 'transparent';
            }

            //Top bar code
            var vTopBar = '';
            var vBackgroundEffects = '';
            
            if(layout.backgroundtopbarbool){
            	if(layout.backgroundtopbareffectsbool){
            		vBackgroundEffects = 'background-image: url(' + vServerURL +'/Extensions/SmartCards/img/Effects/' + layout.backgroundtopbareffects + '.svg);';
            	}
            	vTopBar = '<div class="SmartCards-top-bar" style = "width:100%;height:' + layout.backtopbarheight + '%;background:' + layout.backtopbarcolor.color + ';border-radius:' + layout.borderradius + 'px ' + layout.borderradius + 'px 0px 0px;z-index:0;' + vBackgroundEffects + 'background-size:cover"></div>';
            }
			
			for (var nDim = 0;nDim < vDimValues;nDim++){
				if(vMeaValues > 1){
					loopValues[nDim] = new Array(vMeaValues);
					for (var nMea = 1;nMea < vMeaValues;nMea++){
						loopValues[nDim][nMea-1] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qText;
						vDimArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qText;
						vDimArrayId[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qElemNumber;
						vDimBGArray[nDim] = vBackgroundColor;						
						
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps){
							if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0]){
								vDimImgArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0].qText;						
							}
						}
						
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps){							
							vDimIconColArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[0].qText;
							if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[1]){
								vDimIconArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[1].qText;
							}
						}
					}				
				}else{
					vDimArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qText;
					vDimArrayId[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qElemNumber;
					vDimBGArray[nDim] = vBackgroundColor;
					
					if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps){
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0]){
							vDimImgArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0].qText;							
						}
					}										
				}
			}	
			
			var vBorderBool = layout.borderbool;				
			var vBorder = layout.borderwidth + 'px solid ' + layout.bordercolor.color;
			var vBorderShadow = '';
			if(layout.shadowbool){				
				vBorderShadow = 'box-shadow: 5px ' + layout.shadowwidth + 'px 6px ' + layout.shadowcolor.color + ';';				
			}
			var vBorderImg = '';
			if(layout.borderimagebool && layout.borderbool){
				var auxborderimg = '';
            	switch (layout.borderimgsrc){
            		case 'url':
            			vBorderImg = layout.borderimageurl.split(' ').join('%20');
            		break;

            		case 'ext':
            			vBorderImg = vServerURL + '/extensions/SmartCards/img/' + layout.borderimagesub.split(' ').join('%20') + '/';
            		break;

            		case 'lib':
						//if saas = use app as repository
						if(vCloudBool){
							auxborderimg = '/api/v1/apps/' + appId + '/media/files/';
	            		}
	            		//if desktop = use default local
	            		if(vDesktopBool){	            			
	            			auxborderimg = '/content/default/';	            			
	            		}
	            		//if server = server default content library
	            		if(vServerBool){	            			
	            			auxborderimg = '/content/Default/';
	            		}
						vBorderImg = vServerURL + auxborderimg;						
            		break;

            		case 'app':            			
            			if(vCloudBool){
	            			auxborderimg = '/api/v1/apps/' + appId + '/media/files/';
	            		}
	            		if(vDesktopBool){
	            			auxborderimg = '/media/' + appId + '/';
	            		}
	            		if(vServerBool){
	            			auxborderimg = '/appcontent/' + appId + '/';
	            		}
						vBorderImg = vServerURL + auxborderimg;
            		break;
            	}
	        
				vBorderImg = 'border-image:url(' + vBorderImg + ') 93 92 87 92 stretch';
			}
									
            var vOpacity = layout.backgroundopacity;
            var vBorderRadius = layout.borderradius + 'px ';	
            
            var vBackgroundImage = '';
            var vSideBool = layout.backgroundimgsidebool;
            var vSidePerc = layout.bgimgsidewidth + '%';
            var vImgName = '';
			var currWidth = window.innerWidth;
            if(layout.backgroundimgbool){
            	var auximg = '';
            	switch (layout.backgroundimgsrc){
            		case 'url':
            			vBackgroundImage = 'url';
            		break;

            		case 'ext':
            			vBackgroundImage = vServerURL + '/extensions/SmartCards/img/' + layout.backgroundimagesub.split(' ').join('%20') + '/';
            		break;

            		case 'lib':
						//if saas = use app as repository
						if(vCloudBool){
							auximg = '/api/v1/apps/' + appId + '/media/files/';
	            		}
	            		//if desktop = use default local
	            		if(vDesktopBool){	            			
	            			auximg = '/content/default/';	            			
	            		}
	            		//if server = server default content library
	            		if(vServerBool){	            			
	            			auximg = '/content/Default/';
	            		}
						vBackgroundImage = vServerURL + auximg;						
            		break;

            		case 'app':            			
            			if(vCloudBool){
	            			auximg = '/api/v1/apps/' + appId + '/media/files/';
	            		}
	            		if(vDesktopBool){
	            			auximg = '/media/' + appId + '/';
	            		}
	            		if(vServerBool){
	            			auximg = '/appcontent/' + appId + '/';
	            		}
						vBackgroundImage = vServerURL + auximg;
            		break;
            	}
	        }
	        
            if(!vBorderBool){
            	vBorder = 'none';            	
            }
            var cssBackImg = '';
            var vBackgroundImgSize = layout.backgroundimagesize;
            var vExtension = '.' + layout.backgroundimageext;
            if(vExtension == '.'){
            	vExtension = '';
            }
            
            //on hover behavior variables
            var vHoverImgBool = layout.hoverimgbool;
			var vHoverOpacity = layout.hoveropacity;
			var vHoverConBool = layout.hoverconbool;
			var vHoverContainerOpacity = 0;
			var vContainerOpacity = 1;
			if(vHoverConBool == 1){
				vHoverContainerOpacity = layout.hovercontainerbool;
				if(vHoverContainerOpacity == 1){
					vContainerOpacity = 0;
				}
			}

			//on footer variables
			var vFooterBool   = layout.footerbool;
			var vBodyHeight   = '100%';
			var vFooterHeight = (layout.footerheight * 100) + '%';
			if(vFooterBool){
				vBodyHeight = ((1 - layout.footerheight) * 100) + '%';
			}

            var vDisplay;
     		var vScrollClass = '';
     		var vGridRows = layout.gridrows;
     		if(layout.gridscroll == 'landscape'){
     			vGridRows = 1;
     		}
     		
     		var vBoolScroll = true;
     		if((layout.gridscroll == 'portrait' && vDimValues <= layout.gridcolumns * vGridRows) || (layout.gridscroll != 'portrait' && vDimValues <= layout.gridcolumns)){
     			vBoolScroll = false;
     		}
     		
     		var vMinWidth,vMaxWidth,vMinHeight,vMaxHeight;
     		var vBoxWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
            var vBoxHeight = 'calc(' + ((100 / vGridRows) - 0) + '% - '+ (layout.gridpadding + layout.borderwidth + layout.shadowwidth + layout.gridmargin + 3) + 'px)';
            var vTopMargin = layout.gridmargin + 'px';
            if(layout.gridmargin == 'undefined'){
            	vTopMargin = '0px';
            }
            vMinHeight = vBoxHeight;
            vMaxHeight = vBoxHeight;
     		var vOverflow = '';
     		var vScrollStyle = '';
     		var vScrollThumb = 'SmartCards-scroll-' + layout.gridscrollcolor;
     		var vScrollTrack = 'SmartCards-scroll-track-' + layout.gridscrollbackgroundcolor;

     		if(currWidth < 641){     			
     			vMinWidth = 'calc(' + ((100 / 4) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';     				
     			vMaxWidth = 'calc(' + ((100 / 4) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
     			
     		}else{
     			vMinWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';     				
     			vMaxWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
     		}
     		
     		if(vBoolScroll != true){
     			vScrollStyle = 'SmartCards-scroll-hidden';
     		}else{
	     		switch (layout.gridscroll){
	     			case 'landscape':
	     				vDisplay = 'flex';
	     				
	     				
	     				vScrollClass = 'SmartCards-scroll-landscape';
	     				vOverflow = 'overflow-x: hidden;';
	     				vGridRows = 1;
	     				vMinHeight = 0;
	     				vMaxHeight = 10000;
	     			break;
	     			case 'portrait':
	     				vDisplay = 'block';
	     				vScrollClass = 'SmartCards-scroll-portrait';
	     				/*vMinWidth = vBoxWidth;
	            		vMaxWidth = vBoxWidth;*/
	     			break;
	     			case 'unlock':
	     				vDisplay = 'block';
	     				vScrollClass = 'SmartCards-scroll-unlock';
	     				/*vMinWidth = vBoxWidth;
	            		vMaxWidth = vBoxWidth;*/
	     			break;
	     		}
	     	}
     		
            var html = '<div qv-extension id="SmartCards-extension" class = "SmartCards-extension ' + vScrollClass + ' SmartCards-scroll SmartCards-scroll-style-' + layout.gridscrollwidth + ' ' + vScrollStyle + ' ' + vScrollThumb + ' ' + vScrollTrack + '" style = "display:' + vDisplay + ';' + vOverflow + '">';
            var htmlf = '';
			
            var cssBackImg2 = '';
            var vBorderRadius2 = '';
            var vBackgroundImgSize2 = 'cover';

            if(vBackgroundImgSize == 'static'){
				cssBackImg2 += 'width:' + layout.bgimgsize + 'vw;height:' + layout.bgimgheight + 'vw;left:' + layout.bgimgleft + '%;top:' + layout.bgimgtop + '%;border-radius:' + layout.bgimgradius + '%;';						
			} else{
				cssBackImg2 += 'width: 100%;height: 100%;';
				vBorderRadius2 = vBorderRadius;
				vBackgroundImgSize2 = layout.backgroundimagesize;
			}
            for (var nDim = 0;nDim < vDimValues;nDim++){
				if(vBackgroundImage != ''){      
				    if(layout.backgroundimgsrc == 'url'){
						vImgName = vDimImgArray[nDim].replace(/\s/g, "%20");
					}else{
						vImgName = vBackgroundImage + vDimArray[nDim].replace(/\s/g, "%20") + vExtension;
					}
					cssBackImg = 'background-image: url(' + vImgName + ');background-size: ' + vBackgroundImgSize2 + ';background-position: ' + layout.backgroundimagealign + ';background-repeat: no-repeat;' + cssBackImg2;
	            }
	            var vName = vDimArrayId[nDim];//vDimArray[nDim];
	            /*if(vBehavior == 'var'){
	            	vName = vDimImgArray[nDim];
	            }*/
				html += '<div class = "SmartCards-container-box" style="width:' + vBoxWidth + ';height:' + vBoxHeight + ';max-width:' + vMaxWidth +';min-width:' + vMinWidth +';max-height:'+ vMaxHeight +';min-height:'+ vMinHeight +';padding:'+layout.gridpadding+'px;margin-top:' + vTopMargin + '" title = "' + vDimArray[nDim] + '" name = "' + vName + '">';
				html += '<div id = "SmartCards-box-' + vSufixId + nDim +'" class="SmartCards-box" style = "border:' + vBorder + ';' + vBorderShadow + ';' + vBorderImg + ';border-radius: ' + vBorderRadius + ';background:' + vDimBGArray[nDim] +';' + ';transform:rotate(' + layout.rotation + 'deg);height: ' + vBodyHeight + ';">';
											
				html += vTopBar;
				if(vSideBool){
					html += '<div id = "SmartCards-img-bg-' + vDimArrayId[nDim] + '" class="SmartCards-img-bg" style = "position:relative;' + cssBackImg + 'opacity:' + vOpacity + ';width:' + vSidePerc + ';border-radius: ' + vBorderRadius2 + ';z-index:' + vHoverImgBool + ';" title = "' + vDimArray[nDim] + '" name = "' + vDimArrayId[nDim] + '"></div>';
				}else{
					html += '<div id = "SmartCards-img-bg-' + vDimArrayId[nDim] + '" class="SmartCards-img-bg" style = "position:absolute;' + cssBackImg + 'opacity:' + vOpacity + ';border-radius: ' + vBorderRadius2 + ';z-index:' + vHoverImgBool + ';" title = "' + vDimArray[nDim] + '" name = "' + vDimArrayId[nDim] + '"></div>';
				}
				
	            html += '<div id = "SmartCards-span-container-' + vDimArrayId[nDim] + '" class ="SmartCards-span-container" style = "opacity: ' + vContainerOpacity + '">';

				htmlf = '';				
	            for(var me = 0;me < vTagsMatrix.length;me++){
	            	switch(vTagsMatrix[me].type){
	            		case 'text':
	            			if(!vTagsMatrix[me].footer){
								html += fillText(vTagsMatrix[me],nDim);	
							}else{
								htmlf += fillText(vTagsMatrix[me],nDim);	
							}
	            		break;
	            		
	            		case 'separator':
	            			html += fillSeparator(vTagsMatrix[me]);
	            		break;
	            		
	            		case 'icon':
	            			html += fillIcon(vTagsMatrix[me],nDim);
	            		break;
	            		case 'image':
	            			html += fillImg(vTagsMatrix[me],nDim);
	            		break;
	            		default:
	            		break;
	            	}
				}
				
				html += '</div></div>';
				if(vFooterBool){
					html += '<div class = "SmartCards-footer-container"  style = "height:' + vFooterHeight + '">';
					html += htmlf;
					html += '</div>';
				}
				html += '</div>';
			}
			html += '</div>';	
			
			function fillText(vTagsText,nDim){
				var htmlText = '';
				if(vTagsText.position == 'below'){
            		htmlText += '<br>';
            	}				
				htmlText += '<span class ="SmartCards-span ' + vTagsText.size + ' ' + vTagsText.cursor + ' ' + vTagsText.shadow + ' SmartCards-span-' + vTagsText.align + '" style = "font-family:' + vTagsText.font + ';text-align:' + vTagsText.align + ';padding-left:' + vTagsText.paddingleft + ';padding-right:' + vTagsText.paddingright + ';padding-top:' + vTagsText.paddingtop + ';color:' + vTagsText.color + ';font-weight:' + vTagsText.bold + ';font-style:' + vTagsText.italic + ';text-decoration:' + vTagsText.underlined + '" title = "' + vTagsText.title + '">';
				if(vDimValues == 1){
					htmlText += vTagsText.text;					
				}else{
					htmlText += loopValues[nDim][me];					
				}
				htmlText += '</span>';
				return htmlText;
			}

			function fillSeparator(vTagsSep){
				var htmlSep = '';
				
            	htmlSep += '<p class = "SmartCards-division" style = "background:' + vTagsSep.color + ';height:' + vTagsSep.height + ';width:' + vTagsSep.width + ';margin-left:' + vTagsSep.left + ';margin-top:' + vTagsSep.top +';margin-bottom:' + vTagsSep.bottom +'"></p>';            		
            	
            	return htmlSep;
			}

			function fillIcon(vTagsIcon,nDim){
				var htmlText = '';
				if(vTagsIcon.position == 'below'){
            		htmlText += '<br>';
            	}	
            	var vIcon = vTagsIcon.icon;
            	var vIconColor = vDimIconColArray[nDim];
            	
            	if(vIcon == 'custom'){
            		vIcon = vDimIconArray[nDim];
            	}
            	
				htmlText += '<span class ="SmartCards-span lui-icon lui-icon--' + vIcon + ' lui-button__icon ' + vTagsIcon.size + ' ' + vTagsIcon.cursor + ' SmartCards-span-' + vTagsIcon.align + '" style = "text-align:' + vTagsIcon.align + ';padding-left:' + vTagsIcon.paddingleft + ';padding-right:' + vTagsIcon.paddingright + ';padding-top:' + vTagsIcon.paddingtop + ';color:' + vIconColor + ';" title = "' + vTagsIcon.title + '"></span>';
				
				return htmlText;
			}
			function fillImg(vTagsImg,nDim){
				var htmlText = '';
				if(vTagsImg.position == 'below'){
            		htmlText += '<br>';
            	}	
            	//var vImg = vTagsImg.img;
            	
				htmlText += '<span class ="SmartCards-span ' + vTagsImg.size + ' SmartCards-span-' + vTagsImg.align + '" style = "background-image: url(' + loopValues[nDim][me] + '); display:block;padding-left:' + vTagsImg.paddingleft + ';padding-right:' + vTagsImg.paddingright + ';padding-top:' + vTagsImg.paddingtop + ';background-repeat:no-repeat;width:' + vTagsImg.width +'%;height:' + vTagsImg.height +'%;background-size: cover;margin-left: ' + vTagsImg.alignl + ';margin-right: ' + vTagsImg.alignr + ';" title = "' + vTagsImg.title + '"></span>';
				
				return htmlText;
			}

			$element.html(html);			
			
			//set field/variable value
			$('.SmartCards-container-box').on('click', function(event){				
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){
					if(vBehavior == 'dim'){
						var qVal = parseInt(this.getAttribute('name'));//;this.getAttribute('name');
						//The original option based on description
						//app.field(vCurrentDimension).toggleSelect(qVal, true);
						
						self.backendApi.selectValues(0,[qVal],false);
						$(this).toggleClass("selected");						
					}else{
						if(vBehavior == 'var'){
							var qVal = this.getAttribute('title');
							app.variable.setStringValue(qVar, qVal);
						}
					}
				}
			})
			
			
			//on hover				
			$('.SmartCards-span-container').on('mouseenter', function(event){
				if(vHoverConBool == 1){
					$(this).css('opacity', vHoverContainerOpacity);					
				}
			})
			$('.SmartCards-span-container').on('mouseleave', function(event){
				if(vHoverConBool == 1){
					$(this).css('opacity', vContainerOpacity);						
				}
			})	
			$('.SmartCards-img-bg').on('mouseenter', function(event){
				if(vHoverImgBool == 1){
					$(this).css('opacity', vHoverOpacity);
					if(vHoverConBool == 1){
						var vThisTitle = parseInt(this.getAttribute('name'));
						$('#SmartCards-span-container-' + vThisTitle).css('opacity', vHoverContainerOpacity);	
					}
				}
			})
			$('.SmartCards-img-bg').on('mouseleave', function(event){
				if(vHoverImgBool == 1){		
					$(this).css('opacity', vOpacity);	
					if(vHoverConBool == 1){
						var vThisTitle = parseInt(this.getAttribute('name'));
						$('#SmartCards-span-container-' + vThisTitle).css('opacity', vContainerOpacity);					
					}
				}
			})
		}
	}
});