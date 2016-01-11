/* Author: Statik */
(function(window) {
    'use strict';

    var CookieMonster = function() {
      var cookieWrapper;
      var __cookieCheckerCookieName = '__cookieCheckerCookieName';

      var _init = function() {
        var shouldRun = _getCookie(__cookieCheckerCookieName) ? false : true;
        if (shouldRun) {
          _renderCookieWrapper();
        } else {
          return;
        }

        document.body.addEventListener('click', _listener);
      };

      var _renderCookieWrapper = function() {
        var cookieTemplate = document.getElementById('cookiemonster');

        cookieWrapper = document.createElement('div');
        cookieWrapper.className = 'cookiemonster';
        cookieWrapper.innerHTML = '<div class="container">' +
          '<h2 class="cookiemonster__heading">' + rideApp.translator.translate('title.cookiemonster') + '</h2>' +
          '<p>' + rideApp.translator.translate('label.cookiemonster') + '</p>' +
          '<a href="#" class="cookiemonster__accept js-cookie-accept">' + rideApp.translator.translate('button.cookiemonster') + '</a>' +
          '<a href="#" class="cookiemonster__close js-cookie-close">&times;</a>' +
        '</div>';

        if (cookieTemplate) {
          cookieWrapper.innerHTML = cookieTemplate.innerHTML;
        }
        document.body.appendChild(cookieWrapper);
      };

      var _listener = function (event) {
        var element = event.target;
        if (!element) {
          return;
        }
        if (_hasClass(element, 'js-cookie-close')) {
          event.preventDefault();
          _removeCookieWrapper();
        } else if (_hasClass(element, 'js-cookie-accept')) {
          event.preventDefault();
          // 2678400000 miliseconds = 31 days
          _setCookie(__cookieCheckerCookieName, '365');
          _removeCookieWrapper();
        }
      };

      var _removeCookieWrapper = function() {
        document.body.removeChild(cookieWrapper);
      }

      var _hasClass = function(element, selector) {
        return element.className && new RegExp("(\\s|^)" + selector + "(\\s|$)").test(element.className);
      };

      var _getCookie = function(key) {
        if (!key) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      };
      var _setCookie = function(key, expireDays) {
        if (expireDays) {
          var date = new Date();
          date.setTime(date.getTime() + (expireDays*24*60*60*1000));
          var expires = date.toUTCString();
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent('true') + (expires ? '; expires=' + expires : "") + "; path=/";
      };

      return {
        init: _init
      };
    };

    var cookie = new CookieMonster();
    // window.onload = cookie.init();

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", cookie.init, false);
    }
})(window, undefined);

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || null;
}
