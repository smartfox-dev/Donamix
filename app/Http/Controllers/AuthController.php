<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Validator;
use Laravel\Socialite\Facades\Socialite;
use Mail;
use App\Mail\OtpMail;
use Illuminate\Support\Carbon;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $requestData = $request->all();
        $validator = Validator::make($requestData ,[
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $user = User::where('email', $request->email)->orWhere('username', $request->username)->first();
        if(!$user) {
            return response()->json(['message' => 'Failed username or email doesn\'t exist.'], 401);
        }

        if(! auth()->attempt($requestData)){
            return response()->json(['message' => 'Failed Password is incorrect!'], 401);
        }

        if(!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email Not Verified...'], 401);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['message' => 'success', 'token' => $accessToken], 200);
    }


    public function register(Request $request){

        $request->validate([
            'email' => 'required|string|email|unique:users',
            'password' => [
                'required',
                'string',
                'max:100',
                'min:8',             // must be at least 8 characters in length
            ],
            'name' => 'required|string',
            'username' => 'required|string',
            'gender' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string'
        ]);

        $name_parts = explode(" ", $request->name);


        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'firstName' => $name_parts[0],
            'lastName' => $name_parts[1],
            'username' => $request->username,
            'name' => $request->name,
            'birthday' => Carbon::now(),
            'city' => $request->city,
            'gender' => $request->gender,
            'slug' => 'slug',
            'interests' => 'interests',
            'description' => 'description',
            'country' => $request->country,
            'status' => 'single',
            'role' => 'Member',
            'is_blocked' => 0
        ]);

        // Mail::to($user)->send(new OtpMail($user));

        return response(['message' => 'success'], 200);
    }

    public function verifyotp(Request $request){
        $request->validate([
            'email' => 'required',
            'token' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('otp', $request->token)->first();

        if($user){
            $user->update([
                'email_verified_at' => now()
            ]);

            $accessToken = $user->createToken('authToken')->accessToken;

            return response(['message' => 'success', 'token' => $accessToken], 200);
        }

        return response(['message' => 'failed'], 200);
    }

    public function resendOtp(Request $request){
        $request->validate([
            'email' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if($user){

            $user->update([
                'otp' => rand ( 1000 , 9999 )
            ]);

            Mail::to($user)->send(new OtpMail($user));

            return response(['message' => 'success'], 200);
        }

        return response(['message' => 'failed'], 200);
    }



    public function thirdlogin(Request $request){

        $token = $request->accesstoken;
        $type = $request->type;

        $authUser = Socialite::driver($type)->userFromToken($token);

        $email = $authUser->getEmail();

        $user = User::where('email', $email)->first();

        //f user already existe

        if($user){

            $user->update([
                'email_verified_at' => now()
            ]);

            $accessToken = $user->createToken('authToken')->accessToken;

            return response(['message' => 'success', 'token' => $accessToken], 200);
        }


        //if is a new user

        $user = User::create([
            'email' => $authUser->email,
            'password' => '',
            'email_verified_at' => now(),
            'firstName' => $authUser->name,
            'username' => $authUser->name,
        ]);


        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['message' => 'success', 'token' => $accessToken], 200);
    }

    public function getinfo(Request $request){
        $user = $request->user();

        $user = [
            'id' => $user->id,
            'name' => $user->name,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'username' => $user->username,
            'email' => $user->email,
            'banner' => $user->banner,
            'avatar' => $user->avatar,
            'gender' => $user->gender,
            'status' => $user->status,
            'description' => $user->description,
            'country' => $user->country,
            'city' => $user->city,
            'role' => $user->role,
            'credit' => $user->credit,
            'birthday' => $user->birthday,
            'education' => [
                'university' => isset($user->education) ? $user->education->uni_name : '',
                'from' => isset($user->education) ? $user->education->from : '',
                'to' => isset($user->education) ? $user->education->to : '',
                'description' => isset($user->education) ? $user->education->description : '',
            ],
            'experience' => [
                'company' => isset($user->experience) ? $user->experience->company_name : '',
                'from' => isset($user->experience) ? $user->experience->from : '',
                'to' => isset($user->experience) ? $user->experience->to : '',
                'location' => isset($user->experience) ? $user->experience->city : '',
                'position' => isset($user->experience) ? $user->experience->position : '',
                'description' => isset($user->experience) ? $user->experience->description : '',
            ],
            'interests' => explode(',', $user->interests),
            'setting' => [
                'is_enable_friend_request' => $user->is_enable_friend_request == 1 ? true : false,
                'is_enable_private_message' => $user->is_enable_private_message == 1 ? true : false,
                'is_enable_tagging' => $user->is_enable_tagging == 1 ? true : false,
                'is_enable_private_profile' => $user->is_enable_private_profile == 1 ? true : false,
                'is_activate_account' => $user->is_activate_account == 1 ? true : false,
                'is_remove_ads' => $user->is_remove_ads == 1 ? true : false,
            ]
        ];

        return response(['message' => 'success', 'user' => $user], 200);
    }
}
