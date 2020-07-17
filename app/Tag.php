<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Tag
 * @package App
 */
class Tag extends Model
{
    /**
     * @var string Table for this model
     */
    protected $table = 'tags';

    /**
     * @var string Primary table key.
     */
    protected $primaryKey = 'id';

    /**
     * @var array Fillable fields for this model.
     */
    protected $fillable = ['name', 'slug'];

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function posts()
    {
        return $this->belongsToMany(Post::class, 'tag_post');
    }
}
