# Frog In

A brief description of what this project does and who it's for


## Demo

Insert youtube link


## Features

- Log in screen
- Google log in auth integration



## Run Locally

Note: we have only tested installation on windows with android emulator

### Step 0

Install Java 17.0.11
https://www.oracle.com/sg/java/technologies/downloads/#java17

Install Android Studio Jellyfish
https://developer.android.com/studio

Install Node.js v20.14.0 (LTS)
https://nodejs.org/en/


Create environment variable paths for the Java SDK and Android SDK

- In the Windows search menu, enter: "Edit the system environment variables", this will open the System Properties window.
- Choose Environment Variables... and then choose New... under User variables.
- Enter the Variable name and value (path). If you've chosen a specific location to install the Java and Android SDKs, be sure to update the variable paths accordingly.
- JAVA_HOME: C:\Program Files\Java\Java17
- ANDROID_HOME: C:\Users\username\AppData\Local\Android\Sdk

### Step 1

Download files into folder

### Step 2

Launch Android Studio and start an emulator (we recommend Pixel 8)

### Step 3

In the folder, run

```bash
  npx react-native run-android
```
