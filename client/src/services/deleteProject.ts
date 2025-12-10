import ky from 'ky';

export const deleteProject = async (id: string) => {
  const deleteResponse = await ky.delete(`/api/projects/${id}`);

  return deleteResponse.status;
};