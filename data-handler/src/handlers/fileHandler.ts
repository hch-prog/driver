import bcrypt from 'bcryptjs';


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

export async function getFile(request: Request, env: any) {
  try {
    const url = new URL(request.url);
    const fileId = url.pathname.split('/').pop(); // Extract the fileId from the URL

    if (!fileId) {
      return new Response('File ID is required', { status: 400 });
    }

    // Fetch file metadata from the database
    const fileMetadata = await env.DB.prepare('SELECT * FROM File WHERE id = ?').bind(fileId).first();

    if (!fileMetadata) {
      return new Response('File not found', { status: 404 });
    }

    // Construct the file URL from the metadata
    const fileUrl = fileMetadata.url;

    console.log('Fetching file from URL:', fileUrl);

    // Fetch the actual file from the storage (R2 or other storage)
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      console.error('Error fetching file from storage:', fileResponse.status, fileResponse.statusText);
      return new Response('Error fetching file from storage', { status: 500 });
    }

    // Return the file content
    return new Response(fileResponse.body, {
      status: 200,
      headers: {
        'Content-Type': fileMetadata.contentType,
        'Content-Disposition': `inline; filename="${fileMetadata.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new Response('Failed to fetch file', { status: 500 });
  }
}







export async function getUserId(request: Request, env: any) {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response('Email is required', { status: 400 });
    }
    const user = await env.DB.prepare('SELECT id FROM User WHERE email = ?').bind(email).first();
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    const userId = user.id;

    // Returning user.id in a JSON response
    return new Response(JSON.stringify({ userId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return new Response(`Error fetching user ID: ${error}`, { status: 500 });
  }
}
