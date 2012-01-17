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
	FullBrowserSupport(doc, browser);
	if (!alter(doc)) {
		return;
	}
}

function validate()
{
	if ("迅雷网络订饭系统" != document.title) {
		alert("请先进入订饭系统！");
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
	if (employee.readOnly) {
		account.value = Math.floor(Math.random()*100000);
		employee.readOnly = false;
		alert("开始点吧！");
	} else {
		alert("好像不需要更改，直接点试试");
	}
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
	if (null != browser.firefox) {
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.onclick = OnTdClick;
			td.style.cursor = "pointer";
			//td.addEventListener("click", OnTdClick, false);
		}
	} else if (null != browser.chrome) {
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.style.cursor = "pointer";
		}
	}
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
}