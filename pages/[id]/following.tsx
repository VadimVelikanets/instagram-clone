import type { NextPage } from 'next'
import Link from "next/link";
import { useRouter } from "next/router";
const Following: NextPage = () => {

    const router = useRouter();
    const { following } = router.query;

    return (
        <div>
            <h1>following: {following}</h1>
        </div>
    )
}

export default Following
