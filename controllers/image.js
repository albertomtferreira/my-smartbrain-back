    const handleApiCall = (req,res)=>{
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '5d64e4b1500c49f68d6173563b6facb9';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'clarifai';       
      const APP_ID = 'main';
      // Change these to whatever model and image URL you want to use
      //Models - https://clarifai.com/explore/models
      //age-demographics-recognition -- https://clarifai.com/clarifai/main/models/age-demographics-recognition
      //general-image-recognition -- https://clarifai.com/clarifai/main/models/general-image-recognition
      //color-recognition -- https://clarifai.com/clarifai/main/models/color-recognition
      //general-image-detection -- https://clarifai.com/clarifai/main/models/general-image-detection
      //face-detection -- https://clarifai.com/clarifai/main/models/face-detection
      const MODEL_ID = 'face-detection';
      const IMAGE_URL = req.body.input;
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(data => data.json())
      .then(data=>{
        res.json(data)
      })
      .catch(err => res.status(400).json('Unable to resolve API'))
    }
    
const handleImage = (req,res,db)=>{
  const {id} = req.body;
  db('users')
  .where('id','=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports={handleImage,handleApiCall};