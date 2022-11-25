# Task Manager
Hello! Welcome to my launch academy breakable toy. My previous role was as a project manager where I used a lot of tools to manage projects of all sizes. For smaller projects and personal task tracking, I noticed that many of these softwares came with bells and whistles that were more distracting than helpful. 

This task manager was built with the goal of keeping a user on task at the expense of unnecessary features that bloat the application. 

There are more features I want to add, more technologies I want to integrate, etc. Please see the future features section toward the bottom of the approach section for more on that. 
## Approach
### Technology
Simply put, this is a React application with a Rails backend. The rails application was built using the make_it_so gem - https://github.com/LaunchAcademy/make_it_so 

This gem comes with login capabilities so everything related to login, sign up, password reset, etc. is generated by make_it_so using devise

#### Image storage
Images attached to cards are stored using an amazon s3 bucket. Rails manages these images using carrierwave and they are uploaded in the UI using React Dropzone

S3: https://aws.amazon.com/s3/
Carrierwave: https://github.com/carrierwaveuploader/carrierwave 
React Dropzone: https://react-dropzone.js.org/ 

#### Drag and drop
There is a feature in this application that allows a user to change the task status by dragging and dropping. This feature is built using React drag and drop

React Dnd: https://react-dnd.github.io/react-dnd/about

##### Known issues with dnd
The deployed environment throws errors due to this issue. Upon investigating these features, it appears to be a versioning issue. Please reach out for a demo of this feature and a walkthrough of the code. In future releases, I plan on adding status changing easily within the task itself. 

#### Modal
Many features are accessible through a modal that pops up. This modal is managed using react modal.

React modal: https://reactcommunity.org/react-modal/ 

#### State management
As of 11/24, I am in the process of refactoring my state management from native react to Redux. This section will be updated as I continue to make progress.

### Future features
#### Card editing
Especially with the Dnd issues, the next feature will be the ability to edit a card. There is a necessity here because right now you cannot actually move a card. Creating this feature now, however, would continue to contribute to a complicated method of managing the modal's state. For that reason, I am prioritizing redux, then moving onto this feature

#### Card comments
Giving users the ability to comment on cards is something that is fairly simple but would add a good bit if interaction to the app.

#### Markdown
This will give users the ability to make a list in their application, This potentially will come before the card comments.

#### Other Longer term features
- User collaboration
- github connection
- multiple images
- images that expand on click

## Pages/templates

### Index
If a user is logged in, they are confronted with a set of boards that they own/have access to (currently one and the same). They also have the option to create a board. If they are not logged in, they get a message prompting them to login.

Content generating using and rails API endpoint

### Board page
#### Create
Users will see 4 static columns and cards belonging to those boards. At the bottom of each column, they can click the create card button.The card creation modal will pop up and the status will be defaulted to the column that was just clicked. 

The only required field is the title field. 

#### View
If a user clicks a card, they get a modal with the card details. There is no editing/updating that can happen from this view. It is strictly a view only mode for now. 

#### Update
Users can move a card to another column which will trigger a PATCH request that will change the column the card belongs to.

#### Delete
Next to the board title, there is a delete button. When a user clicks the button, a confirmation modal pops up. Upon confirming the, the user is taken back to the index page where the board no longer appears.

### Sign up/sign in pages
#### Technology: Rails and Devise (through make_it_so)
We are using an implementation of devise generated through the make_it_so gem https://github.com/LaunchAcademy/make_it_so. 

All functionality for PW reset, account editing, and account creation is handled through make_it_so's default implementation