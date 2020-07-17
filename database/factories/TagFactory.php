<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Tag;
use Faker\Generator as Faker;

$factory->define(Tag::class, function (Faker $faker) {
    $name = $faker->name;
    $slug = strtolower($name);
    $slug = preg_replace("/[^a-z0-9_\s-]/", "", $slug);
    $slug = preg_replace("/[\s-]+/", " ", $slug);
    $slug = preg_replace("/[\s_]/", "-", $slug);
    return [
        'name' => $name,
        'slug' => $slug
    ];
});
