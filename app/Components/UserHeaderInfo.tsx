import Image from "next/image";
import GoldMedal from "../../public/medal.png";
import Avatar from "../../public/man.png";
import Clock from "../../public/clock.png";
import { Player } from "../types";

type Props = {
  player: Player | undefined;
};

const UserHeaderInfo = ({ player }: Props) => {
  const date = new Date();
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="flex gap-4">
      <div className="bg-gradient-to-r from-dark to-mid-dark rounded-md px-4 py-1 border border-slate-800 grow py-3 flex items-center">
        <Image src={GoldMedal} width={30} alt="cup icon" objectFit="contain" />
        <span className="grow text-center font-bold">{player?.points}</span>
      </div>
      <div className="bg-gradient-to-r from-dark to-mid-dark rounded-md px-4 py-3 border border-slate-800 grow flex items-center">
        <Image src={Avatar} width={30} alt="cup icon" objectFit="contain" />
        <span className="grow text-center font-bold">{player?.name}</span>
      </div>
      <div className="bg-gradient-to-r from-dark to-mid-dark rounded-md px-4 py-3 border border-slate-800 grow flex items-center">
        <Image src={Clock} width={30} alt="cup icon" objectFit="contain" />
        <span className="grow text-center font-bold">
          {player && currentTime}
        </span>
      </div>
    </div>
  );
};

export default UserHeaderInfo;
