import swal from 'sweetalert';

const config = {timer: 5000}

const success = async (message: any) => {
  swal({
    title : "Success",
    text  :  message,
    icon  :  "success",
    timer : config.timer,
  });
};

const error = async (message: any) => {
  swal({
    title : "Error",
    text  :  message,
    icon  :  "error",
    timer : config.timer,
  });
};

export { success, error }