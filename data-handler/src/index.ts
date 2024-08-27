import { testD1AndR2 } from "./handlers/testHandlers";
import { handleUpload } from "./handlers/uploadHandler";
import { addUser, getUser, getUsers } from "./handlers/userHandlers";
import { getFile, getUserFiles } from "./handlers/fileHandler";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    let response: Response;

    switch (url.pathname) {
      case '/':
        response = new Response('Worker is up and running!', { status: 200 });
        break;
      case '/get-users':
        response = await getUsers(env);
        break;
      case '/add-user':
        response = await addUser(request, env);
        break;
      case '/get-user':
        response = await getUser(request, env);
        break;
      case '/upload':
        response = await handleUpload(request, env);
        break;
      case `/get-file/${url.pathname.split("/").pop()}`:
        response = await getFile(url.pathname.split("/").pop(), env);
        break;
      case '/test-d1-r2':
        response = await testD1AndR2(env);
        break;
      case '/api/get-user-files':
        response = await getUserFiles(request, env);
        break;
      default:
        response = new Response('Not found', { status: 404 });
    }

    // Adding CORS headers
    response = new Response(response.body, {
      ...response,
      headers: {
        ...response.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

    return response;
  }
};
