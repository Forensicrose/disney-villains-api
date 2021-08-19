DROP DATABASE IF EXISTS disneyvillains;
CREATE DATABASE disneyvillains;

DROP USER IF EXISTS 'movieVillains'@'localhost';
CREATE USER 'movieVillains'@'localhost' IDENTIFIED BY '$cary!';

-- Grant our user access to all tables to the database
GRANT ALL PRIVILEGES ON disneyvillains.* to 'movieVillains'@'localhost';
FLUSH PRIVILEGES;

USE disneyvillains;
CREATE TABLE villains (
id INT auto_increment,
name VARCHAR(255),
movie VARCHAR(255),
slug VARCHAR(255),
updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
createdAt DATETIME DEFAULT NOW(),
deletedAt DATETIME,

PRIMARY KEY(id)
);

USE disneyvillains;
INSERT INTO villains (name, movie, slug)
VALUES
('Captain Hook', 'Peter Pan', 'captain-hook'),
('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'),
('Gaston', 'Beauty and the Beast', 'gaston'),
('Hades', 'Hercules', 'hades'),
('Horned King', 'The Black Cauldron', 'horned-king'),
('Jafar', 'Aladdin', 'jafar'),
('Lady Tremaine', 'Cinderella', 'lady-tremaine'),
('Madame Medusa', 'The Rescuers', 'madame-medusa'),
('Madam Mim', 'The Sword in the Stone', 'madam-mim'),
('Maleficent', 'Sleeping Beauty', 'maleficent'),
('Prince John', 'Robin Hood', 'prince-john'),
('Sir Hiss', 'Robin Hood', 'sir-hiss'),
('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'),
('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'),
('Scar', 'The Lion King', 'scar'),
('Shan Yu', 'Mulan', 'shan-yu'),
('Shere Khan', 'The Jungle Book', 'shere-khan'),
('Ursula', 'The Little Mermaid', 'ursula');

SELECT * FROM villains;


