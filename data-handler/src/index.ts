import { testD1AndR2 } from "./handlers/testHandlers";
import { handleUpload } from "./handlers/uploadHandler";
import { getFile, getUserFiles,createUser, findUser } from "./handlers/fileHandler";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    let response: Response;

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
          case '/upload':
            response = await handleUpload(request, env);
            break;
          case '/test-d1-r2':
            response = await testD1AndR2(env);
            break;
          case '/api/get-user-files':
            response = await getUserFiles(request, env);
            break;
    
          case '/create-user':
            response = await createUser(request, env);
            break;
          case '/find-User':
            response=await findUser(request,env);
          default:
            response = new Response('Not found', { status: 404 });
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
      return new Response('Error handling request', { status: 500 });
    }
  }
};

