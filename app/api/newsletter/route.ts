import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("subscribers").insert({
      email: validatedData.email,
      parcours: validatedData.parcours || [],
      confirmed: false,
    });

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation - email already exists
        return NextResponse.json(
          { error: "Cet email est deja inscrit." },
          { status: 400 }
        );
      }
      console.error("Supabase error:", error);
      throw error;
    }

    // TODO: Send confirmation email via Resend
    // await sendConfirmationEmail(validatedData.email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Email invalide." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez reessayer." },
      { status: 500 }
    );
  }
}
