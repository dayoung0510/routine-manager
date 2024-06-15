import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postTask } from 'apis/apis';

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
