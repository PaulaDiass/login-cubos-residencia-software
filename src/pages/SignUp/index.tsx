import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../api/api';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  githubAccount: string;
  nickname: string;
};

const SignUp = () => {
  const signUpSchema = yup.object().shape({
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
    githubAccount: yup.string().trim().required('Campo obrigatório'),
    nickname: yup.string().trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const handleSignUp = async (data: SignUpInputs) => {
    try {
      await api.register({
        email: data.email,
        password: data.password,
        githubAccount: data.githubAccount,
        nickname: data.nickname,
      });
      navigate('/');
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
            <form className="form" onSubmit={handleSubmit(handleSignUp)}>
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
              <div className="input">
                <input
                  type="password"
                  placeholder="Repita sua senha"
                  {...register('confirmPassword')}
                />
                <span className="input__warn">
                  {errors.confirmPassword?.message}
                </span>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Usuário GitHub"
                  {...register('githubAccount')}
                />
                <span className="input__warn">
                  {errors.githubAccount?.message}
                </span>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Apelido"
                  {...register('nickname')}
                />
                <span className="input__warn">{errors.nickname?.message}</span>
              </div>
              <Button action="Cadastro" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
