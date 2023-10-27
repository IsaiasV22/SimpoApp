import React from "react";
import Calendar from "@/app/components/calendario/Calendario";

export async function Page() {
  return (
    <div>
      <h1>Calendario</h1>
      <Calendar />
    </div>
  );
}

export default Page;