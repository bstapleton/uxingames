<?php

namespace App\Http\Controllers\API;

use App\Post;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\PostCollection;

/**
 * Class PostController
 * @package App\Http\Controllers\API
 */
class PostController extends BaseController
{
    /**
     * Returns a full collection of all Posts.
     *
     * @return PostCollection
     */
    public function index()
    {
        return new PostCollection(Post::all());
    }

    /**
     * Returns a specific Post by its slug.
     *
     * @param $slug
     * @return PostResource
     */
    public function show($slug)
    {
        return new PostResource(Post::where('slug', $slug)->first());
    }
}
