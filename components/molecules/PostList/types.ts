export interface iPostItem {
    id: string,
    uid: string,
    isVideo?: boolean,
    comments: [],
    likes: [],
    imagesUrls: string[],
    createdAt: string,
    description?: string,
    place?: string,
    isOffComments: boolean,
    isOffLikes: boolean,
}

export interface iUserPostListProps {
    uid: string
}