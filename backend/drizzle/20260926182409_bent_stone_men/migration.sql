CREATE TABLE "lectures" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lectures_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sensor" varchar(255) NOT NULL,
	"humedad" integer,
	"fecha" timestamp NOT NULL
);
