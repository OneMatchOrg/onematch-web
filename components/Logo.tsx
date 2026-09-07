import Image from "next/image";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 160 }: LogoProps) {
  return (
    <Image
      src="/logo-v1.png"
      alt="OneMatch"
      width={size}
      height={size}
      priority
    />
  );
}