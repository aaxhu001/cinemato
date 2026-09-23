'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tag, 
  Inbox, 
  Camera, 
  Wallet, 
  Tv, 
  Search, 
  ShieldCheck, 
  ShoppingBag,
  ArrowRightLeft,
  LucideIcon
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

interface SidebarProps {
  portalType: 'cinema' | 'brand';
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  highlight?: string;
  badge?: number | string;
  badgeColor?: string;
}

export default function Sidebar({ portalType }: SidebarProps) {
  const pathname = usePathname();
  const { campaigns, cart } = useMarketplace();

  // Pending items count for badges
  const pendingBookingsCount = campaigns.filter(c => c.status === 'PENDING_CINEMA_ACCEPTANCE').length;
  const pendingProofsCount = campaigns.filter(c => c.status === 'LIVE_IN_THEATRE').length;

  const cinemaNav: NavItem[] = [
    { name: 'Dashboard', href: '/cinema/dashboard', icon: LayoutDashboard },
    { name: 'Rate-Card & Services', href: '/cinema/rate-card', icon: Tag, highlight: 'Dynamic' },
    { name: 'Booking Requests', href: '/cinema/bookings', icon: Inbox, badge: pendingBookingsCount },
    { name: 'Upload Proof-of-Ad', href: '/cinema/proofs', icon: Camera, badge: pendingProofsCount > 0 ? `${pendingProofsCount} Due` : undefined, badgeColor: 'bg-amber-500/20 text-amber-400' },
    { name: 'Earnings & Payouts', href: '/cinema/payouts', icon: Wallet },
    { name: 'Screens & Venue Specs', href: '/cinema/venue', icon: Tv },
  ];

  const brandNav: NavItem[] = [
    { name: 'Campaign Dashboard', href: '/brand/dashboard', icon: LayoutDashboard },
    { name: 'Explore Cinema Inventory', href: '/brand/explore', icon: Search, highlight: 'Marketplace' },
    { name: 'Campaign Cart & Checkout', href: '/brand/checkout', icon: ShoppingBag, badge: cart.length > 0 ? cart.length : undefined },
    { name: 'Proof Audit & Gallery', href: '/brand/audit', icon: ShieldCheck },
  ];

  const currentNav = portalType === 'cinema' ? cinemaNav : brandNav;

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 space-y-6">
        
        {/* Portal Title Banner */}
        <div className="p-4 rounded-2xl bg-cinema-slate border border-cinema-border">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Workspace</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              portalType === 'cinema' 
                ? 'bg-cinema-crimson/20 text-red-400 border border-cinema-crimson/30' 
                : 'bg-cinema-gold/20 text-amber-400 border border-cinema-gold/30'
            }`}>
              {portalType === 'cinema' ? 'Exhibitor' : 'Advertiser'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white mt-1">
            {portalType === 'cinema' ? 'Cinema Manager Hub' : 'Brand Marketing Portal'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {portalType === 'cinema' ? 'Configure rates & accept ad deals' : 'Discover, book & track cinema ads'}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {currentNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/cinema/dashboard' && item.href !== '/brand/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group ${
                  isActive
                    ? portalType === 'cinema'
                      ? 'bg-cinema-crimson/15 text-white border border-cinema-crimson/30'
                      : 'bg-cinema-gold/15 text-white border border-cinema-gold/30'
                    : 'text-slate-400 hover:text-white hover:bg-cinema-slate'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition ${
                    isActive 
                      ? portalType === 'cinema' ? 'text-cinema-crimson' : 'text-cinema-gold' 
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`} />
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.highlight && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.highlight}
                    </span>
                  )}
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || (portalType === 'cinema' ? 'bg-cinema-crimson/20 text-red-400' : 'bg-cinema-gold/20 text-amber-400')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Portal Switch Box */}
        <div className="p-4 rounded-2xl bg-cinema-midnight border border-cinema-border/80">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Testing & Simulation</span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Need to see how {portalType === 'cinema' ? 'Brands see your prices' : 'Cinemas receive your bookings'}?
          </p>
          <Link
            href={portalType === 'cinema' ? '/brand/explore' : '/cinema/dashboard'}
            className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-cinema-slate hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-cinema-border transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Switch to {portalType === 'cinema' ? 'Brand Portal' : 'Cinema Portal'}</span>
          </Link>
        </div>

      </div>
    </aside>
  );
}
