<?php

namespace App\Http\Controllers\API\V1\Products;

use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Jobs\NotifyLowStockJob;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use App\Services\API\V1\ProductService;
use App\Http\Requests\API\V1\Products\ProductStoreOrUpdateRequest;

class ProductController extends Controller
{
    use ApiResponse;

    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of the products.
     */
    public function index()
    {
        try {
            $products = $this->productService->getAll();
            return $this->success($products, 'Products retrieved successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to retrieve products: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(ProductStoreOrUpdateRequest $request)
    {
        $data = $request->validated();

        try {
            $product = $this->productService->storeOrUpdate($data);
            return $this->success($product, 'Product created successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to create product: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified product.
     */
    public function show(string $id)
    {
        try {
            $product = $this->productService->getById($id);

            if (!$product) {
                return $this->error('Product not found', 404);
            }

            return $this->success($product, 'Product retrieved successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to retrieve product: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified product in storage.
     */
    public function update(ProductStoreOrUpdateRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $product = $this->productService->storeOrUpdate($data, $id);

            if (!$product) {
                return $this->error('Product not found', 404);
            }
            Cache::forget('products');
            return $this->success($product, 'Product updated successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to update product: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(string $id)
    {
        try {
            $deleted = $this->productService->delete($id);

            if (!$deleted) {
                return $this->error('Product not found', 404);
            }
            Cache::forget('products');
            return $this->success(null, 'Product deleted successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to delete product: ' . $e->getMessage(), 500);
        }
    }

    public function checkStock($productId)
    {
       try {
        $product = $this->productService->getById($productId);
        if ($product->stock < $product->minimum_stock_quantity) {
            NotifyLowStockJob::dispatch($product);
            return $this->success(null, 'Stock out mail sent.');
        }else{
            return $this->success(null, 'Stock checked successfully.');
        }
       
       } catch (\Exception $e) {
        return $this->error('Failed to delete product: ' . $e->getMessage(), 500);
       }
    }
}
