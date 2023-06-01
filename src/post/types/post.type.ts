export type Post = {
    id: string;
    body: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
      id: string;
      email: string;
    };
    comments?: Comment[];
  };

  