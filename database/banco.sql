create database gerenc_redes;

use gerenc_redes;

create table devices(
id int auto_increment primary key,
nome varchar(100) not null,
endereco_ip varchar(15) unique not null,
tipo varchar(50) not null,
created_at timestamp default current_timestamp

);

create table tests(
id int auto_increment primary key,
device_id int not null,
status enum('sucesso', 'falha') not null,
latencia decimal(10,2),
timestamp timestamp default current_timestamp,

foreign key (device_id) references devices(id) on delete cascade
);