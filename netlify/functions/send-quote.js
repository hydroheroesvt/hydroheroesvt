import { Resend } from 'resend';

// Netlify Function handler
export const handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { name, email, phone, address, services, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !address || !services) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email notification
        const encoding = await resend.emails.send({
            from: 'Hydro Heroes <onboarding@resend.dev>',
            to: 'hydroheroesvt@gmail.com',
            subject: `New Quote Request from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0a2540; border-bottom: 2px solid #3b9eff; padding-bottom: 10px;">
                        🎉 New Quote Request!
                    </h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 10px; background: #f8fafc; font-weight: bold; width: 120px;">Name:</td>
                            <td style="padding: 10px; background: #f8fafc;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f8fafc; font-weight: bold;">Phone:</td>
                            <td style="padding: 10px; background: #f8fafc;">${phone || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Address:</td>
                            <td style="padding: 10px;">${address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f8fafc; font-weight: bold;">Services:</td>
                            <td style="padding: 10px; background: #f8fafc; color: #3b9eff; font-weight: bold;">${services}</td>
                        </tr>
                    </table>
                    
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <strong>Message:</strong>
                        <p style="margin: 10px 0 0 0; color: #475569;">${message || 'No message provided'}</p>
                    </div>
                    
                    <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
                        This email was sent from the Hydro Heroes website contact form via Netlify.
                    </p>
                </div>
            `
        });

        if (encoding.error) {
            console.error('Resend error:', encoding.error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
        };

    } catch (error) {
        console.error('Server error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
