
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


    return new Response(JSON.stringify({ userId: user.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response('Failed to fetch user data', { status: 500 });
  }
}


export async function createFolder(request: Request, env: any) {
  try {
    const { folderName, userId } = await request.json();

    if (!folderName || !userId) {
      return new Response('Folder name and User ID are required', { status: 400 });
    }

    const folderPath = `/${folderName}`;

    // Check if folder already exists
    const existingFolder = await env.DB.prepare('SELECT id FROM File WHERE folder = ? AND userId = ?')
      .bind(folderPath, userId)
      .first();

    if (existingFolder) {
      return new Response('Folder already exists', { status: 400 });
    }

    // Create the folder entry
    await env.DB.prepare('INSERT INTO File (folder, userId) VALUES (?, ?)')
      .bind(folderPath, userId)
      .run();

    return new Response('Folder created successfully', { status: 201 });

  } catch (error) {
    console.error('Error creating folder:', error);
    return new Response('Failed to create folder', { status: 500 });
  }
}

export async function folderFile(request:Request, env:any) {
  try {
    console.log("works");
  } catch (error) {
    console.error('Error fetching the files:', error);
    return new Response(`Error during upload: ${error}`, { status: 500 });
  }
}



export async function fileUpload(request: Request, env: any) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const userId = formData.get('userId')?.toString();
    const folder = formData.get('folder')?.toString() || null;
    const description = formData.get('description')?.toString() || null;

    if (!file || !userId) {
      return new Response('Missing file or userId', { status: 400 });
    }

    const fileKey = `${crypto.randomUUID()}-${(file as File).name}`;
    
    // Upload the file to R2
    await env.R2.put(fileKey, file, {
      httpMetadata: { contentType: file.type },
    });
    
    const fileUrl = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileKey}`;

    // Insert the file metadata into the D1 database
    await env.DB.prepare(`
      INSERT INTO File (id, fileName, url, contentType, size, userId, folder, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      crypto.randomUUID(),                   // id
      (file as File).name,                   // fileName
      fileUrl,                               // url
      file.type,                             // contentType
      file.size,                             // size
      userId,                                // userId
      folder,                                // folder (can be null)
      description                            // description (can be null)
    )
    .run();

    return new Response(`File uploaded and metadata stored successfully with URL: ${fileUrl}`, { status: 201 });

  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(`Error during upload: ${error}`, { status: 500 });
  }
}



export async function folderUpload(request: Request, env: any) {
  try {
    const { folderName, userId } = await request.json();

    if (!folderName || !userId) {
      console.log(userId);
      console.log(folderName);
      return new Response('Folder name and User ID are required', { status: 400 });
    }

    const folderPath = `/${folderName}`;

    // Check if folder already exists
    const existingFolder = await env.DB.prepare('SELECT id FROM Folder WHERE folderName = ? AND userId = ?')
      .bind(folderPath, userId)
      .first();

    if (existingFolder) {
      return new Response('Folder already exists', { status: 400 });
    }

    // Create the folder entry
    await env.DB.prepare('INSERT INTO Folder (id, folderName, userId) VALUES (?, ?, ?)')
      .bind(crypto.randomUUID(), folderPath, userId)
      .run();

    return new Response('Folder created successfully', { status: 201 });

  } catch (error) {
    console.error('Error creating folder:', error);
    return new Response('Failed to create folder', { status: 500 });
  }
}

