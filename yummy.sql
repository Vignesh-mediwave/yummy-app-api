--yummy table

CREATE TABLE recipes
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(256)
);

CREATE TABLE receipe_text
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    receipe INT,
    text TEXT,
    FOREIGN KEY(receipe) REFERENCES recipes(id)

);

INSERT INTO recipes
(id,name)
VALUES
(1,'Chicken Shavarma'),
(2,'beef sharvarma'),
(3,'briyani');

INSERT INTO receipe_text
(id,receipe,text)
VALUES
(1,1,'1.get the chicken\n2.seperate bones from the chicken\n3.add masalas\n4.keep chicken in masala for 4 hours'),
(2,2,'1.get the beef\n2.seperate bones from the beef\n3.add masalas\n4.keep beef in masala for 4 hours'),
(3,3,'1.get the beef\n2.seperate bones from the beef\n3.add masalas\n4.keep beef in masala for 4 hours'),


SELECT recipes.id,recipes.name,receipe_text.text
FROM
recipes
INNER JOIN receipe_text
ON recipes.id = receipe_text.receipe
WHERE recipes.id = 2;

DELETE FROM
receipe_text
WHERE receipe=2;

DELETE FROM
recipes
WHERE id=2;