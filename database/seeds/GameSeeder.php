<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('games')->insert([
            [
                'title' => 'Animal Crossing: New Horizons',
                'slug' => 'animal-crossing-new-horizons',
                'description' => 'Animal Crossing: New Horizons is a 2020 life simulation video game developed and published by Nintendo for the Nintendo Switch. It is the fifth main series title in the Animal Crossing series.',
                'released_at' => '2020-03-20'
            ],
            [
                'title' => 'Pac-Man',
                'slug' => 'pac-man',
                'description' => 'Pac-Man is a maze arcade game developed and released by Namco in 1980.',
                'released_at' => '1980-06-01'
            ]
        ]);
    }
}
