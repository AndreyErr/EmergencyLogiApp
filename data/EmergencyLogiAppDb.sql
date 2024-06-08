PGDMP      #        	        |            logistic    16.0    16.0 G    U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            V           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            W           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            X           1262    33107    logistic    DATABASE     |   CREATE DATABASE logistic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE logistic;
                postgres    false            �            1259    82318    external_links    TABLE     �  CREATE TABLE public.external_links (
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
 "   DROP TABLE public.external_links;
       public         heap    postgres    false            �            1259    82326    external_links_link_id_seq    SEQUENCE     �   ALTER TABLE public.external_links ALTER COLUMN link_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.external_links_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    49567 	   incidents    TABLE     �   CREATE TABLE public.incidents (
    id integer NOT NULL,
    coord character varying(120) NOT NULL,
    json jsonb NOT NULL,
    date_created date NOT NULL,
    time_created time without time zone NOT NULL,
    user_created integer NOT NULL
);
    DROP TABLE public.incidents;
       public         heap    postgres    false            �            1259    49574    incidents_id_seq    SEQUENCE     �   ALTER TABLE public.incidents ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.incidents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    49539    items    TABLE     �   CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    descr text,
    type integer DEFAULT 1 NOT NULL,
    flag integer DEFAULT 1 NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    49563    items_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    49548    items_in_storages    TABLE     �   CREATE TABLE public.items_in_storages (
    id integer NOT NULL,
    item_id integer NOT NULL,
    storage_id integer NOT NULL,
    count integer NOT NULL
);
 %   DROP TABLE public.items_in_storages;
       public         heap    postgres    false            �            1259    49591    items_in_storages_id_seq    SEQUENCE     �   ALTER TABLE public.items_in_storages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_in_storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    65922    items_types    TABLE     �   CREATE TABLE public.items_types (
    type_id integer NOT NULL,
    type_name character varying(120) NOT NULL,
    type_descr text,
    type_flag integer DEFAULT 1 NOT NULL
);
    DROP TABLE public.items_types;
       public         heap    postgres    false            �            1259    65934    items_types_type_id_seq    SEQUENCE     �   ALTER TABLE public.items_types ALTER COLUMN type_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_types_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    49522    patterns    TABLE     s  CREATE TABLE public.patterns (
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
    DROP TABLE public.patterns;
       public         heap    postgres    false            �            1259    49531    patterns_id_seq    SEQUENCE     �   ALTER TABLE public.patterns ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patterns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    49575    settings    TABLE     <  CREATE TABLE public.settings (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    value character varying(100) NOT NULL,
    user_editor integer NOT NULL,
    date_edit date NOT NULL,
    time_edit time without time zone NOT NULL,
    descr text,
    name_text character varying(120) NOT NULL
);
    DROP TABLE public.settings;
       public         heap    postgres    false            �            1259    49582    settings_id_seq    SEQUENCE     �   ALTER TABLE public.settings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    65899    statuses    TABLE     l   CREATE TABLE public.statuses (
    status_id integer NOT NULL,
    title character varying(100) NOT NULL
);
    DROP TABLE public.statuses;
       public         heap    postgres    false            �            1259    65919    statuses_status_id_seq    SEQUENCE     �   ALTER TABLE public.statuses ALTER COLUMN status_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statuses_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    41313    storages    TABLE     V  CREATE TABLE public.storages (
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
    DROP TABLE public.storages;
       public         heap    postgres    false            �            1259    49505    storages_id_seq    SEQUENCE     �   ALTER TABLE public.storages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    33116    users    TABLE     �  CREATE TABLE public.users (
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
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    33115    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            Q          0    82318    external_links 
   TABLE DATA                 public          postgres    false    233   R       H          0    49567 	   incidents 
   TABLE DATA                 public          postgres    false    224   pT       E          0    49539    items 
   TABLE DATA                 public          postgres    false    221   ?]       F          0    49548    items_in_storages 
   TABLE DATA                 public          postgres    false    222   ]^       O          0    65922    items_types 
   TABLE DATA                 public          postgres    false    231   �_       C          0    49522    patterns 
   TABLE DATA                 public          postgres    false    219   a       J          0    49575    settings 
   TABLE DATA                 public          postgres    false    226   �d       M          0    65899    statuses 
   TABLE DATA                 public          postgres    false    229   ]j       A          0    41313    storages 
   TABLE DATA                 public          postgres    false    217   Gk       @          0    33116    users 
   TABLE DATA                 public          postgres    false    216   yo       Y           0    0    external_links_link_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.external_links_link_id_seq', 33, true);
          public          postgres    false    234            Z           0    0    incidents_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.incidents_id_seq', 393, true);
          public          postgres    false    225            [           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 20, true);
          public          postgres    false    223            \           0    0    items_in_storages_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.items_in_storages_id_seq', 59, true);
          public          postgres    false    228            ]           0    0    items_types_type_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.items_types_type_id_seq', 34, true);
          public          postgres    false    232            ^           0    0    patterns_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.patterns_id_seq', 141, true);
          public          postgres    false    220            _           0    0    settings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.settings_id_seq', 19, true);
          public          postgres    false    227            `           0    0    statuses_status_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.statuses_status_id_seq', 5, true);
          public          postgres    false    230            a           0    0    storages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.storages_id_seq', 54, true);
          public          postgres    false    218            b           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);
          public          postgres    false    215            �           2606    82325 "   external_links external_links_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT external_links_pkey PRIMARY KEY (link_id);
 L   ALTER TABLE ONLY public.external_links DROP CONSTRAINT external_links_pkey;
       public            postgres    false    233            �           2606    49573    incidents incidents_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT incidents_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.incidents DROP CONSTRAINT incidents_pkey;
       public            postgres    false    224            �           2606    49552 (   items_in_storages items_in_storages_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT items_in_storages_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.items_in_storages DROP CONSTRAINT items_in_storages_pkey;
       public            postgres    false    222            �           2606    49545    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    221            �           2606    65928    items_types items_types_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.items_types
    ADD CONSTRAINT items_types_pkey PRIMARY KEY (type_id);
 F   ALTER TABLE ONLY public.items_types DROP CONSTRAINT items_types_pkey;
       public            postgres    false    231            �           2606    82374    items name_in_items 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT name_in_items UNIQUE (name);
 =   ALTER TABLE ONLY public.items DROP CONSTRAINT name_in_items;
       public            postgres    false    221            �           2606    49528    patterns patterns_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.patterns
    ADD CONSTRAINT patterns_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.patterns DROP CONSTRAINT patterns_pkey;
       public            postgres    false    219            �           2606    49584    settings settings_name_unik 
   CONSTRAINT     V   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_name_unik UNIQUE (name);
 E   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_name_unik;
       public            postgres    false    226            �           2606    49581    settings settings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_pkey;
       public            postgres    false    226            �           2606    65903    statuses statuses_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (status_id);
 @   ALTER TABLE ONLY public.statuses DROP CONSTRAINT statuses_pkey;
       public            postgres    false    229            �           2606    41318    storages storages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.storages DROP CONSTRAINT storages_pkey;
       public            postgres    false    217            �           2606    65936    items_types tupe_nume_u 
   CONSTRAINT     W   ALTER TABLE ONLY public.items_types
    ADD CONSTRAINT tupe_nume_u UNIQUE (type_name);
 A   ALTER TABLE ONLY public.items_types DROP CONSTRAINT tupe_nume_u;
       public            postgres    false    231            �           2606    82328    external_links unique_href 
   CONSTRAINT     Z   ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT unique_href UNIQUE (link_href);
 D   ALTER TABLE ONLY public.external_links DROP CONSTRAINT unique_href;
       public            postgres    false    233            �           2606    33120    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    49566    patterns соde_name_unik 
   CONSTRAINT     [   ALTER TABLE ONLY public.patterns
    ADD CONSTRAINT "соde_name_unik" UNIQUE (code_name);
 E   ALTER TABLE ONLY public.patterns DROP CONSTRAINT "соde_name_unik";
       public            postgres    false    219            �           1259    82334    fki_creator    INDEX     N   CREATE INDEX fki_creator ON public.external_links USING btree (link_creator);
    DROP INDEX public.fki_creator;
       public            postgres    false    233            �           1259    65918    fki_status_fk    INDEX     A   CREATE INDEX fki_status_fk ON public.users USING btree (status);
 !   DROP INDEX public.fki_status_fk;
       public            postgres    false    216            �           1259    65912    fki_user_add_fk    INDEX     E   CREATE INDEX fki_user_add_fk ON public.users USING btree (user_add);
 #   DROP INDEX public.fki_user_add_fk;
       public            postgres    false    216            �           1259    49590    fki_user_fk    INDEX     G   CREATE INDEX fki_user_fk ON public.settings USING btree (user_editor);
    DROP INDEX public.fki_user_fk;
       public            postgres    false    226            �           2606    82329    external_links creator    FK CONSTRAINT     �   ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT creator FOREIGN KEY (link_creator) REFERENCES public.users(user_id) NOT VALID;
 @   ALTER TABLE ONLY public.external_links DROP CONSTRAINT creator;
       public          postgres    false    233    4745    216            �           2606    49553    items_in_storages items_ref    FK CONSTRAINT     z   ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT items_ref FOREIGN KEY (item_id) REFERENCES public.items(id);
 E   ALTER TABLE ONLY public.items_in_storages DROP CONSTRAINT items_ref;
       public          postgres    false    221    222    4753            �           2606    65913    users status_fk    FK CONSTRAINT     w   ALTER TABLE ONLY public.users
    ADD CONSTRAINT status_fk FOREIGN KEY (status) REFERENCES public.statuses(status_id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT status_fk;
       public          postgres    false    4766    229    216            �           2606    49558    items_in_storages storages_ref    FK CONSTRAINT     �   ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT storages_ref FOREIGN KEY (storage_id) REFERENCES public.storages(id);
 H   ALTER TABLE ONLY public.items_in_storages DROP CONSTRAINT storages_ref;
       public          postgres    false    217    4747    222            �           2606    41319    storages user id    FK CONSTRAINT     {   ALTER TABLE ONLY public.storages
    ADD CONSTRAINT "user id" FOREIGN KEY (user_created) REFERENCES public.users(user_id);
 <   ALTER TABLE ONLY public.storages DROP CONSTRAINT "user id";
       public          postgres    false    216    4745    217            �           2606    65907    users user_add_fk    FK CONSTRAINT     v   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_add_fk FOREIGN KEY (user_add) REFERENCES public.users(user_id);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT user_add_fk;
       public          postgres    false    4745    216    216            �           2606    49585    settings user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT user_fk FOREIGN KEY (user_editor) REFERENCES public.users(user_id) NOT VALID;
 :   ALTER TABLE ONLY public.settings DROP CONSTRAINT user_fk;
       public          postgres    false    216    4745    226            �           2606    82336    incidents user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT user_fk FOREIGN KEY (user_created) REFERENCES public.users(user_id) NOT VALID;
 ;   ALTER TABLE ONLY public.incidents DROP CONSTRAINT user_fk;
       public          postgres    false    224    216    4745            Q   T  x��TKr�0���l��$1Ɖ�����1�`� �	�̀�M�;�]�=�{�J�t�i�O�O������=��rm����Wd�I��ӧ������/����aH� �1�ɲ�~�R՛ '>��
��8������19g�_���z�i�qp[0��n���h�{Y��\U.��p���	�������������Lo4�M�tSp��(JCZć� D
j^*�%Ҥ�:l�j��$:��a[�6\е�e�w���'�u��b̘F���
���V_����5����S�tM���4�INu ����S������ˈ��ϷN��8�8%��!Ev�� ��t1�͆x��p�׎���l>5��+�xs��8�ƫ4���[�����)��� f��ro�yn������N�f�v��l[z��1۲@uhx7}�pdKoS�������w��-�Z�bo(�!�c��D��m[�d��A��j���Dԙ��r �D�����֚+W����M�M=����}��|t;�?���;Z�nwaִ�����*�
���Rz��&R��^I��QU�M��ɇ�L�́.��H��?�:9�����      H   �  x��\�n����S���-��˙a�vo" ��٢-�c�TIʉH�]`�z�wH�M��m�W�ިg�"%�Ŏ%'\�AD~�9sf�;��Pi��[Y�pګk�p�5���(�F�0�3��w��&I
�$���<�t�> ˣ���Q���o���W���7۫��{���r����;�W��9�SA�;�q�򘢄���LE�F�����{�f���;O�݇���|;57{a�;!\������0��.�a����4�s���0u�;n��(���ttH?χ��� ��~��>'��۾���$�~s�A����q�q0�Ż�y�����&����дu�������߬��m͸Q��x�/�W�g���������� o�w�!|�A��n%�i����7�<07�0�¸v�"��k��H7��A�	��t'�d�0�釔�U-]%��!�<
Ұ� t)��/�`��ý�Vh&�t/I�/Y��j��`�Gy�z�I�T�8<Ԥ ��%ė������k�΍�կ�ol87לյ�����]k:�KKxK��H�X5����~�
�|ʛKxf	o	�X��>n�FbKxK�E/i�l,�����_,�OPs	�,�-���T4��%�%�b	�Mxa	o	�X�{>�Kx�,�-���a&�=i��_0ᕏ��/���4»�пw�2z�(�K�=O���b]r;Žڐ~T�{�L�����x�k�㣠S����y�������oP�jq�u�f;�7��܁&���^<O���^�3���HW�S�Pʪ����3̛����# �\���5��S��=��W��t�g�>op�'�V��yI�	oO�-�m��Ud^��{&�A�"+D�
!�>j���>^�a�T ɸDDQ�V��}��c�|�TO���25u%J1c~��GP{�'M��g�7������� 1�[ޘ�g��M��&�R*"�Dj�ʖ$�X}��pY}8���Y�j�ր�b)9�SK`��4w�'��:X)j�����g�2ŕY�(�c�Z}���P}�W�/�}
���
�����0��w��.`��Ma�ÜO�Z�^ "��+4�|�B�>���y�_v%S��Is�FM��Ì��3�S���
�������~/�z��ҫ�!&u��z��ި|�/! ���3��b��r�q�̹���H;�u��^ɯn�hn���~�_M���n�u�G���  	0O��8���q��ȿ ��C0��0�B]P�<5F�GY4}�G{[aj�9�O��p˾�	����9Y��΄��bj�����f�<$Z�p)V�"H�M
���)�Z]�I��{��dx�F;�\��V����$��0��=�A����2s7����=�Rv��=MJ��!����������yu�Q:����`��F{���f�A QW2ד��0����'��V�X_U�qݩ�DN�
3���A=���x���z��0�L�v�(i��"�bHa�'����*� C�(�q�)�b`�1���*걣�OpN�8�5����ONq\���������Ci�cZ��%&8�������f`�jt�*�X�)Nk\�k�3�
,k|�KΕ��d����..�Lq$��g������v_���d5TL��U0,��ksS��Q��|P@�y�>@�	�lI$��)��p�,�AI�l�n����3+ �n�13l��An0��L���!�fm�L��ʖ��#����R3���̖.���l��6�j�w¸��{��P7 =�냅��ɡ>4ޚe��3;v~
`�3J���:ܑ�?�rP�� �w�~'-��(��8�I��'
��!�xr<�&��.�G8bǲ�V���c�y��%�ޓ,��d��W��F NM|fG�(�����r���K��Z�<I��6+\�Z�=���K�K:�)�ThAf��)�r<k�.N�2iS�'O9���9Y:�rD�# ��N9�x���K�S�씃���b��3��
sNy6s"�����s�L��b�Cv`�����wd.b���շ��hq�y~S�pbs&Q�aK�y`�=�L��+�{���\dG�fZ���6=?-^h��+����d��{Nb�?{a����9U?���VYn:�ZSD�v�߻�n>�����G��#jK���B�6߫~K�9�q�N/J2���7z�%��7��OqcO���a5�x�|$ŸH3I0>�\�)���#׮���4      E     x���v
Q���W((M��L��,I�-V��L�Q�K�M�QHI-N.�Q(�, r�r�5��\��<]<���#�C\}�}B]!d�����������]l������.�P�Q��x��{/l���b���b���@��:
�@K�����|<�C\���C<�Zsy���� N�����.l��|�	�$�k7\lU',o4 79l���z��ul"��&n�0w_���~L�b* ����6���p&$��v ��Cs      F   B  x�͗Ak�0����9�B(�$F���6����BO��.EhwKu�':�;9hBP�x��:�VM�w5|ߎ���n��_c?\�q���}�GX��q6t<�O��eZC}���m������8<���roae2R	0��L��6�ܹM�|�=����m�&�\5?�F�8� �N�� 
�`�t�Mc�b�����|�#�Q����22M�yLA-�c�i�EC��,M�;�&����+g����d�0Z�P���a2�)\� �Ӏ*c�1�L0)��Z;|?��2
e
ꦰ��I#)�d�R4�C���,��{�oeN��c/I~��N      O   F  x�ՒAKQ���+�N	�v�B��p&����6�%͸p����]����0��p�?꼲� �Em޻�����7�i��ӱ���kx�e/p�~)�\��j+y����;/��_9�׵F��DVQ/��an��k;�6��;��jS2�IQ�/��c����ÄҮчП8�}yF(���aѫ�g�=X�,�I@>�Hp�
�7)k�y#�P�"�r�0˚f�"�����c���T3�~�����iZ1��[�|���b!��xG�}@�`�A�B�9@3��= �C��}�H���ꟈa	�ox�g�Ȭ<贽#�@���=��h�����      C   �  x��W[kQ~ϯ8�KR0aw�4���
���""�h�x�^D�\($��{�l���/��G��U�eרhi��=3s��|���P8��I(�����W�KeIשZ�Ȃ"{�,�4%� �J�%Um�((�T���JEQi�C�%���5�ji�	�l���z(�������M����.h��Ȃ��{ȼȋ�E޿(.��/�� �dW�o�0�#vn��z�T(��(U9܌�[�����"�2��:��Z�9�u��JPJ)����5�Cv�n�9����J?�Je�����Q��6��)���I��.�*EM��V9M�tC�:�����}`_��Հ�/Y���v�B=P�r{R�@eV-9�NC�(p5+���~k��%k�_����g(p��E¯6Bkq�!�H���\��� ���V�����tl���aM� ��y���NO�܍� �)s�\�p�~���U���4�o{6�li[��Z���5�#�R�:��7�ɚ3f�{�2��%�d���Q"��vN�.�p�S�De~|�h�aei��R>_Z���oH8�*�p�����Q�R��ry�_i5~����y)g�;�]w
��c�MC�� o���W������Sv]�R,aM��Fe5�u.�}g�=0���[���Yۣ�8D�h>+�L����5�[���!�!�v��Gs����m߱m ��a���J$����E,@JO��Z�ag��[G�%d���R�a6��*�hZ�-��}(�rR'�L�!� �+�:Z��<Ä��d�qZp����A��W�¸Uc���6�����ж�'{�<���]v����b�^|Y�r��ǻ�vLz?�:�n�ݟa��v5Fé���f$�68��P�k��]��Ku�z3�ǚ��brȕw:a�������oI�@���G�<
      J   �  x��XMo�F��WlN�� iɭ�S����Tl7@O-��E�����e5M
1���6��=ʊ����ԙYR�D�Hz(��-�ڙ�}o��#s�ݭ�=���m�jm�(
k.�<Q~�a�X�*�;��5����1�-���b��q��b�(E�6w�
3=~⭲��[;;����7l��ݽ����}����]O��#a�ܴ�,�	7�*��2�^��#W�f��k���&�״lF��^˿dG�S��g��ײ%}�^�e_��%����)�A]qdp&�*�ax?��a��D3�`Cy�`;���܃=�p������}��[ ,5�V�eӲK�,\ϱ`�,ݘF�@|�#��i��Wم=�`��������d]0 )Fh�)��;9`0�-����A4لd�"��K���|���QS.8���c��Ho��r
��c٢暶px����4-�������g�ɟ��4�:�-��p� �T�]�} [9`)b%�L���ex�E*��8L��aM�����mr�Ĉ�&`6P�N��=�H��/��S)�cj��Y��^4m^G�yfTS�P�!�vfP��:�OX�� V( �$�[H� �T�RY@ɐ �s�7P�A(r���>|��a��#
U�&B���;����t*����c}�u|=k|���gu\��[������'�n��R,x?���Y���q��-6y�IYy�S^��nrssp�YC��tFtB��R����H��
�-�<����(�sr-;Ac�2���
LȔ�$r,4x���cn����}*�UX��f��=��a��d�l���z��e���� N⨤3�"�Fm����@�7����G��bj��W����J$oQj7rs�^lnt���I����LBd[�4]iea� �Շbo�<�?�;������@�kձ�ag	~��SPN	 B�ر�I2+�gD �/� "[��|��5�ȋU��5Q��#J�1�
��c�Up�؊5����t-7n��������}e1�aF_�°�Z8
���=�L��S&u�^�"�F�.���a���\��5��q;o�����$��Z%��U��gؤ$�����Ml5a�&]Ϝ�}::Hx�r=��T+z�Z�'�}?�����(̰�T��y54����6�
�H���{2��0�Sl)�`��Ӥ��%<����"{�>{�XL�:�[	���C	�kW�N*�ލ�apcBգG�������]�NK�NҦ�)�f���K�O�F�7�:�C�/p^��[T�f��<��cၝ�F��sj|���fv�B�5 pߏ��q#c�/R��~����Ö�k`���kG��M�d���>�U�\�b�52z��]3����b�0��kS���*���#6�      M   �   x���v
Q���W((M��L�+.I,)-N-VЀ��3StJ2KrR5��\��<]<���#�C\}�}B]!d���������6\�xa��}v]�q�Ho��Uj�Sp��s��tQp�W��� e��I]W�\1h��=�C��ta+�O?W�\�h;.츰S����v�	�Q.l��蠽��i���"�K�]l��;L��2��� W��      A   "  x�՗]oE���+F�I*��|��rզ��lS�+��7�����#(EHI#!�"A�^�ܛ��4%�/��#ά�b;��1H�}�����Ͼ眩֚ۍ��Zu�e���+qF޾��^���a�!N�$��(����v�{��8�;Jzc#�Ӊ|�#�|�ҏ��T���hT�Tk��g���]t��Χ���&�༌օ�8�K�7��p%��J%�P�eDʈ
��b�obq��u;".s\���ץv/9*��t7���W�2*���OOE��ع?����A�� ����0�(_���qϳ���?Hv�����y��Z�Ɔ5��s���3d��ad.� M�?u5]ajh�^{���Bw�Vo}"��V}����h�r@LR�8�N��q`��b�����C��bt;L���u�F'-��FQR
�s��"T��7���f'���Q�,3X!z���+DS��#,>��v0Ք��,�"v���V��&�	T��{q2�1;�ϲoAb���;͎͙U�(řF9D87����1��oX�t�7��C��Q�J�Y�Q���L7��Of�Ë>��#�ye������09"�x��u���ęy�Bh�Ȍ�$G+)v$�\q����K�^���'6�e?��_��`�3��%;΍���b&F�Os��܎\
�!�2�����v�r~�4vf��_��\Dxё��ʘ}o-�6�(R�Z��D���f���p��\WV�t$�ʫH\�/Ï�^0�@/�"�8o{�m3�Ù���i�Q�!�ɥ�����/�����!�F6L;$�S8фaM1'�q.�0�����6�yn���>��X�_d!a�\�੅[lj��[y���5�$���	!ɜN��P�\�\�D�^������`NZlV {Sw/�O���{+D��W��&�]&И�&AR��Zy~\����8������nx8�p7O��;5@�yTۼ���X��ݍ:�'�tF�ʹ��h��RS� o��vO���[��G�k��NR
��b�1D���c쭢3?�7n�����?�	K`      @     x�Ֆˎ�F���,Z�D�0w�����������\�c��Ey��"������R�N��tO����PAQU?:G眡����e]A���w�h����T�>�F�#���$IIR�f��[����ބk�D��R�DB��� 0������p}�׉B�'D���:�r�V�.N�yG���QC>�Di�G��x��vpvO�{��׷j�'L��V���;g�B�]�#o���~̷rC=�,/x
����	���k�W
[��!p�y�1
�r<��|�p&�v�s4�q�إ�6*%P��mg�'��'yDV������2}�s�5�a� V�5�@8YI�c�Y���jCYE��yqr�'�G�ޠ���[��R81,)���wt)?�!�7��,��$Z
��_����A`D�
.���S�j�/�;�g��;��u{�/#�\f���=�m�,�~��-^C[�0���}��K/�ܰƷ{̎�\�~7�ض5������\�^�/پۗ��me/t�i{�_��9���d*+u/�]��<=?^~���fԾ�h�M�%  UcJmN���I�z:E�9g��l��q��nrf�:�?�H�1K��l�*�??>y���t�>=^�^��3I�2n���t�[�K2��_�!�%o+v{�	t�E��х�|�*+�G�8<�9R��]���h�͚VZ)lTEͬ�y('�v�51��w�V7�� ��jdW�%i�u�I=Ii��<J;q0-{ډhJ��vx��u�@�&x1<O}���%��^�����@ү%�T#ls�穞2s�d�<�tŁ��'��?fw{ڜ��8�	[�nθ��ђF~[�ޫf�ي�~�Nw0�SM�n:���^D۔X�oY�(D�T(���?
�@r����n��3D�o��R7I��0t6^�j�g�h?jw��C�J�.�%�2� ���v'V�m�A'YF��3���{�����N-{�!E��7;���y��^þ���e�$�     