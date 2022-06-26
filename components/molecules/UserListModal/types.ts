export interface iUserListModal {
    id: string,
    title: string,
    getUserListData: (id: string) => Promise<[]>
}