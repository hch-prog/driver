import { testD1AndR2 } from "./handlers/testHandlers";
import { handleUpload } from "./handlers/uploadHandler";
import { addUser, getUser, getUsers } from "./handlers/userhandlers";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/':
        return new Response('Worker is up and running!', { status: 200 });
      case '/get-users':
        return getUsers(env);
      case '/add-user':
        return addUser(request, env);
      case '/get-user':
        return getUser(request, env);
      case '/upload':
        return handleUpload(request, env);
      case '/test-d1-r2':
        return testD1AndR2(env);
      default:
        return new Response('Not found', { status: 404 });
    }
  }
};
