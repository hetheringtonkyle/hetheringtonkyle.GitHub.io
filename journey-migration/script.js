function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function contentVisible() {
  document.querySelector('h1').classList.remove('projectHeader');
  document.querySelector('h1').classList.add('projectHeader-Active');
  document.querySelector('.projectBody').classList.add('projectBody-Active');
  document.querySelector('.projectBody').classList.remove('projectBody');
}

window.onload = contentVisible;