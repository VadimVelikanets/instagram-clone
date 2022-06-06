export interface iConfirm {
    title: string,
    text: string,
    btnConfirm: string,
    btnCancel: string,
    confirmEvent: () => void,
    cancelEvent: () => void
}