document.onclick = check;

function check(e){
var userMenuDiv = document.getElementById("userMenu");
var userMenu = document.getElementById("userButton");
var helpMenuDiv = document.getElementById("menu-content");
 var helpMenu = document.getElementById("menu-toggle");

  var target = (e && e.target) || (e && e.srcElement);

  //User Menu
  if (!checkParent(target, userMenuDiv)) {
	// click NOT on the menu
	if (checkParent(target, userMenu)) {
	  // click on the link
	  if (userMenuDiv.classList.contains("invisible")) {
		userMenuDiv.classList.remove("invisible");
	  } else {userMenuDiv.classList.add("invisible");}
	} else {
	  // click both outside link and outside menu, hide menu
	  userMenuDiv.classList.add("invisible");
	}
  }

   //Help Menu
   if (!checkParent(target, helpMenuDiv)) {
	// click NOT on the menu
	if (checkParent(target, helpMenu)) {
	  // click on the link
	  if (helpMenuDiv.classList.contains("hidden")) {
		helpMenuDiv.classList.remove("hidden");
	  } else {helpMenuDiv.classList.add("hidden");}
	} else {
	  // click both outside link and outside menu, hide menu
	  helpMenuDiv.classList.add("hidden");
	}
   }

}

function checkParent(t, elm) {
  while(t.parentNode) {
	if( t == elm ) {return true;}
	t = t.parentNode;
  }
  return false;
}