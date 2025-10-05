    export interface New {
   id: string;
  title: string;
  active: boolean;
  imageUrl?: string;
  expirationDate?: string; // ISO string → después lo parseás a Date si querés
  priority?: boolean;
}
