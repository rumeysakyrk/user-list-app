
import { User } from "./User";

export interface CardItem {
    title: string;
    icon: string;
    value: (user: User) => string;
}


export const cardItems: CardItem[] = [
    { title: 'Telefon', icon: 'mdi-phone', value: user => user.phone || 'Bilinmiyor' },
    { title: 'Web Sitesi', icon: 'mdi-web', value: user => user.website || 'Bilinmiyor' },
    { title: 'Şirket', icon: 'mdi-office-building', value: user => user.company?.name || 'Bilinmiyor' },
];