import { 
  users,
  userLogins,
} from "./schema/auth";
import { doctors } from "./schema/doctor";
import { patientDoctorManagement, scheduledMeetings, userRoles } from "./schema/management";
import { allergies, cognitiveSymptoms, diagnoses, emergencyContacts, medications, patients } from "./schema/patient";

// User ID
export type UserIdInterface = typeof users.id.dataType;

// Users
export type UsersInterface = typeof users.$inferInsert;

// User Roles
export type UsersRolesInterface = typeof userRoles.$inferInsert;

// Doctors
export type DoctorsInterface = typeof doctors.$inferInsert;

// Patients
export type PatientsInterface = typeof patients.$inferInsert;

// Patient-Doctor Management
export type PatientDoctorManagementInterface = typeof patientDoctorManagement.$inferInsert;

// Scheduled Meetings
export type ScheduledMeetingsInterface = typeof scheduledMeetings.$inferInsert;

// User Logins
export type UserLoginsInterface = typeof userLogins.$inferInsert;

// Emergency Contacts
export type PatientEmergencyContactsInterface = typeof emergencyContacts.$inferInsert;

// Medications
export type PatientMedicationsInterface = typeof medications.$inferInsert;

// Allergies
export type PatientAllergiesInterface = typeof allergies.$inferInsert;

// Diagnoses
export type PatientDiagnosesInterface = typeof diagnoses.$inferInsert;

// Cognitive Symptoms
export type PatientCognitiveSymptomsInterface = typeof cognitiveSymptoms.$inferInsert;

// Patient Information
export interface PatientHealthInformationInterface {
  allergies: PatientAllergiesInterface[],
  cognitiveSymptoms: PatientCognitiveSymptomsInterface[],
  dianoses: PatientDiagnosesInterface[],
  emergencyContacts: PatientEmergencyContactsInterface[],
  medications: PatientMedicationsInterface[],
}