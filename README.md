# EMBR HTML Client

## Introduction
* HMTL based version of [Behaviour Builder](https://github.com/alexisheloir/EMBOTS).
* This application make use of Websocket technology to communicate with the Panda3D character. Modern fornt-end technologies like Javascript, JQuery, JQuery-UI and Bootstrap is used to create this interface.
* This application is used to create Animated Signs in American Sign Language.
* Signs are created as EMBR scripts, which can be played as an animation in Panda3D.
* Signs can be saved as EMBR script files, which is used to create an Animated ASL Dictionary.

> __NOTE:__ This application is compiled for Mac OS X El Capitan. To compile it for a higher version e.g. Mac OS X Sierra, this application will require a compatible Panda3D runtime (which is currently not supported for Sierra).

> __NOTE:__ For a fresh compilation, please refer to [SMR EMBR Compilation Guide](smr_embr_compilation_guide/SMR_EMBR_Compilation_Guide.docx)

	
## Technologies Required

* Mac OS X El Capitan 10.11.6
* Google Chrome
* Python 2.7.10
* Panda3D Runtime
* SimpleWebSocketServer Python library(See required modules for installation instucrtions)
* BetterBen (for EL Capitan)
* EMBR HTML Client code

## Installation

#### 1. Panda3D Runtime
* Panda3D runtime has come up with a fix to work for Mac OS X El Capitan.
* This fix can be downloaded [here](http://buildbot.panda3d.org/downloads/828fe2af88adfade885ee468c32c87464e989048/Panda3D-Runtime-1.0.4-828fe2a.dmg)
* Download and follow the instructions given by Panda3D community [here](https://www.panda3d.org/blog/update-for-mac-os-x-el-capitan/)
    
#### 2. SimpleWebSocketServer

You can install SimpleWebSocketServer by running the following command...

`sudo pip install git+https://github.com/dpallot/simple-websocket-server.git`

Or by downloading the repository [here](https://github.com/dpallot/simple-websocket-server.git) and running `sudo python setup.py install`.
Installation via pip is suggested.

#### 3. Apache PHP

Mac OS X El Capitan comes pre-installed with PHP version 5.5 

__Running Commands__

First, open the Terminal app and switch to the root user so you can run the commands in this post without any permission issues:

`sudo su -`

__Enable Apache on Mac OS X__

`apachectl start`

Verify It works! by accessing [http://localhost](http://localhost)

__Enable PHP for Apache__

First, make a backup of the default Apache configuration. This is good practice and serves as a comparison against future versions of Mac OS X.

`cd /etc/apache2/`

`cp httpd.conf httpd.conf.bak`

Now edit the Apache configuration. Feel free to use TextEdit if you are not familiar with vi.

`vi httpd.conf`

Uncomment the following line (remove #):

`LoadModule php5_module libexec/apache2/libphp5.so`

Restart Apache:

`apachectl restart`

> __NOTE:__ Please refer to [Jason McCreary's Tutorial](https://jason.pureconcepts.net/2015/10/install-apache-php-mysql-mac-os-x-el-capitan/) and/or [Neil Gee's Tutorial](https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/) for a detailed installation guide.

#### 4. BetterBen(for El Capitan)
Download the Executable files for Panda3D character BetterBen.
Unzip and Run the file named `Run_EMBR`
	
#### 5. EMBR HTML Client code

1. Download the latest EMBR HTHL Client code from the github repository [here](https://github.com/adityapadhye1507/EMBR-HTML-Client)
2. Extract the code to run it on a local __Apache PHP__ server. Refer Apache Server installation in __Required Modules__ section.
3. To run the code on PHP server : Copy the entire code into a directory, place it under `~/Sites` directory, rename the code directory to 'EMBR_HTML_Client'
4. Run command `chmod -R 755 EMBR_HTML_Client` on the directory
5. Try to run the code by opening the url "http://localhost/~USER/EMBRHtmlClient/" where "__USER__" is the username of Mac OS X user. 
	
#### Developed by
* Aditya Padhye, contact me [here](mailto:adityapadhye1507@gmail.com)
