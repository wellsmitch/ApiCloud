(function($){function Scroller(elem,settings){var m,hi,v,dw,ww,wh,rwh,mw,mh,lock,anim,debounce,theme,lang,click,scrollable,moved,start,startTime,stop,p,min,max,target,index,timer,readOnly,preventShow,that=this,ms=$.mobiscroll,e=elem,elm=$(e),s=extend({},defaults),pres={},iv={},pos={},pixels={},wheels=[],input=elm.is("input"),visible=false,onStart=function(e){if(testTouch(e)&&!move&&!isReadOnly(this)&&!click){e.preventDefault();move=true;scrollable=s.mode!="clickpick";target=$(".dw-ul",this);setGlobals(target);
moved=iv[index]!==undefined;p=moved?getCurrentPosition(target):pos[index];start=getCoord(e,"Y");startTime=new Date;stop=start;scroll(target,index,p,.001);if(scrollable)target.closest(".dwwl").addClass("dwa");$(document).on(MOVE_EVENT,onMove).on(END_EVENT,onEnd)}},onMove=function(e){if(scrollable){e.preventDefault();e.stopPropagation();stop=getCoord(e,"Y");scroll(target,index,constrain(p+(start-stop)/hi,min-1,max+1))}moved=true},onEnd=function(e){var time=new Date-startTime,val=constrain(p+(start-
stop)/hi,min-1,max+1),speed,dist,tindex,ttop=target.offset().top;if(time<300){speed=(stop-start)/time;dist=speed*speed/s.speedUnit;if(stop-start<0)dist=-dist}else dist=stop-start;tindex=Math.round(p-dist/hi);if(!dist&&!moved){var idx=Math.floor((stop-ttop)/hi),li=$(".dw-li",target).eq(idx),hl=scrollable;if(event("onValueTap",[li])!==false)tindex=idx;else hl=true;if(hl){li.addClass("dw-hl");setTimeout(function(){li.removeClass("dw-hl")},200)}}if(scrollable)calc(target,tindex,0,true,Math.round(val));
move=false;target=null;$(document).off(MOVE_EVENT,onMove).off(END_EVENT,onEnd)},onBtnStart=function(e){var btn=$(this);$(document).on(END_EVENT,onBtnEnd);if(!btn.hasClass("dwb-d"))btn.addClass("dwb-a");setTimeout(function(){btn.blur()},10);if(btn.hasClass("dwwb"))if(testTouch(e))step(e,btn.closest(".dwwl"),btn.hasClass("dwwbp")?plus:minus)},onBtnEnd=function(e){if(click){clearInterval(timer);click=false}$(document).off(END_EVENT,onBtnEnd);$(".dwb-a",dw).removeClass("dwb-a")},onKeyDown=function(e){if(e.keyCode==
38)step(e,$(this),minus);else if(e.keyCode==40)step(e,$(this),plus)},onKeyUp=function(e){if(click){clearInterval(timer);click=false}},onScroll=function(e){if(!isReadOnly(this)){e.preventDefault();e=e.originalEvent||e;var delta=e.wheelDelta?e.wheelDelta/120:e.detail?-e.detail/3:0,t=$(".dw-ul",this);setGlobals(t);calc(t,Math.round(pos[index]-delta),delta<0?1:2)}};function step(e,w,func){e.stopPropagation();e.preventDefault();if(!click&&!isReadOnly(w)&&!w.hasClass("dwa")){click=true;var t=w.find(".dw-ul");
setGlobals(t);clearInterval(timer);timer=setInterval(function(){func(t)},s.delay);func(t)}}function isReadOnly(wh){if($.isArray(s.readonly)){var i=$(".dwwl",dw).index(wh);return s.readonly[i]}return s.readonly}function generateWheelItems(i){var html='\x3cdiv class\x3d"dw-bf"\x3e',ww=wheels[i],w=ww.values?ww:convert(ww),l=1,labels=w.labels||[],values=w.values,keys=w.keys||values;$.each(values,function(j,v){if(l%20==0)html+='\x3c/div\x3e\x3cdiv class\x3d"dw-bf"\x3e';html+='\x3cdiv role\x3d"option" aria-selected\x3d"false" class\x3d"dw-li dw-v" data-val\x3d"'+
keys[j]+'"'+(labels[j]?' aria-label\x3d"'+labels[j]+'"':"")+' style\x3d"height:'+hi+"px;line-height:"+hi+'px;"\x3e\x3cdiv class\x3d"dw-i"\x3e'+v+"\x3c/div\x3e\x3c/div\x3e";l++});html+="\x3c/div\x3e";return html}function setGlobals(t){min=$(".dw-li",t).index($(".dw-v",t).eq(0));max=$(".dw-li",t).index($(".dw-v",t).eq(-1));index=$(".dw-ul",dw).index(t)}function formatHeader(v){var t=s.headerText;return t?typeof t==="function"?t.call(e,v):t.replace(/\{value\}/i,v):""}function read(){that.temp=input&&
that.val!==null&&that.val!=elm.val()||that.values===null?s.parseValue(elm.val()||"",that):that.values.slice(0);setVal()}function getCurrentPosition(t){var style=window.getComputedStyle?getComputedStyle(t[0]):t[0].style,matrix,px;if(has3d){$.each(["t","webkitT","MozT","OT","msT"],function(i,v){if(style[v+"ransform"]!==undefined){matrix=style[v+"ransform"];return false}});matrix=matrix.split(")")[0].split(", ");px=matrix[13]||matrix[5]}else px=style.top.replace("px","");return Math.round(m-px/hi)}function ready(t,
i){clearTimeout(iv[i]);delete iv[i];t.closest(".dwwl").removeClass("dwa")}function scroll(t,index,val,time,active){var px=(m-val)*hi,style=t[0].style,i;if(px==pixels[index]&&iv[index])return;if(time&&px!=pixels[index])event("onAnimStart",[dw,index,time]);pixels[index]=px;style[pr+"Transition"]="all "+(time?time.toFixed(3):0)+"s ease-out";if(has3d)style[pr+"Transform"]="translate3d(0,"+px+"px,0)";else style.top=px+"px";if(iv[index])ready(t,index);if(time&&active){t.closest(".dwwl").addClass("dwa");
iv[index]=setTimeout(function(){ready(t,index)},time*1E3)}pos[index]=val}function scrollToPos(time,index,manual,dir,active){if(event("validate",[dw,index,time])!==false){$(".dw-ul",dw).each(function(i){var t=$(this),cell=$('.dw-li[data-val\x3d"'+that.temp[i]+'"]',t),cells=$(".dw-li",t),v=cells.index(cell),l=cells.length,sc=i==index||index===undefined;if(!cell.hasClass("dw-v")){var cell1=cell,cell2=cell,dist1=0,dist2=0;while(v-dist1>=0&&!cell1.hasClass("dw-v")){dist1++;cell1=cells.eq(v-dist1)}while(v+
dist2<l&&!cell2.hasClass("dw-v")){dist2++;cell2=cells.eq(v+dist2)}if((dist2<dist1&&dist2&&dir!==2||!dist1||v-dist1<0||dir==1)&&cell2.hasClass("dw-v")){cell=cell2;v=v+dist2}else{cell=cell1;v=v-dist1}}if(!cell.hasClass("dw-sel")||sc){that.temp[i]=cell.attr("data-val");$(".dw-sel",t).removeClass("dw-sel");if(!s.multiple){$(".dw-sel",t).removeAttr("aria-selected");cell.attr("aria-selected","true")}cell.addClass("dw-sel");scroll(t,i,v,sc?time:.1,sc?active:false)}});v=s.formatResult(that.temp);if(s.display==
"inline")setVal(manual,0,true);else $(".dwv",dw).html(formatHeader(v));if(manual)event("onChange",[v])}}function event(name,args){var ret;args.push(that);$.each([theme.defaults,pres,settings],function(i,v){if(v[name])ret=v[name].apply(e,args)});return ret}function calc(t,val,dir,anim,orig){val=constrain(val,min,max);var cell=$(".dw-li",t).eq(val),o=orig===undefined?val:orig,idx=index,time=anim?val==o?.1:Math.abs((val-o)*s.timeUnit):0;that.temp[idx]=cell.attr("data-val");scroll(t,idx,val,time,orig);
setTimeout(function(){scrollToPos(time,idx,true,dir,orig!==undefined)},10)}function plus(t){var val=pos[index]+1;calc(t,val>max?min:val,1,true)}function minus(t){var val=pos[index]-1;calc(t,val<min?max:val,2,true)}function setVal(fill,time,noscroll,temp){if(visible&&!noscroll)scrollToPos(time);v=s.formatResult(that.temp);if(!temp){that.values=that.temp.slice(0);that.val=v}if(fill)if(input)elm.val(v).trigger("change")}that.position=function(check){if(s.display=="inline"||ww===$(window).width()&&rwh===
$(window).height()&&check||event("onPosition",[dw])===false)return;var w,l,t,aw,ah,ap,at,al,arr,arrw,arrl,scroll,totalw=0,minw=0,st=$(window).scrollTop(),wr=$(".dwwr",dw),d=$(".dw",dw),css={},anchor=s.anchor===undefined?elm:s.anchor;ww=$(window).width();rwh=$(window).height();wh=window.innerHeight;wh=wh||rwh;if(/modal|bubble/.test(s.display)){$(".dwc",dw).each(function(){w=$(this).outerWidth(true);totalw+=w;minw=w>minw?w:minw});w=totalw>ww?minw:totalw;wr.width(w).css("white-space",totalw>ww?"":"nowrap")}mw=
d.outerWidth();mh=d.outerHeight(true);lock=mh<=wh&&mw<=ww;if(s.display=="modal"){l=(ww-mw)/2;t=st+(wh-mh)/2}else if(s.display=="bubble"){scroll=true;arr=$(".dw-arrw-i",dw);ap=anchor.offset();at=ap.top;al=ap.left;aw=anchor.outerWidth();ah=anchor.outerHeight();l=al-(d.outerWidth(true)-aw)/2;l=l>ww-mw?ww-(mw+20):l;l=l>=0?l:20;t=at-mh;if(t<st||at>st+wh){d.removeClass("dw-bubble-top").addClass("dw-bubble-bottom");t=at+ah}else d.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");arrw=arr.outerWidth();
arrl=al+aw/2-(l+(mw-arrw)/2);$(".dw-arr",dw).css({left:constrain(arrl,0,arrw)})}else{css.width="100%";if(s.display=="top")t=st;else if(s.display=="bottom")t=st+wh-mh}css.top=t<0?0:t;css.left=l;d.css(css);$(".dw-persp",dw).height(0).height(t+mh>$(document).height()?t+mh:$(document).height());if(scroll&&(t+mh>st+wh||at>st+wh))$(window).scrollTop(t+mh-wh)};that.enable=function(){s.disabled=false;if(input)elm.prop("disabled",false)};that.disable=function(){s.disabled=true;if(input)elm.prop("disabled",
true)};that.setValue=function(values,fill,time,temp){that.temp=$.isArray(values)?values.slice(0):s.parseValue.call(e,values+"",that);setVal(fill,time,false,temp)};that.getValue=function(){return that.values};that.getValues=function(){var ret=[],i;for(i in that._selectedValues)ret.push(that._selectedValues[i]);return ret};that.changeWheel=function(idx,time){if(dw){var i=0,nr=idx.length;$.each(s.wheels,function(j,wg){$.each(wg,function(k,w){if($.inArray(i,idx)>-1){wheels[i]=w;$(".dw-ul",dw).eq(i).html(generateWheelItems(i));
nr--;if(!nr){that.position();scrollToPos(time,undefined,true);return false}}i++});if(!nr)return false})}};that.isVisible=function(){return visible};that.tap=function(el,handler){var startX,startY;if(s.tap)el.on("touchstart.dw",function(e){e.preventDefault();startX=getCoord(e,"X");startY=getCoord(e,"Y")}).on("touchend.dw",function(e){if(Math.abs(getCoord(e,"X")-startX)<20&&Math.abs(getCoord(e,"Y")-startY)<20)handler.call(this,e);tap=true;setTimeout(function(){tap=false},300)});el.on("click.dw",function(e){if(!tap)handler.call(this,
e)})};that.show=function(prevAnim){if(s.disabled||visible)return false;if(s.display=="top")anim="slidedown";if(s.display=="bottom")anim="slideup";read();event("onBeforeShow",[]);var lbl,l=0,mAnim="";if(anim&&!prevAnim)mAnim="dw-"+anim+" dw-in";var html='\x3cdiv role\x3d"dialog" class\x3d"'+s.theme+" dw-"+s.display+(prefix?" dw"+prefix:"")+'"\x3e'+(s.display=="inline"?'\x3cdiv class\x3d"dw dwbg dwi"\x3e\x3cdiv class\x3d"dwwr"\x3e':'\x3cdiv class\x3d"dw-persp"\x3e\x3cdiv class\x3d"dwo"\x3e\x3c/div\x3e\x3cdiv class\x3d"dw dwbg '+
mAnim+'"\x3e\x3cdiv class\x3d"dw-arrw"\x3e\x3cdiv class\x3d"dw-arrw-i"\x3e\x3cdiv class\x3d"dw-arr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"dwwr"\x3e\x3cdiv aria-live\x3d"assertive" class\x3d"dwv'+(s.headerText?"":" dw-hidden")+'"\x3e\x3c/div\x3e')+'\x3cdiv class\x3d"dwcc"\x3e';$.each(s.wheels,function(i,wg){html+='\x3cdiv class\x3d"dwc'+(s.mode!="scroller"?" dwpm":" dwsc")+(s.showLabel?"":" dwhl")+'"\x3e\x3cdiv class\x3d"dwwc dwrc"\x3e\x3ctable cellpadding\x3d"0" cellspacing\x3d"0"\x3e\x3ctr\x3e';
$.each(wg,function(j,w){wheels[l]=w;lbl=w.label!==undefined?w.label:j;html+='\x3ctd\x3e\x3cdiv class\x3d"dwwl dwrc dwwl'+l+'"\x3e'+(s.mode!="scroller"?'\x3cdiv class\x3d"dwb-e dwwb dwwbp" style\x3d"height:'+hi+"px;line-height:"+hi+'px;"\x3e\x3cspan\x3e+\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"dwb-e dwwb dwwbm" style\x3d"height:'+hi+"px;line-height:"+hi+'px;"\x3e\x3cspan\x3e\x26ndash;\x3c/span\x3e\x3c/div\x3e':"")+'\x3cdiv class\x3d"dwl"\x3e'+lbl+'\x3c/div\x3e\x3cdiv tabindex\x3d"0" aria-live\x3d"off" aria-label\x3d"'+
lbl+'" role\x3d"listbox" class\x3d"dwww"\x3e\x3cdiv class\x3d"dww" style\x3d"height:'+s.rows*hi+"px;min-width:"+s.width+'px;"\x3e\x3cdiv class\x3d"dw-ul"\x3e';html+=generateWheelItems(l);html+='\x3c/div\x3e\x3cdiv class\x3d"dwwol"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"dwwo"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"dwwol"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/td\x3e';l++});html+="\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/div\x3e"});html+="\x3c/div\x3e"+(s.display!="inline"?'\x3cdiv class\x3d"dwbc'+
(s.button3?" dwbc-p":"")+'"\x3e\x3cspan class\x3d"dwbw dwb-s"\x3e\x3cspan class\x3d"dwb dwb-e" role\x3d"button" tabindex\x3d"0"\x3e'+s.setText+"\x3c/span\x3e\x3c/span\x3e"+(s.button3?'\x3cspan class\x3d"dwbw dwb-n"\x3e\x3cspan class\x3d"dwb dwb-e" role\x3d"button" tabindex\x3d"0"\x3e'+s.button3Text+"\x3c/span\x3e\x3c/span\x3e":"")+'\x3cspan class\x3d"dwbw dwb-c"\x3e\x3cspan class\x3d"dwb dwb-e" role\x3d"button" tabindex\x3d"0"\x3e'+s.cancelText+"\x3c/span\x3e\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e":
"")+"\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e";dw=$(html);scrollToPos();event("onMarkupReady",[dw]);if(s.display!="inline"){dw.appendTo("body");if(anim&&!prevAnim){dw.addClass("dw-trans");setTimeout(function(){dw.removeClass("dw-trans").find(".dw").removeClass(mAnim)},350)}}else if(elm.is("div"))elm.html(dw);else dw.insertAfter(elm);event("onMarkupInserted",[dw]);visible=true;theme.init(dw,that);if(s.display!="inline"){that.tap($(".dwb-s span",dw),function(){that.select();ueppscript(from_wnd,"content",
"set_value_time('"+that.val+"')");closewin()});that.tap($(".dwb-c span",dw),function(){that.cancel();closewin()});if(s.button3)that.tap($(".dwb-n span",dw),s.button3);$(window).on("keydown.dw",function(e){if(e.keyCode==13)that.select();else if(e.keyCode==27)that.cancel()});if(s.scrollLock)dw.on("touchmove touchstart",function(e){if(lock)e.preventDefault()});$("input,select,button").each(function(){if(!this.disabled){if($(this).attr("autocomplete"))$(this).data("autocomplete",$(this).attr("autocomplete"));
$(this).addClass("dwtd").prop("disabled",true).attr("autocomplete","off")}});that.position();$(window).on("orientationchange.dw resize.dw scroll.dw",function(e){clearTimeout(debounce);debounce=setTimeout(function(){var scroll=e.type=="scroll";if(scroll&&lock||!scroll)that.position(!scroll)},100)});that.alert(s.ariaDesc)}$(".dwwl",dw).on("DOMMouseScroll mousewheel",onScroll).on(START_EVENT,onStart).on("keydown",onKeyDown).on("keyup",onKeyUp);dw.on(START_EVENT,".dwb-e",onBtnStart).on("keydown",".dwb-e",
function(e){if(e.keyCode==32){e.preventDefault();e.stopPropagation();$(this).click()}});event("onShow",[dw,v])};that.hide=function(prevAnim,btn){if(!visible||event("onClose",[v,btn])===false)return false;$(".dwtd").each(function(){$(this).prop("disabled",false).removeClass("dwtd");if($(this).data("autocomplete"))$(this).attr("autocomplete",$(this).data("autocomplete"));else $(this).removeAttr("autocomplete")});if(dw){if(s.display!="inline"&&anim&&!prevAnim){dw.addClass("dw-trans").find(".dw").addClass("dw-"+
anim+" dw-out");setTimeout(function(){dw.remove();dw=null},350)}else{dw.remove();dw=null}$(window).off(".dw")}pixels={};visible=false;preventShow=true;elm.focus()};that.select=function(){if(that.hide(false,"set")!==false){setVal(true,0,true);event("onSelect",[that.val])}};that.alert=function(txt){aria.text(txt);clearTimeout(alertTimer);alertTimer=setTimeout(function(){aria.text("")},5E3)};that.cancel=function(){if(that.hide(false,"cancel")!==false)event("onCancel",[that.val])};that.init=function(ss){theme=
extend({defaults:{},init:empty},ms.themes[ss.theme||s.theme]);lang=ms.i18n[ss.lang||s.lang];extend(settings,ss);extend(s,theme.defaults,lang,settings);that.settings=s;elm.off(".dw");var preset=ms.presets[s.preset];if(preset){pres=preset.call(e,that);extend(s,pres,settings)}m=Math.floor(s.rows/2);hi=s.height;anim=s.animate;if(visible)that.hide();if(1||s.display=="inline")that.show();else{read();if(input){if(readOnly===undefined)readOnly=e.readOnly;e.readOnly=true;if(s.showOnFocus)elm.on("focus.dw",
function(){if(!preventShow)that.show();preventShow=false})}if(s.showOnTap)that.tap(elm,function(){that.show()})}};that.trigger=function(name,params){return event(name,params)};that.option=function(opt,value){var obj={};if(typeof opt==="object")obj=opt;else obj[opt]=value;that.init(obj)};that.destroy=function(){that.hide();elm.off(".dw");delete scrollers[e.id];if(input)e.readOnly=readOnly};that.getInst=function(){return that};that.values=null;that.val=null;that.temp=null;that._selectedValues={};that.init(settings)}
function testProps(props){var i;for(i in props)if(mod[props[i]]!==undefined)return true;return false}function testPrefix(){var prefixes=["Webkit","Moz","O","ms"],p;for(p in prefixes)if(testProps([prefixes[p]+"Transform"]))return"-"+prefixes[p].toLowerCase();return""}function testTouch(e){if(e.type==="touchstart")touch=true;else if(touch){touch=false;return false}return true}function getCoord(e,c){var org=e.originalEvent,ct=e.changedTouches;return ct||org&&org.changedTouches?org?org.changedTouches[0]["page"+
c]:ct[0]["page"+c]:e["page"+c]}function constrain(val,min,max){return Math.max(min,Math.min(val,max))}function convert(w){var ret={values:[],keys:[]};$.each(w,function(k,v){ret.keys.push(k);ret.values.push(v)});return ret}function init(that,options,args){var ret=that;if(typeof options==="object")return that.each(function(){if(!this.id){uuid+=1;this.id="mobiscroll"+uuid}scrollers[this.id]=new Scroller(this,options)});if(typeof options==="string")that.each(function(){var r,inst=scrollers[this.id];if(inst&&
inst[options]){r=inst[options].apply(this,Array.prototype.slice.call(args,1));if(r!==undefined){ret=r;return false}}});return ret}var move,tap,touch,alertTimer,aria,date=new Date,uuid=date.getTime(),scrollers={},empty=function(){},mod=document.createElement("modernizr").style,has3d=testProps(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),prefix=testPrefix(),pr=prefix.replace(/^\-/,"").replace("moz","Moz"),extend=$.extend,START_EVENT="touchstart mousedown",
MOVE_EVENT="touchmove mousemove",END_EVENT="touchend mouseup",defaults={width:70,height:40,rows:3,delay:300,disabled:false,readonly:false,showOnFocus:true,showOnTap:true,showLabel:true,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",ariaDesc:"Select a value",scrollLock:true,tap:true,speedUnit:.0012,timeUnit:.1,formatResult:function(d){return d.join(" ")},parseValue:function(value,inst){var val=value.split(" "),ret=[],
i=0,keys;$.each(inst.settings.wheels,function(j,wg){$.each(wg,function(k,w){w=w.values?w:convert(w);keys=w.keys||w.values;if($.inArray(val[i],keys)!==-1)ret.push(val[i]);else ret.push(keys[0]);i++})});return ret}};$(function(){aria=$('\x3cdiv class\x3d"dw-hidden" role\x3d"alert"\x3e\x3c/div\x3e').appendTo("body")});$(document).on("mouseover mouseup mousedown click",function(e){if(tap){e.stopPropagation();e.preventDefault();return false}});$.fn.mobiscroll=function(method){extend(this,$.mobiscroll.shorts);
return init(this,method,arguments)};$.mobiscroll=$.mobiscroll||{setDefaults:function(o){extend(defaults,o)},presetShort:function(name){this.shorts[name]=function(method){return init(this,extend(method,{preset:name}),arguments)}},has3d:has3d,shorts:{},presets:{},themes:{},i18n:{}};$.scroller=$.scroller||$.mobiscroll;$.fn.scroller=$.fn.scroller||$.fn.mobiscroll})(jQuery);