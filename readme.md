# Templated
-----

You can copy automatically al your common config files from all your projects from other directory or from a git repository

## Config your project
You must create a ".templated" file with your "templated repositories" (one for line).
A templated repository can be a local directory or a git repository url.

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
In a ".md" file it is with:
> [//]: # (start|embed-tag)
> it was replaced 
> [//]: # (end|embed-tag)

For example:
> [//]: # (start|embed-tag)
> it was replaced 
> [//]: # (end|embed-tag)

In a ".html" file it is with:
> <!-- start|embed-tag --> it is remplaced <!-- end|embed-tag -->

For example:
> <!-- start|copyright --> it is remplaced <!-- end|copyright -->


If you want put in de start or de end of the file you don't need define the embed tag position.
Simply use files with tag "start" or "end" like:
>readme.md|start.part
>readme.md|end.part


You can view an example of use in:
https://github.com/miyoda/templated-example-usage.git

The example use the template:
https://github.com/miyoda/templated-example-template.git