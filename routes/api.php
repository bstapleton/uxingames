<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('category')->group(function() {
    Route::get('/', 'API\CategoryController@index');
    Route::get('/{categorySlug}', 'API\CategoryController@show');
});

Route::prefix('post')->group(function() {
    Route::get('/', 'API\PostController@index');
    Route::get('{post}', 'API\PostController@show');
});

Route::prefix('tag')->group(function() {
    Route::get('/', 'API\TagController@index');
    Route::get('{uniqueIdentifier}', 'API\TagController@show');
});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
