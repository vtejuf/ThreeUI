
"use strict"
/**
 *
 * three UI界面
 */

function ThreeUI(sceneContainer, name){
    windowPorperfixed();
    this.type = "ThreeUI";
    this.name = name || "ThreeUI";

    (!sceneContainer.tagName) && (sceneContainer = document.querySelector(sceneContainer));
    if(ThreeUI.lib.getCss(sceneContainer, 'position') == 'static'){
        sceneContainer.style.position = 'relative';
    }
    this.parent = sceneContainer;

    this.children = {};

    function windowPorperfixed(){
        (!document.defaultView.getComputedStyle && document.body.currentStyle) && (document.defaultView.getComputedStyle = function(dom){return dom.currentStyle} ) ;
    }
}
ThreeUI.prototype.addLayer = function(UILayer){
    var scope = this;

    if(!UILayer || !ThreeUI.Layer.prototype.isPrototypeOf(UILayer)){
        console.log("parameter is not of type 'ThreeUI.Layer'");
        return;
    }

    this.parent.appendChild(UILayer.container);
    this.children[UILayer.name] = UILayer;

    return this;
}
/**
 * 后代元素中查找UIContainer
 * @param  name UIContainer name
 * @return {UIContainer} UIContainer
 */
ThreeUI.prototype.getObjectByName = function(name){
    if(this.name == name){
        return this;
    }
    var cont = this.children[name];
    if(cont){
        return cont;
    }
    for(var i in this.children){
        var o = this.children[i].getObjectByName(name);
        if(o){
            return o;
        }
    }
    return null;
}


/**
 * UI层 最底层的容器，可以存在多个
 * @property type 
 * @property name 
 * @property children 
 * @property container 
 *
 * @property transformStyle 
 * @property perspective 
 * @property perspectiveOrigin 
 * 
 * @property transformStyle 
 * @property perspective 
 * @property perspectiveOrigin 
 * 
 * @property width, height, visible, transition, opacity, zIndex 元素css样式 css格式书写
 *
 * @property position translate3d 位移
 *     @method  position.set(x,y,z)
 *     @property position.x
 *     @property position.y
 *     @property position.z
 *
 * @method addClass
 * @method removeClass
 *
 * @method add 添加UIContainer
 * @method remove 删除UIContainer
 */
ThreeUI.Layer = function(opt){
    var scope = this;

    this.type = 'layer';

    this.children = {};

    var layer = document.createElement('div');
    layer.style.cssText = "position: absolute; width :0; height: 0; z-index: 1;";//+ThreeUI.lib.css.transformStyle+":preserve-3d;"+ThreeUI.lib.css.perspective+":none;"+ThreeUI.lib.css.perspectiveOrigin+":center center";

    this.container = layer;

    Object.defineProperties(scope, {
        _name: {
            enumerable: false,
            writable: true,
            value: (opt.name || 'layer_' + ThreeUI.lib.getRND())
        },
        name: {
            configurable: true,
            enumerable: true,
            set: function(name){
                this.container.setAttribute("data-threeui-layer", this.name);
                this._name = name;
            },
            get: function(){
                return this._name;
            }
        },
        width : {
            enumerable: true,
            set: function(width){
                this.container.style.width = width;
            },
            get: function(){
                return this.container.style.width;
            }
        },
        height : {
            enumerable: true,
            set: function(height){
                this.container.style.height = height;
            },
            get: function(){
                return this.container.style.height;
            }
        },
        left : {
            enumerable: true,
            set: function(left){
                this.container.style.left = left;
            },
            get: function(){
                return this.container.style.left;
            }
        },
        right : {
            enumerable: true,
            set: function(right){
                this.container.style.right = right;
            },
            get: function(){
                return this.container.style.right;
            }
        },
        bottom : {
            enumerable: true,
            set: function(bottom){
                this.container.style.bottom = bottom;
            },
            get: function(){
                return this.container.style.bottom;
            }
        },
        top : {
            enumerable: true,
            set: function(top){
                this.container.style.top = top;
            },
            get: function(){
                return this.container.style.top;
            }
        },
        visible : {
            enumerable: true,
            set: function(visible){
                visible = Number(!!visible);
                this.container.style.opacity = visible;
                this.container.style.visibility = visible?"visible":"hidden";
            },
            get: function(){
                return !!Number(this.container.style.opacity);
            }
        },
        background : {
            enumerable: true,
            set: function(background){
                this.container.style.background = background;
            },
            get: function(){
                return this.container.style.background;
            }
        },
        color : {
            enumerable: true,
            set: function(color){
                this.container.style.color = color;
            },
            get: function(){
                return this.container.style.color;
            }
        },
        transition : {
            enumerable: true,
            set: function(transition){
                this.container.style[ThreeUI.lib.css.transition] = transition;
            },
            get: function(){
                return this.container.style[ThreeUI.lib.css.transition];
            }
        },
        opacity : {
            enumerable: true,
            set: function(opacity){
                this.container.style.opacity = opacity;
            },
            get: function(){
                return this.container.style.opacity;
            }
        },
        zIndex : {
            enumerable: true,
            set: function(zIndex){
                this.container.style.zIndex = zIndex;
            },
            get: function(){
                return this.container.style.zIndex;
            }
        },
        skew : {
            enumerable: true,
            value: {}
        },
        position : {
            enumerable: true,
            value: {}
        },
        rotate : {
            enumerable: true,
            value: {}
        },
        scale : {
            enumerable: true,
            value: {}
        },
        transformStyle: {
            enumerable: true,
            set: function(transformStyle){
                this.container.style[ThreeUI.lib.css.transformStyle] = transformStyle;
            },
            get: function(){
                return this.container.style[ThreeUI.lib.css.transformStyle];
            }
        },
        perspective: {
            enumerable: true,
            set: function(perspective){
                this.container.style[ThreeUI.lib.css.perspective] = perspective;
            },
            get: function(){
                return this.container.style[ThreeUI.lib.css.perspective];
            }
        },
        perspectiveOrigin: {
            enumerable: true,
            set: function(perspectiveOrigin){
                this.container.style[ThreeUI.lib.css.perspectiveOrigin] = perspectiveOrigin;
            },
            get: function(){
                return this.container.style[ThreeUI.lib.css.perspectiveOrigin];
            }
        },
        open3d : {
            enumerable: true,
            set: function(isOpen){
                if(isOpen && !this.transformStyle){
                    this.transformStyle = 'preserve-3d';
                    this.perspective = '500px';
                    this.perspectiveOrigin = 'center center';
                }
            },
            get: function(){
                return (this.transformStyle == 'preserve-3d');
            }
        }
    });

    var transformStyleInitList = {translate3d: "translate3d(0,0,0)", rotate3d: "rotate3d(0,0,0,0deg)", scale3d: "scale3d(1,1,1)",skew: "skew(0,0)"};
    function testStyleIn(style){
        if(scope.container.style[ThreeUI.lib.css.transform].indexOf(style) == -1){
            scope.container.style[ThreeUI.lib.css.transform] += transformStyleInitList[style];
        }
    }
    //skew
    Object.defineProperties(this.skew, {
        set: {
            value: function(x, y){
                this.x = x || 0;
                this.y = y || 0;
            }
        },
        _x: {
            value: 0,
            writable: true
        },
        _y: {
            value: 0,
            writable: true
        },
        x:{
            enumerable: true,
            set: function(x){
                testStyleIn('skew');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/skew\(.+?,(.+?)\)/, "skew("+x+",$1)");
                this._x = x;
            },
            get: function(){
                return this._x;
            }
        },
        y:{
            enumerable: true,
            set: function(y){
                testStyleIn('skew');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/skew\((.+?),.+?\)/, "skew($1,"+y+")");
                this._y = y;
            },
            get: function(){
                return this._y;
            }
        }
    });

    //translate3d
    Object.defineProperties(this.position, {
        set: {
            value: function(x, y, z){
                this.x = x || 0;
                this.y = y || 0;
                this.z = z || 0;
            }
        },
        _x: {
            value: 0,
            writable: true
        },
        _y: {
            value: 0,
            writable: true
        },
        _z: {
            value: 0,
            writable: true
        },
        x:{
            enumerable: true,
            set: function(x){
                testStyleIn('translate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/translate3d\(.+?,(.+?),(.+)\)/, "translate3d("+x+",$1,$2)");
                this._x = x;
            },
            get: function(){
                return this._x;
            }
        },
        y:{
            enumerable: true,
            set: function(y){
                testStyleIn('translate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/translate3d\((.+?),.+?,(.+)\)/, "translate3d($1,"+y+",$2)");
                this._y = y;
            },
            get: function(){
                return this._y;
            }
        },
        z:{
            enumerable: true,
            set: function(z){
                testStyleIn('translate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/translate3d\((.+?),(.+?),.+\)/, "translate3d($1,$2,"+z+")");
                this._z = z;
            },
            get: function(){
                return this._z;
            }
        }
    });

    //rotate3d
    Object.defineProperties(this.rotate, {
        set: {
            value: function(x, y, z, angle){
                this.x = x || 0;
                this.y = y || 0;
                this.z = z || 0;
                this.angle = angle || 0;
            }
        },
        _x: {
            value: 0,
            writable: true
        },
        _y: {
            value: 0,
            writable: true
        },
        _z: {
            value: 0,
            writable: true
        },
        _a: {
            value: 0,
            writable: true
        },
        x:{
            enumerable: true,
            set: function(x){
                testStyleIn('rotate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/rotate3d\(.+?,(.+?),(.+),(.+)\)/, "rotate3d("+x+",$1,$2,$3)");
                this._x = x;
            },
            get: function(){
                return this._x;
            }
        },
        y:{
            enumerable: true,
            set: function(y){
                testStyleIn('rotate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/rotate3d\((.+?),.+?,(.+),(.+)\)/, "rotate3d($1,"+y+",$2,$3)");
                this._y = y;
            },
            get: function(){
                return this._y;
            }
        },
        z:{
            enumerable: true,
            set: function(z){
                testStyleIn('rotate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/rotate3d\((.+?),(.+?),.+,(.+)\)/, "rotate3d($1,$2,"+z+",$3)");
                this._z = z;
            },
            get: function(){
                return this._z;
            }
        },
        angle:{
            enumerable: true,
            set: function(angle){
                testStyleIn('rotate3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/rotate3d\((.+?),(.+?),(.+),.+\)/, "rotate3d($1,$2,$3,"+angle+")");
                this._a = angle;
            },
            get: function(){
                return this._a;
            }
        }
    });

    //scale3d
    Object.defineProperties(this.scale, {
        set: {
            value: function(x, y, z){
                this.x = x || 0;
                this.y = y || 0;
                this.z = z || 0;
            }
        },
        _x: {
            value: 0,
            writable: true
        },
        _y: {
            value: 0,
            writable: true
        },
        _z: {
            value: 0,
            writable: true
        },
        x:{
            enumerable: true,
            set: function(x){
                testStyleIn('scale3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/scale3d\(.+?,(.+?),(.+)\)/, "scale3d("+x+",$1,$2)");
                this._x = x;
            },
            get: function(){
                return this._x;
            }
        },
        y:{
            enumerable: true,
            set: function(y){
                testStyleIn('scale3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/scale3d\((.+?),.+?,(.+)\)/, "scale3d($1,"+y+",$2)");
                this._y = y;
            },
            get: function(){
                return this._y;
            }
        },
        z:{
            enumerable: true,
            set: function(z){
                testStyleIn('scale3d');
                scope.container.style[ThreeUI.lib.css.transform] = scope.container.style[ThreeUI.lib.css.transform].replace(/scale3d\((.+?),(.+?),.+\)/, "scale3d($1,$2,"+z+")");
                this._z = z;
            },
            get: function(){
                return this._z;
            }
        }
    });

    for(var i in opt){
        if(!this[opt[i]])
            this[i] = opt[i];
    }
}

ThreeUI.Layer.prototype.add = function(UIContainer){
    var scope = this;

    if(!UIContainer || !ThreeUI.Container.prototype.isPrototypeOf(UIContainer)){
        console.log("parameter is not of type 'ThreeUI.Container'");
        return;
    }
    if(this.children[UIContainer.name]){
        console.log('ThreeUI.Container.name is exists');
        return;
    }

    UIContainer.parent = this.name;
    this.container.appendChild(UIContainer.container);
    this.children[UIContainer.name] = UIContainer;

    return this;
}
/**
 * 删除UIContainer
 * @param  UIContainer {UIContainer} || UIContainer name {string}
 */
ThreeUI.Layer.prototype.remove = function(UIContainer){
    if(typeof UIContainer == 'string'){
        UIContainer = this.children[UIContainer];
    }
    if(!UIContainer || !ThreeUI.Container.prototype.isPrototypeOf(UIContainer)){
        console.log('argument must be construct by ThreeUI.Container or a UIContainer name');
        return;
    }
    this.container.removeChild(UIContainer.container);
    delete this.children[UIContainer.name];
}
//css
ThreeUI.Layer.prototype.addClass = function(css){
    var scope = this;
    if(css.indexOf(' ') > -1){
        css = css.split(' ');
    }else{
        css = [css];
    }
    css.forEach(function(c){
        if(!scope.hasClass(c)){
            scope.container.className += ' '+c;
        }
    });
}

ThreeUI.Layer.prototype.removeClass = function(css){
    if(css.indexOf(' ') > -1){
        css = '(?:'+css.replace(' ','|')+')';
    }
    this.container.className = this.container.className.replace(new RegExp('\S?'+css+'\S?','g'),' ').trim();
}
ThreeUI.Layer.prototype.hasClass = function(css){
    return new RegExp('\S?'+css+'\S?').test(this.container.className);
}

ThreeUI.Layer.prototype.getObjectByName = ThreeUI.prototype.getObjectByName;


/**
 * UI容器 继承自 Layer
 * 基本的UI组件，包裹UI内容
 * @opt json {name:, position:{x,y}, width:, height:, template:, data:}
 * position 相对于左上角的偏移量 像素，em...
 * template underscore模板 | html字符串 | dom元素 [data有值则当作underscore解析]
 * data 如果有值，则解析template
 *
 * @property {string} [type] UIContainer
 * @property {string} [name] primaryKey
 * @property {dom} [container] dom对象
 * 
 * @property eventList 可写事件列表
 * @property event 绑定事件的对象，function(){ function mousedown(){}; ...}
 * @method eventOff 事件解绑，但保存在内存
 * @method eventOn 重新绑定
 * @method eventClear 删除所有事件
 * 
 * @property template
 * @property data
 * 
 */
ThreeUI.Container = function(opt){
    ThreeUI.Layer.call(this, opt);
    delete this.name;

    var scope = this;
    this.type = "Container";
    this.userData = opt.userData || {};

    var css = "position:absolute;";//+ThreeUI.lib.css.transform+":translate3d(0,0,0);";//+ThreeUI.lib.css.transformStyle+":preserve-3d;"+ThreeUI.lib.css.perspective+":0;"+ThreeUI.lib.css.perspectiveOrigin+":center center"

    var container = document.createElement('div');
    container.style.cssText = css;

    this.container = container;

    Object.defineProperties(scope, {
        _name: {
            enumerable: false,
            writable: true,
            value: (opt.name || 'container_' + ThreeUI.lib.getRND())
        },
        name: {
            configurable: true,
            enumerable: true,
            set: function(name){
                this.container.setAttribute("data-threeui-container", this.name);
                this._name = name;
            },
            get: function(){
                return this._name;
            }
        },

        _event:{
            value:{},
            writable: true,
            enumerable: false
        },
        eventList:{
            value: ['click','mousedown','mousemove','mouseup','touchstart','touchmove','touchend','keydown','keyup'],
            writable: true,
            enumerable: true
        },
        event : {
            enumerable: false,
            set: function(func){
                func = func.toString().replace(/(?:\/\/[\s\S]*?\n|\/\*[\s\S]*?\*\/|\t)/g,'').replace(/( |\n){2,}/g,'$1').trim();
                func = func.substring(func.indexOf('{')+1, func.lastIndexOf('}'));
                var eventlist = this.eventList,
                    args = eventlist.join(','),
                    resobj = {};
                eventlist.forEach(function (str){
                    resobj[str] = str;
                });
                resobj = '\nreturn '+JSON.stringify(resobj).replace( /\"/g, '' );
                resobj = new Function(args, func + resobj).bind(this)();

                for(var i in resobj){
                    if(resobj[i]){
                        this._event[i] = resobj[i].bind(this);
                        this.container.addEventListener(i, this._event[i]);
                    }
                }
            },
            get: function(){
                return this._event;
            }
        },
        //template data
        _template:{
            value: null,
            writable: true
        },
        template:{
            enumerable: true,
            set: function(template){
                if(template.indexOf("<%") > -1){
                    template = ThreeUI.lib.renderTpl(template, this.data || false);
                }
                this._template = template;
                this.container.innerHTML = typeof template=='function'?'':template;
            }
            ,get: function(){
                return this._template;
            }
        },
        _data : {
            value: null,
            writable: true
        },
        data : {
            enumerable: true,
            set: function(data){
                this._data = data;
                if(!this.template || this.template == '' || typeof this.template != 'function'){
                    return;
                }
                this.container.innerHTML = this._template(data);
            }
            ,get: function(){
                return this._data;
            }
        }

    });

    for(var i in opt){
        if(!this[opt[i]])
            this[i] = opt[i];
    }

};
ThreeUI.Container.prototype = ThreeUI.Layer.prototype;
// ThreeUI.Container.prototype.constructor = ThreeUI.Container;
    
ThreeUI.Container.prototype.eventOff = function(eventName){
    this.container.removeEventListener(eventName, this.event[eventName]);
}
ThreeUI.Container.prototype.eventOn = function(eventName){
    scope.container.addEventListener(eventName, this.event[eventName]);
}
ThreeUI.Container.prototype.eventClear = function(){
    for(var i in this.event){
        this.container.removeEventListener(i, this.event[i]);
    }
    this._event = {};
}


/**
 * 公用函数 和 属性
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
ThreeUI.lib = {};
ThreeUI.lib.getStyleName = function(style){
    var _elementStyle = document.createElement('div').style;    
    var _vendor = (function () {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;
            for ( ; i < l; i++ ) {
                transform = vendors[i] + 'ransform';
                if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
            }
            return false;
        })();
    //拼装样式属性名
    function _prefixStyle (style) {
      if ( _vendor === false ) return false;
      if ( _vendor === '' ) return style;
      return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    return _prefixStyle(style);
}

ThreeUI.lib.css = {
    transition: ThreeUI.lib.getStyleName('transition'),
    transform : ThreeUI.lib.getStyleName('transform'),
    transformStyle : ThreeUI.lib.getStyleName('transform-style'),
    perspective : ThreeUI.lib.getStyleName('perspective'),
    perspectiveOrigin : ThreeUI.lib.getStyleName('perspective-origin')
};

ThreeUI.lib.getCss = function(dom, name){
    var cssObjlist = document.defaultView.getComputedStyle(dom);
    return name?cssObjlist[name]:cssObjlist;
}

ThreeUI.lib.renderTpl = function(tpl, data){
            var escapeMap = {
                "&":"&amp;",
                "<":"&lt;",
                ">":"&gt;",
                '"':"&quot;",
                "'":"&#x27;",
                "`":"&#x60;"
            };

            var createEscaper = function(map) {
                var escaper = function(match) {
                    return map[match];
                };
                var source = "(?:" + Object.keys(map).join("|") + ")";
                var testRegexp = RegExp(source);
                var replaceRegexp = RegExp(source, "g");
                return function(string) {
                    string = string == null ? "" :"" + string;
                    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) :string;
                };
            };

            var escape = createEscaper(escapeMap);

            var settings = {
                evaluate:/<%([\s\S]+?)%>/g,
                interpolate:/<%=([\s\S]+?)%>/g,
                escape:/<%-([\s\S]+?)%>/g
            };

            var noMatch = /(.)^/;

            var escapes = {
                "'":"'",
                "\\":"\\",
                "\r":"r",
                "\n":"n",
                "\u2028":"u2028",
                "\u2029":"u2029"
            };

            var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

            var escapeChar = function(match) {
                return "\\" + escapes[match];
            };

            var template = function(text) {
                var matcher = RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
                var index = 0;
                var source = "__p+='";
                text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
                    index = offset + match.length;
                    if (escape) {
                        source += "'+\n((__t=(typeof " + escape + "!='undefined'?" + escape + ":null))==null?'':escape(__t))+\n'";
                    } else if (interpolate) {
                        source += "'+\n((__t=(typeof " + interpolate + "!='undefined'?" + interpolate + ":null))==null?'':__t)+\n'";
                    } else if (evaluate) {
                        source += "';\n" + evaluate + "\n__p+='";
                    }
                    return match;
                });
                source += "';\n";
                if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
                source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
                var render;
                try {
                    render = new Function(settings.variable || "obj", source);
                } catch (e) {
                    e.source = source;
                    throw e;
                }
                var template = function(data) {
                    return render.call(this, data);
                };
                var argument = settings.variable || "obj";
                template.source = "function(" + argument + "){\n" + source + "}";
                return template;
            };

            if(typeof data == 'object'){
                return template(tpl)(data);
            }else{
                return template(tpl);
            }
        };

ThreeUI.lib.getRND = function() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}