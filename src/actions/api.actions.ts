export const fetchApiKeyLevel = async (apiKey: string) => {
  const url = `https://api.torn.com/key/?key=${apiKey}&comment=Tornalytics&selections=info`;
  const response = await fetch(url);

  const data: APIKey = await response.json();

  if (!data.access_level) {
    throw new Error("Failed to fetch API key level");
  }

  return data;
};

export const fetchUserProfile = async (
  apiKey: string,
  userID: string | null = null
) => {
  const url = `https://api.torn.com/user/${userID}?key=${apiKey}&comment=TornAPI&selections=profile`;
  const response = await fetch(url);

  const data: User = await response.json();

  if (!data.player_id) {
    throw new Error("Failed to fetch user profile");
  }

  return data;
};
