'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Building2, 
  Search, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowUpRight, 
  Film, 
  Users, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function BrandDashboardPage() {
  const { campaigns, cart } = useMarketplace();

  // Calculate high-level advertiser KPIs
  const activeCampaigns = campaigns.filter(c => c.status === 'LIVE_IN_THEATRE' || c.status === 'ACCEPTED_SCHEDULED');
  const totalEscrowHeld = campaigns.reduce((sum, c) => c.status !== 'COMPLETED_SETTLED' ? sum + c.escrowHeld : sum, 0);
  
  // Total popcorn tubs booked
  const totalPopcornTubs = campaigns.reduce((sum, c) => {
    const tubItems = c.items.filter(i => i.category === 'POPCORN_BUCKET');
    return sum + tubItems.reduce((s, i) => s + i.quantity, 0);
  }, 0);

  return (
    <div className="space-y-6">
      
      {/* Brand Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cinema-slate via-[#18233C] to-cinema-midnight border border-cinema-border p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cinema-gold/20 text-amber-400 border border-cinema-gold/30">
                Verified Brand Advertiser
              </span>
              <span className="text-xs text-slate-400">Account: Acme Peak Brands</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Cinema Advertising Campaign Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Dominate captive, 100% focused movie audiences. Book on-screen interval gold-spots, branded popcorn bucket sleeves, and lobby activations across 500+ cinema screens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/brand/explore"
              className="flex items-center gap-2 px-5 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition"
            >
              <Search className="w-4 h-4" />
              <span>Explore Cinema Directory</span>
            </Link>
            {cart.length > 0 && (
              <Link
                href="/brand/checkout"
                className="flex items-center gap-2 px-4 py-2.5 bg-cinema-crimson hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart ({cart.length})</span>
              </Link>
            )}
          </div>
        </div>

        {/* Decorative ambient lighting */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cinema-gold/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top 4 Performance KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Campaigns</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-gold/10 text-cinema-gold flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            {activeCampaigns.length} Running
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 3 regional multiplexes</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Popcorn Tubs Handed</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
              🍿
            </div>
          </div>
          <div className="text-2xl font-extrabold text-cinema-gold mt-2 font-display">
            {totalPopcornTubs.toLocaleString()}
          </div>
          <p className="text-[11px] text-cinema-emerald font-medium mt-1">120+ min tactile audience hold</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Audience Footfall Reached</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            130,000+
          </div>
          <p className="text-[11px] text-slate-400 mt-1">94% unskippable recall rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Escrow Protection</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-emerald/10 text-cinema-emerald flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-cinema-emerald mt-2 font-display">
            ${totalEscrowHeld.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <Link href="/brand/audit" className="inline-flex items-center gap-1 text-[11px] text-cinema-emerald font-semibold mt-1 hover:underline">
            <span>Audit Photo Proofs</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

      {/* Main Content: Campaigns Pipeline & Recommended Cinemas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Campaign Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display">Your Campaign Orders & Status</h2>
            <Link href="/brand/audit" className="text-xs text-cinema-gold hover:underline font-semibold">
              View Verified Proof Gallery →
            </Link>
          </div>

          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/40 transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cinema-border/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white font-display">{camp.campaignTitle}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        camp.status === 'LIVE_IN_THEATRE' ? 'bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30' :
                        camp.status === 'PENDING_CINEMA_ACCEPTANCE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {camp.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Venue: <strong className="text-slate-200">{camp.cinemaName}</strong> • Dates: {camp.startDate} to {camp.endDate}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block">Total Budget (Escrow Held)</span>
                    <span className="text-sm font-extrabold text-cinema-gold">
                      ${camp.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Formats Booked */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400">Inventory:</span>
                  {camp.items.map((item, idx) => (
                    <span key={idx} className="text-[11px] bg-cinema-midnight border border-cinema-border px-2.5 py-1 rounded-lg text-slate-300 font-medium">
                      {item.category === 'POPCORN_BUCKET' ? '🍿' : '🎬'} {item.serviceName}
                      {item.category === 'POPCORN_BUCKET' && ` (${item.quantity.toLocaleString()} tubs)`}
                    </span>
                  ))}
                </div>

                {/* Proof of Execution Status */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-cinema-emerald" />
                    <span>Verified Proof: <strong className="text-white">{camp.proofs.length} Evidence Photos Submitted</strong></span>
                  </div>

                  {camp.proofs.length > 0 ? (
                    <Link href="/brand/audit" className="text-cinema-emerald hover:underline font-bold flex items-center gap-1">
                      <span>Inspect Audit Photos</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-slate-500 text-[11px]">Cinema photo upload in progress</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Exploration CTA & Why Cinema Ads */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cinema-card to-cinema-slate border border-cinema-border space-y-4">
            <div className="flex items-center gap-2 text-cinema-gold">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold font-display">Discover New Screen Real Estate</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore 500+ cinema screens across premier malls and heritage theatres. Book custom popcorn tubs, 30s interval spots, and lobby standees at direct rates.
            </p>
            <Link
              href="/brand/explore"
              className="block text-center w-full py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow transition"
            >
              Browse Cinema Rate-Cards →
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cinemato Trust Guarantee</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cinema-emerald flex-shrink-0 mt-0.5" />
                <span>100% Escrow Protection: funds only release after photo verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cinema-emerald flex-shrink-0 mt-0.5" />
                <span>Geotagged & timestamped photos of your popcorn buckets in actual hands.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cinema-emerald flex-shrink-0 mt-0.5" />
                <span>Direct cinema exhibitor rates with zero agency markups.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
