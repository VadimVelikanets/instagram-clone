export interface CommentsListProps {
    postId: string,
    isCommentAdd: boolean,
    replyUser: (nickname: string) => void
}