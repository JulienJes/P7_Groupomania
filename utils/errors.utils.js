module.exports.signUpErrors = (error) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (error.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect (3 caractères min) ou déjà pris";

  if (error.message.includes("email")) errors.email = "Email incorrect ou déjà pris";

  if (error.message.includes("password"))
    errors.password = "Le mot de passe doit faire 8 caractères minimum";

  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};
  
module.exports.signInErrors = (error) => {
  let errors = { email: '', password: ''}

  if (error.message.includes("email")) 
    errors.email = "Email inconnu";
  
  if (error.message.includes('password'))
    errors.password = "Le mot de passe ne correspond pas"

  return errors;
}
  
module.exports.uploadErrors = (error) => {
  let errors = { format: '', maxSize: ""};

  if (error.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (error.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}