<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Game
 * @package App
 */
class Game extends Model
{
    /**
     * @var string Table for this model
     */
    protected $table = 'games';

    /**
     * @var string Primary key fort he table.
     */
    protected $primaryKey = 'id';

    /**
     * @var string[] Fillable columns in the table.
     */
    protected $fillable = ['title', 'slug', 'description', 'developer_id', 'published_id', 'released_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'game_id');
    }
}
