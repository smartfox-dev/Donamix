<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UpgradeController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\AdvertiseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('thirdlogin', [AuthController::class, 'thirdlogin']);
    Route::post('verifyotp', [AuthController::class, 'verifyotp']);
    Route::post('resendOtp', [AuthController::class, 'resendOtp']);
});

// Route::get('/post/detail/{id}', [PostController::class, 'detail']);

Route::middleware(['auth:api'])->group(function () {

    Route::get('/getbirthdays', [HomeController::class, 'getbirthdays']);

    Route::group(['prefix' => 'auth'], function () {
        Route::get('/getinfo', [AuthController::class, 'getinfo']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/{username}', [ProfileController::class, 'getProfile']);
        Route::get('/id/{id}', [ProfileController::class, 'getIDProfile']);
        Route::post('/connect', [ProfileController::class, 'connectUser']);
        Route::post('/connect_cancel', [ProfileController::class, 'connectCancel']);
        Route::get('/changeStatus/{id}/{status}', [ProfileController::class, 'changeStatus']);
    });

    Route::group(['prefix' => 'users'], function () {
        Route::put('/edit/{id}', [UserController::class, 'update']);
        Route::post('/changepassword', [UserController::class, 'changepassword']);
        Route::post('/createalbum', [UserController::class, 'createalbum']);
    Route::post('/editalbum/{id}', [UserController::class, 'updatealbum']);
        Route::delete('/deletealbum/{id}', [UserController::class, 'deletealbum']);
        Route::get('/getalbums', [UserController::class, 'getalbums']);
        Route::post('/report', [UserController::class, 'report']);
        Route::post('/block', [UserController::class, 'block']);
        Route::get('/blockedMember', [UserController::class, 'blockedMember']);
        Route::post('/unblock', [UserController::class, 'unblock']);
        Route::get('/friends', [UserController::class, 'friends']);
        Route::post('/unfriend', [UserController::class, 'unfriend']);
        Route::get('/upgraded', [UserController::class, 'upgraded']);
    });

    Route::group(['prefix' => 'blog'], function () {
        Route::post('/store', [BlogController::class, 'store']);
        Route::put('/edit/{id}', [BlogController::class, 'update']);
        Route::delete('/delete/{id}', [BlogController::class, 'destroy']);
        Route::post('/filterblogs', [BlogController::class, 'filterblogs']);
        Route::post('/filtermyblogs', [BlogController::class, 'filtermyblogs']);
        Route::get('/blogbyslug/{slug}', [BlogController::class, 'blogbyslug']);
        Route::get('/share/{slug}', [BlogController::class, 'sharebyslug']);
        Route::get('/categories', [BlogController::class, 'categories']);
    });

    Route::group(['prefix' => 'advertise'], function () {
        Route::post('/store', [AdvertiseController::class, 'store']);
        Route::post('/feed', [AdvertiseController::class, 'feed']);
        Route::post('/video', [AdvertiseController::class, 'video']);
        Route::post('/sidebar', [AdvertiseController::class, 'sidebar']);
    });

    Route::group(['prefix' => 'post'], function () {
        Route::post('/store', [PostController::class, 'store']);
        Route::post('/groupstore', [PostController::class, 'groupstore']);
        Route::get('/detail/{id}', [PostController::class, 'detail']);
        Route::post('/edit/{id}', [PostController::class, 'update']);
        Route::get('/getposts', [PostController::class, 'getposts']);
        Route::get('/getposts/{id}', [PostController::class, 'getpostsByUser']);
        Route::get('/gettimeposts/{id}', [PostController::class, 'gettimepostsByUser']);
        Route::delete('/delete/{id}', [PostController::class, 'destroy']);
        Route::post('/comment/store', [PostController::class, 'store_comment']);
        Route::delete('/comment/delete/{id}', [PostController::class, 'destroy_comment']);
        Route::delete('/photo/delete/{id}', [PostController::class, 'destroy_photo']);
        Route::post('/emoticon', [PostController::class, 'emoticon']);
        Route::get('/share/{id}', [PostController::class, 'sharebyid']);

    });

    Route::group(['prefix' => 'search'], function () {
        Route::get('/users/all', [SearchController::class, 'users_all']);
        Route::post('/users/groupall', [SearchController::class, 'group_all']);
        Route::post('/users', [SearchController::class, 'users']);
        Route::get('/blogs/all', [SearchController::class, 'blogs_all']);
        Route::post('/blogs', [SearchController::class, 'blogs']);
        Route::get('/updated_profile', [SearchController::class, 'updated_profile']);
        Route::get('/nearby', [SearchController::class, 'nearby']);
        Route::get('/nearby/updated', [SearchController::class, 'nearby_updated']);
    });

    Route::group(['prefix' => 'forum'], function () {
        Route::get('/getforum', [ForumController::class, 'getforum']);
        Route::post('/getdetail', [ForumController::class, 'getDetail']);
        Route::post('/store', [ForumController::class, 'forum_add']);
        Route::post('/edit', [ForumController::class, 'forum_edit']);
        Route::post('/delete', [ForumController::class, 'forum_delete']);
        Route::get('/categories', [ForumController::class, 'category']);
        Route::post('/comment/store', [ForumController::class, 'store_comment']);
        Route::get('/intro', [ForumController::class, 'intro']);
        Route::get('/guide', [ForumController::class, 'guide']);
        Route::get('/education', [ForumController::class, 'education']);
        Route::get('/contribution', [ForumController::class, 'contribution']);
        Route::get('/help', [ForumController::class, 'help']);
        Route::get('/general', [ForumController::class, 'general']);
        Route::get('/feedback', [ForumController::class, 'feedback']);
        Route::get('/random', [ForumController::class, 'random']);
        Route::get('/chat', [ForumController::class, 'chat']);
        Route::get('/modile ', [ForumController::class, 'mobile']);
    });

    Route::group(['prefix' => 'job'], function () {
        Route::post('/', [CareerController::class, 'add']);
        Route::post('/favorite', [CareerController::class, 'favorite']);
        Route::post('/store', [CareerController::class, 'store']);
        Route::get('/', [CareerController::class, 'get_all']);
        Route::post('/getdetail', [CareerController::class, 'getDetail']);
    });

    Route::group(['prefix' => 'group'], function () {
        Route::post('/store', [GroupController::class, 'store']);
        Route::post('/edit', [GroupController::class, 'edit']);
        Route::post('/list', [GroupController::class, 'list']);
        Route::delete('/delete/{id}', [GroupController::class, 'delete']);
        Route::get('/', [GroupController::class, 'get_all']);
        Route::get('/getgroups', [GroupController::class, 'getgroups']);
        Route::post('/emoticon', [GroupController::class, 'emoticon']);
        Route::post('/getdetail', [GroupController::class, 'getDetail']);
        Route::post('/comment/store', [GroupController::class, 'store_comment']);
        Route::post('/joinstatus', [GroupController::class, 'joinstatus']);
        Route::delete('/comment/delete/{id}', [GroupController::class, 'destroy_comment']);
        Route::get('/share/{id}', [GroupController::class, 'sharebyid']);
    });

    Route::group(['prefix' => 'upgrade'], function () {
        Route::get('gettitle', [UpgradeController::class, 'get_title']);
    });

    Route::group(['prefix' => 'video'], function () {
        Route::get('/store', [VideoController::class, 'getAll']);
        Route::post('/create', [VideoController::class, 'create']);
        Route::post('/edit', [VideoController::class, 'edit']);
        Route::post('/delete', [VideoController::class, 'delete']);
        Route::post('/comment/store', [VideoController::class, 'store_comment']);
        Route::delete('/comment/delete/{id}', [VideoController::class, 'destroy_comment']);
        Route::post('/emoticon', [VideoController::class, 'emoticon']);
        Route::get('/share/{id}', [VideoController::class, 'sharebyid']);
    });

    Route::group(['prefix' => 'market'], function () {
        Route::get('/all', [MarketController::class, 'getAll']);
        Route::get('/marketall', [MarketController::class, 'getMarketAll']);
        Route::post('/detail', [MarketController::class, 'getDetail']);
        Route::post('/store', [MarketController::class, 'create']);
        Route::post('/edit', [MarketController::class, 'edit']);
        Route::post('/delete', [MarketController::class, 'delete']);
        Route::post('/report', [MarketController::class, 'report']);
        Route::post('/marketreport', [MarketController::class, 'marketreport']);
    });

    Route::group(['prefix' => 'chat'], function () {
        Route::post('/all', [ChatController::class, 'getChat']);
        Route::post('/private', [ChatController::class, 'getPrivateChat']);
        Route::post('/store', [ChatController::class, 'store']);
        Route::post('/roomname', [ChatController::class, 'roomName']);
        Route::get('/roomlist', [ChatController::class, 'roomList']);
        Route::post('/kick', [ChatController::class, 'kick']);
        Route::post('/mute', [ChatController::class, 'mute']);
        Route::post('/unmute', [ChatController::class, 'unmute']);
        Route::post('/token', [ChatController::class, 'generateToken']);

        Route::post('/call-user', [ChatController::class, 'callUser']);
        Route::post('/call-start', [ChatController::class, 'callStart']);
        Route::post('/call-accept', [ChatController::class, 'callAccept']);

        Route::post('/call-videostart', [ChatController::class, 'callVideoStart']);
        Route::post('/call-videoaccept', [ChatController::class, 'callVideoAccept']);

        Route::post('/call-audiostart', [ChatController::class, 'callAudioStart']);
        Route::post('/call-audioaccept', [ChatController::class, 'callAudioAccept']);

        Route::post('/roomReg', [ChatController::class, 'roomReg']);
        Route::get('/roomOut', [ChatController::class, 'roomOut']);
        Route::get('/logout', [ChatController::class, 'logout']);
        Route::post('/clean', [ChatController::class, 'clean']);
        Route::get('/chatsent', [ChatController::class, 'chatSent']);
        Route::get('/chatread', [ChatController::class, 'chatRead']);
        Route::get('/chatunread', [ChatController::class, 'chatUnRead']);
        Route::get('/chatmember', [ChatController::class, 'chatMember']);
        Route::get('/access_bot', [ChatController::class, 'accessBot']);
        Route::get('/room_member', [ChatController::class, 'roomMember']);
        Route::post('/private_room', [ChatController::class, 'private']);
        Route::post('/delete', [ChatController::class, 'chatDelete']);
        Route::post('/mail_delete', [ChatController::class, 'mailDelete']);
        Route::post('/kickroom', [ChatController::class, 'kickroom']);

        Route::post('/random', [ChatController::class, 'random']);

        Route::get('/camoff', [ChatController::class, 'camOff']);
    });
});

Route::get('/aaa', function () {
    return "123213213";
});