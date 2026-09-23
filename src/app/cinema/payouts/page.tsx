'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';

export default function CinemaPayoutsPage() {
  const { activeCinema, cinemaEarnings, requestPayout } = useMarketplace();
  const [withdrawAmount, setWithdrawAmount] = useState('2000');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    const res = requestPayout(amt);
    setFeedback(res);
    if (res.success) {
      setShowWithdrawModal(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-cinema-slate border border-cinema-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cinema-crimson">Financial Settlement</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{activeCinema.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Earnings & Bank Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Cinemato guarantees 100% upfront escrow backing for all bookings. Once proof of performance is verified, payouts disburse directly to your registered business bank account.
          </p>
        </div>

        <button
          onClick={() => setShowWithdrawModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-cinema-emerald hover:bg-emerald-400 text-cinema-midnight font-bold text-xs rounded-xl shadow-lg shadow-cinema-emerald/20 transition"
        >
          <Wallet className="w-4 h-4" />
          <span>Withdraw to Bank</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
          feedback.success 
            ? 'bg-cinema-emerald/15 border border-cinema-emerald/40 text-cinema-emerald' 
            : 'bg-red-500/15 border border-red-500/40 text-red-400'
        }`}>
          {feedback.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 4 Financial Balances */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-emerald/30 shadow-lg shadow-cinema-emerald/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Available to Withdraw</span>
            <div className="w-8 h-8 rounded-xl bg-cinema-emerald/10 text-cinema-emerald flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cinema-emerald mt-2 font-display">
            ${cinemaEarnings.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Instant wire to bank</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Locked in Escrow</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2 font-display">
            ${cinemaEarnings.escrowPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Unlocks upon proof upload</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Lifetime Earnings</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            ${cinemaEarnings.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Net of Cinemato take-rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-slate border border-cinema-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Completed Payouts</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            ${cinemaEarnings.lifetimePayouts.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Disbursed to date</p>
        </div>

      </div>

      {/* Bank Account Details & Settlement Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Linked Bank Card */}
        <div className="p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cinema-gold" />
              <span>Primary Payout Account</span>
            </h3>
            <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 border border-cinema-emerald/30 px-2 py-0.5 rounded-full font-bold">
              Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-cinema-midnight border border-cinema-border space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Account Holder:</span>
              <span className="font-bold text-white">{activeCinema.name} Exhibitions Ltd</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Bank Name:</span>
              <span className="font-bold text-white">HDFC Corporate Bank</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Account Number:</span>
              <span className="font-mono font-bold text-white">•••• •••• 9842</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Routing / IFSC:</span>
              <span className="font-mono text-cinema-gold font-bold">HDFC0001042</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Payouts requested before 4:00 PM are settled within 2 to 4 business hours via automated wire.
          </p>
        </div>

        {/* Payout History Ledger */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-cinema-slate border border-cinema-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display">Recent Payout Settlements</h3>
            <span className="text-xs text-slate-400">Automated Escrow Clearances</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Wire Transfer #PAY-9921</span>
                  <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Completed</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Campaign: Krypto Cloud Banking • Settled on Aug 30, 2026</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-cinema-emerald font-display">+$875.00</span>
                <span className="block text-[10px] text-slate-500">UTR: 9942001928</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cinema-midnight border border-cinema-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Wire Transfer #PAY-9840</span>
                  <span className="text-[10px] bg-cinema-emerald/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Completed</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Campaign: Local Auto Mall • Settled on Aug 14, 2026</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-cinema-emerald font-display">+$1,450.00</span>
                <span className="block text-[10px] text-slate-500">UTR: 9942001844</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cinema-slate border border-cinema-border max-w-md w-full rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cinema-border">
              <h3 className="text-base font-bold text-white font-display">Withdraw to Bank</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 rounded-full bg-cinema-input text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Available Balance</label>
                <div className="text-xl font-extrabold text-cinema-emerald font-display">
                  ${cinemaEarnings.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  min="1"
                  max={cinemaEarnings.availableBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-cinema-midnight border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-cinema-gold"
                />
              </div>

              <div className="p-3 bg-cinema-midnight rounded-xl border border-cinema-border text-slate-400 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="text-white font-bold">HDFC Bank (•••• 9842)</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="text-cinema-emerald font-bold">$0.00 (Cinemato Covered)</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 bg-cinema-input hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cinema-emerald hover:bg-emerald-400 text-cinema-midnight font-bold rounded-xl shadow-lg shadow-cinema-emerald/20 transition"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
