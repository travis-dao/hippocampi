'use client'

import { useContext } from "react";
import { DoctorDashboardContext } from "~/app/context/DoctorDashboardContext";
import InvoiceForm from "~/components/doctor-invoices/invoice-form";
import Loading from "~/components/loading/page";

export default function CreateInvoicePage() {
  const context = useContext(DoctorDashboardContext);

  if (!context) return (
    <main className="w-full h-full">
      <Loading />
    </main>
  )
  return (
    <InvoiceForm patients={context.data?.patients!} />
  )
}