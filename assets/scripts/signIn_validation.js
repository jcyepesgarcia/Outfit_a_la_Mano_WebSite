document.getElementById('sign-up').addEventListener('click', ()=>{
    location.href = '../../registro.html';
});

document.getElementById('nickName').focus();

const form = document.getElementById('user-form');
const submitButton = document.getElementById('submit-btn');

let timeout = null;//Se crea esta variable para agregar un tiempo de espera en el evento 'keydown' con el método setTimeout(), y que el evento no recoja de uno en uno los carácteres digitados por el ususario.

//El objeto errors contiene los diferentes atributos name, de cada uno de los elementos input contenidos en las etiquetas div con clase .form-box.
let errors = {
    nickName: true,
    email: true,
}

const mailFormatRegex = /^[^@]+@\w+(\.\w+)+\w$/;//Expresión regular para la validación de estructura de un email.


document.querySelectorAll('.form-box').forEach((form_box) => {

    let boxInput = form_box.querySelector('input');

    boxInput.addEventListener('keydown', () => {

        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            validation(form_box, boxInput);
        }, 500);//El usuario tiene un tiempo de espera de 0.5 seg una vez se detiene al digitar, antes de que el evento se reinicie.
    });

});

//La función valida si el ususario ingresa información en los input. Si no lo hace agrega la clase .form-error al div form_box. Si lo hace agrega la clase .form-success al div form_box. 
validation = (form_box, boxInput) =>{

    if(boxInput.value==''){
        showErrorOrSuccess(true, form_box, boxInput);
    }else{
        showErrorOrSuccess(false, form_box, boxInput);
    };//Validación genérica si el usuario deja un ítem sin diligenciar.

    if(boxInput.name=='email'){
        if(!boxInput.value.match(mailFormatRegex)){
            showErrorOrSuccess(true, form_box, boxInput);
        }else{
            showErrorOrSuccess(false, form_box, boxInput);
        }
    };//Validación de la estructura de un email.

    sumitController();
}

//Función de errores y validación. Agrega o elimina las clases .form-success y .form-error dependiendo del caso evaluado.
showErrorOrSuccess = (check, form_box, boxInput) => {
    if(check){
        form_box.classList.remove('form-success');
        form_box.classList.add('form-error');
        errors[boxInput.name] = true;
    }else{
        form_box.classList.remove('form-error');
        form_box.classList.add('form-success');
        errors[boxInput.name] = false;
    }
}

//Desabilita el botón sumit, dependiendo de si la validación del input es correcta o no.
sumitController = () =>{
    console.log(errors);
    if(errors.nickName || errors.email){
        submitButton.toggleAttribute('disabled', true);
    }else{
        submitButton.toggleAttribute('disabled', false);
    }
}

document.getElementById('submit-btn').addEventListener('click',()=>{
    location.href = '../../index.html';
});