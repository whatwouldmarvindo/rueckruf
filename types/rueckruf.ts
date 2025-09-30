export interface RueckrufPayload {
  customerNumber?: number;
  firstName?: string;
  lastName?: string;
  zipCode?: number;
  city?: string;
  profession?: string;
  employer?: string;
  email?: string;
  contactTime?: string;
  interests: string[];
  comment?: string;
  toC: boolean;
}
