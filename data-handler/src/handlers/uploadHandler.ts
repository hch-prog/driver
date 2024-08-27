export async function handleUpload(request: Request, env: any) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!file || !name || !email || !password) {
      console.error('Missing file or required fields');
      return new Response('Missing file or required fields', { status: 400 });
    }

    const fileKey = `${crypto.randomUUID()}-${(file as File).name}`;
    console.log('Generated file key:', fileKey);


    await env.R2.put(fileKey, file, {
      httpMetadata: { contentType: file.type },
    });
    console.log('File uploaded to R2:', fileKey);

   
    const fileUrl = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileKey}`;
    console.log('Generated file URL:', fileUrl);

    const userId = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO User (id, name, email, password) VALUES (?, ?, ?, ?)")
      .bind(userId, name, email, password)
      .run();
    console.log('User data inserted into DB:', userId);

    await env.DB.prepare("INSERT INTO File (id, fileName, url, contentType, size, userId) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), (file as File).name, fileUrl, file.type, file.size, userId)
      .run();
    console.log('File metadata inserted into DB:', fileKey);

    return new Response(`File uploaded and user data added successfully with file URL: ${fileUrl}`, { status: 201 });

  } catch (error) {
    console.error('Error during upload:', error);
    return new Response(`Error during upload: ${error.message}`, { status: 500 });
  }
}
