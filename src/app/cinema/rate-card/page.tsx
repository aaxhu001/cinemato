'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Tag, 
  Save, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Info,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { RateCardItem } from '@/types';

export default function CinemaRateCardPage() {
  const { activeCinema, updateRateCardItem, toggleRateCardItem } = useMarketplace();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [surgeActive, setSurgeActive] = useState(true);

  const handlePriceChange = (item: RateCardItem, newPriceStr: string) => {
    const num = parseFloat(newPriceStr) || 0;
    updateRateCardItem(activeCinema.id, {
      ...item,
      basePrice: num,
    });
  };

  const handleMinUnitsChange = (item: RateCardItem, newMinStr: string) => {
    const num = parseInt(newMinStr, 10) || 1;
    updateRateCardItem(activeCinema.id, {
      ...item,
      minUnits: num,
    });
  };

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cinema-crimson">Cinema Rates Control</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{activeCinema.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Dynamic Rate-Card & Services Switchboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Choose exactly which in-cinema advertising channels you want to offer to brands, set your custom pricing, and apply seasonal blockbuster surcharges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Publish Rate-Card</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cinema-emerald/15 border border-cinema-emerald/40 flex items-center justify-between gap-3 text-cinema-emerald animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-cinema-emerald" />
            <span>Your rate-card updates are live! Advertisers in the marketplace can now book with your new rates.</span>
          </div>
          <Link href="/brand/explore" className="text-xs font-bold underline hover:text-white flex items-center gap-1">
            <span>Preview on Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Blockbuster Surge Multiplier Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-cinema-slate to-cinema-slate border border-cinema-crimson/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cinema-crimson/20 text-cinema-crimson flex items-center justify-center flex-shrink-0 mt-0.5">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Blockbuster & Festival Release Multiplier</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cinema-crimson/20 text-red-400 border border-cinema-crimson/30">
                +25% Surge
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Automatically apply a 25% surcharge during holiday releases (e.g., Diwali, Christmas, Summer tentpoles) when auditorium footfall exceeds 85% occupancy.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSurgeActive(!surgeActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            surgeActive
              ? 'bg-cinema-crimson text-white shadow-lg shadow-cinema-crimson/20'
              : 'bg-cinema-input text-slate-400 hover:text-white border border-cinema-border'
          }`}
        >
          <span>{surgeActive ? '✓ Surge Active (+25%)' : 'Disabled'}</span>
        </button>
      </div>

      {/* The Rate Card Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Active Ad Channels ({activeCinema.rateCard.filter(r => r.isEnabled).length} Enabled)</span>
          <span>Changes save instantly to your active listing</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeCinema.rateCard.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition ${
                item.isEnabled
                  ? 'bg-cinema-slate border-cinema-border hover:border-cinema-crimson/40'
                  : 'bg-cinema-midnight/60 border-cinema-border/50 opacity-60'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Icon, Title, Description */}
                <div className="flex items-start gap-4 max-w-xl">
                  {/* Enable/Disable Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer mt-1 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={item.isEnabled}
                      onChange={() => toggleRateCardItem(activeCinema.id, item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-cinema-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-crimson"></div>
                  </label>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.icon}</span>
                      <h3 className="text-base font-bold text-white font-display">
                        {item.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.isEnabled ? 'bg-cinema-emerald/10 text-emerald-400 border border-cinema-emerald/20' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {item.isEnabled ? 'Live on Marketplace' : 'Paused'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400">
                      <Info className="w-3.5 h-3.5 text-cinema-gold" />
                      <span>Specifications: <strong className="text-slate-300">{item.specs}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing Inputs */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-cinema-midnight p-4 rounded-xl border border-cinema-border">
                  
                  {/* Base Price Input */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      {item.category === 'POPCORN_BUCKET' ? 'Price per 1k Tubs ($)' : 'Price / Slot ($)'}
                    </label>
                    <div className="relative">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      <input
                        type="number"
                        min="1"
                        value={item.basePrice}
                        disabled={!item.isEnabled}
                        onChange={(e) => handlePriceChange(item, e.target.value)}
                        className="w-32 bg-cinema-input border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-cinema-gold disabled:opacity-50"
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 block mt-0.5 truncate max-w-[128px]">
                      {item.unitLabel}
                    </span>
                  </div>

                  {/* Minimum Order Units */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      {item.category === 'POPCORN_BUCKET' ? 'Min Tubs Batch' : 'Min Duration (Wks)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      step={item.category === 'POPCORN_BUCKET' ? '1000' : '1'}
                      value={item.minUnits}
                      disabled={!item.isEnabled}
                      onChange={(e) => handleMinUnitsChange(item, e.target.value)}
                      className="w-28 bg-cinema-input border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-cinema-gold disabled:opacity-50"
                    />
                    <span className="text-[9px] text-slate-500 block mt-0.5">
                      {item.category === 'POPCORN_BUCKET' ? 'Minimum print run' : 'Min booking duration'}
                    </span>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-cinema-slate border border-cinema-border">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cinema-gold" />
          <div className="text-xs">
            <span className="font-bold text-white block">Automated Escrow Protection</span>
            <span className="text-slate-400">Cinemato holds 100% of brand payment in escrow before booking starts.</span>
          </div>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition"
        >
          Publish All Updates
        </button>
      </div>

    </div>
  );
}
