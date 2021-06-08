# Documentation relative à  l'installation


## Stack

React js
Aws dynaomodb (base de données de metadata)
Aws apigateway+lambda (Api rest)
AWS cognito ( authentification utilisateurs)
cloudfare (stockage de video)

### Configuration de cloudfare

créer un compte cloudfaire , recuperer le cloudname et l'upload preset 

placer dans le fichier 'formvideo' comme suit :

let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dbxswktcp', 
        resourceType:'video',
        uploadPreset: 'p8ppgwkh'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setUrlvideo(result.info.url)
            setUrlthumb(result.info.thumbnail_url)


          }
        }
      )



### NB : VOUS AVEZ LA POSIBILITE DE CREER UN SIMPLE BACKEND POUR GERER LE STOCKAGE DE META DONNEES




### Aws api gateway + lambda

creer un compte AWS et ajouter des appels API gateway et une fonction lambda


### Aws dynano db


### Aws cognito

creer un pool d'utilisateur 




