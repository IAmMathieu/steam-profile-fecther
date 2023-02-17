import { useEffect, useState } from "react";
import styles from "@assets/styles/views/GameList.module.css";
import GameModal from "../GameModal/GameModal";
import fetchData from "@helpers/FetchHelper";

type GameList = {
  game_count: number;
  games: {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    rtime_last_played: number;
    has_community_visible_stats?: boolean;
    content_descriptorids?: number[];
    has_leaderboards?: boolean;
    playtime_2weeks?: number;
  }[];
};

export default function GameList(props: { profilID: string }) {
  const [show, setShow] = useState(false);
  const [gameID, setGameID] = useState(0);
  const [gameList, setGameList] = useState<GameList>({
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

  useEffect(() => {
    fetchData("http://localhost:1337/api/user/ownedgames", import.meta.env.VITE_STEAMID).then(
      (data: GameList) => {
        data.games = data.games.sort(function (a, b) {
          let textA = a.name.toLowerCase();
          let textB = b.name.toLowerCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setGameList(data);
      }
    );   
  }, []);

  return (
    <>
      <h2 className={styles.gameCount}>Games Owned: {gameList.game_count}</h2>
      <ul className={styles.listContainer}>
        {gameList.games.map((game) => (
          <li
            onClick={() => {
              setShow(true);
              setGameID(game.appid);
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
                  Total Played Time:{" "}
                  {(() => {
                    if (Math.floor(game.playtime_forever / (24 * 60)) > 0) {
                      return (
                        Math.floor(game.playtime_forever / (24 * 60)) +
                        " Day(s)"
                      );
                    }
                  })()}{" "}
                  {(() => {
                    if (
                      Math.floor((game.playtime_forever % (24 * 60)) / 60) > 0
                    ) {
                      return (
                        Math.floor((game.playtime_forever % (24 * 60)) / 60) +
                        " Hour(s)"
                      );
                    }
                  })()}{" "}
                  {""}
                  {(() => {
                    if (
                      game.playtime_forever -
                        Math.floor(game.playtime_forever / 60) * 60 >
                      0
                    ) {
                      return (
                        Math.floor(
                          game.playtime_forever -
                            Math.floor(game.playtime_forever / 60) * 60
                        ) + " Minute(s)"
                      );
                    }
                  })()}{" "}
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
      <GameModal onClose={() => setShow(false)} show={show} gameID={gameID} />
    </>
  );
}
