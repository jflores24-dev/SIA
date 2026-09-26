CREATE TABLE "lectures" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lectures_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sensorId" varchar(255) NOT NULL,
	"lectura" integer,
	"humedad" integer,
	"sequedad" integer,
	"status" varchar(255) NOT NULL,
	"fecha" timestamp DEFAULT now() NOT NULL
);
