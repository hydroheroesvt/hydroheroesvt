import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, name, phone } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Upsert: insert if new, update if email already exists
        const { data, error } = await supabase
            .from('partial_leads')
            .upsert(
                {
                    email: email.toLowerCase().trim(),
                    name: name || null,
                    phone: phone || null,
                    status: 'partial',
                    updated_at: new Date().toISOString()
                },
                {
                    onConflict: 'email',
                    ignoreDuplicates: false
                }
            );

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to save lead' });
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
