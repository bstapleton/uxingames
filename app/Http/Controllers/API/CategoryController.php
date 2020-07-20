<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Resources\CategoryWithPosts as CategoryResource;
use App\Http\Resources\CategoryCollection;
use Illuminate\Http\Request;

/**
 * Class CategoryController
 * @package App\Http\Controllers\API
 */
class CategoryController extends BaseController
{
    /**
     * Returns a full collection of all Categories.
     *
     * @return CategoryCollection
     */
    public function index()
    {
        return new CategoryCollection(Category::all());
    }

    /**
     * Returns a single Category based on slug, along with all of its associated
     * posts.
     *
     * @param $slug
     * @return CategoryResource
     */
    public function show($slug)
    {
        return new CategoryResource(Category::where('slug', $slug)->first());
    }

    public function showById($id)
    {
        return Category::where('id', $id)->first();
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'title' => 'required',
            'slug' => 'required',
            'description' => 'required',
        ]);

        $category = Category::create($validator);

        return response()->json($category, 201);
    }
}
