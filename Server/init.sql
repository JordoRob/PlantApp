CREATE TABLE public.users
(
    id serial NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.plants
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    scientific_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT plants_pkey PRIMARY KEY (id)
);

INSERT INTO public.users (username, password, email) VALUES ('admin', 'admin', 'test@email.com');

INSERT INTO public.plants (user_id, name, scientific_name, description, image) VALUES (1, 'George', 'Aloe Vera', 'Plant description', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/220px-Aloe_vera_flower_inset.png');