<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Check if a category_id is provided in the request
        $categoryId = $request->query('category_id');

        if ($categoryId) {
            // Fetch products that belong to the selected category
            $products = Product::where('category_id', $categoryId)->get();
        } else {
            // Fetch all products if no category is selected
            $products = Product::all();
        }

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('product_images', 'public');
            $validatedData['image'] = $imagePath;

            // Get the public URL for the stored image
            $url = Storage::url($imagePath);
            dd($url);
        }

        // dd($validatedData);
        $product = Product::create($validatedData);

        return response()->json($product);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->save();

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
