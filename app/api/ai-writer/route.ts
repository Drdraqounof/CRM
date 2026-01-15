import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { templateType, donor, campaign, customContext } = await request.json();

    const prompts: Record<string, string> = {
      "thank-you": `Write a warm, heartfelt thank you letter to ${donor.name} for their generous donation of $${donor.totalDonated?.toLocaleString() || "their recent contribution"}. 
        
The letter should:
- Express sincere gratitude
- Mention the impact their donation will have
- Be personal and warm, not generic
- Be 3-4 paragraphs long
- End with a warm closing

${customContext ? `Additional context: ${customContext}` : ""}

Write the letter body only (no subject line). Start directly with the greeting.`,

      "appeal": `Write a compelling fundraising appeal email to ${donor.name} asking them to support ${campaign ? `our "${campaign.name}" campaign (goal: $${campaign.goal?.toLocaleString()}, raised so far: $${campaign.raised?.toLocaleString()})` : "our current fundraising efforts"}.

The donor has previously donated $${donor.totalDonated?.toLocaleString() || 0} and is currently ${donor.status}.

The appeal should:
- Open with a compelling story or statistic
- Clearly explain the need and impact
- Include a specific ask
- Create urgency without being pushy
- Be 3-4 paragraphs long
- End with a clear call to action

${customContext ? `Additional context: ${customContext}` : ""}

Write the email body only (no subject line). Start directly with the greeting.`,

      "follow-up": `Write a friendly follow-up message to ${donor.name}, a ${donor.status} donor who has contributed $${donor.totalDonated?.toLocaleString() || 0} in the past${donor.lastDonation ? `, with their last donation on ${donor.lastDonation}` : ""}.

The message should:
- Be warm and not guilt-inducing
- Remind them of the value of their past support
- Share a brief update on the organization's work
- Gently invite them to re-engage
- Be 2-3 paragraphs long
- Feel personal, not automated

${customContext ? `Additional context: ${customContext}` : ""}

Write the email body only (no subject line). Start directly with the greeting.`,

      "event": `Write an engaging event invitation email to ${donor.name}, who has donated $${donor.totalDonated?.toLocaleString() || 0} to our organization.

The invitation should:
- Create excitement about the event
- Highlight what makes this event special
- Mention any exclusive benefits for donors
- Include clear event details placeholder
- Be 2-3 paragraphs long
- End with a warm invitation to attend

${customContext ? `Additional context to include about the event: ${customContext}` : "Note: Please include placeholder text for event date, time, and location."}

Write the email body only (no subject line). Start directly with the greeting.`,
    };

    const systemPrompt = `You are an expert nonprofit communications writer. You write compelling, heartfelt donor communications that build relationships and inspire action. Your writing is warm, authentic, and never uses clichés or generic phrases. You personalize each message based on the donor's history and relationship with the organization.

Important guidelines:
- NEVER use markdown formatting - no asterisks (*), no bold (**), no headers (#)
- Write in plain text with natural paragraphs
- Use the donor's first name in the greeting (extract from full name)
- Sign off as "The Bondary Team" or similar
- Keep the tone professional but warm`;

    const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompts[templateType] || prompts["thank-you"] },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("AI Writer error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
