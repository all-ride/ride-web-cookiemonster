# Ride: Web Cookiemonster

This module adds a message to the HTML view when cookies are used.
This to comply with the EU regulations about cookies.

## Usage

You can overwrite the cookiemonster template if you include a div with id="cookiemonster", preferably a text/template node. 
So it won't be visible on the page.

```html
<script type="text/template" id="cookiemonster">
    <div class="container">
        <h2 class="cookiemonster__heading">{translate key="title.cookiemonster"}</h2>
        <p>{translate key="label.cookiemonster"}</p>
        <a href="#" class="cookiemonster__accept js-cookie-accept btn btn--sml">{translate key="button.cookiemonster"}</a>
    </div>
</script>
```

## Parameters 

* __cookiemonster.force__: Flag to see if the cookiemonster omits the cookie check

## Related Modules 

- [ride/app](https://github.com/all-ride/ride-app)
- [ride/app-i18n](https://github.com/all-ride/ride-app-i18n)
- [ride/lib-event](https://github.com/all-ride/ride-lib-event)
- [ride/lib-mvc](https://github.com/all-ride/ride-lib-mvc)
- [ride/web](https://github.com/all-ride/ride-web)
- [ride/web-i18n-expose](https://github.com/all-ride/ride-web-i18n-expose)

## Installation

You can use [Composer](http://getcomposer.org) to install this application.

```
composer require ride/web-cookiemonster
```
