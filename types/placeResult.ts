export type PlaceResult = {
    business_status?: string; // e.g., "OPERATIONAL", "CLOSED_TEMPORARILY"

    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport?: {
            northeast: { lat: number; lng: number };
            southwest: { lat: number; lng: number };
        };
    };

    icon?: string;
    name: string;
    place_id: string;

    plus_code?: {
        compound_code?: string;
        global_code?: string;
    };

    rating?: number; // 0–5
    user_ratings_total?: number;
    reference?: string;
    scope?: string;

    types?: string[]; // e.g., ["lodging", "restaurant", "bar"]

    vicinity?: string; // short address
    formatted_address?: string; // sometimes appears instead of vicinity

    price_level?: number; // 0–4
    opening_hours?: {
        open_now: boolean;
        weekday_text?: string[];
    };

    photos?: {
        height: number;
        width: number;
        html_attributions: string[];
        photo_reference: string;
    }[];

    permanently_closed?: boolean;
};
