<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Album;
use App\Models\Media;
use App\Models\Friend;
use Illuminate\Http\Request;
use Hash;
use Validator;
use Mail;


class ProfileController extends Controller
{
    public function update(Request $request, $id){

        // $request->validate([
        //     'id' => 'required',
        //     'description' => 'required|string',
        // ]);

        $user = User::where('id', $request->id)->update([
            'avatar' => $request->avatar,
            'banner' => $request->banner,
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'description' => $request->description,
            'city' => $request->city,
            'country' => $request->country,
            'gender' => $request->gender,
            'status' => $request->status,
            'birthday' => $request->birthday,
            'interests' => implode(',', $request->interests),
            'birthday' => $request->birthday,
            'is_enable_friend_request' => $request->setting['is_enable_friend_request'],
            'is_enable_private_message' => $request->setting['is_enable_private_message'],
            'is_enable_tagging' => $request->setting['is_enable_tagging'],
            'is_enable_private_profile' =>$request->setting['is_enable_private_profile'],
            'is_activate_account' => $request->setting['is_activate_account'],
            'is_remove_ads' => $request->setting['is_remove_ads'],
        ]);

        Education::updateOrCreate(
            ['user_id' => $request->id],
            [
            'uni_name' => $request->education['university'],
            'from' => $request->education['from'],
            'to' => $request->education['to'],
            'description' => $request->education['description'],
            ]
        );

        Experience::updateOrCreate(
            ['user_id' => $request->id],
            [
            'company_name' => $request->experience['company'],
            'position' => $request->experience['position'],
            'city' => $request->experience['location'],
            'from' => $request->experience['from'],
            'to' => $request->experience['to'],
            'description' => $request->experience['description'],
            ]
        );

        return response(['message' => 'success', 'data' => $user], 200);
    }


    public function changepassword(Request $request){

        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string',
        ]);
        if (Hash::check($request->old_password, $request->user()->password)) {
            User::where('id', $request->user()->id)->update([
                'password' => Hash::make($request->new_password),
            ]);
        }else{
            return response(['message' => 'failed'], 200);
        }


        return response(['message' => 'success'], 200);
    }


    public function getProfile(Request $request, $username){

        $user = User::with(['experience', 'education'])->where('username', $username)->first();
        $user['interests'] = explode(',', $user->interests);

        $from_me = Friend::where('from', auth()->user()->id)->where('to', $user->id)->first();
        $to_me = Friend::where('to', auth()->user()->id)->where('from', $user->id)->first();
        $user['is_from'] = $from_me ? $from_me->from : NULL;
        $user['is_to'] = $to_me ? $to_me->to : NULL;
        $user['is_sent_status'] = $from_me ? $from_me->status : NULL;
        $user['is_received_status'] = $to_me ? $to_me->status : NULL;
        return response(['message' => 'success', 'data' => $user], 200);
    }

    public function getIDProfile(Request $request, $id){

        $user = User::with(['experience', 'education'])->where('id', $id)->first();
        if($user['interests'] != null) {
            $user['interests'] = explode(',', $user->interests);
        }

        $from_me = Friend::where('from', auth()->user()->id)->where('to', $user->id)->first();
        $to_me = Friend::where('to', auth()->user()->id)->where('from', $user->id)->first();
        $user['is_from'] = $from_me ? $from_me->from : NULL;
        $user['is_to'] = $to_me ? $to_me->to : NULL;
        $user['is_sent_status'] = $from_me ? $from_me->status : NULL;
        $user['is_received_status'] = $to_me ? $to_me->status : NULL;
        return response(['message' => 'success', 'data' => $user], 200);
    }

    public function connectUser(Request $request){

        $request->validate([
            'from' => 'required',
            'username' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();
        $friend = Friend::where('from', $request->from)->where('to', $user->id)->get();
        $otherfriend = Friend::where('to', $request->from)->where('from', $user->id)->get();

        if($friend->count() == 0 && $otherfriend->count() == 0){
            Friend::create([
                'from' => $request->from,
                'to' => $user->id,
                'status' => 0,
            ]);
            return response(['message' => 'success'], 200);
        }
        else {
            return response(['message' => 'success', 'status' => 'Already connected!'], 200);
        }

    }

    public function connectCancel(Request $request){

        $request->validate([
            'from' => 'required',
            'username' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();
        Friend::where('from', $request->from)-> where('to', $user->id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function changeStatus($id, $status){

        Friend::where('to', auth()->user()->id)->where('from', $id)->update([
            'status' => $status
        ]);

        if($status == 1){
            $message = 'Friend Accepted!';
        }else{
            $message = 'Friend Rejected!';
        }
        return response(['success' => 'success', 'message' => $message], 200);
    }

}
