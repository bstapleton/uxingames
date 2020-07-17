<?php

namespace App\Http\Resources;

use App\Http\Resources\Post as PostResource;

/**
 * Class CategoryWithPosts
 * @package App\Http\Resources
 */
class CategoryWithPosts extends Category
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'post_count' => PostResource::collection($this->posts)->count(),
            'posts' => PostResource::collection($this->posts),
        ];
    }
}
