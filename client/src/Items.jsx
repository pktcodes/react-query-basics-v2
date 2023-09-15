import { useFetchTasks } from './reactQueryCustomHooks';

import SingleItem from './SingleItem';

const Items = () => {
  const { isLoading, isError, data } = useFetchTasks();

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

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
