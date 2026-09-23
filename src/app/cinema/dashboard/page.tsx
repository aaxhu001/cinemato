'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Film, 
  DollarSign, 
  Tag, 
  Camera, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Users
} from 'lucide-react';

export default function CinemaDashboardPage() {
  const { activeCinema, campaigns, cinemaEarnings } = useMarketplace();

  // Filter campaigns for active cinema
  const cinemaCampaigns = campaigns.filter(c => c.cinemaId === activeCinema.id);
  const activeCampaigns = cinemaCampaigns.filter(c => c.status === 'LIVE_IN_THEATRE' || c.status === 'ACCEPTED_SCHEDULED');
  const pendingRequests = cinemaCampaigns.filter(c => c.status === 'PENDING_CINEMA_ACCEPTANCE');
  const proofNeededCampaigns = cinemaCampaigns.filter(c => c.status === 'LIVE_IN_THEATRE' && c.proofs.length < 2);

  // Enabled services count
  const enabledServicesCount = activeCinema.rateCard.filter(r => r.isEnabled).length;

  return (
    <div className="space-y-6">
      
      {/* Venue Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cinema-slate via-[#141C2E] to-cinema-midnight border border-cinema-border p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cinema-crimson/20 text-red-400 border border-cinema-crimson/30">
                Verified Cinema Partner
              </span>
              <span className="text-xs text-slate-400">ID: {activeCinema.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {activeCinema.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {activeCinema.address} • {activeCinema.screensCount} Screens • {activeCinema.totalSeats} Total Seats
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cinema/rate-card"
              className="flex items-center gap-2 px-4 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/15 transition"
            >
              <Tag className="w-4 h-4" />
              <span>Edit Rate-Cards</span>
            </Link>
            <Link
              href="/cinema/proofs"
              className="flex items-center gap-2 px-4 py-2.5 bg-cinema-input hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-cinema-border transition"
            >
              <Camera className="w-4 h-4" />
              <span>Upload Proof</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cinema-crimson/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Available Payout</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-emerald/10 text-cinema-emerald flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            ${cinemaEarnings.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <Link href="/cinema/payouts" className="inline-flex items-center gap-1 text-[11px] text-cinema-emerald font-semibold mt-2 hover:underline">
            <span>Withdraw to bank</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Campaigns</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-crimson/10 text-red-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            {activeCampaigns.length} Running
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-emerald animate-pulse"></span>
            <span>Screens & snacks active</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Monthly Footfall</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-gold/10 text-cinema-gold flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            {activeCinema.monthlyFootfall.toLocaleString()}
          </div>
          <div className="text-[11px] text-cinema-gold font-medium mt-2">
            Verified monthly patrons
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Services Offered</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-display">
            {enabledServicesCount} / {activeCinema.rateCard.length}
          </div>
          <Link href="/cinema/rate-card" className="inline-flex items-center gap-1 text-[11px] text-slate-300 font-semibold mt-2 hover:underline">
            <span>Configure rates</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

      {/* Alert Banners (Actionable items for the cinema manager) */}
      {pendingRequests.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {pendingRequests.length} New Booking Request Waiting for Your Acceptance
              </h4>
              <p className="text-[11px] text-slate-400">
                Brand "{pendingRequests[0].brandName}" requested {pendingRequests[0].items.length} ad formats. Payout: ${pendingRequests[0].cinemaPayout.toFixed(2)}.
              </p>
            </div>
          </div>
          <Link
            href="/cinema/bookings"
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-cinema-midnight font-bold text-xs rounded-xl shadow transition whitespace-nowrap"
          >
            Review Request
          </Link>
        </div>
      )}

      {proofNeededCampaigns.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cinema-crimson/15 via-cinema-crimson/5 to-transparent border border-cinema-crimson/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cinema-crimson/20 text-red-400 flex items-center justify-center flex-shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Proof-of-Execution Due to Unlock Escrow Payout
              </h4>
              <p className="text-[11px] text-slate-400">
                Upload photos of branded popcorn tubs and projection logs for campaign "{proofNeededCampaigns[0].campaignTitle}".
              </p>
            </div>
          </div>
          <Link
            href="/cinema/proofs"
            className="px-3.5 py-1.5 bg-cinema-crimson hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap"
          >
            Upload Now
          </Link>
        </div>
      )}

      {/* Main Grid: Active Campaigns & Rate-Card Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active & Recent Campaigns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display">Active & Scheduled Campaigns</h2>
            <Link href="/cinema/bookings" className="text-xs text-slate-400 hover:text-white font-medium">
              View All ({cinemaCampaigns.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {cinemaCampaigns.map((campaign) => {
              const isLive = campaign.status === 'LIVE_IN_THEATRE';
              const isPending = campaign.status === 'PENDING_CINEMA_ACCEPTANCE';
              const isCompleted = campaign.status === 'COMPLETED_SETTLED';

              return (
                <div 
                  key={campaign.id} 
                  className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cinema-border/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{campaign.campaignTitle}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLive ? 'bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30' :
                          isPending ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          isCompleted ? 'bg-slate-800 text-slate-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {campaign.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Brand: <strong className="text-slate-200">{campaign.brandName}</strong> • Schedule: {campaign.startDate} to {campaign.endDate}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block">Your Payout</span>
                      <span className="text-sm font-extrabold text-cinema-emerald">
                        ${campaign.cinemaPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Campaign Items / Formats */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400">Booked Formats:</span>
                    {campaign.items.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] bg-cinema-midnight border border-cinema-border px-2.5 py-1 rounded-lg text-slate-300 font-medium"
                      >
                        {item.category === 'POPCORN_BUCKET' ? '🍿' : item.category === 'INTERVAL_VIDEO' ? '🎬' : '🪧'} {item.serviceName} 
                        {item.category === 'POPCORN_BUCKET' && ` (${item.quantity.toLocaleString()} tubs)`}
                        {item.durationWeeks && ` (${item.durationWeeks} wks)`}
                      </span>
                    ))}
                  </div>

                  {/* Proof indicator */}
                  <div className="mt-3 pt-3 border-t border-cinema-border/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Proof photos submitted: <strong className="text-white">{campaign.proofs.length}</strong></span>
                    </div>

                    {isLive && (
                      <Link 
                        href="/cinema/proofs"
                        className="text-cinema-gold hover:text-amber-300 font-semibold"
                      >
                        + Add Photo Proof →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Rate-Card Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display">Rate-Card Snapshot</h2>
            <Link href="/cinema/rate-card" className="text-xs text-cinema-gold hover:underline font-semibold">
              Manage All
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border space-y-3">
            {activeCinema.rateCard.slice(0, 4).map((rc) => (
              <div 
                key={rc.id} 
                className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg">{rc.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{rc.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{rc.unitLabel}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-white">${rc.basePrice}</span>
                  <span className={`block text-[9px] font-semibold ${rc.isEnabled ? 'text-cinema-emerald' : 'text-slate-500'}`}>
                    {rc.isEnabled ? 'Active' : 'Off'}
                  </span>
                </div>
              </div>
            ))}

            <Link
              href="/cinema/rate-card"
              className="block text-center w-full py-2 bg-cinema-input hover:bg-slate-800 text-xs font-bold text-slate-200 rounded-xl border border-cinema-border transition mt-2"
            >
              Open Full Rate-Card Switchboard →
            </Link>
          </div>

          {/* Tips Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cinema-card to-cinema-slate border border-cinema-border">
            <div className="flex items-center gap-2 text-cinema-gold mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold">Cinema Revenue Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enabling <strong>Popcorn Bucket Custom Sleeves</strong> increases your average monthly non-ticket margin by 35%. Brands value long audience retention!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
