import sys

def main():
    try:
        with open('seed_data.py', 'r', encoding='utf-8') as f:
            text = f.read()

        country_insert = """
    {"name": "UAE", "code": "ARE", "continent": "Asia", "flag_emoji": "🇦🇪",
     "cover_image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
     "description": "Futuristic skyscrapers, luxury shopping, and desert safaris."},
    {"name": "Indonesia", "code": "IDN", "continent": "Asia", "flag_emoji": "🇮🇩",
     "cover_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
     "description": "Thousands of volcanic islands, dragons, and tropical beaches."},
]
"""
        text = text.replace("    },\n]\n\nPLACES = {", "    }," + country_insert + "\nPLACES = {")

        places_insert = """
    "UAE": [
        {"name": "Burj Khalifa", "description": "World's tallest building with breathtaking views.", "rating": 4.9, "best_time": "Nov-March", "category": "City", "image_url": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600"},
        {"name": "Sheikh Zayed Mosque", "description": "Stunning white marble mosque in Abu Dhabi.", "rating": 4.9, "best_time": "Nov-April", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=600"},
        {"name": "Dubai Mall", "description": "massive mall with an aquarium and ice rink.", "rating": 4.7, "best_time": "All year", "category": "City", "image_url": "https://images.unsplash.com/photo-1522616853503-46736ddfb1d9?w=600"},
        {"name": "Palm Jumeirah", "description": "Famous artificial archipelago with luxury resorts.", "rating": 4.8, "best_time": "Oct-April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1528701202868-96db9acbbb29?w=600"},
        {"name": "Desert Safari", "description": "Dune bashing, camel rides, and Bedouin camps.", "rating": 4.6, "best_time": "Nov-March", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=600"},
        {"name": "Louvre Abu Dhabi", "description": "Art and civilization museum spanning culture.", "rating": 4.8, "best_time": "All year", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1536489885071-87983c3e285c?w=600"},
        {"name": "Dubai Marina", "description": "Canal city with a beautiful skyline and yachts.", "rating": 4.7, "best_time": "Oct-April", "category": "City", "image_url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600"},
        {"name": "Jebel Jais", "description": "Highest peak in UAE with the world's longest zipline.", "rating": 4.7, "best_time": "Oct-April", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600"},
        {"name": "Al Fahidi", "description": "Historical neighborhood in Dubai with wind towers.", "rating": 4.5, "best_time": "Nov-March", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600"},
        {"name": "Hatta", "description": "Mountain exclave with a beautiful dam and trails.", "rating": 4.6, "best_time": "Oct-April", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=600"}
    ],
    "Indonesia": [
        {"name": "Bali", "description": "Island of the Gods with beaches, temples, and rice terraces.", "rating": 4.9, "best_time": "April-October", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600"},
        {"name": "Komodo Island", "description": "Home to the famous Komodo dragons and pink beaches.", "rating": 4.8, "best_time": "April-December", "category": "Wildlife", "image_url": "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600"},
        {"name": "Borobudur", "description": "World's largest Buddhist temple in Central Java.", "rating": 4.9, "best_time": "All year", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1596408253132-ce2a4dd6f7ab?w=600"},
        {"name": "Raja Ampat", "description": "Stunning archipelago with arguably the best diving in the world.", "rating": 4.9, "best_time": "Oct-April", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1594950669282-15e8ba9c97b8?w=600"},
        {"name": "Ubud", "description": "Cultural heart of Bali with art, dance, and monkeys.", "rating": 4.7, "best_time": "June-September", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600"},
        {"name": "Mount Bromo", "description": "Active volcano in an otherworldly landscape.", "rating": 4.8, "best_time": "April-October", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1502472658828-568bf030438b?w=600"},
        {"name": "Gili Islands", "description": "Car-free islands off Lombok perfect for relaxation.", "rating": 4.7, "best_time": "June-September", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1551061986-e2a22b78d2b7?w=600"},
        {"name": "Yogyakarta", "description": "Soul of Java and gateway to ancient temples.", "rating": 4.6, "best_time": "May-October", "category": "City", "image_url": "https://images.unsplash.com/photo-1583095123984-b040fd176e3d?w=600"},
        {"name": "Tana Toraja", "description": "Unique culture known for elaborate funeral rites.", "rating": 4.6, "best_time": "June-August", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1568285521798-0c671dd389a2?w=600"},
        {"name": "Nusa Penida", "description": "Rugged island with spectacular coastal cliffs like Kelingking.", "rating": 4.8, "best_time": "May-September", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1588631168128-4eb7d8c47b5b?w=600"}
    ]
}
"""
        text = text.replace("    ],\n}\n\nHOTELS", places_insert + "\nHOTELS")

        with open('seed_data.py', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Success")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    main()
