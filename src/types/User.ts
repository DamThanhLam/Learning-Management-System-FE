
export interface User {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    birthday: string | null; // vì LocalDate backend trả ISO string
    gender: string | null;
    groups: string[];
    reviewsId: string[];
    description: string | null;
    urlImage: string | null;
    cvFile: string | null;
    accountStatus: string;
    contacts: Record<string, string>;
  }
  