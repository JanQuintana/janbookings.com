<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/booking/create' => [[['_route' => 'api_booking_create', '_controller' => 'App\\Controller\\ApiController::createBooking'], null, ['POST' => 0], null, false, false, null]],
        '/api/bookings' => [[['_route' => 'api_bookings_get', '_controller' => 'App\\Controller\\ApiController::getBookings'], null, ['GET' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api/booking/(?'
                    .'|([^/]++)(*:31)'
                    .'|delete/([^/]++)(*:53)'
                .')'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:89)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        31 => [[['_route' => 'api_booking_update', '_controller' => 'App\\Controller\\ApiController::updateBooking'], ['id'], ['PUT' => 0], null, false, true, null]],
        53 => [[['_route' => 'api_booking_delete', '_controller' => 'App\\Controller\\ApiController::deleteBooking'], ['id'], ['DELETE' => 0], null, false, true, null]],
        89 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
