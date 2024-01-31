<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Permission;
use Illuminate\Support\Facades\Artisan;

class PermissionsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): RedirectResponse
    {
        Artisan::call('make:pm');

        activity()
            ->causedBy($request->user())
            ->withProperties(['ip' => $request->ip()])
            ->log('Refresh permission.');

        return Redirect::back()->withSuccess(__('Permission sync successfully.'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $request->validate([
            'display_name' => 'required|unique:permissions,name,'.$permission->id
        ]);

        $permission->update($request->only('display_name'));

        activity()
            ->causedBy($request->user())
            ->withProperties(['ip' => $request->ip()])
            ->log('Changed permission name.');

        return Redirect::back()->withSuccess(__('Permission updated successfully.'));
    }
}