import { useEffect, useState } from "react";
import styles from "@assets/styles/views/ProfileCard.module.css";

type SteamProfile = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  personastateflags: number;
  primaryclanid?: string;
  timecreated?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
  realname?: string;
  gameid?: number;
  gameserverip?: string;
  gameextrainfo?: string;
};

export default function profileCard(props: { profilID: string }) {
  const [steamProfil, setSteamProfil] = useState<SteamProfile>({
    steamid: "",
    communityvisibilitystate: 0,
    profilestate: 0,
    personaname: "",
    commentpermission: 0,
    profileurl: "",
    avatar: "",
    avatarmedium: "",
    avatarfull: "",
    avatarhash: "",
    lastlogoff: 0,
    personastate: 0,
    primaryclanid: "",
    timecreated: 0,
    personastateflags: 0,
    loccountrycode: "",
    locstatecode: "",
    loccityid: 0,
    realname: "",
    gameid: 0,
    gameserverip: "",
    gameextrainfo: "",
  });

  async function fetchedData() {
    const fData = await fetch("http://localhost:1337/api/user/gps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // FIXME: need to pass steam 64bit id as a string to avoid javascript precision issue, stringify cant serialize BigInt. Example below
      body: JSON.stringify({ user_steam_id: "76561198042858555" }),
    });

    const data: SteamProfile = await fData.json();

    setSteamProfil(data);
  }

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div className={styles.container}>
      <img src={steamProfil.avatarfull} alt="User Avatar" />
      <div className={styles.infoContainer}>
        <h1 className={styles.name}><a href={steamProfil.profileurl}>{steamProfil.personaname}</a></h1>
        <p>Last seen online: {new Date(steamProfil.lastlogoff * 1000).toLocaleDateString()}</p>
        {steamProfil.timecreated && (
          <p className={styles.createdTime}>
            Created{" "}
            {new Date(steamProfil.timecreated * 1000).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
