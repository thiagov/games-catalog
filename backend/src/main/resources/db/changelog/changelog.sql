-- liquibase formatted sql

-- changeset thiagov:1
create table console (
  id int auto_increment,
  name varchar(30) not null,
  primary key (id),
  unique (name)
);

-- changeset thiagov:2
create table game (
  id int auto_increment,
  title varchar(100) not null,
  year smallint(4),
  console_id int not null,
  completion_date date,
  personal_notes text,
  primary key (id),
  foreign key (console_id) references console(id),
  constraint uc_game unique (title, console_id)
);

-- changeset thiagov:3
insert into console(name)
values
    ('Nintendo Switch'),
    ('Nintendo Wii'),
    ('Nintendo 3DS'),
    ('PlayStation 4'),
    ('PlayStation 5'),
    ('PlayStation Vita'),
    ('Xbox One S'),
    ('Xbox 360'),
    ('Sega Master System'),
    ('Sega Saturn');