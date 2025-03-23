# Graver Server

This is a server code repository for Graver - Postcard sharing app  

## Project Structure  

```text
📦 graver-server/  
├── 📁 api/  
│   ├── auth.js  
│   ├── card.js  
│   ├── groq-textgen.js  
│   └── upload.js  
├── 📁 configs/  
|   ├── auth.js  
├── 📁 controllers/  
│   ├── auth-controller.js
│   ├── groq-controller.js       
│   ├── monitor-controller.js
│   ├── postcard-controller.js
│   └── response-handler.js
├── 📁 models/                   
│   ├── Postcard.js
│   └── User.js
├── 📁 public/
|   ├──📁 uploads
├── 📁 routes/                   
│   ├── auth-routes.js
│   ├── groq-textgen-routes.js
│   ├── index.js
│   ├── monitor-routes.js
│   └── postcard-routes.js
├── .env 
├── env.txt
├── LICENSE                         
├── .gitignore                   
├── package-lock.json           
├── package.json
├── readme.md               
└── server.js                    
```

## Installation

- Use `git clone` to clone the [repository](https://github.com/Gizmosoft/graver-server.git) to your local environment  

```bash
git clone https://github.com/Gizmosoft/graver-server.git
```

- Ensure you have [Node 22.x](https://nodejs.org/en/download) installed along with [npm package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- Run the below command to install all the dependencies:  

```bash
npm install
```

- The application uses [MongoDB](https://www.mongodb.com/) for database, [Cloudinary](https://cloudinary.com/) for image storage and retrieval from the cloud and [GroqAI's inference engine](https://groq.com/) for postcard message generation using Llama 3.3-70b. You must have your MongoDB URI along with API keys for Cloudinary and GroqAI to begin with  
- Create a `.env` file in the root directory (where package.json file exists) with all the variables defined. Refer to the `env.txt` file to know about the variables required for the project  
- Run the below command to start the Node.js server in the dev mode (using nodemon):

```bash
npm run dev
```

- Or you can use the below command to start the server:

```bash
npm start
```

## App functionality

1. `server.js` acts as the starting point of the app  
2. All API requests coming from the client are handled by `/routes/index.js` on the top level, followed by the component specific route files  
3. Route files then call the corresponding controller files which connect to the services defined inside the `/api` directory  
4. Models are defined inside the `/model` directory, these might be used by some services  

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
