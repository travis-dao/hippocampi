import { setAllergies } from "~/server/db/queries";
import { PatientAllergiesInterface } from "~/server/db/type";
import { getUserId } from "~/utilities/get-user";

// pass in PatientAllergiesInterface json
export const POST = async (request: Request) => {
  const body: PatientAllergiesInterface = await request.json();
  
  try {
    const userId = await getUserId() as "string";
    
    if (!userId) {
      return Response.json("Error");
    }

    const response = await setAllergies(userId, body)

    if (!response) {
      return Response.json("Error");
    }

    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};