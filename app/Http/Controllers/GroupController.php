<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupReaction;
use App\Models\Comment;
use App\Models\Media;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Auth;
use Hash;
use Str;
use Validator;

class GroupController extends Controller
{
    public function list(Request $request)
    {
        $groups = Group::where('deleted_at', null)->get();
        return response(['message' => 'success', 'data' => $groups], 200);
    }
    public function getgroups(Request $request)
    {
        $page = $request->query('page');
        if ($page == 'info') {
            $groups = Group::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])
                ->where('user_id', Auth::user()->id)
                ->where('deleted_at', null)
                ->orderBy('created_at', 'desc')->get();
        } else {
            $groups = Group::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])
                ->where('privacy', 'public')
                ->where('deleted_at', null)
                ->orderBy('created_at', 'desc')->get();
        }

        $requestData = $request->all();
        $temp = [];

        foreach ($groups as $group) {
            if ($group->user->is_blocked == 0) {
                $comments = $this->comments($group->comments);

                $react = GroupReaction::where('user_id', Auth::user()->id)->where('group_id', $group->id)->first();

                array_push($temp, [
                    'id' => $group->id,
                    'user_id' => $group->user_id,
                    'cover_photo' => $group->cover_photo,
                    'group_name' => $group->group_name,
                    'url' => $group->url,
                    'category' => $group->category,
                    'description' => $group->description,
                    'privacy' => $group->privacy,
                    'member_count' => $group->member_count,
                    'created_at' => $group->created_at,
                    'updated_at' => $group->updated_at,
                    'deleted_at' => $group->deleted_at,
                    'comments' => $comments,
                    'medias' => $group->medias,
                    'is_like' => $react ? $react->like : 0,
                    'is_heart' => $react ? $react->heart : 0,
                    'is_laugh' => $react ? $react->laugh : 0,
                    'is_clap' => $react ? $react->clap : 0,
                    'all' => $group->like + $group->heart + $group->laugh + $group->clap,
                    'shares' => $group->shares,
                    'like' => $group->like,
                    'heart' => $group->heart,
                    'laugh' => $group->laugh,
                    'clap' => $group->clap,
                    'user_list' => $group->user_list,
                    'user' => $group->user,
                ]);
            }
        }
        $count_groups = count($temp);
        // dd($count_groups);
        return response(['message' => 'success', 'data' => $temp, 'totalcount' => $count_groups], 200);
    }

    public function joinstatus(Request $request)
    {
        $requestData = $request->all();
        $groupId = $requestData['id'];
        $userId = $requestData['user_id'];
        $userList = $requestData['user_list'];

        $updated = Group::where('id', $groupId)
            ->update(['user_list' => $userList]);
        return response(['message' => 'success', 'data' => $updated], 200);
    }

    public function emoticon(Request $request)
    {
        $type = $request->type;
        $id = $request->id;
        $old = GroupReaction::where('user_id', Auth::user()->id)->where('group_id', $id)->first();
        $group = Group::where('id', $id)->first();

        switch ($type) {
            case 'like':
            case 'unlike':

                if ($type == 'like') {
                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['like' => 1]
                    );

                    Group::where('id', $group->id)->update([
                        'like' => $group->like + 1
                    ]);
                } else {
                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['like' => 0]
                    );

                    Group::where('id', $group->id)->update([
                        'like' => $group->like - 1
                    ]);
                }

                break;

            case 'clap':
            case 'unclap':
                if ($type == 'clap') {

                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['clap' => 1]
                    );

                    Group::where('id', $group->id)->update([
                        'clap' => $group->clap + 1
                    ]);

                } else {
                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['clap' => 0]
                    );

                    Group::where('id', $group->id)->update([
                        'clap' => $group->clap - 1
                    ]);
                }

                break;
            case 'heart':
            case 'unheart':
                if ($type == 'heart') {

                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['heart' => 1]
                    );

                    Group::where('id', $group->id)->update([
                        'heart' => $group->heart + 1
                    ]);

                } else {
                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['heart' => 0]
                    );

                    Group::where('id', $group->id)->update([
                        'heart' => $group->heart - 1
                    ]);


                }

                break;

            case 'laugh':
            case 'unlaugh':
                if ($type == 'laugh') {

                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['laugh' => 1]
                    );

                    Group::where('id', $group->id)->update([
                        'laugh' => $group->laugh + 1
                    ]);

                } else {
                    GroupReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'group_id' => $id],
                        ['laugh' => 0]
                    );

                    Group::where('id', $group->id)->update([
                        'laugh' => $group->laugh - 1
                    ]);


                }

                break;
            default:
                # code...
                break;
        }

        return response(['message' => 'success'], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'cover_photo' => 'required',
            'group_name' => 'required|string',
            'url' => 'required|string',
            'category' => 'required',
            'description' => 'required|string|max:130',
            'privacy' => 'required',
        ]);

        $requestData = $request->all();
        
        $group = Group::create([
            'user_id' => $requestData['user_id'],
            'cover_photo' => $requestData['cover_photo'],
            'group_name' => $requestData['group_name'],
            'url' => $requestData['url'],
            'category' => $requestData['category'],
            'description' => $requestData['description'],
            'privacy' => $requestData['privacy'],
        ]);

        $group_reaction = GroupReaction::create([
            'user_id' => $requestData['user_id'],
            'like' => 0,
            'heart' => 0,
            'laugh' => 0,
            'clap' => 0,
        ]);

        return response(['message' => 'success'], 200);
    }

    public function edit(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'cover_photo' => 'required',
            'group_name' => 'required|string',
            'url' => 'required|string',
            'category' => 'required',
            'description' => 'required|string|max:130',
            'privacy' => 'required'
        ]);

        $requestData = $request->all();
        $groupId = $requestData['id'];
        $group = Group::findOrFail($groupId);
        $group->update([
            'user_id' => $requestData['user_id'],
            'cover_photo' => $requestData['cover_photo'],
            'group_name' => $requestData['group_name'],
            'url' => $requestData['url'],
            'category' => $requestData['category'],
            'description' => $requestData['description'],
            'privacy' => $requestData['privacy'],
        ]);
        return response(['message' => 'success'], 200);
    }

    public function get_all(Request $request)
    {
        $page = $request->query('page');
        if ($page == 'info') {
            $groups = Group::get();
        } else {
            $groups = Group::where('privacy', 'public')->get();
        }

        return response()->json($groups);
    }

    public function getDetail(Request $request)
    {
        $Groups = Group::with('user', 'comments')->where('id', $request->id)->orderBy('created_at', 'desc')->get();

        $forums = $Groups->map(function ($group) {
            return [
                'id' => $group->id,
                'title' => $group->title,
                'description' => $group->description,
                'user' => $group->user,
                'time_ago' => $group->time_ago,
                'comments' => Comment::with('user')->where('commentable_id', $group->id)->where('commentable_type', 'App\Models\Group')->orderBy('created_at', 'desc')->get(),
                'category_id' => $group->category_id
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }


    private function comments($comments)
    {

        $comments = $comments->map(function ($comment) {

            $childs = $comment->childs->map(function ($cmt) {
                return [
                    'id' => $cmt->id,
                    'avatar' => '',
                    'name' => $cmt->user->username,
                    'description' => $cmt->description,
                    'time_ago' => $cmt->time_ago,
                    'isUser' => (Auth::check() && $cmt->user_id === Auth::user()->id) ? true : false,
                ];
            });

            return [
                'id' => $comment->id,
                'childs' => $childs,
                'avatar' => '',
                'name' => $comment->user->username,
                'description' => $comment->description,
                'time_ago' => $comment->time_ago,
                'is_edited' => $comment->is_edited,
                'isUser' => (Auth::check() && $comment->user_id === Auth::user()->id) ? true : false,
                'isSub' => count($comment->childs) > 0 ? true : false,
            ];

        });

        return $comments;
    }

    public function store_comment(Request $request)
    {

        $request->validate([
            'user_id' => 'required',
            'group_id' => 'required',
            'description' => 'required|string',
        ]);

        if ($request->is_edit) {

            Comment::where('id', $request->id)->update([
                'description' => $request->description,
                'is_edited' => 1,
            ]);

            $comment = Comment::where('id', $request->id)->first();

        } else {

            $comment = Comment::create([
                'description' => $request->description,
                'user_id' => $request->user_id,
                'commentable_id' => $request->group_id,
                'commentable_type' => 'App\Models\Group',
                'is_edited' => 0,
            ]);

        }

        $comment = [
            'id' => $comment->id,
            'avatar' => '',
            'name' => $comment->user->username,
            'description' => $comment->description,
            'time_ago' => $comment->time_ago,
            'isUser' => $comment->user_id === Auth::user()->id ? true : false,
            'isSub' => $comment->parent_id != 0 ? true : false,
            'is_edited' => $comment->is_edited,

        ];

        return response(['message' => 'success', 'data' => $comment], 200);
    }

    public function destroy_comment(Request $request, $id)
    {
        Comment::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function delete(Request $request, $id)
    {
        $group = Group::where('id', $id)->first();
        if ($group) {
            $group->deleted_at = Carbon::now();
            $group->save();
            return response(['message' => 'success'], 200);
        }
        return response(['message' => 'Group not found'], 404);
    }
}
