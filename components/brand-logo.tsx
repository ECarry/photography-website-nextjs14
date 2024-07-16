import Image from "next/image";
import DJI from "/public/dji.svg";
import SONY from "/public/sony.svg";
import CANON from "/public/canon.svg";
import NIKON from "/public/nikon.svg";
import FUJIFILM from "/public/fujifilm.svg";
import PANASONIC from "/public/panasonic.svg";
import LEICA from "/public/leica.svg";
import HASSELBLAD from "/public/hasselblad.svg";
import OLYMPUS from "/public/olympus.svg";

interface Props {
  brandName: string | null;
}

const brandLogos: { [key: string]: any } = {
  dji: DJI,
  sony: SONY,
  canon: CANON,
  nikon: NIKON,
  fujifilm: FUJIFILM,
  panasonic: PANASONIC,
  leica: LEICA,
  hasselblad: HASSELBLAD,
  olympus: OLYMPUS,
};

const BrandLogo = ({ brandName }: Props) => {
  if (!brandName) return <div>-</div>;
  const normalizedBrandName = brandName.toLowerCase();
  const logoSrc = brandLogos[normalizedBrandName];

  if (!logoSrc) {
    return <div>-</div>;
  }

  return (
    <div style={{ width: 200, height: 50, position: "relative" }}>
      <Image
        src={logoSrc}
        alt={`${normalizedBrandName} logo`}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default BrandLogo;
