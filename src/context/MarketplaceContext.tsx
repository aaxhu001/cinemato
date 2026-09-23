'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CinemaVenue, Campaign, CartItem, RateCardItem, ProofItem, CinemaEarnings } from '../types';
import { INITIAL_CINEMAS, INITIAL_CAMPAIGNS, INITIAL_CINEMA_EARNINGS } from '../data/mockData';

interface MarketplaceContextType {
  cinemas: CinemaVenue[];
  activeCinemaId: string;
  setActiveCinemaId: (id: string) => void;
  activeCinema: CinemaVenue;
  campaigns: Campaign[];
  cart: CartItem[];
  cinemaEarnings: CinemaEarnings;
  
  // Cinema Owner Actions
  updateRateCardItem: (cinemaId: string, updatedItem: RateCardItem) => void;
  toggleRateCardItem: (cinemaId: string, itemId: string) => void;
  updateCinemaDetails: (cinemaId: string, updates: Partial<CinemaVenue>) => void;
  acceptCampaign: (campaignId: string) => void;
  declineCampaign: (campaignId: string) => void;
  uploadProof: (campaignId: string, proof: Omit<ProofItem, 'id'>) => void;
  requestPayout: (amount: number) => { success: boolean; message: string };

  // Brand Owner Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (rateCardItemId: string) => void;
  clearCart: () => void;
  checkoutCampaign: (details: {
    brandName: string;
    campaignTitle: string;
    startDate: string;
    endDate: string;
    creativeType: string;
    cbfcNumber?: string;
  }) => Campaign;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [cinemas, setCinemas] = useState<CinemaVenue[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cinemato_cinemas');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_CINEMAS;
  });

  const [activeCinemaId, setActiveCinemaId] = useState<string>('cinema-apex-01');

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cinemato_campaigns');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_CAMPAIGNS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cinemato_cart');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return [];
  });

  const [cinemaEarnings, setCinemaEarnings] = useState<CinemaEarnings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cinemato_earnings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_CINEMA_EARNINGS;
  });

  // Persist state to local storage for realistic demo persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cinemato_cinemas', JSON.stringify(cinemas));
    }
  }, [cinemas]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cinemato_campaigns', JSON.stringify(campaigns));
    }
  }, [campaigns]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cinemato_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cinemato_earnings', JSON.stringify(cinemaEarnings));
    }
  }, [cinemaEarnings]);

  const activeCinema = cinemas.find(c => c.id === activeCinemaId) || cinemas[0];

  // Update a rate card item
  const updateRateCardItem = (cinemaId: string, updatedItem: RateCardItem) => {
    setCinemas(prev => prev.map(cinema => {
      if (cinema.id !== cinemaId) return cinema;
      return {
        ...cinema,
        rateCard: cinema.rateCard.map(rc => rc.id === updatedItem.id ? updatedItem : rc)
      };
    }));
  };

  // Toggle item enable/disable
  const toggleRateCardItem = (cinemaId: string, itemId: string) => {
    setCinemas(prev => prev.map(cinema => {
      if (cinema.id !== cinemaId) return cinema;
      return {
        ...cinema,
        rateCard: cinema.rateCard.map(rc => rc.id === itemId ? { ...rc, isEnabled: !rc.isEnabled } : rc)
      };
    }));
  };

  const updateCinemaDetails = (cinemaId: string, updates: Partial<CinemaVenue>) => {
    setCinemas(prev => prev.map(c => c.id === cinemaId ? { ...c, ...updates } : c));
  };

  const acceptCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== campaignId) return camp;
      return { ...camp, status: 'ACCEPTED_SCHEDULED' };
    }));
  };

  const declineCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== campaignId) return camp;
      return { ...camp, status: 'DECLINED' };
    }));
  };

  const uploadProof = (campaignId: string, proofData: Omit<ProofItem, 'id'>) => {
    const newProof: ProofItem = {
      ...proofData,
      id: `proof-${Date.now()}`,
    };

    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== campaignId) return camp;
      const updatedProofs = [...camp.proofs, newProof];
      return {
        ...camp,
        proofs: updatedProofs,
        status: 'PROOF_SUBMITTED',
      };
    }));

    // Unlock some escrow to available balance
    setCinemaEarnings(prev => ({
      ...prev,
      availableBalance: prev.availableBalance + 500,
      escrowPending: Math.max(0, prev.escrowPending - 500),
    }));
  };

  const requestPayout = (amount: number) => {
    if (amount <= 0 || amount > cinemaEarnings.availableBalance) {
      return { success: false, message: 'Invalid payout amount or insufficient funds.' };
    }
    setCinemaEarnings(prev => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      lifetimePayouts: prev.lifetimePayouts + amount,
    }));
    return { success: true, message: `Payout of $${amount.toFixed(2)} dispatched to your bank account.` };
  };

  // Cart operations
  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      // If item from same cinema and same rateCard exists, update quantity
      const existingIndex = prev.findIndex(item => 
        item.cinemaId === newItem.cinemaId && item.rateCardItemId === newItem.rateCardItemId
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = newItem;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (rateCardItemId: string) => {
    setCart(prev => prev.filter(item => item.rateCardItemId !== rateCardItemId));
  };

  const clearCart = () => setCart([]);

  const checkoutCampaign = (details: {
    brandName: string;
    campaignTitle: string;
    startDate: string;
    endDate: string;
    creativeType: string;
    cbfcNumber?: string;
  }): Campaign => {
    const totalBudget = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const cinemaPayout = totalBudget * 0.875; // 87.5% to cinema, 12.5% Cinemato platform fee

    const primaryCinemaId = cart[0]?.cinemaId || activeCinemaId;
    const primaryCinema = cinemas.find(c => c.id === primaryCinemaId);

    const newCampaign: Campaign = {
      id: `camp-${Math.floor(1000 + Math.random() * 9000)}`,
      brandName: details.brandName,
      campaignTitle: details.campaignTitle,
      cinemaId: primaryCinemaId,
      cinemaName: primaryCinema?.name || 'Selected Cinema',
      startDate: details.startDate,
      endDate: details.endDate,
      status: 'PENDING_CINEMA_ACCEPTANCE',
      items: [...cart],
      totalBudget,
      escrowHeld: totalBudget,
      cinemaPayout,
      creativeType: details.creativeType,
      creativeApproved: true,
      cbfcCertificateNumber: details.cbfcNumber || 'PENDING_AUDIT',
      proofs: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    clearCart();
    return newCampaign;
  };

  return (
    <MarketplaceContext.Provider
      value={{
        cinemas,
        activeCinemaId,
        setActiveCinemaId,
        activeCinema,
        campaigns,
        cart,
        cinemaEarnings,
        updateRateCardItem,
        toggleRateCardItem,
        updateCinemaDetails,
        acceptCampaign,
        declineCampaign,
        uploadProof,
        requestPayout,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutCampaign,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
