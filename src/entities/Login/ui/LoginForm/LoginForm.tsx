import cls from './LoginForm.module.scss'
import {AppFlex} from "@/shared/ui/AppFlex";
import {AppButton} from "@/shared/ui/AppButton";

export const LoginForm = () => {
    return (
        <AppFlex fullWidth fullHeight align='center' justify='center' className='page'>
            <AppFlex fullWidth direction='column' gap='20' className={cls.fromWrap}>
                <AppFlex gap='20' fullWidth>
                    <AppButton text='Зарегистрироваться' variant="secondary" fullWidth/>
                    <AppButton text='Войти' fullWidth/>
                </AppFlex>
            </AppFlex>
        </AppFlex>
    );
}