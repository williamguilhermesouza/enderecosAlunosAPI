--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg19.04+1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-0ubuntu0.19.04.1)

-- Started on 2020-02-21 17:55:58 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16403)
-- Name: aluno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aluno (
    id integer NOT NULL,
    data_nascimento timestamp without time zone NOT NULL,
    nota integer NOT NULL,
    nome character varying NOT NULL,
    cpf character varying NOT NULL
);


ALTER TABLE public.aluno OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16411)
-- Name: endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endereco (
    id integer NOT NULL,
    aluno_id integer NOT NULL,
    rua character varying NOT NULL,
    numero character varying,
    complemento character varying,
    bairro character varying NOT NULL
);


ALTER TABLE public.endereco OWNER TO postgres;

--
-- TOC entry 2942 (class 0 OID 16403)
-- Dependencies: 196
-- Data for Name: aluno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aluno (id, data_nascimento, nota, nome, cpf) FROM stdin;
1	2020-02-16 00:00:00	7	william	123543141
2	2019-02-16 00:00:00	1	joao	12321521343
3	2018-02-16 00:00:00	5	josefina	2131251234\n
4	2017-02-16 00:00:00	6	cleide	56467456
5	1993-02-16 00:00:00	10	josicreida maria	12321523
6	1991-02-16 00:00:00	4	cpf formatado 2	1.23.2.15.33
7	1991-02-16 00:00:00	4	cpf formatado valido	52998224725
\.


--
-- TOC entry 2943 (class 0 OID 16411)
-- Dependencies: 197
-- Data for Name: endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.endereco (id, aluno_id, rua, numero, complemento, bairro) FROM stdin;
1	1	sao joao	1234	apto 203	fonseca
2	1	sao januario	14	apto 103	fonsequitao
\.


--
-- TOC entry 2816 (class 2606 OID 16410)
-- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


--
-- TOC entry 2820 (class 2606 OID 16418)
-- Name: endereco endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id);


--
-- TOC entry 2818 (class 2606 OID 16481)
-- Name: aluno uniquecpf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT uniquecpf UNIQUE (cpf);


-- Completed on 2020-02-21 17:55:59 -03

--
-- PostgreSQL database dump complete
--

