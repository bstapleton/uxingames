<?php

namespace App\Http\Controllers\API;

use App\Tag;
use App\Http\Resources\TagWithPosts as TagResource;
use App\Http\Resources\TagCollection;

/**
 * Class TagController
 * @package App\Http\Controllers\API
 */
class TagController extends BaseController
{
    /**
     * Returns a full collection of all Tags available.
     *
     * @return TagCollection
     */
    public function index()
    {
        return new TagCollection(Tag::all());
    }

    /**
     * Returns a single Tag based on its slug, along with all associated posts.
     *
     * @param $slug
     * @return TagResource
     */
    public function show($slug)
    {
        return new TagResource(Tag::where('slug', $slug)->first());
    }
}
