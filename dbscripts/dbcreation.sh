#! /usr/bin/bash

#creating the database
sudo su - postgres

psql

# creating aluno table
CREATE TABLE IF NOT EXISTS aluno (\
	id INTEGER NOT NULL PRIMARY KEY,\
	nome TEXT NOT NULL,\
	data_nascimento TIMESTAMP NOT NULL,\
	cpf TEXT NOT NULL,\
	nota INTEGER NOT NULL\
);

# creating endereco table
CREATE TABLE IF NOT EXISTS endereco (\
	id INTEGER NOT NULL PRIMARY KEY,\
	rua TEXT NOT NULL,\
	numero VARCHAR(5),\
	complemento TEXT,\
	bairro TEXT NOT NULL,\
	aluno_id INTEGER NOT NULL,\
	CONSTRAINT fk_endal FOREIGN KEY (aluno_id) REFERENCES aluno (id)\
);
