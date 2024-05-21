<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class CommentController extends Controller
{

    // public function getposts(Request $request)
    // {
    //     $requestData = $request->all();
    //     $posts = Post::with('user')->orderBy('created_at', 'desc')->get();
    //     $count_posts = $posts->count();

    //     return response(['message' => 'success', 'data' => $posts, 'totalcount' => $count_posts], 200);
    // }

    public function store(Request $request){

        $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
            'description' => 'required|string',
        ]);

        $comment = Comment::create([
            'description' => $request->description,
            'user_id' => $request->user_id,
            'commentable_id' => $request->post_id,
            'commentable_type' => 'App\Models\Post',
        ]);

        return response(['message' => 'success', 'data' => $comment], 200);
    }


    public function update(Request $request, $id){

        $request->validate([
            'id' => 'required',
            'description' => 'required|string',
        ]);

        $post = Comment::where('id', $request->id)->update([
            'description' => $request->description,
        ]);

        $post = Comment::with('user')->where('id', $request->id)->first();

        return response(['message' => 'success', 'data' => $post], 200);
    }

    public function destroy(Request $request, $id)
    {
        Comment::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }


}
