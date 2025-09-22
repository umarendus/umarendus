import emailjs from "emailjs-com";

export async function POST(req) {
  try {
    const body = await req.json();

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: body.name,
        from_email: body.email,
        message: body.message,
      },
      process.env.EMAILJS_PUBLIC_KEY
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("EmailJS error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
