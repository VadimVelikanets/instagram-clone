import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchUser} from "../../../store/action-creators/user";
import styles from './SignupForm.module.scss';
import Image from "next/image";
import Link from "next/link";
import {signUp} from "../../../pages/api/signUp";
import {useRouter} from "next/router";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import Button from "../../atoms/Button/Button";
import BtnFacebookAuth from "../../atoms/BtnFacebookAuth/BtnFacebookAuth";
import FormText from "../../atoms/FormText/FormText";
import {useAppSelector} from "../../../hooks";

const SignupForm = () => {

    const user = useAppSelector(state => state.user?.user)
    const router = useRouter()
    if(user) {
        router.push('/')
    }
    const signUpHandler =  () => {
        signUp(email, password, name, nickname)
        router.push('/account/login')
    };

    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [nickname, setNickname] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isDisableSubmit, setDisableSubmit] = useState(false);

    useEffect(() => {
        if(email === '' ||
            password.length < 5 ||
            name.length < 3 ||
            nickname.length < 3) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [email, password, name, nickname])

    return (
        <>
            <div className={styles.login}>
                <Image src="/images/login-logo.png" width="175" height="51" className={`${styles.logo} mb-8`}/>
                <div className={styles.text}>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</div>
                <BtnFacebookAuth className="mb-3"/>
                <FormText/>
                <div className="form mt-6 flex flex-col w-full">
                    <Input value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"
                           label="Email"/>
                    <Input value={name}
                           onChange={e => setName(e.target.value)}
                           type="text"
                           label="Full name"/>
                    <Input value={nickname}
                           onChange={e => setNickname(e.target.value)}
                           type="text"
                           label="User Name"/>
                    <InputPassword value={password}
                                   onChange={e => setPassword(e.target.value)} label="Password" />
                    <Button disabled={isDisableSubmit} btnEvent={signUpHandler} className="my-3 bg-blue-400 text-white py-2 px-4 rounded-md" text="Sign Up" />
                </div>
            </div>
            <div className={styles.signupInfo}>
                <span className={styles.signupInfoText}>
                    Есть аккаунт <Link href="/account/login"><span className={styles.signupInfoLink}>Login</span></Link>
                </span>

            </div>
        </>

    );
};

export default SignupForm;