// this is where we'll have our query functions for the db

import * as schema_auth from './schema/auth';
import * as schema_doctor from './schema/doctor';
import * as schema_management from './schema/management';
import * as schema_patient from './schema/patient';
import { eq } from 'drizzle-orm';
import { DoctorCredentialsInterface, DoctorsInterface, PatientAllergiesInterface, PatientCognitiveSymptomsInterface, PatientDiagnosesInterface, PatientDoctorManagementInterface, PatientEmergencyContactsInterface, PatientHealthInformationInterface, PatientMedicationsInterface, PatientsInterface, ScheduledMeetingsIdInterface, ScheduledMeetingsInterface, UserIdInterface, UserRolesInterface } from './type';
import { db } from '.';

// add user role
export const addUserRole = async (user: UserRolesInterface) => {
  return db.insert(schema_management.userRoles)
    .values(user)
    .onConflictDoNothing()
    .returning();
}

// get user role
export const getUserRole = async (user_id: UserIdInterface) => {
  return db.query.userRoles.findFirst({
    where: eq(schema_management.userRoles.userId, user_id)
  });
}

// verify if user had role
export const hasUserRole = async (user_id: UserIdInterface) => {
  // returns an array
  const result_array = await db.select()
    .from(schema_management.userRoles)
    .where(eq(schema_management.userRoles.userId, user_id));
  
  // return 1 if user exists, 0 otherwise
  return result_array.length === 1; // return true / false
}

// add patient
export const addPatient = async (patient: PatientsInterface) => {
  return db.insert(schema_patient.patients)
    .values(patient)
    .onConflictDoNothing()
    .returning();
}

// set patient
export const setPatient = async (user_id: UserIdInterface, patient: PatientsInterface) => {
  return db.update(schema_patient.patients)
    .set(patient)
    .where(eq(schema_patient.patients.patientId, user_id))
    .returning();
}

// get patient
export const getPatient = async (user_id: UserIdInterface) => {
  return db.query.patients.findFirst({
    where: eq(schema_patient.patients.patientId, user_id)
  });
}

// add doctor
export const addDoctor = async (doctor: DoctorsInterface) => {
  return db.insert(schema_doctor.doctors)
    .values(doctor)
    .onConflictDoNothing()
    .returning();
}

// set doctor
export const setDoctor = async (user_id: UserIdInterface, doctor: DoctorsInterface) => {
  return db.update(schema_doctor.doctors)
    .set(doctor)
    .where(eq(schema_doctor.doctors.doctorId, user_id))
    .returning();
}

// get doctor
export const getDoctor = async (user_id: UserIdInterface) => {
  return db.query.doctors.findFirst({
    where: eq(schema_doctor.doctors.doctorId, user_id)
  });
}

// add doctor credentials
export const addDoctorCredentials = async (doctorCredentials: DoctorCredentialsInterface) => {
  return db.insert(schema_doctor.doctorCredentials)
    .values(doctorCredentials)
    .onConflictDoNothing()
    .returning();
}

// set doctor credentials
export const setDoctorCredentials = async (user_id: UserIdInterface, doctorCredential: DoctorCredentialsInterface) => {
  return db.update(schema_doctor.doctorCredentials)
    .set(doctorCredential)
    .where(eq(schema_doctor.doctorCredentials.doctorId, user_id))
    .returning();
}

// get doctor credentials
export const getDoctorCredentials = async (user_id: UserIdInterface) => {
  return db.query.doctorCredentials.findFirst({
    where: eq(schema_doctor.doctorCredentials.doctorId, user_id)
  });
}

// add patient-doctor management
export const addPatientDoctorManagement = async (patientDoctorManagement: PatientDoctorManagementInterface) => {
  return db.insert(schema_management.patientDoctorManagement)
    .values(patientDoctorManagement)
    .onConflictDoNothing()
    .returning();
}

// remove patient-doctor management

// get patient-doctor management
export const getPatientDoctorManagement = async (patient_id: PatientsInterface | null, doctor_id: DoctorsInterface | null) => {
  if (patient_id) { // if patients gets all doctors
    return db.query.patientDoctorManagement.findMany({
      where: (eq(schema_management.patientDoctorManagement.patientId, patient_id.patientId))
    })
  }

  if (doctor_id) { // if doctor gets all patients
    return db.query.patientDoctorManagement.findMany({
      where: (eq(schema_management.patientDoctorManagement.doctorId, doctor_id.doctorId))
    })
  }

  return null;
}

// add scheduled meeting
export const addScheduledMeeting = async (meeting: ScheduledMeetingsInterface) => {
  return db.insert(schema_management.scheduledMeetings)
    .values(meeting)
    .onConflictDoNothing()
    .returning();
}

// cancel meeting
export const cancelScheduledMeeting = async (meeting_id: ScheduledMeetingsIdInterface) => {
  return db.update(schema_management.scheduledMeetings)
    .set({ status: "canceled" })
    .where(eq(schema_management.scheduledMeetings.id, meeting_id))
    .returning();
}

// get scheduled meeting
export const getScheduledMeeting = async (patient_id: PatientsInterface | null, doctor_id: DoctorsInterface | null) => {
  if (patient_id) { // if patients gets all meetings
    return db.query.scheduledMeetings.findMany({
      where: (eq(schema_management.scheduledMeetings.patientId, patient_id.patientId))
    })
  }

  if (doctor_id) { // if doctor gets all meetings
    return db.query.scheduledMeetings.findMany({
      where: (eq(schema_management.scheduledMeetings.doctorId, doctor_id.doctorId))
    })
  }

  return null;
}

// add allergies
export const addAllergies = async (allergy: PatientAllergiesInterface) => {
  return db.insert(schema_patient.allergies)
    .values(allergy)
    .onConflictDoNothing()
    .returning();
}

// set allergies
export const setAllergies = async (user_id: UserIdInterface, allergy: PatientAllergiesInterface) => {
  return db.update(schema_patient.allergies)
    .set(allergy)
    .where(eq(schema_patient.allergies.patientId, user_id))
    .returning();
}

// get allergies
export const getAllergies = async (user_id: UserIdInterface) => {
  return db.query.allergies.findMany({
    where: eq(schema_patient.allergies.patientId, user_id)
  });
}

// add cognitive symptoms
export const addCognitiveSymptoms = async (cognitiveSymptom: PatientCognitiveSymptomsInterface) => {
  return db.insert(schema_patient.cognitiveSymptoms)
    .values(cognitiveSymptom)
    .onConflictDoNothing()
    .returning();
}

// set cognitive symptoms
export const setCognitiveSymptoms = async (user_id: UserIdInterface, cognitiveSymptom: PatientCognitiveSymptomsInterface) => {
  return db.update(schema_patient.cognitiveSymptoms)
    .set(cognitiveSymptom)
    .where(eq(schema_patient.cognitiveSymptoms.patientId, user_id))
    .returning();
}

// get cognitive symptoms
export const getCognitiveSymptoms = async (user_id: UserIdInterface) => {
  return db.query.cognitiveSymptoms.findMany({
    where: eq(schema_patient.cognitiveSymptoms.patientId, user_id)
  });
}

// add diagnoses
export const addDiagnoses = async (dianosis: PatientDiagnosesInterface) => {
  return db.insert(schema_patient.diagnoses)
    .values(dianosis)
    .onConflictDoNothing()
    .returning();
}

// set diagnoses
export const setDiagnoses = async (user_id: UserIdInterface, dianosis: PatientDiagnosesInterface) => {
  return db.update(schema_patient.diagnoses)
    .set(dianosis)
    .where(eq(schema_patient.diagnoses.patientId, user_id))
    .returning();
}

// get diagnoses
export const getDiagnoses = async (user_id: UserIdInterface) => {
  return db.query.diagnoses.findMany({
    where: eq(schema_patient.diagnoses.patientId, user_id)
  });
}

// add Emergency Contact
export const addEmergencyContact = async (emergencyContact: PatientEmergencyContactsInterface) => {
  return db.insert(schema_patient.emergencyContacts)
    .values(emergencyContact)
    .onConflictDoNothing()
    .returning();
}

// set Emergency Contact
export const setEmergencyContact = async (user_id: UserIdInterface, emergencyContact: PatientEmergencyContactsInterface) => {
  return db.update(schema_patient.emergencyContacts)
    .set(emergencyContact)
    .where(eq(schema_patient.emergencyContacts.patientId, user_id))
    .returning();
}

// get Emergency Contact
export const getEmergencyContact = async (user_id: UserIdInterface) => {
  return db.query.emergencyContacts.findMany({
    where: eq(schema_patient.emergencyContacts.patientId, user_id)
  });
}

// add medications
export const addMedications = async (medication: PatientMedicationsInterface) => {
  return db.insert(schema_patient.medications)
    .values(medication)
    .onConflictDoNothing()
    .returning();
}

// set Medication
export const setMedications = async (user_id: UserIdInterface, medication: PatientMedicationsInterface) => {
  return db.update(schema_patient.medications)
    .set(medication)
    .where(eq(schema_patient.medications.patientId, user_id))
    .returning();
}

// get medications
export const getMedications = async (user_id: UserIdInterface) => {
  return db.query.medications.findMany({
    where: eq(schema_patient.medications.patientId, user_id)
  });
}

// get patient health information
export const getPatientHealthInformation = async (user_id: UserIdInterface) => {
  const _allergies = await db.query.allergies.findMany({
    where: eq(schema_patient.allergies.patientId, user_id)
  });
  const _cognitiveSymptoms = await db.query.cognitiveSymptoms.findMany({
    where: eq(schema_patient.cognitiveSymptoms.patientId, user_id)
  });
  const _diagnoses = await db.query.diagnoses.findMany({
    where: eq(schema_patient.diagnoses.patientId, user_id)
  });
  const _emergencyContacts = await db.query.emergencyContacts.findMany({
    where: eq(schema_patient.emergencyContacts.patientId, user_id)
  });
  const _medications = await db.query.medications.findMany({
    where: eq(schema_patient.medications.patientId, user_id)
  });
1
  if (!_allergies || !_cognitiveSymptoms || !_diagnoses || !_emergencyContacts || !_medications) return null;

  const patientHealthInformation: PatientHealthInformationInterface = {
    allergies: _allergies,
    cognitiveSymptoms: _cognitiveSymptoms,
    dianoses: _diagnoses,
    emergencyContacts: _emergencyContacts,
    medications: _medications
  }

  return patientHealthInformation;
}