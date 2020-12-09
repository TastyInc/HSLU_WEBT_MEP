create database webtlso;

use webtlso;

create table Players (
    ID int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Username varchar(20) NOT NULL,
    Password varchar(255) NOT NULL,
    Highscore int NOT NULL
);

insert into Players (Username, Password, Highscore) values ('TheLegend27', 'TEST', 198374);
insert into Players (Username, Password, Highscore) values ('lucasommer', 'TEST', 958);