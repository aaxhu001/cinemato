'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Inbox, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Film,
  Camera,
  Download,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { Campaign } from '@/types';

export default function CinemaBookingsPage() {
  const { activeCinema, campaigns, acceptCampaign, declineCampaign } = useMarketplace();
  const [selectedCampaignForModal, setSelectedCampaignForModal] = useState<Campaign | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'ACTIVE' | 'COMPLETED'>('ALL');

  // Filter for active cinema
  const cinemaCampaigns = campaigns.filter(c => c.cinemaId === activeCinema.id);

  const filteredCampaigns = cinemaCampaigns.filter(c => {
    if (activeFilter === 'PENDING') return c.status === 'PENDING_CINEMA_ACCEPTANCE';
    if (activeFilter === 'ACTIVE') return c.status === 'LIVE_IN_THEATRE' || c.status === 'ACCEPTED_SCHEDULED';
    if (activeFilter === 'COMPLETED') return c.status === 'COMPLETED_SETTLED';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cinema-crimson">Orders & Campaign Intake</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{activeCinema.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Campaign Bookings & Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Review incoming brand offers, inspect ad video reels and popcorn bucket die-lines, and accept campaigns to lock in guaranteed escrow payouts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-cinema-midnight border border-cinema-border rounded-xl">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeFilter === 'ALL' ? 'bg-cinema-crimson text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({cinemaCampaigns.length})
          </button>
          <button
            onClick={() => setActiveFilter('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeFilter === 'PENDING' ? 'bg-cinema-crimson text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({cinemaCampaigns.filter(c => c.status === 'PENDING_CINEMA_ACCEPTANCE').length})
          </button>
          <button
            onClick={() => setActiveFilter('ACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeFilter === 'ACTIVE' ? 'bg-cinema-crimson text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active ({cinemaCampaigns.filter(c => c.status === 'LIVE_IN_THEATRE' || c.status === 'ACCEPTED_SCHEDULED').length})
          </button>
        </div>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-cinema-slate border border-cinema-border">
            <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No campaigns found in this view</h3>
            <p className="text-xs text-slate-400 mt-1">Check another filter or explore rate-card settings.</p>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => {
            const isPending = campaign.status === 'PENDING_CINEMA_ACCEPTANCE';
            const isLive = campaign.status === 'LIVE_IN_THEATRE';
            const isAccepted = campaign.status === 'ACCEPTED_SCHEDULED';

            return (
              <div
                key={campaign.id}
                className="p-6 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cinema-border/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 font-bold">#{campaign.id}</span>
                      <h3 className="text-base font-bold text-white font-display">
                        {campaign.campaignTitle}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPending ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        isLive ? 'bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30' :
                        isAccepted ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {campaign.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>Brand: <strong className="text-white">{campaign.brandName}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cinema-gold" />
                        <span>Run: {campaign.startDate} to {campaign.endDate}</span>
                      </span>
                      <span>•</span>
                      <span>Booked on {campaign.createdAt}</span>
                    </div>
                  </div>

                  {/* Financial Settlement Box */}
                  <div className="flex items-center gap-4 bg-cinema-midnight px-4 py-2.5 rounded-xl border border-cinema-border sm:self-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Your Net Payout</span>
                      <span className="text-base font-extrabold text-cinema-emerald font-display">
                        ${campaign.cinemaPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-3 border-l border-cinema-border/60 text-right">
                      <span className="text-[10px] text-slate-500 block">Total Escrow</span>
                      <span className="text-xs font-bold text-slate-300">
                        ${campaign.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items / Channels Booked */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {campaign.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">
                          {item.category === 'POPCORN_BUCKET' ? '🍿' : item.category === 'INTERVAL_VIDEO' ? '🎬' : '🪧'}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white">{item.serviceName}</p>
                          <p className="text-[10px] text-slate-400">
                            {item.category === 'POPCORN_BUCKET' ? `${item.quantity.toLocaleString()} Tubs` : `${item.quantity} Screen(s) • ${item.durationWeeks || 2} Weeks`}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white">${item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Creative Details & Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => setSelectedCampaignForModal(campaign)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cinema-input hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-cinema-border transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-cinema-gold" />
                      <span>Inspect Creative Asset</span>
                    </button>

                    {campaign.cbfcCertificateNumber && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cinema-emerald" />
                        <span>Censor: <strong className="text-slate-300 font-mono">{campaign.cbfcCertificateNumber}</strong></span>
                      </span>
                    )}
                  </div>

                  {/* Actions for cinema manager */}
                  <div className="flex items-center gap-2">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => declineCampaign(campaign.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-cinema-input hover:bg-red-950/40 text-slate-400 hover:text-red-400 font-semibold text-xs rounded-xl border border-cinema-border transition"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>

                        <button
                          onClick={() => acceptCampaign(campaign.id)}
                          className="flex items-center gap-1.5 px-5 py-2 bg-cinema-emerald hover:bg-emerald-400 text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-emerald/20 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept Booking (${campaign.cinemaPayout.toFixed(0)})</span>
                        </button>
                      </>
                    ) : isLive ? (
                      <Link
                        href="/cinema/proofs"
                        className="flex items-center gap-1.5 px-4 py-2 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow transition"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload Execution Proof ({campaign.proofs.length}/2 Uploaded)</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-cinema-emerald font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accepted & Ready</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Creative Asset Preview Modal */}
      {selectedCampaignForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cinema-slate border border-cinema-border max-w-xl w-full rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <div>
                <h3 className="text-base font-bold text-white font-display">Creative Asset Inspection</h3>
                <p className="text-xs text-slate-400">Campaign: {selectedCampaignForModal.campaignTitle}</p>
              </div>
              <button
                onClick={() => setSelectedCampaignForModal(null)}
                className="w-8 h-8 rounded-full bg-cinema-input text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-cinema-midnight rounded-2xl border border-cinema-border flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
              <Film className="w-12 h-12 text-cinema-gold mb-2 group-hover:scale-110 transition" />
              <p className="text-xs font-bold text-white">4K DCI Flat / Scope Ad Reel (30 Seconds)</p>
              <p className="text-[11px] text-slate-400 mt-1">Audio: 5.1 Surround Sound at -24 LUFS cinema loudness</p>
              <span className="mt-3 px-3 py-1 bg-cinema-emerald/20 text-cinema-emerald border border-cinema-emerald/30 text-[10px] font-bold rounded-full">
                ✓ Technical QC & Censor Passed
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-cinema-border/60 text-slate-300">
                <span className="text-slate-500">Asset Type:</span>
                <span className="font-semibold text-white">{selectedCampaignForModal.creativeType || 'DCP Video + Popcorn Wrap Print'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-cinema-border/60 text-slate-300">
                <span className="text-slate-500">Censor Certificate:</span>
                <span className="font-mono text-cinema-gold">{selectedCampaignForModal.cbfcCertificateNumber || 'Verified Lead-in Slide'}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-300">
                <span className="text-slate-500">Projectionist Note:</span>
                <span className="text-slate-300">Queue in Intermission Slot #1 prior to house lights rising.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCampaignForModal(null)}
                className="px-5 py-2 bg-cinema-input hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
