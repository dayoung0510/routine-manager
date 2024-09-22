import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getUserIdInactiveOneWord,
  getUserIdActiveOneWord,
  postUserIdOneWord,
  getUserIdOnewordIdSubItems,
  postUserIdOnewordIdSubItem,
  putUserIdOnewordIdSubItem,
  deleteUserIdOnewordIdSubItem,
  putSubItemStatus,
} from 'apis/apis';

export const useGetUserIdInactiveOneWord = (userId?: string) => {
  return useQuery({
    queryKey: ['inactive-oneword'],
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
        queryKey: ['active-oneword'],
      });
    },
  });
};

export const useGetUserIdOnewordIdSubItems = ({
  onewordId,
  userId,
}: {
  onewordId?: string;
  userId?: string;
}) => {
  return useQuery({
    queryKey: ['oneword-subItems', onewordId],
    queryFn: () => {
      if (onewordId && userId) {
        return getUserIdOnewordIdSubItems({ onewordId, userId });
      }
    },
    enabled: !!onewordId && !!userId,
  });
};

export const usePostUserIdOnewordIdSubItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserIdOnewordIdSubItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oneword-subItems'],
      });
    },
  });
};

export const usePutUserIdOnewordIdSubItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserIdOnewordIdSubItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oneword-subItems'],
      });
    },
  });
};

export const useDeleteUserIdOnewordIdSubItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserIdOnewordIdSubItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oneword-subItems'],
      });
    },
  });
};

export const usePutSubItemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putSubItemStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oneword-subItems'],
      });
    },
  });
};
