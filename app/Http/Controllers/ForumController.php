<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Comment;
use App\Models\ForumsCategory;
use App\Models\Forum;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class ForumController extends Controller
{
    public function getforum(Request $request) {
        $forums = Forum::with('user', 'comments')->orderBy('created_at', 'desc')->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'comments' => $forum->comments,
                'category_id' => $forum->category_id,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function getDetail(Request $request) {
        $forums = Forum::with('user', 'comments')->where('id', $request->id)->orderBy('created_at', 'desc')->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'comments' => Comment::with('user')->where('commentable_id', $forum->id)->where('commentable_type', 'App\Models\Forum')->orderBy('created_at', 'desc')->get(),
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
                'category_id' => $forum->category_id
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function intro(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 1)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function guide(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 2)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function education(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 3)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }
    public function contribution(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 4)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }
    public function help(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 5)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function general(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 6)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function feedback(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 7)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function random(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 8)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function chat(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 9)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function mobile(Request $request) {
        $forums = Forum::with('user', 'comments')->where('category_id', 10)->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }

    public function forum_add(Request $request) {
        $request->validate([
            'user_id' => 'required',
            'category_id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string'
        ]);

        $requestData = $request->all();
        if (Auth::user()->role == 'Member'){
            if (str_contains($requestData['description'], 'http') || str_contains($requestData['description'], ':/')) {
                return response(['message' => 'Failed Yon can not use any links'], 401);
            }
            else {
                $forum = Forum::create([
                    'user_id' => $requestData['user_id'],
                    'category_id' => $requestData['category_id'],
                    'title' => $requestData['title'],
                    'description' => $requestData['description']
                ]);
            }
        }
        else {
            $forum = Forum::create([
                'user_id' => $requestData['user_id'],
                'category_id' => $requestData['category_id'],
                'title' => $requestData['title'],
                'description' => $requestData['description']
            ]);
        }

        return response(['message' => 'success'], 200);
    }

    public function forum_edit(Request $request) {
        $requestData = $request->all();
        $forum = Forum::where('user_id', Auth::user()->id)->where('id', $requestData['id'])->update([
            'title' => $requestData['title'],
            'category_id' => $requestData['category_id'],
            'description' => $requestData['description']
        ]);

        return response(['message' => 'success'], 200);
    }

    public function forum_delete(Request $request) {
        $requestData = $request->all();
        Forum::where('user_id', Auth::user()->id)->where('id', $requestData['id'])->delete();

        return response(['message' => 'success'], 200);
    }

    public function category(Request $request) {
        $categories = ForumsCategory::all();
        return response(['message' => 'success', 'data' => $categories], 200);
    }

    public function store_comment(Request $request) {
        $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
            'description' => 'required|string',
        ]);

        if($request->is_edit){

            Comment::where('id', $request->id)->update([
                'description' => $request->description,
                'is_edited' => 1,
            ]);

            $comment = Comment::where('id', $request->id)->first();

        }else{

            $comment = Comment::create([
                'description' => $request->description,
                'user_id' => $request->user_id,
                'commentable_id' => $request->post_id,
                'commentable_type' => 'App\Models\Forum',
                'is_edited' => 0,
            ]);

        }

        $forums = Forum::with('user', 'comments')->where('id', $request->post_id)->orderBy('created_at', 'desc')->get();

        $forums = $forums->map(function($forum){
            return [
                'id' => $forum->id,
                'title' => $forum->title,
                'description' => $forum->description,
                'user' => $forum->user,
                'time_ago' => $forum->time_ago,
                'comments' => Comment::with('user')->where('commentable_id', $forum->id)->where('commentable_type', 'App\Models\Forum')->orderBy('created_at', 'desc')->get(),
                'category' => ForumsCategory::where('id', $forum->category_id)->first()->title,
                'category_id' => $forum->category_id
            ];
        });

        return response(['message' => 'success', 'data' => $forums], 200);
    }
}
