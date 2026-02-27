const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
		return res.status(500).json({ error: 'Server configuration error' });
	}

	const { scene_id, choice_key } = req.body || {};

	if (!scene_id || !choice_key) {
		return res.status(400).json({ error: 'Missing scene_id or choice_key' });
	}

	if (typeof scene_id !== 'string' || typeof choice_key !== 'string') {
		return res.status(400).json({ error: 'Invalid parameter types' });
	}

	if (scene_id.length > 100 || choice_key.length > 100) {
		return res.status(400).json({ error: 'Parameter too long' });
	}

	try {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_vote_and_get_stats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'apikey': SUPABASE_SERVICE_KEY,
				'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
			},
			body: JSON.stringify({
				p_scene_id: scene_id,
				p_choice_key: choice_key
			})
		});

		if (!response.ok) {
			const text = await response.text();
			console.error('[vote] Supabase error:', response.status, text);
			return res.status(502).json({ error: 'Upstream error' });
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (err) {
		console.error('[vote] Request failed:', err.message);
		return res.status(502).json({ error: 'Upstream request failed' });
	}
}
