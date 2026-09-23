'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Film, Building2, ShoppingBag, DollarSign, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isCinemaPortal = pathname.startsWith('/cinema');
  const isBrandPortal = pathname.startsWith('/brand');

  const { 
    cinemas, 
    activeCinemaId, 
    setActiveCinemaId, 
    activeCinema, 
    cart, 
    cinemaEarnings 
  } = useMarketplace();

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cinema-border bg-cinema-slate/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Current Workspace Badge */}
        <div className="flex items-center gap-6">
          <Logo size="sm" showTagline={false} />

          {/* Quick Portal Switcher Pills */}
          <div className="hidden md:flex items-center p-1 bg-cinema-midnight border border-cinema-border rounded-xl">
            <Link
              href="/cinema/dashboard"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isCinemaPortal
                  ? 'bg-cinema-crimson text-white shadow-lg shadow-cinema-crimson/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinema Owners</span>
            </Link>

            <Link
              href="/brand/explore"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isBrandPortal
                  ? 'bg-cinema-gold text-cinema-midnight shadow-lg shadow-cinema-gold/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Business / Brand Owners</span>
            </Link>
          </div>
        </div>

        {/* Right Actions depending on portal */}
        <div className="flex items-center gap-3">
          
          {/* If Cinema Portal: Cinema Switcher & Available Payout */}
          {isCinemaPortal && (
            <>
              {/* Cinema Venue Switcher */}
              <div className="relative hidden sm:flex items-center">
                <select
                  value={activeCinemaId}
                  onChange={(e) => setActiveCinemaId(e.target.value)}
                  className="bg-cinema-midnight border border-cinema-border text-xs text-white rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-cinema-gold cursor-pointer appearance-none"
                >
                  {cinemas.map((c) => (
                    <option key={c.id} value={c.id}>
                      🍿 {c.name} ({c.city})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>

              {/* Earnings Chip */}
              <Link 
                href="/cinema/payouts"
                className="flex items-center gap-2 px-3 py-1.5 bg-cinema-emerald/10 border border-cinema-emerald/30 rounded-xl hover:bg-cinema-emerald/20 transition"
              >
                <DollarSign className="w-3.5 h-3.5 text-cinema-emerald" />
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block leading-none">Available Payout</span>
                  <span className="text-xs font-bold text-cinema-emerald leading-tight">
                    ${cinemaEarnings.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </Link>
            </>
          )}

          {/* If Brand Portal: Cart Summary with Escrow Badge */}
          {isBrandPortal && (
            <Link
              href="/brand/checkout"
              className="flex items-center gap-2.5 px-3.5 py-1.5 bg-cinema-gold/10 border border-cinema-gold/30 rounded-xl hover:bg-cinema-gold/20 transition group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-cinema-gold group-hover:scale-110 transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-cinema-crimson text-white text-[9px] font-bold flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block leading-none">Campaign Cart</span>
                <span className="text-xs font-bold text-cinema-gold leading-tight">
                  ${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </span>
              </div>
            </Link>
          )}

          {/* User Avatar & Demo Mode tag */}
          <div className="flex items-center gap-2 pl-2 border-l border-cinema-border">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow">
              {isCinemaPortal ? 'CO' : 'BO'}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-semibold text-white block leading-none">
                {isCinemaPortal ? activeCinema.name.split(' ')[0] + ' Manager' : 'Acme Brands'}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {isCinemaPortal ? 'Cinema Partner' : 'Advertiser'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
