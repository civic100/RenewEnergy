
-- Insertar usuarios
INSERT INTO users (name, email, password, user_type, image_url, is_disabled)
VALUES
    ('Normal User', 'user@example.com', 'password123', 'normal', 'image1.jpg', 0),
    ('Company 1', 'company@1.com', 'password456', 'company', 'image2.jpg', 0),
    ('Company 2', 'company@2.com', 'password456', 'company', 'image3.jpg', 0);


-- Insertar empresas y asociarlas con el usuario de tipo 'company'
INSERT INTO companies (id_user, company_name, website, image_url, is_disabled)
VALUES
    (2, 'Company A', 'http://company-a.com', 'company_image_a.jpg', 0),
    (3, 'Company B', 'http://company-b.com', 'company_image_b.jpg', 0);


-- Insert solar panels
INSERT INTO solarpanels (model, manufacturer, nominalpower, efficiency, celltype, image_url, is_disabled)
VALUES
    ('Solar Panel 1', 'Manufacturer A', 100, 0.18, 'Type A', 'panel_image1.jpg', 0),
    ('Solar Panel 2', 'Manufacturer B', 150, 0.20, 'Type B', 'panel_image2.jpg', 0);

-- Insert projects
INSERT INTO projects (description, geographic_area, coordinates, village_name, image_url, is_disabled)
VALUES
    ('Es un pequeño pueblo ubicado en la comunidad autónoma de Castilla y León', 'Soria', '40.7128,-74.0060', 'Villaflor de las Encinas', 'project_image1.jpg', 0),
    ('Es un pequeño pueblo situado en la comunidad autónoma de Castilla y León', 'Burgos', '34.0522,-118.2437', 'Castrillo del Val', 'project_image2.jpg', 0);

-- Insert relationship between projects and solar panels
INSERT INTO projectsolarpanels (id_project, id_solarpanel)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2);

-- Insert contribution plans
INSERT INTO contributionplans (plan_name, amount, frequency)
VALUES
    ('Monthly Plan', 50.0, 'monthly'),
    ('Annual Plan', 500.0, 'annual');

-- Insert relationship between users and projects
INSERT INTO userprojects (id_user, id_project, contribution_plan_id)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (2, 1, 1),
    (2, 2, 2);

-- Insert energy footprint
INSERT INTO energyfootprint (id_solarpanel, id_user, id_project, date, carbonfootprint, generatedenergy, is_disabled)
VALUES
    (1, 1, 1, '2022-01-01', 10.5, 200.3, 0),
    (1, 1, 2, '2023-01-01', 13, 400.4, 0),
    (2, 1, 1, '2023-01-01', 23.5, 100.3, 0),
    (2, 1, 2, '2024-01-01', 5, 20, 0),

    (1, 2, 1, '2022-01-02', 15.2, 250.1, 0),
    (1, 2, 2, '2022-01-02', 30, 500, 0),
    (2, 2, 1, '2023-01-02', 42, 137.7, 0),
    (2, 2, 2, '2024-01-02', 4, 59.2, 0);
    
-- Insert administrator
INSERT INTO admin (password)
VALUES
    ('admin123');
