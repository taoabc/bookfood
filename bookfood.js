// JavaScript Document
window.bookmeat = false;

init();

function init()
{
	if (!validate()) {
		return;
	}
	var doc = document.getElementsByName("mainfra")[0].contentDocument;
	var browser = GetBrowser();
	if (!FullBrowserSupport(doc, browser)) {
		return;
	}
	if (!alter(doc)) {
		return;
	}
}

function validate()
{
	if ("迅雷网络订饭系统" != document.title) {
		alert("将引导至点餐系统，请进入系统后再次点击。");
		location = "http://10.10.32.27:8081/xlfood/dingfan.html"; 
		return false;
	}
	var e = document.getElementsByName("mainfra")[0];
	if (null == e || undefined == e) {
		alert("尼玛订饭系统更改了，该脚本暂时失效，速度联系我。");
		return false;
	}
	var doc = e.contentDocument;
	var employee = doc.getElementById("employee");
	if (null == employee || undefined == employee) {
		alert("请先点选  ‘我要订饭’");
		return false;
	}
	return true;
}

function alter(doc)
{
	var employee = doc.getElementById("employee");
	var account = doc.getElementById("account");
	account.value = Math.floor(Math.random()*100000);

	account.value = Math.floor(Math.random()*100000);
	employee.readOnly = false;
	var btn = doc.getElementsByName("Submit")[0];
	btn.addEventListener("click", OnSubmit, false);
	alert("开始点吧！");
	return true;
}

function GetBrowser()
{
	var browser = new Array();
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/firefox\/[\d.]+/g)) ? browser.firefox = s[0].substr(8) : null;
	(s = ua.match(/msie\s[\d.]+/g)) ? browser.ie = s[0].substr(5) : null;
	(s = ua.match(/chrome\/[\d.]+/g)) ? browser.chrome = s[0].substr(7) : null;

	return browser;
}

function FullBrowserSupport(doc, browser)
{
	var bSupport = false;
	if (null != browser.ie) {
		alert("本人IE版本过高，不方便调试，故暂不支持IE。");
		bSupport = false;
	} else if (null != browser.firefox) {
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.onclick = OnTdClick;
			td.style.cursor = "pointer";
			//td.addEventListener("click", OnTdClick, false);
		}
		bSupport = true;
	} else if (null != browser.chrome) {
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.style.cursor = "pointer";
		}
		bSupport = true;
	}
	return bSupport;
}

function OnTdClick(e)
{
	var td = e.target;
	var tbl = td.parentElement.parentElement.parentElement.parentElement;
	var strName = tbl.getElementsByClassName("eateryname")[0].innerHTML;
	var doc = document.getElementsByName("mainfra")[0].contentDocument;
	var form1 = doc.getElementsByName("form1")[0];
	form1.restaurant.value = strName;
	form1.food.value = td.innerHTML;
}

function OnSubmit(e)
{
	var doc = document.getElementsByName("mainfra")[0].contentDocument;
	var account = doc.getElementById("account");
	account.value = Math.floor(Math.random()*100000);
}