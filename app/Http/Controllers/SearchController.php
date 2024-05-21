<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BlogCategory;
use App\Models\Blog;
use App\Models\Jobs;
use App\Models\Block;
use Auth;
use DateTime;

class SearchController extends Controller
{
    public function users(Request $request) {
        $users = User::where('name', 'like', "%$request->name%")->get();
        $users = $users->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'gender' => $user->gender,
                'status' => $user->status,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'birthday' => $user->birthday,
                'role' => $user->role
            ];
        });

        return response(['message' => 'success', 'data' => $users], 200);
    }

    public function users_all(Request $request) {
        $users = User::all();
        $users = $users->map(function($user) {
            $dateString = $user->birthday;
            $dateObject = new DateTime($dateString);
            $formattedDate = strftime("%d %B", $dateObject->getTimestamp());

            return [
                'id' => $user->id,
                'name' => $user->name,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'gender' => $user->gender,
                'status' => $user->status,
                'birthday' => $formattedDate,
                'role' => $user->role,
                'avatar' => $user->avatar,
            ];
        });

        return response(['message' => 'success', 'data' => $users], 200);
    }

    public function group_all(Request $request) {
        $users = User::whereNot('id', Auth::user()->id)->where('roomNum', intval($request->room_id))->orderBy('role', 'desc')->get();
        $temp = [];
        foreach($users as $user) {
            $kick = Block::with('user', 'member')->where('room_id', intval($request->room_id))->where('member_id', $user->id)->where('status', 'kick')->get();
            $mute = Block::with('user', 'member')->where('room_id', intval($request->room_id))->where('member_id', $user->id)->where('status', 'mute')->get();
            $block = Block::with('user', 'member')->where('user_id', Auth::user()->id)->where('member_id', $user->id)->where('status', 'block')->get();
            $dateString = $user->birthday;
            $dateObject = new DateTime($dateString);
            $formattedDate = strftime("%d %B", $dateObject->getTimestamp());
            if($kick->count() == 0) {

                if($mute->count() > 0) {
                    array_push($temp, [
                        'id' => $user->id,
                        'name' => $user->name,
                        'firstName' => $user->firstName,
                        'lastName' => $user->lastName,
                        'gender' => $user->gender,
                        'status' => $user->status,
                        'birthday' => $formattedDate,
                        'role' => $user->role,
                        'is_block' => $block->count()>0? 1: 0,
                        'avatar' => $user->avatar,
                        'is_mute' => 1,
                        'message' => 'Muted by '.$mute[0]->user->name
                    ]);

                }
                else {
                    array_push($temp, [
                        'id' => $user->id,
                        'name' => $user->name,
                        'firstName' => $user->firstName,
                        'lastName' => $user->lastName,
                        'gender' => $user->gender,
                        'status' => $user->status,
                        'birthday' => $formattedDate,
                        'role' => $user->role,
                        'avatar' => $user->avatar,
                        'is_mute' => 0,
                        'is_block' => $block->count()>0? 1: 0,
                        'message' => ''
                    ]);
                }
            }
        }

        return response(['message' => 'success', 'data' => $temp], 200);
    }

    public function blogs_all(Request $request) {
        $blogs = Blog::all();
        $blogs = $blogs->map(function($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'banner' => $blog->banner,
                'slug' => $blog->slug
            ];
        });

        return 'here';

        return response(['message' => 'success', 'data' => $blogs], 200);
    }

    public function blogs(Request $request) {
        $blogs = Blog::where('title', 'like', "%$request->key%")->get();


        $blogs = $blogs->map(function($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'banner' => $blog->banner,
                'slug' => $blog->slug
            ];
        });

        return response(['message' => 'success', 'data' => $blogs]);
    }

    public function updated_profile(Request $request) {
        $users = User::where('role', 'NOT LIKE', 'Member')->get();

        $users = $users->map(function($user){
            $dateString = $user->birthday;
            $dateObject = new DateTime($dateString);
            $formattedDate = strftime("%d %B", $dateObject->getTimestamp());
            return [
                'id' => $user->id,
                'name' => $user->name,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'gender' => $user->gender,
                'status' => $user->status,
                'birthday' => $formattedDate,
                'role' => $user->role,
                'avatar' => $user->avatar,
            ];
        });


        return response(['message' => 'success', 'data' => $users], 200);
    }

    public function nearby(Request $request) {
        $members = User::where('country', Auth::user()->country)->where('city', Auth::user()->city)->get();

        return response(['message' => 'success', 'data' => $members], 200);
    }

    public function nearby_updated(Request $request) {
        $members = User::where('country', Auth::user()->country)->where('city', Auth::user()->city)->get();

        $updated = [];
        foreach($members as $member) {
            if($member->role != 'Member') {
                array_push($updated, $member);
            }
        }

        return response(['message' => 'success', 'data' => $members], 200);
    }
}
