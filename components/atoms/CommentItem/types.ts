import {iComment} from "../../../pages/api/comments";

export interface commentItemProps {
    item: iComment
    replyUser: (nickname: string) => void
}