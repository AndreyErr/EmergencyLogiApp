--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-07-17 00:46:58

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

DROP DATABASE IF EXISTS logistic;
--
-- TOC entry 4953 (class 1262 OID 33107)
-- Name: logistic; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE logistic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE logistic OWNER TO postgres;

\connect logistic

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

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 82318)
-- Name: external_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.external_links (
    link_id integer NOT NULL,
    link_name character varying(120) NOT NULL,
    link_descr text,
    link_href character varying(300) NOT NULL,
    link_apikey character varying(400),
    link_creator integer NOT NULL,
    link_status integer DEFAULT 0 NOT NULL,
    link_date_created date NOT NULL,
    link_time_created time without time zone NOT NULL,
    link_body text
);


ALTER TABLE public.external_links OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 82326)
-- Name: external_links_link_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.external_links ALTER COLUMN link_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.external_links_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 49567)
-- Name: incidents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incidents (
    id integer NOT NULL,
    coord character varying(120) NOT NULL,
    json jsonb NOT NULL,
    date_created date NOT NULL,
    time_created time without time zone NOT NULL,
    user_created integer NOT NULL
);


ALTER TABLE public.incidents OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 49574)
-- Name: incidents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.incidents ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.incidents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 49539)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    descr text,
    type integer DEFAULT 1 NOT NULL,
    flag integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 49563)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 49548)
-- Name: items_in_storages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_in_storages (
    id integer NOT NULL,
    item_id integer NOT NULL,
    storage_id integer NOT NULL,
    count integer NOT NULL
);


ALTER TABLE public.items_in_storages OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 49591)
-- Name: items_in_storages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.items_in_storages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_in_storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 65922)
-- Name: items_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_types (
    type_id integer NOT NULL,
    type_name character varying(120) NOT NULL,
    type_descr text,
    type_flag integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.items_types OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 65934)
-- Name: items_types_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.items_types ALTER COLUMN type_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_types_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 49522)
-- Name: patterns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patterns (
    id integer NOT NULL,
    date_add date NOT NULL,
    time_add time without time zone NOT NULL,
    user_add integer NOT NULL,
    name character varying(120) NOT NULL,
    type character varying(100) NOT NULL,
    json jsonb NOT NULL,
    ref integer DEFAULT 0 NOT NULL,
    code_name character varying(100) NOT NULL,
    descr text
);


ALTER TABLE public.patterns OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49531)
-- Name: patterns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.patterns ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patterns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 49575)
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    value character varying(100) NOT NULL,
    user_editor integer NOT NULL,
    date_edit date NOT NULL,
    time_edit time without time zone NOT NULL,
    descr text,
    name_text character varying(120) NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49582)
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.settings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 65899)
-- Name: statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statuses (
    status_id integer NOT NULL,
    title character varying(100) NOT NULL
);


ALTER TABLE public.statuses OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 65919)
-- Name: statuses_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.statuses ALTER COLUMN status_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statuses_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 41313)
-- Name: storages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storages (
    id integer NOT NULL,
    coord character varying(100) NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    user_created integer NOT NULL,
    date_created date NOT NULL,
    time_created time without time zone NOT NULL,
    addres jsonb NOT NULL,
    name character varying(120) NOT NULL,
    descr text
);


ALTER TABLE public.storages OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 49505)
-- Name: storages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.storages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 33116)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    login character varying(120) NOT NULL,
    pass character varying(120) NOT NULL,
    status integer,
    access integer,
    type integer DEFAULT 0 NOT NULL,
    personal_data character varying(120) DEFAULT 0 NOT NULL,
    name character varying(120) DEFAULT 0 NOT NULL,
    user_add integer,
    flag integer,
    email character varying(120),
    phone character varying(30)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 33115)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4946 (class 0 OID 82318)
-- Dependencies: 233
-- Data for Name: external_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.external_links OVERRIDING SYSTEM VALUE VALUES (30, 'active', 'Сюда же', 'http://localhost:4000/', '', 25, 1, '2024-05-25', '23:16:36', '') ON CONFLICT DO NOTHING;
INSERT INTO public.external_links OVERRIDING SYSTEM VALUE VALUES (29, 'jhgfd', 'jhgfds', 'kjhygtfr', 'ijuhgtfr', 25, 3, '2024-05-25', '22:50:21', '"kjhgf": 123') ON CONFLICT DO NOTHING;
INSERT INTO public.external_links OVERRIDING SYSTEM VALUE VALUES (31, 'act', 'dfghj1', 'http://localhost:4000/api/externalLink/testResp', 'data 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNSwibG9naW4iOiJhZG1pbiIsImVtYWlsIjoiYTkxNjUxODU4MDhAZ21haWwuY29tIiwic3RhdHVzIjo1LCJuYW1lIjoi0L_RgNGM0Y7QtNC70YDRgNC0MiIsImZsYWciOjB9LCJpYXQiOjE3MTY1Njk4MDUsImV4cCI6MTcxNjgyOTAwNX0.lR5lR8gDlYenjhMta3PXLBGFQu182FA5rTwxdp4OKFs', 25, 1, '2024-05-25', '23:23:11', '') ON CONFLICT DO NOTHING;
INSERT INTO public.external_links OVERRIDING SYSTEM VALUE VALUES (33, 'ujhgfd', 'kjuhgfds', 'erftgyuio', '', 30, 2, '2024-05-28', '21:32:15', '') ON CONFLICT DO NOTHING;


--
-- TOC entry 4937 (class 0 OID 49567)
-- Dependencies: 224
-- Data for Name: incidents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (372, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '00:57:04', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (376, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:04:37', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (377, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:06:36', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (378, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:08:19', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (379, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:08:37', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (390, '55.1422175/37.4532902', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "jkhgbfvds": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 8, "Вода в бутылках": 14}, "storagesData": {"52": {"id": 52, "addr": {"city": "Chekhov", "state": "Moscow Oblast", "street": "улица Дружбы", "country": "Russia", "housenumber": "14 к1"}, "coordsBD": [55.1459689, 37.4602447611949], "distanse": 607.7258801969208, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-05-23T11:00:00Z"}, "hints": {"visited_nodes.sum": 68, "visited_nodes.average": 68}, "paths": [{"bbox": [37.45329, 55.142218, 37.461482, 55.146097], "legs": [], "time": 145429, "ascend": 5.2694091796875, "points": {"type": "LineString", "coordinates": [[37.460364, 55.146097], [37.460534, 55.146045], [37.461098, 55.145768], [37.461134, 55.145608], [37.461482, 55.145325], [37.461033, 55.145135], [37.458897, 55.144146], [37.458732, 55.14406], [37.45849, 55.144008], [37.458188, 55.144003], [37.457795, 55.144135], [37.457185, 55.144325], [37.455973, 55.144678], [37.45515, 55.144895], [37.455072, 55.144898], [37.454921, 55.144862], [37.454819, 55.144805], [37.454087, 55.14373], [37.453307, 55.142338], [37.45329, 55.142218]]}, "weight": 159.264669, "descend": 28.807861328125, "details": {"surface": [[0, 4, "missing"], [4, 14, "asphalt"], [14, 19, "missing"]], "road_class": [[0, 4, "service"], [4, 19, "tertiary"]]}, "distance": 922.413, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.460364, 55.146097], [37.45329, 55.142218]]}}]}, "foundItems": {"Аптечка": 4, "Вода в бутылках": 4}, "distanseByRoad": 922.413, "within_length_road": true}, "53": {"id": 53, "addr": {"city": "Chekhov", "state": "Moscow Oblast", "street": "улица Дружбы", "country": "Russia", "housenumber": "6"}, "coordsBD": [55.147031150000004, 37.464590878562504], "distanse": 895.670578556664, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-05-23T11:00:00Z"}, "hints": {"visited_nodes.sum": 70, "visited_nodes.average": 70}, "paths": [{"bbox": [37.45329, 55.142218, 37.464365, 55.147138], "legs": [], "time": 167404, "ascend": 5.408935546875, "points": {"type": "LineString", "coordinates": [[37.464365, 55.147138], [37.463919, 55.146829], [37.463893, 55.146756], [37.464176, 55.146583], [37.464358, 55.146452], [37.46412, 55.146351], [37.463898, 55.146273], [37.461482, 55.145325], [37.461033, 55.145135], [37.458897, 55.144146], [37.458732, 55.14406], [37.45849, 55.144008], [37.458188, 55.144003], [37.457795, 55.144135], [37.457185, 55.144325], [37.455973, 55.144678], [37.45515, 55.144895], [37.455072, 55.144898], [37.454921, 55.144862], [37.454819, 55.144805], [37.454087, 55.14373], [37.453307, 55.142338], [37.45329, 55.142218]]}, "weight": 184.292848, "descend": 27.620361328125, "details": {"surface": [[0, 4, "missing"], [4, 17, "asphalt"], [17, 22, "missing"]], "road_class": [[0, 4, "service"], [4, 22, "tertiary"]]}, "distance": 1125.949, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.464365, 55.147138], [37.45329, 55.142218]]}}]}, "foundItems": {"Аптечка": 4, "Вода в бутылках": 10}, "distanseByRoad": 1125.949, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 14}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "notFound": {}, "itemsInStorages": {"52": {"Аптечка": [4, 50], "Вода в бутылках": [4, 27]}, "53": {"Аптечка": [4, 50], "Вода в бутылках": [10, 67]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 8, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}}}', '2024-05-27', '00:17:02', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (380, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:08:46', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (389, '55.75741555/37.52740245747192', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 11}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 10}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 11}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 11, "столкнулось машин": 1}}}', '2024-05-26', '01:57:23', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (381, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:08:58', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (391, '55.9284809/38.8243342', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-05-28', '21:20:52', 30) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (382, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:09:15', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (392, '55.66991985/37.480530377409636', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {}, "items": {"Аптечка": -10, "Вода в бутылках": 15}, "itemsInStorages": {}, "items_allowed_min": {"Аптечка": -9, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка": -10, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": -20}}}', '2024-06-09', '01:17:31', 30) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (399, '55.581886/37.9656181', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:36:50', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (385, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Аптечка": 1, "Аптечка большая": 3}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Аптечка": 1, "Аптечка большая": 3}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка": 1, "Аптечка большая": 3}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 1}}}', '2024-05-26', '01:13:06', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (400, '55.361667/37.861667', '{"input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 2}}}', '2024-06-10', '00:38:30', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (383, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:09:26', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (401, '55.3115923/38.3311732', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 11}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 10}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 11}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 11, "столкнулось машин": 2}}}', '2024-06-10', '00:54:12', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (393, '55.66991985/37.480530377409636', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {}, "items": {"Аптечка": 0, "Вода в бутылках": 15}, "itemsInStorages": {}, "items_allowed_min": {"Аптечка": 0, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка": 0, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 0}}}', '2024-06-09', '01:20:33', 30) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (384, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Аптечка": 1, "Аптечка большая": 3}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Аптечка": 1, "Аптечка большая": 3}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка": 1, "Аптечка большая": 3}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 1}}}', '2024-05-26', '01:12:29', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (394, '55.79160515/37.469156100000006', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:22:33', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (395, '55.79160515/37.469156100000006', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:24:17', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (396, '55.79160515/37.469156100000006', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:26:59', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (397, '55.79160515/37.469156100000006', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:28:26', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (398, '55.79160515/37.469156100000006', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-10', '00:31:08', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (373, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '00:59:35', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (374, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:01:14', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (375, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {}}, "processed": "fin", "input_incident_information": {}}', '2024-05-26', '01:02:20', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (386, '55.649325000000005/37.52420489999999', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Аптечка": 1, "Аптечка большая": 3}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Аптечка": 1, "Аптечка большая": 3}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка": 1, "Аптечка большая": 3}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 1}}}', '2024-05-26', '01:15:56', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (387, '55.64692445/37.58458029304427', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 10}}}', '2024-05-26', '01:38:26', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (388, '55.6534959/37.5966443', '{"sent": {"kjhygtfr": {"message": "No response received from server", "statusCode": 0}, "http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 15}, "notFound": {}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 15}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 15, "столкнулось машин": 2}}}', '2024-05-26', '01:55:13', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (415, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:02:46', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (402, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 1}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 1}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 1}, "items": {"Аптечка большая": 1}, "itemsInStorages": {"43": {"Аптечка большая": [1, 100]}}, "items_allowed_min": {"Аптечка большая": 1}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 1}}}, "processed": "fin", "input_incident_information": {"werty": {}}}', '2024-06-12', '00:25:53', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (412, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {}, "storagesData": {}, "incidentsData": {"дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Бур": 2, "Аптечка": 10}}}, "processed": "fin", "input_incident_information": {"дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-12', '15:05:05', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (403, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 1}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 1}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 1}, "items": {"Аптечка большая": 1}, "itemsInStorages": {"43": {"Аптечка большая": [1, 100]}}, "items_allowed_min": {"Аптечка большая": 1}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 1}}}, "processed": "fin", "input_incident_information": {"werty": {}}}', '2024-06-12', '00:26:51', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (404, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 1}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 1}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 1}, "items": {"Аптечка большая": 1}, "itemsInStorages": {"43": {"Аптечка большая": [1, 100]}}, "items_allowed_min": {"Аптечка большая": 1}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 1}}}, "processed": "fin", "input_incident_information": {"werty": {}}}', '2024-06-12', '00:27:27', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (413, '55.790733849999995/38.439121199999974', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"55": {"id": 55, "addr": {"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "15"}, "coordsBD": [55.786523200000005, 38.43910038779458], "distanse": 468.2047258659542, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-09T09:00:00Z"}, "hints": {"visited_nodes.sum": 60, "visited_nodes.average": 60}, "paths": [{"bbox": [38.436861, 55.786554, 38.439684, 55.790846], "legs": [], "time": 102487, "ascend": 6.2884521484375, "points": {"type": "LineString", "coordinates": [[38.439309, 55.786554], [38.439105, 55.78699], [38.439684, 55.787079], [38.439533, 55.787399], [38.438384, 55.787242], [38.436861, 55.790625], [38.438353, 55.790846], [38.438523, 55.790499], [38.439184, 55.790592]]}, "weight": 113.967193, "descend": 1.74493408203125, "details": {"surface": [[0, 4, "missing"], [4, 6, "asphalt"], [6, 8, "missing"]], "road_class": [[0, 3, "service"], [3, 4, "residential"], [4, 6, "secondary"], [6, 8, "service"]]}, "distance": 765.396, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[38.439309, 55.786554], [38.439184, 55.790592]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 10}, "distanseByRoad": 765.396, "within_length_road": true}, "56": {"id": 56, "addr": {"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "21"}, "coordsBD": [55.784555600000004, 38.43996562285138], "distanse": 689.0156229438044, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-09T09:00:00Z"}, "hints": {"visited_nodes.sum": 58, "visited_nodes.average": 58}, "paths": [{"bbox": [38.436861, 55.784592, 38.440192, 55.790846], "legs": [], "time": 103403, "ascend": 7.2445068359375, "points": {"type": "LineString", "coordinates": [[38.440192, 55.784592], [38.440062, 55.784844], [38.439502, 55.784761], [38.436861, 55.790625], [38.438353, 55.790846], [38.438523, 55.790499], [38.439184, 55.790592]]}, "weight": 117.159382, "descend": 0.76898193359375, "details": {"surface": [[0, 2, "missing"], [2, 4, "asphalt"], [4, 6, "missing"]], "road_class": [[0, 2, "service"], [2, 4, "secondary"], [4, 6, "service"]]}, "distance": 917.056, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[38.440192, 55.784592], [38.439184, 55.790592]]}}]}, "foundItems": {"Аптечка": 6, "Вода в бутылках": 5}, "distanseByRoad": 917.056, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"55": {"Аптечка": [4, 50], "Вода в бутылках": [10, 67]}, "56": {"Аптечка": [4, 50], "Вода в бутылках": [5, 33]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"55": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "56": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 15}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-12', '22:58:21', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (405, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 4}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 3, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 4}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 4}, "items": {"Аптечка большая": 4}, "itemsInStorages": {"43": {"Аптечка большая": [4, 100]}}, "items_allowed_min": {"Аптечка большая": 4}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 4}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:31:41', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (406, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 4}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 3, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 4}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 4}, "items": {"Аптечка большая": 4}, "itemsInStorages": {"43": {"Аптечка большая": [4, 100]}}, "items_allowed_min": {"Аптечка большая": 4}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 4}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:48:07', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (416, '55.770578/37.567766', '{"input_incident_information": {"obr1": {"пострадавшие": 15}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:14:36', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (407, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 4}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 4}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 4}, "items": {"Аптечка большая": 4}, "itemsInStorages": {"43": {"Аптечка большая": [4, 100]}}, "items_allowed_min": {"Аптечка большая": 4}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 4}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:50:37', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (414, '55.7905867/38.4377595', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 10, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"55": {"id": 55, "addr": {"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "15"}, "coordsBD": [55.786523200000005, 38.43910038779458], "distanse": 459.5515061903303, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-09T09:00:00Z"}, "hints": {"visited_nodes.sum": 46, "visited_nodes.average": 46}, "paths": [{"bbox": [38.436861, 55.786554, 38.439684, 55.790747], "legs": [], "time": 79094, "ascend": 5.66845703125, "points": {"type": "LineString", "coordinates": [[38.439309, 55.786554], [38.439105, 55.78699], [38.439684, 55.787079], [38.439533, 55.787399], [38.438384, 55.787242], [38.436861, 55.790625], [38.437685, 55.790747]]}, "weight": 88.688929, "descend": 1.38995361328125, "details": {"surface": [[0, 4, "missing"], [4, 6, "asphalt"]], "road_class": [[0, 3, "service"], [3, 4, "residential"], [4, 6, "secondary"]]}, "distance": 639.647, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[38.439309, 55.786554], [38.437685, 55.790747]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 13}, "distanseByRoad": 639.647, "within_length_road": true}, "56": {"id": 56, "addr": {"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "21"}, "coordsBD": [55.784555600000004, 38.43996562285138], "distanse": 684.6647438520012, "rodeInfo": {"info": {"took": 0, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-09T09:00:00Z"}, "hints": {"visited_nodes.sum": 40, "visited_nodes.average": 40}, "paths": [{"bbox": [38.436861, 55.784592, 38.440192, 55.790747], "legs": [], "time": 80010, "ascend": 6.62451171875, "points": {"type": "LineString", "coordinates": [[38.440192, 55.784592], [38.440062, 55.784844], [38.439502, 55.784761], [38.436861, 55.790625], [38.437685, 55.790747]]}, "weight": 91.881117, "descend": 0.41400146484375, "details": {"surface": [[0, 2, "missing"], [2, 4, "asphalt"]], "road_class": [[0, 2, "service"], [2, 4, "secondary"]]}, "distance": 791.307, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[38.440192, 55.784592], [38.437685, 55.790747]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 2}, "distanseByRoad": 791.307, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 7, "Вода в бутылках": 15}, "items": {"Аптечка": 7, "Вода в бутылках": 15}, "itemsInStorages": {"55": {"Аптечка": [4, 57], "Вода в бутылках": [13, 87]}, "56": {"Аптечка": [3, 43], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 7, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"55": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "56": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 10, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 14}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-12', '23:02:52', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (408, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 4}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 4}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 4}, "items": {"Аптечка большая": 4}, "itemsInStorages": {"43": {"Аптечка большая": [4, 100]}}, "items_allowed_min": {"Аптечка большая": 4}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 4}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:51:40', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (409, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 4}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 3, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 4}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 4}, "items": {"Аптечка большая": 4}, "itemsInStorages": {"43": {"Аптечка большая": [4, 100]}}, "items_allowed_min": {"Аптечка большая": 4}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 4}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:54:25', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (410, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 3}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 2, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 3}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 3}, "items": {"Аптечка большая": 3}, "itemsInStorages": {"43": {"Аптечка большая": [3, 100]}}, "items_allowed_min": {"Аптечка большая": 3}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Аптечка большая": 3}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}}}', '2024-06-12', '00:55:18', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (411, '55.8360534/37.5206183', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка большая": 3}, "storagesData": {"43": {"id": 43, "addr": {"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}, "coordsBD": [55.84539815, 37.41913092041436], "distanse": 6421.0413108130215, "rodeInfo": {"info": {"took": 3, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-06T00:00:00Z"}, "hints": {"visited_nodes.sum": 364, "visited_nodes.average": 364}, "paths": [{"bbox": [37.419309, 55.83618, 37.523515, 55.880521], "legs": [], "time": 1557190, "ascend": 112.0089111328125, "points": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.419309, 55.845141], [37.419701, 55.845163], [37.420306, 55.845155], [37.420189, 55.844511], [37.421289, 55.844495], [37.424628, 55.844313], [37.424605, 55.844495], [37.42451, 55.844785], [37.423526, 55.847588], [37.423139, 55.848641], [37.423036, 55.849097], [37.422908, 55.849502], [37.422574, 55.850512], [37.422084, 55.851897], [37.421483, 55.853708], [37.421171, 55.854573], [37.420889, 55.855434], [37.420021, 55.857936], [37.41987, 55.858178], [37.421001, 55.858265], [37.421996, 55.858332], [37.423606, 55.858408], [37.424825, 55.858433], [37.425665, 55.858431], [37.42645, 55.858409], [37.428223, 55.858338], [37.428534, 55.858319], [37.430204, 55.858158], [37.430759, 55.858081], [37.431655, 55.857942], [37.431856, 55.857898], [37.432941, 55.859455], [37.433227, 55.859899], [37.433514, 55.860299], [37.433909, 55.860931], [37.434399, 55.861642], [37.434473, 55.861789], [37.434502, 55.861865], [37.434493, 55.861977], [37.434069, 55.863288], [37.435352, 55.8634], [37.435528, 55.863432], [37.435661, 55.863482], [37.435785, 55.863555], [37.435772, 55.863604], [37.43579, 55.863667], [37.436029, 55.86403], [37.436313, 55.86443], [37.437297, 55.865921], [37.4389, 55.868259], [37.440047, 55.869952], [37.441067, 55.871476], [37.439761, 55.87229], [37.437854, 55.873518], [37.437458, 55.873754], [37.43693, 55.874034], [37.436438, 55.874237], [37.436138, 55.874337], [37.435711, 55.874459], [37.435113, 55.874603], [37.434765, 55.874665], [37.433901, 55.874859], [37.433301, 55.875034], [37.432894, 55.875184], [37.431082, 55.875795], [37.430886, 55.87594], [37.430786, 55.876044], [37.430731, 55.876148], [37.430718, 55.876265], [37.430742, 55.876368], [37.430806, 55.876462], [37.430887, 55.876532], [37.431043, 55.876604], [37.431309, 55.876686], [37.432366, 55.876968], [37.432561, 55.877028], [37.432722, 55.877102], [37.432827, 55.877177], [37.432909, 55.877271], [37.433167, 55.877686], [37.433245, 55.877786], [37.433338, 55.877867], [37.433527, 55.878001], [37.434081, 55.878268], [37.435088, 55.878594], [37.439173, 55.879865], [37.440671, 55.880337], [37.441507, 55.880474], [37.441878, 55.880515], [37.442243, 55.880521], [37.442594, 55.880508], [37.443005, 55.880458], [37.446084, 55.879942], [37.446494, 55.879855], [37.446859, 55.879732], [37.447051, 55.879654], [37.447385, 55.879474], [37.447794, 55.879236], [37.448207, 55.878903], [37.448874, 55.878326], [37.449423, 55.877834], [37.450216, 55.877157], [37.451845, 55.875848], [37.454092, 55.874098], [37.457036, 55.871952], [37.458152, 55.871172], [37.459063, 55.870517], [37.459443, 55.870227], [37.459712, 55.870004], [37.460137, 55.869585], [37.460449, 55.869232], [37.461, 55.868518], [37.462499, 55.866395], [37.464043, 55.864107], [37.465207, 55.862442], [37.46626, 55.860909], [37.467928, 55.858454], [37.471968, 55.852572], [37.472542, 55.851714], [37.473444, 55.850402], [37.474223, 55.849311], [37.474803, 55.848458], [37.475358, 55.847621], [37.476006, 55.84668], [37.476789, 55.845575], [37.477258, 55.844855], [37.478559, 55.842954], [37.478788, 55.842462], [37.479077, 55.841913], [37.479285, 55.841554], [37.480011, 55.840613], [37.481007, 55.839291], [37.482068, 55.8393], [37.482488, 55.839341], [37.487316, 55.839331], [37.49361, 55.839359], [37.493616, 55.839329], [37.493637, 55.839303], [37.493673, 55.839281], [37.493719, 55.839268], [37.493771, 55.839263], [37.493822, 55.839268], [37.493868, 55.839282], [37.493904, 55.839303], [37.493925, 55.83933], [37.494242, 55.839256], [37.499811, 55.838158], [37.501859, 55.83771], [37.504525, 55.837172], [37.504837, 55.837167], [37.505101, 55.837178], [37.510269, 55.837586], [37.512652, 55.837766], [37.514568, 55.837922], [37.514717, 55.837945], [37.514816, 55.837978], [37.514917, 55.838026], [37.515008, 55.838091], [37.517238, 55.840539], [37.517513, 55.840805], [37.517611, 55.840881], [37.517788, 55.840983], [37.51803, 55.841085], [37.518573, 55.841239], [37.518999, 55.841342], [37.519182, 55.84136], [37.519268, 55.841366], [37.519536, 55.841354], [37.519708, 55.841339], [37.520652, 55.841211], [37.520805, 55.841211], [37.520871, 55.841219], [37.52234, 55.841718], [37.522334, 55.841636], [37.522374, 55.841564], [37.523335, 55.840663], [37.523443, 55.840456], [37.523481, 55.840356], [37.523515, 55.840142], [37.523507, 55.840002], [37.523361, 55.839565], [37.52297, 55.838685], [37.522409, 55.837703], [37.521704, 55.836286], [37.520985, 55.836436], [37.52085, 55.83618], [37.520702, 55.836205]]}, "weight": 1783.943731, "descend": 106.00897216796875, "details": {"surface": [[0, 1, "missing"], [1, 184, "asphalt"], [184, 187, "missing"]], "road_class": [[0, 3, "service"], [3, 6, "tertiary"], [6, 84, "secondary"], [84, 87, "trunk"], [87, 127, "primary"], [127, 135, "secondary"], [135, 173, "tertiary"], [173, 176, "secondary"], [176, 184, "tertiary"], [184, 187, "service"]]}, "distance": 15117.314, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.41934, 55.84539], [37.520702, 55.836205]]}}]}, "foundItems": {"Аптечка большая": 3}, "distanseByRoad": 15117.314, "within_length_road": false}}, "incidentsData": {"werty": {"radius": 11667, "itemsData": {"found": {"Аптечка большая": 3}, "items": {"Аптечка большая": 3}, "itemsInStorages": {"43": {"Аптечка большая": [3, 100]}}, "items_allowed_min": {"Аптечка большая": 3}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "дтп": {"radius": 11667, "itemsData": {"found": {}, "items": {"Бур": 2, "Аптечка": 10}, "itemsInStorages": {}, "items_allowed_min": {"Бур": 2, "Аптечка": 9}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20}, "allItemsRequest": {"Бур": 2, "Аптечка": 10, "Аптечка большая": 3}}}, "processed": "fin", "input_incident_information": {"werty": {"dfrgthyuji": true}, "дтп": {"жертвы": 10, "столкнулось машин": 1}}}', '2024-06-12', '14:54:09', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (418, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:22:31', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (417, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": "4,5041", "Вода в бутылках": "13,8713"}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": "4,5042", "Вода в бутылках": "2,132"}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:18:41', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (419, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:25:42', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (420, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Эвакуатор": null, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Эвакуатор": null, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:33:47', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (421, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Эвакуатор": 1, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Эвакуатор": 1, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:35:38', 25) ON CONFLICT DO NOTHING;
INSERT INTO public.incidents OVERRIDING SYSTEM VALUE VALUES (422, '55.770578/37.567766', '{"sent": {"http://localhost:4000/": {"message": "Hello World!", "statusCode": 200}, "http://localhost:4000/api/externalLink/testResp": {"message": {"type": "UNAUTHORIZED", "message": "Не авторизован 1"}, "statusCode": 401}}, "reaction": {"coefData": {"percent_mistake": "10", "viacle_avarge_speed": "35", "road_distanse_multiplexer": 2, "percent_taken_from_warehouse": "90"}, "allItemsGet": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}, "storagesData": {"58": {"id": 58, "addr": {"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}, "coordsBD": [55.771657, 37.576457188483005], "distanse": 556.6920769300601, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 36, "visited_nodes.average": 36}, "paths": [{"bbox": [37.567693, 55.770644, 37.576615, 55.773007], "legs": [], "time": 101035, "ascend": 4.5335693359375, "points": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.576615, 55.771936], [37.576268, 55.771932], [37.576259, 55.772744], [37.576244, 55.7728], [37.576206, 55.772854], [37.576107, 55.772836], [37.575967, 55.772833], [37.574791, 55.772998], [37.574679, 55.773007], [37.574405, 55.772998], [37.574239, 55.772973], [37.574151, 55.77295], [37.573975, 55.772902], [37.573376, 55.772702], [37.572788, 55.77244], [37.567693, 55.770644]]}, "weight": 112.536374, "descend": 2.923095703125, "details": {"surface": [[0, 16, "asphalt"]], "road_class": [[0, 2, "service"], [2, 5, "unclassified"], [5, 16, "secondary"]]}, "distance": 767.033, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.576591, 55.771656], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 5, "Эвакуатор": 1, "Вода в бутылках": 13}, "distanseByRoad": 767.033, "within_length_road": true}, "59": {"id": 59, "addr": {"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}, "coordsBD": [55.76469575, 37.56718007593648], "distanse": 655.1024263798777, "rodeInfo": {"info": {"took": 1, "copyrights": ["GraphHopper", "OpenStreetMap contributors"], "road_data_time_stamp": "2024-06-12T18:00:00Z"}, "hints": {"visited_nodes.sum": 175, "visited_nodes.average": 175}, "paths": [{"bbox": [37.564997, 55.764427, 37.572425, 55.770644], "legs": [], "time": 240035, "ascend": 15.2042236328125, "points": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567336, 55.764427], [37.566909, 55.764456], [37.567002, 55.764896], [37.566932, 55.764967], [37.566934, 55.765032], [37.566937, 55.76514], [37.567005, 55.765436], [37.572013, 55.765118], [37.572066, 55.765311], [37.572425, 55.767721], [37.567726, 55.767879], [37.566911, 55.76792], [37.565167, 55.767985], [37.564997, 55.767999], [37.565436, 55.769584], [37.56551, 55.769601], [37.56556, 55.769624], [37.565609, 55.769669], [37.565628, 55.769723], [37.565618, 55.769759], [37.565592, 55.769792], [37.565525, 55.769833], [37.565633, 55.769898], [37.566111, 55.770082], [37.567693, 55.770644]]}, "weight": 656.066864, "descend": 9.545166015625, "details": {"surface": [[0, 5, "missing"], [5, 25, "asphalt"]], "road_class": [[0, 7, "service"], [7, 8, "unclassified"], [8, 10, "tertiary"], [10, 14, "unclassified"], [14, 25, "secondary"]]}, "distance": 1614.906, "transfers": 0, "points_encoded": false, "snapped_waypoints": {"type": "LineString", "coordinates": [[37.56739, 55.764682], [37.567693, 55.770644]]}}]}, "foundItems": {"Аптечка": 6, "Эвакуатор": 1, "Вода в бутылках": 2}, "distanseByRoad": 1614.906, "within_length_road": true}}, "incidentsData": {"obr1": {"radius": 11667, "itemsData": {"found": {"Аптечка": 8, "Вода в бутылках": 15}, "items": {"Аптечка": 8, "Вода в бутылках": 15}, "itemsInStorages": {"58": {"Аптечка": [4, 50], "Вода в бутылках": [13, 87]}, "59": {"Аптечка": [4, 50], "Вода в бутылках": [2, 13]}}, "items_allowed_min": {"Аптечка": 8, "Вода в бутылках": 14}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "дтп": {"radius": 11667, "itemsData": {"found": {"Аптечка": 3, "Эвакуатор": 2}, "items": {"Аптечка": 3, "Эвакуатор": 2}, "itemsInStorages": {"58": {"Аптечка": [1, 33], "Эвакуатор": [1, 50]}, "59": {"Аптечка": [2, 67], "Эвакуатор": [1, 50]}}, "items_allowed_min": {"Аптечка": 3, "Эвакуатор": 2}}, "max_radius": 17501, "min_radius": 2334, "react_time": 20, "react_time_max": 40}, "allItemsRequest": {"Аптечка": 11, "Эвакуатор": 2, "Вода в бутылках": 15}}}, "processed": "fin", "input_incident_information": {"obr1": {"пострадавшие": 16}, "дтп": {"жертвы": 3, "столкнулось машин": 2}}}', '2024-06-18', '21:40:52', 25) ON CONFLICT DO NOTHING;


--
-- TOC entry 4934 (class 0 OID 49539)
-- Dependencies: 221
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (15, 'Носилки', 'Носилки стандартные', 3, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (17, 'Вода в бутылках', 'Вода в бутылках', 2, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (13, 'Аптечка', 'Аптечка', 33, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (14, 'Аптечка большая', 'Аптечка большая', 33, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (16, 'Бур1', 'Бур', 3, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.items OVERRIDING SYSTEM VALUE VALUES (21, 'Эвакуатор', 'Эвакуатор легковых автомобилей', 3, 1) ON CONFLICT DO NOTHING;


--
-- TOC entry 4935 (class 0 OID 49548)
-- Dependencies: 222
-- Data for Name: items_in_storages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (52, 13, 50, 21) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (47, 16, 48, 141) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (44, 15, 49, 71) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (53, 13, 45, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (42, 16, 44, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (35, 17, 45, 1000) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (58, 13, 54, 45) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (59, 17, 54, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (54, 13, 52, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (55, 17, 52, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (56, 13, 53, 6) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (57, 17, 53, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (41, 15, 44, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (49, 13, 48, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (46, 14, 49, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (39, 14, 43, 11) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (45, 13, 49, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (40, 13, 47, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (43, 16, 49, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (48, 15, 48, 196) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (51, 13, 51, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (38, 13, 43, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (37, 13, 44, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (66, 17, 58, 15) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (67, 21, 58, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (68, 13, 58, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (69, 13, 59, 10) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (70, 21, 59, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (71, 17, 59, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (50, 14, 48, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (62, 17, 55, 15) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (61, 21, 55, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (60, 13, 55, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (65, 17, 56, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (64, 21, 56, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_in_storages OVERRIDING SYSTEM VALUE VALUES (63, 13, 56, 10) ON CONFLICT DO NOTHING;


--
-- TOC entry 4944 (class 0 OID 65922)
-- Dependencies: 231
-- Data for Name: items_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.items_types OVERRIDING SYSTEM VALUE VALUES (33, 'Здоровье', 'Предметы для здоровья пострадавших', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_types OVERRIDING SYSTEM VALUE VALUES (3, 'Извлечение', 'Предметы для извлечения пострадавших', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_types OVERRIDING SYSTEM VALUE VALUES (2, 'Снабжение', 'Товары для долгострочного нахождения спасателей в зоне ЧС', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.items_types OVERRIDING SYSTEM VALUE VALUES (34, 'tyuio', 'fghj', 2) ON CONFLICT DO NOTHING;


--
-- TOC entry 4932 (class 0 OID 49522)
-- Dependencies: 219
-- Data for Name: patterns; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.patterns OVERRIDING SYSTEM VALUE VALUES (140, '2024-06-12', '00:12:43', 25, 'Обрушение дома', 'reaction', '{"name": "Обрушение дома", "time": 20, "type": "reaction", "descr": "Обрушение многоквартирного дома", "code_name": "obr1", "pattern_input": {"пострадавшие": ["числовой", "required", "active"]}, "pattern_reaction": {"пострадавшие": [{"status": "active", "item_name": "Аптечка", "reaction_item": {"value": 0.5, "value_type": "per_1"}, "default_reaction_item": 10}, {"status": "active", "item_name": "Вода в бутылках", "reaction_item": {"value": 15, "value_type": "generally"}, "default_reaction_item": null}]}}', 0, 'obr1', 'Обрушение многоквартирного дома') ON CONFLICT DO NOTHING;
INSERT INTO public.patterns OVERRIDING SYSTEM VALUE VALUES (141, '2024-06-12', '00:31:29', 25, 'dfghjk', 'reaction', '{"name": "dfghjk", "time": 20, "type": "reaction", "descr": "sdfghy", "code_name": "werty", "pattern_input": {"tghyujik": ["числовой", "not_required", "active"], "wsedrfgt": ["числовой", "not_required", "active", ["between", 1, 100]], "ilukyjhtg": ["строковой", "not_required", "active", ["in", "fff"]], "dfrgthyuji": ["булевый", "required", "active"]}, "pattern_reaction": {"tghyujik": [{"status": "not_active", "item_name": "Носилки", "reaction_item": {"value": [["=", 10, "generally", 2], [">=", 11, "per_1", 5]], "value_type": "custom"}, "default_reaction_item": null}, {"status": "not_active", "item_name": "Аптечка", "reaction_item": {"value": 2, "value_type": "per_1"}, "default_reaction_item": null}], "wsedrfgt": [{"status": "not_active", "item_name": "Носилки", "reaction_item": {"value": 1, "value_type": "per_1"}, "default_reaction_item": null}, {"status": "not_active", "item_name": "Аптечка большая", "reaction_item": {"value": 2, "value_type": "per_1"}, "default_reaction_item": null}], "ilukyjhtg": [{"status": "not_active", "item_name": "Аптечка большая", "reaction_item": {"value": 10, "value_type": "generally"}, "default_reaction_item": 1}], "dfrgthyuji": [{"status": "not_active", "item_name": "Бур1", "reaction_item": {"value": 1, "value_type": "generally"}, "default_reaction_item": null}, {"status": "not_active", "item_name": "Аптечка", "reaction_item": {"value": 2, "value_type": "generally"}, "default_reaction_item": null}, {"status": "active", "item_name": "Аптечка большая", "reaction_item": {"value": 3, "value_type": "generally"}, "default_reaction_item": null}]}}', 0, 'werty', 'sdfghy') ON CONFLICT DO NOTHING;
INSERT INTO public.patterns OVERRIDING SYSTEM VALUE VALUES (135, '2024-06-12', '22:49:53', 25, 'жертвы', 'common', '{"name": "жертвы", "time": 20, "type": "common", "descr": "жертвы", "code_name": "жертвы", "pattern_input": ["числовой", "required", "active", ["between", 1, 40]], "pattern_reaction": [{"status": "active", "item_name": "Аптечка", "reaction_item": {"value": 1, "value_type": "per_1"}, "default_reaction_item": 10}]}', 16, 'жертвы', 'жертвы') ON CONFLICT DO NOTHING;
INSERT INTO public.patterns OVERRIDING SYSTEM VALUE VALUES (136, '2024-06-12', '22:49:39', 25, 'дтп', 'reaction', '{"name": "дтп", "time": 20, "type": "reaction", "descr": "дтп", "code_name": "дтп", "pattern_input": {"жертвы": "PATTERN_COMMON", "столкнулось машин": ["числовой", "required", "active"]}, "pattern_reaction": {"жертвы": "PATTERN_COMMON", "столкнулось машин": [{"status": "active", "item_name": "Эвакуатор", "reaction_item": {"value": 1, "value_type": "per_1"}, "default_reaction_item": null}]}}', 0, 'дтп', 'дтп') ON CONFLICT DO NOTHING;


--
-- TOC entry 4939 (class 0 OID 49575)
-- Dependencies: 226
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (11, 'viacle_avarge_speed', '35', 25, '2024-05-19', '00:50:10', 'Скорость движения транспорта', 'Средняя скорость транспорта') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (10, 'main_administrator', 'admin', 25, '2024-05-25', '22:00:14', 'Главный администратор, которого нельзя удалить или изменить', 'Главный администратор') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (19, 'percentage_of_items_from_warehouse_to_cancel_delivery_for_incident', '5', 25, '2024-05-29', '03:01:46', 'Процент товаров со склада для отмены доставки для инцидента', 'Отмена доставки') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (4, 'percentage_taken_from_warehouse', '90', 25, '2024-06-12', '14:46:36', 'Сколько процентов товара мы можем взять за 1 проходку', 'Процент взятия товаров за 1 проход') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (6, 'allowed_percentage_of_skipping_for_item', '10', 23, '2024-02-22', '02:52:42', 'Разрешённый процент пропуска для товара (округление в большую сторону)', 'Погрешность выборки') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (12, 'max_radius', '1.5', 23, '2024-02-10', '16:00:40', 'Максимальный радиус поиска. Считается по флрмуле (найденный радиус * то что ввели здесь). Внимание! Должно быть больше или равно, чем минимальный радиус поиска. При неправильном вводе значения поменяются местами!', 'Максимальный радиус поиска') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (13, 'min_radius', '0.2', 23, '2024-02-10', '16:00:40', 'Минимальный и максимальный радиус поиска. Считается по флрмуле (найденный радиус * то что ввели здесь).', 'Минимальный радиус поиска') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (14, 'radius_step', '1000', 23, '2024-02-10', '16:00:40', 'Шаг поиска складов в метрах', 'Шаг поиска') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (15, 'road_distanse_multiplexer', '2', 23, '2024-02-10', '16:00:40', 'На сколько увеличить радиус поиска по дорогам для текучего радиуса для найденных складов (например по прямой может быть 100м, а по дорогам 1000м. Что бы такой склад найти, требуется поставить мультиплексер равный 10)', 'Мультиплексер движения по дорогам') ON CONFLICT DO NOTHING;
INSERT INTO public.settings OVERRIDING SYSTEM VALUE VALUES (2, 'prohibiting_validation_pattern_without_item', 'true', 25, '2024-05-19', '00:49:38', 'Возможность добавить паттерн, в котором фигурирует предмет, которого нет в таблице items', 'Патерны с несущ. предметами') ON CONFLICT DO NOTHING;


--
-- TOC entry 4942 (class 0 OID 65899)
-- Dependencies: 229
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.statuses OVERRIDING SYSTEM VALUE VALUES (1, 'Заблокирован') ON CONFLICT DO NOTHING;
INSERT INTO public.statuses OVERRIDING SYSTEM VALUE VALUES (2, 'Пользователь') ON CONFLICT DO NOTHING;
INSERT INTO public.statuses OVERRIDING SYSTEM VALUE VALUES (3, 'Старший пользователь') ON CONFLICT DO NOTHING;
INSERT INTO public.statuses OVERRIDING SYSTEM VALUE VALUES (4, 'Администратор') ON CONFLICT DO NOTHING;
INSERT INTO public.statuses OVERRIDING SYSTEM VALUE VALUES (5, 'Старший администратор') ON CONFLICT DO NOTHING;


--
-- TOC entry 4930 (class 0 OID 41313)
-- Dependencies: 217
-- Data for Name: storages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (44, '55.844604/37.47511602675257', 1, 25, '2024-05-12', '21:38:53', '{"city": "Moscow", "state": "Moscow", "street": "Leningrad Avenue", "country": "Russia", "housenumber": "45Б с2"}', 'Склад в Moscow на Leningrad Avenue', 'Склад 2') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (46, '55.8481933/37.43629885', 2, 25, '2024-05-13', '03:16:07', '{"city": "Moscow", "state": "Moscow", "street": "Jana Rainis Boulevard (doubler)", "country": "Russia", "housenumber": "7 к1 с1"}', 'Склад в Moscow на Jana Rainis Boulevard (doubler)', 'Пустышка') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (48, '54.19237785/37.59598029221233', 1, 25, '2024-05-14', '00:56:53', '{"city": "Tula", "state": "Tula Oblast", "street": "улица Халтурина", "country": "Russia", "housenumber": "2"}', 'Склад в Tula Oblast на улица Халтурина', '1') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (47, '55.8055079/37.4609827807172', 2, 25, '2024-05-13', '16:02:25', '{"city": "Moscow", "state": "Moscow", "street": "улица Маршала Новикова", "country": "Russia", "housenumber": "16"}', 'Склад в Moscow на улица Маршала Новикова', 'Склад далёкий') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (49, '54.1908519/37.62086394743847', 1, 25, '2024-05-14', '00:57:10', '{"city": "Tula", "state": "Tula Oblast", "street": "Советская улица", "country": "Russia", "housenumber": "53/1"}', 'Склад в Tula Oblast на Советская улица', '2') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (45, '55.8494186/37.44653437735897', 1, 25, '2024-05-12', '21:39:15', '{"city": "Moscow", "state": "Moscow", "street": "Химкинский бульвар", "country": "Russia", "housenumber": "15 с1"}', 'Склад в Moscow на Химкинский бульвар', 'Склад 3') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (50, '55.793510850000004/49.10786864522126', 1, 25, '2024-05-14', '01:59:53', '{"city": "Kazan", "state": "Tatarstan", "street": "Baumana Street", "country": "Russia", "housenumber": "30"}', 'Склад в Tatarstan на Baumana Street', 'lkhjgtfred') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (43, '55.84539815/37.41913092041436', 1, 25, '2024-05-12', '21:38:32', '{"city": "Moscow", "state": "Moscow", "street": "проезд Донелайтиса", "country": "Russia", "housenumber": "17"}', 'Склад в Moscow на проезд Донелайтиса', 'Склад 1') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (51, '55.79010015/49.11773784755613', 1, 25, '2024-05-14', '02:00:06', '{"city": "Kazan", "state": "Tatarstan", "street": "Profsoyuznaya Street", "country": "Russia", "housenumber": "32"}', 'Склад в Tatarstan на Profsoyuznaya Street', 'hfrgthbvf') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (53, '55.147031150000004/37.464590878562504', 1, 25, '2024-05-26', '23:38:18', '{"city": "Chekhov", "state": "Moscow Oblast", "street": "улица Дружбы", "country": "Russia", "housenumber": "6"}', 'Склад в Moscow Oblast на улица Дружбы', 'Склад 2') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (52, '55.1459689/37.4602447611949', 1, 25, '2024-05-26', '23:37:51', '{"city": "Chekhov", "state": "Moscow Oblast", "street": "улица Дружбы", "country": "Russia", "housenumber": "14 к1"}', 'Склад в Moscow Oblast на улица Дружбы', 'Склад 1') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (54, '55.1489726/37.4657007341075', 1, 30, '2024-05-26', '23:38:33', '{"city": "Chekhov", "state": "Moscow Oblast", "street": "улица Дружбы", "country": "Russia", "housenumber": "1А"}', 'Склад в Moscow Oblast на улица Дружбы1', 'Склад 3') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (55, '55.786523200000005/38.43910038779458', 1, 25, '2024-06-12', '22:55:07', '{"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "15"}', 'Склад в Moscow Oblast на улица Николаева', '') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (56, '55.784555600000004/38.43996562285138', 1, 25, '2024-06-12', '22:55:16', '{"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "21"}', 'Склад в Moscow Oblast на улица Николаева', '') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (57, '55.7803273/38.44190837439689', 2, 25, '2024-06-12', '22:55:22', '{"city": "Elektrostal", "state": "Moscow Oblast", "street": "улица Николаева", "country": "Russia", "housenumber": "33"}', 'Склад в Moscow Oblast на улица Николаева', '') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (58, '55.771657/37.576457188483005', 1, 25, '2024-06-18', '21:00:15', '{"city": "Moscow", "state": "Moscow", "street": "Электрический переулок", "country": "Russia", "housenumber": "8 с1"}', 'Склад в Moscow на Электрический переулок', '') ON CONFLICT DO NOTHING;
INSERT INTO public.storages OVERRIDING SYSTEM VALUE VALUES (59, '55.76469575/37.56718007593648', 1, 25, '2024-06-18', '21:00:37', '{"city": "Moscow", "state": "Moscow", "street": "Расторгуевский переулок", "country": "Russia", "housenumber": "3 с10"}', 'Склад в Moscow на Расторгуевский переулок', '') ON CONFLICT DO NOTHING;


--
-- TOC entry 4929 (class 0 OID 33116)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (36, 'ddddddddd', '$2a$05$qLjcEBF6xaADj/3.tviQ3.swJ.OYhBqoZq2rQw4eKmt25TiSFYo5e', 2, 1, 1, '123456788888', 'dfghj edfgh erfghj', 22, 1, 'a91dfg5808@gmail.com', '89165188888') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (34, 'wwwwwww', '$2a$05$xqqmGa02tRDiCqKSrhynRu1W9k0Fe.3Z0r/8Z9WwXoO3YrUmfjNF6', 3, 1, 1, '123456789777', 'sdfg sdfgh sdfgh', 25, 1, 'a9165185fdgh80777@gmail.com', '89165185745') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (32, 'gvhjbjkngh', '$2a$05$TcW4cws6nRYYSKlQGhzg4.pHTEqog1/Jns8mXnpKC/23b4vjDzNWm', 2, 1, 1, '123456789188', 'fghj fghkjlk dygfhj', 30, 1, 'a16oukj5185808@gmail.com', '89165189516') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (22, 'aaa4', '$2a$05$5aSV2nOEjLZVRxxoXV8d1.UJagxvXwn81e8eoadlJYzN6CM4Q3.1a', 3, 1, 2, '1234,567891', 'прьюдлррд', 25, NULL, 'a11651185808@gmail.com', '89165185817') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (25, 'admin', '$2a$05$BvuvZwTCsCkKIx79fPN6w.f3JczywjG.GX7GiGLqkZ0EgOpDAPt9K', 5, NULL, 2, '6666,666666', 'Андрей', 25, 0, 'a9165185808@gmail.com', '89165185816') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (30, 'qwerty', '$2a$05$nqW2YPF4JpranVJfsAAfTutqR7lWISINR.EVzWxicx60NJYFHFcDS', 3, 1, 1, '123456789186', 'sdfg sdfgh sdfdgh', 25, 0, 'a916518580@gmail.com', '89165185708') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (23, 'aaaa', '$2a$05$YAX3fGTg6tjLNDhLZ/FnC.5hqmMEfgPAo54T5i9nxqjZBr5T7SDjq', 4, 1, 2, '123456789122', 'прьюдлррд', 25, NULL, 'a21651185808@gmail.com', '89165185815') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (35, 'wwwwwwx', '$2a$05$dyV0FjRjOUiEsPnNCCudr.Y8aZNlsbtGK7kp5eVlsEV52gRPbz1im', 4, 1, 1, '123456789777', 'sdfg sdfgh sdfgh', 23, 1, 'a9165185fdgh@gmail.com', '89165185746') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (31, 'gvhjbjkn', '$2a$05$dHJADP2.sIitKPtOTyoHgeL76Gff7EDoyLyOSRCdb2GJnwmLiyC/6', 2, 1, 1, '123456789188', 'fghj fghkjlk dygfhj', 25, 1, 'a916oulgkj5185808@gmail.com', '89165189514') ON CONFLICT DO NOTHING;
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (33, 'dghbjnkm', '$2a$05$UyJpJ9ADpQsRLMB5bELLfeZawmI3OtBMH7THzg36.Muu2CHgAVq8W', 2, 1, 1, '123456789189', 'fyguhjk dtfgbj ydfghjbkjjjjjj', 25, 1, 'a91ygb65185808@gmail.com', '89165185800') ON CONFLICT DO NOTHING;


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 234
-- Name: external_links_link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.external_links_link_id_seq', 33, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 225
-- Name: incidents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.incidents_id_seq', 422, true);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 223
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 21, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 228
-- Name: items_in_storages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_in_storages_id_seq', 71, true);


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 232
-- Name: items_types_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_types_type_id_seq', 34, true);


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 220
-- Name: patterns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patterns_id_seq', 141, true);


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 227
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_seq', 19, true);


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 230
-- Name: statuses_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuses_status_id_seq', 5, true);


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 218
-- Name: storages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.storages_id_seq', 59, true);


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);


--
-- TOC entry 4772 (class 2606 OID 82325)
-- Name: external_links external_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT external_links_pkey PRIMARY KEY (link_id);


--
-- TOC entry 4759 (class 2606 OID 49573)
-- Name: incidents incidents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT incidents_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 49552)
-- Name: items_in_storages items_in_storages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT items_in_storages_pkey PRIMARY KEY (id);


--
-- TOC entry 4753 (class 2606 OID 49545)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 65928)
-- Name: items_types items_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_types
    ADD CONSTRAINT items_types_pkey PRIMARY KEY (type_id);


--
-- TOC entry 4755 (class 2606 OID 82374)
-- Name: items name_in_items; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT name_in_items UNIQUE (name);


--
-- TOC entry 4749 (class 2606 OID 49528)
-- Name: patterns patterns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patterns
    ADD CONSTRAINT patterns_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 49584)
-- Name: settings settings_name_unik; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_name_unik UNIQUE (name);


--
-- TOC entry 4764 (class 2606 OID 49581)
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 65903)
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (status_id);


--
-- TOC entry 4747 (class 2606 OID 41318)
-- Name: storages storages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 65936)
-- Name: items_types tupe_nume_u; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_types
    ADD CONSTRAINT tupe_nume_u UNIQUE (type_name);


--
-- TOC entry 4776 (class 2606 OID 82328)
-- Name: external_links unique_href; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT unique_href UNIQUE (link_href);


--
-- TOC entry 4745 (class 2606 OID 33120)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4751 (class 2606 OID 49566)
-- Name: patterns соde_name_unik; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patterns
    ADD CONSTRAINT "соde_name_unik" UNIQUE (code_name);


--
-- TOC entry 4773 (class 1259 OID 82334)
-- Name: fki_creator; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_creator ON public.external_links USING btree (link_creator);


--
-- TOC entry 4742 (class 1259 OID 65918)
-- Name: fki_status_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_status_fk ON public.users USING btree (status);


--
-- TOC entry 4743 (class 1259 OID 65912)
-- Name: fki_user_add_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_add_fk ON public.users USING btree (user_add);


--
-- TOC entry 4760 (class 1259 OID 49590)
-- Name: fki_user_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_fk ON public.settings USING btree (user_editor);


--
-- TOC entry 4774 (class 1259 OID 98755)
-- Name: gh; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gh ON public.external_links USING btree ((1)) INCLUDE (link_id, link_descr) WITH (deduplicate_items='true');


--
-- TOC entry 4784 (class 2606 OID 82329)
-- Name: external_links creator; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT creator FOREIGN KEY (link_creator) REFERENCES public.users(user_id) NOT VALID;


--
-- TOC entry 4780 (class 2606 OID 49553)
-- Name: items_in_storages items_ref; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT items_ref FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- TOC entry 4777 (class 2606 OID 65913)
-- Name: users status_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT status_fk FOREIGN KEY (status) REFERENCES public.statuses(status_id);


--
-- TOC entry 4781 (class 2606 OID 49558)
-- Name: items_in_storages storages_ref; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT storages_ref FOREIGN KEY (storage_id) REFERENCES public.storages(id);


--
-- TOC entry 4779 (class 2606 OID 41319)
-- Name: storages user id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT "user id" FOREIGN KEY (user_created) REFERENCES public.users(user_id);


--
-- TOC entry 4778 (class 2606 OID 65907)
-- Name: users user_add_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_add_fk FOREIGN KEY (user_add) REFERENCES public.users(user_id);


--
-- TOC entry 4783 (class 2606 OID 49585)
-- Name: settings user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT user_fk FOREIGN KEY (user_editor) REFERENCES public.users(user_id) NOT VALID;


--
-- TOC entry 4782 (class 2606 OID 82336)
-- Name: incidents user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT user_fk FOREIGN KEY (user_created) REFERENCES public.users(user_id) NOT VALID;


-- Completed on 2024-07-17 00:46:58

--
-- PostgreSQL database dump complete
--

