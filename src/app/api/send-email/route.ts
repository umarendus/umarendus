import emailjs from "@emailjs/browser";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      body,
      process.env.EMAILJS_PUBLIC_KEY!
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: unknown) {
    console.error("EmailJS error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
}
