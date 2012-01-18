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
	if (null == doc || undefined == doc) {
		alert("请先点选  '我要订饭'");
		return false;
	}
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
	var area = GetArea();
	if ("xlfood" == area) {
		ShowAccountInputLine(doc);
		return false;
	} else if ("dazu" == area) {
		account.value = Math.floor(Math.random()*100000);
	}
	employee.readOnly = false;
	//add submit handler
	var btn = doc.getElementsByName("Submit")[0];
	btn.addEventListener("click", OnSubmit, false);
	alert("开始点吧！");
	return true;
}

function GetBrowser()
{
	var browser = new Array();
	var ua = navigator.userAgent;
	var relation = new Array(
		new Array("chrome", /chrome\/([\d\.]+)/gi),
		new Array("firefox", /firefox\/([\d\.]+)/gi),
		new Array("ie", /msie\s([\d\.]+)/gi)
	);
	for (var i = 0; i < relation.length; ++i) {
		var r = relation[i];
		s = r[1].exec(ua);
		if (null != s) {
			browser["type"] = r[0];
			browser["version"] = s[1];
			break;
		}
	}
	return browser;
}

function FullBrowserSupport(doc, browser)
{
	var bSupport = false;
	switch(browser["type"]) {
	case "ie":
		alert("本人IE版本过高，不方便调试，故暂不支持IE。");
		bSupport = false;
		break;
	case "firefox":
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.onclick = OnTdClick;
			td.style.cursor = "pointer";
			//td.addEventListener("click", OnTdClick, false);
		}
		bSupport = true;
		break;
	case "chrome":
		var tds = doc.getElementsByTagName("td");
		for (var i = 0; i < tds.length; ++i) {
			td = tds[i];
			td.style.cursor = "pointer";
		}
		bSupport = true;
		break;
	default:
		break;
	}
	return bSupport;
}

function OnTdClick(e)
{
	var td = e.target;
	var tbl = td.parentNode.parentNode.parentNode.parentNode;
	var strName = tbl.getElementsByClassName("eateryname")[0].innerHTML;
	var doc = document.getElementsByName("mainfra")[0].contentDocument;
	var form1 = doc.getElementsByName("form1")[0];
	form1.restaurant.value = strName;
	form1.food.value = td.innerHTML;
}

/*
** add auto change account value
** only for dazu
*/
function OnSubmit(e)
{
	if ("dazu" == GetArea()) {
		var doc = document.getElementsByName("mainfra")[0].contentDocument;
		var account = doc.getElementById("account");
		account.value = Math.floor(Math.random()*100000);
	}
}

/*
** get area of company
** return
**   [string]
*/
function GetArea()
{
	return location.href.match(/\w+(?=\/$)/gi);
}

function ShowAccountInputLine(doc)
{
	var p = doc.createElement("p");
	var txt = doc.createTextNode("账号：");
	var rtxname = doc.createElement("input");
	var txtAttention = doc.createTextNode(
		" （注意：软件园订餐需要提供RTX账号，请在这里填入"  
	);
	
	var txtSpan = doc.createElement("span");
	txtSpan.style["color"] = "orange";
	var tmp = doc.createTextNode("姓名栏中对应的RTX账号）");
	txtSpan.appendChild(tmp);
	
	rtxname.type = "text";
	rtxname.id = "rtxname";
	rtxname.style["font-size"] = "12px";
	p.style["color"] = "green";
	p.appendChild(txt);
	p.appendChild(rtxname);
	p.appendChild(txtAttention);
	p.appendChild(txtSpan);
	
	//find a postion to add
	var employee = doc.getElementById("employee");
	var container = employee.parentNode.parentNode;
	tmp = employee.parentNode.nextSibling;
	container.insertBefore(p, tmp);
	
	//attach onchange handler
	var account = doc.getElementById("account");
	rtxname.onkeyup = function(e) {
		account.value = rtxname.value;
	}
}