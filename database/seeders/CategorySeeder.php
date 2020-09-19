<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class CategorySeeder
 */
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            [
                'title' => 'Category 1',
                'slug' => 'cat1',
                'description' => 'This is the description for the first category.'
            ],
            [
                'title' => 'Category 2',
                'slug' => 'category-2',
                'description' => 'Second category description is here.'
            ]
        ]);
    }
}
