// Récupère les avis Google de la fiche via la Places API (New).
// Clé lue depuis la variable d'environnement Netlify GOOGLE_PLACES_KEY.

const QUERY = "Kanjo Aïkido Isulanu, Vescovato, Haute-Corse";

exports.handler = async function (event) {
  const key = process.env.GOOGLE_PLACES_KEY;
  const debug = event && event.queryStringParameters && event.queryStringParameters.debug;
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": debug ? "no-store" : "public, max-age=21600",
  };

  if (!key) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "GOOGLE_PLACES_KEY manquante" }) };
  }

  // En mode debug, on peut tester avec une autre fiche via ?q=...
  const query = (debug && event.queryStringParameters.q) || QUERY;

  try {
    // 1) Recherche de la fiche
    const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
      body: JSON.stringify({ textQuery: query, languageCode: "fr", regionCode: "FR" }),
    });
    const search = await searchRes.json();
    const place = search.places && search.places[0];

    if (debug) {
      // Diagnostic : renvoie l'état brut (sans exposer la clé)
      var dbg = { searchStatus: searchRes.status, search: search };
      if (place) {
        const dr = await fetch(
          "https://places.googleapis.com/v1/places/" + place.id + "?languageCode=fr",
          { headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" } }
        );
        dbg.detailsStatus = dr.status;
        dbg.details = await dr.json();
      }
      return { statusCode: 200, headers, body: JSON.stringify(dbg, null, 2) };
    }

    if (!place) {
      return { statusCode: 200, headers, body: JSON.stringify({ reviews: [], rating: null, total: 0 }) };
    }

    // 2) Détails : note + avis
    const detailsRes = await fetch(
      "https://places.googleapis.com/v1/places/" + place.id + "?languageCode=fr",
      { headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" } }
    );
    const d = await detailsRes.json();

    const reviews = (d.reviews || [])
      .map((r) => ({
        author: r.authorAttribution && r.authorAttribution.displayName,
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
    return { statusCode: 200, headers, body: JSON.stringify({ reviews: [], rating: null, total: 0, error: String(e) }) };
  }
};
