import bcrypt from 'bcryptjs';

export async function getFile(fileId: string, env: any) {
  try {
   
    const fileMetadata = await env.DB.prepare("SELECT * FROM File WHERE id = ?").bind(fileId).first();

    if (!fileMetadata) {
      console.error('File metadata not found in DB');
      return new Response('File not found', { status: 404 });
    }

    
    const fileKey = fileMetadata.url.split('/').pop();
    if (!fileKey) {
      console.error('Invalid file URL in DB');
      return new Response('Invalid file URL in DB', { status: 400 });
    }

    
    const fileObject = await env.R2.get(fileKey);

    if (!fileObject) {
      console.error('File not found in R2');
      return new Response('File not found in R2', { status: 404 });
    }

    
    return new Response(fileObject.body, {
      status: 200,
      headers: {
        'Content-Type': fileMetadata.contentType,
        'Content-Disposition': `inline; filename="${fileMetadata.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new Response(`Error fetching file: ${error}`, { status: 500 });
  }
}

export async function findUser(request: Request, env: any) {
  try {
    const { email } = await request.json();
    const result = await env.DB.prepare('SELECT * FROM User WHERE email = ?').bind(email).first();

    if (!result) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error finding user:', error);
    return new Response('Error finding user', { status: 500 });
  }
}



export async function createUser(request: Request, env: any) {
  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = crypto.randomUUID();

    await env.DB.prepare('INSERT INTO User (id, email, name, password) VALUES (?, ?, ?, ?)')
      .bind(id, email, name, hashedPassword)
      .run();

    return new Response(JSON.stringify({ id, email, name }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Failed to create user', { status: 500 });
  }
}



export async function getUserFiles(request: Request, env: any) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response('Missing userId query parameter', { status: 400 });
    }

    console.log(`Fetching files for userId: ${userId}`);

    const result = await env.DB.prepare("SELECT * FROM File WHERE userId = ?").bind(userId).all();

    if (result.results.length === 0) {
      console.log('No files found for the user');
      return new Response('No files found', { status: 404 });
    }

    console.log(`Found ${result.results.length} files for userId: ${userId}`);
    
    return new Response(JSON.stringify({ files: result.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    return new Response(`Error fetching files: ${error}`, { status: 500 });
  }
}

