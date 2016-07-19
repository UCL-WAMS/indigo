# UCL Design Language - release 2

The UCL Design Language repository contains:

* All individual patterns, saved as separate .html files
* The foundation Sass
* The CSS output
* Web fonts 
* Global images
* Javascript
* Respond js when using a CDN
* Require js
* Editing Files

The following steps will describe how to use the existing design language foundation to create a new UCL website.

1. Download the foundation files - at a minimum you will need the css, fonts, img and js folders.

2. Start with the template.html file which will show you a basic structure for the foundation website to create your pages.

3. If you are extending the Foundation the elements that must remain in any design are the Global Masthead, UCL Banner and UCL Footer.

4. It is best to use Sass while working with the UCL Design Language. Keep your site specific styles separate to the foundation CSS. If using Sass then either create a new yoursite.scss file in the partials folder and add an import to it in the screen.scss file, or, add your Sass directly to the screen.scss file, underneath the imports.

5. However, if using Sass is not possible, download the css folder and add your additional css directly to a new yoursite.css file in this folder . You will need to add a link to this css file in the head of your html documents, underneath the screen.css link.

6. If you require specific patterns, then you can locate the abstracted code in the html files in the github repository. This code is modular and will work wherever it is placed within the site. Customisation options for the patterns will be documented in Indigo.

7. The site uses respond js to achieve responsiveness on old IE browsers. If you are using a CDN you will need to make sure all of your CSS assets and your respond-proxy.html live on the same domain as the CDN see https://github.com/scottjehl/Respond

8. You will need to set your staticBaseUrl relative to your local project for development. The staticBaseUrl we set is for projects that use the UCL cdn assests.

9. Please see http://editorconfig.org/ for notes on the editorconfig. We have included this in the project. You will need to configure your IDE to use this file to have the correct settings for each file type.


Release 2 updates
------------------
We have updated the patterns and css so the class names and html follows the BEM methodology https://bem.info

We have added SCSS linting. To install linting please run the ruby command 
'gem install scss-lint' - More info https://github.com/ahmednuaman/grunt-scss-lint
