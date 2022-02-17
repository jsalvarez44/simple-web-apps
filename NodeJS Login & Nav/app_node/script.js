function startDateTime() {
  today = new Date();
  D = today.getDate();
  M = today.getMonth() + 1;
  Y = today.getFullYear();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  m = check(m);
  s = check(s);
  D = check(D);
  M = check(M);
  document.getElementById("dateTime").innerHTML =
    "Fecha actual: " +D + "/" + M + "/" + Y + " " + h + ":" + m + ":" + s;
  t = setTimeout("startDateTime()", 500);
}
function check(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function readUser() {
  var archiveTxt = new XMLHttpRequest();
  var path = "activeUser.txt";

  archiveTxt.open("GET", path, false);
  archiveTxt.send(null);

  var data = archiveTxt.responseText;
  document.getElementById("activeUser").innerHTML =
    "<p><strong>Usuario activo:</strong> " + data + "</p>";
}
window.onload = function () {
  startDateTime();
  readUser();
};
