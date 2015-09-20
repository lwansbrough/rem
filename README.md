# rem [early access]

Rem stands for React Extension Manager. With rem, your React Native apps can use modules that have a native implementation, like a video player or a library for push notifications.

Rem works with dependency managers like [npm](https://www.npmjs.com/) and [CocoaPods](https://cocoapods.org/) that may already be familiar to you. When using rem, you install npm packages and rem will add the native code to your app with the help of CocoaPods. Since rem is brand new, there may be some rough edges and we'd appreciate your feedback on it.

## Setting up rem

To use rem, you'll need [Node.js](https://nodejs.org), [Buck](https://buckbuild.com), and the rem program itself. We'll help you set these up in the way we're really happy with if you don't have them already.

### Installing Node.js

We recommend installing Node.js with [nvm](https://github.com/creationix/nvm), which is a script that lets you cleanly install and manage several versions of Node.js simultaneously.

#### nvm (recommended)

To set up nvm, run:
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
```

Next, install the newest version of Node.js:
```
nvm install stable
```

#### Other Methods

Node.js is available through [Homebrew](http://brew.sh/). Install brew and run:
```
brew install node
```

The official Node.js site also has a link to a Mac installer package. Visit https://nodejs.org.


### Installing rem

rem is available as an npm package via GitHub. Run:
```
npm install -g exponentjs/rem
```
Once rem is ready, we'll publish it to npm.

## Installing Modules with rem (for app developers)

React Native extensions are npm packages that include native code. Rem's job is to help integrate them in your app.

### 1. Set up rem (one-time)

The first time you use rem in your project, you will need to set up rem. By default, rem assumes that your JS project resides in your project's root directory, and Android/iOS specific code are in the `android` and `ios` directories respectively. This is how projects created with `react-native init` are set up. If this is the case for your project, run:
```
npm install rem --save-dev
rem init
```

For projects with different directory hierarchies, you can configure rem in your JS project's package.json file:
```js
// package.json
{
  "reactNativeApp": {
    // Path to the react-native package that provides the React Native library
    // code for your app. This path is relative to the directory that contains
    // your package.json file.
    "reactNativePath": "node_modules/react-native",
    // Maps your app's build targets to their respective directories relative
    // to this package.json file. The settings below are the default for
    // new React Native apps.
    "targetDirectories": {
      "android": "./android",
      "ios": "./ios"
    }
  }
}
```
Then run `npm install rem --save-dev && rem init`.

rem will create a BUCK file in your root project directory, or edit your existing one if you are already using Buck.

### 2. Install npm packages

Install npm packages with native code that you would like to use. For example, from your root project directory, run:
```
npm install react-native-url-handler
```

This step may take a minute or so, as rem will be using Buck to build the above module from its source files.

### 4. Run app

## Writing Modules for rem (for module authors)

### 1. Add the key `nativePackage` to your module's `package.json` file

_If your module doesn't rely on any native code that you or anyone else has written, i.e. no Obj-C or Swift or CocoaPods, then you can skip this; just make a regular npm module; it can include rem native modules as dependencies without you doing anything special._

Ex: (in `package.json`)
```json
  ...
  },
  "nativePackage": true,
  ...
```

### 2. Create a `.podspec` file for your module

This is where you will describe what native code -- the Obj-C you've written and any Swift or CocoaPods dependencies -- your module needs.

Make a file called `<your-package-name>.podspec` in the same directory as your `.xcodeproj` and `package.json`.

Start with this basic template and then modify it so it matches your own project.
```podspec
#
# Be sure to run `pod lib lint react-native-vibration.podspec' to ensure this is a
# valid spec and remove all comments before submitting the spec.
#
# Any lines starting with a # are optional, but encouraged
#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = "react-native-url-handler"
  s.version          = "0.0.2"
  s.summary          = "React Native URL Handler"
  s.license          = 'MIT'
  s.platform     = :ios, '7.0'
  s.requires_arc = true
  s.authors      = "James Ide <ide@sixfivezero.net>"
  s.homepage     = "https://github.com/650Industries/react-native-url-handler"
  s.source_files = 'ios/**/*.{h,m}'
end

````

In general, you can just copy/paste the above and update the fields. Make sure you update the name, version, summary, license, authors, and homepage fields.

* The line specifying `s.source_files` describes where your Objective-C code goes.

You can make it whatever you want, but setting it to `'ios/**/*.{h,m}'` is a good default. This will mean that you'll put your Obj-C code (`.h` and `.m` files) in a directory called `ios` anywhere underneath the root directory of your module, which is a pretty reasonable way to organize everything.

* If you use any Swift files, change the `s.platform` line to specify that it requires iOS 8

* In general, `s.name` should match the name of your module as specified in your `package.json`.

* For more information, look at [the podspec documentation](https://guides.cocoapods.org/syntax/podspec.html).


### 3. Test your module

You can test your module by installing it in a project you're using.

* Create or open an Xcode project that uses react-native
* Make sure that you have run `rem init` on the project. If you've done this correctly, then
  * There should be an `.xcworkspace` and a `Podfile` that have been setup
  * The `package.json` configuration should know where the Podfile is relative to the package.json
* Once you've done this, you can run `npm install <path-to-your-module's-directory>` from the directory containing your package.json. This will install the module using npm.
* After you've installed your module with npm, run `pod install` from the directory containing your Podfile. This will pull in any CocoaPods dependencies and make sure your Xcode project pulls in your Obj-C files properly.
* Once you've pod installed, rebuild and run your app. **Just reloading with `⌘-R` is not sufficient since you've included new functionality in the binary!**
* To test your module, you'll need to change your app's React Native JS code to use the module. Try adding a line that `require`s it and uses the component.
* If you don't make any changes to the binary, you can just `⌘-R` to reload and you can still use your native module.
* If you change your native module's source code (any of it), you'll need to run `npm install` again (since that will copy it over from the directory where you've been developing it). If you changed Obj-C code, you'll need to run `pod install` again.

### 4. Publish your module to npm
You publish rem modules the same you way you would publish any other npm package.

Some guidelines so that these modules can be properly identified and categorized:
* Start your package names with the prefix `react-native-`
* Include the keyword `react-native` when you publish
## How it Works

`rem` uses [CocoaPods](https://cocoapods.org/) and [npm](https://www.npmjs.com/) which are the most popular packaging tools for iOS and JS, respectively.

When you run `rem init`:
* A `Podfile` is created for you, if necessary
* A rem section is added to your Podfile that contains code that will
  * Run a script that traverses all the node_modules used by your package, looking for ones that set `nativePackage` to true
  * Pull the podspecs referenced by those packages into your project workspace

## Contributors

* @ide
* @TomMcHugh
* @ccheever

There are many ways that `rem` can be improved! Open issues with any feedback or questions and feel free to submit pull requests.

Some ideas for enhancements:
* Better resolution and error handling if two modules depend on different incompatible versions of the same CocoaPod
* Something that will automatically run `pod install` when necessary (but not unnecessarily since that's slow...)

## Known Limitations
* Unlike with npm packages, native iOS code cannot contain different versions of the same library in an application. Therefore, an extension that relies on e.g. CocoaLumberjack 1.x and another extension relies on CocoaLumberjack 2.x will not be able to coexist.
* If Obj-C source code from different modules uses the same symbols (e.g. class names, etc.), then those will conflict.

## Android
When React Native is released for Android, we'll add Android support to this. rem modules should support both iOS and Android (or at least just give an error saying the platform isn't supported...)
