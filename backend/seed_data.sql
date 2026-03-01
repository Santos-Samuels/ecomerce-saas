-- Habilita extensão para UUID se necessário (geralmente já vem no Postgres 13+)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

INSERT INTO "public"."Role" 
("id", "name", "permissions", "active", "createdAt", "updatedAt") 
VALUES 
('1cebf168-d09a-4597-aa4a-0b941cab1d45', 'staff', ARRAY[]::text[], 'true', '2026-01-15 14:17:20.611', '2026-01-15 14:17:20.611'),
('573560ee-5d89-4151-a8ca-c4d70627703e', 'customer', ARRAY[]::text[], 'true', '2026-01-15 14:17:53.923', '2026-01-15 14:17:53.923'),
('fc23ca95-b948-4f99-b4f8-1d7596ede1d2', 'admin', ARRAY[]::text[], 'true', '2026-01-15 14:17:09.899', '2026-01-15 14:17:09.899');

INSERT INTO "public"."User" ("id", "storeId", "roleId", "name", "email", "passwordHash", "phone", "address", "active", "createdAt", "updatedAt", "deletedAt") VALUES ('637bcbee-421f-4086-a222-ff0ce2ff1c3d', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'fc23ca95-b948-4f99-b4f8-1d7596ede1d2', 'Primary Admin', 'primary_admin@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '75998578488', null, 'true', '2026-01-15 23:30:04.431', '2026-01-15 23:30:04.431', null), ('b85cb325-a152-40b7-814c-20ecfd46e350', '74f847f8-b8de-4569-976b-efcc18dcd11f', '1cebf168-d09a-4597-aa4a-0b941cab1d45', 'Primary Staff', 'santossamuelplus@gmail.com', '34d9d298f4c2ddf38ddc86c191523e511e34d539e574dee8d5dfbd418f005f50', '75998578488', null, 'true', '2026-01-15 14:35:01.724', '2026-01-15 14:35:01.724', null);

-- 1. Criar Loja (Se não existir)
-- ID fixo para facilitar relacionamentos no script
INSERT INTO "Store" (id, name, description, phone, email, subdomain, "logoUrl", "primaryColor", "active", "createdAt", "updatedAt")
VALUES (
    '74f847f8-b8de-4569-976b-efcc18dcd11f', 
    'AutoParts Pro', 
    'Especialistas em performance e estética automotiva', 
    '11999999999', 
    'contato@autopartspro.com', 
    'primarystore', 
    'https://cdn-icons-png.flaticon.com/512/741/741407.png', 
    '#228be6', 
    true, 
    NOW(), 
    NOW()
)
ON CONFLICT (subdomain) DO UPDATE SET active = true, "logoUrl" = 'https://cdn-icons-png.flaticon.com/512/741/741407.png';


INSERT INTO "public"."StoreLayout" ("id", "storeId", "heroTitle", "heroSubtitle", "heroButtonText", "heroButtonLink", "heroBackgroundImage", "aboutTitle", "aboutDescription", "aboutImage", "showFeedbacks", "createdAt", "updatedAt") VALUES ('5cf94be7-ab27-48b7-9af8-dbff5c04fca7', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Modernidade e Estilo', 'Descubra as tendências que vão transformar o seu visual.', 'Ver Coleção', '/produtos', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop', 'Nossa História', 'Fundada com a missão de entregar qualidade e sofisticação, nossa loja se dedica a selecionar os melhores produtos para você. Acreditamos que cada detalhe importa.', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2670&auto=format&fit=crop', 'true', '2026-01-20 01:20:50.231', '2026-01-20 01:20:50.231');
-- Armazenar ID da loja em variável (conceitual, no script usaremos o ID fixo acima)
-- Store ID: 74f847f8-b8de-4569-976b-efcc18dcd11f

-- 2. Criar Categorias
INSERT INTO "ProductCategory" (id, "storeId", name, slug, description, active, "createdAt", "updatedAt")
VALUES 
('cat-1', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Performance', 'performance', 'Peças para aumento de potência e dirigibilidade', true, NOW(), NOW()),
('cat-2', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Estética Interior', 'estetica-interior', 'Acessórios para o interior do veículo', true, NOW(), NOW()),
('cat-3', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Iluminação', 'iluminacao', 'Lâmpadas, LEDs e faróis', true, NOW(), NOW()),
('cat-4', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Rodas e Pneus', 'rodas-pneus', 'Rodas esportivas e pneus de alta performance', true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO NOTHING;

-- 3. Criar Materiais
INSERT INTO "ProductMaterial" (id, "storeId", name, description, "colorName", "colorHex", active, "createdAt", "updatedAt")
VALUES
('mat-1', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Fibra de Carbono', 'Material leve e resistente', 'Preto Carbono', '#1a1a1a', true, NOW(), NOW()),
('mat-2', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Alumínio Anodizado', 'Acabamento premium e durável', 'Azul Metálico', '#228be6', true, NOW(), NOW()),
('mat-3', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Couro Legítimo', 'Conforto e sofisticação', 'Couro Preto', '#000000', true, NOW(), NOW()),
('mat-4', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Aço Inox', 'Resistência à corrosão', 'Prata', '#e9ecef', true, NOW(), NOW())
ON CONFLICT ("storeId", name) DO NOTHING;

-- 4. Criar Veículos
INSERT INTO "Vehicle" (id, make, model, year, type, active, "createdAt", "updatedAt")
VALUES
('vec-1', 'Honda', 'Civic Si', 2022, 'Sedan', true, NOW(), NOW()),
('vec-2', 'Volkswagen', 'Golf GTI', 2023, 'Hatchback', true, NOW(), NOW()),
('vec-3', 'Toyota', 'Corolla GR', 2024, 'Hatchback', true, NOW(), NOW()),
('vec-4', 'Universal', 'Todos', 2024, 'Universal', true, NOW(), NOW());

-- 5. Criar Produtos (6 itens)

-- Produto 1: Filtro Esportivo (Performance / Fibra de Carbono / Civic & Golf)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-1', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Kit Admissão de Ar Cold Air Intake', 'kit-admissao-cold-air', 'Aumente a potência do seu motor com nosso kit de admissão de ar frio em fibra de carbono. Melhora o fluxo de ar e o som do motor.', 1299.90, 1150.00, 15, false, 'CAI-001', ARRAY['https://images.unsplash.com/photo-1626071493738-422839956637?q=80&w=800&auto=format&fit=crop'], 'cat-1', 'mat-1', true, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1626071493738-422839956637?q=80&w=800&auto=format&fit=crop'];

-- Produto 2: Manopla de Câmbio (Estética / Alumínio / Universal)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-2', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Manopla de Câmbio Esportiva', 'manopla-cambio-esportiva', 'Manopla universal em alumínio anodizado. Pegada ergonômica e visual racing para seu interior.', 189.90, NULL, 50, false, 'SK-002', ARRAY['https://images.unsplash.com/photo-1597042578331-5079a499d342?q=80&w=800&auto=format&fit=crop'], 'cat-2', 'mat-2', false, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1597042578331-5079a499d342?q=80&w=800&auto=format&fit=crop'];

-- Produto 3: Volante Esportivo (Estética / Couro / Universal)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-3', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Volante Lotse R-GT', 'volante-lotse-r-gt', 'Volante esportivo revestido em couro legítimo com costura vermelha. Estrutura em alumínio aliviado.', 650.00, 599.90, 8, false, 'VOL-003', ARRAY['https://images.unsplash.com/photo-1576722839602-53b708d515a4?q=80&w=800&auto=format&fit=crop'], 'cat-2', 'mat-3', true, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1576722839602-53b708d515a4?q=80&w=800&auto=format&fit=crop'];

-- Produto 4: Kit LED Premium (Iluminação / Universal)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-4', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Kit Lâmpadas LED Ultra White', 'kit-led-ultra-white', 'Iluminação branca pura 6000K. Maior visibilidade e segurança noturna. Compatível com a maioria dos veículos.', 220.00, NULL, 100, true, 'LED-004', ARRAY['https://images.unsplash.com/photo-1552158027-2c676d05f317?q=80&w=800&auto=format&fit=crop'], 'cat-3', NULL, false, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1552158027-2c676d05f317?q=80&w=800&auto=format&fit=crop'];

-- Produto 5: Escapamento Inox (Performance / Aço Inox / Golf GTI)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-5', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Catback Inox 3 Polegadas', 'catback-inox-3pol', 'Sistema de escapamento completo em aço inox 304. Ronco encorpado e ganho de potência real.', 3500.00, 3200.00, 3, false, 'EXH-005', ARRAY['https://images.unsplash.com/photo-1598205423689-0268884964e0?q=80&w=800&auto=format&fit=crop'], 'cat-1', 'mat-4', true, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1598205423689-0268884964e0?q=80&w=800&auto=format&fit=crop'];

-- Produto 6: Rodas Forjadas 18" (Rodas / Alumínio / Corolla & Civic)
INSERT INTO "Product" (id, "storeId", name, slug, description, price, "promotionalPrice", stock, "infiniteStock", sku, images, "categoryId", "materialId", featured, active, "createdAt", "updatedAt")
VALUES
('prod-6', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Jogo de Rodas Racing 18"', 'jogo-rodas-racing-18', 'Rodas leves de alta resistência. Design moderno multi-raios. Acabamento bronze fosco.', 4800.00, NULL, 2, false, 'WHL-006', ARRAY['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'], 'cat-4', 'mat-2', true, true, NOW(), NOW())
ON CONFLICT ("storeId", slug) DO UPDATE SET images = ARRAY['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'];


-- 6. Vincular Produtos aos Veículos (Tabela _ProductVehicles)
-- "A" é Product ID, "B" é Vehicle ID
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-1', 'vec-1') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-1', 'vec-2') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-2', 'vec-4') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-3', 'vec-4') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-4', 'vec-4') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-5', 'vec-2') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-6', 'vec-3') ON CONFLICT DO NOTHING;
INSERT INTO "_ProductVehicles" ("A", "B") VALUES ('prod-6', 'vec-1') ON CONFLICT DO NOTHING;

-- 7. Inserir Layout da Loja (Opcional, mas bom para a home ficar bonita)
INSERT INTO "StoreLayout" ("id", "storeId", "heroTitle", "heroSubtitle", "heroButtonText", "heroButtonLink", "heroBackgroundImage", "aboutTitle", "aboutDescription", "aboutImage", "showFeedbacks", "createdAt", "updatedAt")
VALUES
('layout-1', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Performance Elevada', 'As melhores peças para transformar seu projeto em realidade', 'Ver Produtos', '/products', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop', 'Sobre a AutoParts', 'Nascemos da paixão por carros e velocidade. Nossa missão é entregar apenas os melhores componentes para entusiastas automotivos.', 'https://images.unsplash.com/photo-1486262715619-01b80250e0dc?q=80&w=800&auto=format&fit=crop', true, NOW(), NOW())
ON CONFLICT ("storeId") DO NOTHING;

-- 8. Inserir Feedbacks (Para teste)
INSERT INTO "StoreFeedback" ("id", "storeId", "customerName", "comment", "stars", "active", "createdAt", "updatedAt")
VALUES
('fb-1', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Carlos Silva', 'Atendimento excelente e entrega super rápida. O kit intake mudou meu carro!', 5, true, NOW(), NOW()),
('fb-2', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Mariana Souza', 'A qualidade das rodas é impressionante. Recomendo a todos.', 5, true, NOW(), NOW()),
('fb-3', '74f847f8-b8de-4569-976b-efcc18dcd11f', 'Pedro Henrique', 'Preço justo e produtos originais. Voltarei a comprar.', 4, true, NOW(), NOW());

COMMIT;
