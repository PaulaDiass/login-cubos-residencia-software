import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLocalItem } from '../../utils/sessionStorage';
import * as yup from 'yup';
import api from '../../api/api';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email('Insira um email válido')
      .required('Campo obrigatório'),
    password: yup
      .string()
      .trim()
      .required('Campo obrigatório')
      .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const handleLogin = async (data: Inputs) => {
    try {
      const response = await api.login({
        email: data.email,
        password: data.password,
      });
      console.log(response);
      setLocalItem('token', response.token);
      setLocalItem('user', response.githubAccount);
      navigate('/home');
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
            <h1>
              Acesse o <b>login</b> com seu usuário do Github
            </h1>
            <form className="form" onSubmit={handleSubmit(handleLogin)}>
              <div className="input">
                <input
                  type="text"
                  placeholder="Digite seu email"
                  {...register('email')}
                />
                <span className="input__warn">{errors.email?.message}</span>
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <span className="input__warn">{errors.password?.message}</span>
              </div>
              <a href="/recover-password">Esqueceu a senha?</a>
              <a href="/sign-up" className="link--last">
                Registrar
              </a>
              <Button action="Login" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
