'use client'

import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import DoctorDashboard from "~/components/doctor-dashboard/page";
import Loading from "~/components/loading/page";
import PatientDashboard from "~/components/patient-dashboard/page";
import { role } from "~/server/db/type";

export default function Dashboard() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/db/management/user-role/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result: string = await response.json();
        setUserRole(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (userRole === "") return <main>Loading...</main>;

  if (userRole === role.patient) return <PatientDashboard />;

  if (userRole === role.doctor) return <DoctorDashboard />;
}
