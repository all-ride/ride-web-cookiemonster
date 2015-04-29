/* Author: Statik */

// Create the cookie
var __cookieCheckerCookieName = '__cookieCheckerCookieName',
    __cookieCheckerCookieVal = '__pageIsVisited';

function createCookie(cookie_name,cookie_value,cookie_days) {
	if (cookie_days) {
		var date = new Date();
		date.setTime(date.getTime()+(cookie_days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = cookie_name+"="+cookie_value+expires+"; path=/";
}

// Function to get the cookie value
function getCookie(cookie_name) {
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if (results)
    return (unescape(results[2]));
  else
    return null;
}

// Function to add the html when necessary
function addElements() {

// Wrapper

  var head = document.getElementsByTagName('head')[0],
      wrapperdiv = document.createElement('div'),
      wrapperid = 'cookie-wrapper';
      wrapperdiv.setAttribute('id', wrapperid);

  // Append to the body
  if (document.body.firstChild)
    document.body.insertBefore(wrapperdiv, document.body.firstChild);
  else
    document.body.appendChild(wrapperdiv);

// Container

  var containerdiv = document.createElement('div'),
      containerid = 'cookie-container';
  containerdiv.setAttribute('id', containerid);

  // Append to the wrapper
  document.getElementById(wrapperid).appendChild(containerdiv);


// Heading

  var heading = document.createElement('h1');
  document.getElementById(containerid).appendChild(heading);
  heading.innerHTML = rideApp.translator.translate('title.cookiemonster');

// Explanation

  var p = document.createElement('p');
  document.getElementById(containerid).appendChild(p);
  p.innerHTML = rideApp.translator.translate('label.cookiemonster');

// Acceptbutton

  var btn = document.createElement('a'),
      btnid = 'acceptcookies';

  document.getElementById(containerid).appendChild(btn);
  btn.setAttribute('id', btnid);
  btn.setAttribute('href', '#');
  btn.innerHTML = rideApp.translator.translate('button.cookiemonster');

  rideApp.translator.submitTranslationKeys();

  function agreeToTheCookieTerms() {

    document.body.removeChild(wrapperdiv);
    createCookie(__cookieCheckerCookieName, __cookieCheckerCookieVal, '365');
  }

  btn.onclick=agreeToTheCookieTerms;

// Close

  var close = document.createElement('span');
  document.getElementById(containerid).appendChild(close);
  close.innerHTML = '&times;  '

  close.onclick = function() {
    document.body.removeChild(wrapperdiv);
  };

// Add styling

  var style = document.createElement('style'),
      wrappercss = '#cookie-wrapper { position: relative; z-index: 999; padding: 20px; background: #242424; border-bottom: 2px solid #eaeaea; color: #eaeaea; font-family: Arial, sans-serif; font-size: 13px; } \n';
      wrappercss += '#cookie-container { position: relative; width: 700px; margin: 0 auto; } \n';
      wrappercss += '#cookie-container h1 { margin: 0; } \n';
      wrappercss += '#cookie-container span { position: absolute; right: 0; top: 0; display: block; width: 10px; height: 10px; cursor: pointer; } \n';
      wrappercss += '#cookie-container span:hover, #cookiecontainer a:hover { color: #a6a6a6; } \n';
      wrappercss += '#cookie-container a { color: #fff; text-decoration: none; }'

  style.type = 'text/css';
  style.appendChild(document.createTextNode(wrappercss));
  head.appendChild(style);

};

// Check the cookie value
function checkCookieAndDoMagic() {
  var checkCookie = getCookie(__cookieCheckerCookieName);
  // If the cookie is not set
  if (checkCookie == null) {
    addElements();
  }
}

function eraseCookie(cookie_name) {
	createCookie(cookie_name,'','-1');
	addElements();
}

window.onload = checkCookieAndDoMagic;
