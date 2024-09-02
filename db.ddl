CREATE TABLE IF NOT EXISTS public.plants
(
    user_id bigint NOT NULL DEFAULT nextval('plants_user_id_seq'::regclass),
    plant_id bigint NOT NULL DEFAULT nextval('plants_plant_id_seq'::regclass),
    common_name character varying COLLATE pg_catalog."default",
    sci_name character varying COLLATE pg_catalog."default",
    api_id integer,
    room_id integer,
    CONSTRAINT plants_pkey PRIMARY KEY (plant_id),
    CONSTRAINT fk_rooms FOREIGN KEY (room_id)
        REFERENCES public.rooms (room_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.plants
    OWNER to admin;

    CREATE TABLE IF NOT EXISTS public.rooms
(
    user_id bigint NOT NULL DEFAULT nextval('rooms_user_id_seq'::regclass),
    room_id bigint NOT NULL DEFAULT nextval('rooms_room_id_seq'::regclass),
    CONSTRAINT rooms_pkey PRIMARY KEY (room_id),
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms
    OWNER to admin;

    CREATE TABLE IF NOT EXISTS public.users
(
    user_id bigint NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;

    CREATE TABLE IF NOT EXISTS public.watering
(
    plant_id bigint NOT NULL DEFAULT nextval('watering_plant_id_seq'::regclass),
    last_watered timestamp without time zone NOT NULL DEFAULT now(),
    amount character varying COLLATE pg_catalog."default",
    CONSTRAINT watering_pkey PRIMARY KEY (plant_id, last_watered),
    CONSTRAINT fk_plants FOREIGN KEY (plant_id)
        REFERENCES public.plants (plant_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.watering
    OWNER to admin;