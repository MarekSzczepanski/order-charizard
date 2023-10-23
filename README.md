# Order Charizard
### About
This application allows users to draw three different Charizard Pokemon cards from the Pokemon TCG API. The first step consists of a button that initiates the
draw. After successfully drawing three random Charizard cards, the user can choose one of them on the next screen. The last step contains the summary and shipping details mock form.

### Instalation
`git clone 'https://github.com/MarekSzczepanski/order-charizard.git'`

`cd order-charizard`

`npm install`

`npm start`

## Stack Used
React + TypeScript, Redux, React Query, Axios, MSW, Formik, ESLint (Airbnb preset) + Prettier, MUI, Jest + RTL, Husky

#### React:
I used React because it's popular and it's my favourite tool to make SPAs.

##### Some of single Page Application (SPA) advantages useful for this app:
* High speed
* No page refresh during step change
* Wonderful state management
* Overall development comfort

#### TypeScript:
Overall, TypeScript is a more powerful and versatile language than JavaScript. In serious projects it's necessary for developing high-quality code.
#### Redux:
Redux is an open-source JavaScript library for managing the state of a web application in a predictable and centralized manner. 
#### React Query:
React Query is a library that provides a set of tools and utilities for managing and caching asynchronous data in React applications. It provides efficient data fetching, built-in caching, refetching and many more!
#### Axios:
Axios is a popular JavaScript library for making HTTP requests. It is recommended to use together with React Query.
#### Mock Service Worker (MSW):
MSW is a powerful tool for mocking API requests and responses for unit tests purposes.
#### Formik:
Formik is a popular library in the React ecosystem that helps streamline the process of building and managing forms.
#### ESLint:
ESLint helps to write consistent and error-free code. It can be used to enforce coding style rules, detect potential errors, and improve the readability of the code.
##### ESLint's Airbnb Preset:
The Airbnb Preset is a set of rules that follow the Airbnb code style guide. It is a good choice for project teams that want to follow a serious and well known style guide.
##### Prettier:
Prettier is a code formatter that helps in establishing consistent code. It's very handy together with ESLint.
#### Material UI (MUI):
Material UI is a popular React UI library that provides a wide range of pre-built components. It helps to build pretty, responsive, and accessible user interfaces **faster**.
#### Jest + RTL:
Jest and React Testing Library stack is designed for making unit testing comfortable and reliable in React environment
#### Husky:
Husky makes possible to run commands or scripts before committing or pushing the code to a git repository. It is helpful to not forget about some pre-commit and pre-push tasks

## Conventions
#### Semantic commits:
Benefits of using semantic commits:
* They make it easier to understand the history of project.
* They help to automate tasks such as generating changelogs and determining semantic version bumps.
* They help to communicate changes to the team members and other stakeholders.
* They help to write more meaningful commit messages.

## License
[MIT](https://github.com/MarekSzczepanski/order-charizard/blob/main/LICENSE "Go to license")

# Thoughts

### Why Redux?
I have chosen to use Redux in this project, because there are many state parts that are being used in multiple components. So instead of passing all that state up to the highest component and then down to lower components I decided to use Single Source of Truth (SSoT) pattern that Redux provides. 

##### List of state elements included in Redux store:
* Step change - triggered by clicking blue buttons on all three steps
* Saving data of drawn cards - received on step 1, used on steps 2 and 3
* Saving data of received price - received on step 2 for chosen card and reused on step 3 summary
* Chosen card - id of a card chosen by the user on step 2 that is useful for step 3 summary

##### List of local state elements:
* Saving data of received card sets - used only in step 2
* Modal on/off - used only in step 2

### Why unit tests, linter, formatter, Git hooks?
If that would be a business app that would not require any further developing I would probably **not** choose to use all of the software mentioned above, because it's a tiny app. I could make this app quicker without using all of theese and test the app manually. However, this is not a business app so I could decide what software to use on my own. So I have chosen to use it all just to show that I know how it all works.

### Why no SCSS?
I have used css in js approach. The only css file (index) has just few selectors so I decided that SCSS is no necessary.
