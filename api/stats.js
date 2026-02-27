const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
		return res.status(500).json({ error: 'Server configuration error' });
	}

	const { scene_id } = req.query;

	if (!scene_id) {
		return res.status(400).json({ error: 'Missing scene_id' });
	}

	if (typeof scene_id !== 'string' || scene_id.length > 100) {
		return res.status(400).json({ error: 'Invalid scene_id' });
	}

	try {
		const params = new URLSearchParams({
			select: 'choice_key,vote_count',
			scene_id: `eq.${scene_id}`
		});

		const response = await fetch(`${SUPABASE_URL}/rest/v1/choice_stats?${params}`, {
			method: 'GET',
			headers: {
				'apikey': SUPABASE_SERVICE_KEY,
				'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
			}
		});

		if (!response.ok) {
			const text = await response.text();
			console.error('[stats] Supabase error:', response.status, text);
			return res.status(502).json({ error: 'Upstream error' });
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (err) {
		console.error('[stats] Request failed:', err.message);
		return res.status(502).json({ error: 'Upstream request failed' });
	}
}
