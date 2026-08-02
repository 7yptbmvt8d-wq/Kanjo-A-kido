// Récupère les avis Google de la fiche via la Places API (New).
// Clé lue depuis la variable d'environnement Netlify GOOGLE_PLACES_KEY
// (jamais exposée côté navigateur).

const QUERY = "Kanjo Aïkido Isulanu, Vescovato, Haute-Corse";

exports.handler = async function () {
  const key = process.env.GOOGLE_PLACES_KEY;
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=1800", // 30 min de cache CDN
  };

  if (!key) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "GOOGLE_PLACES_KEY manquante" }) };
  }

  try {
    // 1) Trouver la fiche
    const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.id",
      },
      body: JSON.stringify({ textQuery: QUERY, languageCode: "fr", regionCode: "FR" }),
    });
    const search = await searchRes.json();
    const place = search.places && search.places[0];
    if (!place) {
      return { statusCode: 200, headers, body: JSON.stringify({ reviews: [], rating: null, total: 0 }) };
    }

    // 2) Récupérer note globale + avis
    const detailsRes = await fetch(
      "https://places.googleapis.com/v1/places/" + place.id + "?languageCode=fr",
      { headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" } }
    );
    const d = await detailsRes.json();

    // Prénom + initiale du nom de famille (protection de la vie privée)
    function anonymize(name) {
      if (!name) return "Client";
      name = name.replace(/\(.*?\)/g, "").trim(); // retire un éventuel pseudo entre parenthèses
      const parts = name.split(/\s+/).filter(Boolean);
      if (parts.length < 2) return parts[0] || "Client";
      return parts[0] + " " + parts[1].charAt(0).toUpperCase() + ".";
    }

    const reviews = (d.reviews || [])
      .map((r) => ({
        author: anonymize(r.authorAttribution && r.authorAttribution.displayName),
        rating: r.rating,
        text: (r.originalText && r.originalText.text) || (r.text && r.text.text) || "",
        time: r.relativePublishTimeDescription || "",
      }))
      .filter((r) => r.text);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reviews: reviews.slice(0, 6),
        rating: d.rating || null,
        total: d.userRatingCount || 0,
      }),
    };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ reviews: [], rating: null, total: 0 }) };
  }
};
