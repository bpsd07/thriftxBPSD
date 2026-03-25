// ===== THRIFTX AI STYLIST ENGINE =====
// Personality-driven fashion recommendation system

const StylistEngine = (() => {

  const QUIZ = [
    {
      id: 'gender',
      question: 'How do you identify your style?',
      subtitle: 'This helps us personalise your recommendations',
      type: 'choice',
      options: [
        { value: 'feminine', label: 'Feminine', icon: 'feminine' },
        { value: 'masculine', label: 'Masculine', icon: 'masculine' },
        { value: 'androgynous', label: 'Fluid / Androgynous', icon: 'fluid' },
      ]
    },
    {
      id: 'vibe',
      question: 'What best describes your personal vibe?',
      subtitle: 'Choose the one that feels most like you',
      type: 'choice',
      options: [
        { value: 'traditional', label: 'Deep Roots — I love classic Indian traditions', icon: 'traditional' },
        { value: 'fusion', label: 'Modern Fusion — Indian soul, contemporary cut', icon: 'fusion' },
        { value: 'minimalist', label: 'Quiet Luxury — simple, refined, understated', icon: 'minimalist' },
        { value: 'bold', label: 'Statement Maker — loud prints, vivid colors', icon: 'bold' },
        { value: 'bohemian', label: 'Free Spirit — earthy, artsy, eclectic', icon: 'bohemian' },
      ]
    },
    {
      id: 'palette',
      question: 'Your ideal colour palette?',
      subtitle: 'Pick up to two',
      type: 'multi',
      max: 2,
      options: [
        { value: 'earthy', label: 'Earthy Tones', swatch: ['#c45c2a', '#d4a017', '#8B6914'] },
        { value: 'jewel', label: 'Jewel Tones', swatch: ['#8e44ad', '#2980b9', '#c0392b'] },
        { value: 'pastels', label: 'Soft Pastels', swatch: ['#f8c8d4', '#b8d4e8', '#d4f1c0'] },
        { value: 'mono', label: 'Monochrome', swatch: ['#f5f5f5', '#888', '#222'] },
        { value: 'tropical', label: 'Tropical Brights', swatch: ['#27ae60', '#f39c12', '#e74c3c'] },
      ]
    },
    {
      id: 'body',
      question: 'Which body silhouette do you prefer?',
      subtitle: 'We\'ll recommend fits that make you feel amazing',
      type: 'choice',
      options: [
        { value: 'flowy', label: 'Flowy & Relaxed — draping, free-fall', icon: 'flowy' },
        { value: 'fitted', label: 'Structured & Fitted — defined waist, sharp lines', icon: 'fitted' },
        { value: 'layered', label: 'Layered & Textured — mixing lengths and fabrics', icon: 'layered' },
        { value: 'minimal', label: 'Clean & Straight — no frills, simple cuts', icon: 'minimal' },
      ]
    },
    {
      id: 'occasion',
      question: 'What occasions do you dress for most?',
      subtitle: 'Pick up to two',
      type: 'multi',
      max: 2,
      options: [
        { value: 'daily', label: 'Everyday Wear', icon: 'daily' },
        { value: 'work', label: 'Work & Office', icon: 'work' },
        { value: 'festive', label: 'Festivals & Weddings', icon: 'festive' },
        { value: 'casual', label: 'Weekend & Casual', icon: 'casual' },
        { value: 'travel', label: 'Travel & Outdoors', icon: 'travel' },
      ]
    },
    {
      id: 'craft',
      question: 'Which craft tradition resonates with you?',
      subtitle: 'Your answer reveals your aesthetic DNA',
      type: 'choice',
      options: [
        { value: 'geometric', label: 'Geometric & Precise — block prints, ikat, checks', icon: 'geometric' },
        { value: 'nature', label: 'Nature-Inspired — florals, paisleys, botanical', icon: 'nature' },
        { value: 'handwoven', label: 'Handwoven Textures — khadi, handloom, weaves', icon: 'handwoven' },
        { value: 'embroidered', label: 'Embellished — mirrors, embroidery, beadwork', icon: 'embroidered' },
      ]
    },
    {
      id: 'budget',
      question: 'What\'s your comfortable spending range per piece?',
      subtitle: 'We\'ll prioritise items in your comfort zone',
      type: 'choice',
      options: [
        { value: 'low', label: 'Under ₹999', icon: 'budget-low' },
        { value: 'mid', label: '₹1,000 – ₹2,500', icon: 'budget-mid' },
        { value: 'high', label: '₹2,500 – ₹5,000', icon: 'budget-high' },
        { value: 'premium', label: 'No limit — quality first', icon: 'budget-premium' },
      ]
    },
  ];

  // ---- Scoring ----
  function scoreProduct(product, profile) {
    let score = 0;
    const tags = product.tags || [];
    const cat = product.category;
    const craft = product.craft;
    const price = product.price;

    // Gender alignment
    if (profile.gender === 'feminine') {
      if (['sarees', 'lehengas', 'dupattas', 'kurtas'].includes(cat)) score += 3;
    } else if (profile.gender === 'masculine') {
      if (['menswear', 'kurtas', 'accessories', 'shawls'].includes(cat)) score += 3;
    } else {
      score += 1.5;
    }

    // Vibe alignment
    const vibeMap = {
      traditional: ['kantha', 'handloom', 'muga-silk', 'kasavu', 'jamdani', 'manipuri'],
      fusion: ['block-print', 'kalamkari', 'madhubani', 'dabu'],
      minimalist: ['handloom', 'kasavu', 'khadi'],
      bold: ['phulkari', 'bandhani', 'bandhej', 'lambani', 'patola'],
      bohemian: ['ajrakh', 'warli', 'kantha', 'pahadi', 'tribal-weave'],
    };
    if (profile.vibe && vibeMap[profile.vibe]) {
      if (vibeMap[profile.vibe].includes(craft)) score += 4;
    }

    // Palette alignment
    const paletteColors = {
      earthy: ['#c0392b', '#c45c2a', '#d4a017', '#f39c12'],
      jewel: ['#8e44ad', '#2980b9', '#c0392b', '#1abc9c'],
      pastels: ['#f5f5f5'],
      mono: ['#f5f5f5', '#333', '#2c3e50'],
      tropical: ['#27ae60', '#f39c12', '#e74c3c', '#1abc9c'],
    };
    (profile.palette || []).forEach(p => {
      const pColors = paletteColors[p] || [];
      const productColors = product.colors || [];
      pColors.forEach(pc => {
        productColors.forEach(prC => {
          if (prC.toLowerCase() === pc.toLowerCase()) score += 2;
        });
      });
    });

    // Silhouette alignment
    const bodyMap = {
      flowy: ['sarees', 'dupattas', 'shawls', 'kurtas'],
      fitted: ['ethnic-sets', 'lehengas', 'menswear'],
      layered: ['ethnic-sets', 'lehengas', 'shawls', 'dupattas'],
      minimal: ['kurtas', 'menswear', 'accessories'],
    };
    if (profile.body && bodyMap[profile.body]) {
      if (bodyMap[profile.body].includes(cat)) score += 3;
    }

    // Occasion alignment
    const occasionMap = {
      daily: ['kurtas', 'dupattas', 'accessories'],
      work: ['kurtas', 'menswear', 'ethnic-sets'],
      festive: ['sarees', 'lehengas', 'ethnic-sets'],
      casual: ['kurtas', 'accessories', 'shawls'],
      travel: ['shawls', 'dupattas', 'accessories', 'kurtas'],
    };
    (profile.occasion || []).forEach(occ => {
      if (occasionMap[occ] && occasionMap[occ].includes(cat)) score += 2;
    });

    // Craft alignment
    const craftMap = {
      geometric: ['block-print', 'ikat', 'ajrakh', 'dabu', 'phulkari'],
      nature: ['kalamkari', 'madhubani', 'kantha', 'warli', 'bandhani'],
      handwoven: ['handloom', 'muga-silk', 'kasavu', 'jamdani', 'manipuri', 'tribal-weave', 'pahadi'],
      embroidered: ['lambani', 'aari', 'phulkari', 'patola'],
    };
    if (profile.craft && craftMap[profile.craft]) {
      if (craftMap[profile.craft].includes(craft)) score += 4;
    }

    // Budget alignment
    const budgetRange = { low: [0, 999], mid: [1000, 2500], high: [2501, 5000], premium: [0, 9999] };
    if (profile.budget) {
      const [min, max] = budgetRange[profile.budget];
      if (price >= min && price <= max) score += 3;
      else if (price < min) score += 1; // cheaper is okay
    }

    // Quality boost
    score += (product.rating - 4) * 2;
    if (product.badge === 'bestseller') score += 1;

    // Randomness factor to ensure variety
    score += Math.random() * 0.5;

    return score;
  }

  function generateStylePersona(profile) {
    const personas = {
      traditional_feminine: { title: 'Heritage Keeper', desc: 'You celebrate India\'s rich textile legacy with grace. Your wardrobe is a living museum of indigenous craft.' },
      traditional_masculine: { title: 'Craft Connoisseur', desc: 'You wear history. Fine handlooms and heritage weaves define your understated sophistication.' },
      bold_feminine: { title: 'Vibrant Visionary', desc: 'Your style is unapologetically expressive. You turn every occasion into a canvas.' },
      bold_masculine: { title: 'Style Provocateur', desc: 'Bold prints and strong silhouettes — you dress to be remembered.' },
      fusion_androgynous: { title: 'Cultural Alchemist', desc: 'You blend tradition and modernity effortlessly, creating a signature that\'s entirely yours.' },
      minimalist_: { title: 'Quiet Luxurian', desc: 'Refined restraint is your power. You find beauty in texture and impeccable cut over ornamentation.' },
      bohemian_: { title: 'Free Textile Spirit', desc: 'Earthy, authentic, and artistically fearless — your style tells the story of the craftsperson who made it.' },
    };

    const key1 = `${profile.vibe}_${profile.gender}`;
    const key2 = `${profile.vibe}_`;
    return personas[key1] || personas[key2] || { title: 'Eclectic Curator', desc: 'Your style is beautifully complex — a thoughtful blend of tradition, modernity, and personal truth.' };
  }

  function generateStyleAdvice(profile, topProducts) {
    const adviceBank = {
      vibe: {
        traditional: [
          'Anchor your wardrobe with handwoven pieces — they appreciate in beauty over time.',
          'Layer a classic Banarasi dupatta over a plain kurta to elevate any look instantly.',
          'Invest in one masterpiece saree — wear it differently each time.',
        ],
        fusion: [
          'Pair a block-print kurta with tailored palazzo pants for effortless day-to-evening.',
          'Kalamkari prints work beautifully with denim for a fusion statement.',
          'Mix craft traditions — a Kantha jacket over a Kasavu set is uniquely Indian and uniquely modern.',
        ],
        minimalist: [
          'Choose handloom over synthetic always — texture speaks louder than prints for your aesthetic.',
          'A perfectly draped Kasavu or solid Khadi kurta is more elegant than any embellishment.',
          'Invest in neutral-palette pieces that mix and match across your entire wardrobe.',
        ],
        bold: [
          'Phulkari and Bandhani are your power patterns — don\'t shy from full-look statements.',
          'Offset bold prints with solid accessories — let one piece be the hero.',
          'Mirror work and Lambani embroidery are made for your energy — own it.',
        ],
        bohemian: [
          'Layer light dupattas and shawls over your outfits — texture-on-texture is your superpower.',
          'Natural dyes and Ajrakh block prints align perfectly with your ethos.',
          'Warli and Madhubani prints tell the most authentic stories — wear art.',
        ],
      },
      body: {
        flowy: 'Flowy silhouettes elongate and drape beautifully — go for Chanderi, Mulmul, or Tussar fabrics.',
        fitted: 'Structured cuts highlight your proportions — look for darts and princess seams in Chanderi sets.',
        layered: 'Experiment with dupatta draping styles — the same dupatta worn differently creates entirely new outfits.',
        minimal: 'A crisp A-line kurta in a quality handloom fabric needs no adornment — let the weave speak.',
      },
      craft: {
        geometric: 'Block prints and Ikat are endlessly versatile — geometric precision ages beautifully.',
        nature: 'Kalamkari and Madhubani prints tell botanical stories — pair with earthy accessories.',
        handwoven: 'The soul of a handloom garment deepens with each wash — these pieces are lifelong companions.',
        embroidered: 'Take care of embellished pieces — store them folded in muslin to preserve the embroidery.',
      },
    };

    const advice = [];
    if (profile.vibe && adviceBank.vibe[profile.vibe]) {
      const pool = adviceBank.vibe[profile.vibe];
      advice.push(pool[Math.floor(Math.random() * pool.length)]);
      if (pool.length > 1) advice.push(pool[(Math.floor(Math.random() * (pool.length - 1)) + 1) % pool.length]);
    }
    if (profile.body && adviceBank.body[profile.body]) advice.push(adviceBank.body[profile.body]);
    if (profile.craft && adviceBank.craft[profile.craft]) advice.push(adviceBank.craft[profile.craft]);

    // Add a product-specific tip
    if (topProducts.length > 0) {
      const pick = topProducts[0];
      advice.push(`Your top pick is the <strong>${pick.name}</strong> — it scores high across your personality profile and is one of our highest-rated pieces.`);
    }

    return advice;
  }

  return {
    QUIZ,

    getRecommendations(profile, products) {
      const scored = products.map(p => ({ ...p, _score: scoreProduct(p, profile) }));
      scored.sort((a, b) => b._score - a._score);

      const top = scored.slice(0, 8);
      const persona = generateStylePersona(profile);
      const advice = generateStyleAdvice(profile, top);

      return { top, persona, advice, profile };
    },

    describeProfile(profile) {
      const parts = [];
      if (profile.vibe) parts.push(profile.vibe.charAt(0).toUpperCase() + profile.vibe.slice(1));
      if (profile.craft) parts.push(profile.craft.charAt(0).toUpperCase() + profile.craft.slice(1));
      if (profile.body) parts.push(profile.body.charAt(0).toUpperCase() + profile.body.slice(1));
      return parts.join(' · ');
    }
  };
})();
