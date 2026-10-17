import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL || "gsyawale@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const fromEmail =
        process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

      const response = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">New Contact Form Submission</h2>
            <p style="color: #475569; font-size: 15px; margin-bottom: 20px;">You received a new message from your developer portfolio:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px;">
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">Sent via portfolio contact integration</p>
          </div>
        `,
      });

      if (response.error) {
        console.error("Resend API error:", response.error);
        return NextResponse.json(
          {
            success: false,
            message: response.error.message || "Failed to send email via Resend service.",
          },
          { status: 500 }
        );
      }

      console.log(`[Resend Success] Email dispatched successfully! ID: ${response.data?.id} | To: ${recipientEmail}`);
    } else {
      // Local development fallback: Log clearly to console
      console.log(
        "\n==================== PORTFOLIO CONTACT INQUIRY ===================="
      );
      console.log(`To: ${recipientEmail}`);
      console.log(`From: ${name} (${email})`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log(`Message:\n${message}`);
      console.log(
        "Notice: Set RESEND_API_KEY in .env.local to dispatch live production emails via Resend."
      );
      console.log(
        "===================================================================\n"
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. I will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your message.",
      },
      { status: 500 }
    );
  }
}
