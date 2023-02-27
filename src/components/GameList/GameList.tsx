/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './GameList.module.css';
import GameModal from '../GameModal/GameModal';
import fetchData from '../../helpers/FetchHelper';
import {
  GameListInfos,
  GameInfos,
  FetchArgs,
  SingleGameInfos,
} from '../../types/Types';
import FormatPlayedTime from '../../helpers/FormatPlayedTime';

export default function GameList() {
  const [show, setShow] = useState<boolean>(false);
  const [gameID, setGameID] = useState<number>();
  const [gameInfo, setGameInfo] = useState<GameInfos>();
  const [gameList, setGameList] = useState<GameListInfos>({
    game_count: 0,
    games: [
      {
        appid: 0,
        name: '',
        playtime_forever: 0,
        img_icon_url: '',
        playtime_windows_forever: 0,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0,
        rtime_last_played: 0,
      },
    ],
  });

  const notify = () =>
    toast.error('No Data Found For This Game', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const achievementsArgs: FetchArgs = {
    url: 'http://localhost:1337/api/user/achievements/game',
    user_steam_id: import.meta.env.VITE_STEAMID,
    app_id: gameID,
  };

  useEffect(() => {
    const ownedGamesArgs: FetchArgs = {
      url: 'http://localhost:1337/api/user/ownedgames',
      user_steam_id: import.meta.env.VITE_STEAMID,
    };

    fetchData<GameListInfos>(ownedGamesArgs).then((data: GameListInfos) => {
      const sortedGames = data.games.sort((a, b) => {
        const textA = a.name.toLowerCase();
        const textB = b.name.toLowerCase();
        // eslint-disable-next-line no-nested-ternary
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      setGameList({ ...data, games: sortedGames });
    });
  }, []);

  return (
    <>
      <h2 className={styles.gameCount}>Games Owned: {gameList.game_count}</h2>
      <ul className={styles.listContainer}>
        {gameList.games.map((game: SingleGameInfos) => (
          <li
            onClick={() => {
              const gameArgs = { ...achievementsArgs, app_id: game.appid };
              setGameID(game.appid);
              fetchData<GameInfos>(gameArgs).then((gameInfos: GameInfos) => {
                if (
                  gameInfos.error ||
                  gameInfos.playerstats.gameName === '' ||
                  gameInfos.playerstats.gameName.match(/ValveTestApp/)
                ) {
                  notify();
                } else if (
                  Object.prototype.hasOwnProperty.call(
                    gameInfos.playerstats,
                    'achievements'
                  ) ||
                  Object.prototype.hasOwnProperty.call(
                    gameInfos.playerstats,
                    'stats'
                  )
                ) {
                  setGameInfo(gameInfos);
                  setShow(true);
                } else {
                  notify();
                }
              });
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
                  Total Played Time: {FormatPlayedTime(game.playtime_forever)}
                </p>
              )}
              {(() => {
                if (game.rtime_last_played > 0) {
                  return (
                    <p>
                      Last time played:{' '}
                      {new Date(
                        game.rtime_last_played * 1000
                      ).toLocaleDateString()}
                    </p>
                  );
                }
                return <p className={styles.playedTime}>Game Never Played</p>;
              })()}
            </div>
          </li>
        ))}
      </ul>
      {gameInfo && (
        <GameModal
          onClose={() => setShow(false)}
          show={show}
          gameData={gameInfo}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
