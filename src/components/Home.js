import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
{
  randomUrlForCurrentTime(userId: 1) {
    randomUrlForCurrentTime
  }
}
`;

function Home() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { randomUrlForCurrentTime } = data.randomUrlForCurrentTime;
  if (!randomUrlForCurrentTime) {
    return <h3>{"No links rn :/"}</h3>
  }

  return(
    <>
      <h6>{randomUrlForCurrentTime}</h6>
      <iframe
        title='preview of selected site'
        src={randomUrlForCurrentTime}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.7}
      />
    </>
  )
}

export default Home;
