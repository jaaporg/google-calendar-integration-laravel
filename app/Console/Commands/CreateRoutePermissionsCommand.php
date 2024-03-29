<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Route;
use Illuminate\Console\Command;
use App\Models\Permission;

class CreateRoutePermissionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:pm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a permission routes.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $routes = Route::getRoutes()->getRoutes();

        foreach ($routes as $route) {
            // if ($route->getName() != '' && $route->getAction()['middleware']['0'] == 'web') {
            if ($route->getName() != '' && in_array('web', $route->getAction()['middleware']) && in_array('auth', $route->getAction()['middleware'])) {
                $permission = Permission::where('name', $route->getName())->first();

                if (is_null($permission)) {
                    Permission::create([
                        'name' => $route->getName(),
                        'display_name' => $route->getName(),
                    ]);
                }
            }
        }

        $this->info('Permission routes added successfully.');
    }
}
