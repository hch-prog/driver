
import { getUserFiles, createUser, findUser, getUserId, getFile, getUserFolders } from "./handlers/fileHandler";
import { fileUpload, folderUpload, getUserData } from "./handlers/filesHandler";


export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    let response: Response = new Response('Not found', { status: 404 });

    const pathname = url.pathname;
    try {
      if (pathname.startsWith('/get-file/')) {
        const fileId = pathname.split("/").pop();
        if (fileId) {
          response = await getFile(fileId, env);
        } else {
          response = new Response('File ID not provided', { status: 400 });
        }
      } else {
        switch (pathname) {
          case '/':
            response = new Response('Worker is up and running!', { status: 200 });
            break;
          
          case '/api/get-user-files':
            response = await getUserFiles(request, env);
            break;
          case '/api/get-user-folder':
            response = await getUserFolders(request, env);
            break;
        
          case '/create-user':
            response = await createUser(request, env);
            break;
          case '/find-user':
            response = await findUser(request, env);
            break;
          case '/get-user-data':
            response = await getUserData(request, env);
            break;
          case '/folder-create':
            response = await folderUpload(request, env);
            break;
          case '/file-upload':
            response = await fileUpload(request, env);
            break;
          default:
            response = new Response('Not found', { status: 404 });
            break;
        }
      }

      response = new Response(response.body, {
        ...response,
        headers: {
          ...response.headers,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });

      return response;
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response('Error handling request', { status: 500 });
    }
  }
};
