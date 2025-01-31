// Example schema for folders and notes
const schema = {
  folders: {
    folderId: {
      id: 'string',
      name: 'string',
      userId: 'string',
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  },
  notes: {
    noteId: {
      id: 'string',
      title: 'string',
      text: 'string',
      folderId: 'string', // Reference to folder
      userId: 'string',
      isPinned: 'boolean',
      color: 'string',
      tags: ['string'],
      category: 'string',
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  }
};

export default schema; 