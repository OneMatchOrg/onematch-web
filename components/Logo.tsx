type LogoProps = {
  size?: number;
};

export default function Logo({ size = 160 }: LogoProps) {
  return (
    <img
      src="/logo-v1.png"
      alt="OneMatch"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}