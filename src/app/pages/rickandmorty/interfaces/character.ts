export interface CharacterResponse {
  info:    Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string | null;
  prev:  string | null;
}

export interface Character {
  id:       number;
  name:     string;
  status: 'Alive' | 'Dead' | 'unknown';
  species:  string;
  type:     string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin:   LocationInfo;
  location: LocationInfo;
  image:    string;
  episode:  string[];
  url:      string;
  created:  string;
}

export interface LocationInfo {
  name: string;
  url:  string;
}
