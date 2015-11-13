<?php

namespace ride\web;

use ride\library\event\Event;
use ride\library\http\Request;
use ride\library\mvc\Response;
use ride\library\mvc\view\HtmlView;
use ride\library\mvc\view\View;

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
     * Flag to see if the cookie monster should be added no matter what
     * @var boolean
     */
    private $isForced;

    /**
     * Constructs the cookie monster
     * @param boolean $isForced
     * @return null
     */
    public function __construct($isForced = false) {
        $this->isForced = $isForced;
    }

    /**
     * Event listener to add the cookiemonster to the response if applicable
     * @param \ride\library\event\Event $event
     * @return null
     */
    public function addCookieMonster(Event $event) {
        $web = $event->getArgument('web');

        $request = $web->getRequest();
        $response = $web->getResponse();
        $view = $response->getView();

        if ($this->shouldAddCookieMonster($request, $response, $view)) {
            $view->addJavascript($request->getBaseUrl() . '/' . self::SCRIPT_TRANSLATOR);
            $view->addJavascript($request->getBaseUrl() . '/' . self::SCRIPT_COOKIEMONSTER);
        }
    }

    /**
     * Checks if the cookie monster should be added
     * @param \ride\library\http\Request $request
     * @param \ride\library\mvc\Response $response
     * @param \ride\library\mvc\view\View $view
     * @return boolean
     */
    private function shouldAddCookieMonster(Request $request, Response $response, View $view = null) {
        if (!$view || !$view instanceof HtmlView) {
            return false;
        } elseif ($this->isForced) {
            return true;
        }

        $cookies = $response->getCookies();
        $cookies += $request->getCookies();

        foreach ($cookies as $name => $cookie) {
            if (strpos($name, '__') === 0) {
                unset($cookies[$name]);
            }
        }

        if ($cookies) {
            return true;
        } else {
            return false;
        }
    }

}
