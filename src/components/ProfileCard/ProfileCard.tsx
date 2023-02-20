import { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import fetchData from '../../helpers/FetchHelper';
import { SteamProfile, FetchArgs } from '../../types/Types';

export default function ProfileCard() {
  const [steamProfil, setSteamProfil] = useState<SteamProfile>({
    steamid: '',
    communityvisibilitystate: 0,
    profilestate: 0,
    personaname: '',
    commentpermission: 0,
    profileurl: '',
    avatar: '',
    avatarmedium: '',
    avatarfull: '',
    avatarhash: '',
    lastlogoff: 0,
    personastate: 0,
    primaryclanid: '',
    timecreated: 0,
    personastateflags: 0,
    loccountrycode: '',
    locstatecode: '',
    loccityid: 0,
    realname: '',
    gameid: 0,
    gameserverip: '',
    gameextrainfo: '',
  });

  useEffect(() => {
    const args: FetchArgs = {
      url: 'http://localhost:1337/api/user/gps',
      user_steam_id: import.meta.env.VITE_STEAMID,
    };

    fetchData<SteamProfile>(args).then((fetchedProfile: SteamProfile) =>
      setSteamProfil(fetchedProfile)
    );
  }, []);

  return (
    <div className={styles.container}>
      <img src={steamProfil.avatarfull} alt="User Avatar" />
      <div className={styles.infoContainer}>
        <h1 className={styles.name}>
          <a href={steamProfil.profileurl}>{steamProfil.personaname}</a>
        </h1>
        <p>
          Last seen online:{' '}
          {new Date(steamProfil.lastlogoff * 1000).toLocaleDateString()}
        </p>
        {steamProfil.timecreated && (
          <p className={styles.createdTime}>
            Created{' '}
            {new Date(steamProfil.timecreated * 1000).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
