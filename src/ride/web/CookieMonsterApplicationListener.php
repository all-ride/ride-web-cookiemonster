<?php

namespace ride\web;

use ride\library\event\Event;
use ride\library\mvc\view\HtmlView;

/**
 * Listener to hook the cookiemonster into Ride
 */
class CookieMonsterApplicationListener {

    /**
     * Path to the javascript
     * @var string
     */
    const SCRIPT_COOKIEMONSTER = 'js/cookiemonster.js';

    /**
     * Path to the javascript
     * @var string
     */
    const SCRIPT_TRANSLATOR = 'js/translator.js';

    /**
     * Event listener to add the cookiemonster to the response if applicable
     * @param ride\library\mvc\Request $request
     * @param ride\library\mvc\Response $response
     */
    public function addCookieMonster(Event $event) {
        $web = $event->getArgument('web');

        $request = $web->getRequest();
        $response = $web->getResponse();

        $view = $response->getView();
        if (!$view || !$view instanceof HtmlView) {
            return;
        }

        $cookies = $response->getCookies();
        $cookies += $request->getCookies();

        foreach ($cookies as $name => $cookie) {
            if (strpos($name, '__') === 0) {
                unset($cookies[$name]);
            }
        }

        if ($cookies) {
            $view->addJavascript($request->getBaseUrl() . '/' . self::SCRIPT_TRANSLATOR);
            $view->addJavascript($request->getBaseUrl() . '/' . self::SCRIPT_COOKIEMONSTER);
        }
    }

}
