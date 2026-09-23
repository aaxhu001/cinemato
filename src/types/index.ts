export type AdFormatCategory = 
  | 'POPCORN_BUCKET'
  | 'INTERVAL_VIDEO'
  | 'PRE_SHOW_SLIDE'
  | 'LOBBY_STANDEE'
  | 'SEAT_BACKREST'
  | 'SAMPLING_STALL'
  | 'BEVERAGE_CUP';

export type PricingUnit = 
  | 'PER_1000_TUBS'
  | 'PER_SCREEN_PER_WEEK'
  | 'PER_UNIT_PER_WEEK'
  | 'PER_AUDI_PER_MONTH'
  | 'PER_DAY';

export interface RateCardItem {
  id: string;
  category: AdFormatCategory;
  name: string;
  icon: string;
  description: string;
  isEnabled: boolean;
  basePrice: number;
  unit: PricingUnit;
  unitLabel: string;
  minUnits: number;
  maxUnits?: number;
  surgeMultiplier: number; // e.g. 1.25 for blockbusters
  specs: string;
}

export interface ScreenSpec {
  id: string;
  name: string;
  capacity: number;
  tech: string; // e.g., '4K RGB Laser / Dolby Atmos'
  screenType: 'Standard' | 'IMAX' | 'Gold Class' | '4DX';
}

export interface CinemaVenue {
  id: string;
  name: string;
  tagline: string;
  chain: string;
  city: string;
  area: string;
  address: string;
  image: string;
  monthlyFootfall: number;
  rating: number;
  reviewCount: number;
  screensCount: number;
  totalSeats: number;
  demographics: {
    primaryAge: string;
    crowdType: string;
    peakDays: string;
  };
  screens: ScreenSpec[];
  rateCard: RateCardItem[];
  verified: boolean;
}

export type CampaignStatus = 
  | 'PENDING_CINEMA_ACCEPTANCE'
  | 'ACCEPTED_SCHEDULED'
  | 'LIVE_IN_THEATRE'
  | 'PROOF_SUBMITTED'
  | 'COMPLETED_SETTLED'
  | 'DECLINED';

export interface CartItem {
  cinemaId: string;
  cinemaName: string;
  rateCardItemId: string;
  serviceName: string;
  category: AdFormatCategory;
  quantity: number; // e.g. 3,000 for tubs or 2 weeks for screens
  durationWeeks?: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ProofItem {
  id: string;
  type: 'POPCORN_BUCKET_PHOTO' | 'INTERVAL_VIDEO_CLIP' | 'PROJECTION_LOG' | 'LOBBY_PHOTO';
  title: string;
  imageUrl: string;
  timestamp: string;
  geotag: string;
  verified: boolean;
}

export interface Campaign {
  id: string;
  brandName: string;
  campaignTitle: string;
  cinemaId: string;
  cinemaName: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  items: CartItem[];
  totalBudget: number;
  escrowHeld: number;
  cinemaPayout: number;
  creativeUrl?: string;
  creativeType?: string;
  creativeApproved: boolean;
  cbfcCertificateNumber?: string;
  proofs: ProofItem[];
  createdAt: string;
}

export interface CinemaEarnings {
  totalRevenue: number;
  escrowPending: number;
  availableBalance: number;
  lifetimePayouts: number;
}
