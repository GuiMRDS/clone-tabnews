// status/api

function status(request, reponse) {
  reponse.status(200).json({ chave: "Quero ser acima da media" });
}

export default status;
