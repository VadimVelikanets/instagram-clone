export interface iPaginationProps {
    children?: JSX.Element,
    dataKey: any,
    data: any[],
    isLoading: boolean,
    dataSize: number,
    loadNextDataCallback: () => void
}