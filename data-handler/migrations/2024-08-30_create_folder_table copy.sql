CREATE TABLE IF NOT EXISTS Folder (
  id TEXT PRIMARY KEY,
  isFolder BOOLEAN,    
  folderName TEXT,     
  folderDescription TEXT, 
  userId TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);
