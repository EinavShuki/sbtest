import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error_msg_div">
      <h1>{message}</h1>
    </div>
  );
};

export default ErrorMessage;
