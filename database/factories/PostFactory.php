<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    $name = $faker->name;
    $slug = strtolower($name);
    $slug = preg_replace("/[^a-z0-9_\s-]/", "", $slug);
    $slug = preg_replace("/[\s-]+/", " ", $slug);
    $slug = preg_replace("/[\s_]/", "-", $slug);
    return [
        'title' => $name,
        'slug' => $slug,
        'description' => $faker->text(50),
        'content' => $faker->text,
        'category_id' => random_int(1, 2),
    ];
});
