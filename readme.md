# Templated
You can copy/link automatically all your common config files of all your projects from a template directory.
You can config to copy parts of files that is common in different projects.
It's util for common config files/parts for all subprojects/microservices like .gitignore, copyright, etc.

## Config your project
Add the dependency:
> npm install templated-npm --save-dependency

You must create a "templated.json" file with your templated reposiotory source configured:
```js
{
    "source": "../templated-example-template2"
}
```
Or you can indicate multiple sources with an array:
```js
{
    "sources": [         
        "../templated-example-template"
        "../templated-example-template2"
    ]
}
```

## Config your template repository
### Copy files
All files in the templated repository was copied to your project automatically.

### Copy parts
If you want to embed a part of file you can create in your templated repository a file with the name:
file-name-when-you-want-embed|embed-tag.part

For example:
>readme.md|copyright.part

The "content part" was replaced in your file with the position of the embed-tag indicated.
You must indicate in your file where you want put the content with your embed tag.
In a .md/.html file it is with:
```html
<!-- start|embed-tag --> it was replaced <!-- end|embed-tag -->
```

For example:
```html
<!-- start|copyright --> it was replaced <!-- end|copyright -->
```

If you want put in de start or de end of the file you don't need define the embed tag position.
Simply use files with tag "start" or "end" like:
> readme.md|start.part

> readme.md|end.part


You can view an example of use in:
https://github.com/miyoda/templated-example-usage.git

The example use the template:
https://github.com/miyoda/templated-example-template.git