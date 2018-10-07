

# Auth0 Progressive Profile

This example of implementing Progressive Profile with Auth0 as described in the Auth0 Blog about [Progressive Profiling](https://auth0.com/blog/progressive-profiling).

The sample code is based on the Auth0 project [auth0-react-samples](https://github.com/auth0/auth0-react-samples).

[Auth0](https://auth0.com) is an authentication broker that supports both social and enterprise identity providers, including Active Directory, LDAP, Google Apps, and Salesforce.

## Getting Started

If you haven't already done so, [sign up](https://auth0.com) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com). 

Find the **domain** and **client ID** from the settings area and add the URL for your application to the **Allowed Callback URLs** box.

If you are using the server provided by the create-react-app, that URL is `http://localhost:3000/callback`.



## Install

Download and Unzip this [Repo](https://github.com/JennJin/auth0-progressive-profile-react/archive/master.zip)

Install create-react-app globally and the dependencies for the app.

```bash
npm install -g create-react-app
cd auth0-progressive-profile-react
npm install
```


## Configuration

### Auth0 

Rename the `auth0-variables.js.example` file to `auth0-variables.js` and provide the **client ID** and **domain** there. This file is located in `src/Auth/`.

```
export const AUTH_CONFIG = {
  domain: '{domain}',
  clientId: '{client ID}',
  callbackUrl: 'http://localhost:3000/callback'
};
```


### Adding Steps and Questions

Configure steps and questions to be asked in each step in the `progressive-config.js`.
This file is located in `src/Progressive/`.

The config file is an array, each object in the `PROGRESSIVE_CONFIG` array is a *Step*. Each Step can have multiple *Questions*.


Supported Question Types:

* Text
* Checkbox
* Radio
* Select



**Example**

```
export const PROGRESSIVE_CONFIG = [
    {
        title: "Sign Up for the best Newsletter",
        questions: [
            {
                type: "checkbox",
                key: "topics",
                label: "Topics",
                options: [
                    { key: "news", name: "topics", label:"News", value: "news"},
                    { key: "specials", name: "topics", label: "Specials", value: "specials"},
                    { key: "events", name: "topics", label: "Events", value: "events"}
                    ]    
            }
            ]
        
    },
    {
        title: "Do you like Bananas?",
        questions: [
            {
                type: "radio",
                key: "bananas",
                label: "Bananas",
                options: [
                    { key: "yes", name: "bananas", label:"Yes", value: "yes"},
                    { key: "no", name: "bananas", label: "No", value: "no"}
                    ]    
            }
            ]
        
    }
];
```



#### Configuring Steps


A *Step* consists of a heading/title and questions.

**Parameters**
* **title {string}**: Displayed on the top of the progressive profile modal.
* **questions {array}**: List of questions rendered for the `Step`

```
{
    title: "{title}",
    questions: [
       {array of JSON objects}
    ]
}
```


#### Configuring Questions

Use *Questions* to gather additional information when a user logs in.

**Parameters**
* **type {string}**: Type of input
* **key {string}**: Unique identifier that's used to map the info in `user_metadata` attributes.
* **label {string}**: Defines a label to describe the question.
* **options {array}**: Defines list of options for user to choose from (***Required*** for checkbox, radio, select types).
  * **key {string}**: unique identifier for choice
  * **name {string}**: Should be the same as the `key` defined for the question.
  * **label {string}**: Label to identify choice.
  * **value {string}**: Internal idenifier for the option. 
  
  
```
 {
    type: "{text/checkbox/radio/select}",
    key: "{unique identifier}",
    label: "{label}",
    options: [
        {array of JSON objects - required for checkbox/radio/select types}
        ]    
}
```


**Example**

```
 {
    type: "checkbox",
    key: "topics",
    label: "Topics",
    options: [
        { key: "news", name: "topics", label:"News", value: "news"},
        { key: "specials", name: "topics", label: "Specials", value: "specials"},
        { key: "events", name: "topics", label: "Events", value: "events"}  
    ]    
}
```


***


### Questions to user_metadata Mapping

The `key` parameter for each question will map to the data stored in the `user_metadata`attributes. [Auth0 User Metadata docs](https://auth0.com/docs/metadata)  
  

```
...
 "user_metadata": {
    "totalSteps": 4,
    "step": 4,
    "bananas": "yes",
    "color": "orange",
    "topics": [
      "specials",
      "news"
    ],
    "zipcode": "98005",
    "nickname": ""
  }
...
```


### Customize Look and Feel

You may want to customize the look and feel of the Profile Steps to match your branding.
This example is using [react-bootstrap](https://react-bootstrap.github.io/) for rendering the [modal](https://react-bootstrap.github.io/components/modal/).

Custom CSS can be added to the `progressive.css` file. This file is located in `src/Progressive/`.




## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
