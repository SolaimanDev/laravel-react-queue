<?php

namespace App\Http\Requests\API\V1\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductStoreOrUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('post')) {
            // Rules for creating a new product
            return [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('products', 'name'), // Must be unique for all products
                ],
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'minimum_stock_quantity' => 'required|integer|min:0',
            ];
        } elseif ($this->isMethod('put') || $this->isMethod('patch')) {
            // Rules for updating an existing product
            $productId = $this->route('id'); // Retrieve the product ID from the route
            return [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                   
                ],
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'minimum_stock_quantity' => 'required|integer|min:0',
            ];
        }

        return [];
    }
}
