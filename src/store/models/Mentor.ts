export interface SocialLink {
    icon: string;
    label: string;
    url: string;
}

export interface Mentor {
    id: string;
    name: string;
    title: string;
    followers: number;
    description: string;
    about: string;
    expertise: string[];
    experience: string;
    avatar: string;
    socialLinks: SocialLink[];
}