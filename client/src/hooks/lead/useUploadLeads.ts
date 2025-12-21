import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadLeads } from '@/services/lead/uploadLeads';

export const useUploadLeads = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['uploadLeads'],
    mutationFn: ({ file, projectId }: { file: File, projectId: string }) => uploadLeads({ file, projectId }),

    onSuccess: async (_, vars) => {
      await queryClient.invalidateQueries({
        queryKey: ['project', vars.projectId],
      });
    },
  });
};
