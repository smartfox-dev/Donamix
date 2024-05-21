<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Reaction;
use App\Models\VideoReaction;
use Str;
use Auth;

class VideoController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'link' => 'required|string'
        ]);

        Post::create([
            'video_link' => $request->link,
            'uuid' => Str::uuid(),
            'user_id' => Auth::user()->id
        ]);

        return response(['message' => 'success'], 200);
    }

    public function edit(Request $request) {
        $request->validate([
            'video_link' => 'required|string',
            'id' => 'required'
        ]);

        $video = Post::where('user_id', Auth::user()->id)->where('id', $request->id)->update([
            'video_link' => $request->video_link,
            'description' => $request->description
        ]);

        $videos = Post::with(['user', 'comments.user', 'comments.childs'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();
        $videos = $videos->map(function($video) {
            $comments = $this->comments($video->comments);

            return [
                'id' => $video->id,
                'uuid' => $video->uuid,
                'comments' => $comments,
                'views' => $video->views,
                'video_link' => $video->video_link,
                'description' => $video->description,
                'all' => $video->like + $video->heart + $video->laugh + $video->clap,
                'like' => $video->like,
                'heart' => $video->heart,
                'laugh' => $video->laugh,
                'clap' => $video->clap,
                'name' => $video->user->name,
                'username' => $video->user->username,
                'time_ago' => $video->time_ago,
                'user_id' => $video->user_id,
                'avatar' => $video->user->avatar,
            ];
        });

        return response(['message' => 'success', 'data' => $videos[0]], 200);
    }

    public function delete(Request $request) {
        Post::where('user_id', Auth::user()->id)->where('id', $request->id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function getAll(Request $request) {
        $videos = Post::with(['user', 'comments.user', 'comments.childs'])->where('user_id', Auth::user()->id)->whereNotNull('video_link')->orderBy('created_at', 'desc')->get();
        $videos = $videos->map(function($video) {
            $comments = $this->comments($video->comments);

            return [
                'id' => $video->id,
                'uuid' => $video->uuid,
                'comments' => $comments,
                'views' => $video->views,
                'video_link' => $video->video_link,
                'description' => $video->description,
                'all' => $video->like + $video->heart + $video->laugh + $video->clap,
                'like' => $video->like,
                'heart' => $video->heart,
                'laugh' => $video->laugh,
                'clap' => $video->clap,
                'name' => $video->user->name,
                'username' => $video->user->username,
                'time_ago' => $video->time_ago,
                'user_id' => $video->user_id,
                'avatar' => $video->user->avatar,
            ];
        });

        return response(['message' => 'success', 'data' => $videos], 200);
    }

    public function comments($comments)
    {

        $comments = $comments->map(function($comment){

            $childs = $comment->childs->map(function($cmt){
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
                'commentable_type' => 'App\Models\Video',
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

    public function emoticon(Request $request)
    {
        $type = $request->type;
        $id = $request->id;
        $old = VideoReaction::where('user_id', Auth::user()->id)->where('video_id', $id)->first();
        $post = Video::where('id', $id)->first();

        switch ($type) {
            case 'like':
            case 'unlike':

                if($type == 'like'){
                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['like' => 1]
                    );

                    Video::where('id', $post->id)->update([
                        'like' => $post->like + 1
                    ]);
                }else{
                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['like' => 0]
                    );

                    Video::where('id', $post->id)->update([
                        'like' => $post->like - 1
                    ]);
                }

                break;

            case 'clap':
            case 'unclap':
                if($type == 'clap'){

                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['clap' => 1]
                    );

                    Video::where('id', $post->id)->update([
                        'clap' => $post->clap + 1
                    ]);

                }else{
                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['clap' => 0]
                    );

                    Video::where('id', $post->id)->update([
                        'clap' => $post->clap - 1
                    ]);


                }

                break;
            case 'heart':
            case 'unheart':
                if($type == 'heart'){

                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['heart' => 1]
                    );

                    Video::where('id', $post->id)->update([
                        'heart' => $post->heart + 1
                    ]);

                }else{
                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['heart' => 0]
                    );

                    Video::where('id', $post->id)->update([
                        'heart' => $post->heart - 1
                    ]);


                }

                break;

            case 'laugh':
            case 'unlaugh':
                if($type == 'laugh'){

                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['laugh' => 1]
                    );

                    Video::where('id', $post->id)->update([
                        'laugh' => $post->laugh + 1
                    ]);

                }else{
                    VideoReaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'video_id' => $id],
                        ['laugh' => 0]
                    );

                    Video::where('id', $post->id)->update([
                        'laugh' => $post->laugh - 1
                    ]);


                }

                break;
            default:
                # code...
                break;
        }

        return response(['message' => 'success'], 200);
    }

    public function sharebyid(Request $request, $id)
    {
        $post = Video::where('id', $id)->first();
        Video::where('id', $id)->update([
            'shares' =>  isset($post->shares) ? $post->shares + 1 : 1
        ]);

        return response(['message' => 'success', 'data' => $post], 200);
    }

}
