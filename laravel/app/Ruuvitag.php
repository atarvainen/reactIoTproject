<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ruuvitag extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'RuuviTag';
    protected $primaryKey = 'RuuviTagId';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = ['RuuviTagId', 'User'];
    
    // Relation.
    public function data()
    {
        return $this->hasMany(Data::class, 'RuuviTagId');
    }
	
}