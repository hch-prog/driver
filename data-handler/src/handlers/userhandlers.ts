// src/handlers/userHandlers.ts


  
  export async function addUser(request: Request, env: any) {
    try {
      const { name, email, password } = await request.json();
      await env.DB.prepare("INSERT INTO User (id, name, email, password) VALUES (?, ?, ?, ?)")
        .bind(crypto.randomUUID(), name, email, password)
        .run();
      return new Response("User added successfully", { status: 201 });
    } catch (error) {
      return new Response(`Error adding user: ${error.message}`, { status: 500 });
    }
  }
  
  export async function getUser(request: Request, env: any) {
    try {
      const { id } = await request.json();
      console.log(env.R2.bucket_name);
      const result = await env.DB.prepare("SELECT * FROM User WHERE id = ?").bind(id).first();
      if (result) {
        return new Response(JSON.stringify(result), { status: 200 });
      } else {
        return new Response("User not found", { status: 404 });
      }
    } catch (error) {
      return new Response(`Error fetching user: ${error.message}`, { status: 500 });
    }
  }