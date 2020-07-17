<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Post as PostResource;

/**
 * Class Tag
 * Base level Tag, which includes all of the core data associated with a tag + the post count.
 * @package App\Http\Resources
 */
class Tag extends JsonResource
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
        ];
    }
}
