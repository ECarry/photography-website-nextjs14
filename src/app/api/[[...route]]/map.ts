import { Hono } from "hono";
import { z } from "zod";
import { env } from "hono/adapter";
import { zValidator } from "@hono/zod-validator";
import { Feature, FeatureCollection, Point } from "geojson";

const locationSchema = z.object({
  lat: z.string().transform((val) => parseFloat(val)),
  lng: z.string().transform((val) => parseFloat(val)),
});

export interface MapboxFeature extends Feature {
  geometry: Point;
  properties: {
    full_address: string;
    name: string;
    place_formatted: string;
    context: {
      country: {
        country_code: string;
        name: string;
      };
      locality: {
        name: string;
      } | null;
      place: {
        name: string;
      } | null;
      region: {
        name: string;
      } | null;
    };
  };
}

export interface MapboxReverseGeocodingResponse extends FeatureCollection {
  features: MapboxFeature[];
  query: [number, number];
}
const app = new Hono().get(
  "/location",
  zValidator("query", locationSchema),
  async (c) => {
    const { lat, lng } = c.req.valid("query");

    const { NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN } = env<{
      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string;
    }>(c);

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );

      const data: MapboxReverseGeocodingResponse = await response.json();

      return c.json({
        data,
      });
    } catch (error) {
      return c.json(
        {
          error: "Failed to fetch location",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        500
      );
    }
  }
);

export default app;
