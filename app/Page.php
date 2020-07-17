<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Page
 * @package App
 */
class Page extends Model
{
    /**
     * @var string Table for this model
     */
    protected $table = 'pages';

    /**
     * @var string Primary table key.
     */
    protected $primaryKey = 'id';

    /**
     * @var array Fillable fields for this model.
     */
    protected $fillable = ['title', 'slug', 'description', 'content'];
}
