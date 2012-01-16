// JavaScript Document
window.bookmeat = false;

init();

function init() {
	if (!validate()) {
		return;
	}
	var doc = document.getElementsByName("mainfra")[0].contentDocument;
	if (!alter(doc)) {
		return;
	}
}

function validate() {
	if ("迅雷网络订饭系统" != document.title) {
		alert("请先进入订饭系统！");
		return false;
	}
	var e = document.getElementsByName("mainfra")[0];
	if (null == e || "undefined" == typeof (e)) {
		alert("脚本失效，请提交BUG，待作者升级。");
		return false;
	}
	var doc = e.contentDocument;
	var employee = doc.getElementById("employee");
	if (null == employee || "undefined" == typeof (employee)) {
		alert("请点选  ‘我要订饭’");
		return false;
	}
	return true;
}

function alter(doc) {
	var employee = doc.getElementById("employee");
	var account = doc.getElementById("account");
	account.value = Math.floor(Math.random()*100000);
	employee.readOnly = false;
	alert("现在可以试一下订饭了哟，亲~");
	return true;
}