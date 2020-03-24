# Simple phonegap plugin to get Android installed apps with base64 icons

![Version](https://img.shields.io/npm/v/cordova-plugin-intent-list/latest.svg)
![Downloads](https://img.shields.io/npm/dt/cordova-plugin-intent-list.svg)
[![Platforms](https://img.shields.io/badge/platforms-Android-lightgrey.svg)](https://github.com/jnick-denry/cordova-plugin-intent-list)
![License](https://img.shields.io/npm/l/cordova-plugin-intent-list.svg)
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6MZ5YRYEDSVSQ&source=url" title="Donate once-off to this project using Paypal">
        <img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPayl donate button" />
    </a>

Demo.

<img src="https://user-images.githubusercontent.com/1450983/55368734-1c9c2e00-54fc-11e9-9651-309c5a94399a.png" width="auto" height="400" />

## 1. Installation

    cordova plugin add cordova-plugin-intent-list

or directly via git (unstable)

    cordova plugin add https://github.com/nick-denry/cordova-plugin-intent-list

## 2. Usage

```js
navigator.IntentList.getList(success, error);
```

```js
navigator.IntentList.getList(function(applist) {
    console.log(applist);
}, function(errorMesssage) {
    console.log(errorMesage);
});
```

`applist` will contain array of JSON objects.

```json
[
  {
    "label": "Chrome",
    "package": "com.android.chrome",
    "packageIcon": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAABHNCSVQICAgIfAhkiAAAIABJREF..."
  },
  ...
]

```

## 3. Update Content Security Policy

Add `img-src 'self' data:;` to your CSP declaration to allow `data:image` images, i.e.:
```html
<!-- This is a wide open CSP declaration. To lock this down for production, see below. -->
<meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' gap:; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src *" />
```
⚠️ __NOTE__ Do not use wide open CSP declaration in production. @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/#content-security-policy


## 4. Credits

- [Nick Denry](https://github.com/nick-denry)
- [All Contributors](../../contributors)


## 5. License

Licensed under Apache 2.0. Please see [License File](LICENSE) for more information.
