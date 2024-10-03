<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('carts', CartController::class);
Route::prefix('cart')->group(function () {
    Route::post('/', [CartController::class, 'store']);
    Route::get('/', [CartController::class, 'index']);
    Route::delete('/{productId}', [CartController::class, 'remove']);
    Route::put('/{productId}', [CartController::class, 'update']);
});

