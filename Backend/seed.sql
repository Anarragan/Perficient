-- Seed script for PostgreSQL
-- Run this script in your PostgreSQL database

-- Insert Users (password is hashed 'password123')
INSERT INTO users (id, name, email, password, phone, cc, url_photo) VALUES
('8a2a4d8c-23d4-4c3f-a52a-5ac0d101f514', 'Ana', 'ana@mars.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, NULL),
('a20fc84c-3505-4d48-ab7c-4ea47103fe43', 'John Doe', 'john.doe@mars.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890', '123456789', 'https://www.univision.com/_next/image?url=https%3A%2F%2Fst1.uvnimg.com%2Fb2%2F3d%2F0275cd1e4812a2f8b3d624b15783%2Fd9lvjtpvuaajtg.jpeg&w=1280&q=75'),
('058c7ecd-48e5-4cc3-a1ef-5817be89602a', 'Juan Pérez', 'juan@mars.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '123456789', '1234567890', 'https://example.com/photo.jpg'),
('fccd900a-56a5-4d40-8c0d-da1e2cd631b4', 'Juan Pérez', 'juan2@mars.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '123456789', '12345678901', 'https://example.com/photo.jpg')
ON CONFLICT (id) DO NOTHING;

-- Insert Maps
INSERT INTO maps (id, url, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'https://mars.nasa.gov/system/resources/detail_files/25087_PIA24428-1200w.jpg', 'Mars surface map from NASA'),
('550e8400-e29b-41d4-a716-446655440001', 'https://www.nasa.gov/wp-content/uploads/2021/02/mars-globe-valles-marineris-enhanced-release.jpg', 'Valles Marineris on Mars'),
('550e8400-e29b-41d4-a716-446655440002', 'https://science.nasa.gov/missions/hubble/hubble-views-martian-moon-phobos/', 'Phobos moon of Mars'),
('550e8400-e29b-41d4-a716-446655440003', 'https://www.jpl.nasa.gov/images/pia24484-the-martian-moon-deimos/', 'Deimos moon of Mars')
ON CONFLICT (id) DO NOTHING;

-- Insert Resources
INSERT INTO resources (id, name, description, quantity, id_user) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'Oxygen', 'Essential gas for breathing on Mars', 1000, '8a2a4d8c-23d4-4c3f-a52a-5ac0d101f514'),
('550e8400-e29b-41d4-a716-446655440005', 'Water', 'Vital liquid for survival and hydration', 500, 'a20fc84c-3505-4d48-ab7c-4ea47103fe43'),
('550e8400-e29b-41d4-a716-446655440006', 'Food', 'Nutrients and supplies for sustenance', 2000, '058c7ecd-48e5-4cc3-a1ef-5817be89602a'),
('550e8400-e29b-41d4-a716-446655440007', 'Suit Durability', 'Materials to maintain spacesuit integrity', 300, 'fccd900a-56a5-4d40-8c0d-da1e2cd631b4')
ON CONFLICT (id) DO NOTHING;

-- Insert Storage
INSERT INTO storage (id, type, lowlimit, highlimit) VALUES
('550e8400-e29b-41d4-a716-446655440008', 'Warehouse', 0, 10000),
('550e8400-e29b-41d4-a716-446655440009', 'Rover Storage', 0, 500),
('550e8400-e29b-41d4-a716-446655440010', 'Habitat Storage', 0, 2000),
('550e8400-e29b-41d4-a716-446655440011', 'Mining Site', 0, 3000)
ON CONFLICT (id) DO NOTHING;

-- Insert StorageResources
INSERT INTO storage_resources (id_storage, id_resource) VALUES
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440005'),
('550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440006'),
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440007'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440005')
ON CONFLICT (id_storage, id_resource) DO NOTHING;

-- Insert Vehicle Types
INSERT INTO vehicle_type (id, name, description) VALUES
('550e8400-e29b-41d4-a716-446655440012', 'Rover', 'Wheeled vehicle for surface exploration'),
('550e8400-e29b-41d4-a716-446655440013', 'Lander', 'Vehicle for landing and deploying equipment'),
('550e8400-e29b-41d4-a716-446655440014', 'Orbiter', 'Satellite orbiting Mars'),
('550e8400-e29b-41d4-a716-446655440015', 'Drone', 'Aerial drone for scouting')
ON CONFLICT (id) DO NOTHING;

-- Insert Vehicles
INSERT INTO vehicles (id, capacidad, id_type, id_user) VALUES
('550e8400-e29b-41d4-a716-446655440016', 100, '550e8400-e29b-41d4-a716-446655440012', '8a2a4d8c-23d4-4c3f-a52a-5ac0d101f514'),
('550e8400-e29b-41d4-a716-446655440017', 200, '550e8400-e29b-41d4-a716-446655440013', 'a20fc84c-3505-4d48-ab7c-4ea47103fe43'),
('550e8400-e29b-41d4-a716-446655440018', 50, '550e8400-e29b-41d4-a716-446655440014', '058c7ecd-48e5-4cc3-a1ef-5817be89602a'),
('550e8400-e29b-41d4-a716-446655440019', 20, '550e8400-e29b-41d4-a716-446655440015', 'fccd900a-56a5-4d40-8c0d-da1e2cd631b4')
ON CONFLICT (id) DO NOTHING;