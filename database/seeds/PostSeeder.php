<?php

use Illuminate\Database\Seeder;

/**
 * Class PostSeeder
 */
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Post::class, 10)
            ->create()
            ->each(function ($post) {
                $post->tags()->saveMany(factory(App\Tag::class, 3)->make());
                $post->tags()->saveMany(factory(App\Category::class, 1)->make());
        });
    }
}
