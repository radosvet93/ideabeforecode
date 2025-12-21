import ky from 'ky';

export const uploadLeads = async ({ file, projectId }: { file: File, projectId: string }) => {
  await ky.post(`/api/leads/upload-csv?projectId=${projectId}`, {
    body: file,
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  }).json();
};