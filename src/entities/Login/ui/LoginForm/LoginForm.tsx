import cls from './LoginForm.module.scss'
import {AppFlex} from "@/shared/ui/AppFlex";
import {AppButton} from "@/shared/ui/AppButton";

export const LoginForm = () => {
    return (
        <div className={cls.formWrap}>
            LoginForm
            <AppFlex direction='column' gap='20'>
                <AppFlex gap='20'>
                    <AppButton text='Зарегистрироваться' variant="secondary"/>
                    <AppButton text='Войти'/>
                </AppFlex>
            </AppFlex>
        </div>
    );
}