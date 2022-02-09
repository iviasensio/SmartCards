Smart Cards, a Qlik Sense Extension 

=============================
==================================

Available in https://github.com/iviasensio/SmartCards

Current version 1.1 7-feb-2022. Compatible with QS September 2017 or higher

Author Ivan Felipe Asensio QlikTech Iberia,s.l.

This extension is a text object with simple and smart look that performs:
 - a customizable grid with dimension images
 - hover effects to access to data
 - smart and high customizable text capabilities
 - dynamic colors and icons

### Features
- work with texts, icons and images 
- selectable
- smoth shapes
- responsive design 

Bug Fixes:
- get a json protocol error when updating a variable
- could not refresh dimension in case it start with symbol =

### Look
![SmartCards](https://user-images.githubusercontent.com/11334576/153006371-4cf965a8-283f-4c4c-bde0-096c6c38a155.png)

*Install in SaaS
- Download the package and zip the extension folder 'SmartCards' 
- Go to SaaS console-->extensions and import SmartCards.zip
- You can also add the example and the theme provided:
	- Extract the Netflix.qvf demo inside 'Examples' folder and import with the option "Upload app"
	- Extract the theme, Netflix.zip, it's in the folder 'Themes', go to console-->Themes, import it

- WARNING! By default YouTube resources are not enabled in SaaS, so you may need to apply some Content Security Policy
 	- In the Management Console go to Content Security Policy, and add 2 policies:
 		. For www.youtube.com allow script-src
		. For img.youtube.com allow img-src 



*Install in Server:
- Download the package and zip the extension folder 'SmartCards' 
- in the QMC open the menu Extensions and import the SmartCards.zip
- optional : 
	-in the qmc open the menu apps and import Netflix.qvf
	-in the qmc extensions menu, import the theme Netflix.zip

- WARNING! To make the dynamic images work in a different site (it's designed in SaaS), it needs to identify your 
  Client Manage environment name. It uses the protocol https and the environment variable ComputerName().
  Unfortunately not always work.
  So, if you have issues visualizing the images in the map object:
  - edit the variable vClientManaged
  - remove the logic path and type your right environment path, i.e.:
  	remove ='https://' & ComputerName() & '/appcontent/' & DocumentName() & '/'
  	and replace by 'https://ivan.servername/appcontent/' & DocumentName() & '/'
  	 

*Install in Desktop
- Download the package and copy the folder SmartCards in the path C:\Users\'username'\Documents\Qlik\Sense\Extensions
- copy the example SmartCardsExample.qvf in C:\Users\'username'\Documents\Qlik\Sense\Apps
- Unzip the theme Netflix.zip and copy the unzipped folder (called Netflix) in C:\Users\'username'\Documents\Qlik\Sense\Extensions
