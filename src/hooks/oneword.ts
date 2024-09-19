import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getUserIdInactiveOneWord,
  getUserIdActiveOneWord,
  postUserIdOneWord,
} from 'apis/apis';

export const useGetUserIdInactiveOneWord = (userId?: string) => {
  return useQuery({
    queryKey: ['oneword'],
    queryFn: () => {
      if (userId) {
        return getUserIdInactiveOneWord(userId);
      }
    },
    enabled: !!userId,
  });
};

export const useGetUserIdActiveOneWord = (userId?: string) => {
  return useQuery({
    queryKey: ['active-oneword'],
    queryFn: () => {
      if (userId) {
        return getUserIdActiveOneWord(userId);
      }
    },
    enabled: !!userId,
  });
};

export const usePostUserIdOneWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserIdOneWord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['active-oneword', 'inactive-oneword'],
      });
    },
  });
};
