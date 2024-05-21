<?php

namespace App\Http\Controllers;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class BlogController extends Controller
{

    public function filterblogs(Request $request)
    {
        $requestData = $request->all();
        $blogs = Blog::with('user', 'category')->get();
        $count_blogs = $blogs->count();

        return response(['message' => 'success', 'data' => $blogs, 'totalcount' => $count_blogs], 200);
    }

    public function filtermyblogs(Request $request)
    {
        $requestData = $request->all();
        $blogs = Blog::with('user', 'category')->where('user_id', Auth::user()->id)->get();
        $count_blogs = $blogs->count();

        return response(['message' => 'success', 'data' => $blogs, 'totalcount' => $count_blogs], 200);
    }

    public function store(Request $request){

        $request->validate([
            'banner' => 'required',
            'category_id' => 'required',
            'user_id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $user = Blog::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title , "-"),
            'description' => $request->description,
            'banner' => $request->banner,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);
        
        return response(['message' => 'success'], 200);
    }

    public function categories(){
        $categories = BlogCategory::all();
        return response(['message' => 'success', 'data' => $categories], 200);
    }

    public function blogbyslug(Request $request, $slug)
    {
        $blog = Blog::with('user', 'category')->where('slug', $slug)->first();
        Blog::where('slug', $slug)->update([
            'views' => $blog->views + 1
        ]);

        return response(['message' => 'success', 'data' => $blog], 200);
    }

    public function sharebyslug(Request $request, $slug)
    {
        $blog = Blog::with('user', 'category')->where('slug', $slug)->first();
        Blog::where('slug', $slug)->update([
            'shares' =>  isset($blog->shares) ? $blog->shares + 1 : 1
        ]);

        return response(['message' => 'success', 'data' => $blog], 200);
    }

    public function update(Request $request, $id){


        $request->validate([
            'banner' => 'required',
            'category_id' => 'required',
            'user_id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $user = Blog::where('id', $id)->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title , "-"),
            'description' => $request->description,
            'banner' => $request->banner,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);
        
        return response(['message' => 'success'], 200);
    }


    public function destroy(Request $request, $id)
    {
        Blog::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }
    


}
