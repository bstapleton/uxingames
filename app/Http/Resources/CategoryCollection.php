<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class CategoryCollection
 * Collection of the base Category resource.
 * @package App\Http\Resources
 */
class CategoryCollection extends ResourceCollection
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
            'category_count' => $this->collection->count(),
            'data' => $this->collection,
        ];
    }
}
