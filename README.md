# ReactNativeTraining2

## Overview

An Expo + React Native sample app built from the Expo tutorials. It lets you:

Pick an image from the device’s photo library

Add emoji stickers on top of the image (drag/scale/rotate)

Save the edited image back to the device

Along the way this project helped me learn:

Creating multiple screens and basic navigation

Working with device files & permissions in React Native / Expo

Managing component state, gestures, and simple image compositing

## Features

Image selection via expo-image-picker

Emoji picker & placeable emoji stickers

Canvas-style editing (move/scale/rotate emojis)

Export to PNG/JPG using expo-media-library (and optionally react-native-view-shot)

Basic multi-screen flow (e.g., Home → Editor → Save/Share)

Note: Feature names/components may differ slightly from the tutorial; the core flow is the same.

## Screens

Home / Pick Screen – choose a photo from camera roll

Editor Screen – overlay emojis, adjust layout, preview

Save Screen – save to device (and optionally share)

## Tech Stack

React Native (Expo)

expo-image-picker for media selection

expo-media-library for saving images
