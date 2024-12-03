const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? ""
      : "https://photograph.ecarry.uk";

  return `${baseUrl}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
