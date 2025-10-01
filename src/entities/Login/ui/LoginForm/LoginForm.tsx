import cls from './LoginForm.module.scss'
import {AppFlex} from "@/shared/ui/AppFlex";
import {AppButton} from "@/shared/ui/AppButton";
import {Chromium} from "lucide-react";
import {AppInput} from "@/shared/ui/AppInput";

export const LoginForm = () => {

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_API_URL + "/auth/google";
    };

    return (
        <AppFlex fullWidth fullHeight align='center' justify='center' className='page'>
            <AppFlex fullWidth direction='column' gap='20' className={cls.fromWrap}>
                <AppFlex fullWidth direction='column' gap='12'>
                    <AppInput fullWidth/>
                </AppFlex>
                <AppFlex gap='20' fullWidth>
                    <AppButton text='Зарегистрироваться' variant="secondary" fullWidth/>
                    <AppButton text='Войти' fullWidth/>
                </AppFlex>
                <AppFlex gap='20' fullWidth>
                    <AppButton icoLeft={Chromium} text='Войти через google' onClick={handleGoogleLogin} variant='ghost'
                               fullWidth/>
                </AppFlex>
            </AppFlex>
        </AppFlex>
    );
}