/**
 * NHI Product System — Seed Data
 * Source: COMPLETE_Product_System_ALL_APPENDICES.xlsx
 * Foundation Year 2026, Version 1.0
 */

export const BRANDS = ['kazu_cafe', 'mendokoro', 'yushoken', 'kazunori', 'marudori', 'food_truck'];

export const BRAND_LABELS = {
  kazu_cafe:  'Kazu Café',
  mendokoro:  'Mendokoro',
  yushoken:   'Yushoken',
  kazunori:   'Kazunori',
  marudori:   'Marudori Ramenba',
  food_truck: 'Food Truck',
};

export const BRAND_SKU_TARGETS = {
  kazu_cafe:  13,
  mendokoro:  15,
  yushoken:   12,
  kazunori:   10,
  marudori:   8,
  food_truck: 5,
};

export const LOCATIONS = {
  kazu_cafe:  [{ id: 'kzc-ayala',     name: 'Ayala Triangle',  short: 'Ayala' }],
  mendokoro:  [
    { id: 'mdk-makati',    name: 'Makati',      short: 'Makati' },
    { id: 'mdk-bgc',       name: 'BGC',         short: 'BGC' },
    { id: 'mdk-alabang',   name: 'Alabang',     short: 'Alabang' },
    { id: 'mdk-pasay',     name: 'Pasay',       short: 'Pasay' },
    { id: 'mdk-cebu',      name: 'Cebu',        short: 'Cebu' },
    { id: 'mdk-katipunan', name: 'Katipunan',   short: 'Katipunan' },
  ],
  yushoken:   [
    { id: 'ysk-alabang',   name: 'Alabang',     short: 'Alabang' },
    { id: 'ysk-cebu',      name: 'Cebu',        short: 'Cebu' },
    { id: 'ysk-ortigas',   name: 'Ortigas',     short: 'Ortigas' },
    { id: 'ysk-panay',     name: 'Panay',       short: 'Panay' },
  ],
  kazunori:   [{ id: 'kzn-makati',    name: 'Makati',      short: 'Makati' }],
  marudori:   [
    { id: 'mrd-vcorp',     name: 'VCorp (Makati)', short: 'VCorp' },
    { id: 'mrd-rockwell',  name: 'Rockwell',    short: 'Rockwell' },
  ],
  food_truck: [{ id: 'ft-mobile',     name: 'Mobile (Yushoken-branded)', short: 'Mobile' }],
};

export const INITIAL_SKUS = [
  // ── KAZU CAFÉ ──
  { sku_code:'BEV-UML-001', product_name:'Ube Matcha Latte',        brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true }, selling_price:28000 },
  { sku_code:'BEV-YML-001', product_name:'Yakult Matcha Latte',     brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true, tree_nuts:'Gelatin (marshmallows)' }, selling_price:28000 },
  { sku_code:'BEV-SCH-001', product_name:'Salted Caramel Hojicha',  brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true }, selling_price:27000 },
  { sku_code:'BEV-HHL-001', product_name:'Hazelnut Hojicha',        brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true, tree_nuts:'HAZELNUT — CRITICAL' }, selling_price:28000 },
  { sku_code:'BEV-AHL-001', product_name:'Almond Hojicha',          brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true, tree_nuts:'ALMOND — CRITICAL' }, selling_price:28000 },
  { sku_code:'BEV-CCH-001', product_name:'Choco Cookies Hojicha',   brand:'kazu_cafe',  category:'beverage', status:'active',
    allergens:{ milk:true, wheat:true, soy:'Possible' }, selling_price:29000 },
  { sku_code:'DST-YUZU-001', product_name:'Yuzu Ice Cream',         brand:'kazu_cafe',  category:'dessert',  status:'active',
    allergens:{ milk:true }, selling_price:18000 },
  { sku_code:'DST-MTCH-001', product_name:'Matcha Ice Cream',       brand:'kazu_cafe',  category:'dessert',  status:'active',
    allergens:{ milk:true }, selling_price:18000 },
  { sku_code:'DST-STRW-001', product_name:'Strawberry Ice Cream',   brand:'kazu_cafe',  category:'dessert',  status:'active',
    allergens:{ milk:true }, selling_price:18000 },
  { sku_code:'MAIN-PIZZA-001', product_name:'Kazu Café Pizza',      brand:'kazu_cafe',  category:'main',     status:'active',
    allergens:{ milk:true, wheat:true }, selling_price:42000 },
  { sku_code:'MAIN-RICE-001', product_name:'Katsu Curry Rice',      brand:'kazu_cafe',  category:'main',     status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:38000 },
  // ── KAZUNORI ──
  { sku_code:'APP-GYOZA-001', product_name:'Gyoza (6pcs)',          brand:'kazunori',   category:'appetizer', status:'active',
    allergens:{ wheat:true, soy:true }, selling_price:22000 },
  { sku_code:'APP-EDM-001',  product_name:'Edamame',                brand:'kazunori',   category:'appetizer', status:'active',
    allergens:{ soy:true }, selling_price:18000 },
  { sku_code:'APP-TKY-001',  product_name:'Chicken Karaage',        brand:'kazunori',   category:'appetizer', status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:28000 },
  // ── MENDOKORO / YUSHOKEN ──
  { sku_code:'RMN-SHIO-001', product_name:'Shio Ramen',             brand:'mendokoro',  category:'ramen',    status:'active',
    allergens:{ eggs:true, fish:true, wheat:true, soy:true }, selling_price:49000 },
  { sku_code:'RMN-SHOYU-001', product_name:'Shoyu Ramen',           brand:'mendokoro',  category:'ramen',    status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:49000 },
  { sku_code:'RMN-MISO-001', product_name:'Miso Ramen',             brand:'yushoken',   category:'ramen',    status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:52000 },
  // ── MARUDORI RAMENBA ──
  { sku_code:'RMN-TNKT-001', product_name:'Tonkotsu Ramen',        brand:'marudori',   category:'ramen',    status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:48000 },
  { sku_code:'RMN-TSUK-001', product_name:'Tsukemen',               brand:'marudori',   category:'ramen',    status:'active',
    allergens:{ eggs:true, fish:true, wheat:true, soy:true }, selling_price:52000 },
  { sku_code:'MAIN-CHSH-001', product_name:'Chashu Don',            brand:'marudori',   category:'main',     status:'active',
    allergens:{ eggs:true, soy:true }, selling_price:38000 },
  { sku_code:'APP-GYOZA-002', product_name:'Gyoza (6pcs)',          brand:'marudori',   category:'appetizer', status:'active',
    allergens:{ wheat:true, soy:true }, selling_price:22000 },
  { sku_code:'APP-KRG-001', product_name:'Karaage',                 brand:'marudori',   category:'appetizer', status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:26000 },
  { sku_code:'BEV-BIRU-001', product_name:'Draft Beer',             brand:'marudori',   category:'beverage', status:'active',
    allergens:{ wheat:true }, selling_price:22000 },
  // ── FOOD TRUCK ──
  { sku_code:'RMN-TNKT-002', product_name:'Tonkotsu Ramen (Truck)', brand:'food_truck', category:'ramen',   status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:35000 },
  { sku_code:'APP-KRG-002', product_name:'Karaage Cup (Truck)',      brand:'food_truck', category:'appetizer', status:'active',
    allergens:{ eggs:true, wheat:true, soy:true }, selling_price:18000 },
  { sku_code:'BEV-BIRU-002', product_name:'Canned Beer (Truck)',     brand:'food_truck', category:'beverage', status:'active',
    allergens:{ wheat:true }, selling_price:15000 },
];

export const SUPPLIERS = [
  { id:1, name:'Green Pack Solutions',  contact:'Ramon Santiago', phone:'0917-555-2001', lead_days:'5-7', min_order_centavos:800000, category:'Packaging' },
  { id:2, name:'Packaging Plus',        contact:'Jose Ramos',     phone:'0917-555-2002', lead_days:'3-5', min_order_centavos:200000, category:'Packaging' },
  { id:3, name:'Japanese Imports Co.',  contact:'Kenji Tanaka',   phone:'0917-555-1004', lead_days:'30-45', min_order_centavos:2000000, category:'Specialty Ingredients' },
  { id:4, name:'Cup Masters',           contact:'Patricia Cruz',  phone:'0917-555-3001', lead_days:'3-5', min_order_centavos:500000, category:'Cups & Containers' },
  { id:5, name:'Paper Products Inc.',   contact:'Anna Santos',    phone:'0917-555-2004', lead_days:'5-7', min_order_centavos:300000, category:'Paper Goods' },
];

export const ALLERGEN_FIELDS = [
  { key:'milk',       label:'Milk/Dairy',    emoji:'🥛' },
  { key:'eggs',       label:'Eggs',          emoji:'🥚' },
  { key:'fish',       label:'Fish',          emoji:'🐟' },
  { key:'shellfish',  label:'Shellfish',     emoji:'🦐' },
  { key:'tree_nuts',  label:'Tree Nuts',     emoji:'🌰' },
  { key:'peanuts',    label:'Peanuts',       emoji:'🥜' },
  { key:'wheat',      label:'Wheat/Gluten',  emoji:'🌾' },
  { key:'soy',        label:'Soy',           emoji:'🫘' },
];

export const GLOSSARY = [
  { term:'BC% (Beverage/Food Cost %)', def:'Cost of ingredients ÷ Selling price × 100. Target: 25–30% beverages, 28–35% food.', example:'Ramen costs ₱150 to make, sells for ₱500 → BC% = 30%' },
  { term:'Contribution Margin (CM)', def:'Revenue minus variable costs per item. Money each item contributes to fixed costs + profit.', example:'Sells ₱500, costs ₱150 → CM = ₱350' },
  { term:'Product Bible', def:'Complete documentation for one SKU covering 6 sections: Brand Identity, Operations, Sensory, Commercials, Compliance, Digital Assets.' },
  { term:'SKU', def:'Stock Keeping Unit. Unique code per menu item. Format: CATEGORY-TYPE-### (e.g. BEV-YML-001).' },
  { term:'⭐ Star Product', def:'High margin + high popularity. Promote these hard.' },
  { term:'🐴 Plowhorse', def:'Low margin + high popularity. Volume driver — watch your costs.' },
  { term:'🧩 Puzzle', def:'High margin + low popularity. Needs better positioning.' },
  { term:'🐕 Dog Product', def:'Low margin + low popularity. Consider removing from menu.' },
  { term:'Par Level', def:'Minimum inventory needed to avoid stock-outs. Triggers reorder.' },
  { term:'GRN', def:'Goods Receiving Note. Document used to inspect/accept supplier deliveries.' },
  { term:'86\'d Item', def:'Temporarily unavailable item (sold out or out of stock).' },
  { term:'FIFO', def:'First In, First Out. Older stock used before newer stock to prevent spoilage.' },
  { term:'KM', def:'Kitchen Manager. Responsible for kitchen ops, staff, quality, and documentation at a location.' },
  { term:'OM', def:'Operations Manager. Oversees multiple locations.' },
  { term:'BDSP', def:'Business Development & Special Projects. Responsible for new products, system rollout, strategy.' },
];

export const INGREDIENT_CATEGORIES = [
  'All', 'Dairy', 'Powder/Tea', 'Syrup', 'Produce', 'Protein', 'Noodles', 'Packaging',
];

export const INITIAL_MARKET_ITEMS = [
  { id: 'm01', name: 'Matcha Powder (Ceremonial)',  supplier_id: 3, unit: 'g',   unit_size: '100g tin',      price_centavos: 350,  category: 'Powder/Tea',  price_history: [] },
  { id: 'm02', name: 'Hojicha Powder',              supplier_id: 3, unit: 'g',   unit_size: '100g tin',      price_centavos: 280,  category: 'Powder/Tea',  price_history: [] },
  { id: 'm03', name: 'Fresh Milk',                  supplier_id: 3, unit: 'ml',  unit_size: '1L carton',     price_centavos: 12,   category: 'Dairy',       price_history: [] },
  { id: 'm04', name: 'Heavy Cream',                 supplier_id: 3, unit: 'ml',  unit_size: '1L carton',     price_centavos: 25,   category: 'Dairy',       price_history: [] },
  { id: 'm05', name: 'Ube Halaya',                  supplier_id: 3, unit: 'g',   unit_size: '500g tub',      price_centavos: 40,   category: 'Produce',     price_history: [] },
  { id: 'm06', name: 'Hazelnut Syrup',              supplier_id: 3, unit: 'ml',  unit_size: '750ml bottle',  price_centavos: 18,   category: 'Syrup',       price_history: [] },
  { id: 'm07', name: 'Salted Caramel Syrup',        supplier_id: 3, unit: 'ml',  unit_size: '750ml bottle',  price_centavos: 18,   category: 'Syrup',       price_history: [] },
  { id: 'm08', name: 'Ramen Noodles (Fresh)',        supplier_id: 3, unit: 'g',   unit_size: '150g portion',  price_centavos: 30,   category: 'Noodles',     price_history: [] },
  { id: 'm09', name: 'Gyoza Wrappers',              supplier_id: 3, unit: 'pc',  unit_size: '50pc pack',     price_centavos: 150,  category: 'Noodles',     price_history: [] },
  { id: 'm10', name: 'Chicken Thigh (Boneless)',     supplier_id: 3, unit: 'g',   unit_size: '1kg pack',      price_centavos: 45,   category: 'Protein',     price_history: [] },
  { id: 'm11', name: 'Chashu Pork Belly',           supplier_id: 3, unit: 'g',   unit_size: '1kg slab',      price_centavos: 55,   category: 'Protein',     price_history: [] },
  { id: 'm12', name: '16oz Cup + Lid',              supplier_id: 4, unit: 'pc',  unit_size: '50pc sleeve',   price_centavos: 800,  category: 'Packaging',   price_history: [] },
];

export const VESSEL_CATEGORIES = ['All', 'Glassware', 'Bowl', 'Plate', 'Container', 'Cup', 'Bag', 'Utensil', 'Sauce', 'Seal/Wrap', 'Accessory'];

export const INITIAL_VESSELS = [
  // Glassware
  { code: 'VES-GL-001', category: 'Glassware', item: 'Latte Glass 12oz',          size: '12oz',  material: 'Tempered Glass', supplier: 'Japanese Imports Co.', cost_centavos: 18000, eco: false, status: 'active' },
  { code: 'VES-GL-002', category: 'Glassware', item: 'Iced Drink Glass 16oz',     size: '16oz',  material: 'Tempered Glass', supplier: 'Japanese Imports Co.', cost_centavos: 22000, eco: false, status: 'active' },
  { code: 'VES-GL-003', category: 'Glassware', item: 'Beer Glass Pilsner',        size: '14oz',  material: 'Glass',          supplier: 'Japanese Imports Co.', cost_centavos: 15000, eco: false, status: 'active' },
  { code: 'VES-GL-004', category: 'Glassware', item: 'Water Glass',               size: '10oz',  material: 'Glass',          supplier: 'Japanese Imports Co.', cost_centavos: 8000,  eco: false, status: 'active' },
  // Bowls
  { code: 'VES-BW-001', category: 'Bowl', item: 'Ramen Bowl (Large)',             size: '1100ml', material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 45000, eco: false, status: 'active' },
  { code: 'VES-BW-002', category: 'Bowl', item: 'Ramen Bowl (Regular)',           size: '900ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 38000, eco: false, status: 'active' },
  { code: 'VES-BW-003', category: 'Bowl', item: 'Tsukemen Noodle Plate',         size: '250mm',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 35000, eco: false, status: 'active' },
  { code: 'VES-BW-004', category: 'Bowl', item: 'Tsukemen Dipping Bowl',         size: '400ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 28000, eco: false, status: 'active' },
  { code: 'VES-BW-005', category: 'Bowl', item: 'Rice Bowl (Donburi)',           size: '500ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 25000, eco: false, status: 'active' },
  { code: 'VES-BW-006', category: 'Bowl', item: 'Side Dish Bowl',               size: '200ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 12000, eco: false, status: 'active' },
  { code: 'VES-BW-007', category: 'Bowl', item: 'Ice Cream Cup (Ceramic)',      size: '150ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 15000, eco: false, status: 'active' },
  // Plates
  { code: 'VES-PL-001', category: 'Plate', item: 'Gyoza Plate (Rectangular)',    size: '280x150mm', material: 'Ceramic',     supplier: 'Japanese Imports Co.', cost_centavos: 22000, eco: false, status: 'active' },
  { code: 'VES-PL-002', category: 'Plate', item: 'Karaage Plate',               size: '220mm',   material: 'Ceramic',       supplier: 'Japanese Imports Co.', cost_centavos: 18000, eco: false, status: 'active' },
  { code: 'VES-PL-003', category: 'Plate', item: 'Pizza Plate (Wood Board)',    size: '300mm',   material: 'Acacia Wood',   supplier: 'Japanese Imports Co.', cost_centavos: 35000, eco: true,  status: 'active' },
  { code: 'VES-PL-004', category: 'Plate', item: 'Edamame Plate',              size: '180mm',   material: 'Ceramic',       supplier: 'Japanese Imports Co.', cost_centavos: 12000, eco: false, status: 'active' },
  // Containers (Takeout)
  { code: 'VES-CT-001', category: 'Container', item: 'Ramen Takeout Bowl 32oz',  size: '32oz',  material: 'PP Plastic',     supplier: 'Green Pack Solutions', cost_centavos: 1500, eco: false, status: 'active' },
  { code: 'VES-CT-002', category: 'Container', item: 'Ramen Takeout Bowl (Eco)', size: '32oz',  material: 'Bagasse',        supplier: 'Green Pack Solutions', cost_centavos: 2500, eco: true,  status: 'active' },
  { code: 'VES-CT-003', category: 'Container', item: 'Rice Box Container',       size: '24oz',  material: 'Kraft Paper',    supplier: 'Green Pack Solutions', cost_centavos: 1200, eco: true,  status: 'active' },
  { code: 'VES-CT-004', category: 'Container', item: 'Appetizer Container',      size: '16oz',  material: 'PP Plastic',     supplier: 'Packaging Plus',       cost_centavos: 800,  eco: false, status: 'active' },
  { code: 'VES-CT-005', category: 'Container', item: 'Ice Cream Takeout Cup',    size: '8oz',   material: 'Paper',          supplier: 'Packaging Plus',       cost_centavos: 600,  eco: true,  status: 'active' },
  { code: 'VES-CT-006', category: 'Container', item: 'Noodle Separator Cup',     size: '12oz',  material: 'PP Plastic',     supplier: 'Packaging Plus',       cost_centavos: 500,  eco: false, status: 'active' },
  { code: 'VES-CT-007', category: 'Container', item: 'Pizza Box',                size: '12"',   material: 'Corrugated',     supplier: 'Green Pack Solutions', cost_centavos: 2000, eco: true,  status: 'active' },
  // Cups
  { code: 'VES-CU-001', category: 'Cup', item: 'Hot Cup 12oz',                   size: '12oz',  material: 'Paper + PLA',    supplier: 'Cup Masters',          cost_centavos: 700,  eco: true,  status: 'active' },
  { code: 'VES-CU-002', category: 'Cup', item: 'Cold Cup 16oz',                  size: '16oz',  material: 'PET Plastic',    supplier: 'Cup Masters',          cost_centavos: 800,  eco: false, status: 'active' },
  { code: 'VES-CU-003', category: 'Cup', item: 'Cold Cup 22oz',                  size: '22oz',  material: 'PET Plastic',    supplier: 'Cup Masters',          cost_centavos: 1000, eco: false, status: 'active' },
  { code: 'VES-CU-004', category: 'Cup', item: 'Soup Cup 8oz',                   size: '8oz',   material: 'Paper',          supplier: 'Cup Masters',          cost_centavos: 500,  eco: true,  status: 'active' },
  { code: 'VES-CU-005', category: 'Cup', item: 'Karaage Cup (Truck)',            size: '12oz',  material: 'Kraft Paper',    supplier: 'Cup Masters',          cost_centavos: 600,  eco: true,  status: 'active' },
  // Bags
  { code: 'VES-BG-001', category: 'Bag', item: 'Takeout Bag (Small)',            size: 'S',     material: 'Kraft Paper',    supplier: 'Paper Products Inc.',  cost_centavos: 500,  eco: true,  status: 'active' },
  { code: 'VES-BG-002', category: 'Bag', item: 'Takeout Bag (Large)',            size: 'L',     material: 'Kraft Paper',    supplier: 'Paper Products Inc.',  cost_centavos: 800,  eco: true,  status: 'active' },
  { code: 'VES-BG-003', category: 'Bag', item: 'Branded Bag (Premium)',          size: 'M',     material: 'Laminated Paper', supplier: 'Paper Products Inc.', cost_centavos: 2500, eco: false, status: 'active' },
  // Utensils
  { code: 'VES-UT-001', category: 'Utensil', item: 'Chopsticks (Reusable)',      size: '23cm',  material: 'Melamine',       supplier: 'Japanese Imports Co.', cost_centavos: 5000, eco: true,  status: 'active' },
  { code: 'VES-UT-002', category: 'Utensil', item: 'Chopsticks (Disposable)',    size: '21cm',  material: 'Bamboo',         supplier: 'Paper Products Inc.',  cost_centavos: 200,  eco: true,  status: 'active' },
  { code: 'VES-UT-003', category: 'Utensil', item: 'Ramen Spoon (Ceramic)',      size: 'Std',   material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 8000, eco: false, status: 'active' },
  { code: 'VES-UT-004', category: 'Utensil', item: 'Ramen Spoon (Disposable)',   size: 'Std',   material: 'PP Plastic',     supplier: 'Packaging Plus',       cost_centavos: 150,  eco: false, status: 'active' },
  { code: 'VES-UT-005', category: 'Utensil', item: 'Fork/Knife Set (Disposable)', size: 'Std',  material: 'CPLA',           supplier: 'Green Pack Solutions', cost_centavos: 350,  eco: true,  status: 'active' },
  // Sauce Cups
  { code: 'VES-SC-001', category: 'Sauce', item: 'Sauce Dish (Dine-in)',         size: '60ml',  material: 'Ceramic',        supplier: 'Japanese Imports Co.', cost_centavos: 6000, eco: false, status: 'active' },
  { code: 'VES-SC-002', category: 'Sauce', item: 'Sauce Cup (Takeout) 2oz',     size: '2oz',   material: 'PP Plastic',     supplier: 'Packaging Plus',       cost_centavos: 150,  eco: false, status: 'active' },
  { code: 'VES-SC-003', category: 'Sauce', item: 'Sauce Cup (Takeout) 4oz',     size: '4oz',   material: 'PP Plastic',     supplier: 'Packaging Plus',       cost_centavos: 200,  eco: false, status: 'active' },
  // Seals/Wraps
  { code: 'VES-SW-001', category: 'Seal/Wrap', item: 'Cup Seal Film',            size: '95mm',  material: 'PP Film',        supplier: 'Cup Masters',          cost_centavos: 100,  eco: false, status: 'active' },
  { code: 'VES-SW-002', category: 'Seal/Wrap', item: 'Cling Wrap Roll',          size: '300m',  material: 'PVC',            supplier: 'Packaging Plus',       cost_centavos: 25000, eco: false, status: 'active' },
  { code: 'VES-SW-003', category: 'Seal/Wrap', item: 'Tamper-Evident Sticker',   size: '50mm',  material: 'Paper',          supplier: 'Paper Products Inc.',  cost_centavos: 50,   eco: true,  status: 'active' },
  // Accessories
  { code: 'VES-AC-001', category: 'Accessory', item: 'Tray Liner (Branded)',     size: 'A4',    material: 'Paper',          supplier: 'Paper Products Inc.',  cost_centavos: 300,  eco: true,  status: 'active' },
  { code: 'VES-AC-002', category: 'Accessory', item: 'Napkin (Branded)',          size: '1-ply', material: 'Paper',          supplier: 'Paper Products Inc.',  cost_centavos: 100,  eco: true,  status: 'active' },
  { code: 'VES-AC-003', category: 'Accessory', item: 'Wet Towel (Oshibori)',    size: 'Std',   material: 'Cotton',         supplier: 'Japanese Imports Co.', cost_centavos: 1500, eco: true,  status: 'active' },
  { code: 'VES-AC-004', category: 'Accessory', item: 'Toothpick (Bamboo)',      size: '65mm',  material: 'Bamboo',         supplier: 'Paper Products Inc.',  cost_centavos: 30,   eco: true,  status: 'active' },
];

export const KPI_TARGETS = {
  product_bibles_complete: 50,
  recipe_costings_complete: 50,
  plating_cards_posted: 50,
  staff_trained_pct: 80,
  fc_pct_reduction: -2.0,
  waste_pct_of_sales: 2.0,
  unauthorized_subs: 0,
  cost_savings_peso: 300000,
  qc_avg_score: 90,
  items_below_threshold: 0,
  remakes_pct: 1.0,
  time_saved_hours: 15,
};
