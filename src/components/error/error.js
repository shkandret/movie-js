import { Alert } from 'antd';
import './error.css';

function ErrorIndicator({ errorMessage }) {
  return <Alert message="Что-то не так.. " description={errorMessage} type="error" className="alert-error" />;
}

export default ErrorIndicator;
