CREATE DATABASE IF NOT EXISTS node_bot_for_whatsapp;

USE node_bot_for_whatsapp

CREATE TABLE IF NOT EXISTS users(
    Id INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY(Id)
);
