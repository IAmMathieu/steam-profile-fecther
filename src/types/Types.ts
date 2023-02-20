import { KeyboardEventHandler, MouseEventHandler } from 'react';

export type SteamProfile = {
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
  error?: string;
};

export type GameListInfos = {
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
  error?: string;
};

export type SingleGameInfos = {
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
  error?: string;
};

export type GameInfos = {
  playerstats: {
    steamID: string;
    gameName: string;
    achievements: {
      name: string;
      achieved: number;
    }[];
    stats: {
      name: string;
      value: number;
    }[];
  };
  error?: string;
};

export type FetchArgs = {
  url: string;
  user_steam_id?: string;
  app_id?: number;
};

export type Show = {
  show: boolean;
  onClose: MouseEventHandler<HTMLElement>;
};
