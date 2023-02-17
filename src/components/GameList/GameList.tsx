import { useEffect, useState } from "react";
import styles from "./GameList.module.css";
import GameModal from "../GameModal/GameModal";
import fetchData from "../../helpers/FetchHelper";
import {
  GameListInfos,
  GameInfos,
  FetchArgs,
  SingleGameInfos,
} from "../../types/Types";
import FormatPlayedTime from "../../helpers/FormatPlayedTime";

export default function GameList(props: { profilID: string }) {
  const [show, setShow] = useState<boolean>(false);
  const [gameID, setGameID] = useState<number>();
  const [gameList, setGameList] = useState<GameListInfos>({
    game_count: 0,
    games: [
      {
        appid: 0,
        name: "",
        playtime_forever: 0,
        img_icon_url: "",
        playtime_windows_forever: 0,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0,
        rtime_last_played: 0,
      },
    ],
  });

  const args: FetchArgs = {
    url: "http://localhost:1337/api/user/achievements/game",
    user_steam_id: import.meta.env.VITE_STEAMID,
    app_id: gameID,
  };

  useEffect(() => {
    const args: FetchArgs = {
      url: "http://localhost:1337/api/user/ownedgames",
      user_steam_id: import.meta.env.VITE_STEAMID,
    };

    fetchData<GameListInfos>(args).then((data: GameListInfos) => {
      data.games = data.games.sort(function (a, b) {
        let textA = a.name.toLowerCase();
        let textB = b.name.toLowerCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setGameList(data);
    });
  }, []);

  return (
    <>
      <h2 className={styles.gameCount}>Games Owned: {gameList.game_count}</h2>
      <ul className={styles.listContainer}>
        {gameList.games.map((game: SingleGameInfos) => (
          <li
            onClick={() => {
              const gameArgs = { ...args, app_id: game.appid };
              setGameID(game.appid);
              setShow(true);
              fetchData<GameInfos>(gameArgs).then((gameInfos: GameInfos) =>
                console.log(gameInfos)
              );
            }}
            className={styles.itemContainer}
            key={game.appid}
          >
            {game.appid > 0 && (
              <img
                className={styles.gameIcon}
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={`${game.name} Logo`}
              />
            )}
            <div className={styles.gameInfo}>
              <h2 className={styles.gameName}>{game.name}</h2>
              {game.playtime_forever > 0 && (
                <p className={styles.playedTime}>
                  Total Played Time:{" "}{FormatPlayedTime(game.playtime_forever)}
                </p>
              )}
              {(() => {
                if (game.rtime_last_played > 0) {
                  return (
                    <p>
                      Last time played:{" "}
                      {new Date(
                        game.rtime_last_played * 1000
                      ).toLocaleDateString()}
                    </p>
                  );
                } else {
                  return <p className={styles.playedTime}>Game Never Played</p>;
                }
              })()}
            </div>
          </li>
        ))}
      </ul>
      <GameModal onClose={() => setShow(false)} show={show} />
    </>
  );
}
