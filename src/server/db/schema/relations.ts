import { relations } from "drizzle-orm";
import { accounts, sessions, userLogins, users } from "./auth";
import { doctors, doctorCredentials } from "./doctor";
import { allergies, cognitiveSymptoms, diagnoses, emergencyContacts, medications, patients } from "./patient";
import { patientDoctorManagement, scheduledMeetings, userRoles } from "./management";


export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  user_logins: many(userLogins),
  user_roles: one(userRoles)
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users,{
    fields: [accounts.userId],
    references: [users.id]
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  }),
}));

export const userLoginsRelations = relations(userLogins, ({ one }) => ({
  user: one(users, {
    fields: [userLogins.userId],
    references: [users.id]
  }),
  patient: one(patients, {
    fields: [userLogins.affectedPatientId],
    references: [patients.patientId]
  }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id]
  }),
}));

export const patientDoctorManagementRelations = relations(patientDoctorManagement, ({ one, many }) => ({
  doctor: one(doctors, {
    fields: [patientDoctorManagement.doctorId],
    references: [doctors.doctorId]
  }),
  patient: one(patients, {
    fields: [patientDoctorManagement.patientId],
    references: [patients.patientId]
  }),
}));

export const scheduledMeetingsRelations = relations(scheduledMeetings, ({ one }) => ({
  doctor: one(doctors, {
    fields: [scheduledMeetings.doctorId],
    references: [doctors.doctorId]
  }),
  patient: one(patients, {
    fields: [scheduledMeetings.patientId],
    references: [patients.patientId]
  }),
}));

export const patientsRelations = relations(patients, ({ one, many }) => ({
  user: one(users, {
    fields: [patients.patientId, patients.email],
    references: [users.id, users.email]
  }),
  user_logins: one(userLogins),
  patient_doctor_management: many(patientDoctorManagement),
  scheduled_meetings: many(scheduledMeetings),
  emergency_contacts: many(emergencyContacts),
  allergies: many(allergies),
  diagnoses: many(diagnoses),
  cognitive_symptoms: many(cognitiveSymptoms),
  medications: many(medications)
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  patient: one(patients, {
    fields: [emergencyContacts.patientId],
    references: [patients.patientId]
  })
}));

export const medicationsRelations = relations(medications, ({ one }) => ({
  patient: one(patients, {
    fields: [medications.patientId],
    references: [patients.patientId]
  })
}));

export const allergiesRelations = relations(allergies, ({ one }) => ({
  patient: one(patients, {
    fields: [allergies.patientId],
    references: [patients.patientId]
  })
}));

export const diagnosesRelations = relations(diagnoses, ({ one }) => ({
  patient: one(patients, {
    fields: [diagnoses.patientId],
    references: [patients.patientId]
  })
}));

export const cognitiveSymptomsRelations = relations(cognitiveSymptoms, ({ one }) => ({
  patient: one(patients, {
    fields: [cognitiveSymptoms.patientId],
    references: [patients.patientId]
  })
}));

export const doctorsRelations = relations(doctors, ({ one, many }) => ({
  user: one(users, { 
    fields: [doctors.doctorId], 
    references: [users.id],
  }),
  patient_doctor_management: many(patientDoctorManagement),
  scheduled_meetings: many(scheduledMeetings),
  doctor_credentials: one(doctorCredentials)
}));

export const doctorsCredentialsRelations = relations(doctorCredentials, ({ one }) => ({
  doctor: one(doctors, {
    fields: [doctorCredentials.doctorId],
    references: [doctors.doctorId]
  })
}));