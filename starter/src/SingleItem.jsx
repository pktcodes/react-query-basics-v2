import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();

  /* Edit Task */
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [`tasks`] });
      toast.success(data.msg);
    },
  });

  /* Delete Task */
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`tasks`] });
      toast.success('task deleted');
    },
  });

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => {
          editTask({ taskId: item.id, isDone: !item.isDone });
        }}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={isLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
