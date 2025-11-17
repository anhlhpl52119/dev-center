import type { Image } from '@/types/ui';

export interface GNBItemSerRes {
    id: number;
    path: string;
    locale: string;
    title: string;
    category: string;
}

export interface GNBSerRes {
    pages: {
        menu : GNBItemSerRes[]
    }
}

export interface DevSiteProductRes {
    id: number;
    path: string;
    locale: string;
    title: string;
    description: string;
    images: Record<string, Image>;
}

export interface DevSiteProductsRes {
    pages: {
        menu : DevSiteProductRes[]
    }
}
