<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * @package App
 */
class Post extends Model
{
    /**
     * @var string Table for this model
     */
    protected $table = 'posts';

    /**
     * @var string Primary table key.
     */
    protected $primaryKey = 'id';

    /**
     * @var array Fillable fields for this model.
     */
    protected $fillable = ['title', 'slug', 'description', 'content', 'category_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tag_post');
    }
}
