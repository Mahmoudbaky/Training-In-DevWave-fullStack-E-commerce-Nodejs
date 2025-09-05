import mongoose from "mongoose";
import Product from "../models/product.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mahmoudsaleh3478y7:qDC4xfMnDZ5i3F3g@cluster0.xoowpfo.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=DevWaveEcommerce"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

const categories = {};

const quickProducts = [
  {
    name: "Meditations: A Masterpiece on Stoic Philosophy Self-Reflection",
    price: 50.95,
    description:
      "Meditations is a series of personal writings by Marcus Aurelius, Roman Emperor from 161 to 180 AD, in which he outlines his ideas on Stoic philosophy. The book is a collection of his private notes to himself, written in Greek while on military campaigns. It is divided into 12 books, each containing a series of reflections and aphorisms that explore themes such as self-discipline, rationality, and the nature of the universe. Meditations is considered one of the greatest works of philosophy and has been widely read and studied for its insights into human nature and the pursuit of virtue.",
    category: "68ba136513295fcae2f5e4ea",
    images: "https://m.media-amazon.com/images/I/717Y82GZwWL._SY385_.jpg",
    brand: "Marcus Aurelius",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Attitude is Everything",
    price: 22.3,
    description:
      "Attitude is Everything is a self-help book by Jeff Keller that emphasizes the power of positive thinking and the impact of attitude on success and happiness. The book provides practical advice and techniques for developing a positive mindset, overcoming obstacles, and achieving personal and professional goals. It encourages readers to take responsibility for their thoughts and actions, and to cultivate a mindset of optimism, resilience, and determination. Attitude is Everything has been widely praised for its motivational message and practical approach to personal development.",
    category: "68ba136513295fcae2f5e4ea",
    images: "https://m.media-amazon.com/images/I/61go3pwTLYL._SY466_.jpg",
    brand: "Jeff Keller",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "SNIFITAR Vegetable Chopper, Pro Onion Chopper",
    price: 55.99,
    description:
      "This vegetable chopper is designed to make food preparation quick and easy. It features sharp stainless steel blades that can chop, dice, and slice a variety of vegetables with minimal effort. The chopper has a large capacity bowl for holding chopped ingredients, as well as a non-slip base for stability during use. It also comes with a cleaning brush for easy maintenance.",
    category: "68ba136613295fcae2f5e4ec",
    images: "https://m.media-amazon.com/images/I/71Zts3ruaIL._AC_SX679_.jpg",
    brand: "SNIFITAR",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "TrendPlain 16oz/470ml Olive Oil Sprayer for Cooking - 2 in 1 Olive Oil Dispenser",
    price: 15.99,
    description:
      "This olive oil sprayer is perfect for cooking and baking. It features a 2-in-1 design that allows you to spray or pour oil with ease. The adjustable nozzle lets you control the amount of oil used, making it a healthier alternative to traditional oil dispensers. The sprayer is made of high-quality glass and stainless steel, ensuring durability and style.",
    category: "68ba136613295fcae2f5e4ec",
    images: "https://m.media-amazon.com/images/I/71iReI9BzML._AC_SX679_.jpg",
    brand: "TrendPlain",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "GoodTool Men's Polarized Sunglasses",
    price: 695,
    description:
      "These polarized sunglasses are designed to reduce glare and provide 100% UV protection. The lightweight and durable frame ensures a comfortable fit, while the stylish design makes them suitable for any occasion. Whether you're driving, fishing, or enjoying a day at the beach, these sunglasses will keep your eyes protected and your vision clear.",
    category: "68ba136613295fcae2f5e4ee",
    images: "https://m.media-amazon.com/images/I/41Yc1t0H1nL._AC_SX569_.jpg",
    stars: 2,
    brand: "GoodTool",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Zoofly Men's Gym T-Shirts Short Sleeve 3 Pack Workout T Shirts for Men",
    price: 168,
    description:
      "These gym t-shirts are made from a breathable and moisture-wicking fabric that keeps you cool and dry during your workouts. The short sleeve design allows for maximum mobility, while the classic fit provides comfort and style. Perfect for any fitness activity, these t-shirts are a must-have for any active",
    category: "68ba136613295fcae2f5e4ee",
    images: "https://m.media-amazon.com/images/I/81rrgSe9IXL._AC_SX522_.jpg",
    stars: 3,
    brand: "Zoofly",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Neelabil Target Shooting Games Toy Guns for Kids",
    price: 9.99,
    description:
      "This toy gun set is perfect for kids who love to play and have fun. It includes a variety of colorful and lightweight toy guns that are safe and easy to use. The set also comes with targets and accessories to enhance the shooting experience. Whether playing indoors or outdoors, this toy gun set provides hours of entertainment for children.",
    category: "68ba136613295fcae2f5e4f0",
    images: "https://m.media-amazon.com/images/I/71mxeltoypL._AC_SX522_.jpg",
    stars: 5,
    brand: "Neelabil",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Magnetic Blocks for Kids",
    price: 10.99,
    description:
      "These magnetic blocks are perfect for kids to explore their creativity and build various structures. Made from high-quality, non-toxic materials, they are safe for children. The set includes different shapes and colors, allowing for endless possibilities in building and play.",
    category: "68ba136613295fcae2f5e4f0",
    images: "https://m.media-amazon.com/images/I/81NUeQ2QhYL._AC_SX679_.jpg",
    stars: 1,
    brand: "XICEN",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "SKY-TOUCH 500 Count Cotton Swabs Double Headed",
    price: 800,
    description:
      "These cotton swabs are made from 100% pure cotton and are double-headed for versatile use. They are perfect for cleaning ears, applying makeup, and other personal care needs. The swabs come in a convenient dispenser box for easy access and storage.",
    category: "68ba136613295fcae2f5e4f2",
    images: "https://m.media-amazon.com/images/I/71YClJAMr8L._AC_SX679_.jpg",
    stars: 4,
    brand: "SKY-TOUCH",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "KASTWAVE Ear and Body Point Probe Pen Double Headed Acupoint Search Pen Tool",
    price: 109,
    description:
      "This acupoint search pen is designed for locating and stimulating acupuncture points on the body. It features a double-headed design with a pointed tip for precise point location and a rounded tip for gentle stimulation. The pen is easy to use and is suitable for both professional practitioners and personal use at home.",
    category: "68ba136613295fcae2f5e4f2",
    images: "https://m.media-amazon.com/images/I/51Poj8-zIwS._AC_SX679_.jpg",
    stars: 3,
    brand: "KASTWAVE",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "AstroAI Tire Inflator Portable Air Compressor (Up to 150 PSI)",
    price: 109,
    description:
      "The AstroAI Tire Inflator is a portable air compressor designed for inflating tires quickly and efficiently. It features a digital display for easy reading, multiple nozzle attachments for various inflatables, and a built-in LED light for visibility in low-light conditions. The compact design makes it easy to store in your vehicle or carry with you on the go.",
    category: "68ba136613295fcae2f5e4f4",
    images: "https://m.media-amazon.com/images/I/716G1pPAXCL._AC_SX522_.jpg",
    stars: 2,
    brand: "AstroAI",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Amazon Basics 3-Piece Premium Rubber Floor Mat for Cars, SUVs and Trucks",
    price: 114,
    description:
      "These floor mats are designed to protect your vehicle's interior from dirt, mud, and spills. They are made from high-quality rubber material that is durable and easy to clean. The mats feature a non-slip backing to keep them securely in place and are compatible with most vehicles.",
    category: "68ba136613295fcae2f5e4f4",
    images: "https://m.media-amazon.com/images/I/51c2a0xrUJL._AC_SX522_.jpg",
    stars: 1,
    brand: "Amazon Basics",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Monoptilon Automatic Watering Time, Multifunctional Outdoor Garden Sprinkler Controller Intelligent Automatic Irrigation System",
    price: 599,
    description:
      "This automatic irrigation system is designed to simplify garden watering. It features a programmable timer, multiple watering modes, and a weather-resistant design for outdoor use. The system is easy to install and can be customized to meet the specific needs of your garden.",
    category: "68ba136613295fcae2f5e4f6",
    images: "https://m.media-amazon.com/images/I/61-Imd1ZddL._AC_SX679_.jpg",
    stars: 4,
    brand: "Monoptilon",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Smart Irrigation Timer Wi-Fi 4G Bluetooth - Digital Timer for Gardens, Lawn, Drip Irrigation Controller",
    price: 200,
    description:
      "This digital timer is designed for use with garden irrigation systems. It features Wi-Fi and 4G connectivity, allowing for remote control and monitoring via a smartphone app. The timer is compatible with drip irrigation systems and offers multiple scheduling options to optimize water usage.",
    category: "68ba136613295fcae2f5e4f6",
    images: "https://m.media-amazon.com/images/I/51uc+96MA3L._AC_SX679_.jpg",
    stars: 4,
    brand: "K R M",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Tyuyuio Pet Hypoallergenic Wipes,Extra Thick Dog Wipes for Cleaning Pet's",
    price: 56.99,
    description:
      "These hypoallergenic pet wipes are designed for cleaning and grooming pets. They are extra thick and made from gentle, non-toxic materials that are safe for pets with sensitive skin. The wipes are effective for removing dirt, allergens, and odors, making them ideal for use between baths.",
    category: "68ba136713295fcae2f5e4f8",
    images: "https://m.media-amazon.com/images/I/617FqPTUHFL._AC_SX679_.jpg",
    stars: 4,
    brand: "Tyuyuio",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Nyganmelloz Pet Water Fountain 1.6L, Drinking Fountain with Activated Carbon, Pet Supplies Automatic Water Dispenser with Fountain Filter for Cat Dog",
    price: 29.95,
    description:
      "This pet water fountain features a 1.6L capacity and an activated carbon filter to ensure clean and fresh water for your pets. The automatic water dispenser encourages pets to drink more, promoting better hydration. The fountain is designed for both cats and dogs and is easy to clean and maintain.",
    category: "68ba136713295fcae2f5e4f8",
    images: "https://m.media-amazon.com/images/I/61mBkie6IdL._AC_SX679_.jpg",
    stars: 2,
    brand: "Nyganmelloz",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Goodern 15 Pack Mesh Zipper Pouch Document Bags,A3|A4|A5 Size Document Bags Plastic Zip File",
    price: 39.99,
    description:
      "These document bags are perfect for organizing and protecting your important papers. Made from durable plastic, they feature a mesh design for visibility and breathability. The zipper closure ensures that your documents stay secure, while the various sizes make them versatile for different needs.",
    category: "68ba136713295fcae2f5e4fa",
    images: "https://m.media-amazon.com/images/I/6177BUY0kYL._AC_SX679_.jpg",
    stars: 1,
    brand: "Goodern",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "SKY-TOUCH 5 Tier Paper Tray : Desktop Organizer",
    price: 9.85,
    description:
      "This 5-tier paper tray is designed to help you organize your desk and keep your documents in order. Made from sturdy materials, it features five separate trays for sorting papers, files, and other office supplies. The compact design saves space while providing ample storage for your work essentials.",
    category: "68ba136713295fcae2f5e4fa",
    images: "https://m.media-amazon.com/images/I/71JyyjHwH1L._AC_SX679_.jpg",
    stars: 4,
    brand: "SKY-TOUCH",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Vaseline Petroleum Jelly Baby, 250ml",
    price: 7.95,
    description:
      "Vaseline Petroleum Jelly is a gentle and nourishing jelly that helps to keep your baby's skin soft and smooth. It is made with pure petroleum jelly and enriched with vitamin E, providing long-lasting moisture and protection against dryness. The lightweight formula absorbs quickly and is perfect for massaging your baby or adding to bath water for extra hydration.",
    category: "68ba136713295fcae2f5e4fc",
    images: "https://m.media-amazon.com/images/I/71kgpec5t3L._AC_SX679_.jpg",
    stars: 4,
    brand: "Vaseline",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Himalaya Baby Powder (200g)",
    price: 12.99,
    description:
      "Himalaya Baby Powder is a gentle and soothing powder that helps to keep your baby's skin dry and comfortable. It is made with natural ingredients like herbal extracts and is free from harmful chemicals. The lightweight formula absorbs moisture effectively, making it ideal for use after bath time or diaper changes.",
    category: "68ba136713295fcae2f5e4fc",
    images: "https://m.media-amazon.com/images/I/612VFCsGSvS._AC_SX679_.jpg",
    stars: 5,
    brand: "Himalaya",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Violin Kit Full Size 4/4 Vintage Solid Wood Violin for Beginner Above 11 Years With Case",
    price: 7.95,
    description:
      "This violin kit is perfect for beginners and features a full-size 4/4 vintage solid wood violin. It comes with a case, bow, and rosin, making it an excellent choice for students above 11 years old. The high-quality craftsmanship ensures a beautiful sound, while the included accessories provide everything needed to start playing.",
    category: "68ba136713295fcae2f5e4fe",
    images: "https://m.media-amazon.com/images/I/71NftDwYiqL._AC_SX679_.jpg",
    stars: 4,
    brand: "Violin",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
  {
    name: "Yamaha YRS-23G Germanic, eight hole high C Flute Instrument",
    price: 12.99,
    description:
      "This flute is perfect for beginners and young children who want to learn to play music. It features a lightweight design, eight holes for easy playability, and a colorful finish that kids will love. The flute comes with a carrying case for easy transport and storage.",
    category: "68ba136713295fcae2f5e4fe",
    images: "https://m.media-amazon.com/images/I/71Ro54KOMrL._AC_SX679_.jpg",
    stars: 5,
    brand: "Yamaha",
    stock: 100,
    discount: 10,
    saleRate: 1000,
    deliveryDate: "2023-09-15T12:00:00.000+00:00",
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Insert new products
    console.log("Inserting sample products...");
    const products = await Product.insertMany(quickProducts);

    console.log(`✅ Successfully added ${products.length} products:`);
    products.forEach((p) => console.log(`   - ${p.name} ($${p.price})`));
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the seeder
seedDatabase();
