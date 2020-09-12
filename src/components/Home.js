import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

const RANDOM_URL_QUERY = loader('../graphql/random_url/random_url_query.graphql');

function Home() {
  const { loading, error, data } = useQuery(RANDOM_URL_QUERY, {
    variables: { userId: 2 },
  });

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
