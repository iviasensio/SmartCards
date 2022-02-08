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
					qWidth : 30,
					qHeight : 333
				}]				
			},			
		},				
		definition: properties,
		support: {
			export: true,
			exportData: true,
			snapshot: true
		},
		paint: function ( $element, layout) {
			var app = qlik.currApp(this);
			var vddd = new Date();
			var vnnn = vddd.getTime();
			var vrrr = vnnn.toString();
			var vSufixId = vrrr.substr(vrrr.length - 5);
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
			
			var vGlobalMatrix = new Array();
			var vTagsMatrix = new Array();
			var myJsonDataRow = [];
			var vDimJsonRow = [];			
			var loopValues = new Array(vDimValues);
			var vDimArray = new Array(vDimValues);
			var vDimBGArray = new Array(vDimValues);
			var vDimVarArray = new Array(vDimValues);
			var vDimIconArray = new Array(vDimValues);
			var vDimIconColArray = new Array(vDimValues);
			
			var vBehavior = layout.behavior;
			var qVar;
			if(vBehavior == 'var'){
				qVar = layout.behaviorvariable;
			}
			
			// the measures properties values	
			layout.qHyperCube.qMeasureInfo.forEach(function (m,n) {
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
		         			"paddingleft":m.textpaddingleft + 'px',
		         			"paddingright":m.textpadding + 'px',
		         			"paddingtop":m.textpaddingtop + 'px',
		         			"position":m.textposition,
		         			"align":m.textalign,
		         			"font":m.textfont,
		         			"color":vTextColor,
		         			"bold":vBold,
		         			"italic":vItalic,
		         			"underlined":vUnderlined,
		         			"shadow":vShadow
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
		         			"height":m.sepdivheight + 'px',
		         			"left":m.sepdivleft + 'px',
		         			"top":m.sepdivtop + 'px',
		         			"bottom":m.sepdivbottom + 'px',
		         			"width": + m.sepdivwidth + '%',
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
							"paddingleft":m.textpaddingleft + 'px', 
							"paddingright":m.textpadding + 'px',
							"paddingtop":m.textpaddingtop + 'px',
							"position":m.textposition,
							"align":m.textalign,
							"icon":vIcon
						};						
					break;

					default:
					break;
         		}         		
				vTagsMatrix.push(myJsonDataRow);         		
         	})
			
			var vBackgroundColorBool = layout.backgroundcolorbool;
			var vBackgroundColor = layout.backsinglecolor.color;
			var vBackgroundColorType = layout.backgroundcolortype;
            if(!vBackgroundColorBool){
            	vBackgroundColor = 'transparent';
            }
           
			for (var nDim = 0;nDim < vDimValues;nDim++){
				if(vMeaValues > 1){
					loopValues[nDim] = new Array(vMeaValues);
					for (var nMea = 1;nMea < vMeaValues;nMea++){
						loopValues[nDim][nMea-1] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qText;
						vDimArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qText;
						if(vBackgroundColorBool && vBackgroundColorType){
							vDimBGArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0].qText;
						}else{
							vDimBGArray[nDim] = vBackgroundColor;						
						}
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps){
							if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[1]){
								vDimVarArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[1].qText;						
							}
						}
						
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps){							
							vDimIconColArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[0].qText;
							if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[1]){
								vDimIconArray[nDim] = 'lui-icon--' + layout.qHyperCube.qDataPages[0].qMatrix[nDim][nMea].qAttrExps.qValues[1].qText;
							}
						}
					}				
				}else{
					vDimArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qText;
					if(vBackgroundColorBool && vBackgroundColorType){
						vDimBGArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[0].qText;
					}else{
						vDimBGArray[nDim] = vBackgroundColor;
					}
					if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps){
						if(layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[1]){
							vDimVarArray[nDim] = layout.qHyperCube.qDataPages[0].qMatrix[nDim][0].qAttrExps.qValues[1].qText;
						}
					}										
				}
			}			
			//console.log(layout.qHyperCube)
			var vBorderBool = layout.borderbool;				
			var vBorder = layout.borderwidth + 'px solid ' + layout.bordercolor.color;			
									
            var vOpacity = layout.backgroundopacity;
            var vBackgroundImage = '';            
            var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
			var config = {
			    host: window.location.hostname,
			    prefix: prefix,
			    port: window.location.port,
			    isSecure: window.location.protocol === "https:"
			};
            var vServerURLBasic = ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix ;									
			var vServerURL = vServerURLBasic.replace('/single/','/');
			
            if(layout.backgroundimgbool){
            	var auximg = '';
            	switch (layout.backgroundimgsrc){
            		case 'url':
            			vBackgroundImage = layout.backgroundimageurl.replace(/\s/g, "%20");
            			if(vBackgroundImage.slice(-1) != '/'){vBackgroundImage += '/';}
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
            var vExtension = layout.backgroundimageext;
            
            //on hover behavior variables
            var vHoverImgBool = layout.hoverimgbool;
			var vHoverOpacity = layout.hoveropacity;

            var vDisplay;
     		var vScrollClass = '';
     		var vMinWidth = layout.gridminwidth + 'px';
     		var vMaxWidth = layout.gridmaxwidth + 'px';
     		var vOverflow = '';
     		var vScrollStyle = 'SmartCards-scroll-' + layout.gridscrollcolor;
     		var vGridRows = layout.gridrows;
     		var vMinHeight = layout.gridminheight;
     		var vMaxHeight = layout.gridmaxheight;
     		switch (layout.gridscroll){
     			case 'landscape':
     				vDisplay = 'flex';
     				if(vMinWidth == '0px'){
     					vMinWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
     				}
     				if(vMaxWidth == '0px'){
     					vMaxWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
     				}
     				vScrollClass = 'SmartCards-scroll-landscape';
     				vOverflow = 'overflow-x: hidden;';
     				vGridRows = 1;
     				vMinHeight = 0;
     				vMaxHeight = 10000;
     			break;
     			case 'portrait':
     				vDisplay = 'block';
     				vScrollClass = 'SmartCards-scroll-portrait';
     			break;
     			case 'unlock':
     				vDisplay = 'block';
     				vScrollClass = 'SmartCards-scroll-unlock';
     			break;
     		}
     		
            var html = '<div qv-extension id="SmartCards-extension" class = "SmartCards-extension ' + vScrollClass + ' SmartCards-scroll SmartCards-scroll-style ' + vScrollStyle + '" style = "display:' + vDisplay + ';' + vOverflow + '">';
            
            var vBoxWidth = 'calc(' + ((100 / layout.gridcolumns) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
            var vBoxHeight = 'calc(' + ((100 / vGridRows) - 0) + '% - '+ (layout.gridpadding*2) + 'px)';
            vMinHeight = vBoxHeight;
            vMaxHeight = vBoxHeight;
            vMinWidth = vBoxWidth;
            vMaxWidth = vBoxWidth;
            
			for (var nDim = 0;nDim < vDimValues;nDim++){
				if(vBackgroundImage != ''){         
					var vImgName = vDimArray[nDim].replace(/\s/g, "%20");
	            	cssBackImg = 'background-image: url(' + vBackgroundImage + vImgName + '.' + vExtension +');background-size: ' + vBackgroundImgSize + ';background-position: ' + layout.backgroundimagealign + ';background-repeat: no-repeat;';
	            }
	            
	            var vName = vDimArray[nDim];
	            if(vBehavior == 'var'){
	            	vName = vDimVarArray[nDim];	            	
	            }
				html += '<div class = "SmartCards-container-box" style="width:' + vBoxWidth + ';height:' + vBoxHeight + ';max-width:' + vMaxWidth +';min-width:' + vMinWidth +';max-height:'+ vMaxHeight +'px;min-height:'+ vMinHeight +'px;padding:'+layout.gridpadding+'px" name = "' + vName + '">';
				html += '<div id = "SmartCards-box-' + vSufixId + nDim +'" class="SmartCards-box" style = "border:' + vBorder + ';background:' + vDimBGArray[nDim] +';' + ';transform:rotate(' + layout.rotation + 'deg);">';
											
				html += '<div id = "SmartCards-img-bg-' + vDimArray[nDim] + '" class="SmartCards-img-bg" style = "' + cssBackImg + 'opacity:' + vOpacity + ';z-index:' + vHoverImgBool + '" title = "' + vDimArray[nDim] + '"></div>';
				
	            html += '<div id = "SmartCards-span-container-' + vDimArray[nDim] + '" class ="SmartCards-span-container">';
				
	            for(var me = 0;me < vTagsMatrix.length;me++){
	            	switch(vTagsMatrix[me].type){
	            		case 'text':
	            			html += fillText(vTagsMatrix[me],nDim);
	            		break;
	            		case 'separator':
	            			html += fillSeparator(vTagsMatrix[me]);
	            		break;
	            		case 'icon':
	            			html += fillIcon(vTagsMatrix[me],nDim);
	            		break;
	            		default:
	            		break;
	            	}
				}
				
				html += '</div></div></div>';
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
				htmlText += '<span class ="SmartCards-span lui-icon ' + vIcon + ' lui-button__icon ' + vTagsIcon.size + ' ' + vTagsIcon.cursor + ' SmartCards-span-' + vTagsIcon.align + '" style = "text-align:' + vTagsIcon.align + ';padding-left:' + vTagsIcon.paddingleft + ';padding-right:' + vTagsIcon.paddingright + ';padding-top:' + vTagsIcon.paddingtop + ';color:' + vIconColor + ';" title = "' + vTagsIcon.title + '"></span>';
				
				return htmlText;
			}
					
			$element.html(html);			
			
			//set field/variable value
			$('.SmartCards-container-box').on('click', function(event){				
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){
					if(vBehavior == 'dim'){
						var qVal = this.getAttribute('name');
						app.field(vCurrentDimension).selectValues([{qText:qVal}]);
					}else{
						if(vBehavior == 'var'){
							var qVal = this.getAttribute('name');
							app.variable.setStringValue(qVar, qVal);
						}
					}
				}
			})
			
			
			//on hover				
			$('.SmartCards-img-bg').on('mouseenter', function(event){
				if(vHoverImgBool == 1){
					$(this).css('opacity', vHoverOpacity);
				}
			})
			$('.SmartCards-img-bg').on('mouseleave', function(event){
				if(vHoverImgBool == 1){		
					$(this).css('opacity', vOpacity);						
				}
			})		
		}
	}
});