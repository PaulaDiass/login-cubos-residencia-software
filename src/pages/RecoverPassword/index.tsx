import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../api/api';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import SimpleAlert from '../../components/Alert/Alert';

type RecoverPasswordInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  userGitHub: string;
  surname: string;
};

const RecoverPassword = () => {
  const recoverPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email('Insira um email válido')
      .required('Campo obrigatório'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordInputs>({
    resolver: yupResolver(recoverPasswordSchema),
  });

  const [alertType, setAlertType] = useState<string>();

  const handleRecoverPassword = async (data: RecoverPasswordInputs) => {
    try {
      await api.forgotPassword({
        email: data.email,
      });
      setAlertType('sucess');
      setTimeout(() => {
        setAlertType('');
      }, 5000);
    } catch (error) {
      setAlertType('error');
      setTimeout(() => {
        setAlertType('');
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <div className="page__content">
          <Banner />
          <div className="form-area">
            <h1>
              Recupere o acesso ao <b>login</b> com o e-mail cadastrado
            </h1>
            <form
              className="form"
              onSubmit={handleSubmit(handleRecoverPassword)}
            >
              <div className="input">
                <input
                  type="text"
                  placeholder="Digite seu e-mail"
                  {...register('email')}
                />
                <span className="input__warn">{errors.email?.message}</span>
              </div>
              <Button action="Enviar" />
            </form>
            {alertType ? <SimpleAlert alertType={alertType} /> : null}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RecoverPassword;
