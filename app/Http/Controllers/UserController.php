<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Album;
use App\Models\Media;
use App\Models\Report;
use App\Models\Block;
use App\Models\Friend;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Validator;
use Mail;
use Carbon\Carbon;


class UserController extends Controller
{
    public function update(Request $request, $id)
    {

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
            'is_enable_private_profile' => $request->setting['is_enable_private_profile'],
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


    public function changepassword(Request $request)
    {

        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string',
        ]);
        if (Hash::check($request->old_password, $request->user()->password)) {
            User::where('id', $request->user()->id)->update([
                'password' => Hash::make($request->new_password),
            ]);
        } else {
            return response(['message' => 'failed'], 200);
        }


        return response(['message' => 'success'], 200);
    }


    public function getalbums(Request $request)
    {

        $data = Album::with('images')->where('user_id', $request->user()->id)->get();

        return response(['message' => 'success', 'data' => $data], 200);
    }

    public function createalbum(Request $request)
    {

        $album = Album::create([
            'user_id' => $request->user_id,
            'description' => '',
            'title' => ''
        ]);

        foreach ($request->images as $img) {
            Media::create([
                'mediable_type' => 'App\Models\Album',
                'mediable_id' => $album->id,
                'url' => $img['url'],
            ]);
        }

        return response(['message' => 'success'], 200);
    }

    public function updatealbum(Request $request, $id)
    {

        Media::where('mediable_id', $id)->where('mediable_type', 'App\Models\Album')->delete();

        foreach ($request->images as $img) {
            Media::create([
                'mediable_type' => 'App\Models\Album',
                'mediable_id' => $id,
                'url' => $img['url'],
            ]);
        }

        return response(['message' => 'success'], 200);
    }


    public function deletealbum(Request $request, $id)
    {

        Media::where('mediable_id', $id)->where('mediable_type', 'App\Models\Album')->delete();
        Album::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function report(Request $request) {
        $request->validate([
            'description' => 'required|string'
        ]);

        $member = Report::where('user_id', $request->user_id)->where('member_id', $request->member_id)->get();
        if($member->count() > 0) {
            Report::where('user_id', $request->user_id)->where('member_id', $request->member_id)->update([
                'description' => $request->description
            ]);
        }
        else {
            Report::create([
                'user_id' => $request->user_id,
                'member_id' => $request->member_id,
                'description' => $request->description
            ]);
        }

        return response(['message' => 'success'], 200);
    }

    public function block(Request $request) {
        $request->validate([
            'description' => 'required|string'
        ]);

        $member = Block::where('user_id', $request->user_id)->where('member_id', $request->member_id)->where('status', 'block')->get();
        if(Friend::where('from', $request->user_id)->where('to', $request->member_id)->get()->count() > 0) {
            Friend::where('from', $request->user_id)->where('to', $request->member_id)->delete();
        }
        if (Friend::where('to', $request->user_id)->where('from', $request->member_id)->get()->count() > 0) {
            Friend::where('to', $request->user_id)->where('from', $request->member_id)->delete();
        }
        $user = User::where('id', $request->member_id)->update(['is_blocked'=> 1]);
        if($member->count() > 0) {
            Block::where('user_id', $request->user_id)->where('member_id', $request->member_id)->where('status', 'block')->update([
                'description' => $request->description
            ]);
        }
        else {
            Block::create([
                'user_id' => $request->user_id,
                'member_id' => $request->member_id,
                'description' => $request->description,
                'status' => 'block'
            ]);
        }

        return response(['message' => 'success'], 200);
    }

    public function blockedMember(Request $request) {
        $blocks = Block::with('user', 'member')->where('user_id',Auth::user()->id)->where('status', 'block')->get();

        $blocks = $blocks->map(function($block) {
            return [
                'id' => $block->member->id,
                'name' => $block->member->name,
                'gender' => $block->member->gender,
                'status' => $block->member->status,
                'avatar' => $block->member->avatar
            ];
        });

        return response(['message' => 'success', 'data' => $blocks], 200);
    }

    public function unblock(Request $request) {

        Block::where('user_id', Auth::user()->id)->where('member_id', $request->id)->update(['status' => 'unblock']);

        return response(['message'=> 'success'] , 200);
    }

    public function friends(Request $request) {
        $friends = Friend::where('from', Auth::user()->id)->where('status', 1)->get();
        $temp = [];
        foreach($friends as $friend) {
            $user = User::where('id', $friend->to)->first();
            array_push($temp, $user);
        }
        $friend_to = Friend::where('to', Auth::user()->id)->where('status', 1)->get();
        foreach($friend_to as $friend) {
            $user = User::where('id', $friend->from)->first();
            array_push($temp, $user);
        }
        return response(['message' => 'success', 'data' => $temp], 200);
    }

    public function unfriend(Request $request) {
        Friend::where('from', $request->id)->where('to', Auth::user()->id)->delete();

        $temp = [];
        $friend_to = Friend::where('to', Auth::user()->id)->where('status', 1)->get();
        foreach($friend_to as $friend) {
            $user = User::where('id', $friend->from)->first();
            array_push($temp, $user);
        }
        return response(['message' => 'success', 'data' => $temp], 200);
    }

    public function upgraded(Request $request) {
        $users = User::whereNot('role', 'Member')->get();
        $users = $users->map(function($user) {
            $age = 0;
            if($user->birthday !== null){
                $age = Carbon::parse($user->birthday)->age;
            }

            return [
                'id' => $user->id,
                'name' => $user->name,
                'birthday' => $user->birthday,
                'avatar' => $user->avatar,
                'country' => $user->country,
                'description' => $user->description,
                'role' => $user->role,
                'age' => $age,
                'credit' => $user->credit
            ];
        });

        return response(['message' => 'success', 'data' => $users], 200);
    }
}
