<?php

namespace App\Http\Resources;

use App\Http\Resources\Post as PostResource;

/**
 * Class TagWithPosts
 * Extension of the Tag resource, which also includes the nested Posts.
 * @package App\Http\Resources
 */
class TagWithPosts extends Tag
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
            'name' => $this->name,
            'post_count' => PostResource::collection($this->posts)->count(),
            'posts' => PostResource::collection($this->posts),
        ];
    }
}
