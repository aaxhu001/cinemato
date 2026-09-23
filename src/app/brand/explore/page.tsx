'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Search, 
  MapPin, 
  Users, 
  Tv, 
  Tag, 
  Filter, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { AdFormatCategory } from '@/types';

export default function BrandExplorePage() {
  const { cinemas } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedFormat, setSelectedFormat] = useState<AdFormatCategory | 'ALL'>('ALL');

  // Unique cities from cinemas
  const cities = ['ALL', ...Array.from(new Set(cinemas.map(c => c.city)))];

  // Filter cinemas
  const filteredCinemas = cinemas.filter(cinema => {
    // City filter
    if (selectedCity !== 'ALL' && cinema.city !== selectedCity) return false;

    // Format filter
    if (selectedFormat !== 'ALL') {
      const hasFormat = cinema.rateCard.some(rc => rc.category === selectedFormat && rc.isEnabled);
      if (!hasFormat) return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = cinema.name.toLowerCase().includes(q);
      const matchesArea = cinema.area.toLowerCase().includes(q);
      const matchesCity = cinema.city.toLowerCase().includes(q);
      if (!matchesName && !matchesArea && !matchesCity) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Search Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-cinema-slate border border-cinema-border space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cinema-gold">Cinema Marketplace</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Direct Exhibitor Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Discover Verified Cinema Ad Spaces
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Compare live rate-cards, audience footfall metrics, and reserve branded popcorn bucket wraps, interval video slots, and lobby activations directly from cinema managers.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Keyword Search */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Mall or Cinema name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cinema-midnight border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cinema-gold"
            />
          </div>

          {/* City Selector */}
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'ALL' ? '📍 All Cities' : `📍 ${city}`}
                </option>
              ))}
            </select>
          </div>

          {/* Ad Format Filter */}
          <div>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as any)}
              className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold cursor-pointer"
            >
              <option value="ALL">🍿 All Ad Formats</option>
              <option value="POPCORN_BUCKET">🍿 Popcorn Bucket Custom Sleeves</option>
              <option value="INTERVAL_VIDEO">🎬 Interval Gold-Spot (30s Video)</option>
              <option value="PRE_SHOW_SLIDE">🎞️ Pre-Show Slide & Reel</option>
              <option value="LOBBY_STANDEE">🪧 Lobby Standees & Digital</option>
              <option value="SEAT_BACKREST">🪑 Seat Backrest Decals</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Count & Dynamic Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredCinemas.length}</strong> verified cinema venues</span>
        <span className="flex items-center gap-1.5 text-cinema-emerald">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Rates updated in real-time by venue managers</span>
        </span>
      </div>

      {/* Cinema Listings Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCinemas.map((cinema) => {
          // Find lowest starting price among enabled items
          const enabledRates = cinema.rateCard.filter(r => r.isEnabled);
          const minPrice = enabledRates.length > 0 
            ? Math.min(...enabledRates.map(r => r.basePrice))
            : 0;

          return (
            <div
              key={cinema.id}
              className="rounded-3xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/50 transition duration-200 overflow-hidden group flex flex-col md:flex-row"
            >
              {/* Cinema Image Thumbnail */}
              <div className="md:w-72 h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-cinema-midnight">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-cinema-border text-[10px] font-bold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 text-cinema-gold fill-cinema-gold" />
                  <span>{cinema.rating}</span>
                  <span className="text-slate-400">({cinema.reviewCount})</span>
                </div>
              </div>

              {/* Cinema Details & Rate Card Overview */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-white font-display group-hover:text-cinema-gold transition">
                          {cinema.name}
                        </h2>
                        {cinema.verified && (
                          <span className="text-[10px] bg-cinema-emerald/15 text-emerald-400 border border-cinema-emerald/30 px-2 py-0.5 rounded-full font-bold">
                            KYC Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-cinema-crimson" />
                        <span>{cinema.area}, {cinema.city}</span>
                      </p>
                    </div>

                    {/* Pricing Badge */}
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Starting From</span>
                      <span className="text-xl font-extrabold text-cinema-gold font-display">
                        ${minPrice}
                        <span className="text-xs text-slate-400 font-normal"> / slot</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {cinema.tagline}
                  </p>

                  {/* Footfall & Audience Demographics */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cinema-gold" />
                      <span>Monthly Footfall: <strong className="text-white">{cinema.monthlyFootfall.toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-cinema-crimson" />
                      <span>{cinema.screensCount} Screens ({cinema.totalSeats} Seats)</span>
                    </div>
                    <div className="text-[11px] bg-cinema-midnight px-2 py-0.5 rounded-md border border-cinema-border text-slate-400">
                      🎯 {cinema.demographics.primaryAge}
                    </div>
                  </div>
                </div>

                {/* Available Formats Badges & Action */}
                <div className="pt-3 border-t border-cinema-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-slate-400">Channels:</span>
                    {cinema.rateCard.filter(r => r.isEnabled).map((rc) => (
                      <span
                        key={rc.id}
                        className="text-[10px] bg-cinema-midnight border border-cinema-border px-2 py-0.5 rounded text-slate-300 font-medium"
                      >
                        {rc.icon} {rc.name.split(' ')[0]} (${rc.basePrice})
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/brand/cinema/${cinema.id}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <span>View Rate-Card & Customize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
