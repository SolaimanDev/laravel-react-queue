<?php

namespace App\Services\API\V1;

use App\Models\Country;
use App\Models\Product;
use App\Services\BaseService;
use Illuminate\Support\Facades\Cache;


class ProductService extends BaseService
{
    protected $model;

    public function __construct()
    {
        $this->model = Product::class;
    }

    public function storeOrUpdate($data, $id = null)
    {
      
        return parent::storeOrUpdate($data, $id);
        
    }
    public function getAll()
    {
        return Cache::remember('products', 60, function () {
            return $this->model::get();
        });
        
    }
    public function getById($id)
    {
        return $this->model::find($id);
    }

}