"use client";
import { useEffect, useState } from "react";
import ValueAdjuster from "./Shared/valueAdjuster/valueAdjuster";
import Cup from "../public/award.png";
import Ranking from "../public/ranking.png";
import ChatIcon from "../public/chat.png";
import LineChartWidget from "./Components/LineChart";
import Button from "./Shared/button";
import UserHeaderInfo from "./Components/UserHeaderInfo";
import Table from "./Shared/table";
import SpeedRange from "./Components/SpeedRange";
import TitleWithIcon from "./Shared/titleWithIcon";
import Chat from "./Components/Chat";
import WelcomeScreen from "./Components/Welcome";
import { Player } from "./types";
import { socket } from "./socket";

export default function Home() {
  const [betPoints, setBetPoints] = useState("50");
  const [multiplier, setMultiplier] = useState("1.00");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [gameInit, setGameInit] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [ranking, setRanking] = useState<{}[]>([]);
  const [roundStarted, setRoundStarted] = useState(false);

  useEffect(() => {
    socket.on("update_players_list", (data: Player[]) => {
      const player = data.find((player) => player.id === socket.id);
      setCurrentPlayer(player);
      setPlayers(data);
    });
    socket.on("updateRankings", (data) => {
      setRanking(data);
      setRoundStarted(false);
    });
    // To prevent multiple players start the same round
    socket.on("roundRunning", setRoundStarted);
    // To prevent multiple players start the same round

    return () => {
      socket.off("update_players_list");
      socket.off("updateRankings");
      socket.off("roundRunning");
    };
  }, []);

  const initGame = (playerName: string) => {
    socket.emit("player_connection", { playerId: socket.id, playerName });
    setGameInit(true);
  };

  const handleStartRound = () => {
    const parsedBet = parseInt(betPoints);
    const parsedMultiplier = parseFloat(multiplier);
    if (parsedBet > currentPlayer!.points || currentPlayer!.points < 1) {
      return alert("No enough points");
    }
    setRoundStarted(true);
    socket.emit("startRound", {
      playerId: socket.id,
      betPoints: parsedBet,
      prediction: parsedMultiplier,
      speed: speed,
    });
  };

  const getPlayerRankings = (): { [key: string]: any }[] => {
    if (ranking.length > 0) {
      return ranking.map((player, index) => ({
        rank: index + 1,
        ...player,
      }));
    } else {
      return Array.from(Array(5).keys()).map((index) => ({ rank: index + 1 }));
    }
  };

  const invalidStartValues = (() => {
    const parsedBet = parseInt(betPoints);
    const parsedMultiplier = parseFloat(multiplier);
    if (isNaN(parsedBet) || parsedBet === 0) return true;
    if (isNaN(parsedMultiplier) || parsedMultiplier === 0) return true;
  })();

  return (
    <main className="md:container md:mx-auto pt-24" style={{ maxWidth: 1024 }}>
      <div className="grid grid-cols-12 gap-x-4">
        {!gameInit ? (
          <WelcomeScreen onSubmit={initGame} />
        ) : (
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-x-4">
              <ValueAdjuster
                value={betPoints}
                setValue={setBetPoints}
                label="Points"
                step={25}
                max={currentPlayer?.points ?? 1000}
              />
              <ValueAdjuster
                value={multiplier}
                setValue={setMultiplier}
                label="Multiplier"
                fixedDecimal={2}
                step={0.25}
                max={10}
              />
            </div>
            <Button
              title="Start"
              onClick={handleStartRound}
              disabled={invalidStartValues || roundStarted}
              className="w-full mt-4"
            />
            <div className="mt-6">
              <TitleWithIcon IconSrc={Cup} title="Current Round" />
              <Table
                columns={[
                  { key: "name", label: "Name" },
                  { key: "bet", label: "Points" },
                  { key: "prediction", label: "Multiplier" },
                ]}
                rowsData={players}
                getRowClassName={getCurrentRoundRowClasses()}
              />
            </div>
            <SpeedRange setSpeed={setSpeed} speed={speed} />
          </div>
        )}
        <div className="col-span-8">
          <UserHeaderInfo player={currentPlayer} />
          <LineChartWidget />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <TitleWithIcon IconSrc={Ranking} title="Ranking" />
          <Table
            columns={[
              { key: "rank", label: "No." },
              { key: "name", label: "Name" },
              { key: "points", label: "Score" },
            ]}
            rowsData={getPlayerRankings()}
            getRowClassName={(row) =>
              socket.id && row.id === socket.id ? "bg-slate-700" : ""
            }
          />
        </div>
        <div className="col-span-6">
          <TitleWithIcon IconSrc={ChatIcon} title="Chat" />
          <Chat currentPlayer={currentPlayer} />
        </div>
      </div>
      <p className="text-center text-gray-600 mt-5">
        NOTE: Current version doesn't support multiple players guessing at the
        same time, it's for demonstration purpose only.
      </p>
    </main>
  );

  function getCurrentRoundRowClasses():
    | ((row: { [key: string]: any }) => string)
    | undefined {
    return (row) => {
      const classes: string[] = [];
      if (row.id === socket.id) classes.push("bg-slate-700");
      if (!roundStarted && row.bet != null)
        classes.push(row.bet > 0 ? "text-green-600" : "text-red-400");
      return classes.join(" ");
    };
  }
}
