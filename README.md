
<h1 align="center">
  <br>
  <a href="https://project52.tech/" target="blank"><img src="https://project52.tech/wp-content/uploads/2018/05/logo-150x150.png" alt="MovieCard Logo" width="80"></a>

  <br>
  MovieCard
  <br>
</h1>

<h4 align="center">Quickly find the latest releases and upcoming movies.</h4>

<h6 align="center">Current Version: 0.1.1</h6>

<p align="center">
  <a href="https://paypal.me/omarq" target="_blank">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#screenshots">Screenshots</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#setup">Setup</a> •
  <a href="#app-center">App Center</a> •
  <a href="#admob">Admob</a> •
  <a href="#themoviedb">TheMovieDB</a> •
  <a href="#license">License</a>
</p>

## Screenshots
<p align="center">
<img src="https://project52.tech/wp-content/uploads/2018/05/1.png" alt="Welcome Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/2.png" alt="Upcoming Movies Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/3.png" alt="Filter Selection Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/4.png" alt="Movie Details Screen" width="200">
</p>

## Key Features

Tech Stack:
* Hybrid (Ionic 3)
* Ionic Image Loader library for caching and preloading images.

Backend:
* TheMovieDB for movies data
* CodePush for hotfixes (if I need to)
* Microsoft App Center Analytics

Personally, I think I could have added more features, like a discover section to pop up random movies, and a favorites section to keep track of movies that the user likes and also get updates for when a movie is released or playing in a theater. Maybe I will revisit this project later on and implement those things, for now the whole repo and code is available here.


## Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also need Cordova and Ionic, follow the <a href="https://ionicframework.com/getting-started">Ionic getting started</a> guide for more.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/blacksector/moviecard

# Go into the repository
$ cd moviecard

# Install dependencies
$ npm install

# Run the app - All of the features won't work, I recommend deploying on an emulator
$ ionic serve --lab

```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## App Center


Once you have setup the code and installed all of the dependencies, you will need to grab some API keys to get started. I used [Microsoft App Center](http://appcenter.ms), so grab the Analytics API key and CodePush deployment keys from there and add it to the config.xml here:
```xml
<!-- Android configuration: -->
Line 44: <preference name="CodePushDeploymentKey" value="" />
Line 45: <preference name="APP_SECRET" value="" />

<!-- iOS configuration: -->
Line 82: <preference name="CodePushDeploymentKey" value="" />
Line 83: <preference name="APP_SECRET" value="" />
```
App Center recommends having two separate deployment keys for Android and iOS, hence the two different key values.

If you do not wish to use App Center, just remove lines 44, 45, 82, and 83.

## Admob

Google Admob Integration is easy! The plugin and code is already implemented, so all you need to do is modify line 110 in the file `src/app/app.component.ts`:
```typescript
id: ''
```
Replace the empty string with your Banner ID, and remove line 109 when you are done testing, this is important or you will not be earning anything as Admob will think you are in testing mode!

## TheMovieDB:

To grab yourself a copy of the MAIN API key for this project, head over to [TheMovieDB](https://www.themoviedb.org/documentation/api)!

Once you have created an app and have an API key, you will need to modify line 12 in the `src/providers/api/api.ts` and add your own key in the empty string:
```typescript
apiKey: string = '';
```

Note: DO NOT remove the logo at the bottom of the home screen of the app. Maybe you can put it on a different page but removing it will violate the Terms of Use for TheMovieDB, here is a link to their [FAQ](https://www.themoviedb.org/faq/api)


## License
The MovieCard Logo is Copyright &copy; Omar Quazi. Do not in any way or form reproduce or reuse this logo. If you wish to use the logo, ask me first! The rest of the code is MIT Licensed:

```
Copyright 2018 Omar Quazi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

> [Project 52](https://project52.tech) &nbsp;&middot;&nbsp;
> [Omar Quazi ](https://quazi.co) &nbsp;&middot;&nbsp;
> [@quaziomar ](https://instagram.com/quaziomar)
