export interface User {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string|null;
    birthday: string|null;  
    gender: "FMALE"|"MALE"|null;
    groups: string[]|null;
    reviewsId: string[]|null;
    description: string|null;
    urlImage: string|null;
    cvFile: string|null;
    accountStatus: "REQUIRE"|"REJECT"|"ACCEPT"|"LOCKED"|"";
}