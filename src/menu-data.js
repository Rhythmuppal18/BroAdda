/**
 * BroAdda vegetarian menu data
 */
const menuDatabase = [
    { id: "veg-01", name: "Smoky Truffle Burger", category: "burgers", price: 360, tags: ["VEG", "CHEF PICK"], desc: "A hearty grilled patty layered with truffle mayo, caramelized onions, and crisp greens." },
    { id: "veg-02", name: "Garden Glow Slider", category: "burgers", price: 320, tags: ["VEG", "LIGHT"], desc: "Soft buns filled with a spiced vegetable patty, tomato relish, and fresh herbs." },
    { id: "veg-03", name: "Harissa Crunch Burger", category: "burgers", price: 340, tags: ["SPICY", "VEG"], desc: "Charred patty finished with harissa sauce, pickled cucumbers, and crunchy lettuce." },
    { id: "veg-04", name: "Paneer Melt Stack", category: "burgers", price: 380, tags: ["SIGNATURE", "VEG"], desc: "Golden paneer slices with melted cheese, onion jam, and a toasted brioche bun." },
    { id: "veg-05", name: "Mushroom Bliss Burger", category: "burgers", price: 330, tags: ["VEGAN", "VEG"], desc: "A juicy mushroom-based patty with roasted garlic aioli and herb salad." },

    { id: "veg-06", name: "Crispy Corn Bites", category: "appetizers", price: 240, tags: ["CRISPY", "VEG"], desc: "Golden corn fritters served with a zesty mint yogurt dip." },
    { id: "veg-07", name: "Truffle Fries", category: "appetizers", price: 260, tags: ["CLASSIC", "VEG"], desc: "Crisp fries tossed with truffle oil, parmesan dust, and fresh parsley." },
    { id: "veg-08", name: "Paneer Tikka Skewers", category: "appetizers", price: 310, tags: ["SMOKED", "VEG"], desc: "Soft paneer cubes charred with tandoor spices and served with chutney." },
    { id: "veg-09", name: "Pesto Flatbread", category: "appetizers", price: 300, tags: ["HERBY", "VEG"], desc: "Stone-baked flatbread with basil pesto, roasted tomatoes, and mozzarella." },

    { id: "veg-10", name: "Creamy Tomato Pasta", category: "mains", price: 390, tags: ["COMFORT", "VEG"], desc: "Silky tomato cream pasta finished with basil and parmesan." },
    { id: "veg-11", name: "Mushroom Risotto", category: "mains", price: 410, tags: ["RICH", "VEG"], desc: "Creamy arborio rice with roasted mushrooms, parmesan, and herb finish." },
    { id: "veg-12", name: "Paneer Butter Masala", category: "mains", price: 430, tags: ["FAVORITE", "VEG"], desc: "Tender paneer in a velvety tomato gravy with aromatic spices." },
    { id: "veg-13", name: "Vegetable Biryani", category: "mains", price: 420, tags: ["AROMATIC", "VEG"], desc: "Fragrant basmati rice layered with roasted vegetables and saffron." },
    { id: "veg-14", name: "Sesame Noodles Bowl", category: "mains", price: 360, tags: ["ASIAN", "VEG"], desc: "Wok-tossed noodles with vegetables, soy glaze, and toasted sesame." },

    { id: "veg-15", name: "Mango Basil Cooler", category: "beverages", price: 180, tags: ["REFRESHING", "VEG"], desc: "Sweet mango, basil, and lime blended into a bright chilled drink." },
    { id: "veg-16", name: "Rose Mint Lemonade", category: "beverages", price: 160, tags: ["COOLING", "VEG"], desc: "Fresh lemonade with rose syrup and mint for a floral finish." },
    { id: "veg-17", name: "Iced Matcha Latte", category: "beverages", price: 200, tags: ["CREAMY", "VEG"], desc: "Smooth matcha blended with milk and a soft vanilla note." },

    { id: "veg-18", name: "Chocolate Lava Tart", category: "desserts", price: 280, tags: ["DESSERT", "VEG"], desc: "A crisp tart shell with a warm molten chocolate center and vanilla cream." },
    { id: "veg-19", name: "Berry Cheesecake Cup", category: "desserts", price: 270, tags: ["DESSERT", "VEG"], desc: "Creamy cheesecake layered with berry compote and biscuit crumble." },
    { id: "veg-20", name: "Honey Pistachio Kulfi", category: "desserts", price: 240, tags: ["CLASSIC", "VEG"], desc: "Slow-churned kulfi with pistachio crunch and a rich creamy finish." }
];

const categoryConfig = [
    { key: "all", label: "ALL VEG PICKS" },
    { key: "burgers", label: "VEG BURGERS" },
    { key: "appetizers", label: "STARTERS & SIDES" },
    { key: "mains", label: "MAIN COURSES" },
    { key: "desserts", label: "DESSERTS" },
    { key: "beverages", label: "BEVERAGES" }
];