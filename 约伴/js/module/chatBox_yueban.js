function openImgBox(sourceType){api.getPicture({sourceType:sourceType,encodingType:"jpg",mediaValue:"pic",quality:10,destinationType:"base64",allowEdit:false},function(ret,err){if(ret){var imgbase64=ret.base64Data;diyImgChat(imgbase64)}})}
function diyImgChat(imgbase64){if(imgbase64!=null&&imgbase64!=""){uexWindow.toast("1","5","\u53d1\u9001\u4e2d...","");var api_url=yh_talk_server+"img/save.do";var paramsArray=[];var param1={};param1.type="0";param1.key="key";param1.value="c4ca4238a0b923820dcc509a6f75849b";paramsArray[0]=param1;var param2={};param2.type="0";param2.key="imgbase64";param2.value=imgbase64;paramsArray[1]=param2;var param3={};param3.type="0";param3.key="biztype";param3.value="0";paramsArray[2]=param3;var param4={};param4.type=
"0";param4.key="bizid";param4.value=getstorage("currentRoomId");paramsArray[3]=param4;var param5={};param5.type="0";param5.key="uid";param5.value=getstorage("UID");paramsArray[4]=param5;$.getJSON(api_url,function(data){uexWindow.closeToast();var status=data.status;if(status=="1"){var imgid=data.imgid;setstorage("msg","[01]"+imgid);uexWindow.evaluatePopoverScript("msg_detail_yb","content","sendMsg()")}else alert("\u53d1\u9001\u56fe\u7247\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u64cd\u4f5c\u3002")},"json",
function(data){uexWindow.closeToast();alert("\u53d1\u9001\u56fe\u7247\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u64cd\u4f5c\u3002")},"POST",paramsArray,false)}}
function diyChat(sendMsg){if(sendMsg==""){api.alert({title:"\u63d0\u793a",msg:"\u4e0d\u80fd\u8f93\u5165\u7a7a\u5b57\u7b26"});return}if(sendMsg.indexOf("@")>=0){api.alert({title:"\u63d0\u793a",msg:"\u4e0d\u80fd\u8f93\u5165\u7279\u6b8a\u5b57\u7b26@"});return}if(sendMsg.indexOf("#")>=0){api.alert({title:"\u63d0\u793a",msg:"\u4e0d\u80fd\u8f93\u5165\u7279\u6b8a\u5b57\u7b26#"});return}setstorage("msg","[00]"+sendMsg);uexWindow.evaluatePopoverScript("msg_detail_yb","content","sendMsg()")};