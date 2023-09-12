import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

import SingleItem from './SingleItem';

const Items = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => customFetch.get('/something'),

    /* Alternative - JSX return would be data.taskList*/
    // queryFn: async () => {
    //   const { data } = await customFetch.get('/');
    //   return data;
    // },
  });

  const styles = {
    marginTop: '2rem',
    textAlign: 'center',
  };

  if (isLoading) {
    return <p style={styles}>Loading...</p>;
  }

  if (isError) {
    return <p style={styles}>There was an error...</p>;
  }

  // if (error) {
  //   return <p style={styles}>{error.response.data}</p>;
  // }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
