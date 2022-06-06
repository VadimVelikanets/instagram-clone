import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchUser} from "../../../store/action-creators/user";
import styles from './ResetForm.module.scss';
import Image from "next/image";
import {auth, provider} from "../../../config/firebaseSetup";
import Link from "next/link";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import FormText from "../../atoms/FormText/FormText";
import {useAppSelector} from "../../../hooks";
import {useRouter} from "next/router";

const ResetForm = () => {

    const user = useAppSelector(state => state.user?.user)
    const router = useRouter()
    const [isDisableSubmit, setDisableSubmit] = useState(false)

    if(user) {
        router.push('/')
    }
    const sendEmail = async () => {
        await auth.sendPasswordResetEmail(email).then(res => console.log(res))
    }
    const [email, setEmail] = React.useState('')
    useEffect(()=>{
        if(email.length < 6) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [email])
    return (
        <>
            <div className={styles.login}>
                <Image src="/images/lock.png" width="96" height="96" className={styles.logo}/>
                <div className={styles.title}>Не удается войти?
                </div>
                <div className={styles.text}>Введите свой электронный адрес, имя пользователя или номер телефона, и мы отправим вам ссылку для восстановления доступа к аккаунту.</div>
                <div className="form mt-8 flex flex-col w-full">
                    <Input value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"
                           label="Email"/>
                    <Button disabled={isDisableSubmit} btnEvent={sendEmail} text="Get link"  className="my-3 bg-blue-400 text-white py-2 px-4 rounded-md"/>
                    <FormText/>
                </div>
                <Link href="/account/login"><span className={styles.signUp}>Create new account</span></Link>
            </div>

            <div className={styles.signupInfo}>
                <span className={styles.signupInfoText}>
                    <Link href="/account/login"><span className={styles.signupInfoLink}>Login</span></Link>
                </span>
            </div>
        </>

    );
};

export default ResetForm;