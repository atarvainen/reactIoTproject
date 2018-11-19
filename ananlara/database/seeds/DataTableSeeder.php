<?php

use Illuminate\Database\Seeder;
use App\Data;

class DataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    /*
    protected $fillable = [
        'Count', 'Temp', 'Humidity', 'Pressure', 'Acceleration-X', 'Acceleration-Y', 'Acceleration-Z', 'Power', 'Time', 'RuuviTagId',
    ];
    */
    public function run()
    {
        $faker = \Faker\Factory::create();
 
        // Create 50 product records
        for ($i = 0; $i < 50; $i++) {
            Data::create([
                'Temp' => $faker->randomNumber(2),
                'Humidity' => $faker->randomNumber(2),
                'Pressure' => $faker->randomNumber(4),
                'Acceleration-X' => $faker->randomNumber(4),
                'Acceleration-Y' => $faker->randomNumber(4),
                'Acceleration-Z' => $faker->randomNumber(4),
                'Power' => $faker->randomNumber(3),
                'RuuviTagId' => 212430275022395
            ]);
        }
        for ($i = 0; $i < 50; $i++) {
            Data::create([
                'Temp' => $faker->randomNumber(2),
                'Humidity' => $faker->randomNumber(2),
                'Pressure' => $faker->randomNumber(4),
                'Acceleration-X' => $faker->randomNumber(4),
                'Acceleration-Y' => $faker->randomNumber(4),
                'Acceleration-Z' => $faker->randomNumber(4),
                'Power' => $faker->randomNumber(3),
                'RuuviTagId' => 233434952203111
            ]);
        }
        for ($i = 0; $i < 50; $i++) {
            Data::create([
                'Temp' => $faker->randomNumber(2),
                'Humidity' => $faker->randomNumber(2),
                'Pressure' => $faker->randomNumber(4),
                'Acceleration-X' => $faker->randomNumber(4),
                'Acceleration-Y' => $faker->randomNumber(4),
                'Acceleration-Z' => $faker->randomNumber(4),
                'Power' => $faker->randomNumber(3),
                'RuuviTagId' => 244290185097070
            ]);
        }
        for ($i = 0; $i < 50; $i++) {
            Data::create([
                'Temp' => $faker->randomNumber(2),
                'Humidity' => $faker->randomNumber(2),
                'Pressure' => $faker->randomNumber(4),
                'Acceleration-X' => $faker->randomNumber(4),
                'Acceleration-Y' => $faker->randomNumber(4),
                'Acceleration-Z' => $faker->randomNumber(4),
                'Power' => $faker->randomNumber(3),
                'RuuviTagId' => 257385652260480
            ]);
        }
    }
}
