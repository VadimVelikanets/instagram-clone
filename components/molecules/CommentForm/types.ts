export interface CommentFormProps {
    uid: string,
    postId: string,
    setCommentAdd: (arg: boolean)=> void,
    repliedUser: string
}