<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\Reaction;
use App\Models\Media;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;
use Storage;
use Spatie\Image\Image;

class PostController extends Controller
{

    public function getposts(Request $request)
    {
        $groupId = $request->input('group_id');
        $posts = Post::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])
            ->where('group_id', $groupId)
            ->orderBy('created_at', 'desc')
            ->get();

        $temp = [];

        foreach ($posts as $post) {
            if ($post->user->is_blocked == 0) {
                $comments = $this->comments($post->comments);

                $react = Reaction::where('user_id', Auth::user()->id)->where('post_id', $post->id)->first();

                $new_tags = [];

                if ($post->is_perspective == true && $post->tags != '') {
                    $tags = explode(',', $post->tags);
                    foreach ($tags as $key => $tag) {
                        $new_tags[$key]['is_checked'] = true;
                        $new_tags[$key]['name'] = $tag;
                    }
                }

                array_push($temp, [
                    'id' => $post->id,
                    'uuid' => $post->uuid,
                    'comments' => $comments,
                    'medias' => $post->medias,
                    'tags' => $new_tags,
                    'is_like' => $react ? $react->like : 0,
                    'is_heart' => $react ? $react->heart : 0,
                    'is_laugh' => $react ? $react->laugh : 0,
                    'is_clap' => $react ? $react->clap : 0,
                    'all' => $post->like + $post->heart + $post->laugh + $post->clap,
                    'like' => $post->like,
                    'heart' => $post->heart,
                    'laugh' => $post->laugh,
                    'clap' => $post->clap,
                    'description' => $post->description,
                    'video_link' => $post->video_link,
                    'username' => $post->user->username,
                    'time_ago' => $post->time_ago,
                    'is_perspective' => $post->is_perspective,
                    'user_id' => $post->user_id,
                    'avatar' => $post->user->avatar,
                    'created_at' => $post->created_at,
                ]);
            }
        }
        $count_posts = count($temp);

        return response(['message' => 'success', 'data' => $temp, 'totalcount' => $count_posts], 200);
    }

    public function getpostsByUser(Request $request, $username)
    {
        $requestData = $request->all();
        $user_id = User::where('username', $username)->first()->id;
        $posts = Post::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])->where('user_id', $user_id)->orderBy('created_at', 'desc')->get();
        $temp = [];

        foreach ($posts as $post) {
            if ($post->user->is_blocked == 0) {
                $comments = $this->comments($post->comments);

                $react = Reaction::where('user_id', Auth::user()->id)->where('post_id', $post->id)->first();

                $new_tags = [];

                if ($post->is_perspective == true && $post->tags != '') {
                    $tags = explode(',', $post->tags);
                    foreach ($tags as $key => $tag) {
                        $new_tags[$key]['is_checked'] = true;
                        $new_tags[$key]['name'] = $tag;
                    }
                }

                array_push($temp, [
                    'id' => $post->id,
                    'uuid' => $post->uuid,
                    'comments' => $comments,
                    'medias' => $post->medias,
                    'tags' => $new_tags,
                    'is_like' => $react ? $react->like : 0,
                    'is_heart' => $react ? $react->heart : 0,
                    'is_laugh' => $react ? $react->laugh : 0,
                    'is_clap' => $react ? $react->clap : 0,
                    'all' => $post->like + $post->heart + $post->laugh + $post->clap,
                    'like' => $post->like,
                    'heart' => $post->heart,
                    'laugh' => $post->laugh,
                    'clap' => $post->clap,
                    'description' => $post->description,
                    'video_link' => $post->video_link,
                    'username' => $post->user->username,
                    'time_ago' => $post->time_ago,
                    'is_perspective' => $post->is_perspective,
                    'user_id' => $post->user_id,
                    'avatar' => $post->user->avatar,
                ]);
            }
        }
        $count_posts = count($temp);

        return response(['message' => 'success', 'data' => $temp, 'totalcount' => $count_posts], 200);
    }

    public function gettimepostsByUser(Request $request, $id)
    {
        $requestData = $request->all();
        $posts = Post::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])->where('user_id', $id)->orderBy('created_at', 'desc')->get();
        $temp = [];

        foreach ($posts as $post) {
            if ($post->user->is_blocked == 0) {
                $comments = $this->comments($post->comments);

                $react = Reaction::where('user_id', Auth::user()->id)->where('post_id', $post->id)->first();

                $new_tags = [];

                if ($post->is_perspective == true && $post->tags != '') {
                    $tags = explode(',', $post->tags);
                    foreach ($tags as $key => $tag) {
                        $new_tags[$key]['is_checked'] = true;
                        $new_tags[$key]['name'] = $tag;
                    }
                }

                array_push($temp, [
                    'id' => $post->id,
                    'uuid' => $post->uuid,
                    'comments' => $comments,
                    'medias' => $post->medias,
                    'tags' => $new_tags,
                    'is_like' => $react ? $react->like : 0,
                    'is_heart' => $react ? $react->heart : 0,
                    'is_laugh' => $react ? $react->laugh : 0,
                    'is_clap' => $react ? $react->clap : 0,
                    'all' => $post->like + $post->heart + $post->laugh + $post->clap,
                    'like' => $post->like,
                    'heart' => $post->heart,
                    'laugh' => $post->laugh,
                    'clap' => $post->clap,
                    'description' => $post->description,
                    'video_link' => $post->video_link,
                    'username' => $post->user->username,
                    'time_ago' => $post->time_ago,
                    'is_perspective' => $post->is_perspective,
                    'user_id' => $post->user_id,
                    'avatar' => $post->user->avatar,
                ]);
            }
        }
        $count_posts = count($temp);

        return response(['message' => 'success', 'data' => $temp, 'totalcount' => $count_posts], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'user_id' => 'required',
            'description' => 'required|string',
            'group_id' => 'required',
        ]);
        
        $mytags = '';
        if ($request->is_perspective == true) {
            $tags = $request->tags;
            $new_tags = collect($tags)->keyBy('name')->keys()->toArray();
            $mytags = implode(',', $new_tags);
        }

        $post = Post::create([
            'uuid' => Str::uuid(),
            'description' => $request->description,
            'video_link' => $request->video_link,
            'user_id' => $request->user_id,
            'is_perspective' => $request->is_perspective == "true" ? 1 : 0,
            'tags' => $mytags,
            'group_id' => $request->group_id,
        ]);


        $files = $request->file('files');
        if ($request->hasFile('files')) {
            foreach ($files as $file) {
                $fileName = $file->getClientOriginalName();


                Image::load($file)
                    ->width(800)
                    ->save('images/posts/' . $fileName);

                // $picture = Storage::disk('local')->putFileAs('images/posts', $file, $fileName, 'public');
                Media::create([
                    'mediable_type' => 'App\Models\Post',
                    'mediable_id' => $post->id,
                    'url' => 'images/posts/' . $fileName,
                ]);

            }
        }


        $post->load(['medias', 'user', 'comments.user', 'comments.childs', 'reaction']);

        $new_tags = [];

        if ($post->is_perspective == true && $post->tags != '') {
            $tags = explode(',', $post->tags);
            foreach ($tags as $key => $tag) {
                $new_tags[$key]['is_checked'] = true;
                $new_tags[$key]['name'] = $tag;
            }
        }

        $post = [
            'id' => $post->id,
            'uuid' => $post->uuid,
            'tags' => $new_tags,
            'comments' => [],
            'medias' => $post->medias,
            'is_like' => 0,
            'is_heart' => 0,
            'is_laugh' => 0,
            'is_clap' => 0,
            'like' => $post->like,
            'heart' => $post->heart,
            'laugh' => $post->laugh,
            'clap' => $post->clap,
            'description' => $post->description,
            'video_link' => $post->video_link,
            'username' => $post->user->username,
            'time_ago' => $post->time_ago,
            'is_perspective' => $post->is_perspective,
            'user_id' => intval($post->user_id),
            'avatar' => $post->user->avatar,
        ];

        return response(['message' => 'success', 'data' => $post], 200);
    }

    public function groupstore(Request $request)
    {

        $request->validate([
            'group_id' => 'required',
            'user_id' => 'required',
            'description' => 'required|string',
        ]);

        $mytags = '';
        if ($request->is_perspective == true) {
            $tags = $request->tags;
            $new_tags = collect($tags)->keyBy('name')->keys()->toArray();
            $mytags = implode(',', $new_tags);
        }
        
        $post = Post::create([
            'uuid' => Str::uuid(),
            'description' => $request->description,
            'video_link' => $request->video_link,
            'user_id' => $request->user_id,
            'group_id' => $request->group_id,
            'is_perspective' => $request->is_perspective == "true" ? 1 : 0,
            'tags' => $mytags,
        ]);


        $files = $request->file('files');
        if ($request->hasFile('files')) {
            foreach ($files as $file) {
                $fileName = $file->getClientOriginalName();


                Image::load($file)
                    ->width(800)
                    ->save('images/posts/' . $fileName);

                // $picture = Storage::disk('local')->putFileAs('images/posts', $file, $fileName, 'public');
                Media::create([
                    'mediable_type' => 'App\Models\Post',
                    'mediable_id' => $post->id,
                    'url' => 'images/posts/' . $fileName,
                ]);

            }
        }


        $post->load(['medias', 'user', 'comments.user', 'comments.childs', 'reaction']);

        $new_tags = [];

        if ($post->is_perspective == true && $post->tags != '') {
            $tags = explode(',', $post->tags);
            foreach ($tags as $key => $tag) {
                $new_tags[$key]['is_checked'] = true;
                $new_tags[$key]['name'] = $tag;
            }
        }

        $post = [
            'id' => $post->id,
            'uuid' => $post->uuid,
            'tags' => $new_tags,
            'comments' => [],
            'medias' => $post->medias,
            'is_like' => 0,
            'is_heart' => 0,
            'is_laugh' => 0,
            'is_clap' => 0,
            'like' => $post->like,
            'heart' => $post->heart,
            'laugh' => $post->laugh,
            'clap' => $post->clap,
            'description' => $post->description,
            'video_link' => $post->video_link,
            'username' => $post->user->username,
            'time_ago' => $post->time_ago,
            'is_perspective' => $post->is_perspective,
            'user_id' => intval($post->user_id),
            'avatar' => $post->user->avatar,
        ];

        return response(['message' => 'success', 'data' => $post], 200);
    }


    public function update(Request $request, $id)
    {

        $request->validate([
            'id' => 'required',
            'description' => 'required|string',
        ]);

        $mytags = '';
        if ($request->is_perspective == true) {
            $tags = $request->tags;
            $new_tags = collect($tags)->keyBy('name')->keys()->toArray();
            $mytags = implode(',', $new_tags);
        }


        $post = Post::where('id', $request->id)->update([
            'description' => $request->description,
            'video_link' => $request->video_link != 'null' ? $request->video_link : NULL,
            'tags' => $mytags,
        ]);


        $files = $request->file('files');
        if ($request->hasFile('files')) {
            foreach ($files as $file) {
                $fileName = $file->getClientOriginalName();


                Image::load($file)
                    ->width(800)
                    ->save('images/posts/' . $fileName);

                // $picture = Storage::disk('local')->putFileAs('images/posts', $file, $fileName, 'public');
                Media::create([
                    'mediable_type' => 'App\Models\Post',
                    'mediable_id' => $request->id,
                    'url' => 'images/posts/' . $fileName,
                ]);

            }
        }

        $post = Post::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])->where('id', $request->id)->first();

        $comments = $this->comments($post->comments);

        $react = Reaction::where('user_id', Auth::user()->id)->where('post_id', $post->id)->first();


        $new_tags = [];

        if ($post->is_perspective == true && $post->tags != '') {
            $tags = explode(',', $post->tags);
            foreach ($tags as $key => $tag) {
                $new_tags[$key]['is_checked'] = true;
                $new_tags[$key]['name'] = $tag;
            }
        }


        $post = [
            'id' => $post->id,
            'uuid' => $post->uuid,
            'comments' => $comments,
            'medias' => $post->medias,
            'tags' => $new_tags,
            'is_like' => $react ? $react->like : 0,
            'is_heart' => $react ? $react->heart : 0,
            'is_laugh' => $react ? $react->laugh : 0,
            'is_clap' => $react ? $react->clap : 0,
            'like' => $post->like,
            'heart' => $post->heart,
            'laugh' => $post->laugh,
            'clap' => $post->clap,
            'description' => $post->description,
            'video_link' => $post->video_link,
            'username' => $post->user->username,
            'time_ago' => $post->time_ago,
            'is_perspective' => $post->is_perspective,
            'user_id' => intval($post->user_id),
            'avatar' => $post->user->avatar,
        ];

        return response(['message' => 'success', 'data' => $post], 200);
    }

    public function destroy(Request $request, $id)
    {
        Post::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }


    public function detail(Request $request, $id)
    {
        $post = Post::with(['medias', 'user', 'comments.user', 'comments.childs', 'reaction'])->where('uuid', $id)->first();

        $comments = $this->comments($post->comments);

        if (Auth::check()) {
            $react = Reaction::where('user_id', Auth::user()->id)->where('post_id', $post->id)->first();
        } else {
            $react = null;
        }


        $new_tags = [];

        if ($post->is_perspective == true && $post->tags != '') {
            $tags = explode(',', $post->tags);
            foreach ($tags as $key => $tag) {
                $new_tags[$key]['is_checked'] = true;
                $new_tags[$key]['name'] = $tag;
            }
        }

        $post = [
            'id' => $post->id,
            'uuid' => $post->uuid,
            'comments' => $comments,
            'medias' => $post->medias,
            'tags' => $new_tags,
            'is_like' => $react ? $react->like : 0,
            'is_heart' => $react ? $react->heart : 0,
            'is_laugh' => $react ? $react->laugh : 0,
            'is_clap' => $react ? $react->clap : 0,
            'like' => $post->like,
            'heart' => $post->heart,
            'laugh' => $post->laugh,
            'clap' => $post->clap,
            'description' => $post->description,
            'video_link' => $post->video_link,
            'username' => $post->user->username,
            'time_ago' => $post->time_ago,
            'is_perspective' => $post->is_perspective,
            'user_id' => intval($post->user_id),
            'avatar' => $post->user->avatar,
        ];

        return response(['message' => 'success', 'data' => $post], 200);

    }


    public function store_comment(Request $request)
    {

        $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
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
                'commentable_id' => $request->post_id,
                'commentable_type' => 'App\Models\Post',
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

    public function emoticon(Request $request)
    {
        $type = $request->type;
        $id = $request->id;
        $old = Reaction::where('user_id', Auth::user()->id)->where('post_id', $id)->first();
        $post = Post::where('id', $id)->first();

        switch ($type) {
            case 'like':
            case 'unlike':

                if ($type == 'like') {
                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['like' => 1]
                    );

                    Post::where('id', $post->id)->update([
                        'like' => $post->like + 1
                    ]);
                } else {
                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['like' => 0]
                    );

                    Post::where('id', $post->id)->update([
                        'like' => $post->like - 1
                    ]);
                }

                break;

            case 'clap':
            case 'unclap':
                if ($type == 'clap') {

                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['clap' => 1]
                    );

                    Post::where('id', $post->id)->update([
                        'clap' => $post->clap + 1
                    ]);

                } else {
                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['clap' => 0]
                    );

                    Post::where('id', $post->id)->update([
                        'clap' => $post->clap - 1
                    ]);


                }

                break;
            case 'heart':
            case 'unheart':
                if ($type == 'heart') {

                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['heart' => 1]
                    );

                    Post::where('id', $post->id)->update([
                        'heart' => $post->heart + 1
                    ]);

                } else {
                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['heart' => 0]
                    );

                    Post::where('id', $post->id)->update([
                        'heart' => $post->heart - 1
                    ]);


                }

                break;

            case 'laugh':
            case 'unlaugh':
                if ($type == 'laugh') {

                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['laugh' => 1]
                    );

                    Post::where('id', $post->id)->update([
                        'laugh' => $post->laugh + 1
                    ]);

                } else {
                    Reaction::updateOrCreate(
                        ['user_id' => Auth::user()->id, 'post_id' => $id],
                        ['laugh' => 0]
                    );

                    Post::where('id', $post->id)->update([
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
        $post = Post::where('id', $id)->first();
        Post::where('id', $id)->update([
            'shares' => isset($post->shares) ? $post->shares + 1 : 1
        ]);

        return response(['message' => 'success', 'data' => $post], 200);
    }


    public function destroy_comment(Request $request, $id)
    {
        Comment::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function destroy_photo(Request $request, $id)
    {
        Media::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
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

}
