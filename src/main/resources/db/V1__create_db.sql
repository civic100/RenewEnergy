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
CREATE TABLE IF NOT EXISTS solarpanels (
    id_solarpanel INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    nominalpower FLOAT NOT NULL,
    efficiency FLOAT NOT NULL,
    celltype VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    is_disabled BOOLEAN DEFAULT 0
);

-- Table of contribution plans
CREATE TABLE contributionplans (
    id_contributionplan INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
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
CREATE TABLE projectsolarpanels (
    id_project INTEGER UNSIGNED,
    id_solarpanel INTEGER UNSIGNED,
    PRIMARY KEY (id_project, id_solarpanel),
    FOREIGN KEY (id_project) REFERENCES projects(id_project),
    FOREIGN KEY (id_solarpanel) REFERENCES solarpanels(id_solarpanel)
);

-- Relationship table between users and projects
CREATE TABLE userprojects (
    id_user INTEGER UNSIGNED,
    id_project INTEGER UNSIGNED,
    contribution_plan_id INTEGER UNSIGNED,
    PRIMARY KEY (id_user, id_project),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_project) REFERENCES projects(id_project),
    FOREIGN KEY (contribution_plan_id) REFERENCES contributionplans(id_contributionplan)
);

-- Carbon and energy footprint table
CREATE TABLE energyfootprint (
    id_energyfootprint INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_solarpanel INTEGER UNSIGNED,
    id_user INTEGER UNSIGNED,
    id_project INTEGER UNSIGNED,
    date DATE,
    carbonfootprint FLOAT,
    generatedenergy FLOAT,
    is_disabled BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_solarpanel) REFERENCES solarpanels(id_solarpanel),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_project) REFERENCES projects(id_project)
);

-- Administrators table
CREATE TABLE admin (
    id_admin INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);
