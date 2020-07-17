<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class TagCollection
 * Collection of the base Tag resource.
 * @package App\Http\Resources
 */
class TagCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'tag_count' => $this->collection->count(),
            'data' => $this->collection,
        ];
    }
}
