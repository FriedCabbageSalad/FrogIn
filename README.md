# FrogIn

## Problem Statement
Remaining productive in life is as fickle as always, so why not focus up with the help of a little
application? Introducing, FrogIn a portmanteau of Frog and the colloquial phrase “lock in”
meaning “to get focused and commit to something”. FrogIn will aid not only students around
the globe but also the everyday man who wishes to concentrate and complete the tasks they
have set for themselves. We all had our moments where we desire to put aside the major distraction we all now carry with us: our phones. As such, we seek to put forward a mobile application that solves this.

## Solution
We hope to create an application that would remove distractions posed by our mobile devices
by essentially locking the phone for a set amount of time dictated by the user. During this
time, the phone will be unable to receive notifications or swap to a different screen bar for
emergencies. Users will be incentivised to see through their dedication by way of gamification.
When they start the timer, they will be given a frog egg, which over the course of the timer,
will mature and grow into fully fledged adults! However, should the user abscond their
commitment, the frog will sadly pass away instead. Users will be able to collect and display
the various frogs collected in a personal “pond” where the frogs will live.

## Demo

Insert youtube link


## Features

### Account Related
- Log in with email and password
- Log in with Google account
- Forget password email service
- Account and data deletion service
- Progress is tied to account, log in on any device to restore

### Game Related
- Phone lock funtionality
- Countdown timer
- Frog growing animation (in progress)


### Profile Related
- Frog pond (in progress)
- Profile picture (in progress)
- Achievements (in progress)
- Adding friends (in progress)

## App FLow

![App Flow](https://github.com/FriedCabbageSalad/FrogIn/assets/156411680/adfb998f-074a-462b-8fad-129014f7ea80)

##  Software Architecture

![Software Architecture](https://github.com/FriedCabbageSalad/FrogIn/assets/156411680/07623da3-9a5d-4364-a101-ca2f826437b6)

## Run Locally

While the app cannot access backend servers without API keys, the files are provided to run various screens locally either on a phone emulator or a real phone.

Note: only installation on windows with an android emulator has been tested

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
