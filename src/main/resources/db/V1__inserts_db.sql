
-- Insertar usuarios
INSERT INTO users (name, email, password, user_type, image_url, is_disabled)
VALUES
    ('John Doe', 'john.doe@example.com', 'password123', 'normal', 'user1.jpg', 1),
    ('Jane Smith', 'jane.smith@example.com', 'password456', 'normal', 'user2.jpg', 1),
    ('Bob Johnson', 'bob.johnson@example.com', 'password789', 'normal', 'user3.jpg', 1),
    ('Alice Brown', 'alice.brown@example.com', 'passwordabc', 'normal', 'user4.jpg', 1),
    ('Charlie Davis', 'charlie.davis@example.com', 'passworddef', 'normal', 'user5.jpg', 1),
    ('Tech Innovators Inc', 'info@techinnovators.com', 'company123', 'company', 'company_logo1.jpg', 1),
    ('Global Solutions Co', 'info@globalsolutions.com', 'company456', 'company', 'company_logo2.jpg', 1),
    ('Future Enterprises Ltd', 'info@futureenterprises.com', 'company789', 'company', 'company_logo3.jpg', 1),
    ('Eco Solutions Corp', 'info@ecosolutions.com', 'companyabc', 'company', 'company_logo4.jpg', 1),
    ('Infinite Innovations Ltd', 'info@infiniteinnovations.com', 'companydef', 'company', 'company_logo5.jpg', 1);

-- Insertar empresas y asociarlas con el usuario de tipo 'company'
INSERT INTO companies (id_user, company_name, website, image_url, is_disabled)
VALUES
    (6, 'Tech Innovators Inc.', 'http://company-a.com',  'company_logo1.jpg', 1),
    (7, 'Global Solutions Co.', 'http://company-b.com', 'company_logo2.jpg', 1),
    (8, 'Future Enterprises Ltd.', 'http://company-c.com', 'company_logo3.jpg', 1),
    (9, 'Eco Solutions Corp.', 'http://company-d.com', 'company_logo4.jpg', 1),
    (10, 'Infinite Innovations Ltd.', 'http://company-e.com', 'company_logo5.jpg', 1);

-- Insert solar panels
INSERT INTO solarpanels (model, manufacturer, nominalpower, efficiency, celltype, image_url, is_disabled)
VALUES
    ('JINKO JKM340M-60H', 'Manufacturer A', 120, 0.26, 'Monocrystalline', 'panel_image1.jpg', 1),
    ('JA SOLAR JAM60S10', 'Manufacturer B', 150, 0.28, 'Monocrystalline ', 'panel_image2.jpg', 1),
    ('SHARP NU-JC330', 'Manufacturer B', 160, 0.29, 'Monocrystalline PERC', 'panel_image3.jpg', 1),
    ('LONGI SOLAR LR4', 'Manufacturer B', 180, 0.30, 'Monocrystalline silicon', 'panel_image4.jpg', 1),
    ('TRINA SOLAR TSM', 'Manufacturer B', 180, 0.31, 'Monocrystalline PERC', 'panel_image5.jpg', 1),
    ('CANADIAN SOLAR 375', 'Manufacturer B', 130, 30, 'Monocrystalline', 'panel_image6.jpg', 1),
    ('TRINA SOLAR', 'Manufacturer B', 150, 0.29, 'Monocrystalline silicon', 'panel_image7.jpg', 1),
    ('JINKO TIGER PRO ', 'Manufacturer B', 160, 0.27, 'Monocrystalline PERCn', 'panel_image8.jpg', 1),
    ('SOLAR JAM54S31', 'Manufacturer B', 150, 0.30, 'Monocrystalline silicon', 'panel_image9.jpg', 1);


-- Insert projects
-- Insertar datos de proyectos para pueblos de España
INSERT INTO projects (description, geographic_area, coordinates, village_name, image_url, is_disabled)
VALUES
    ('Restauración de la Plaza Mayor', 'Castilla y León', '40.8628, -6.3896', 'Salamanca', 'village1.jpg', 1),
    ('Iniciativa de Limpieza Ambiental', 'Andalucía', '36.5445, -4.6250', 'Mijas', 'village2.jpg', 1),
    ('Proyecto de Jardín Comunitario', 'Comunidad Valenciana', '39.4699, -0.3763', 'Altea', 'village3.jpg', 1),
    ('Preservación Histórica', 'Galicia', '42.5751, -8.1339', 'Santiago de Compostela', 'village4.jpg', 1),
    ('Plan de Mejora de Infraestructuras', 'Cataluña', '41.3851, 2.1734', 'Girona', 'village5.jpg', 1),
    ('Recuperación de Espacios Públicos', 'Extremadura', '39.4750, -6.3728', 'Trujillo', 'village6.jpg', 1),
    ('Desarrollo Sostenible en la Sierra', 'Castilla-La Mancha', '39.3376, -4.0055', 'Cuenca', 'village7.jpg', 1),
    ('Promoción del Turismo Rural', 'Aragón', '42.6481, -0.8633', 'Aínsa', 'village8.jpg', 1),
    ('Proyecto Cultural en el Casco Antiguo', 'Islas Canarias', '28.3852, -16.1806', 'La Laguna', 'village9.jpg', 1),
    ('Revitalización del Centro Histórico', 'Asturias', '43.3623, -5.8456', 'Oviedo', 'village10.jpg', 1);

-- Insert relationship between projects and solar panels
INSERT INTO projectsolarpanels (id_project, id_solarpanel)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (3, 4),
    (4, 4),
    (4, 7),
    (5, 5),
    (5, 6),
    (6, 6),
    (6, 2),
    (7, 2),
    (7, 7),
    (8,2),
    (8, 5),
    (9, 9),
    (9, 6),
    (10, 2),
    (10, 3);
-- Insert contribution plans
INSERT INTO contributionplans (plan_name, amount, frequency)
VALUES
    ('Monthly Plan', 50, 'monthly'),
    ('Monthly Plan', 100, 'monthly'),
    ('Monthly Plan', 75, 'monthly');

-- Insert relationship between users and projects
INSERT INTO userprojects (id_user, id_project, contribution_plan_id)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (2, 2, 2),
    (2, 3, 3),
    (3, 3, 3),
    (3, 4, 1),
    (4, 4, 1),
    (4, 5, 2),
    (5, 5, 2),
    (5, 6, 3),
    (6, 6, 3),
    (6, 1, 1); 

-- Insert energy footprint
INSERT INTO energyfootprint (id_solarpanel, id_user, id_project, date, carbonfootprint, generatedenergy, is_disabled)
VALUES
    (1, 1, 1, '2023-01-01', 10.5, 200, 0),
    (2, 2, 2, '2023-02-01', 8.2, 150, 0),
    (3, 3, 3, '2023-03-01', 12.0, 220, 0),
    (4, 4, 4, '2023-04-01', 15.5, 300, 0),
    (5, 5, 5, '2023-05-01', 18.2, 250, 0),
    (6, 6, 6, '2023-06-01', 20.0, 350, 0),
    (7, 7, 7, '2023-07-01', 22.5, 400, 0),
    (8, 8, 8, '2023-08-01', 25.2, 450, 0),
    (6, 9, 9, '2023-09-01', 28.0, 500, 0),
    (7, 10, 10, '2023-10-01', 30.5, 550, 0),
    (1, 2, 1, '2023-01-15', 8.0, 180, 0),
    (2, 3, 2, '2023-02-15', 9.5, 160, 0),
    (3, 4, 3, '2023-03-15', 11.8, 240, 0),
    (4, 5, 4, '2023-04-15', 14.2, 280, 0),
    (5, 6, 5, '2023-05-15', 16.7, 320, 0),
    (6, 1, 6, '2023-06-15', 19.1, 380, 0),
    (7, 2, 7, '2023-07-15', 21.5, 420, 0),
    (8, 3, 8, '2023-08-15', 23.8, 460, 0),
    (6, 4, 9, '2023-09-15', 26.0, 500, 0),
    (7, 5, 10, '2023-10-15', 28.3, 540, 0);
    
-- Insert administrator
INSERT INTO admin (password)
VALUES
    ('admin123');
