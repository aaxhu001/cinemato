'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Film, 
  Building2, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Users, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  MapPin, 
  ChevronRight,
  Sliders,
  Layers,
  Camera
} from 'lucide-react';
import { AdFormatCategory } from '@/types';

export default function HomePage() {
  const { cinemas, addToCart } = useMarketplace();

  // Search widget state
  const [searchCity, setSearchCity] = useState('ALL');
  const [searchFormat, setSearchFormat] = useState<string>('ALL');

  // Interactive Calculator State
  const [calcScreens, setCalcScreens] = useState(3);
  const [calcTubs, setCalcTubs] = useState(5000);
  const [calcWeeks, setCalcWeeks] = useState(2);

  // Active showcase tab
  const [activeFormatTab, setActiveFormatTab] = useState<'POPCORN' | 'INTERVAL' | 'STANDEE' | 'SEAT'>('POPCORN');

  // Dynamic calculations
  const impressionsPerScreenPerWeek = 4500;
  const totalAudienceReach = (calcScreens * calcWeeks * impressionsPerScreenPerWeek) + (calcTubs * 1.5);
  const estimatedCost = (calcScreens * calcWeeks * 650) + ((calcTubs / 1000) * 250);

  const cities = ['ALL', ...Array.from(new Set(cinemas.map(c => c.city)))];

  return (
    <div className="min-h-screen bg-cinema-midnight text-slate-100 flex flex-col selection:bg-cinema-gold selection:text-cinema-midnight">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-cinema-border bg-cinema-slate/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
          
          <Logo size="md" showTagline={true} />

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#marketplace" className="hover:text-cinema-gold transition">Browse Cinemas</a>
            <a href="#calculator" className="hover:text-cinema-gold transition">Reach & Cost Calculator</a>
            <a href="#formats" className="hover:text-cinema-gold transition">Ad Inventory Formats</a>
            <a href="#how-it-works" className="hover:text-cinema-gold transition">How It Works</a>
          </nav>

          {/* Quick Portal Switcher / Entry Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/cinema/dashboard"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cinema-crimson/15 text-red-400 border border-cinema-crimson/30 hover:bg-cinema-crimson hover:text-white transition"
            >
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cinema Owners</span>
              <span className="sm:hidden">Cinema</span>
            </Link>

            <Link
              href="/brand/explore"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cinema-gold text-cinema-midnight hover:bg-cinema-gold-hover shadow-lg shadow-cinema-gold/20 transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Business / Brand Owners</span>
              <span className="sm:hidden">Brands</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">

        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden py-16 sm:py-24 border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cinema-gold/15 border border-cinema-gold/30 text-cinema-gold text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Programmatic In-Cinema Ad Exchange</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15]">
              Where Brands Meet <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cinema-gold via-amber-200 to-cinema-crimson">
                The Big Screen
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
              Book captive, unskippable offline cinema advertising directly from theatre owners. Launch custom popcorn bucket sleeves, 30-second interval spots, and lobby standees with 100% escrow protection.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="mt-10 max-w-3xl mx-auto p-3 rounded-2xl bg-cinema-slate border-2 border-cinema-border shadow-2xl flex flex-col sm:flex-row items-center gap-2">
              
              {/* City selector */}
              <div className="w-full sm:w-1/3">
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-cinema-gold cursor-pointer"
                >
                  <option value="ALL">📍 All Cities</option>
                  {cities.filter(c => c !== 'ALL').map(c => (
                    <option key={c} value={c}>📍 {c}</option>
                  ))}
                </select>
              </div>

              {/* Format selector */}
              <div className="w-full sm:w-1/3">
                <select
                  value={searchFormat}
                  onChange={(e) => setSearchFormat(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-cinema-gold cursor-pointer"
                >
                  <option value="ALL">🍿 All Ad Formats</option>
                  <option value="POPCORN_BUCKET">🍿 Popcorn Bucket Sleeves</option>
                  <option value="INTERVAL_VIDEO">🎬 Interval Gold-Spot Video</option>
                  <option value="LOBBY_STANDEE">🪧 Lobby Standees</option>
                </select>
              </div>

              {/* Action Button */}
              <Link
                href={`/brand/explore?city=${searchCity}&format=${searchFormat}`}
                className="w-full sm:w-1/3 flex items-center justify-center gap-2 py-3 px-6 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Find 500+ Cinemas</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cinema-emerald" />
                <span>100% Escrow Protection</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Camera className="w-4 h-4 text-cinema-gold" />
                <span>Geotagged Photo Verification</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Tag className="w-4 h-4 text-cinema-crimson" />
                <span>Zero Broker Commission Inflation</span>
              </span>
            </div>

          </div>

          {/* Ambient Cinema Lighting Glow */}
          <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-cinema-gold/10 rounded-full blur-[120px] pointer-events-none" />
        </section>

        {/* 2. DUAL ROLE ACTION PORTALS */}
        <section className="py-16 bg-cinema-slate/40 border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Built For Both Sides of the Cinema Economy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Whether you own a 5-screen multiplex or run marketing for a national brand, Cinemato handles the transaction seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cinema Owners Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#161D2E] to-cinema-slate border-2 border-cinema-border hover:border-cinema-crimson/50 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cinema-crimson/20 text-red-400 border border-cinema-crimson/30 flex items-center justify-center mb-4">
                    <Film className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cinema-crimson block mb-1">For Cinema Exhibitors</span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Turn Idle Popcorn Tubs & Screen Time into Guaranteed Profit
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Set your own rate cards, decide what formats you offer (popcorn buckets, 30s interval video, lobby standees), review brand booking requests, and upload photo proof to receive direct bank payouts.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-crimson" />
                      <span>Dynamic Rate-Card switchboard with +25% festival surge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-crimson" />
                      <span>100% guaranteed funds locked in escrow before show runs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-crimson" />
                      <span>Direct wire payout to your bank account</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-cinema-border/60">
                  <Link
                    href="/cinema/dashboard"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-cinema-crimson hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cinema-crimson/20 transition"
                  >
                    <span>Launch Cinema Owners Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Brand Advertisers Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1C253B] to-cinema-slate border-2 border-cinema-border hover:border-cinema-gold/50 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cinema-gold block mb-1">For Brand Advertisers</span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Reach 100% Attentive, Captive Moviegoers with Proven Recall
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Zero ad-blockers, zero skip buttons. Combine big-screen interval commercials with tactile popcorn bucket wraps that viewers hold for 120+ minutes during blockbuster releases.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-gold" />
                      <span>Browse 500+ verified cinema halls by city and footfall tier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-gold" />
                      <span>Self-serve modular cart checkout with transparent pricing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cinema-gold" />
                      <span>Inspect geotagged photos of custom popcorn tubs in viewer hands</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-cinema-border/60">
                  <Link
                    href="/brand/explore"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition"
                  >
                    <span>Launch Business Owners Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE REACH & ROI CALCULATOR */}
        <section id="calculator" className="py-16 border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cinema-slate via-[#151E32] to-cinema-midnight border border-cinema-border shadow-2xl">
              
              <div className="max-w-2xl mb-8">
                <span className="text-xs uppercase font-bold tracking-widest text-cinema-gold block mb-1">
                  Interactive Campaign Estimator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Estimate Your Cinema Audience Reach & Budget
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Adjust the sliders to simulate a multi-theatre run combining on-screen interval video and branded popcorn bucket sleeves.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* Sliders Left */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Slider 1: Target Screens */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-white mb-2">
                      <span>Target Auditorium Screens:</span>
                      <span className="text-cinema-gold font-mono">{calcScreens} Screens</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={calcScreens}
                      onChange={(e) => setCalcScreens(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-cinema-input rounded-lg appearance-none cursor-pointer accent-cinema-gold"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>1 Screen (Single Audi)</span>
                      <span>15 Screens (City-wide Multiplex Network)</span>
                    </div>
                  </div>

                  {/* Slider 2: Branded Popcorn Tubs */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-white mb-2">
                      <span>Custom Popcorn Bucket Wraps:</span>
                      <span className="text-cinema-gold font-mono">{calcTubs.toLocaleString()} Tubs</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="25000"
                      step="1000"
                      value={calcTubs}
                      onChange={(e) => setCalcTubs(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-cinema-input rounded-lg appearance-none cursor-pointer accent-cinema-gold"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>1,000 Tubs (Single Release)</span>
                      <span>25,000 Tubs (Mega Blockbuster Run)</span>
                    </div>
                  </div>

                  {/* Slider 3: Campaign Duration */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-white mb-2">
                      <span>Screening Duration:</span>
                      <span className="text-cinema-gold font-mono">{calcWeeks} Weeks</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={calcWeeks}
                      onChange={(e) => setCalcWeeks(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-cinema-input rounded-lg appearance-none cursor-pointer accent-cinema-gold"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>1 Week (Opening Weekend Focus)</span>
                      <span>4 Weeks (Extended Theatrical Window)</span>
                    </div>
                  </div>

                </div>

                {/* Calculation Output Card */}
                <div className="p-6 rounded-2xl bg-cinema-midnight border border-cinema-gold/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
                    <span className="text-xs font-bold text-slate-400">Estimated Metrics</span>
                    <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      94% Attention
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Footfall Impressions</span>
                      <span className="text-2xl font-extrabold text-white font-display">
                        {totalAudienceReach.toLocaleString()}+
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Average Tactile Brand Hold</span>
                      <span className="text-lg font-bold text-cinema-emerald font-display">
                        120 Minutes
                      </span>
                    </div>

                    <div className="pt-2 border-t border-cinema-border">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Indicative Media Budget</span>
                      <span className="text-2xl font-extrabold text-cinema-gold font-display">
                        ${estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/brand/explore"
                    className="block text-center w-full py-3 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow transition"
                  >
                    Select Theatres & Launch →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 4. AD FORMATS SHOWCASE */}
        <section id="formats" className="py-16 bg-cinema-slate/30 border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-cinema-crimson block mb-1">
                Advertising Menu
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                High-Impact In-Cinema Ad Formats
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Every format is standard-compliant, auditable, and priced transparently.
              </p>

              {/* Format Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <button
                  onClick={() => setActiveFormatTab('POPCORN')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeFormatTab === 'POPCORN' ? 'bg-cinema-gold text-cinema-midnight shadow' : 'bg-cinema-slate text-slate-400 hover:text-white'
                  }`}
                >
                  🍿 Popcorn Bucket Sleeves
                </button>
                <button
                  onClick={() => setActiveFormatTab('INTERVAL')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeFormatTab === 'INTERVAL' ? 'bg-cinema-gold text-cinema-midnight shadow' : 'bg-cinema-slate text-slate-400 hover:text-white'
                  }`}
                >
                  🎬 Interval Gold-Spot (30s)
                </button>
                <button
                  onClick={() => setActiveFormatTab('STANDEE')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeFormatTab === 'STANDEE' ? 'bg-cinema-gold text-cinema-midnight shadow' : 'bg-cinema-slate text-slate-400 hover:text-white'
                  }`}
                >
                  🪧 Lobby Standees
                </button>
                <button
                  onClick={() => setActiveFormatTab('SEAT')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeFormatTab === 'SEAT' ? 'bg-cinema-gold text-cinema-midnight shadow' : 'bg-cinema-slate text-slate-400 hover:text-white'
                  }`}
                >
                  🪑 Seat Backrest Decals
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 rounded-3xl bg-cinema-slate border border-cinema-border">
              {activeFormatTab === 'POPCORN' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-cinema-gold uppercase tracking-wider">Tactile Packaging Media</span>
                    <h3 className="text-2xl font-bold text-white font-display">Popcorn Bucket Custom Sleeves</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Custom full-bleed printed wrap sleeves on 85oz, 130oz, or 170oz popcorn tubs. Moviegoers hold your brand directly in their hands for an average of 120 minutes during the feature film.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Pricing Model:</span>
                        <span className="font-bold text-white">$0.20 – $0.35 per tub</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Batch Minimum:</span>
                        <span className="font-bold text-white">3,000 / 5,000 tubs</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Print Specs:</span>
                        <span className="font-bold text-white">300 DPI CMYK, Food-grade</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Proof Method:</span>
                        <span className="font-bold text-cinema-emerald">Geotagged counter photos</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-cinema-midnight border border-cinema-border h-72">
                    <img
                      src="https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80"
                      alt="Popcorn Buckets"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeFormatTab === 'INTERVAL' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-cinema-crimson uppercase tracking-wider">Unskippable Big-Screen Reel</span>
                    <h3 className="text-2xl font-bold text-white font-display">Interval Gold-Spot (30-Second Video)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Played at the exact micro-moment the feature film halts for intermission. Captures 100% of the audience's focused attention right before the house lights rise.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Pricing Model:</span>
                        <span className="font-bold text-white">$650 – $850 / screen / wk</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Projection Format:</span>
                        <span className="font-bold text-white">2K/4K DCI Flat & Scope</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Sound Standard:</span>
                        <span className="font-bold text-white">5.1 Surround, -24 LUFS</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Proof Method:</span>
                        <span className="font-bold text-cinema-emerald">Digital projection logs</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-cinema-midnight border border-cinema-border h-72">
                    <img
                      src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
                      alt="Interval Commercial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeFormatTab === 'STANDEE' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-cinema-gold uppercase tracking-wider">Concourse OOH Media</span>
                    <h3 className="text-2xl font-bold text-white font-display">Main Concourse Lobby Standees</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Placed directly beside the ticket box-office and central popcorn concession counters with heavy foot traffic as audiences wait for auditorium doors to open.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Pricing Model:</span>
                        <span className="font-bold text-white">$180 – $250 / unit / wk</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Standard Size:</span>
                        <span className="font-bold text-white">3ft x 6ft Flex / Sunboard</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-cinema-midnight border border-cinema-border h-72">
                    <img
                      src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
                      alt="Lobby Standees"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeFormatTab === 'SEAT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-cinema-gold uppercase tracking-wider">In-Auditorium Ambient</span>
                    <h3 className="text-2xl font-bold text-white font-display">Seat Backrest Decals</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Residue-free vinyl brand stickers positioned at exact eye level on the rear of auditorium headrests, providing continuous repetition throughout 2+ hours of showtime.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Pricing Model:</span>
                        <span className="font-bold text-white">$750 / audi / month</span>
                      </div>
                      <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border">
                        <span className="text-slate-400 block text-[10px]">Coverage:</span>
                        <span className="font-bold text-white">All 250+ Seats in Audi</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-cinema-midnight border border-cinema-border h-72">
                    <img
                      src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80"
                      alt="Seat Back Decals"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. LIVE VERIFIED CINEMAS (SHOWROOM) */}
        <section id="marketplace" className="py-16 border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cinema-gold block mb-1">
                  Exhibitor Directory
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Featured Cinema Venues Ready for Booking
                </h2>
              </div>

              <Link
                href="/brand/explore"
                className="text-xs text-cinema-gold hover:underline font-bold flex items-center gap-1"
              >
                <span>View All 500+ Cinemas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cinemas.map((c) => (
                <div key={c.id} className="rounded-3xl bg-cinema-slate border border-cinema-border overflow-hidden hover:border-cinema-gold/40 transition group flex flex-col justify-between">
                  <div>
                    <div className="h-44 w-full relative overflow-hidden bg-cinema-midnight">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-cinema-gold text-[10px] font-bold">
                        ★ {c.rating}
                      </div>
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-semibold">
                        {c.city}
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-xs">
                      <h3 className="font-bold text-white text-base font-display group-hover:text-cinema-gold transition">{c.name}</h3>
                      <p className="text-slate-400 text-[11px] line-clamp-2">{c.tagline}</p>

                      <div className="pt-2 border-t border-cinema-border/60 flex items-center justify-between text-[11px] text-slate-300">
                        <span>Footfall: <strong className="text-white">{c.monthlyFootfall.toLocaleString()}</strong></span>
                        <span>{c.screensCount} Screens</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/brand/cinema/${c.id}`}
                      className="w-full py-2.5 bg-cinema-midnight hover:bg-cinema-gold hover:text-cinema-midnight text-slate-200 font-bold text-xs rounded-xl border border-cinema-border transition flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Rates & Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="border-t border-cinema-border py-12 bg-cinema-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-cinema-border/60">
            <div className="space-y-3 max-w-sm">
              <Logo size="md" showTagline={true} />
              <p className="text-xs text-slate-400 leading-relaxed">
                Cinemato is the middleman exchange connecting cinema hall owners with businesses for programmatic offline marketing. Protected by 100% upfront escrow and verified photo proof.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="font-bold text-white mb-3 font-display uppercase tracking-wider">For Brands</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/brand/explore" className="hover:text-white">Discover Cinemas</Link></li>
                  <li><Link href="/brand/checkout" className="hover:text-white">Escrow Checkout</Link></li>
                  <li><Link href="/brand/audit" className="hover:text-white">Proof Audit Gallery</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3 font-display uppercase tracking-wider">For Theatres</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/cinema/dashboard" className="hover:text-white">Cinema Dashboard</Link></li>
                  <li><Link href="/cinema/rate-card" className="hover:text-white">Dynamic Rate-Card</Link></li>
                  <li><Link href="/cinema/proofs" className="hover:text-white">Upload Proof</Link></li>
                  <li><Link href="/cinema/payouts" className="hover:text-white">Bank Payouts</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3 font-display uppercase tracking-wider">Guidelines</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><span className="text-slate-300">Black on White Brand Logo</span></li>
                  <li><span className="text-slate-300">DCP & CMYK Specs</span></li>
                  <li><span className="text-slate-300">Escrow Settlement Model</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>© 2026 Cinemato Technologies Inc. All rights reserved.</span>
            <span>Where Brands Meet The Big Screen.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
