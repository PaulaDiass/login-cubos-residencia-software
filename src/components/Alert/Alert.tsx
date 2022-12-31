import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type Props = {
  alertType?: string;
};

function SimpleAlert({ alertType }: Props) {
  return (
    <>
      {alertType === 'error' ? (
        <Alert variant="filled" severity="error">
          <AlertTitle>Erro</AlertTitle>
          E-mail não localizado — <strong>verifique o e-mail informado!</strong>
        </Alert>
      ) : (
        <Alert variant="filled" severity="success">
          <AlertTitle>Sucesso</AlertTitle>
          Link para recuperação enviado — <strong>verifique seu e-mail!</strong>
        </Alert>
      )}
    </>
  );
}

export default SimpleAlert;
