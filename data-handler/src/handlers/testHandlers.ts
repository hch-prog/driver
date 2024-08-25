export async function testD1AndR2(env: any) {
  try {
    const userId = crypto.randomUUID();
    const userName = 'Test User';
    const userEmail = `testuser-${userId}@example.com`;
    
    await env.DB.prepare("INSERT INTO User (id, name, email, password) VALUES (?, ?, ?, ?)")
      .bind(userId, userName, userEmail, 'password')
      .run();

    const fileContent = new TextEncoder().encode('This is a test file content');
    const fileKey = `${crypto.randomUUID()}-testfile.txt`;

   
    const bucketName = env.R2?.bucket_name; 
    console.log('R2 Bucket Name:', bucketName);

    await env.R2.put(fileKey, fileContent, {
      httpMetadata: { contentType: 'text/plain' },
    });
    
    const result = await env.DB.prepare("SELECT * FROM User WHERE id = ?").bind(userId).first();
    const file = await env.R2.get(fileKey);
    if (!file) {
      throw new Error('File upload failed');
    }

    return new Response(JSON.stringify({
      message: 'D1 and R2 are both working!',
      user: result,
      fileUrl: `https://${bucketName}.r2.cloudflarestorage.com/${fileKey}`
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(`Error during test: ${error.message}`, { status: 500 });
  }
}
