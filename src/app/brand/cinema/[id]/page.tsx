'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  MapPin, 
  Users, 
  Tv, 
  Star, 
  ShieldCheck, 
  Plus, 
  ShoppingBag, 
  Check, 
  ArrowLeft,
  Calendar,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { RateCardItem, CartItem } from '@/types';

export default function CinemaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { cinemas, addToCart, cart } = useMarketplace();
  
  const cinema = cinemas.find(c => c.id === id);
  if (!cinema) {
    notFound();
  }

  // Local state for quantity configuration for each rateCard item
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    cinema.rateCard.forEach(item => {
      initial[item.id] = item.minUnits;
    });
    return initial;
  });

  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleQtyChange = (itemId: string, val: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, val),
    }));
  };

  const handleAddToCart = (item: RateCardItem) => {
    const qty = quantities[item.id] || item.minUnits;
    let totalPrice = 0;

    if (item.category === 'POPCORN_BUCKET') {
      // e.g. basePrice is per 1000 tubs
      totalPrice = (qty / 1000) * item.basePrice;
    } else if (item.category === 'INTERVAL_VIDEO' || item.category === 'PRE_SHOW_SLIDE') {
      // qty represents weeks
      totalPrice = qty * item.basePrice;
    } else {
      totalPrice = qty * item.basePrice;
    }

    const cartItem: CartItem = {
      cinemaId: cinema.id,
      cinemaName: cinema.name,
      rateCardItemId: item.id,
      serviceName: item.name,
      category: item.category,
      quantity: qty,
      durationWeeks: item.category === 'INTERVAL_VIDEO' || item.category === 'PRE_SHOW_SLIDE' ? qty : undefined,
      unitPrice: item.basePrice,
      totalPrice,
    };

    addToCart(cartItem);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  const totalCartValue = cart.reduce((sum, i) => sum + i.totalPrice, 0);

  return (
    <div className="space-y-6">
      
      {/* Back button */}
      <Link href="/brand/explore" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cinema-gold font-bold transition">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Cinema Directory</span>
      </Link>

      {/* Hero Card */}
      <div className="rounded-3xl bg-cinema-slate border border-cinema-border overflow-hidden">
        <div className="h-64 sm:h-80 w-full relative">
          <img src={cinema.image} alt={cinema.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-slate via-cinema-slate/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30 px-2.5 py-0.5 rounded-full font-bold">
                  ✓ Verified Exhibitor
                </span>
                <span className="text-xs text-slate-300 font-semibold">{cinema.chain}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">{cinema.name}</h1>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cinema-crimson" />
                <span>{cinema.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-cinema-midnight/90 backdrop-blur-md p-3 rounded-2xl border border-cinema-border">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block">Monthly Footfall</span>
                <span className="text-sm font-bold text-white">{cinema.monthlyFootfall.toLocaleString()}</span>
              </div>
              <div className="w-px h-7 bg-cinema-border" />
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block">Total Screens</span>
                <span className="text-sm font-bold text-cinema-gold">{cinema.screensCount} Screens</span>
              </div>
              <div className="w-px h-7 bg-cinema-border" />
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block">Rating</span>
                <span className="text-sm font-bold text-emerald-400">★ {cinema.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Rate Card Menu + Sticky Cart Tray */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: The Ad Services Menu */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white font-display">Available Ad Formats & Services</h2>
              <p className="text-xs text-slate-400">Select formats and quantities to customize your campaign</p>
            </div>
            <span className="text-xs text-cinema-emerald font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Cinema Pricing</span>
            </span>
          </div>

          <div className="space-y-4">
            {cinema.rateCard.filter(r => r.isEnabled).map((item) => {
              const currentQty = quantities[item.id] || item.minUnits;
              const isAdded = addedItemIds[item.id];
              
              let estimatedCost = 0;
              if (item.category === 'POPCORN_BUCKET') {
                estimatedCost = (currentQty / 1000) * item.basePrice;
              } else {
                estimatedCost = currentQty * item.basePrice;
              }

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl p-2.5 rounded-xl bg-cinema-midnight border border-cinema-border">{item.icon}</span>
                      <div>
                        <h3 className="text-base font-bold text-white font-display">{item.name}</h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                        
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                          <Info className="w-3 h-3 text-cinema-gold" />
                          <span>Specs: {item.specs}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right flex-shrink-0">
                      <span className="text-lg font-extrabold text-cinema-gold font-display">${item.basePrice}</span>
                      <span className="text-[10px] text-slate-400 block">{item.unitLabel}</span>
                    </div>
                  </div>

                  {/* Quantity Configurator & Add Button */}
                  <div className="pt-3 border-t border-cinema-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    
                    {/* Units Selector */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-bold">
                        {item.category === 'POPCORN_BUCKET' ? 'Quantity (Tubs):' : 'Duration (Weeks):'}
                      </span>
                      
                      {item.category === 'POPCORN_BUCKET' ? (
                        <select
                          value={currentQty}
                          onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value, 10))}
                          className="bg-cinema-midnight border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cinema-gold"
                        >
                          <option value={3000}>3,000 Tubs</option>
                          <option value={5000}>5,000 Tubs</option>
                          <option value={10000}>10,000 Tubs</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleQtyChange(item.id, currentQty - 1)}
                            className="w-7 h-7 rounded-lg bg-cinema-midnight border border-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-700"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">{currentQty}</span>
                          <button
                            onClick={() => handleQtyChange(item.id, currentQty + 1)}
                            className="w-7 h-7 rounded-lg bg-cinema-midnight border border-slate-700 text-white flex items-center justify-center font-bold hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      )}

                      <div className="text-xs text-slate-300 pl-2">
                        Est: <strong className="text-white">${estimatedCost.toFixed(0)}</strong>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow ${
                        isAdded
                          ? 'bg-cinema-emerald text-cinema-midnight'
                          : 'bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Campaign Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Campaign Cart Summary */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cinema-gold" />
                <span>Campaign Cart</span>
              </h3>
              <span className="text-xs bg-cinema-gold/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                {cart.length} Slots
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-xs">Your campaign cart is currently empty.</p>
                <p className="text-[10px] text-slate-500">Add popcorn tubs or screen slots to build your multi-theatre run.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{item.serviceName}</span>
                      <span className="text-cinema-gold">${item.totalPrice}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.cinemaName} • {item.quantity.toLocaleString()} {item.category === 'POPCORN_BUCKET' ? 'tubs' : 'weeks'}
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-cinema-border/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">${totalCartValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Escrow Trust Protection:</span>
                    <span className="font-semibold text-cinema-emerald">Included ($0)</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-cinema-gold pt-2 border-t border-cinema-border">
                    <span>Estimated Total:</span>
                    <span>${totalCartValue.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/brand/checkout"
                  className="block text-center w-full py-3 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition mt-4"
                >
                  Proceed to Escrow Checkout →
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
