import { useState } from 'react';
import { omit } from 'lodash';

const useForm = () => {
  // Valores de formulario
  const [values, setValues] = useState({});
  // Errores
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //Una función para validar cada valor de entrada
    switch (name) {
     case 'username':
      if (value.length <= 3) {   
    // Nosotras estableceremos el estado de error
         setErrors({
          ...errors,
              username: 'El usuario deberia tener al menos 4 letras'
                })
      } else {
//establecer el estado de error vacío o eliminar el error para la entrada de nombre de usuario
//La función de omisión elimina/omite el valor del objeto dado y devuelve un nuevo objeto
    let newObj = omit(errors, "username");
     setErrors(newObj);
       }
        break;

     case 'email':
      if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value) ){
         setErrors({
          ...errors,
              email:'Ingresa un correo válido'
                })
      } else {
    let newObj = omit(errors, "email");
     setErrors(newObj);
       }
        break;
            
     case 'password':
      if( !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value) ){
         setErrors({
         ...errors,
              password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                 })
      } else {
    let newObj = omit(errors, "password");
     setErrors(newObj);
        }
        break;
            default:
        break;
        }
    }

    const handleSubmit = (event) => {
        if(event) event.preventDefault();

        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            callback();

        }else{
            alert("There is an Error!");
        }
    }
  // Método para manejar entradas del formulario
  const handleChange = (event) => {
    // Detener eventos predeterminados
    event.persist();

    const { name } = event.target;
    const val = event.target.value;

    // Establecer valores en el estado
    setValues({
      ...values,
      [name]: val,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
