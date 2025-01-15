<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Auth\AuthController;
use App\Http\Controllers\API\V1\Products\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});




Route::middleware('auth:sanctum')->group(function () {
   // Route::get('users', [UserController::class, 'index']);
   // Route::get('users/{id}', [UserController::class, 'show']);
   Route::apiResource('products', ProductController::class);
   Route::get('products/check-stock/{id}', [ProductController::class, 'checkStock']);
});
