define(['qlik','./js/util'], function (qlik, utils) {
    var vFontFamily = [{
                        value: "Heebo, sans-serif",
                        label: "Heebo"
                    },{
                        value: "QlikView Sans, sans-serif",
                        label: "QlikView Sans"
                    },{
                        value: "Arial",
                        label: "Arial"
                    }, {
                        value: "Calibri",
                        label: "Calibri"
                    }, {
                        value: "Comic Sans MS",
                        label: "Comic Sans MS"
                    }, {
                        value: "erasdust",
                        label: "Eraser"
                    }, {
                        value: "Lucida Handwriting",
                        label: "Lucida Handwriting"
                    }, {
                        value: "OpenSans",
                        label: "OpenSans"
                    }, {
                        value: "Oswald",
                        label: "Oswald"
                    },{
                        value: "sans-serif",
                        label: "MS Sans Serif"
                    }, {
                        value: "Tahoma",
                        label: "Tahoma"
                    }, {
                        value: "Verdana",
                        label: "Verdana"
                    }, {
                        value: "Brush Script MT",
                        label: "Brush Script MT"
                    }, {
                        value: "Playfair Display, serif",
                        label: "Playfair Display"
                    }, {
                        value: "unset",
                        label: "Unset"
                    }];
    var vActBool = [{
                        value: "none",
                        label: "none"
                    }, {
                        value: "selfieldvalues",
                        label: "Select values in a field"
                    }, {
                        value: "selvarvalues",
                        label: "Set variable value"
                    }];
    var vNavBool = [{
                        value: "none",
                        label: "none"
                    }, {
                        value: "sheet",
                        label: "to a sheet"
                    }, {
                        value: "url",
                        label: "to a url"
                    }];                    
    var vTagType = [{
                        value: "text",
                        label: "Text"
                    }, {
                        value: "separator",
                        label: "Separator"
                    }, {
                        value: "icon",
                        label: "Icon"
                    }];
    var vImgSize = [{
                        value: "auto",
                        label: "Original Size"
                    }, {
                        value: "contain",
                        label: "Always fit"
                    }, {
                        value: "100%",
                        label: "Fit to width"
                    }, {
                        /*value: "auto 100%",*/
                        value: "cover",
                        label: "Fit to height"
                    }, {
                        value: "100% 100%",
                        label: "Stretch to fit"
                    }];
    var vSideVertical = [{
                        value: "top:0",
                        label: "Top"
                    }, {
                        value: "top:0;bottom:0",
                        label: "Center"
                    }, {
                        value: "bottom:0",
                        label: "Bottom"
                    }];
    var vFontSizes = [{
                        value: "SmartCards-span-xxs",
                        label: "XXS"
                    }, {
                        value: "SmartCards-span-xs",
                        label: "XS"
                    }, {
                        value: "SmartCards-span-s",
                        label: "S"
                    },{
                        value: "SmartCards-span-m",
                        label: "M"
                    }, {
                        value: "SmartCards-span-ml",
                        label: "ML"
                    }, {
                        value: "SmartCards-span-l",
                        label: "L"
                    },{
                        value: "SmartCards-span-xl",
                        label: "XL"
                    }, {
                        value: "SmartCards-span-xxl",
                        label: "XXL"
                    }, {
                        value: "SmartCards-span-xxxl",
                        label: "XXXL"
                    }, {
                        value: "SmartCards-span-xxxxl",
                        label: "XXXXL"
                    }];
    var vScrollCol = [{
                        value: "red",
                        label: "Red"
                    }, {
                        value: "grey",
                        label: "Grey"
                    }, {
                        value: "black",
                        label: "Black"
                    }, {
                        value: "blue",
                        label: "Blue"
                    },{
                        value: "green",
                        label: "Green"
                    },{
                        value: "brown",
                        label: "Brown"
                    },{
                        value: "orange",
                        label: "Orange"
                    }];                
                                
    var vIcons = [{
                        value: "lui-icon--tick",
                        component: "icon-item",
                        icon: "tick",
                        size: "small"
                    }, {
                        value: "lui-icon--warning_triangle",
                        component: "icon-item",
                        icon: "warning_triangle",
                        size: "small"
                    }, {
                        value: "lui-icon--triangle_top",
                        component: "icon-item",
                        icon: "triangle_top",
                        size: "small"
                    }, {
                        value: "lui-icon--triangle_bottom",
                        component: "icon-item",
                        icon: "triangle_bottom",
                        size: "small"
                    },{
                        value: "lui-icon--star",
                        component: "icon-item",
                        icon: "star",
                        size: "small"
                    },{
                        value: "lui-icon--dot",
                        component: "icon-item",
                        icon: "dot",
                        size: "small"
                    },{
                        value: "lui-icon--info",
                        component: "icon-item",
                        icon: "info",
                        size: "small"
                    },{
                        value: "lui-icon--tag",
                        component: "icon-item",
                        icon: "tag",
                        size: "small"
                    }];
    return {        
        type: "items",
        component: "accordion",
        items: {
            dimensions:{
                uses: "dimensions",
                min: 1,
                max: 1
            },
            measures: {
                uses: "measures",
                min: 0,
                max: 29,
                items: {
                    TagType: {
                        ref: "qDef.tagtype",
                        type: "string",
                        component: "dropdown",
                        label: "Tag Type",
                        options: vTagType,
                        defaultValue: "text"
                    },
                    // icons
                    IconType: {
                        ref : "qDef.icontype",
                        type : "boolean",
                        component : "switch",
                        label : "Custom icon",
                        options: [{
                            value: true,
                            label: "On"
                        }, {
                            value: false,
                            label: "Off"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'icon';
                        }
                    },                     
                    Icon: {
                        type: "string",
                        component: "item-selection-list",
                        icon: !0,
                        horizontal: !0,
                        label: "Icon",
                        translation: "properties.icon",
                        ref: "qDef.icon",
                        defaultValue: "info",
                        items: vIcons,
                        show : function(data) {
                            return data.qDef.tagtype == 'icon' && !data.qDef.icontype;
                        }
                    },
                    IconCustomColor: {
                        ref: "qAttributeExpressions.0.qExpression",
                        component: "expression",
                        expressionType: "measure",
                        schemaIgnore: !0,
                        enabled:false,
                        label: "Measure Color",
                        defaultValue: "",
                        show : function(data) {
                            return data.qDef.tagtype == 'icon';
                        }                 
                    },
                    IconCustom: {
                        ref: "qAttributeExpressions.1.qExpression",
                        component: "expression",
                        expressionType: "measure",
                        schemaIgnore: !0,
                        label: "Leonardo icon expression",
                        placeholder:"lui-icon--remove",
                        defaultValue: "='remove'",
                        show : function(data) {
                            return data.qDef.tagtype == 'icon' && data.qDef.icontype;
                        }                 
                    },    
                    //text                                        
                    TextSingleColor: {
                        ref: "qDef.textsinglecolor",
                        label: "Measure single color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: '#7b7a78'  
                        },
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextSize: {
                        ref: "qDef.textsize",
                        type: "string",
                        component: "dropdown",
                        label: "Font size",
                        options: vFontSizes,
                        defaultValue: "SmartCards-span-m",
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextPaddingLeft: {
                        type: "number",
                        component: "slider",
                        label: "Padding left",
                        ref: "qDef.textpaddingleft",
                        min: 5,
                        max: 50,
                        step: 5,
                        defaultValue: 5,
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextPaddingRight: {
                        type: "number",
                        component: "slider",
                        label: "Padding right",
                        ref: "qDef.textpadding",
                        min: 0,
                        max: 50,
                        step: 5,
                        defaultValue: 0,
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextPaddingTop: {
                        type: "number",
                        component: "slider",
                        label: "Padding top",
                        ref: "qDef.textpaddingtop",
                        min: 0,
                        max: 150,
                        step: 10,
                        defaultValue: 0,
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextPosition: {
                        ref: "qDef.textposition",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'inline',
                            label: "InLine"
                        }, {
                            value: 'below',
                            label: "Below"
                        }],
                        defaultValue: "inline",
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextAlign: {
                        type: "string",
                        component: "item-selection-list",
                        icon: !0,
                        horizontal: !0,
                        label: "Alignment",
                        translation: "properties.Alignment",
                        ref: "qDef.textalign",
                        defaultValue: "left",
                        items: [{
                            value: "left",
                            component: "icon-item",
                            icon: "align_left"
                        }, {
                            value: "center",
                            icon: "align_center",
                            component: "icon-item"
                        }, {
                            value: "right",
                            icon: "align_right",
                            component: "icon-item"
                        }],
                        show : function(data) {
                            return data.qDef.tagtype != 'separator';
                        }
                    },
                    TextFont: {
                        ref: "qDef.textfont",
                        type: "string",
                        component: "dropdown",
                        label: "Font Family",
                        options: vFontFamily,
                        defaultValue: "OpenSans",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleTitle: {
                        label:"Text style",
                        component: "text",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleBold: {
                        ref: "qDef.textstylebold",
                        type: "boolean",
                        component: "checkbox",
                        label: "Bold",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleItalic: {
                        ref: "qDef.textstyleitalic",
                        type: "boolean",
                        component: "checkbox",
                        label: "Italic",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleUnderline: {
                        ref: "qDef.textstyleunderline",
                        type: "boolean",
                        component: "checkbox",
                        label: "Underlined",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleShadow: {
                        ref: "qDef.textstyleshadow",
                        type: "boolean",
                        component: "checkbox",
                        label: "Shadow",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextShadowType: {
                        ref: "qDef.textstyleshadowtype",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'simple',
                            label: "Simple"
                        }, {
                            value: '3d',
                            label: "3D"
                        }, {
                            value: 'embossed',
                            label: "Embossed"
                        }],
                        defaultValue: "3d",
                        show : function(data) {
                            return data.qDef.tagtype == 'text' && data.qDef.textstyleshadow;
                        }
                    },                   
                    //Separator
                    SepDivColorBool: {
                        ref : "qDef.sepdivcolorbool",
                        type : "boolean",
                        component : "switch",
                        label : "Custom divisor color",
                        options: [{
                            value: false,
                            label: "Single"
                        }, {
                            value: true,
                            label: "Custom"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }
                    },
                    SepDivCustomColor: {
                        type: "string",
                        ref: "qDef.sepdivcustomcolor",
                        label: "Color expression",
                        defaultValue : "='#cccccc'//RGB and qlik colors also available'",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.sepdivcolorbool && data.qDef.tagtype == 'separator';
                        }
                    },
                    SepDivSingleColor: {
                        ref: "qDef.sepdivsinglecolor",
                        label: "Single color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: '#cccccc'  
                        },
                        show : function(data) {
                            return !data.qDef.textcolorbool && data.qDef.tagtype == 'separator';
                        }
                    },
                    SepDivHeight: {
                        type: "number",
                        component: "slider",
                        label: "Height",
                        ref: "qDef.sepdivheight",
                        min: 0.5,
                        max: 2.5,
                        step: 0.5,
                        defaultValue: 0.5,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }                               
                    },
                    SepDivWidth: {
                        type: "number",
                        component: "slider",
                        label: "Width",
                        ref: "qDef.sepdivwidth",
                        min: 0,
                        max: 100,
                        step: 10,
                        defaultValue: 100,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }                               
                    },
                    SepDivLeft: {
                        type: "number",
                        component: "slider",
                        label: "Margin left",
                        ref: "qDef.sepdivleft",
                        min: 5,
                        max: 50,
                        step: 5,
                        defaultValue: 5,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }                               
                    },                    
                    SepDivTop: {
                        type: "number",
                        component: "slider",
                        label: "Margin top",
                        ref: "qDef.sepdivtop",
                        min: 0,
                        max: 10,
                        step: 1,
                        defaultValue: 4,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }                               
                    },
                    SepDivBottom: {
                        type: "number",
                        component: "slider",
                        label: "Margin bottom",
                        ref: "qDef.sepdivbottom",
                        min: 0,
                        max: 10,
                        step: 1,
                        defaultValue: 4,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }                               
                    }
                }
            },
            sorting: {
                uses: "sorting",
                show: true
            },            

        /*resize: function ( $element, layout ) {
            render( $element, layout );
        },*/
            addons: {
                uses: "addons",
                items: {
                    calcCond: {
                        label: "Data handling",
                        uses: "calcCond"
                    }
                }
            },
            settings: {
                uses: "settings",
                items: {    
                    GridOptions: {
                        label: "Grid options",
                        type: "items",
                        items: {
                            gridScroll: {
                                type: "string",
                                ref: "gridscroll",
                                component: "radiobuttons",
                                label: "Scroll position",
                                options: [
                                  {
                                    value: "landscape",
                                    label: "Landscape"
                                  },
                                  {
                                    value: "portrait",
                                    label: "Portrait"
                                  },
                                  {
                                    value: "unlock",
                                    label: "Unlock"
                                  }
                                ],
                                defaultValue: "landscape"
                            },
                            gridScrollColor: {
                                ref: "gridscrollcolor",
                                type: "string",
                                component: "dropdown",
                                label: "Scroll color",
                                options: vScrollCol,
                                defaultValue: "red",
                                show : function(data) {
                                    return data.gridscroll != 'unlock';
                                }
                            },                      
                            gridColumns: {
                                type: "number",
                                ref: "gridcolumns",
                                label: "Number of columns",
                                defaultValue : 8,
                                expression : "optional"
                            },                            
                            gridRows: {
                                type: "number",
                                ref: "gridrows",
                                label: "Number of visible rows",
                                defaultValue : 1,
                                expression : "optional",
                                show : function(data) {
                                    return data.gridscroll != 'landscape';
                                }
                            },
                            gridPadding: {                                
                                type: "number",
                                component: "slider",
                                label: "Box padding",
                                ref: "gridpadding",
                                min: 0,
                                max: 20,
                                step: 1,
                                defaultValue: 2
                            }                            
                        }
                    }, 
                    
                    BackgroundGroup: {
                        label: "Background",
                        type: "items",
                        items: {
                            backgroundColorBool: {
                                ref : "backgroundcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Background Color",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            
                            backgroundSingleColor: {
                                ref: "backsinglecolor",
                                label: "Background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {
                                    color: "#cccccc"  
                                },
                                show : function(data) {
                                    return data.backgroundcolorbool;
                                }
                            },
                            // images
                            backgroundImageBool: {
                                ref : "backgroundimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Use background image",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            backgroundImageSource: {
                                type: "string",
                                ref: "backgroundimgsrc",
                                component: "radiobuttons",
                                label: "Image source",
                                options: [
                                  {
                                    value: "url",
                                    label: "Image from Url"
                                  },
                                  {
                                    value: "lib",
                                    label: "Image from library"
                                  },
                                  {
                                    value: "app",
                                    label: "Image from app"
                                  }
                                ],
                                defaultValue: "app",
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundImageExt: {
                                type: "string",
                                ref: "backgroundimageext",
                                label: "Image extension",
                                defaultValue : 'jpg',
                                expression : "optional",
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundImageSize: {
                                ref: "backgroundimagesize",
                                type: "string",
                                component: "dropdown",
                                label: "Size",
                                options: vImgSize,
                                defaultValue: "cover",
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundImageAlign: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Alignment",
                                translation: "properties.Alignment",
                                ref: "backgroundimagealign",
                                defaultValue: "50% 50%",
                                items: [{
                                    value: "0% 50%",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "50% 50%",
                                    icon: "align_center",
                                    component: "icon-item"
                                }, {
                                    value: "100% 50%",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "backgroundopacity",
                                min: 0.2,
                                max: 1,
                                step: 0.05,
                                defaultValue: 1                                
                            }
                        }
                    },    
                    //Hover effects
                    HoverGroup: {
                        label: "Hover",
                        type: "items",
                        items: {
                            hoverImgBool: {
                                ref : "hoverimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Remove background img",
                                options: [{
                                    value: 0,
                                    label: "Off"
                                }, {
                                    value: 1,
                                    label: "On"
                                }],
                                defaultValue: 0
                            },
                            hoverImgOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "hoveropacity",
                                min: 0,
                                max: 1,
                                step: 0.05,
                                defaultValue: 0,
                                show : function(data) {
                                    return data.hoverimgbool == 1;
                                }
                            }                            
                        }
                    },             
                    //Behavior
                    Behavior: {
                        label: "Behavior",
                        type: "items",
                        items: {
                            BehaviorSettings: {
                                type: "string",
                                ref: "behavior",
                                component: "radiobuttons",
                                label: "On click",
                                options: [
                                  {
                                    value: "none",
                                    label: "Nothing"
                                  },
                                  {
                                    value: "dim",
                                    label: "Select dimension value"
                                  },
                                  {
                                    value: "var",
                                    label: "Update variable"
                                  }
                                ],
                                defaultValue: "dim"
                            }, 
                            BehaviorVariable: {
                                type: "string",
                                component: "dropdown",
                                label: "Select Variable",
                                ref: "behaviorvariable",
                                options: utils.getVariableList({listType: 'variable', sortBy: 'title'}),
                                show : function(data) {
                                    return data.behavior == 'var';
                                }
                            },
                            BehaviorVariableValue: {
                                component: "expression",
                                expressionType: "measure",
                                schemaIgnore: !0,                                
                                ref: "qHyperCubeDef.qDimensions.0.qAttributeExpressions.0.qExpression",
                                label: "Value",
                                defaultValue: "",
                                show : function(data) {
                                    return data.behavior == 'var';
                                }
                            }
                        }
                    },  
                    //border settings
                    BorderGroup: {
                        label: "Border settings",
                        type: "items",
                        items: {
                            borderBool: {
                                ref : "borderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            borderColor: {
                                ref: "bordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.borderbool;
                                }
                            },
                            borderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "borderwidth",
                                min: 1,
                                max: 5,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.borderbool;
                                }                               
                            }
                        }
                    },
                    Rotation: {
                        component: "items",
                        label: "Rotation",
                        items: {
                            Rotate: {
                                type: "number",
                                ref: "rotation",
                                label: "Rotation deg (0 - 360)",
                                defaultValue : 0,
                                expression : "optional"
                            }
                        }
                    },
                    about: {
                        component: "items",
                        label: "About",
                        items: {
                            header: {
                                label: "Smart Cards Visualization",
                                style: "header",
                                component: "text"
                            },
                            paragraph1: {
                                label: "Smart Cards visualization is a highly customizable dynamic object notebook.",
                                component: "text"
                            },
                            paragraph2: {
                                label: "Smart Cards visualization is an extension created by Ivan Felipe, offered under MIT License.",
                                component: "text"
                            },
                            paragraph3: {
                                label: "Last update 18-jan-2022.",
                                component: "text"
                            }
                        }
                    }               
                }
            }
        }
    }
});