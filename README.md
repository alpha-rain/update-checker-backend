# Update Checker Backend

### Currently does not work as i am still developing the software

*What is this good sir?*

I want to make an electron app which notifies you when an update has been released for libraries or languages.
So whenever Nodejs is updated or Angular etc you will be notified. 
This repo will be the backend for the application doing all the check etc, the GUI part will be in another repo.

Moved the code to typescript! side affect of this is you will have to copy over the .json files to the app files. Also moved the config.json and apps.json above the src path. So code has moved to /src folder and the typscript comiplation is in /dist folder.

#### Installing typscript

>npm install -g typescript
then just run:
>tsc

#### VSCode launch file for typescript debuging

`{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}\\src\\test.ts",
    "outFiles": [
        "${workspaceFolder}\\dist/**/*js"
    ],
    "sourceMaps": true
}`