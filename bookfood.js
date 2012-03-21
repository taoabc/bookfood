// JavaScript Document
window.bookmeat = false;

function init()
{
	if (!validate()) {
		return;
	}
}

function validate()
{
	alert("由于某些原因，本脚本只起引导作用。请不要再尝试使用本脚本点餐，谢谢合作！");
	if ("迅雷网络订饭系统" != document.title) {
		location = "http://10.10.32.27:8081/xlfood/dingfan.html"; 
	}
	return false;
}

init();