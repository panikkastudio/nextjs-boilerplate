import Image from "next/image";
import logo from "public/logo.png";

export function Logo({ size = 24 }: { size?: number }) {
    return <Image src={logo} height={size} width={size} alt="magicshorts logo" />;
}
