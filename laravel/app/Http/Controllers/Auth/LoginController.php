<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Admin;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
	
	// apin käyttämä login
	public function apilogin(Request $request)
	{
		$this->validateLogin($request);

		if ($this->attemptLogin($request)) {
			$user = $this->guard()->user();
			$user->generateToken();
			
			return response()->json([
				'data' => $user->toArray(), 'ruuvitags' => $user->ruuvitags(),
			]);
		}

		return $this->sendFailedLoginResponse($request);
    }
    //admin panelin käyttämä login
	public function login(Request $request)
	{
		info($request->route('id'));
		info($request);
		$this->validateLogin($request);

		if ($this->attemptLogin($request)) {
			$user = $this->guard()->user();
			//$user->generateToken();
		}

		if (Admin::admins($user->id) == true)
		{
			info('LOGGED IN');
			return view('home');
		}
		else
		{
			Auth::logout();
			return view('welcome', ['message' => 'Permission denied, you are not admin']);
		}
    }
	//apin kätyyämä logout
	public function apilogout(Request $request)
	{
		$user = Auth::guard('api')->user();

		if ($user) {
			$user->api_token = null;
			$user->save();
			Auth::logout();
			return response()->json(['message' => 'User logged out.'], 200);
		}
		
		return response()->json(['message' => 'Logout failed.'], 401);

		
	}
	//admin panelin käyttämä logout
	public function logout(Request $request)
	{
		$user = Auth::guard()->user();

		if ($user) {
			$user->save();
			Auth::logout();
			//return response()->json(['message' => 'User logged out.'], 200);
			return view('welcome');
		}
		
		return response()->json(['message' => 'Logout failed.'], 401);

		
	}
	
	
	
}
