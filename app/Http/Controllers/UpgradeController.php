<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upgrade;

class UpgradeController extends Controller
{
    public function get_title(Request $request) {
        $titles = Upgrade::all();
        $titles = $titles->map(function ($title) {
            return [
                'id' => $title->id,
                'title' => $title->title,
                'is_check' => $title->is_check,
                'upgrade_type' => $title->upgrade_type
            ];
        });

        return response(['message' => 'success', 'data' => $titles], 200);
    }
}
