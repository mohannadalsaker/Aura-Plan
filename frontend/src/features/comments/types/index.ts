interface CommentUser {
  username: string;
}

interface CommentTask {
  title: string;
}

export interface CommentData {
  id: string;
  text: string;
  created_at: string;
  user: CommentUser;
  task: CommentTask;
}

export interface CommentTableRow {
  id: string;
  text: string;
  userName: string;
  taskTitle: string;
  createdAt: string;
}