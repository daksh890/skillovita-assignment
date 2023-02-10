export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Iron Man",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "Neon Man",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "Kailash Kher",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "5",
      body: "Unable to develop the filter functionality due to lack of time.",
      username: "Daksh Lakhotiya",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "6",
      body: "This is an example comment that is spread across multiple lines to check the design of the UI.",
      username: "Virat",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "7",
      body: "Lorem Lipsum flying fox.",
      username: "Chirag",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};
export const destroyComment = async () => {
  return {};
};

export const updateCommentApi = async (text) => {
  return { text };
};
