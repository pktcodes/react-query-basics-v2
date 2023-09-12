import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

import SingleItem from './SingleItem';

const Items = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => customFetch.get('/'),
  });

  if (isLoading) {
    return (
      <p
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        loading...
      </p>
    );
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
