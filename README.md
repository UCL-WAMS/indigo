# UCL Design Language

The UCL Design Language repository contains:

* All individual patterns, saved as separate .html files
* The foundation Sass
* The CSS output
* Web fonts 
* Global images
* Javascript

The following steps will describe how to use the existing design language foundation to create a new UCL website.

1. Download the foundation files - at a minimum you will need the css, fonts, img and js folders.

2. Start with the template.html file which will show you a basic structure for the foundation website to create your pages.

3. If you are extending the Foundation the elements that must remain in any design are the Global Masthead, UCL Banner and UCL Footer.

4. It is best to use Sass while working with the UCL Design Language. Keep your site specific styles separate to the foundation CSS. If using Sass then either create a new yoursite.scss file in the partials folder and add an import to it in the screen.scss file, or, add your Sass directly to the screen.scss file, underneath the imports.

5. However, if using Sass is not possible, download the css folder and add your additional css directly to a new yoursite.css file in this folder . You will need to add a link to this css file in the head of your html documents, underneath the screen.css link.

6. If you require specific patterns, then you can locate the abstracted code in the html files in the github repository. This code is modular and will work wherever it is placed within the site. Customisation options for the patterns will be documented in Indigo.