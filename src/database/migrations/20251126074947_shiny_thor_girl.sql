CREATE TABLE "transaction" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transaction_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cardNumber" text NOT NULL,
	"currency" text NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp NOT NULL,
	"description" text,
	"category" text NOT NULL,
	"type" text NOT NULL,
	"importId" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "transaction_importId_unique" UNIQUE("importId")
);
