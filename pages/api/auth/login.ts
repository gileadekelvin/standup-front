export const getAuthTokenFromApi = async (token: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_RELAY_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation Login($token: String!) {
          login(token: $token) {
            token
            Error
          }
        }
      `,
      variables: {
        token: token,
      },
    }),
  }).then((res) => res.json());
  return response?.data?.login?.token as string;
};
