PGDMP      1                 |            logistic    16.0    16.0 H    V           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            W           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            X           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Y           1262    33107    logistic    DATABASE     |   CREATE DATABASE logistic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
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
            public          postgres    false    216            R          0    82318    external_links 
   TABLE DATA                 public          postgres    false    233   (S       I          0    49567 	   incidents 
   TABLE DATA                 public          postgres    false    224   SU       F          0    49539    items 
   TABLE DATA                 public          postgres    false    221   xu       G          0    49548    items_in_storages 
   TABLE DATA                 public          postgres    false    222   �v       P          0    65922    items_types 
   TABLE DATA                 public          postgres    false    231   ,x       D          0    49522    patterns 
   TABLE DATA                 public          postgres    false    219   ey       K          0    49575    settings 
   TABLE DATA                 public          postgres    false    226   �|       N          0    65899    statuses 
   TABLE DATA                 public          postgres    false    229   �       B          0    41313    storages 
   TABLE DATA                 public          postgres    false    217   ΂       A          0    33116    users 
   TABLE DATA                 public          postgres    false    216   ��       Z           0    0    external_links_link_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.external_links_link_id_seq', 33, true);
          public          postgres    false    234            [           0    0    incidents_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.incidents_id_seq', 422, true);
          public          postgres    false    225            \           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 21, true);
          public          postgres    false    223            ]           0    0    items_in_storages_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.items_in_storages_id_seq', 71, true);
          public          postgres    false    228            ^           0    0    items_types_type_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.items_types_type_id_seq', 34, true);
          public          postgres    false    232            _           0    0    patterns_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.patterns_id_seq', 141, true);
          public          postgres    false    220            `           0    0    settings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.settings_id_seq', 19, true);
          public          postgres    false    227            a           0    0    statuses_status_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.statuses_status_id_seq', 5, true);
          public          postgres    false    230            b           0    0    storages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.storages_id_seq', 59, true);
          public          postgres    false    218            c           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);
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
       public            postgres    false    226            �           1259    98755    gh    INDEX     z   CREATE INDEX gh ON public.external_links USING btree ((1)) INCLUDE (link_id, link_descr) WITH (deduplicate_items='true');
    DROP INDEX public.gh;
       public            postgres    false    233    233            �           2606    82329    external_links creator    FK CONSTRAINT     �   ALTER TABLE ONLY public.external_links
    ADD CONSTRAINT creator FOREIGN KEY (link_creator) REFERENCES public.users(user_id) NOT VALID;
 @   ALTER TABLE ONLY public.external_links DROP CONSTRAINT creator;
       public          postgres    false    216    233    4745            �           2606    49553    items_in_storages items_ref    FK CONSTRAINT     z   ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT items_ref FOREIGN KEY (item_id) REFERENCES public.items(id);
 E   ALTER TABLE ONLY public.items_in_storages DROP CONSTRAINT items_ref;
       public          postgres    false    222    4753    221            �           2606    65913    users status_fk    FK CONSTRAINT     w   ALTER TABLE ONLY public.users
    ADD CONSTRAINT status_fk FOREIGN KEY (status) REFERENCES public.statuses(status_id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT status_fk;
       public          postgres    false    229    216    4766            �           2606    49558    items_in_storages storages_ref    FK CONSTRAINT     �   ALTER TABLE ONLY public.items_in_storages
    ADD CONSTRAINT storages_ref FOREIGN KEY (storage_id) REFERENCES public.storages(id);
 H   ALTER TABLE ONLY public.items_in_storages DROP CONSTRAINT storages_ref;
       public          postgres    false    222    4747    217            �           2606    41319    storages user id    FK CONSTRAINT     {   ALTER TABLE ONLY public.storages
    ADD CONSTRAINT "user id" FOREIGN KEY (user_created) REFERENCES public.users(user_id);
 <   ALTER TABLE ONLY public.storages DROP CONSTRAINT "user id";
       public          postgres    false    217    216    4745            �           2606    65907    users user_add_fk    FK CONSTRAINT     v   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_add_fk FOREIGN KEY (user_add) REFERENCES public.users(user_id);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT user_add_fk;
       public          postgres    false    216    4745    216            �           2606    49585    settings user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.settings
    ADD CONSTRAINT user_fk FOREIGN KEY (user_editor) REFERENCES public.users(user_id) NOT VALID;
 :   ALTER TABLE ONLY public.settings DROP CONSTRAINT user_fk;
       public          postgres    false    226    216    4745            �           2606    82336    incidents user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT user_fk FOREIGN KEY (user_created) REFERENCES public.users(user_id) NOT VALID;
 ;   ALTER TABLE ONLY public.incidents DROP CONSTRAINT user_fk;
       public          postgres    false    4745    216    224            R     x���ݒ�0�Ͻ�̞���*	�=rAݸ*��� "	��H���{����u�;j⺝�t�t� ����{ȼ�d�s=��瀼\f,�E�6A���MZ g�s]lb2 c��l0�Z���{ި�5�!g��P�O�?���>�ӷ�W��r���z���n�7E��� �@!��7�v�4��T6u�y.z��-lx�t q�;A���uĄ���U�ER�	=�|���%%�hI��N�tM���*�M�t ����*|>u9t��i�|�A��/�-ѽΣ��Q��� ��C���aC<y0\����n�4�O�a�&�R�R��-���8��xϖ��&�5��.0_J�����5���I&ǜ4l�v�`�/}���Y��tu7}��2��?���)փ�����'FK�M�6��Q�3��v�'��#�{����$��3��������{2Wj��en;63?�$���~n����Q�����a�7��~�ʔ�W��*W��h*�xIi�[��X���2ɛ�~%m�I��"j� �T~ ��2�      I      x��]mo[Ǖ��_���
=�/�Om�&Zp�.��!�e��D�������vh��.��@�@oo�t���홹w^H^��ԥ$�i#>�=3s�3��ܽ��6��{x�qz����������'�a���?x����w�}���_?~��O?��O~�A��7��k�����-%,g����;\�$�c�~ �>o��f��y��/�?����p�y҅�����Awx�?vᏽn�Yw�q0�7�����hG�������9�p4:m߹s������� !�L��Q�������h�f�adAO��ޝ�g���s�����;��p� �z�����S�������~t���_|�{V&��O�W�����w�����o���_�m�6ϧ��;p���z����~���Ψ�_�v{0���=��S�J�C��:{G��γ��Iwwx���7�to�O����)���3��φ�K�,��������î_�B�� �28,�Lz:�������N�����h7��?���N���SF�x��w�r�iK�&�f���5޻��?���������?���߹��"+TdT������W�5*2*r����\ի��~E6mj�Ud�����E�9���Pd*��+���Y�j��_>=|�����7�um�A�����>s�{|v4�u?�fko��������^]�����K���7��#�j��1��1����\���w㿻�M���_M��zNh�D������=w2�w�}z������p��i����pT�3�z���������_���i~����NF�郳��q�����c?)M*�o��������'~�H���}�b��V�G�6�1�UD�4��j�e��u���kP�5�1�������:}>�=9���I��A�����i��vO>�#�i紱ׇQ���T���*Ì�zǠ�αS�f45�!;C��_���NFŮ|��F���p����V�ؕ�f+�_gt�%����q�3�W0*;�`iL9UTV��X�$>�>�w;��~H�>��A%�:����X�a޵t��G����څ��<i�%띀���?)��+1���<�BF�kJ\jeNc{�H������pp�#�au�xt�5����F4=UjL�yĵ�2��=US�LJ)�R
�S�����f͉f	Oͅe4�%��(�!�AL������ 3�S�����S�O�n�8ՑTE(��Ե�fZ�h�(g�2��uzG�����W�����P$�TxM��������cp�I���C4��r��݇������z0@�����"X�Z�Z�� ��Aw�:#Q�w�'{�ݨ:Gî{�I��>���W�-f���K{ �s�{�j �� q�Y�= 71�O{#�L�Gݓ'���A��hp�u��<s������pJ�Â( 8�v#�"Ĕ����R�Hx[*�V�v9M8M.�,W��h�@��PZ1�,��X.���W�>����fLf����h+A]b����	�2XmP���.�K�w��d&��\��1��,3�L��R��.GO� [�����w9�kYa��s�l�}%�N'�|�Sy�o���c���}gJ���9Ic;/��ǥ����҇t}��G?��>(Nb�)l�!N�$y��Q^����Qo�%T�Y�v��OA�{'�̨����nZ9-	���$�`D8����	dz����t������p��<_3��tr���������Q�//�c�z������.YZ��>T_�L����mK��z�-SrZjA�,5�Q��4[oJ5��ips����KES���
�h��A�N|��\� ��_����j]_��7��_���נb��§��5sn�[�w��������u��[�p�"u��zEO�vd�P�zI�R��!��;ܴ`"��e�[�$5{@{��� ɺ��W��H[��Imo��ق�m*�u�A���Ԛ�Z�!���@h��g��0*ݍS��gs��e��6x����<�̃l�)ϕ������滌L85�.��-���i�N͖i!O�)g	������[��D��^Y���ڔ�WmI�M�H�V�l�c6f6���7�����a+���Oh�7?
��ح�+�r��h^>��6��P��W���8�b�_�=�߶���մyͶ��mEۺ�L �y��pw��2�R���|:��v�tm;�-ҵU>jU�v����M뽸d9&�n���$ߖR|�<fK�������1�Uy����@&��$ k�ziF[���E��,�������� �pMDcEQ����q����-.ڴ��Q��q����-�ڲ�@]��-�[�����������-�[��.��o���îx��F�ٸ������
�Fb
�nEsL۴�*x�y��ڬ�;�X���	^��Wd[��T�L��L�²!a�!�F˂�e�\���"uUoB�ZSd��絧'M��$�����o����}�9�U=vݜg]w�����!W�l���6��������yo7��
Ɍ�Se�af�?�o@�^����f���������♲
E	����i(�S ��>~r����A�W/���_7�߻���b����*%L��Ee)����W�Z��7�p��=�� �j�<ZApL�7-�Y^A�K�CjV/������
\yKVY^6�*K���� ̖*d_k����x%��X_A�$�����,����aCɁ	���ΔI8�piK�i!2\���%*�2kM���wx�T�2�G\�(=�6�/����Z�����G����2�/#̭Nݐ4	��8,��L�0i,�ʹFL�4��XyR!/iв�+]a�e������0Q�����R�+� �ىo�;�eu�,�va��W�0�J�|���U0���s�Z	�����;%���ͱ�����?�</JO�W����nj�3��ƻ�tz_�/5����(a���r�#��2�]k�+�|��<��t���w�ya��.0a���!su�6�̕q�0�T���L��'J�\���M8W��W���"�V������<�`�s�4�J��.fIR�w/,2���95����S��8�S3���,��F�LJn�������?_cmm���\�V�4,����dpln2�*ν�2���k�3�&\f��e�G%���̙B?�G<9G�����亳�}Aw-X�&ݗmI�
���o-v_rg� �t��MOy4xm�<�>Ŕj���N|������_����e]l�=8wk���r�*`6�Z�'}�*����c�;�D�X/S���v[��[S�g���� �����u_ძ.6̄7�����a��0�Ŗ��p�u]0�zs5�p��Iͥ�&ur*���J/B~֛���R�2��]]����Ha���㶘���8��
��������aƾ�c���_5��?������zgǗ���:"!�5�8"
j)'N/���'������)1Њ����3"���H�C@\9(f��3"�/#|؝e�U�x(�i���R�	�RSK&Έ�� 0�#����*k~!�@2�"wA�	���<�er��R&�����a�%\�:�L�����/���eGh�`.YGKcNyx,R�8����fu��$�ceL�.u9k�H���������:Use��R~8!�l:M�	�K�p�B{�2��,eUU#�Y�$��4L��֪�s���q��)Lyzt8Ob�91��t*�`���xzl�ބ"���=�q*Mµ�c��D��17Ύ`	72Kg�k9�"L�IiaFX�N8'y`���(�r<$N �i��I�q�2y@Wy�A���2��I��mlo�N8Q�0i\�?�"�2l-@Ӣsw؏��p]V\f�#���+����0J%!�T��H����4�	vz�]*���ei*�v��n�v��"��6Ur��9���q�p��P5K�9�\WK��Q��P4�Z���C��0�1�x64�<���i�8&q�N��U6e0�L=@�b?&���\N0�a�0ڄ�_f���r0F*�65': 9��c]���a    Tf� ᱠ9Y{Cb�"��v��U2�cJD�6��%��L��T��b�6{.X� �&,�5rj�|Lg��g��E�����ʜF�Թ<�����q���?l�Џ!$�:����gV��Џ����`��ͬ�����VPY�u�-��X��~�b��AO�F�v�'�[!�Vm3�.���lM�SB��%��IO�&!f�V�]69�;pٸ�N���s�T�8�6mS���R{���uL�l>UQd�g�5�<�F����=�?�c�b2��u��n$��Iϵ"�#�X�k��3^�_ʣ�)s6!m�����lLfj�U*�l�����P2N�#�S�*�}��S���&F$i�a�T�!���h&�M����=����d������=&7�.k��!�c��+�h���#.b4.u��+���>�����l�&p��G��D���Op	gaK�B��gnB�MTjo �,���8,�)a��M�!�Lh
��نx
� ޥNn���9�q��i�i��A"�&pM��c�?�jo�`Y��,�iQ)���n�a�R����mb���,(�p�
k�����w�v?�&Ύ���K��>vO��e�Np�Q��pw�-�B�Y 5b	�^#.d�M\E0�������Կ$�dxT5ح,xKAҁp�*��$=b����d���F6f4mh�R7p��8��jp.�4Xb-�Өl�i����|Jy�;��}z,�7�g�#en��x�q��~XL�4�p��\G\�(&4��D�-xt5`������s<�K�i6vǥ3<32�6 ��:�L��IbRw�bI�(F�[*c�a6#�M��t��N�����e����;���O�h� ^1z���)�^S7%Ձ�.�NmU�|�W��j�>�?!�Hu��hpv��%uAk�t�;��C(�3=x��St���V�pX1����Ʊ̰�p��-�i�mѸ�ɷ*MY�ŝ�Z�el��VR�~ps8�OaZ�o��͑rO���;W�̗}�or	2�J��(��Ȳʧ���~�E�f�X�Aٖ5_|Gf�]}?�४����;?���oӯ�x{@e���e�9�d���F��jd����82��Tkd���#S���N���G�����F��đ�F����T�82��T�YC��a�T#S�L�mf�U[�z�)��2S�L!3��2S�LE�)d�42SA푙��L�M��T�#3U��L!3U��L!3�qd�J�)d��!3�0d���Bf�63S��������;S.҄�(j��;��(��������-�����������t4��U�_����}�&I0�%���u��	V���� �%�/YYe�@��Y����hB�q�9]lB(�*$�����3�����]�Sd��V���ܴ(S�cn�\ʵ�,U�u�8������<R`���Mǭ�u+
���`!����"ʀ���Iq�&:�e�F ج=Ę�=+c��ɰD1���|r:J\���\��OZ6S��J�JMF�-�H8��򈩘RA`Q��f����C�#��������'�ഒ-n�W�`��L����!�Q]��b>*3��&�WV]��%��*�k���a��3�|�m�R�R�q�̫��7ϼJ��y���C!�UU�W�؞̫n���D�
�M>�K�D_*�Fd{'����F����nQ�r{���4h��Y����M�KV���^�&n����u6{Ў�r�a�0$"�j�-�چq�/��.����%^du��(�B|u��wlЙ��F��KM%^�-��%^�0�xYi�Z�EN��U�x�I ��ҴY�ד%^O�mדEe��'?-�^O���x=9�x=�''�'��d�������''�'{�'�����d��\�x=������d���דߨ��"�_O�R�~=95_�z���z�f|��JdY�S��c�Ң�`�������|��eNۢf�J!W�\rU�U!W�\rUG�
�*�\UP{�4rUiS WU��U8rU�U�8rU�Uy��G�
��8k�U9�*䪐�z��*aڤ��)�*0�ROU)@L�M���h��6W��y�<���>Kc �q���8�y�|�y��E�����%�<�#��|^���C>�đ����%�<���C>�<��H[�6����X��(�������S�YG,�q��Ҷ�`��s�����ۅZ��	u>�[�8��7x+X0xӊ��-8#��Ǻ�����U<�s1%�R�X�Q�(t��!]�9p��X9\���t���m)��f-Z��ɾ��2�J��KXؽB��Х��M3��*�U+�)a1�����E �R�w��\�b�U��e�.�3Q��D�P����(�����3x@XN�j�����|�J��&��!傂���2�&���
Mp�Y\��9V�Jg�eM.U�`��c�	,4qE�&6<�ZhBL�����m�ڒ�{���e_�컃�}�/^��˾x�7�x�/�j���/�j��6^�-p��[�x�/��8^��˾�˾%��}�o�5���0�싗}��uٗ������U!W��pUXh���#W�\U���*p䪐�B�*��\�F�*��Uy�*��\rU%�\G�*��U!W�\rU�U!WE�R�����irU������U�����*q䪊iC�
���=rU�U!W�A�
���#W�q䪐�*q䪐�*a�J�*䪢��U!W��sU�?�{Ӹ*/��\Uj�&W�7���pU|�\�l���5rU�*���
�W�\Uđ�B�*��U8rU�U!W�G�J#W�p�<�\rUG�
��G��#W�p䪐�B�
�*䪶�U�Q�lj��p�T;k��֜IZ0��zع%��A�E��,���Z��$�p_Z#�^"�,^Lj�y@�3�oO-u������I��;8��*��
�r��^�̯.^��_��n��w���w���U�EӸxQ]K�'R|�VBB
�i�$z4�/J�Zʂ�Tp�"�[��-�N�Cj.C/.d�璋��CJv�r)�b�T.k32��0����"�(Zv���|�2���������1>�墉Œ.-l�2�<ںDj�4;��� n2�̡8Tf�iyHpx�TiU�Ǩ_�g֦�]6irVK\�
�S���[��Oe�?B4�:u��2�s��3���*�in�5b��A���ǵ��Z�qb]*qi�x�B���zʮ׳ߪw���pYv��в�-�����[1�u׉O�_\'�f�nb���(=�_���������ēJ���+.���RC���B�К�ye���%���SoO�Yyxw���L\��	�"̆�ձ��3�&�<�-F\�Zmt��+8XƘ�tp��*���
Ę��mEByXw���<�V����gب$���Y�T��� g��H�t�S�pė)��O7��1w�l�k�m&N�aԎ���4��S*_cmm���\�V�4,��������M&XŹ� Y��	����	�Y{j���J�ɱ�3�~8�xr�	�Ɂ��ug����Zđ���˶���� �Y��T�L���r�6�C���kS���NqP��C9�)��;�Me�f2T���%j�.p��^����Ug����{��U, �~�y��kA����1]~�Tw�~%H�G˻���8�eQ��1���TM�UF�����-O�F�mv |�q|ɺ���Uf����۰|W�;��=\b]����\~Ϳ�y�dݤb45"���K��t���٥_yK�8��WL/�����h��6���5�1�����u���"�1����bGA��xNFS��d#&1و�FL6b��K6�������b�3��y��#f�f!45g-f1���u��#f1��g�b#�1׈�F�5b����5��FL/bzӋ�^��b�lVkz�L/bzӋ����EL/bz�MO/V�����#L=b�S��z��#�������Ӓ��Ĵ$�%1-�fZ�����%)�%1-�i��u*Ŵ$�%1-�6�%)�$1'�9I�IbNs�����kĄ$&$1!�	ILH����mn�MH2LHbB���H�	ILHbB���Ą$&$1!�	ILHbB���Ą$&$1!Y[BR��\    ���w���qnp      F   $  x����J�@��y���B����I��.�]Hւ��B����
���B���W�y#g-xI� ��23����O�(He4n�W��^���z���lHՄ�"2�tN�����`�=���W,h�s\��TQ�)��S����)�<��������i[�44(mZ<v�UY/XX `8�1%�zR���}�"i�E?�7��ӝŉM�*k�K4ޞ�X����e9���Z�3F슿�:(^<ϵ�7�8��v	7�����)0�)M�������o�s�ܚk��m�e      G   p  x���KK�0���w�P$i�hp%3Ucmg�ՠ2H����M�;[W޻h�*�ܓ�ԇ�&�a�����6�\ͧ��q?쏧����������q�`w����{��� �������b�����!N������L�35�.����E'���R�t���PPk�FE�j�i]Rj��0�*#�anѦ|̌",ώ��3caԕCͲ�+��=&�<���tG����RK)�w�CV�F��h"�0%�e�7X1�0��0�yu��YbuHz[<W��䱷�b�c���a6�F�:_�J�����'f���M����M�?��1Ӡ.͑z���ǃ%��u�o�����C��!���I��_��[I      P   )  x�ő1KA����EA;+IN]��p��%�b �"�%,���خ�Obο0��|�(Q�ٝ�������&!��Vg�0ڙ���Q{+mR?DM�U
7C��Sc���Րf*�9*�%?pa.8�眕�v�>��̙��3�vl/���NxAۃ%a�#��s;�%��$U�\�����"��X�<�KlGx����;�������/;�!������W66������� �r���l�l���}�H�Oĩ�]KF|�ÿ��"���Nt�R���`-���eE�      D   �  x��Wmk�P��_q�7�%�Z�c�ҺMX���0��իM_oZ��el��^�o�`�\]_���?�9I}��N�A�ɹ��<�=�F�x$� Q%�����k��r�1j+D݌�b������������M����GRP��,��EqyQ�}�$�aI��C�̿�V�:�>����E�9��׼����0�T���PL�&�%�O���d�ղ��6��,�d/;װ���wɛ��c~a��o]ʔ�4�v��mH��>=)�X6~�o�#��4@����A����?�W`�	�?h �L͠Y\���TH�zLw�y���PaifVп{C`Fc��q��wb��t�j[O�>��i������yJ�[�FJjvZsiSg�~}I�8�|��! �r!�B^�+��h��A��H���WG�V4u���� ^U,���������
YS�篢k	��EM��<Y����a\
Hay�ͥl.����MG>C*�S��5Xu8��7w�=OpKX�A���B�F.�&����m�(E�!Q�(&Ѡ��{���w,:,�
�gS������Z6g��m1
p�S�7Q��@���xDV\���֖���%����Ȟ�2��毟���$ʘV*<� 7�G0�a#Oq�8|�C��+M�۔����ze���԰>�1q.���W�Ӝ�Rm����N��4i�'�(��S{4�:fӀ���M��;�ꥁ�@/�a(]	��s�o��x8�Q�)
ch����蹧�>5Wg��7رƁ�tZ�^4�1q����$�@Z�|��0�쁉@g�����݈k�-���Qq���z�m�!���j"�)�5ucCUP��.T��Q�~p�#lþ����1G����%�h�E�>���=����_y�na�/���      K   �  x��WMog��W�99�0�]�U�S��-R
��D�i��u�
����fL�4��i��ש=bb
����w�Q��Y0`��VD=���μ3�<�����֎Jgv��������7�Ⓤ�>���J�Og�T��l�l~�}���\��]ӌ����\�9p�'�])�n~�kI\�$�,�J��Us��#�4R�A������~��8<S�R7t[��������ꑮ�~X���Hb�����U�͔[Qٌ���|� }oG�ϪLv�+8��R���`��=�+�N~�+z��w��OV��4�lY) a&ؙ�t�6`R���=�@T��/b��<W�[}������n5H֡�-h���Z�'�b���\h0���9�8�Mi��w�b���=���ݧ���k%;�sn�λ�����wK��s^���-�Y³��a����oL��	��X�gp�� 6�<� .�P'v'C�������b�:k�	�As��=��CQQ7!� L���3�8�'��aL��jZ�n&�Vjm�&1�W"�`?�C8�#�zX���)� ��-�7�N��Rw�ڌ������-q�ҶP(�y{���g^�B@��Ac0�F`Z��iX���J���oQ�
#��L�Ϗ�֘�#N }�T�r�+��� ��p�Z�J1ۤH��ڊ�MC��ܨ�6`��]3M�K�s�w��~���'����`�SaLHx�:��rՙ���K0`)��T���BgxAu��J):���G`j����L}%Y;K�'��
_�"РBKy�"!(>[�i�9d���?S$�}�O�Q|(^R�����I�����Dmi�Hc[D��'�S�5�p��'IseMR���WC�z��c���0,�GD��1q�x4V­�?g�;����S���J�����*�����o'lo�\��<=N�H-�3�~���y�oN���~!����˓���엡W7�T��*���t^ԄD<+�pW��5�&�MN^�Ƶ�,S�O�aRR�h3�GѩX	Ϲ�_�95�a�B�u��l+�����S�)���a�76DR��Ɍ����D�&�h��|B�^w�*�>,���!m�����>.f�� �Q�+����c������+���_�� #Z0�,ߝ���H�}��(b���k��14���k?��6�)ѣ���|P#j���%M�6�����$�Lu�4���h��%ZTE���^Ƨ���,-���k�      N   �   x���v
Q���W((M��L�+.I,)-N-V�s
�t��sW�q�Us�	u���
�:
��_�pa���]�ua�� �	(�W]S��O�������9D��_��?�h�5�'V����d�Ş�!�]l��ħ��� +-�p��bǅv*\�OW��\0�{����r��&`H���w��F��b��2��� =�1      B   �  x�͘MOW����+oH$��c�Jm��7R����Tc��T� Hm�Tj#e٨���J4-q
�w�Q�{�{01	�\�����;�9�����JK�2���V���7[a�oMT~���R�_,}�V�X�,=@�.�����nq>�f��לK����J"1�JP�f��CT�YS~�;�κ#�1�	�^SX��v*<���ׅ9Th��V0�A˭-�Zc+�7�ݝ��ܻ�a�ъ�]V��f�w�հ݄��{������k����WȾD�8Ȟ�C4����t�6*��b���rq���Q�\� }0S�
L����0��d��|:�1a��G���D?�>Z�k�Z���`Ǐ6Э�>x�΋U!�!����:&^r��A�?���?�6��B�j>OeJi�X#���PJ(cY��	q�	9��J����v��V���~���9������=���C�y��υ���]O��W������$J��h�4VD���L=*&���t���H���A��=�/!�N�?7f"�I:��}^%7�,��Ӻ&�9ւ$�AR�%3\q�y�?��\yO�r��e}��w�q��9Ty����)CB-)7�,R�6�h��K�8�
ڌ.��#�)��c�_"��$c���������y�;G��ؔ��%�T�����<�JK-�p./�6�2�O��~�_�~ˏ������~���jw%'f�3����R��ڝ^߮~��ڌ��i	���h�BNa�P�	�cZ8F'S�[�C�����H<��'p������s�	�Vc�;>���*�����c��dK�+�����;���儲�,
7��n�q�߽�x�ۍ~�fpU7��VumgsZH{
&\aFș!$=P����T`��6��Yʜ���G�X���N����uϡ8���A>��xT�qQOw.�5�(�����:m�(�Jb��Xy��OĄ�A�r��O�3���WH�0V�C�]�_ e��+g��� ���%z���2�u5P��m���V�p��d-�H=!���z�݊B@]�������?�Ը"&�>��0-�2�T;|��	p#��)*lp"op:��\+p�ǌ*���nd0�9���ASz3@3v�A�hE�����t�h�5S�R�����M:�	���{���0�Mgo�`~�S�ɋZ��ǝ&tӃ.�4Bu�œ��0L�L9G�M�����}N!ѿ!QPו�3�=sJ���c���� �      A   �  x���ێ�X���)��ę�����Q@,@�@�" �U?@g2Ss1�L��7�jC�N�N�C����-ֿp$���#I��]nm����>d�S�;�x@5T�� zO�q�Q~A�{�c�Nuq��w~��������c�.
f��B ec�O�e��
���k�:0bܩ�#� �A1� ���m�[�S ξ���_�wL���)���M��^D�0�×=~d	`di �`e@��aE�ۗ�O�c�=�K���I�&�d
�3�Xݯ�H��9���.�}�Z��b˨���n �j=�
�&I��8�耴ao���׈�k{k
�濩 Nb�M�@�;�+�D���.���c�"%"�0����_�<�5.�=�+D).�ݘ�"���$��7@�4��M�� v鹍P�Y���MP��g��[�P��c�&���MUG"�ĥ���B�l�	�w<,���ʉM{+'�`&X��y� ���=����������?�����	��(6�5��8�7���ۡ������,4&e6�ё�ݩD��
�SY<�/H���d��8Oޱ�iF���W�Z��{��F�?���+��?�C����&O�6^')�}V���d��&��f�n��Z�%
���ԑ���~��Ց�$�+V}��a�x�����_�����MrA/�7[�Fo����Y J�Z\v��$�p�7��8��>�`�����AR��^�� ?�x�s��&��k�[
إ%�g>�N#�ar{�������cr��}�r:�x��:�~xU�Gc}��%�ml��M?z�ӑ��������sD��]��ظKYU�Bx!*B�/�.�y�~�����4򱛨Pw@%�D���¬v�cw�"N��ŉ��,�"�r֟Imx�P��9����P��T�J/_� ��YP6���M��K=J��$	!�1�|�b�ر     