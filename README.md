# monumentall
an app designed to honor people of diverse genders in public spaces

## how to get started
- git clone https://github.com/monumentall/monumentall.git
- cd monumentall
- npm install (if you run into `npm ERR! code EISGIT, Appears to be a git repo or submodule` error, run `rm -rf node_modules/*/.git/` and then npm install again. more details here: https://github.com/react-native-community/react-native-safe-area-view/issues/73)
- npm start (must have expo set up on your phone or computer)

## testing
- run tests with `npm test`
- update snapshot tests with `npx jest --updateSnapshot`

## component tree
- App
  - Homescreen
    - Explore
      - Landmark
      - Saved
      - Nearby
    - Map
      - MenuBtn
        - Menu
