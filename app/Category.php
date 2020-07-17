<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * @package App
 */
class Category extends Model
{
    /**
     * @var string Table for this model
     */
    protected $table = 'categories';

    /**
     * @var string Primary table key.
     */
    protected $primaryKey = 'id';

    /**
     * @var array Fillable fields for this model.
     */
    protected $fillable = ['title', 'slug', 'description'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'category_id');
    }
}
