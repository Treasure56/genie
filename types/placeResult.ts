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


export const dummyPlaces: PlaceResult[] = [
    {
        photos: [{
            height: 100,
            width: 100,
            html_attributions: [],
            photo_reference: "https://randomuser.me/api/portraits/men/6.jpg"
        }],
        name: "Random Place",
        place_id: "1",
        geometry: {
            location: {
                lat: 0,
                lng: 0
            }
        },
        rating: 4.5,
        user_ratings_total: 100,
        reference: "random_reference",
        scope: "random_scope",
        types: ["random_type"],
        vicinity: "Random Address",
        formatted_address: "Random Address",
        price_level: 2,
        opening_hours: {
            open_now: true,
            weekday_text: ["Random Weekday Text"]
        },
        permanently_closed: false
    },
    {
        photos: [{
            height: 100,
            width: 100,
            html_attributions: [],
            photo_reference: "https://randomuser.me/api/portraits/men/8.jpg"
        }],
        name: "Random Place",
        place_id: "2",
        geometry: {
            location: {
                lat: 0,
                lng: 0
            }
        },
        rating: 4.5,
        user_ratings_total: 100,
        reference: "random_reference",
        scope: "random_scope",
        types: ["random_type"],
        vicinity: "Random Address",
        formatted_address: "Random Address",
        price_level: 2,
        opening_hours: {
            open_now: true,
            weekday_text: ["Random Weekday Text"]
        },
        permanently_closed: false
    },
    {
        photos: [{
            height: 100,
            width: 100,
            html_attributions: [],
            photo_reference: "https://randomuser.me/api/portraits/men/9.jpg"
        }],
        name: "Random Place",
        place_id: "3",
        geometry: {
            location: {
                lat: 0,
                lng: 0
            }
        },
        rating: 4.5,
        user_ratings_total: 100,
        reference: "random_reference",
        scope: "random_scope",
        types: ["random_type"],
        vicinity: "Random Address",
        formatted_address: "Random Address",
        price_level: 2,
        opening_hours: {
            open_now: true,
            weekday_text: ["Random Weekday Text"]
        },
        permanently_closed: false
    },
   


]
