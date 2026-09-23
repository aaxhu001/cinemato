'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { ProofItem } from '@/types';

export default function CinemaProofsPage() {
  const { activeCinema, campaigns, uploadProof } = useMarketplace();
  
  // Find campaigns for active cinema
  const cinemaCampaigns = campaigns.filter(c => c.cinemaId === activeCinema.id);
  const eligibleCampaigns = cinemaCampaigns.filter(c => c.status === 'LIVE_IN_THEATRE' || c.status === 'PROOF_SUBMITTED' || c.status === 'ACCEPTED_SCHEDULED');

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(eligibleCampaigns[0]?.id || '');
  const [proofType, setProofType] = useState<ProofItem['type']>('POPCORN_BUCKET_PHOTO');
  const [proofTitle, setProofTitle] = useState('');
  const [sampleImageUrl, setSampleImageUrl] = useState('https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const currentCampaign = cinemaCampaigns.find(c => c.id === selectedCampaignId);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId) return;

    const title = proofTitle || (
      proofType === 'POPCORN_BUCKET_PHOTO' ? 'Snack Counter Popcorn Bucket Stock Photo' :
      proofType === 'INTERVAL_VIDEO_CLIP' ? 'Interval Ad Screening In Audi' :
      proofType === 'PROJECTION_LOG' ? 'Daily Projection Run Sheet' : 'Concourse Standee Deployment'
    );

    uploadProof(selectedCampaignId, {
      type: proofType,
      title,
      imageUrl: sampleImageUrl,
      timestamp: new Date().toLocaleString() + ' IST',
      geotag: `${activeCinema.area} (${activeCinema.city})`,
      verified: true,
    });

    setUploadSuccess(true);
    setProofTitle('');
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cinema-crimson">Proof-of-Execution Hub</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">{activeCinema.name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Upload Geotagged Proof-of-Execution
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Cinemato's escrow trust engine requires proof of ad delivery. Uploading photos of branded popcorn tubs at concession counters and signed projection logs releases your guaranteed campaign payout.
        </p>
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-cinema-emerald/15 border border-cinema-emerald/40 flex items-center gap-3 text-cinema-emerald animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Proof successfully verified and attached to campaign! $500.00 in escrow funds has been released to your available balance.</span>
        </div>
      )}

      {/* Main Upload Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-5">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Camera className="w-4 h-4 text-cinema-gold" />
            <span>Submit Verification Evidence</span>
          </h2>

          <form onSubmit={handleUpload} className="space-y-4 text-xs">
            
            {/* Campaign Select */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Select Active Campaign</label>
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
              >
                {eligibleCampaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.id} - {c.brandName}: {c.campaignTitle} (${c.cinemaPayout.toFixed(0)} payout)
                  </option>
                ))}
              </select>
            </div>

            {/* Proof Type Selector */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Evidence Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProofType('POPCORN_BUCKET_PHOTO');
                    setSampleImageUrl('https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    proofType === 'POPCORN_BUCKET_PHOTO'
                      ? 'bg-cinema-gold/15 border-cinema-gold text-white'
                      : 'bg-cinema-midnight border-cinema-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg block mb-1">🍿</span>
                  <span className="font-bold block">Popcorn Tub</span>
                  <span className="text-[10px] text-slate-500">Counter display</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProofType('INTERVAL_VIDEO_CLIP');
                    setSampleImageUrl('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    proofType === 'INTERVAL_VIDEO_CLIP'
                      ? 'bg-cinema-gold/15 border-cinema-gold text-white'
                      : 'bg-cinema-midnight border-cinema-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg block mb-1">🎬</span>
                  <span className="font-bold block">Interval Video</span>
                  <span className="text-[10px] text-slate-500">Screen capture</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProofType('PROJECTION_LOG');
                    setSampleImageUrl('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    proofType === 'PROJECTION_LOG'
                      ? 'bg-cinema-gold/15 border-cinema-gold text-white'
                      : 'bg-cinema-midnight border-cinema-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg block mb-1">📋</span>
                  <span className="font-bold block">Run Log</span>
                  <span className="text-[10px] text-slate-500">Signed sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProofType('LOBBY_PHOTO');
                    setSampleImageUrl('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    proofType === 'LOBBY_PHOTO'
                      ? 'bg-cinema-gold/15 border-cinema-gold text-white'
                      : 'bg-cinema-midnight border-cinema-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg block mb-1">🪧</span>
                  <span className="font-bold block">Standee</span>
                  <span className="text-[10px] text-slate-500">Lobby setup</span>
                </button>
              </div>
            </div>

            {/* Custom description */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Description / Placement Note</label>
              <input
                type="text"
                placeholder="e.g. 1,000 branded popcorn tubs served at Audi 1 & 2 concession stand"
                value={proofTitle}
                onChange={(e) => setProofTitle(e.target.value)}
                className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cinema-gold"
              />
            </div>

            {/* Image Preview & Dropzone */}
            <div className="p-4 rounded-2xl bg-cinema-midnight border border-dashed border-slate-700 flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-xs h-40 rounded-xl overflow-hidden mb-3 border border-slate-700 relative">
                <img
                  src={sampleImageUrl}
                  alt="Proof Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-cinema-gold font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeCinema.area}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-semibold">Image Captured with Geotag & Time-Stamp</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Simulated capture coordinates: {activeCinema.city}</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cinema-emerald hover:bg-emerald-400 text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-emerald/20 transition flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Proof & Unlock Escrow Payout</span>
            </button>

          </form>
        </div>

        {/* Verification Summary & Audit Protocol */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cinema-emerald" />
              <span>Escrow Release Protocol</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border/60">
                <span className="font-bold text-white block mb-1">1. Popcorn Tub Proof</span>
                <span className="text-slate-400 text-[11px]">
                  Submit clear wide-angle photos showing branded buckets stacked at the concession counter and being served to patrons.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border/60">
                <span className="font-bold text-white block mb-1">2. Projection Logs</span>
                <span className="text-slate-400 text-[11px]">
                  Attach digital server playback logs verifying the interval video slot ran across scheduled screenings.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-cinema-midnight border border-cinema-border/60">
                <span className="font-bold text-white block mb-1">3. Automated Bank Transfer</span>
                <span className="text-slate-400 text-[11px]">
                  Once proof is submitted, escrow unlocks instantly and funds are ready for one-click bank transfer.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Submitted Proofs Gallery */}
      {currentCampaign && currentCampaign.proofs.length > 0 && (
        <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display">
              Submitted Verification Photos for Campaign #{currentCampaign.id}
            </h2>
            <span className="text-xs text-cinema-emerald font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentCampaign.proofs.length} Verified Evidence Items</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentCampaign.proofs.map((proof) => (
              <div key={proof.id} className="rounded-2xl overflow-hidden bg-cinema-midnight border border-cinema-border">
                <div className="h-44 overflow-hidden relative">
                  <img src={proof.imageUrl} alt={proof.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-cinema-emerald text-[10px] font-bold border border-cinema-emerald/30">
                    ✓ Verified
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5 text-xs">
                  <h4 className="font-bold text-white truncate">{proof.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-cinema-gold" />
                    <span>{proof.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-cinema-crimson" />
                    <span className="truncate">{proof.geotag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
