1.  Make sure you have node js installed
2.  Install Gulp globally
```$ npm install --global gulp```

3. change directory (cd ..) to project folder
4. Insall dependencies
```$ npm install```
This will create a folder named 'node_modules'

5. For development run Gulp with following command:
```$ gulp```
This will create a folder /builds/development

6. For production run Gulp with following command:
```$ gulp --production```
This will create a folder /builds/production


Code for gulp modules is added in gulpfile.js

You can access website at http://localhost:4567 when gulp us running.
