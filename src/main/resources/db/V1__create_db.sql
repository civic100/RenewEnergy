-- Delete the database if it exists and create a new schema
DROP DATABASE IF EXISTS db_renewEnergy;
CREATE DATABASE IF NOT EXISTS db_renewEnergy;
USE db_renewEnergy;

-- User table
CREATE TABLE IF NOT EXISTS users (
    id_user INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('normal', 'company') NOT NULL,
    image_url VARCHAR(255),
    is_disabled BOOLEAN DEFAULT 0
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id_company INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_user INTEGER UNSIGNED,
    company_name VARCHAR(50) NOT NULL,
    website VARCHAR(100),
    image_url VARCHAR(255),
    is_disabled BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Solar panel table
CREATE TABLE IF NOT EXISTS solarPanels (
    id_solarPanel INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    nominalPower FLOAT NOT NULL,
    efficiency FLOAT NOT NULL,
    cellType VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    is_disabled BOOLEAN DEFAULT 0
);

-- Table of contribution plans
CREATE TABLE contributionPlans (
    id_contributionPlan INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,
    frequency ENUM('weekly', 'monthly', 'annual') NOT NULL 
);

-- Project table
CREATE TABLE IF NOT EXISTS projects (
    id_project INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    geographic_area VARCHAR(50) NOT NULL,
    coordinates VARCHAR(255),
    village_name VARCHAR(50),
    image_url VARCHAR(255),
    is_disabled BOOLEAN DEFAULT 0
);

-- Relationship table between projects and solar panels
CREATE TABLE projectSolarPanels (
    id_project INTEGER UNSIGNED,
    id_solarPanel INTEGER UNSIGNED,
    PRIMARY KEY (id_project, id_solarPanel),
    FOREIGN KEY (id_project) REFERENCES projects(id_project),
    FOREIGN KEY (id_solarPanel) REFERENCES solarPanels(id_solarPanel)
);

-- Relationship table between users and projects
CREATE TABLE userProjects (
    id_user INTEGER UNSIGNED,
    id_project INTEGER UNSIGNED,
    contribution_plan_id INTEGER UNSIGNED,
    PRIMARY KEY (id_user, id_project),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_project) REFERENCES projects(id_project),
    FOREIGN KEY (contribution_plan_id) REFERENCES contributionPlans(id_contributionPlan)
);

-- Carbon and energy footprint table
CREATE TABLE energyFootprint (
    id_energyFootprint INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_solarPanel INTEGER UNSIGNED,
    id_user INTEGER UNSIGNED,
    id_project INTEGER UNSIGNED,
    date DATE,
    carbonFootprint FLOAT,
    generatedEnergy FLOAT,
    is_disabled BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_solarPanel) REFERENCES solarPanels(id_solarPanel),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_project) REFERENCES projects(id_project)
);

-- Administrators table
CREATE TABLE Admin (
    id_admin INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

