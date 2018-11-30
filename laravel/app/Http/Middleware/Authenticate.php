<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
	
	//Virheilmoitusta ilmeisesti koska named route, nyt palauttaa view.
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return view('getdisabled');
        }
    }
}
