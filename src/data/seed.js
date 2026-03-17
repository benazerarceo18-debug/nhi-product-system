/**
 * NHI Product System — Seed Data
 * Source: COMPLETE_Product_System_ALL_APPENDICES.xlsx
 * Foundation Year 2026, Version 1.0
 */

export const BRANDS = ['kazu_cafe', 'mendokoro', 'yushoken', 'kazunori'];

export const BRAND_LABELS = {
  kazu_cafe:  'Kazu Café',
  mendokoro:  'Mendokoro',
  yushoken:   'Yushoken',
  kazunori:   'Kazunori',
};

export const BRAND_SKU_TARGETS = {
  kazu_cafe: 13,
  mendokoro: 15,
  yushoken:  12,
  kazunori:  10,
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
