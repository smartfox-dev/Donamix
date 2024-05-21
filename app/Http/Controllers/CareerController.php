<?php

namespace App\Http\Controllers;
use App\Models\Career;
use App\Models\Bid;
use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class CareerController extends Controller
{
    public function add(Request $request) {
        $request->validate([
            'user_id' => 'required',
            'logo' => 'required',
            'title' => 'required|string',
            'companyName' => 'required|string',
            'employ_type' => 'required|string',
            'country' => 'required|string',
            'description' => 'required|string'
        ]);

        $requestData = $request->all();
        
        $forum = Career::create([
            'logo' => $requestData['logo'],
            'user_id' => $requestData['user_id'],
            'title' => $requestData['title'],
            'companyName' => $requestData['companyName'],
            'salary' => $requestData['salary'],
            'employ_type' => $requestData['employ_type'],
            'country' => $requestData['country'],
            'description' => $requestData['description']
        ]);

        return response(['message' => 'success'], 200);
    }

    
    public function favorite(Request $request)
    {
        // dd($request);
        $requestData = $request->all();
        $jobId = $requestData['id'];
        $userId = $requestData['user_id'];
        $favorite = $requestData['favorite'];
        $updated = Career::where('id', $jobId)
            ->update(['favorite' => $favorite]);
        return response(['message'=> 'success','data'=> $updated],200);
    }
    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required',
            'job_id' => 'required',
            'cv_letter' => 'required|string',
            'cv_link' => 'required'
        ]);

        $requestData = $request->all();
        
        $forum = Bid::create([
            'user_id' => $requestData['user_id'],
            'job_id' => $requestData['job_id'],
            'cv_letter' => $requestData['cv_letter'],
            'cv_link' => $requestData['cv_link'],
        ]);

        return response(['message' => 'success'], 200);
    }
    public function get_all() {
        $Careers = Career::with('user')->orderBy('created_at', 'desc')->get();
        
        return response() -> json($Careers);
    }
    public function getDetail(Request $request) {
        $Careers = Career::with('user', 'comments')->where('id', $request->id)->orderBy('created_at', 'desc')->get();

        $Careers = $Careers->map(function($Careers){
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
