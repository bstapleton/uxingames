<?php

namespace App\Http\Controllers\API;

use App\Tag;
use App\Http\Resources\TagWithPosts as TagResource;
use App\Http\Resources\TagCollection;
use Illuminate\Http\Request;

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
        // TODO: handle if there's no result
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required',
            'slug' => 'required',
        ]);

        $category = Tag::create($validator);

        return response()->json($category, 201);
    }

    public function update(Request $request)
    {
        $tag = Tag::where('id', $request->input('id'))->first();
        $tag->update($request->all());

        return response()->json($tag, 200);
    }
}
