-- Insert users
INSERT INTO users (name, email, password, user_type, image_url, is_disabled)
VALUES
    ('Normal User', 'user@example.com', 'password123', 'normal', 'image1.jpg', 0),
    ('Company XYZ', 'company@xyz.com', 'password456', 'company', 'image2.jpg', 0);

-- Get the user_id of the user of type 'company'
SET @companyUserId = (SELECT id_user FROM users WHERE user_type = 'company' LIMIT 1);

-- Insert companies and associate them with the user of type 'company'
INSERT INTO companies (id_user, company_name, website, image_url)
VALUES
    (@companyUserId, 'Company A', 'http://company-a.com', 'company_image_a.jpg'),
    (@companyUserId, 'Company B', 'http://company-b.com', 'company_image_b.jpg');

-- Insert solar panels
INSERT INTO solarPanels (model, manufacturer, nominalPower, efficiency, cellType, image_url, is_disabled)
VALUES
    ('Solar Panel 1', 'Manufacturer A', 100, 0.18, 'Type A', 'panel_image1.jpg', 0),
    ('Solar Panel 2', 'Manufacturer B', 150, 0.20, 'Type B', 'panel_image2.jpg', 0);

-- Insert projects
INSERT INTO projects (description, geographic_area, coordinates, village_name, image_url, is_disabled)
VALUES
    ('Project 1', 'Area 1', '40.7128,-74.0060', 'Village 1', 'project_image1.jpg', 0),
    ('Project 2', 'Area 2', '34.0522,-118.2437', 'Village 2', 'project_image2.jpg', 0);

-- Insert relationship between projects and solar panels
INSERT INTO projectSolarPanels (id_project, id_solarPanel)
VALUES
    (1, 1),
    (1, 2),
    (2, 2);

-- Insert contribution plans
INSERT INTO contributionPlans (plan_name, amount, frequency)
VALUES
    ('Monthly Plan', 50.0, 'monthly'),
    ('Annual Plan', 500.0, 'annual');

-- Insert relationship between users and projects
INSERT INTO userProjects (id_user, id_project, contribution_plan_id)
VALUES
    (1, 1, 1),
    (2, 2, 2);

-- Insert energy footprint
INSERT INTO energyFootprint (id_solarPanel, id_user, id_project, date, carbonFootprint, generatedEnergy, is_disabled)
VALUES
    (1, 1, 1, '2023-01-01', 10.5, 200.3, 0),
    (2, 2, 2, '2023-01-02', 15.2, 250.1, 0);

-- Insert administrator
INSERT INTO Admin (password)
VALUES
    ('admin123');
