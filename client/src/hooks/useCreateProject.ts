import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/createProject';
import type { CreateProjectPayload } from '@/types';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createProject'],
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};
