#Usage

You can overwrite the cookiemonster template if you inlcude a div with id="cookiemonster", preferably a text/template node. So it won't be visible on the page.

```
<script type="text/template" id="cookiemonster">
    <div class="container">
        <h2 class="cookiemonster__heading">{translate key="title.cookiemonster"}</h2>
        <p>{translate key="label.cookiemonster"}</p>
        <a href="#" class="cookiemonster__accept js-cookie-accept btn btn--sml">{translate key="button.cookiemonster"}</a>
    </div>
</script>
```
