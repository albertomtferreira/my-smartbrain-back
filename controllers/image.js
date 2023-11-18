const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const handleApiCall = (req,res)=>{
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = process.env.API_CLARIFAI;
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
  const MODEL_VERSION_ID = '';
  const IMAGE_URL = req.body.input;
  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////
  const stub = ClarifaiStub.grpc();
  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);
  stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            // throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here
        const output = response.outputs[0];

        // console.log("Predicted concepts:");
        // for (const concept of output.data.concepts) {
        //     console.log(concept.name + " " + concept.value);
        // }
        res.json(response)
        // .catch(err => res.status(400).json('Unable to resolve API'))
    }
  )
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
