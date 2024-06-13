import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const TitleWithIcon = ({
  title,
  IconSrc,
}: {
  title: string;
  IconSrc: string | StaticImport;
}) => {
  return (
    <h2 className="font-semibold mb-2 text-xl flex items-center gap-3 text-zinc-300">
      <Image src={IconSrc} height={18} alt="cup icon" objectFit="contain" />
      {title}
    </h2>
  );
};

export default TitleWithIcon;
