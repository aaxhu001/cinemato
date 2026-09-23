'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Camera, 
  Filter,
  Eye
} from 'lucide-react';
import { ProofItem, Campaign } from '@/types';

export default function BrandAuditPage() {
  const { campaigns } = useMarketplace();
  const [selectedProof, setSelectedProof] = useState<{ proof: ProofItem; campaignTitle: string; cinemaName: string } | null>(null);

  // Gather all proofs across campaigns
  const allProofsWithDetails = campaigns.flatMap(camp => 
    camp.proofs.map(p => ({
      proof: p,
      campaignTitle: camp.campaignTitle,
      cinemaName: camp.cinemaName,
      campaignId: camp.id,
    }))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cinema-emerald">Verification Station</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">100% Audit-Proof Offline Advertising</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Verified Proof-of-Execution Gallery
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Every cinema campaign booked through Cinemato requires timestamped, geotagged photographic and digital server proof before any escrow funds are released to exhibitors. Inspect your campaign proof below.
        </p>
      </div>

      {/* Proofs Grid */}
      {allProofsWithDetails.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-cinema-slate border border-cinema-border space-y-2">
          <Camera className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No proof submissions yet</h3>
          <p className="text-xs text-slate-400">
            Cinema managers upload photos once campaign materials are deployed on-ground.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProofsWithDetails.map(({ proof, campaignTitle, cinemaName, campaignId }) => (
            <div
              key={proof.id}
              onClick={() => setSelectedProof({ proof, campaignTitle, cinemaName })}
              className="rounded-3xl bg-cinema-slate border border-cinema-border hover:border-cinema-gold/50 transition overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-cinema-midnight">
                  <img
                    src={proof.imageUrl}
                    alt={proof.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-slate via-transparent to-transparent" />
                  
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-cinema-emerald text-[10px] font-bold border border-cinema-emerald/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Audit Proof</span>
                  </span>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] bg-cinema-midnight/80 backdrop-blur-md text-slate-300 px-2 py-0.5 rounded border border-cinema-border">
                      {proof.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 text-xs">
                  <h3 className="font-bold text-white group-hover:text-cinema-gold transition">
                    {proof.title}
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Campaign: <strong className="text-slate-200">{campaignTitle}</strong>
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Theatre: <strong className="text-slate-200">{cinemaName}</strong>
                  </p>

                  <div className="pt-2 border-t border-cinema-border/60 space-y-1 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cinema-gold flex-shrink-0" />
                      <span>{proof.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cinema-crimson flex-shrink-0" />
                      <span className="truncate">{proof.geotag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <button
                  type="button"
                  className="w-full py-2 bg-cinema-midnight hover:bg-cinema-card text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-cinema-border transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cinema-gold" />
                  <span>Inspect High-Res Evidence</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proof Detail Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-cinema-slate border border-cinema-border max-w-2xl w-full rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <div>
                <h3 className="text-base font-bold text-white font-display">Proof of Execution Certificate</h3>
                <p className="text-xs text-slate-400">{selectedProof.campaignTitle} • {selectedProof.cinemaName}</p>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="w-8 h-8 rounded-full bg-cinema-input text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-cinema-border max-h-96 relative bg-cinema-midnight">
              <img
                src={selectedProof.proof.imageUrl}
                alt={selectedProof.proof.title}
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="p-4 rounded-2xl bg-cinema-midnight border border-cinema-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Evidence Title:</span>
                <span className="font-bold text-white">{selectedProof.proof.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Capture Timestamp:</span>
                <span className="font-mono text-cinema-gold">{selectedProof.proof.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GPS Geotag Verification:</span>
                <span className="font-mono text-emerald-400">{selectedProof.proof.geotag} (Verified Venue Premises)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Audit Status:</span>
                <span className="font-bold text-cinema-emerald">✓ 100% Escrow Compliance Approved</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedProof(null)}
                className="px-5 py-2 bg-cinema-input hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
