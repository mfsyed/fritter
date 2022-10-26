# Fritter

Build your own not-quite-[Twitter](https://twitter.com/)!

## Starter Code

  This starter code implements users (with login/sessions), and freets so that you may focus on implementing your own design ideas.

The project is structured as follows:

- `index.ts` sets up the database connection and the Express server
- `/freet` contains files related to freet concept
  - `collection.ts` contains freet collection class to wrap around MongoDB database
  - `middleware.ts` contains freet middleware
  - `model.ts` contains definition of freet datatype
  - `router.ts` contains backend freet routes
  - `util.ts` contains freet utility functions for transforming data returned to the client
- `/user` contains files related to user concept
  - `collection.ts` contains user collection class to wrap around MongoDB database
  - `middleware.ts` contains user middleware
  - `model.ts` - contains definition of user datatype
  - `router.ts` - contains backend user routes
  - `util.ts` contains user utility functions for transforming data returned to the client
- `/public` contains the code for the frontend (HTML/CSS/browser JS)

## Installation

Make a copy of this repository under your personal GitHub account by clicking the `Use this template` button. Make sure to enable the `Include all branches` option.

If you did **not** take 6.031 in Fall 2021 or Spring 2022, to ensure that your machine has the necessary software for the assignment, please follow Steps 1, 2, 5, and 6 on [this page](https://web.mit.edu/6.031/www/sp22/getting-started/) from the [6.031 website](https://web.mit.edu/6.031/www/sp22/) (now 6.1020).

### Setting up the demo branch (optional, but very helpful as a reference!)

- Navigate to the root folder of your cloned repository.
- Run `source demo-setup.sh` to set up the demo branches.
- Check your local branches with `git branch`; you should have one new branch, with a new commit.
  - `view-demo` demos how to extend functionality of a resource
- If everything looks good, run `git push --all origin`. At this point, you should see the demo branch at `https://github.com/<username>/<repo-name>/branches` (and the `view-demo-code` branch can now be deleted!)
- Now, if you navigate to the commit history of this branch (`https://github.com/<username>/<repo-name>/commits/<branch-name>`), you can click on the "demo:" commit and see exactly what we changed for each demo!

### MongoDB Atlas setup

Follow the instructions [here](https://docs.google.com/presentation/d/1HJ4Lz1a2IH5oKu21fQGYgs8G2irtMqnVI9vWDheGfKM/edit?usp=sharing) to add your fritter project to MongoDB Atlas.

After following the instructions above, you should have copied a secret that looks something like `mongodb+srv://xxxxxx:xxxxxxxxx@cluster0.yc2imit.mongodb.net/?retryWrites=true&w=majority`. Note that this allows complete access to your database, so do not include it anywhere that is pushed to GitHub or any other publicly accessible location.

To allow your local server to connect to the database you just created, create a file named `.env` in the project's root directory with the contents

```
MONGO_SRV=mongodb+srv://xxxxxx:xxxxxxxxx@cluster0.yc2imit.mongodb.net/?retryWrites=true&w=majority
```

where the secret is replaced with the one you obtained.

### Post-Installation

After finishing setup, we recommend testing both locally running the starter code, and deploying the code to Vercel, to make sure that both work before you run into issues later. The instructions can be found in the following two sections.

## Running your code locally

Firstly, open the terminal or command prompt and `cd` to the directory for this assignment. Before you make any changes, run the command `npm install` to install all the packages in `package.json`. You do not need to run this command every time you make any changes, unless you add a new package to the dependencies in `package.json`.

Finally, to test your changes locally, run the command `npm start` in the terminal or command prompt and navigate to `localhost:3000` and interact with the frontend to test your routes.

## Deployment to Vercel

We will be using Vercel to host a publicly accessible deployment of your application.

1. Create a fork of this repository through GitHub. This will create a repository in your GitHub account with a copy of the starter code. You'll use this copy to push your work and to deploy from.

2. [Create a Vercel account](https://vercel.com) using your GitHub account.

3. After you log in, go to the [project creation page](https://vercel.com/new) and select `Continue with GitHub` and give Vercel the permissions it asks for.

4. Find the repository you just created and click `Import`. For the `Framework Preset`, choose `Other`. In the `Environment Variables` section, add an entry where `NAME` is `MONGO_SRV` and `VALUE` is your [MongoDB secret](#mongodb-atlas-setup).

5. Click `Deploy` and you will get a link like `https://fritter-starter-abcd.vercel.app/` where you can access your site.

Vercel will automatically deploy the latest version of your code whenever a push is made to the `main` branch.

## Adding new concepts to Fritter

### Backend

The data that Fritter stores is divided into modular collections called "resources". The starter code has only two resources, "freets" and "users". The codebase has the following:

- A model file for each resource (e.g. `freet/model.ts`). This defines the resource's datatype, which defines the resource's backend type, and should be a distilled form of the information this resource holds (as in ADTs). This also defines its schema, which tells MongoDB how to store our resource, and should match with the datatype.
- A collection file for each resource (e.g. `freet/collection.ts`). This defines operations Fritter might want to perform on the resource. Each operation works on the entire database table (represented by e.g. `FreetModel`), so you would operate on one Freet by using `FreetModel.findOne()`.
- Routes file (e.g. `freet/router.ts`). This contains the Fritter backend's REST API routes for freets resource, and interact with the resource collection. All the routes in the file are automatically prefixed by e.g. `/api/freets`.
- Middleware file (e.g `freet/middleware.ts`). This contains methods that validate the state of the resource before performing logic for a given API route. For instance `isFreetExists` in `freet/middleware.ts` ensures that a freet with given `freetId` exists in the database

To add a resource or edit functionality of an existing resource:

- Create/modify files in the four above categories, making sure you have one model file, one collection one router file, and one middleware file per resource.
  - It helps to go in the order that they're listed above, starting with the resource's datatype.
- In `freet/utils.ts` and `user/utils.ts` there are type definitions for frontend representations of resources, and functions to convert from a backend resource type. Create/modify these as necessary.
  - An example: the frontend type definition for User lacks a `password` property, because the frontend should never be receiving users' passwords.

### Frontend

For this assignment, we provide an extremely basic frontend for users to interact with the backend. Each box (html form) represents exactly one API route, with a textbox for each parameter that the route takes.

To add a new route to the frontend, two components need to be added: a form in `public/index.html` and a corresponding event handler in `public/scripts/index.js`. The form will allow the user to input any necessary fields for the route, and the event handler will take the values of these fields and make an API call to your backend.

For example, the form for the user creation route looks like:

```
<form id="create-user">
    <h3>Create User</h3>
    <div>
        <label for="username">Username:</label>
        <input id="username" name="username">
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" name="password">
    </div>
    <input type="submit" value="Create User">
</form>
```

In `public/scripts/user.js`, there is an event handler for this form (event handlers are separated in files by concept, currently `user.js` and `freet.js`), which makes a POST request to the backend:

```
function createUser(fields) {
  fetch('/api/users', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}
```

Here, `fields` is a `JSON` object which contains key/value pairs, where the key is the name associated with the input field in the form and the value is whatever is entered on the frontend. For instance, in the `form` above, the first input field has name, `username`, which will be a key in `fields` object whose value is whatever has been entered as the username on the frontend. Thus, whatever name you attach to any input field is the same name you will can use to access the value entered in that input field from `fields` object.

To link the form and event handler together, there is an entry in the `formsAndHandlers` object (the key is the `id` attribute of the `<form>` tag and the value is the event handler function) in `public/scripts/index.js`:

```
const formsAndHandlers = {
  'create-user': createUser,
  ...
};
```

## MongoDB

MongoDB is how you will be storing the data of your application. It is essentially a document database that stores data as JSON-like objects that have dynamic schema. You can see the current starter code schema in `freet/model.ts` and `user/model.ts`.

### Mongoose

You will be using Mongoose, a Node.js-Object Data Modeling (ORM) library for MongoDB. This is a NoSQL database, so you aren't constrained to a rigid data model, meaning you can add/remove fields as needed. The application connects to the MongoDB database using Mongoose in `index.ts`, where you see `mongoose.connects(...)`. After it connects, you will be able to make [mongoose queries](https://mongoosejs.com/docs/queries.html) such as `FindOne` or `deleteMany`.

### Schemas

In this starter code, we have provided `user` and `freet` collections. Each collection has defined schemas in `*/model.ts`. Once you defined a `Schema`, you must create a `Model` object out of the schema. The instances of your model are what we call "documents", which is what is stored in collections. Each schema maps to a MongoDB collection and defines the shape and structure of documents in that collection, such as what fields the document has. When a schema is defined, documents in the collection _must_ follow the schema structure. You can read more about documents [here](https://mongoosejs.com/docs/documents.html).

To create a new Schema, you first need to define an interface which represents the type definition. You can then create a new `Schema` object by declaring `const ExampleSchema = new Schema<Example>(...)` where `Example` is the type definition on the backend. Then, you can create a model like `const ExampleModel = model<Example>("Example", ExampleSchema)`. You can see a more detailed schema in the `model.ts` files mentioned above.

#### Validation

Mongoose allows you to use schema validation if you want to ensure that certain fields exist. For example, if you look at `freet/model.ts`, you will find fields like

```
  content: {
    type: String,
    required: true
  }
```

within the schema. This tells us that the `content` field must have type `String`, and that it is required for documents in that collection. A freet must have a `String` type value for the `content` field to be added to the freets collection.

## API routes

The following api routes have already been implemented for you (**Make sure to document all the routes that you have added.**):

#### `GET /`

This renders the `index.html` file that will be used to interact with the backend

#### `GET /api/freets` - Get all the freets

**Returns**

- An array of all freets sorted in descending order by date modified

#### `GET /api/freets?author=USERNAME` - Get freets by author

**Returns**

- An array of freets created by user with username `author`

**Throws**

- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user

#### `POST /api/freets` - Create a new freet

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created freet

**Throws**

- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long

#### `DELETE /api/freets/:freetId?` - Delete an existing freet

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the freetId is invalid

#### `PUT /api/freets/:freetId?` - Update an existing freet

**Body**

- `content` _{string}_ - The new content of the freet

**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the user is not logged in
- `404` if the freetId is invalid
- `403` if the user is not the author of the freet
- `400` if the new freet content is empty or a stream of empty spaces
- `413` if the new freet content is more than 140 characters long

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `403` if user is not logged in

#### `POST /api/users` - Create an new user account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use

#### `PUT /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

#### `DELETE /api/users` - Delete user

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in











## Complete List of API Routes for A5

#### `POST /api/react/:reaction?` - React to a Freet


**Returns**

- A success message

**Throws**

- `403` if the user is not logged in

- `400` if reaction isn't in {Like, Wow, Angry, Sad, Laugh}



#### `PUT /api/react/:reaction?` - Change a Reaction


**Returns**

- A success message

**Throws**

- `403` if the user is not logged in

- `400` if reaction isn't in {Like, Wow, Angry, Sad, Laugh}

- `400` if there is now previous reaction that was recorded for this specific freet/user(reactor) pair.


#### `DELETE /api/react/:reaction?` - Delete a Reaction


**Returns**

- A success message

**Throws**

- `403` if the user is not logged in

- `400` if reaction isn't in {Like, Wow, Angry, Sad, Laugh}

- `400` if there is now previous reaction that was recorded for this specific freet/user(reactor) pair.






#### `POST /api/reports/:freetId?` - Report a Freet

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created report

**Throws**

- `403` if the user is not logged in
- `400` If the report content is empty or a stream of empty spaces



#### `POST /api/viewonly/:vieweeID` - Create a viewOnlyObject for a viewer and viewee acounts


**Returns**

- A success message


**Throws**

- `403` if the user is not logged in

- `404` if there is already an object with the same viewer, viewee pair


#### `PUT /api/viewonly/:viewModeOnlyId` - Change the viewOnlyModeStatus


**Returns**

- A success message

- A viewModeOnlyObject


**Throws**

- `403` if the user is not logged in

- `404` if there is no preexisting object with the same viewer, viewee pair

- `403` if the user is not registered as the viewer in the object.





#### `POST /api/ItemsForSale` - Create a new ItemForSale

**Body**

- `description` _{string}_ - The content of the item

- `price` _{string}_ - The price of the item

- `link` _{string}_ - The website link to the item


**Returns**

- A success message
- A object with the created ItemForSale

**Throws**

- `403` if the user is not logged in
- `400` If any of the fields are empty
- `413` If the description is more than 140 characters



#### `PUT /api/ItemsForSale:/itemForSaleId` - Change description

**Body**

- `description` _{string}_ - The content of the item


**Returns**

- A success message

- A object with the modified ItemForSale

**Throws**

- `403` if the user is not logged in

- `400` if the itemForSaleId does not exist

- `403` if the user is not the seller/creator of this object

- `413` If the description is more than 140 characters or empty



#### `PUT /api/ItemsForSale:/itemForSaleId` - Change description

**Body**

- `description` _{string}_ - The content of the item


**Returns**

- A success message

- A object with the modified ItemForSale

**Throws**

- `403` if the user is not logged in

- `400` if the itemForSaleId does not exist

- `403` if the user is not the seller/creator of this object

- `413` If the description is more than 140 characters or empty




#### `PUT /api/ItemsForSale:/itemForSaleId` - Change price

**Body**

- `price` _{string}_ - The price of the item



**Returns**

- A success message

- A object with the modified ItemForSale

**Throws**

- `403` if the user is not logged in

- `400` if the itemForSaleId does not exist

- `403` if the user is not the seller/creator of this object

- `413` If the price doesn't match this regex: ^[-+]?[0-9]+[.]?[0-9][0-9]$



#### `PUT /api/ItemsForSale:/itemForSaleId` - Change link

**Body**

- `link` _{string}_ - The website link to the item

**Returns**

- A success message

- A object with the modified ItemForSale

**Throws**

- `403` if the user is not logged in

- `400` if the itemForSaleId does not exist

- `403` if the user is not the seller/creator of this object

- `413` If the price doesn't match this regex: ^[-+]?[0-9]+[.]?[0-9][0-9]$




#### `DELETE /api/itemsForSale/:itemForSaleId?` - Delete an existing ItemforSale

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the itemForSaleId is invalid/doesn't exist



#### `GET /api/itemsForSale` - Get all the freets

**Returns**

- An array of all itemsForSale sorted in descending order by date modified





#### `PUT /api/shoppingCart/:itemForSaleId?` - Add an ItemForSale to ShoppingCart

**Body**

- `shoppingCartId` _{string}_ - shoppingCartId


**Returns**

- A success message
- Populated shopping cart with ItemForSale

**Throws**

- `403` if itemForSaleId is invalid

- `404` if shoppingCart doesn't exist

- `413` if user is not cartOwner of shoppingCart



#### `GET /api/itemsForSale?seller=seller` - Get itemsForSale By Seller

**Returns**

- An array of itemsForSale created by user with username `seller`

**Throws**

- `400` if `seller` is not given
- `404` if `seller` is not a recognized username of any user




#### `POST /api/shoppingCarts` - Create Shopping Cart

**Returns**

- A shopping cart Object



#### `GET /api/shoppingCarts` - Get all created shopping carts

**Returns**

- An array of shoppingCart objects


#### `PUT /api/shoppingCart/:itemForSaleId?` - Remove ItemForSale from ShoppingCart

**Body**

- `shoppingCartId` _{string}_ - shoppingCart


**Returns**

- A success message
- Populated shopping cart

**Throws**

- `403` if itemForSaleId is invalid

- `403` if shoppingCart is invalid

- `404` if itemForSaleId is not in cart

- `413` if user is not cartOwner of shoppingCart



#### `PUT /api/shoppingCart/:itemForSaleId?` - Add ItemForSale to ShoppingCart

**Body**

- `shoppingCartId` _{string}_ - shoppingCart


**Returns**

- A success message
- Populated shopping cart

**Throws**

- `403` if itemForSaleId is invalid

- `403` if shoppingCart is invalid

- `404` if itemForSaleId is not in cart

- `413` if user is not cartOwner of shoppingCart






#### `DELETE /api/shoppingCart/:shoppingCartId?` - delete shopping cart


**Returns**

- A success message
- Populated shopping cart

**Throws**


- `403` if shoppingCart is invalid/ doesn't exist

- `413` if user is not cartOwner of shoppingCart




#### `POST /api/comment/:originalFreetId?` - Create a new comment

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created comment

**Throws**

- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long
- `404` if originalFreetId is invalid/does not exist.

#### `DELETE /api/comment/:commentId?` - Delete an existing comment

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the comment
- `404` if the commentId is invalid

#### `PUT /api/comment/:commentId?` - Update an existing comment

**Body**

- `content` _{string}_ - The new content of the freet

**Returns**

- A success message
- An object with the updated comment

**Throws**

- `403` if the user is not logged in
- `404` if the commentId is invalid
- `403` if the user is not the author of the comment
- `400` if the new comment content is empty or a stream of empty spaces
- `413` if the new comment content is more than 140 characters long

