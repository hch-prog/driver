import { testD1AndR2 } from "./handlers/testHandlers";
import { handleUpload } from "./handlers/uploadHandler";
import { getUserFiles, createUser, findUser, getUserId, getFile } from "./handlers/fileHandler";
import { createFolder, addFileToFolder, getUserData } from "./handlers/filesHandler";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    let response: Response;

    const pathname = url.pathname;

    try {
      if (pathname.startsWith('/get-file/')) {
        const fileId = pathname.split("/").pop();
        if (fileId) {
          response = await getFile(request, env); // Pass the request object here
        } else {
          response = new Response('File ID not provided', { status: 400 });
        }
      } else {
        switch (pathname) {
          case '/':
            response = new Response('Worker is up and running!', { status: 200 });
            break;
          case '/upload':
            response = await handleUpload(request, env);
            break;
          case '/test-d1-r2':
            response = await testD1AndR2(env);
            break;
          case '/api/get-user-files':
            response = await getUserFiles(request, env);
            break;
          case '/get-file/': // This case is unnecessary because you already handled it above
            response = await getFile(request, env);
            break;
          case '/get-userid':
            response = await getUserId(request, env);
            break;
          case '/create-user':
            response = await createUser(request, env);
            break;
          case '/find-user':
            response = await findUser(request, env);
            break;
          case '/create-folder':
            response = await createFolder(request, env);
            break;
          case '/add-file-to-folder':
            response = await addFileToFolder(request, env);
            break;
          case '/get-user-data':
            response = await getUserData(request, env);
            break;

          default:
            response = new Response('Not found', { status: 404 });
        }
      }

      // Adding CORS headers
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
