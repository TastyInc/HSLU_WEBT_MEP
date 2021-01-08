create database webtlso;

use webtlso;

create table players (
    ID int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Username varchar(20) NOT NULL,
    Password varchar(255) NOT NULL,
    Highscore int NOT NULL
);

insert into players (Username, Password, Highscore) values ('TheLegend27', '63bf8b07ceb593b7b8f57b8e1869ba3c', 74999);
insert into players (Username, Password, Highscore) values ('lucasommer', '38878f252eda4537621760da463d865e', 16816);
insert into players (Username, Password, Highscore) values ('TestUser', 'cae615db79ce91fcc8ec202aa4daf8b1', 1818);