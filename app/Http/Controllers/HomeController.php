<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class HomeController extends Controller
{

    public function getbirthdays(Request $request)
    {
        $requestData = $request->all();
        $users = User::whereMonth('birthday', '=', date('m'))->whereDay('birthday', '=', date('d'))->get();
        $users = $users->map(function($user){
            return [
                'avatar' => $user->avatar,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'role' => $user->role,
            ];
        });

        return response(['message' => 'success', 'data' => $users], 200);
    }

}
