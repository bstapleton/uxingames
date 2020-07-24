<?php

namespace App\Http\Controllers\API;

use App\Post;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\PostCollection;
use Illuminate\Http\Request;

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

    public function store()
    {
        $this->validatePost();

        $post = new Post(request(['title', 'slug', 'description', 'content']));
        $post->save();

        if (request()->has('tags')) {
            $post->tags()->attach(request('tags'));
        }

        if (request()->has('category')) {
            $post->category()->attach(request('category'));
        }

        return response()->json($post, 201);
    }

    public function update(Request $request)
    {
        $post = Post::where('id', $request->input('id'))->first();
        $post->update($request->all());

        if (request()->has('tags')) {
            $post->tags()->sync(request('tags'));
        }

        return response()->json($post, 200);
    }

    protected function validatePost()
    {
        return request()->validate([
            'title' => 'required',
            'slug' => 'required',
            'category_id' => 'exists:categories,id',
            'description' => 'required',
            'content' => 'required',
            'tags' => 'exists:tags,id',
        ]);
    }
}
