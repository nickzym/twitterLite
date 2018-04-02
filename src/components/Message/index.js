import { message } from 'antd';

const success = message => {
  message.success(message);
};

const error = message => {
  message.error(message);
};

const warning = message => {
  message.warning(message);
};


export default {
    success,
    error,
    warning
}
