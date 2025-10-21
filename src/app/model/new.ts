export interface New {
  id: string;
  title: string;
  active: boolean;
  imageUrl?: string;
  description?: string;
  isMobyWeb: boolean;
  isMobyApp: boolean;
  url?: string;
  expirationDate?: string; // ISO string → después lo parseás a Date si querés
  priority?: boolean;
}


