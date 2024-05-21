<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Room;
use App\Models\User;
use App\Models\Block;
use Auth;
use Illuminate\Support\Facades\Storage;
use Pusher\Pusher;
use Carbon\Carbon;
use Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Console\Scheduling\Schedule;
use App\Jobs\UnblockJob;

class ChatController extends Controller
{
    public function store(Request $request)
    {
        if (Auth::user()->is_mute == 1) {
            return response(['message' => 'failed'], 400);
        }
        $message = new Chat;
        $message->description = $request->description;
        $block = Block::where('member_id', Auth::user()->id)->where('user_id', $request->member_id)->where('status', 'block')->get()->count();
        // $block1 = Block::where('user_id', Auth::user()->id)->where('member_id', $request->member_id)->where('status', 'block')->get()->count();
        $mute = Block::where('member_id', Auth::user()->id)->where('status', 'mute')->where('room_id', $request->room_id)->get()->count();
        $kick = Block::where('member_id', Auth::user()->id)->where('status', 'kick')->where('room_id', $request->room_id)->get()->count();
        if($request->room_id !== 17 && $mute > 0) {
            return response(['message' => 'muted', 'data' => 'You have been muted!'], 200);
        }
        if($request->room_id !== 17 && $kick > 0) {
            return response(['message' => 'kicked', 'data' => 'You have been kicked!'], 200);
        }
        if ($request->audio == '') {
            $message->audio = '';
        } else {
            $audio = $request->file('audio');
            if ($request->hasFile('audio')) {
                $filename = Str::random(20) . '.' . 'webm';
                $audio->storeAs('/images/chat', $filename);
                $message->audio = '/images/chat/' . $filename;
            }
        }
        if($request->is_private === null) {
            $message->is_private = 0;
        }
        else  {
            $message->is_private = $request->is_private;
            if($block > 0) {
                return response(['message' => 'blocked', 'data' => 'You have been blocked!'], 200);
            }
        }

        $message->user_id = Auth::user()->id;

        if ($request->member_id == 0) {
            $message->member_id = Auth::user()->id;
        } else {
            $message->member_id = $request->member_id;
        }
        $message->room_id = $request->room_id;

        $message->save();

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));

        $pusher->trigger('chat', 'message', array('message' => [$message, Auth::user()->name, Auth::user()->avatar, Auth::user()->role, Auth::user()->id, Auth::user()->username]));

        return response(['message' => 'success', 'data' => $message], 200);
    }

    public function getChat(Request $request)
    {
        $message = Chat::with('user', 'member')->where('room_id', $request->room_id)->where('is_private', 0)->orderBy('created_at', 'asc')->get();
        return response(['message' => 'success', 'data' => $message], 200);
    }

    public function getPrivateChat(Request $request)
    {
        $member_id = $request->member_id;
        Chat::with('user', 'member')

            ->where(function ($query) use ($member_id, $request) {
                $query->where('member_id', $member_id)
                ->where('room_id', $request->room_id)
                    ->where('user_id', Auth::user()->id);
            })
            ->orWhere(function ($query) use ($member_id, $request) {
                $query->where(function ($query) use ($member_id, $request){
                    $query->where('user_id', Auth::user()->id)
                    ->where('room_id', $request->room_id)
                        ->where('member_id', $member_id);
                })
                ->orWhere(function ($query) use ($member_id, $request) {
                    $query->where('user_id', $member_id)
                    ->where('room_id', $request->room_id)
                        ->where('member_id', Auth::user()->id);
                });
            })
            ->orderBy('created_at', 'asc')
            ->update(['is_read' => 1]);

        $message = Chat::with('user', 'member')

            ->where(function ($query) use ($member_id, $request) {
                $query->where('member_id', $member_id)
                ->where('room_id', $request->room_id)
                    ->where('user_id', Auth::user()->id);
            })
            ->orWhere(function ($query) use ($member_id, $request) {
                $query->where(function ($query) use ($member_id, $request){
                    $query->where('user_id', Auth::user()->id)
                    ->where('room_id', $request->room_id)
                        ->where('member_id', $member_id);
                })
                ->orWhere(function ($query) use ($member_id, $request) {
                    $query->where('user_id', $member_id)
                    ->where('room_id', $request->room_id)
                        ->where('member_id', Auth::user()->id);
                });
            })
            ->orderBy('created_at', 'asc')
            ->get();

        $message = $message->map(function ($item) {

            $datetime = $item->created_at;
            $time = Carbon::parse($datetime)->format('H:i');
            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'member_id' => $item->member_id,
                'room_id' => $item->room_id,
                'description' => $item->description,
                'audio' => $item->audio,
                'is_error' => $item->is_error,
                'is_read' => $item->is_read,
                'is_private' => $item->is_private,
                'is_market' => $item->is_market,
                'created_at' => $time,
                'date' =>$item->created_at,
                'user' => $item->user,
                'member' => $item->member
            ];
        });
        return response(['message' => 'success', 'data' => $message], 200);
    }

    public function roomList(Request $request)
    {
        $lists = Room::all();
        $lists = $lists->map(function ($list) {
            $originalDate = $list->created_at;

            // Parse the original date string into a Carbon instance
            $carbonDate = Carbon::now();

            // Format the date as "Wednesday at 19:30"
            $formattedDate = $carbonDate->translatedFormat('l \a\t H:i');
            return [
                'id' => $list->id,
                'title' => $list->title,
                'description' => $list->description,
                'created_at' => $formattedDate
            ];
        });
        return response(['message' => 'success', 'data' => $lists], 200);
    }

    public function roomName(Request $request)
    {
        $name = Room::where('id', $request->id)->first();
        return response(['message' => 'success', 'data' => $name], 200);
    }

    public function kick(Request $request, Schedule $schedule)
    {
        if (Auth::user()->role == "Admin" || Auth::user()->role == "VIP") {
            $kick = Block::where('user_id', Auth::user()->id)->where('member_id', $request->id)->where('status', 'kick')->get();
            if($kick->count() === 0) {
                Block::create([
                    'user_id' => Auth::user()->id,
                    'member_id' => $request->id,
                    'description' => '',
                    'room_id' => $request->room_id,
                    'status' => 'kick'
                ]);
            }
            else {
                return response(['message' => 'failed'], 400);
            }
            $member = User::where('id', $request->id)->first();
            $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
            $message = $member->name . ' has been kicked by ' . Auth::user()->name;
            Chat::create([
                'user_id' => Auth::user()->id,
                'member_id' => $request->id,
                'description' => $message,
                'audio' => '',
                'is_error' => 1,
                'room_id' => $request->room_id
            ]);
            UnblockJob::dispatch($request->id, $request->room_id, Auth::user()->id)->delay(now()->addMinutes(300));
            // new PendingDispatch(new static(...func_get_args()));

            $pusher->trigger('chat', 'kick', array('message' => [$request->id, $request->room_id, $message, Auth::user()->name]));

            return response(['message' => 'success'], 200);
        } else {
            return response(['message' => 'failed'], 400);
        }
    }

    public function camOff(Request $request) {
        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'camoff', array('message' => [Auth::user()->id, Auth::user()->name]));
    }

    public function accessBot(Request $request) {
        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'bot', array('message' => ['To access the Mute or Kick feature and help us in safeguarding the chat room from disruptive behavior, please consider subscribing to our service. Your subscription not only helps maintain the chat room but also enables us to invest in technology upgrades, server maintenance, and security measures to ensure a seamless and safe user experience for all our members.', Auth::user()->id]));
    }

    public function mute(Request $request)
    {
        if (Auth::user()->role !== "Member" || Auth::user()->role !== "") {
            $mute = Block::where('user_id', Auth::user()->id)->where('member_id', $request->id)->where('status', 'mute')->get();
            if($mute->count() === 0) {
                Block::create([
                    'user_id' => Auth::user()->id,
                    'member_id' => $request->id,
                    'description' => '',
                    'room_id' => $request->room_id,
                    'status' => 'mute'
                ]);
            }
            else {
                return response(['message' => 'failed'], 400);
            }
            // User::where('id', $request->id)->update([
            //     'is_mute' => 1,
            //     'mute_room' => $request->room_id,
            //     'mute_mem' => Auth::user()->id
            // ]);
            $member = User::where('id', $request->id)->first();
            $message = $member->name . ' has been muted by ' . Auth::user()->name;
            Chat::create([
                'user_id' => Auth::user()->id,
                'member_id' => $request->id,
                'description' => $message,
                'audio' => '',
                'is_error' => 1,
                'room_id' => $request->room_id
            ]);
            $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
            $pusher->trigger('chat', 'mute', array('message' => [$request->id, $request->room_id, $message, Auth::user()->name]));

            return response(['message' => 'success'], 200);
        } else {
            return response(['message' => 'failed'], 400);
        }
    }

    public function unmute(Request $request)
    {
        if (Auth::user()->role !== "Member" || Auth::user()->role !== "") {
            if(Block::where('user_id', Auth::user()->id)->where('member_id', $request->id)->where('status', 'mute')->get()->count() === 1) {
                Block::where('user_id', Auth::user()->id)->where('member_id', $request->id)->where('status', 'mute')->update(['status' => 'unmute']);
                $member = User::where('id', $request->id)->first();
                if($request->user_id == 0){
                    $message = $member->name . ' has been unmuted by ' . 'System';
                }
                else {
                    $message = $member->name . ' has been unmuted by ' . Auth::user()->name;
                }
                Chat::create([
                    'user_id' => Auth::user()->id,
                    'member_id' => $request->id,
                    'description' => $message,
                    'audio' => '',
                    'is_error' => 1,
                    'room_id' => $request->room_id
                ]);
                $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
                $pusher->trigger('chat', 'unmute', array('message' => [$request->id, $request->room_id, $message, Auth::user()->name]));
            }

            return response(['message' => 'success'], 200);
        } else {
            return response(['message' => 'failed'], 400);
        }
    }

    public function random(Request $request) {
        User::where('id', Auth::user()->id)->update(['is_live' =>  1, 'is_logout' => 0]);
        $users = DB::table('chats')->leftJoin('users', 'chats.member_id', '=', 'users.id')->select('users.*')->where('chats.user_id', Auth::user()->id)->where('chats.room_id', 17)->groupBy('chats.member_id')->get();
        $other = DB::table('chats')->leftJoin('users', 'chats.user_id', '=', 'users.id')->select('users.*')->where('chats.member_id', Auth::user()->id)->where('chats.room_id', 17)->groupBy('chats.user_id')->get();

        $mergedUsers = collect([]);
        foreach ($users as $user) {
            $found = false;
            foreach ($other as $otherUser) {
                if ($user->id == $otherUser->id) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $mergedUsers->push($user);
            }
        }
        $mergedUsers = $mergedUsers->concat($other);
        $currentTime = now();
        $list = collect([]);

        $all = User::all();
        foreach($all as $item) {
            $stamp = $currentTime->diffInSeconds($item->updated_at);
            if(User::where('id', $item->id)->first()->is_live !== 0){
                if($stamp > 30) {
                    User::where('id', $item->id)->update(['is_live' => 0, 'roomNum' => 0, 'is_logout' => 1]);
                }
            }
        }

        foreach($mergedUsers as $item) {
            $stamp = $currentTime->diffInSeconds($item->updated_at);
            if(User::where('id', $item->id)->first()->is_live !== 0){
                if($stamp > 30) {
                    User::where('id', $item->id)->update(['is_live' => 0, 'roomNum' => 0, 'is_logout' => 1]);
                    $list->push([$item->id, 0]);
                }
                else {
                    $list->push([$item->id, 1]);
                }
            }

            else {
                $list->push([$item->id, 0]);
            }
        }
        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'inbox', array('message' => $list));
    }

    public function generateToken(Request $request)
    {
        $appID = "e5d2917dfd7c4078bc6d4f8eddb1a5ca";
        $appCertificate = "be468095482448749f777930e1b67a85";

        $channelName = $request->channelName;
        $uid = 0;
        //$uidStr = "2882341273";
        //the logest time to chat or video
        $expireTimeInSeconds = 7200; //2 hour
        $accessToken = new AccessToken2($appID, $appCertificate, $expireTimeInSeconds);
        $serviceRtc = new ServiceRtc($channelName, $uid);
        $serviceRtc->addPrivilege($serviceRtc::PRIVILEGE_JOIN_CHANNEL, $expireTimeInSeconds);
        $accessToken->addService($serviceRtc);
        $token = $accessToken->build();
        // $user = Auth::user()->name;
        // $role = RtcTokenBuilder::RoleAttendee;
        // $expireTimeInSeconds = 3600;
        // $currentTimestamp = now()->getTimestamp();
        // $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        // $token = RtcTokenBuilder::buildTokenWithUserAccount($appID, $appCertificate, $channelName, $user, $role, $privilegeExpiredTs);

        return response(['message' => 'success', 'data' => $token], 200);
    }

    public function callUser(Request $request)
    {
        $data['userToCall'] = $request->user_to_call;
        $data['channelName'] = $request->channel_name;
        $data['from'] = Auth::user()->id;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'call', array('message' => [ $data, Auth::user()->name]));
    }

    public function callAccept(Request $request)
    {
        $data['userToCall'] = $request->user_to_call;
        $data['channelName'] = $request->channel_name;
        $data['is_accept'] = $request->is_accept;
        $data['from'] = Auth::user()->id;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'accept', array('message' => [ $data, Auth::user()->name]));
    }

    public function callStart(Request $request)
    {
        $data['userToStart'] = Auth::user()->id;
        $data['channelName'] = $request->channel_name;
        $data['from'] = Auth::user()->id;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'start', array('message' => [ $data, Auth::user()->name]));

    }

    public function callVideoStart(Request $request)
    {
        $data['to'] = $request->member_id;
        $data['channelName'] = $request->channel_name;
        $data['from'] = Auth::user()->id;
        $data['name'] = Auth::user()->name;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'video-start', array('message' => [ $data, Auth::user()->name]));

    }
    public function callAudioStart(Request $request)
    {
        $data['to'] = $request->member_id;
        $data['channelName'] = $request->channel_name;
        $data['from'] = Auth::user()->id;
        $data['name'] = Auth::user()->name;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'audio-start', array('message' => [ $data, Auth::user()->name]));

    }

    public function callVideoAccept(Request $request) {
        $data['to'] = Auth::user()->id;
        $data['channelName'] = $request->channel_name;
        $data['from'] = $request->from;
        $data['is_accept'] = $request->is_accept;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'video-accept', array('message' => [ $data, Auth::user()->name]));
    }

    public function callAudioAccept(Request $request) {
        $data['to'] = Auth::user()->id;
        $data['channelName'] = $request->channel_name;
        $data['from'] = $request->from;
        $data['is_accept'] = $request->is_accept;

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'audio-accept', array('message' => [ $data, Auth::user()->name]));
    }

    public function roomReg(Request $request)
    {
        User::where('id', Auth::user()->id)->update([
            'roomNum' => $request->room,
            'is_logout' => 0
        ]);
        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'logon', array('message' => Auth::user()));
        return response(['message' => 'success'], 200);
    }

    public function roomOut(Request $request)
    {
        User::where('id', Auth::user()->id)->update([
            'roomNum' => 0,
            'is_logout' => 1
        ]);

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'logout', array('message' => Auth::user()->id));

        return response(['message' => 'success'], 200);
    }

    public function logout(Request $request) {
        User::where('id', Auth::user()->id)->update([
            'roomNum' => 0,
            'is_logout' => 1
        ]);

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'out', array('message' => Auth::user()->id));
        $pusher->trigger('chat', 'logout', array('message' => Auth::user()->id));


        return response(['message' => 'success'], 200);
    }

    public function clean(Request $request)
    {
        Chat::with('user', 'member')->where('room_id', $request->room_id)->orderBy('created_at', 'asc')->delete();

        return response(['message' => 'success'], 200);
    }

    public function chatMember(Request $request)
    {
        $users = DB::table('chats')->leftJoin('users', 'chats.member_id', '=', 'users.id')->select('users.*')->where('chats.user_id', Auth::user()->id)->where('chats.room_id', 17)->groupBy('chats.member_id')->get();
        $other = DB::table('chats')->leftJoin('users', 'chats.user_id', '=', 'users.id')->select('users.*')->where('chats.member_id', Auth::user()->id)->where('chats.room_id', 17)->groupBy('chats.user_id')->get();

        $mergedUsers = collect([]);
        foreach ($users as $user) {
            $found = false;
            foreach ($other as $otherUser) {
                if ($user->id == $otherUser->id) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $mergedUsers->push($user);
            }
        }
        $mergedUsers = $mergedUsers->concat($other);

        $mergedUsers = $mergedUsers->map(function ($item) {
            $msg = Chat::where('member_id', Auth::user()->id)->where('user_id', $item->id)->orderBy('created_at', 'desc')->first();
            if($msg !== null) {
                $date = $msg->created_at;
                $format = Carbon::parse($date)->format('d M');
                return [
                    'id'=> $item->id,
                    'avatar' => $item->avatar,
                    'name' => $item->name,
                    'username' => $item->username,
                    'is_live' => $item->is_live,
                    'msg' => $msg->description,
                    'date' => $format
                ];
            }
            else {

                return [
                    'id'=> $item->id,
                    'avatar' => $item->avatar,
                    'name' => $item->name,
                    'username' => $item->username,
                    'is_live' => $item->is_live,
                    'msg' => '',
                    'date' => ''
                ];
            }

        });


        return response(['message' => 'success', 'data' => $mergedUsers], 200);
    }

    public function chatDelete(Request $request)
    {
        Chat::where('user_id', Auth::user()->id)->where('member_id', $request->member_id)->where('room_id', 17)->delete();
        Chat::where('member_id', Auth::user()->id)->where('user_id', $request->member_id)->where('room_id', 17)->delete();

        return response(['message' => 'success'], 200);
    }

    public function mailDelete(Request $request) {
        Chat::where('id', $request->mail_id)->delete();

        $pusher = new Pusher("e1d8debb6b5791133889", "d4fa92ece8b2ee58f15f", "462256", array('cluster' => 'ap2'));
        $pusher->trigger('chat', 'delete', array('message' => $request->mail_id));

        return response(['message' => 'success'], 200);
    }

    public function chatSent(Request $request)
    {
        $users = Chat::where('room_id', 17)->where('user_id', Auth::user()->id)->groupBy('member_id')->get();
        $users = $users->map(function ($user) {
            return [
                'user' => User::where('id', $user->member_id)->first()
            ];
        });

        return response(['message' => 'success', 'data' => $users], 200);
    }

    public function chatRead(Request $request)
    {
        $other = DB::table('chats')->leftJoin('users', 'chats.user_id', '=', 'users.id')->select('users.*')->where('chats.member_id', Auth::user()->id)->where('chats.room_id', 17)->where('chats.is_read', 1)->groupBy('chats.user_id')->get();
        $users = DB::table('chats')->leftJoin('users', 'chats.member_id', '=', 'users.id')->select('users.*')->where('chats.user_id', Auth::user()->id)->where('chats.room_id', 17)->where('chats.is_read', 1)->groupBy('chats.member_id')->get();
        $mergedUsers = collect([]);
        foreach ($users as $user) {
            $found = false;
            foreach ($other as $otherUser) {
                if ($user->id == $otherUser->id) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $mergedUsers->push($user);
            }
        }
        $mergedUsers = $mergedUsers->concat($other);

        return response(['message' => 'success', 'data' => $mergedUsers], 200);
    }

    public function chatUnRead(Request $request)
    {
        $other = DB::table('chats')->leftJoin('users', 'chats.user_id', '=', 'users.id')->select('users.*')->where('chats.member_id', Auth::user()->id)->where('chats.room_id', 17)->where('chats.is_read', 0)->groupBy('chats.user_id')->get();


        return response(['message' => 'success', 'data' => $other], 200);
    }

    public function roomMember(Request $request)
    {
        $rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        $list = [];
        foreach ($rooms as $room) {
            array_push($list, User::where('roomNum', $room)->get());
        }

        return response(['message' => 'success', 'data' => $list], 200);
    }

    public function private(Request $request)
    {
        $member_id = $request->member_id;

        Chat::with('user', 'member')
            ->where('room_id', $request->room_id)
            ->where('is_private', 1)
            ->where('user_id', Auth::user()->id)
            ->where('member_id', $request->member_id)
            ->orderBy('created_at', 'asc')
            ->update(['is_read'=> 1]);
        Chat::with('user', 'member')
            ->where('room_id', $request->room_id)
            ->where('is_private', 1)
            ->where('member_id', Auth::user()->id)
            ->where('user_id', $request->member_id)
            ->orderBy('created_at', 'asc')
            ->update(['is_read'=> 1]);
        $message = Chat::with('user', 'member')
            ->where(function ($query) use ($member_id, $request) {
                $query->where('member_id', $member_id)
                    ->where('room_id', $request->room_id)
                    ->where('is_private', 1)
                    ->where('user_id', Auth::user()->id);
            })
            ->orWhere(function ($query) use ($member_id, $request) {
                $query->where(function ($query) use ($member_id, $request){
                    $query->where('user_id', Auth::user()->id)
                        ->where('member_id', $member_id)
                        ->where('room_id', $request->room_id)
                        ->where('is_private', 1);
                })
                ->orWhere(function ($query) use ($member_id, $request) {
                    $query->where('user_id', $member_id)
                        ->where('member_id', Auth::user()->id)
                        ->where('room_id', $request->room_id)
                        ->where('is_private', 1);
                });
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response(['message' => 'success', 'data' => $message], 200);
    }

    public function kickroom(Request $request) {
        $kick = Block::where('member_id', Auth::user()->id)->where('status', 'kick')->where('room_id', $request->room_id)->get();
        if($kick->count() === 0) {
            return response(['message' => 'success'], 200);
        }
        else {
            return response(['message' => 'failed'], 400);
        }
    }
}

class Service
{
    public $type;
    public $privileges;

    public function __construct($serviceType)
    {
        $this->type = $serviceType;
    }

    public function addPrivilege($privilege, $expire)
    {
        $this->privileges[$privilege] = $expire;
    }

    public function getServiceType()
    {
        return $this->type;
    }

    public function pack()
    {
        return Util::packUint16($this->type) . Util::packMapUint32($this->privileges);
    }

    public function unpack(&$data)
    {
        $this->privileges = Util::unpackMapUint32($data);
    }
}

class ServiceRtc extends Service
{
    const SERVICE_TYPE = 1;
    const PRIVILEGE_JOIN_CHANNEL = 1;
    const PRIVILEGE_PUBLISH_AUDIO_STREAM = 2;
    const PRIVILEGE_PUBLISH_VIDEO_STREAM = 3;
    const PRIVILEGE_PUBLISH_DATA_STREAM = 4;
    public $channelName;
    public $uid;

    public function __construct($channelName = "", $uid = "")
    {
        parent::__construct(self::SERVICE_TYPE);
        $this->channelName = $channelName;
        $this->uid = $uid;
    }

    public function pack()
    {
        return parent::pack() . Util::packString($this->channelName) . Util::packString($this->uid);
    }

    public function unpack(&$data)
    {
        parent::unpack($data);
        $this->channelName = Util::unpackString($data);
        $this->uid = Util::unpackString($data);
    }
}

class ServiceRtm extends Service
{
    const SERVICE_TYPE = 2;
    const PRIVILEGE_LOGIN = 1;
    public $userId;

    public function __construct($userId = "")
    {
        parent::__construct(self::SERVICE_TYPE);
        $this->userId = $userId;
    }

    public function pack()
    {
        return parent::pack() . Util::packString($this->userId);
    }

    public function unpack(&$data)
    {
        parent::unpack($data);
        $this->userId = Util::unpackString($data);
    }
}

class ServiceFpa extends Service
{
    const SERVICE_TYPE = 4;
    const PRIVILEGE_LOGIN = 1;

    public function __construct()
    {
        parent::__construct(self::SERVICE_TYPE);
    }

    public function pack()
    {
        return parent::pack();
    }

    public function unpack(&$data)
    {
        parent::unpack($data);
    }
}

class ServiceChat extends Service
{
    const SERVICE_TYPE = 5;
    const PRIVILEGE_USER = 1;
    const PRIVILEGE_APP = 2;
    public $userId;

    public function __construct($userId = "")
    {
        parent::__construct(self::SERVICE_TYPE);
        $this->userId = $userId;
    }

    public function pack()
    {
        return parent::pack() . Util::packString($this->userId);
    }

    public function unpack(&$data)
    {
        parent::unpack($data);
        $this->userId = Util::unpackString($data);
    }
}

class ServiceEducation extends Service
{
    const SERVICE_TYPE = 7;
    const PRIVILEGE_ROOM_USER = 1;
    const PRIVILEGE_USER = 2;
    const PRIVILEGE_APP = 3;

    public $roomUuid;
    public $userUuid;
    public $role;


    public function __construct($roomUuid = "", $userUuid = "", $role = -1)
    {
        parent::__construct(self::SERVICE_TYPE);
        $this->roomUuid = $roomUuid;
        $this->userUuid = $userUuid;
        $this->role = $role;
    }

    public function pack()
    {
        return parent::pack() . Util::packString($this->roomUuid) . Util::packString($this->userUuid) . Util::packInt16($this->role);
    }

    public function unpack(&$data)
    {
        parent::unpack($data);
        $this->roomUuid = Util::unpackString($data);
        $this->userUuid = Util::unpackString($data);
        $this->role = Util::unpackInt16($data);
    }
}

class AccessToken2
{
    const VERSION = "007";
    const VERSION_LENGTH = 3;
    public $appCert;
    public $appId;
    public $expire;
    public $issueTs;
    public $salt;
    public $services = [];

    public function __construct($appId = "", $appCert = "", $expire = 900)
    {
        $this->appId = $appId;
        $this->appCert = $appCert;
        $this->expire = $expire;
        $this->issueTs = time();
        $this->salt = rand(1, 99999999);
    }

    public function addService($service)
    {
        $this->services[$service->getServiceType()] = $service;
    }

    public function build()
    {
        if (!self::isUUid($this->appId) || !self::isUUid($this->appCert)) {
            return "";
        }

        $signing = $this->getSign();
        $data = Util::packString($this->appId) . Util::packUint32($this->issueTs) . Util::packUint32($this->expire)
            . Util::packUint32($this->salt) . Util::packUint16(count($this->services));

        ksort($this->services);
        foreach ($this->services as $key => $service) {
            $data .= $service->pack();
        }

        $signature = hash_hmac("sha256", $data, $signing, true);

        return self::getVersion() . base64_encode(zlib_encode(Util::packString($signature) . $data, ZLIB_ENCODING_DEFLATE));
    }

    public function getSign()
    {
        $hh = hash_hmac("sha256", $this->appCert, Util::packUint32($this->issueTs), true);
        return hash_hmac("sha256", $hh, Util::packUint32($this->salt), true);
    }

    public static function getVersion()
    {
        return self::VERSION;
    }

    public static function isUUid($str)
    {
        if (strlen($str) != 32) {
            return false;
        }
        return ctype_xdigit($str);
    }

    public function parse($token)
    {
        if (substr($token, 0, self::VERSION_LENGTH) != self::getVersion()) {
            return false;
        }

        $data = zlib_decode(base64_decode(substr($token, self::VERSION_LENGTH)));
        $signature = Util::unpackString($data);
        $this->appId = Util::unpackString($data);
        $this->issueTs = Util::unpackUint32($data);
        $this->expire = Util::unpackUint32($data);
        $this->salt = Util::unpackUint32($data);
        $serviceNum = Util::unpackUint16($data);

        $servicesObj = [
            ServiceRtc::SERVICE_TYPE => new ServiceRtc(),
            ServiceRtm::SERVICE_TYPE => new ServiceRtm(),
            ServiceFpa::SERVICE_TYPE => new ServiceFpa(),
            ServiceChat::SERVICE_TYPE => new ServiceChat(),
            ServiceEducation::SERVICE_TYPE => new ServiceEducation(),
        ];
        for ($i = 0; $i < $serviceNum; $i++) {
            $serviceTye = Util::unpackUint16($data);
            $service = $servicesObj[$serviceTye];
            if ($service == null) {
                return false;
            }
            $service->unpack($data);
            $this->services[$serviceTye] = $service;
        }
        return true;
    }
}

class Util
{
    public static function assertEqual($expected, $actual)
    {
        $debug = debug_backtrace();
        $info = "\n- File:" . basename($debug[1]["file"]) . ", Func:" . $debug[1]["function"] . ", Line:" . $debug[1]["line"];
        if ($expected != $actual) {
            echo $info . "\n  Assert failed" . "\n    Expected :" . $expected . "\n    Actual   :" . $actual;
        } else {
            echo $info . "\n  Assert ok";
        }
    }

    public static function packUint16($x)
    {
        return pack("v", $x);
    }

    public static function unpackUint16(&$data)
    {
        $up = unpack("v", substr($data, 0, 2));
        $data = substr($data, 2);
        return $up[1];
    }

    public static function packUint32($x)
    {
        return pack("V", $x);
    }

    public static function unpackUint32(&$data)
    {
        $up = unpack("V", substr($data, 0, 4));
        $data = substr($data, 4);
        return $up[1];
    }

    public static function packInt16($x)
    {
        return pack("s", $x);
    }

    public static function unpackInt16(&$data)
    {
        $up = unpack("s", substr($data, 0, 2));
        $data = substr($data, 2);
        return $up[1];
    }

    public static function packString($str)
    {
        return self::packUint16(strlen($str)) . $str;
    }

    public static function unpackString(&$data)
    {
        $len = self::unpackUint16($data);
        $up = unpack("C*", substr($data, 0, $len));
        $data = substr($data, $len);
        return implode(array_map("chr", $up));
    }

    public static function packMapUint32($arr)
    {
        ksort($arr);
        $kv = "";
        foreach ($arr as $key => $val) {
            $kv .= self::packUint16($key) . self::packUint32($val);
        }
        return self::packUint16(count($arr)) . $kv;
    }

    public static function unpackMapUint32(&$data)
    {
        $len = self::unpackUint16($data);
        $arr = [];
        for ($i = 0; $i < $len; $i++) {
            $arr[self::unpackUint16($data)] = self::unpackUint32($data);
        }
        return $arr;
    }
}
