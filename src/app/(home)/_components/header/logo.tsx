import { Camera } from "lucide-react";
import AnimatedText from "../../../../components/animated-text";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Camera size={18} />
      <AnimatedText label="ECarry" label2="Photo" style="font-medium" />
    </Link>
  );
};

export default Logo;
