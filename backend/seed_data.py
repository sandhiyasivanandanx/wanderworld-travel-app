from database import SessionLocal, engine
import models

# Drop and recreate for fresh schema
models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

COUNTRIES = [
    {"name": "Japan", "code": "JPN", "continent": "Asia", "flag_emoji": "🇯🇵",
     "cover_image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
     "description": "Land of the rising sun, blending ancient traditions with futuristic cities."},
    {"name": "Italy", "code": "ITA", "continent": "Europe", "flag_emoji": "🇮🇹",
     "cover_image": "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
     "description": "Home to world-class art, cuisine, and thousands of years of history."},
    {"name": "India", "code": "IND", "continent": "Asia", "flag_emoji": "🇮🇳",
     "cover_image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
     "description": "A vibrant tapestry of cultures, landscapes, and ancient civilizations."},
    {"name": "Australia", "code": "AUS", "continent": "Oceania", "flag_emoji": "🇦🇺",
     "cover_image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
     "description": "Vast outback, stunning reefs, and iconic coastal cities."},
    {"name": "Brazil", "code": "BRA", "continent": "South America", "flag_emoji": "🇧🇷",
     "cover_image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
     "description": "Tropical forests, samba rhythms, and breathtaking natural wonders."},
    {"name": "France", "code": "FRA", "continent": "Europe", "flag_emoji": "🇫🇷",
     "cover_image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
     "description": "Romance, haute cuisine, and unmatched cultural heritage."},
    {"name": "Egypt", "code": "EGY", "continent": "Africa", "flag_emoji": "🇪🇬",
     "cover_image": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800",
     "description": "Ancient pyramids, mystical deserts, and the mighty Nile River."},
    {"name": "USA", "code": "USA", "continent": "North America", "flag_emoji": "🇺🇸",
     "cover_image": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800",
     "description": "Diverse landscapes from Grand Canyon to Manhattan skyline."},
    {"name": "Thailand", "code": "THA", "continent": "Asia", "flag_emoji": "🇹🇭",
     "cover_image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
     "description": "Tropical beaches, ornate temples, and world-famous street food."},
    {"name": "Peru", "code": "PER", "continent": "South America", "flag_emoji": "🇵🇪",
     "cover_image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
     "description": "Home to Machu Picchu, Amazon jungle, and Inca heritage."},
    {"name": "UAE", "code": "ARE", "continent": "Asia", "flag_emoji": "🇦🇪",
     "cover_image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
     "description": "Luxurious cities, vast deserts, and modern marvels."},
    {"name": "Indonesia", "code": "IDN", "continent": "Asia", "flag_emoji": "🇮🇩",
     "cover_image": "https://images.unsplash.com/photo-1542555543-8557ee74526d?w=800",
     "description": "A diverse archipelago offering pristine beaches, volcanoes, and rich culture."},
]

PLACES = {
    "Japan": [
        {"name": "Tokyo", "description": "A neon-lit megacity blending ultramodern and traditional.", "rating": 4.9, "best_time": "March–May, Oct–Nov", "category": "City", "image_url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600"},
        {"name": "Kyoto", "description": "Ancient temples, geisha districts, and cherry blossoms.", "rating": 4.8, "best_time": "March–May", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600"},
        {"name": "Osaka", "description": "Japan's food capital with vibrant nightlife.", "rating": 4.7, "best_time": "Spring & Autumn", "category": "City", "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"},
        {"name": "Hiroshima", "description": "City of peace with powerful historical significance.", "rating": 4.6, "best_time": "April & October", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600"},
        {"name": "Mount Fuji", "description": "Japan's iconic sacred volcano and UNESCO site.", "rating": 4.9, "best_time": "July–August", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1578637387939-43c525550085?w=600"},
        {"name": "Nara", "description": "Ancient capital home to friendly deer and giant Buddha.", "rating": 4.5, "best_time": "March–May", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600"},
        {"name": "Hokkaido", "description": "Northern island of ski resorts and lavender fields.", "rating": 4.7, "best_time": "June–Aug (summer), Dec–Feb (ski)", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=600"},
        {"name": "Nikko", "description": "Lavishly decorated shrines in forested mountains.", "rating": 4.5, "best_time": "April–May, Oct–Nov", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600"},
        {"name": "Okinawa", "description": "Tropical paradise with crystal-clear waters and coral reefs.", "rating": 4.6, "best_time": "May–September", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=600"},
        {"name": "Kanazawa", "description": "Preserved samurai districts and stunning Kenroku-en garden.", "rating": 4.5, "best_time": "March–May, Sept–Nov", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600"},
    ],
    "Italy": [
        {"name": "Rome", "description": "The Eternal City with Colosseum, Vatican, and fountains.", "rating": 4.9, "best_time": "April–June, Sept–Oct", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600"},
        {"name": "Venice", "description": "Romantic canals, gondolas, and baroque architecture.", "rating": 4.8, "best_time": "April–June, Sept–Nov", "category": "City", "image_url": "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=600"},
        {"name": "Florence", "description": "Birthplace of Renaissance and home to Uffizi Gallery.", "rating": 4.8, "best_time": "April–June", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1545452959-afc8d4c64a40?w=600"},
        {"name": "Amalfi Coast", "description": "Dramatic cliffs, turquoise sea, and colourful villages.", "rating": 4.9, "best_time": "May–October", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600"},
        {"name": "Cinque Terre", "description": "Five pastel-coloured fishing villages on rugged coastline.", "rating": 4.7, "best_time": "May–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=600"},
        {"name": "Milan", "description": "World fashion capital with the stunning Last Supper.", "rating": 4.6, "best_time": "April–June, Sept–Oct", "category": "City", "image_url": "https://images.unsplash.com/photo-1515542622106-078bda23c293?w=600"},
        {"name": "Sicily", "description": "Island of ancient Greek ruins, volcanoes, and cuisine.", "rating": 4.7, "best_time": "May–October", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1523365154888-8a758819b722?w=600"},
        {"name": "Tuscany", "description": "Rolling hills, vineyards, and medieval hilltop towns.", "rating": 4.8, "best_time": "April–October", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1568043524071-e4e8d9e97e65?w=600"},
        {"name": "Naples", "description": "Gateway to Pompeii with amazing pizza and street life.", "rating": 4.5, "best_time": "April–June, Sept–Oct", "category": "City", "image_url": "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=600"},
        {"name": "Lake Como", "description": "Alpine lake resort of breathtaking beauty and elegance.", "rating": 4.7, "best_time": "May–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600"},
    ],
    "India": [
        {"name": "Taj Mahal, Agra", "description": "Iconic white marble mausoleum, a UNESCO World Heritage Site.", "rating": 4.9, "best_time": "Oct–March", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600"},
        {"name": "Jaipur", "description": "The Pink City with magnificent forts and vibrant bazaars.", "rating": 4.7, "best_time": "Oct–March", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600"},
        {"name": "Kerala Backwaters", "description": "Tranquil network of lagoons, lakes, and canals.", "rating": 4.8, "best_time": "Sept–March", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600"},
        {"name": "Varanasi", "description": "World's oldest city and the spiritual heart of India.", "rating": 4.6, "best_time": "Oct–March", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1561361058-c24e021f4dc5?w=600"},
        {"name": "Goa", "description": "Sun-kissed beaches, Portuguese architecture, and nightlife.", "rating": 4.7, "best_time": "Nov–February", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"},
        {"name": "Leh-Ladakh", "description": "High-altitude desert with serene monasteries and snow peaks.", "rating": 4.9, "best_time": "June–September", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1585147986070-4c5f8f8e4b5a?w=600"},
        {"name": "Mysore", "description": "City of palaces, sandalwood, and the grand Dasara festival.", "rating": 4.5, "best_time": "Oct–Feb", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1631293119941-ee0c6c4ed74b?w=600"},
        {"name": "Andaman Islands", "description": "Pristine tropical islands with stunning marine biodiversity.", "rating": 4.8, "best_time": "Nov–April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600"},
        {"name": "Ranthambore", "description": "Prime tiger reserve set among ancient fort ruins.", "rating": 4.6, "best_time": "Oct–June", "category": "Wildlife", "image_url": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600"},
        {"name": "Udaipur", "description": "City of Lakes with fairy-tale palaces and romantic sunsets.", "rating": 4.8, "best_time": "Sept–March", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=600"},
    ],
    "Australia": [
        {"name": "Sydney", "description": "Iconic Opera House, Harbour Bridge, and Bondi Beach.", "rating": 4.9, "best_time": "Sept–November", "category": "City", "image_url": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600"},
        {"name": "Great Barrier Reef", "description": "World's largest coral reef system, a diver's paradise.", "rating": 4.9, "best_time": "June–October", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600"},
        {"name": "Uluru", "description": "Sacred sandstone monolith in the red heart of Australia.", "rating": 4.8, "best_time": "April–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=600"},
        {"name": "Melbourne", "description": "Coffee culture capital with world-class arts and food.", "rating": 4.7, "best_time": "March–May, Sept–Nov", "category": "City", "image_url": "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600"},
        {"name": "Great Ocean Road", "description": "Scenic coastal highway with the Twelve Apostles rock formation.", "rating": 4.8, "best_time": "Dec–Feb", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600"},
        {"name": "Daintree Rainforest", "description": "World's oldest rainforest meeting the Great Barrier Reef.", "rating": 4.7, "best_time": "May–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600"},
        {"name": "Tasmania", "description": "Wild island of dramatic wilderness and fresh produce.", "rating": 4.6, "best_time": "Dec–March", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1621570079576-85bf09592ecd?w=600"},
        {"name": "Whitsunday Islands", "description": "74 tropical islands with pristine Whitehaven Beach.", "rating": 4.8, "best_time": "June–October", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600"},
        {"name": "Perth", "description": "Sunniest city on Earth with world-class beaches nearby.", "rating": 4.6, "best_time": "Sept–November", "category": "City", "image_url": "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=600"},
        {"name": "Kakadu National Park", "description": "Ancient Aboriginal rock art and spectacular wetlands.", "rating": 4.7, "best_time": "May–September", "category": "Wildlife", "image_url": "https://images.unsplash.com/photo-1574018558847-f3b1d1aa8b08?w=600"},
    ],
    "Brazil": [
        {"name": "Rio de Janeiro", "description": "Carnival city with Christ the Redeemer and Copacabana.", "rating": 4.8, "best_time": "Dec–March", "category": "City", "image_url": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600"},
        {"name": "Amazon Rainforest", "description": "World's greatest biodiversity hotspot and river system.", "rating": 4.9, "best_time": "June–November", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1551244072-5d12893278bc?w=600"},
        {"name": "Iguazu Falls", "description": "Wider than Niagara, one of the world's greatest waterfalls.", "rating": 4.9, "best_time": "August–November", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600"},
        {"name": "Florianópolis", "description": "Island city with 42 beaches and stunning lagoons.", "rating": 4.7, "best_time": "Dec–March", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600"},
        {"name": "Salvador", "description": "Afro-Brazilian culture, colonial architecture, and beaches.", "rating": 4.6, "best_time": "Sept–March", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1593642532559-0c6d3fc62b89?w=600"},
        {"name": "Pantanal", "description": "World's largest tropical wetland, best for wildlife spotting.", "rating": 4.8, "best_time": "July–September", "category": "Wildlife", "image_url": "https://images.unsplash.com/photo-1534481016308-0fca71578ae5?w=600"},
        {"name": "Chapada Diamantina", "description": "Spectacular canyons, waterfalls, and caves in Bahia.", "rating": 4.7, "best_time": "June–September", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"},
        {"name": "São Paulo", "description": "Brazil's megacity with world-class restaurants and museums.", "rating": 4.5, "best_time": "April–June, Aug–Oct", "category": "City", "image_url": "https://images.unsplash.com/photo-1554941426-06f7e1a22e6e?w=600"},
        {"name": "Lençóis Maranhenses", "description": "Surreal white sand dunes dotted with crystal lagoons.", "rating": 4.9, "best_time": "July–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1571979941975-f4e082e0a2f5?w=600"},
        {"name": "Bonito", "description": "Ecotourism haven with transparent rivers and caves.", "rating": 4.7, "best_time": "July–October", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600"},
    ],
    "France": [
        {"name": "Paris", "description": "City of Light with the Eiffel Tower, Louvre, and haute cuisine.", "rating": 4.9, "best_time": "April–June, Sept–Oct", "category": "City", "image_url": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600"},
        {"name": "Provence", "description": "Lavender fields, vineyards, and sun-drenched villages.", "rating": 4.8, "best_time": "June–August", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600"},
        {"name": "French Riviera", "description": "Glamorous Côte d'Azur with Monaco and Cannes.", "rating": 4.8, "best_time": "May–September", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600"},
        {"name": "Mont Saint-Michel", "description": "Iconic tidal island monastery rising from Normandy.", "rating": 4.8, "best_time": "April–October", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600"},
        {"name": "Loire Valley", "description": "Fairy-tale châteaux and UNESCO-listed gardens.", "rating": 4.7, "best_time": "May–September", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=600"},
        {"name": "Alsace", "description": "Wine route through half-timbered villages and Rhine scenery.", "rating": 4.6, "best_time": "May–Oct, Dec (Christmas)", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600"},
        {"name": "Dordogne", "description": "Prehistoric caves, medieval castles, and gourmet food.", "rating": 4.6, "best_time": "May–September", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1585152968992-d2b9444408cc?w=600"},
        {"name": "Chamonix", "description": "Europe's premier ski resort at the foot of Mont Blanc.", "rating": 4.9, "best_time": "Dec–March (ski), June–Aug (hiking)", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600"},
        {"name": "Bordeaux", "description": "World wine capital with a stunning 18th-century city centre.", "rating": 4.7, "best_time": "April–October", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600"},
        {"name": "Brittany", "description": "Wild coastlines, Celtic heritage, and superb seafood.", "rating": 4.5, "best_time": "June–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600"},
    ],
    "Egypt": [
        {"name": "Pyramids of Giza", "description": "Last remaining wonder of the ancient world.", "rating": 4.9, "best_time": "Oct–April", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600"},
        {"name": "Luxor", "description": "World's greatest open-air museum with Valley of the Kings.", "rating": 4.8, "best_time": "Oct–April", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1539650116574-75c0c6aa5126?w=600"},
        {"name": "Aswan", "description": "Nubian city on the Nile with magnificent temples.", "rating": 4.7, "best_time": "Oct–April", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1548013146-72479768bada?w=600"},
        {"name": "Sharm el-Sheikh", "description": "Red Sea resort with world-class diving and coral reefs.", "rating": 4.7, "best_time": "Sept–June", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600"},
        {"name": "Alexandria", "description": "Mediterranean city with ancient sites and Bibliotheca.", "rating": 4.5, "best_time": "March–May, Sept–Nov", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600"},
        {"name": "Siwa Oasis", "description": "Remote desert oasis with salt lakes and ancient oracle.", "rating": 4.8, "best_time": "Mar–May, Sept–Nov", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1509909756405-be0199881695?w=600"},
        {"name": "Abu Simbel", "description": "Colossal rock-cut temples of Ramesses II deep in Nubia.", "rating": 4.9, "best_time": "Oct–April", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600"},
        {"name": "Hurghada", "description": "Vibrant Red Sea beach city with water sports.", "rating": 4.5, "best_time": "March–May, Sept–Nov", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600"},
        {"name": "Dahab", "description": "Laid-back diving mecca with legendary Blue Hole.", "rating": 4.7, "best_time": "Mar–May, Sept–Nov", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1587967409886-a2d26b347f15?w=600"},
        {"name": "Cairo", "description": "Teeming capital with the Egyptian Museum and bazaars.", "rating": 4.6, "best_time": "Oct–April", "category": "City", "image_url": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600"},
    ],
    "USA": [
        {"name": "New York City", "description": "The city that never sleeps — Times Square to Central Park.", "rating": 4.9, "best_time": "April–June, Sept–Nov", "category": "City", "image_url": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600"},
        {"name": "Grand Canyon", "description": "Breathtaking mile-deep gorge carved by the Colorado River.", "rating": 4.9, "best_time": "March–May, Sept–Nov", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=600"},
        {"name": "Yellowstone", "description": "World's first national park with geysers and wildlife.", "rating": 4.9, "best_time": "May–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600"},
        {"name": "Hawaii", "description": "Volcanic islands with pristine beaches and lush valleys.", "rating": 4.9, "best_time": "April–October", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=600"},
        {"name": "Las Vegas", "description": "Entertainment capital of the world in the Nevada desert.", "rating": 4.6, "best_time": "March–May, Sept–Nov", "category": "City", "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"},
        {"name": "San Francisco", "description": "Golden Gate, cable cars, and world-class seafood.", "rating": 4.7, "best_time": "Sept–November", "category": "City", "image_url": "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600"},
        {"name": "New Orleans", "description": "Jazz, Mardi Gras, Creole cuisine, and French architecture.", "rating": 4.7, "best_time": "Feb–May", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600"},
        {"name": "Yosemite", "description": "Iconic valley of granite cliffs, waterfalls, and giant sequoias.", "rating": 4.9, "best_time": "May–September", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"},
        {"name": "Miami", "description": "Art Deco South Beach, ocean drive, and vibrant nightlife.", "rating": 4.7, "best_time": "Nov–April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600"},
        {"name": "Zion National Park", "description": "Dramatic red rock canyon with Angels Landing hike.", "rating": 4.8, "best_time": "March–May, Sept–Nov", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600"},
    ],
    "Thailand": [
        {"name": "Bangkok", "description": "Dazzling temples, floating markets, and vibrant street food.", "rating": 4.8, "best_time": "Nov–February", "category": "City", "image_url": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600"},
        {"name": "Chiang Mai", "description": "Cultural hub with elephant sanctuaries and mountain trekking.", "rating": 4.8, "best_time": "Oct–April", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600"},
        {"name": "Phuket", "description": "Thailand's largest island with stunning Andaman beaches.", "rating": 4.7, "best_time": "Nov–April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600"},
        {"name": "Pai", "description": "Bohemian hill town in northern Thailand's valley.", "rating": 4.5, "best_time": "Nov–March", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"},
        {"name": "Phi Phi Islands", "description": "Stunning island cluster with turquoise lagoons.", "rating": 4.8, "best_time": "Nov–April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600"},
        {"name": "Ayutthaya", "description": "Ancient Siamese capital with magnificent ruined temples.", "rating": 4.6, "best_time": "Nov–March", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600"},
        {"name": "Koh Samui", "description": "Tropical island paradise with luxury resorts and waterfalls.", "rating": 4.7, "best_time": "Dec–April", "category": "Beach", "image_url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600"},
        {"name": "Krabi", "description": "Limestone cliffs, mangrove forests, and pristine beaches.", "rating": 4.8, "best_time": "Nov–April", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600"},
        {"name": "Sukhothai", "description": "First capital of Thailand with serene historical ruins.", "rating": 4.5, "best_time": "Nov–April", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1575383038867-1dba90f26d02?w=600"},
        {"name": "Kanchanaburi", "description": "WWII history meets River Kwai, waterfalls, and forests.", "rating": 4.6, "best_time": "Nov–March", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600"},
    ],
    "Peru": [
        {"name": "Machu Picchu", "description": "Legendary Inca citadel hidden in the Andean clouds.", "rating": 5.0, "best_time": "May–October", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600"},
        {"name": "Cusco", "description": "Former Inca capital blending Spanish colonial and indigenous culture.", "rating": 4.7, "best_time": "May–October", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=600"},
        {"name": "Amazon Basin", "description": "Peru's slice of the Amazon with extraordinary wildlife.", "rating": 4.8, "best_time": "May–October", "category": "Wildlife", "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600"},
        {"name": "Lake Titicaca", "description": "World's highest navigable lake with floating reed islands.", "rating": 4.7, "best_time": "May–October", "category": "Nature", "image_url": "https://images.unsplash.com/photo-1601425064543-e1f1f5d1e5d4?w=600"},
        {"name": "Sacred Valley", "description": "Fertile Andean valley of Inca ruins and traditional villages.", "rating": 4.7, "best_time": "May–October", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600"},
        {"name": "Colca Canyon", "description": "One of the world's deepest canyons, home to condors.", "rating": 4.8, "best_time": "April–November", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600"},
        {"name": "Lima", "description": "Gastronomic capital of Latin America on the Pacific coast.", "rating": 4.6, "best_time": "Dec–April", "category": "City", "image_url": "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600"},
        {"name": "Nazca Lines", "description": "Mysterious giant geoglyphs etched in the desert plateau.", "rating": 4.7, "best_time": "May–October", "category": "Historical", "image_url": "https://images.unsplash.com/photo-1553566254-545de6de2a15?w=600"},
        {"name": "Rainbow Mountain", "description": "Vinicunca's striped mineral peak at 5,200m elevation.", "rating": 4.9, "best_time": "April–October", "category": "Adventure", "image_url": "https://images.unsplash.com/photo-1580100586938-02822d99c4a8?w=600"},
        {"name": "Arequipa", "description": "White city of baroque churches with El Misti volcano backdrop.", "rating": 4.6, "best_time": "April–November", "category": "Cultural", "image_url": "https://images.unsplash.com/photo-1591778773958-e9dab2cd0e43?w=600"},
    ],
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

HOTELS = {
    "Tokyo": [
        {"name": "The Peninsula Tokyo", "stars": 5, "price_per_night": 650, "amenities": ["Spa", "Pool", "Fine Dining", "Concierge"], "image_url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400"},
        {"name": "Aman Tokyo", "stars": 5, "price_per_night": 850, "amenities": ["Sky Bar", "Pool", "Spa", "Butler"], "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400"},
        {"name": "Shinjuku Granbell Hotel", "stars": 3, "price_per_night": 150, "amenities": ["Wi-Fi", "Restaurant", "Bar"], "image_url": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"},
    ],
    "Rome": [
        {"name": "Hotel de Russie", "stars": 5, "price_per_night": 750, "amenities": ["Garden", "Spa", "Pool", "Michelin Restaurant"], "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"},
        {"name": "J.K. Place Roma", "stars": 5, "price_per_night": 620, "amenities": ["Terrace", "Bar", "Concierge"], "image_url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400"},
        {"name": "Hotel Navona", "stars": 3, "price_per_night": 120, "amenities": ["Wi-Fi", "Breakfast"], "image_url": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"},
    ],
}

TOURS = [
    {
        "title": "Japan Cherry Blossom Dream",
        "description": "Experience Japan's most magical season, the cherry blossom bloom, across Tokyo, Kyoto, and Nara.",
        "duration_days": 10,
        "price": 2999,
        "max_group_size": 16,
        "difficulty": "Easy",
        "rating": 4.9,
        "cover_image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
        "quick_facts": {"capital": "Tokyo", "currency": "JPY (¥)", "language": "Japanese", "calling_code": "+81"},
        "attractions": ["Senso-ji Temple", "Mount Fuji", "Arashiyama Bamboo Grove", "Fushimi Inari-taisha", "Itsukushima Shrine", "Todai-ji Temple"],
        "highlights": ["Sakura viewing in Ueno Park", "Fushimi Inari Shrine", "Tea ceremony in Kyoto", "Deer Park in Nara"],
        "includes": ["Accommodation", "Daily breakfast", "Bullet train passes", "English guide", "Airport transfers"],
        "exclusions": ["International flights", "Personal expenses", "Travel insurance", "Lunch & Dinner (on free days)"],
        "itinerary": [
            {"day": 1, "title": "Arrival in Tokyo", "description": "Welcome dinner at a traditional izakaya, orientation walk in Shinjuku."},
            {"day": 2, "title": "Tokyo Highlights", "description": "Tsukiji Market, Senso-ji Temple in Asakusa, Shibuya Crossing."},
            {"day": 3, "title": "Ueno & Akihabara", "description": "Cherry blossom picnic in Ueno Park, explore Akihabara tech district."},
            {"day": 4, "title": "Nikko Day Trip", "description": "Ornate Tosho-gu shrine complex surrounded by ancient cedars."},
            {"day": 5, "title": "Bullet Train to Kyoto", "description": "Travel by Shinkansen, afternoon in the Arashiyama bamboo grove."},
            {"day": 6, "title": "Kyoto Temples", "description": "Fushimi Inari torii gates, Kinkaku-ji Golden Pavilion, tea ceremony."},
            {"day": 7, "title": "Nara & Osaka", "description": "Feed deer at Nara Park, Todai-ji temple, travel to Osaka."},
            {"day": 8, "title": "Osaka Food Tour", "description": "Dotonbori street food, Osaka Castle, Kuromon Market."},
            {"day": 9, "title": "Free Day & Shopping", "description": "Optional day trips, souvenir shopping in Shinsaibashi."},
            {"day": 10, "title": "Departure", "description": "Transfer to airport, farewell breakfast."},
        ],
    },
    {
        "title": "Classic Italy Grand Tour",
        "description": "An unforgettable journey through Rome's ancient ruins, Venice's canals, Florence's Renaissance art, and the Amalfi Coast.",
        "duration_days": 12,
        "price": 3499,
        "max_group_size": 18,
        "difficulty": "Easy",
        "rating": 4.8,
        "cover_image": "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
        "quick_facts": {"capital": "Rome", "currency": "Euro (€)", "language": "Italian", "calling_code": "+39"},
        "attractions": ["Colosseum", "Pantheon", "St. Peter's Basilica", "Trevi Fountain", "Galleria dell'Accademia", "Pompeii Ruins"],
        "highlights": ["Colosseum & Vatican", "Gondola ride in Venice", "Uffizi Gallery", "Amalfi Coast drive"],
        "includes": ["4-star hotels", "Daily breakfast", "High-speed trains", "Skip-the-line museum tickets", "Expert guide"],
        "exclusions": ["International airfare", "Personal items", "Optional excursions", "City tax (payable at hotel)"],
        "itinerary": [
            {"day": 1, "title": "Arrive in Rome", "description": "Check in and evening stroll to the Trevi Fountain and Piazza Navona."},
            {"day": 2, "title": "Ancient Rome", "description": "Colosseum, Roman Forum, and Palatine Hill with skip-the-line access."},
            {"day": 3, "title": "Vatican City", "description": "St. Peter's Basilica, Sistine Chapel, and Vatican Museums."},
            {"day": 4, "title": "Rome to Florence", "description": "High-speed train, afternoon walk to Piazzale Michelangelo for sunset."},
            {"day": 5, "title": "Florence Art & Culture", "description": "Uffizi Gallery, Ponte Vecchio, Accademia to see David."},
            {"day": 6, "title": "Tuscany Day Trip", "description": "Chianti wine country, San Gimignano medieval towers."},
            {"day": 7, "title": "Florence to Venice", "description": "Train to Venice, first gondola ride through the canals."},
            {"day": 8, "title": "Venice Highlights", "description": "St. Mark's Basilica, Doge's Palace, Murano glass island."},
            {"day": 9, "title": "Venice to Naples", "description": "Travel south, evening pizza in Naples birthplace."},
            {"day": 10, "title": "Pompeii & Amalfi", "description": "Pompeii ruins, drive along the dramatic Amalfi Coast."},
            {"day": 11, "title": "Positano & Ravello", "description": "Explore cliff-hanging villages and stunning viewpoints."},
            {"day": 12, "title": "Departure", "description": "Transfer to Naples airport, farewell breakfast."},
        ],
    },
    {
        "title": "India Golden Triangle & Beyond",
        "description": "From Delhi's chaos to Agra's wonder and Jaipur's pink splendour, immerse yourself in India's golden triangle plus Kerala.",
        "duration_days": 14,
        "price": 2799,
        "max_group_size": 14,
        "difficulty": "Moderate",
        "rating": 4.7,
        "cover_image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
        "highlights": ["Taj Mahal sunrise", "Amber Fort in Jaipur", "Kerala houseboat", "Spice market in Kochi"],
        "includes": ["Hotels & houseboats", "All breakfasts & dinners", "Domestic flights", "Expert guide", "Rickshaw tour"],
        "itinerary": [
            {"day": 1, "title": "Arrive Delhi", "description": "Welcome dinner with traditional Indian food."},
            {"day": 2, "title": "Delhi Sightseeing", "description": "Red Fort, Jama Masjid, Chandni Chowk, Humayun's Tomb."},
            {"day": 3, "title": "Train to Agra", "description": "Shatabdi Express to Agra, Agra Fort visit."},
            {"day": 4, "title": "Taj Mahal Sunrise", "description": "Iconic sunrise visit to the Taj Mahal, afternoon leisure."},
            {"day": 5, "title": "Drive to Jaipur", "description": "Fatehpur Sikri stop en route, arrive Pink City."},
            {"day": 6, "title": "Jaipur Highlights", "description": "Amber Fort elephant ride, City Palace, Hawa Mahal."},
            {"day": 7, "title": "Jaipur Bazaars", "description": "Textile, jewellery, and spice markets with cooking class."},
            {"day": 8, "title": "Fly to Kochi", "description": "Flight to Kerala, afternoon in Fort Kochi, Chinese fishing nets."},
            {"day": 9, "title": "Kochi to Munnar", "description": "Drive through tea plantations, sunset at Munnar hills."},
            {"day": 10, "title": "Munnar & Spice Gardens", "description": "Tea factory tour, cardamom & pepper gardens."},
            {"day": 11, "title": "Drive to Alleppey", "description": "Board traditional Kerala houseboat, backwaters cruise."},
            {"day": 12, "title": "Houseboat Life", "description": "Village walks, fishing, sunset from the deck."},
            {"day": 13, "title": "Kovalam Beach", "description": "Ayurvedic spa, beach leisure, farewell dinner."},
            {"day": 14, "title": "Departure", "description": "Transfer to Trivandrum airport."},
        ],
    },
    {
        "title": "Thailand Temple & Beach Escape",
        "description": "From Bangkok's grand temples and Chiang Mai's elephant sanctuaries to the turquoise waters of Krabi.",
        "duration_days": 10,
        "price": 1999,
        "max_group_size": 20,
        "difficulty": "Easy",
        "rating": 4.8,
        "cover_image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
        "highlights": ["Wat Phra Kaew", "Elephant ethical sanctuary", "Phi Phi Islands", "Krabi rock climbing"],
        "includes": ["Boutique hotels", "Breakfasts", "Domestic flights", "Island speedboat", "English guide"],
        "itinerary": [
            {"day": 1, "title": "Arrive Bangkok", "description": "Check-in, evening Chao Phraya river dinner cruise."},
            {"day": 2, "title": "Bangkok Temples", "description": "Grand Palace, Wat Pho Reclining Buddha, Wat Arun."},
            {"day": 3, "title": "Bangkok Markets", "description": "Floating market, Chatuchak weekend market, Chinatown."},
            {"day": 4, "title": "Fly to Chiang Mai", "description": "Flight north, evening Night Bazaar and street food."},
            {"day": 5, "title": "Elephant Sanctuary", "description": "Full day ethical elephant experience, jungle trekking."},
            {"day": 6, "title": "Doi Suthep & Cooking", "description": "Mountain temple visit, afternoon Thai cooking class."},
            {"day": 7, "title": "Fly to Krabi", "description": "Relax at beachfront resort, sunset cocktails."},
            {"day": 8, "title": "4 Islands Tour", "description": "Speedboat to Phi Phi islands, snorkelling, Maya Bay."},
            {"day": 9, "title": "Railay Beach", "description": "Accessible only by boat, rock climbing, sea kayaking."},
            {"day": 10, "title": "Departure", "description": "Transfer to Krabi airport, farewell."},
        ],
    },
    {
        "title": "Egypt Pharaohs & Desert Adventure",
        "description": "Explore the ancient wonders of the pharaohs along the Nile, dive the Red Sea, and sleep under desert stars.",
        "duration_days": 10,
        "price": 2199,
        "max_group_size": 15,
        "difficulty": "Moderate",
        "rating": 4.7,
        "cover_image": "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800",
        "highlights": ["Giza Pyramids & Sphinx", "Valley of the Kings", "Red Sea diving", "Nile felucca cruise"],
        "includes": ["Hotels & Nile cruise cabin", "All meals on cruise", "Entry tickets", "Egyptologist guide", "Diving session"],
        "itinerary": [
            {"day": 1, "title": "Arrive Cairo", "description": "Welcome dinner with Nile views."},
            {"day": 2, "title": "Giza Pyramids", "description": "Great Pyramid, Sphinx, Egyptian Museum with mummies."},
            {"day": 3, "title": "Old Cairo & Bazaar", "description": "Coptic Cairo, Khan el-Khalili bazaar, Al-Azhar."},
            {"day": 4, "title": "Fly to Luxor", "description": "Board Nile cruise ship, Karnak Temple by night."},
            {"day": 5, "title": "Valley of the Kings", "description": "Royal tombs, Hatshepsut Temple, Colossi of Memnon."},
            {"day": 6, "title": "Cruise to Aswan", "description": "Sailing the Nile, Kom Ombo and Edfu temples."},
            {"day": 7, "title": "Aswan & Abu Simbel", "description": "High dam, Philae temple, fly to Abu Simbel rock temples."},
            {"day": 8, "title": "Fly to Sharm el-Sheikh", "description": "Arrive Red Sea, afternoon beach leisure."},
            {"day": 9, "title": "Red Sea Diving", "description": "Snorkelling and diving in coral reefs, Bedouin dinner."},
            {"day": 10, "title": "Departure", "description": "Transfer to Cairo airport."},
        ],
    },
    {
        "title": "Peru Inca Trail & Amazon Odyssey",
        "description": "Trek the legendary Inca Trail to Machu Picchu, cruise Lake Titicaca, and venture deep into the Amazon jungle.",
        "duration_days": 12,
        "price": 3299,
        "max_group_size": 12,
        "difficulty": "Challenging",
        "rating": 4.9,
        "cover_image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
        "highlights": ["Inca Trail trek", "Machu Picchu sunrise", "Amazon wildlife", "Lake Titicaca"],
        "includes": ["Boutique lodges", "All meals", "Inca Trail permits", "Trek guides", "Amazon boat", "Domestic flights"],
        "itinerary": [
            {"day": 1, "title": "Arrive Lima", "description": "Gastronomic dinner at Miraflores, coastal walk."},
            {"day": 2, "title": "Lima to Cusco", "description": "Flight to Cusco, acclimatisation walk, Qorikancha temple."},
            {"day": 3, "title": "Sacred Valley", "description": "Pisac Inca ruins, Ollantaytambo fortress, local market."},
            {"day": 4, "title": "Inca Trail Day 1", "description": "Begin trek at KM82, through subtropical jungle, 12km."},
            {"day": 5, "title": "Inca Trail Day 2", "description": "Dead Woman's Pass at 4,215m – the highest point, 16km."},
            {"day": 6, "title": "Inca Trail Day 3", "description": "Archaeological sites and cloud forest, 10km."},
            {"day": 7, "title": "Machu Picchu", "description": "Sun Gate sunrise, guided citadel tour, Huayna Picchu option."},
            {"day": 8, "title": "Return to Cusco", "description": "Train back, celebratory dinner."},
            {"day": 9, "title": "Fly to Puerto Maldonado", "description": "Gateway to Amazonia, boat to jungle lodge."},
            {"day": 10, "title": "Amazon Day 1", "description": "Canopy walk, caiman spotting at night, piranha fishing."},
            {"day": 11, "title": "Lake Titicaca", "description": "Fly to Puno, boat to floating Uros islands."},
            {"day": 12, "title": "Departure", "description": "Return to Lima airport, farewell."},
        ],
    },
    {
        "title": "Australian Outback & Reef Explorer",
        "description": "From Sydney's harbour to the Great Barrier Reef and the red heart of Uluru — Australia's ultimate highlights.",
        "duration_days": 12,
        "price": 3799,
        "max_group_size": 16,
        "difficulty": "Easy",
        "rating": 4.8,
        "cover_image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
        "highlights": ["Sydney Harbour cruise", "Great Barrier Reef diving", "Uluru sunset", "Kangaroo wildlife"],
        "includes": ["Hotels & resorts", "Domestic flights", "Reef dive", "Guided outback walks", "Daily breakfast"],
        "itinerary": [
            {"day": 1, "title": "Arrive Sydney", "description": "Harbour Bridge walk, Opera House tour, Circular Quay."},
            {"day": 2, "title": "Sydney Highlights", "description": "Bondi to Coogee coastal walk, Manly Ferry, Taronga Zoo."},
            {"day": 3, "title": "Blue Mountains", "description": "Three Sisters, Scenic World railway, eucalyptus valleys."},
            {"day": 4, "title": "Fly to Cairns", "description": "Gateway to the Reef, night at beachfront hotel."},
            {"day": 5, "title": "Great Barrier Reef", "description": "Full-day reef tour — snorkelling, diving, and glass-bottom boat."},
            {"day": 6, "title": "Daintree Rainforest", "description": "Crocodile boat cruise, forest boardwalk, Cape Tribulation beach."},
            {"day": 7, "title": "Fly to Uluru", "description": "Arrive Ayers Rock Resort, sunset camel ride."},
            {"day": 8, "title": "Uluru & Kata Tjuta", "description": "Sunrise walk, base walk, Kata Tjuta Valley of the Winds."},
            {"day": 9, "title": "Fly to Melbourne", "description": "Federation Square, laneway coffee culture, art galleries."},
            {"day": 10, "title": "Great Ocean Road", "description": "Twelve Apostles, Loch Ard Gorge, rainforest detour."},
            {"day": 11, "title": "Melbourne Foodie Day", "description": "Queen Victoria Market, Yarra River, rooftop bars."},
            {"day": 12, "title": "Departure", "description": "Transfer to Melbourne airport, farewell."},
        ],
    },
    {
        "title": "Brazil Carnival & Amazon Rush",
        "description": "Time your visit with Rio's spectacular Carnival, then venture into the Amazon and the surreal Lençóis Maranhenses.",
        "duration_days": 11,
        "price": 2899,
        "max_group_size": 14,
        "difficulty": "Moderate",
        "rating": 4.7,
        "cover_image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
        "highlights": ["Rio Carnival parade", "Christ the Redeemer", "Amazon lodge stay", "Lençóis sand dunes"],
        "includes": ["Boutique hotels", "Most meals", "Domestic flights", "Carnival tickets", "Amazon guide"],
        "itinerary": [
            {"day": 1, "title": "Arrive Rio de Janeiro", "description": "Ipanema Beach, welcome samba dinner."},
            {"day": 2, "title": "Rio Icons", "description": "Christ the Redeemer, Sugarloaf Mountain, Santa Teresa."},
            {"day": 3, "title": "Carnival Parade", "description": "Sambadrome spectacular night parade with VIP seating."},
            {"day": 4, "title": "Tijuca Forest & Beaches", "description": "World's largest urban rainforest, Copacabana sunset."},
            {"day": 5, "title": "Fly to Manaus", "description": "Gateway to the Amazon, Teatro Amazonas opera house."},
            {"day": 6, "title": "Amazon Day 1", "description": "Boat to jungle lodge, river dolphin spotting, forest hike."},
            {"day": 7, "title": "Amazon Day 2", "description": "Meeting of the Waters, piranha fishing, local village."},
            {"day": 8, "title": "Fly to Maranhão", "description": "Arrive São Luís, colonial historic centre walk."},
            {"day": 9, "title": "Lençóis Maranhenses", "description": "4WD to dunes, swim in crystal lagoons, dune buggy."},
            {"day": 10, "title": "Iguazu Falls", "description": "Fly south to Argentina border, walk the falls catwalks."},
            {"day": 11, "title": "Departure", "description": "Return to São Paulo, international departure."},
        ],
    },
]

def seed():
    db = SessionLocal()
    try:
        if db.query(models.Country).count() > 0:
            print("Database already seeded.")
            return
        
        country_map = {}
        for c in COUNTRIES:
            obj = models.Country(**c)
            db.add(obj)
            db.flush()
            country_map[c["name"]] = obj.id
        
        # Create Tour Packages first to get IDs
        tour_obj_map = {}
        for t in TOURS:
            obj = models.TourPackage(**t)
            db.add(obj)
            db.flush()
            # Map country name in title to package ID for simple linking
            for c_name in COUNTRIES:
                if c_name["name"] in t["title"]:
                    tour_obj_map[c_name["name"]] = obj.id

        place_map = {}
        for country_name, places in PLACES.items():
            cid = country_map.get(country_name)
            if not cid:
                continue
            
            # Find matching tour for this country
            tid = tour_obj_map.get(country_name)
            
            for p in places:
                # Add tour_package_id to each place
                obj = models.Place(country_id=cid, tour_package_id=tid, **p)
                db.add(obj)
                db.flush()
                place_map[p["name"]] = obj.id
        
        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed()
