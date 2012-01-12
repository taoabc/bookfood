// JavaScript Document
window.bookmeat = false;
var doc = document.getElementsByName("mainfra")[0].contentDocument;
var employee = doc.getElementById("employee");
var account = doc.getElementById("account");
account.value = Math.floor(Math.random()*100000);
employee.readOnly = false;