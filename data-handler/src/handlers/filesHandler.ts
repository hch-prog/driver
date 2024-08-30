
export async function createFolder(request: Request, env: any) {
  try {
    const { folderName, userId, parentFolder } = await request.json();
    const folderPath = parentFolder ? `${parentFolder}/${folderName}` : folderName;

    const folderId = crypto.randomUUID();

    await env.DB.prepare(
      'INSERT INTO File (id, fileName, url, contentType, size, userId, folder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(folderId, folderName, folderPath, 'folder', 0, userId, folderPath, 'Folder').run();

    return new Response(JSON.stringify({ id: folderId, folderPath }), { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return new Response('Failed to create folder', { status: 500 });
  }
}

export async function addFileToFolder(request: Request, env: any) {
  try {
    const { fileName, fileUrl, contentType, size, userId, folder } = await request.json();
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const fileId = crypto.randomUUID();

    await env.DB.prepare(
      'INSERT INTO File (id, fileName, url, contentType, size, userId, folder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(fileId, fileName, fileUrl, contentType, size, userId, folder, 'File').run();

    return new Response(JSON.stringify({ id: fileId, filePath }), { status: 201 });
  } catch (error) {
    console.error('Error adding file to folder:', error);
    return new Response('Failed to add file to folder', { status: 500 });
  }
}


export async function getUserData(request: Request, env: any) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response('Email is required', { status: 400 });
    }
    
    const user = await env.DB.prepare('SELECT id FROM User WHERE email = ?').bind(email).first();

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

   
    return new Response(JSON.stringify({ userId: user.id }), { status: 200, headers: { 'Content-Type': 'application/json' }});

  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response('Failed to fetch user data', { status: 500 });
  }
}




