'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Trash2, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  DollarSign, 
  Lock,
  ArrowRight,
  Film
} from 'lucide-react';

export default function BrandCheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, checkoutCampaign } = useMarketplace();

  const [campaignTitle, setCampaignTitle] = useState('Festive Blockbuster Blitz');
  const [brandName, setBrandName] = useState('Acme Peak Nutrition');
  const [startDate, setStartDate] = useState('2026-10-02');
  const [endDate, setEndDate] = useState('2026-10-16');
  const [creativeType, setCreativeType] = useState('4K DCP Flat Video + Popcorn Bucket Wrap CMYK PDF');
  const [cbfcNumber, setCbfcNumber] = useState('CBFC/MUM/AD/2026-10/5082');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const escrowFee = 0; // Included free
  const gstTax = subtotal * 0.18; // 18% standard GST/Tax
  const grandTotal = subtotal + gstTax;

  const handleSubmitCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      checkoutCampaign({
        brandName,
        campaignTitle,
        startDate,
        endDate,
        creativeType,
        cbfcNumber,
      });

      router.push('/brand/dashboard');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white font-display">Your Campaign Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Explore our cinema directory to find multiplexes and single-screen theatres with available popcorn buckets and screen slots.
        </p>
        <Link
          href="/brand/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow transition"
        >
          <span>Explore Cinema Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cinema-gold">Campaign Booking</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">Escrow Protected Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Lock Escrow & Submit Campaign
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Review your selected cinema inventory items, set campaign release schedules, and lock your budget in escrow. Funds are only disbursed after cinema managers submit verified photo/video proof.
        </p>
      </div>

      {/* Main Grid: Form Left, Summary Right */}
      <form onSubmit={handleSubmitCampaign} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Campaign Details & Selected Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cart Items Table */}
          <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cinema-gold" />
              <span>Selected Cinema Inventory ({cart.length} Channels)</span>
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.rateCardItemId}
                  className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-cinema-slate border border-cinema-border">
                      {item.category === 'POPCORN_BUCKET' ? '🍿' : item.category === 'INTERVAL_VIDEO' ? '🎬' : '🪧'}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.serviceName}</h4>
                      <p className="text-[11px] text-slate-400">
                        {item.cinemaName} • {item.quantity.toLocaleString()} {item.category === 'POPCORN_BUCKET' ? 'custom printed tubs' : 'weeks of interval screening'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-cinema-gold font-display">${item.totalPrice.toFixed(2)}</span>
                      <span className="text-[9px] text-slate-500 block">Direct Cinema Rate</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.rateCardItemId)}
                      className="text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Details Form */}
          <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4 text-xs">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cinema-gold" />
              <span>Campaign Schedule & Creative Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Brand / Advertiser Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>
            </div>

            {/* Creative Specifications */}
            <div className="pt-2 border-t border-cinema-border/60 space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Creative Asset Type</label>
                <input
                  type="text"
                  value={creativeType}
                  onChange={(e) => setCreativeType(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Specs: 4K DCI Flat (1.85:1) or Scope (2.39:1), CMYK 300 DPI for popcorn bucket wraps.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">CBFC / Censor Clearance Certificate Number</label>
                <input
                  type="text"
                  placeholder="e.g. CBFC/MUM/AD/2026/XXXX"
                  value={cbfcNumber}
                  onChange={(e) => setCbfcNumber(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold font-mono"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Col: Escrow Settlement & Payment */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Lock className="w-4 h-4 text-cinema-emerald" />
                <span>Escrow Settlement</span>
              </h3>
              <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30 px-2 py-0.5 rounded-full font-bold">
                100% Insured
              </span>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Media Subtotal:</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Escrow Hold Fee:</span>
                <span className="font-bold text-cinema-emerald">$0.00 (Free)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GST / Taxes (18%):</span>
                <span className="font-bold text-white">${gstTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-cinema-border flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total to Lock in Escrow:</span>
                <span className="text-xl font-extrabold text-cinema-gold font-display">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Escrow Guarantee Box */}
            <div className="p-3.5 rounded-xl bg-cinema-midnight border border-cinema-border/80 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cinema-emerald flex-shrink-0 mt-0.5" />
                <span>
                  Funds remain safely locked in escrow until the cinema owner uploads geotagged photo proof of popcorn buckets and projectionist run logs.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-extrabold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Locking Escrow & Dispatching...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Lock Escrow & Launch Campaign (${grandTotal.toFixed(0)})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
