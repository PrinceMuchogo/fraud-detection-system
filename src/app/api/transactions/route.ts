import prisma from "@/utils/dbconfig";


export async function GET() {
    try {
      // Fetch all users
      const transactions = await prisma.fraud_transactions.findMany({ });

      console.log("backend data: ", transactions)
  
      return new Response(
        JSON.stringify({ message: "Success fetching all transactions!", transactions }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error when fetching users!" }),
        { status: 500 }
      );
    }
  }