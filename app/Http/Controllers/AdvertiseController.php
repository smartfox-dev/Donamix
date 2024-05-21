<?php

namespace App\Http\Controllers;
use App\Models\Advertise;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use Auth;
use Hash;
use Str;
use Validator;

class AdvertiseController extends Controller
{

    public function store(Request $request){
        Log::info('AdvertiseController@store - Input Data', $request->all());
        $request->validate([
            'user_id' => 'required',
            'urls' => 'required',
            'ads_type' => 'required',
            'conversation'=> 'required',
            'site_url' => 'required',
            'button' => 'required',
            'country'=> 'required',
            'age_from'=> 'required',
            'age_to' => 'required',
            'gender'=> 'required', 
            'interest'=> 'required',
            'work'=> 'required',
            'price'=> 'required',
            'expires'=> 'required',
        ]);

        $advertise = Advertise::create([
            'user_id' => $request->user_id,
            'urls' => $request->urls,
            'ads_type' => $request->ads_type,
            'conversation' => $request->conversation,
            'site_url' => $request->site_url,
            'button' => $request->button,
            'description' => $request->description,
            'country' => $request->country,
            'age_from' => $request->age_from,
            'age_to'=> $request->age_to,
            'gender'=> $request->gender,
            'interest'=> $request->interest,
            'work'=> $request->work,
            'price'=> $request->price,
            'expires'=> $request->expires,
        ]);
        
        return response(['message' => 'success'], 200);
    }

    public function feed(Request $request){
        $feeds = Advertise::where('ads_type', 'Feed Ads')->latest()->take(10)->get();
        // $feeds = Advertise::all();
        return response(['message' => 'success', 'data' => $feeds], 200);
    }

    public function video(Request $request){
        $feeds = Advertise::where('ads_type', 'Video Ads')->latest()->take(4)->get();
        // $feeds = Advertise::all();
        return response(['message' => 'success', 'data' => $feeds], 200);
    }

    public function sidebar(Request $request){
        $feeds = Advertise::where('ads_type', 'Sidebar Ads')->latest()->take(4)->get();
        // $feeds = Advertise::all();
        return response(['message' => 'success', 'data' => $feeds], 200);
    }
    public function categories(){
        $categories = BlogCategory::all();
        return response(['message' => 'success', 'data' => $categories], 200);
    }
    

    public function destroy(Request $request, $id)
    {
        Advertise::where('id', $id)->delete();

        return response(['message' => 'success'], 200);
    }
    


}
