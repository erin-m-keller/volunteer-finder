function switchLogin(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  console.log(tablinks);
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.toggle('is-active');
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " is-active";
}