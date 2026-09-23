'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Tv, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Film, 
  Volume2, 
  Sparkles,
  Edit2
} from 'lucide-react';
import { ScreenSpec } from '@/types';

export default function CinemaVenuePage() {
  const { activeCinema, updateCinemaDetails } = useMarketplace();
  const [screens, setScreens] = useState<ScreenSpec[]>(activeCinema.screens);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScreenName, setNewScreenName] = useState('');
  const [newScreenCap, setNewScreenCap] = useState('250');
  const [newScreenTech, setNewScreenTech] = useState('Barco 4K Laser / 7.1 Surround');
  const [newScreenType, setNewScreenType] = useState<ScreenSpec['screenType']>('Standard');

  const handleAddScreen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScreenName) return;

    const newScreen: ScreenSpec = {
      id: `screen-${Date.now()}`,
      name: newScreenName,
      capacity: parseInt(newScreenCap, 10) || 200,
      tech: newScreenTech,
      screenType: newScreenType,
    };

    const updated = [...screens, newScreen];
    setScreens(updated);
    updateCinemaDetails(activeCinema.id, {
      screens: updated,
      screensCount: updated.length,
      totalSeats: updated.reduce((sum, s) => sum + s.capacity, 0),
    });

    setNewScreenName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cinema-crimson">Auditorium & Tech Specs</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{activeCinema.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Screen Inventory & Projection Tech
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Advertisers look for premium audio-visual capabilities (4K Laser, Dolby Atmos, IMAX). Keep your screen specifications updated to attract high-budget brand deals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-gold/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Auditorium Screen</span>
        </button>
      </div>

      {/* Screen Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screens.map((screen, idx) => (
          <div key={screen.id} className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border hover:border-cinema-crimson/40 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Screen #{idx + 1}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                screen.screenType === 'IMAX' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                screen.screenType === 'Gold Class' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-slate-800 text-slate-400'
              }`}>
                {screen.screenType}
              </span>
            </div>

            <h3 className="text-base font-bold text-white font-display">{screen.name}</h3>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-cinema-gold" />
                <span>Seating Capacity: <strong className="text-white">{screen.capacity} Seats</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-cinema-crimson" />
                <span>Tech: <strong className="text-slate-300">{screen.tech}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audience Footfall & Demographics Card */}
      <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cinema-gold" />
          <span>Audience Demographics & Footfall Profile</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border">
            <span className="text-slate-400 block mb-1">Target Age Group:</span>
            <span className="text-sm font-bold text-white">{activeCinema.demographics.primaryAge}</span>
          </div>
          <div className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border">
            <span className="text-slate-400 block mb-1">Crowd Type:</span>
            <span className="text-sm font-bold text-white">{activeCinema.demographics.crowdType}</span>
          </div>
          <div className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border">
            <span className="text-slate-400 block mb-1">Peak Attention Days:</span>
            <span className="text-sm font-bold text-cinema-gold">{activeCinema.demographics.peakDays}</span>
          </div>
        </div>
      </div>

      {/* Add Screen Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cinema-slate border border-cinema-border max-w-md w-full rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <h3 className="text-base font-bold text-white font-display">Add Auditorium Screen</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-cinema-input text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddScreen} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Screen Name</label>
                <input
                  type="text"
                  placeholder="e.g. Audi 6 - Dolby Atmos"
                  value={newScreenName}
                  onChange={(e) => setNewScreenName(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Seating Capacity</label>
                <input
                  type="number"
                  value={newScreenCap}
                  onChange={(e) => setNewScreenCap(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Screen Type</label>
                <select
                  value={newScreenType}
                  onChange={(e) => setNewScreenType(e.target.value as any)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                >
                  <option value="Standard">Standard Digital</option>
                  <option value="IMAX">IMAX Laser</option>
                  <option value="Gold Class">Gold Class / VIP Recliner</option>
                  <option value="4DX">4DX Motion</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Projection & Sound Specs</label>
                <input
                  type="text"
                  placeholder="e.g. 4K RGB Laser / Dolby Atmos"
                  value={newScreenTech}
                  onChange={(e) => setNewScreenTech(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cinema-gold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-cinema-input hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cinema-gold hover:bg-cinema-gold-hover text-cinema-midnight font-bold rounded-xl shadow-lg shadow-cinema-gold/20 transition"
                >
                  Save Screen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
