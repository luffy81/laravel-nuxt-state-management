<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart; // Assuming you have a Cart model

class CartController extends Controller
{
    public function index()
    {
        // Get cart items for the authenticated user
        $cartItems = Cart::with('product')->get();
        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        // Validate and add item to the cart
        $request->validate([
            'productId.id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::firstOrCreate(
            ['product_id' => $request->productId['id']],
            ['quantity' => 0]
        );

        $cart->increment('quantity', $request->quantity);

        return response()->json($cart);
    }

    public function destroy($productId)
    {
        // Remove the item from the cart
        $cartItem = Cart::where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return response()->json(['message' => 'Item removed from cart.']);
    }

    public function update(Request $request, $productId)
    {
        // Validate and update item quantity in the cart
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
        }

        return response()->json(['message' => 'Cart item updated.']);
    }
}

