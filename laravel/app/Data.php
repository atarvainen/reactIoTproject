<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
    */
    protected $table = 'Data';
    protected $primaryKey = 'Count';
    public $timestamps = false;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = [
        'Count', 'Temp', 'Humidity', 'Pressure', 'Acceleration-X', 'Acceleration-Y', 'Acceleration-Z', 'Power', 'Time', 'RuuviTagId',
    ];
    
    // Relation.
    //Funktio-palauttaa dataan liittyvän RuuviTagId:n RuuviTag-modelin kautta
    public function tag()
    {
        return $this->belongsTo(Ruuvitag::class, 'RuuviTagId');
    }
}
