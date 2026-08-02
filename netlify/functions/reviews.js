// Récupère les avis Google de la fiche via la Places API (New).
// La clé est lue depuis la variable d'environnement Netlify GOOGLE_PLACES_KEY
// (jamais exposée côté navigateur).

const QUERY = "Kanjo Aïkido Isulanu, Vescovato, Haute-Corse";

exports.handler = async function () {
  const key = process.env.GOOGLE_PLACES_KEY;
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=21600", // 6 h de cache CDN
  };

  if (!key) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Clé API manquante" }) };
  }

  try {
    // 1) Trouver la fiche (place id) à partir du nom
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
    const placeId = search.places && search.places[0] && search.places[0].id;
    if (!placeId) {
      return { statusCode: 200, headers, body: JSON.stringify({ reviews: [], rating: null, total: 0 }) };
    }

    // 2) Récupérer note globale + avis
    const detailsRes = await fetch(
      "https://places.googleapis.com/v1/places/" + placeId +
        "?languageCode=fr&fields=rating,userRatingCount,reviews",
      { headers: { "X-Goog-Api-Key": key } }
    );
    const d = await detailsRes.json();

    const reviews = (d.reviews || []).map((r) => ({
      author: r.authorAttribution && r.authorAttribution.displayName,
      photo: r.authorAttribution && r.authorAttribution.photoUri,
      rating: r.rating,
      text: (r.originalText && r.originalText.text) || (r.text && r.text.text) || "",
      time: r.relativePublishTimeDescription || "",
    })).filter((r) => r.text);

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
