"use server";
import { neon } from "@neondatabase/serverless";

const postgresUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const sql = neon(postgresUrl!);
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
