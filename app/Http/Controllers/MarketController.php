<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marketplace;
use App\Models\MarketReport;
use App\Models\Chat;
use App\Models\Media;
use App\Models\User;
use Auth;
use Spatie\Image\Image;
use DateTime;
use Pusher\Pusher;

class MarketController extends Controller
{
    public function getAll(Request $request) {
        $markets = Marketplace::with(['medias', 'user'])->get();
        // $markets = $markets->map(function($market) {
        //     $dateString = $market->user->birthday;
        //     $dateObject = new DateTime($dateString);
        //     $formattedDate = strftime("%d %B", $dateObject->getTimestamp());

        //     return [
        //         'id' => $market->id,
        //         'title' => $market->title,
        //         'price' => $market->price,
        //         'location' => $market->location,
        //         'category' => $market->category,
        //         'condition' => $market->condition,
        //         'description' => $market->description,
        //         'user' => [
        //             'id' => $market->user->id,
        //             'name' => $market->user->name,
        //             'username' => $market->user->username,
        //             'birthday' => $formattedDate
        //         ],
        //         'medias' => $market->medias
        //     ];

        // });

        return response(['message' => 'success', 'data' => $markets], 200);
    }

    public function getMarketAll(Request $request) {
        $markets = Marketplace::with(['medias', 'user'])->where('user_id', Auth::user()->id)->get();
        // $markets = $markets->map(function($market) {
        //     $dateString = $market->user->birthday;
        //     $dateObject = new DateTime($dateString);
        //     $formattedDate = strftime("%d %B", $dateObject->getTimestamp());

        //     return [
        //         'id' => $market->id,
        //         'title' => $market->title,
        //         'price' => $market->price,
        //         'location' => $market->location,
        //         'category' => $market->category,
        //         'condition' => $market->condition,
        //         'description' => $market->description,
        //         'user' => [
        //             'id' => $market->user->id,
        //             'name' => $market->user->name,
        //             'username' => $market->user->username,
        //             'birthday' => $formattedDate
        //         ],
        //         'medias' => $market->medias
        //     ];

        // });

        return response(['message' => 'success', 'data' => $markets], 200);
    }

    public function create(Request $request) {
        if($request->title === null || $request->price === null || $request->location === null || $request->category === null || $request->condition === null || $request->description === null) {
            return response(['message' => 'error', 'data' => 'Please fill all the fields'], 400);
        }

        $list = Marketplace::create([
            'user_id'=> Auth::user()->id,
            'title' => $request->title,
            'price' => $request->price,
            'location' => $request->location,
            'category' => $request->category,
            'condition' => $request->condition,
            'description' => $request->description,
            'is_sold' => 0
        ]);

        $files = $request->file('files');

        if($request->hasFile('files')) {
            foreach($files as $file) {
                $fileName = $file->getClientOriginalName();

                Image::load($file)
                    ->width(800)
                    ->save('images/marketplace/'.$fileName);

                // $picture = Storage::disk('local')->putFileAs('images/posts', $file, $fileName, 'public');
                Media::create([
                    'mediable_type' => 'App\Models\Marketplace',
                    'mediable_id' => $list->id,
                    'url' => 'images/marketplace/'.$fileName,
                ]);
            }
        }

        return response(['message' => 'success', 'data' => $list], 200);
    }

    public function getDetail(Request $request) {
        $market = Marketplace::where('id', $request->id)->first();
        $market = [
            'id' => $market->id,
            'title' => $market->title,
            'price' => $market->price,
            'location' => $market->location,
            'category' => $market->category,
            'description' => $market->description,
            'is_sold' => $market->is_sold,
            'time_ago' => $market->time_ago,
            'user_id' => $market->user_id,
            'medias' => Media::where('mediable_id', $market->id)->where('mediable_type', 'App\Models\Marketplace')->get(),
            'user' => User::where('id', $market->user_id)->first()
        ];

        return response(['message' => 'success', 'data' => $market], 200);
    }

    public function edit(Request $request) {
        $market = Marketplace::where('id', $request->id)->update([
            'title' => $request->title,
            'price' => $request->price,
            'location' => $request->location,
            'category' => $request->category,
            'description' => $request->description,
            'is_sold' => $request->is_sold ? 1: 0
        ]);

        return response(['message' => 'success', 'data' => $market], 200);
    }

    public function delete(Request $request) {
        $market = Marketplace::where('id', $request->id)->delete();

        return response(['message' => 'success'], 200);
    }

    public function report(Request $request) {
        $market = Marketplace::where('id', $request->market_id)->first();
        $description = $market->title.' https://donamix.org/marketplace/'.$request->market_id;

        $message = new Chat();
        $message->user_id = Auth::user()->id;
        $message->member_id = $request->member_id;
        $message->description = $description;
        $message->room_id = 17;
        $message->audio = '';
        $message->is_market = 1;
        $message->save();

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));

        $pusher->trigger('chat', 'market', array('message' => [$message, Auth::user()->name, Auth::user()->avatar, Auth::user()->role, Auth::user()->id]));

        return response(['message' => 'success', 'data' => $message], 200);
    }

    public function marketReport(Request $request) {
        $market = MarketReport::where('user_id', Auth::user()->id)->where('market_id', $request->market_id)->get();
        if($market->count() > 0) {
            MarketReport::where('user_id', Auth::user()->id)->where('market_id', $request->market_id)->update(['description' => $request->description]);
        }
        else {
            MarketReport::create([
                'user_id' => Auth::user()->id,
                'market_id' => $request->market_id,
                'description' => $request->description
            ]);
        }

        return response(['message' => 'success'], 200);
    }
}
