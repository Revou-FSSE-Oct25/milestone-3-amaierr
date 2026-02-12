'use client';

// import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, StickyNote } from 'lucide-react';

export default function CartPage() {
  // TODO CONTEXT 10: Connect to Cart Context
  // const { items, cartNote, updateCartNote, removeItem, total, clearCart } = useCart();
  
  // MOCK DATA for Starter
  const items: any[] = [];
  const cartNote = "";
  const total = 0;
  const updateCartNote = (note: string) => {};
  const removeItem = (id: string) => {};
  const clearCart = () => {};

  return (
    <div className="min-h-screen text-zinc-200 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE - CART ITEMS */}
        <div className="lg:col-span-2 bg-zinc-800 backdrop-blur rounded-2xl p-8 border border-zinc-700 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <span className="text-sm text-zinc-400">3 Items</span>
          </div>

          <div className="space-y-8">
            
            {/* ITEM */}
            {[1,2,3].map((item) => (
              <div key={item} className="flex gap-6 border-b border-zinc-300 pb-6">
                
                <img
                  src="https://via.placeholder.com/100"
                  alt="Product"
                  className="w-24 h-24 rounded-lg object-cover border border-zinc-400"
                />

                <div className="flex-1">
                  <h2 className="font-medium text-lg">Product Name</h2>
                  <p className="text-sm text-zinc-400/80 mb-3">PS4</p>

                  <button className="text-sm text-red-500 hover:text-red-400 transition">
                    Remove
                  </button>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-600 hover:bg-zinc-700 transition">
                    -
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-600 hover:bg-zinc-700 transition">
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-25">
                  <p className="text-sm text-zinc-400">$120.00</p>
                  <p className="font-semibold">$120.00</p>
                </div>
              </div>
            ))}

          </div>

          <div className="mt-6">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-zinc-800 backdrop-blur rounded-2xl p-8 border border-zinc-700 shadow-xl h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Items (3)</span>
              <span>$457.98</span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-zinc-300 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>$462.98</span>
            </div>

            <button className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium shadow-lg shadow-indigo-600/20">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>

  );
}