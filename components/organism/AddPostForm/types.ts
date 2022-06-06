export interface iUploadFilesToPost{
    uid: string,
    description?: string,
    place?: string,
    isOffLikes: boolean,
    isOffComments: boolean,
    files: object
}

export interface iAddPost {
    uid: string,
    description?: string,
    place?: string,
    isOffLikes: boolean,
    isOffComments: boolean,
    imagesUrls: string[]
}

export interface iAddPostForm {
    cancelPost: ()=> void,
    checkPostAdded: (value: boolean)=>void
}