import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  putUserName,
  getUserPasswordExist,
  postUserPassword,
} from '../apis/apis';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const usePutUserName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserName,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useGetUserPasswordExist = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserPasswordExist(id),
  });
};

export const usePostUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserPassword,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
