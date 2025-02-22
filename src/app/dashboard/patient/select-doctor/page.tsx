"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { DoctorsInterface } from "~/server/db/type";

export default function SelectDoctorPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [doctors, setDoctors] = useState<
    Array<DoctorsInterface>
  >([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch all doctors from the API endpoint
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/db/doctor/all");
        if (!res.ok) {
          throw new Error("Failed to load doctors");
        }
        const data = await res.json();
        const normalized = Array.isArray(data.response) ? data.response : [data.response];
        setDoctors(normalized);


      } catch (err) {
        console.error(err);
        setError("Failed to load doctors");
      }
    }
    fetchDoctors();
  }, []);
  const handleSubmit = async () => {
    if (!selectedDoctorId) {
      setError("Please select a doctor");
      return;
    }
    if (!session) {
      setError("User is not authenticated");
      return;
    }
    try {
      // Create the patient-doctor management object.
      const patientDoctorManagement = {
        patientId: session.user.id,
        doctorId: selectedDoctorId,
        // Add any other required fields here.
      };

      const res = await fetch("/api/db/management/patient-doctor-management/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientDoctorManagement),
      });

      if (!res.ok) {
        throw new Error("Failed to assign doctor");
      }

      // Redirect to the dashboard after success.
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to assign doctor");
    }
  };
  console.log(doctors)
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Doctor</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!doctors || doctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        <ul className="flex flex-col space-y-4">
          {doctors.map((doctor) => (
            <li key={doctor.doctorId} className="flex items-center space-x-4">
              <input
                type="radio"
                name="doctor"
                value={doctor.doctorId}
                onChange={() => setSelectedDoctorId(doctor.doctorId)}
                checked={selectedDoctorId === doctor.doctorId}
                className="h-4 w-4"
              />
              <div>
                <p className="font-medium">Dr. {doctor.firstName}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </main>
  );
}
