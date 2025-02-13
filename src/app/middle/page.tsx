
"use client";
import { ConsoleLogWriter } from "drizzle-orm";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "~/components/loading/page";

export default function Middle() {
  const [data, setData] = useState({ loading: true, content: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/db/management/user-role/has");

        const result = await response.json();
        setData({
          loading: false,
          content: result,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({
          loading: false,
          content: null,
        });
      }
    };

    fetchData();
  }, []);
  console.log(data.content)
  if (data.loading) return <Loading />
  if (data.content && data.content.response === false) redirect("/select-role");
}
