import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../api/api';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

type RegisterPasswordInputs = {
  password: string;
  confirmPassword: string;
};

const RegisterPassword = () => {
  const registerPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .required('Campo obrigatório')
      .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPasswordInputs>({
    resolver: yupResolver(registerPasswordSchema),
  });

  const routeParams = useParams();
  const token = routeParams.token || '';

  const handleRegisterPassword = async (data: RegisterPasswordInputs) => {
    try {
      await api.resetPassword({
        password: data.password,
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <div className="page__content">
          <Banner />
          <div className="form-area">
            <h1>Cadastre uma nova senha</h1>
            <form
              className="form"
              onSubmit={handleSubmit(handleRegisterPassword)}
            >
              <div className="input">
                <input
                  type="password"
                  placeholder="Digite a nova senha"
                  {...register('password')}
                />
                <span className="input__warn">{errors.password?.message}</span>
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Repita a nova senha"
                  {...register('confirmPassword')}
                />
                <span className="input__warn">
                  {errors.confirmPassword?.message}
                </span>
              </div>
              <Button action="Login" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RegisterPassword;
