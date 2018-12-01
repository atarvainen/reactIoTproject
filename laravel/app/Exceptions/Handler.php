<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
     //https://www.toptal.com/laravel/restful-laravel-api-tutorial -tutorialista
     //Jos mallilla ei löydy tietokannasta, niin palauttaa json-muodossa 404-vastauksen. On siis helpommin koneluettava ja ei turhaan palauta html-sivua Reactille.0
    public function render($request, Exception $exception)
    {
      if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) 
      {
       return response()->json([
            'message' => 'Resource not found'
        ], 404);
      }
       
      return parent::render($request, $exception);
    }
	//https://www.toptal.com/laravel/restful-laravel-api-tutorial
	//Palauttaa virheen, jos kyselyssä ole ole authorization-otsaketta tai tilallisen yhdeyten (admin-paneeli) tapauksessa ei ole kirjautuneena. 
	protected function unauthenticated($request, AuthenticationException $exception)
	{
		return response()->json(['error' => 'Unauthenticated'], 401);
	}
	
	
	
	
}
