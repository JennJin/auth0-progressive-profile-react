export const PROGRESSIVE_CONFIG = [
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
        
    },
    {
        title: "What's your favorite color?",
        questions: [
            {
                type: "select",
                key: "color",
                label: "Colors",
                options: [
                    { key: "green", name: "color", label:"Green", value: "green"},
                    { key: "blue", name: "color", label: "Blue", value: "blue"},
                    { key: "red", name: "color", label: "Red", value: "red"},
                    { key: "orange", name: "color", label: "Orange", value: "orange"}
                    ]    
            }
            ]
        
    },
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
        title: "Customize News based on Location",
        questions: [
            {
                type: "text",
                key: "zipcode",
                name: 'zipcode',
                label: "Zip Code",
            },
            {
                type: "text",
                key: "nickname",
                name: 'nickname',
                label: "Nickname"
            }
        ]
        
    }
];