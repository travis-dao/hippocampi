import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable, users } from "./auth";
import { timestamps } from "./util";

// Doctors
export const doctors = createTable(
  "doctors",
  {
    doctorId: varchar("doctorId", { length: 255 })
      .notNull()
      .primaryKey()
      .references(() => users.id, {onDelete: 'cascade'}),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name').notNull(),
    email: varchar("email", { length: 255 })
      .notNull()
      .references(() => users.email, {onDelete: 'cascade'}),
    location: text("location")
      .notNull(),
    specialization: varchar("specialization"),
    ratings: varchar("ratings", { length:20 }).notNull(),
    ...timestamps
  }
)

// other info
export const doctorCredentials = createTable(
  "doctor_credentials",
  {
    doctorId: varchar("doctorId", { length: 255 })
      .primaryKey()
      .notNull()
      .references(() => doctors.doctorId, {onDelete: 'cascade'}),
    degree: varchar("degree", { length: 255 }).notNull(),
    medicalSchool: varchar("medical_school", { length: 255 }).notNull(),
    residency: varchar("residency", { length: 255 }).notNull(),
    approach: text("approach").notNull(),
    specialization: varchar("specialization", { length: 255 })
      .notNull()
      .references(() => doctors.specialization, {onDelete: 'cascade'}),
    ...timestamps
  }
)