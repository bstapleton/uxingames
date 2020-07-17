<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class TagSeeder
 */
class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            [
                'name' => 'Banana',
                'slug' => 'banana'
            ],
            [
                'name' => 'Apple',
                'slug' => 'apple'
            ],
            [
                'name' => 'Orange',
                'slug' => 'orange'
            ]
        ]);
    }
}
