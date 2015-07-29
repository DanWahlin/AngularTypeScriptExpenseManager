Expense Manager with Angular and TypeScript
===============

This application demonstrates how Angular and TypeScript can be used together. It relies on a 
 Node.js RESTful backend service. Note that the Node.js service relies on static data so
 changes to data won't presist across node process restarts.


The application uses:

* Angular
* TypeScript
* Node.js

The TypeScript source can be found in the src/public/app folder.

# Usage

1. Install global dependencies **if necessary**

        npm install -g gulp-cli tsd

2. Install node packages:

        npm install

3. Retrieve typescript definitions list

        tsd reinstall -so

4. Run gulp

        gulp

5. Launch the server

        node server.js

6. Open browser at <http://localhost:8000/>


