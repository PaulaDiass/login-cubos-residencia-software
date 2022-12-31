type UserRepo = {
  id: number;
  full_name: string;
  description: string;
};

type User = {
  avatar_url?: string;
  name?: string;
  bio?: string;
  company?: string;
  location?: string;
  email?: string;
  twitter_username?: string;
  html_url?: string;
  blog?: string;
  public_repos?: number;
  followers: number;
  following: number;
};

export type { User, UserRepo };
