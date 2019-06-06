# Woleet widgets (version 2)

## Build

```bash
npm i
npm run build
```

# File Hasher widget

This widget allows to drop or download a file, compute its hash and preview it.

## Integration

To integrate one or several widgets in a web page, first insert the following code:

```javascript
<script>
  (function (d,s,i,f) {
    var js = d.createElement(s); var fjs = d.getElementsByTagName(s)[0];
    js.id = i; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'file-hasher-widget', '<url_to_script>/file-hasher-widget.js'));
</script>
```

Note that you need to replace *<url_to_script>* with the actual path of the script.

Then, instantiate the widget by creating a `<div>` tag with a `class="file-hasher-widget"` attribute:

```html
<div class="file-hasher-widget"></div>
```

## Configuration

### Attributes

The following attributes can be set on `<div>` tag to configure the look and behavior of the widget (see [Usage](#Usage) for more details).

* __lang__ - Language of the widget (the browser language is used by default).
 
 Possible values are `'en'` or `'fr'`.

* __id__ - Identifier of the widget.
 
 If it isn't defined it is generated by the widget (ex. _file-hasher-widget-00becbf7-f2d5-37c5-1b48-961c7389c900_).

* __styles__ - Styling options:
    
    * __width__ - width of the widget; _DEFAULT_: ___130px___
    
    * __align__ - alignment of elements inside the widget; _DEFAULT_: ___center___
       
       Possible values are `left`, `center`, `right`
    
    * __icon__ - Widget icons styles:
    
        * __width__ - width of the icons; _DEFAULT_: ___null___
        
        * __color__ - color of the icons; _DEFAULT_: ___#696969___
        
    * __preview__ - Preview zone styles:
    
        * __icon__ - reset, next and previous page icons styles;
                    
            * __color__ - color of the icons; _DEFAULT_: ___#FF9494___
        
    * __progress__ - Progress bar styles:
    
        * __icon__ - cancel icon styles
            
            * __color__ - color of the icon; _DEFAULT_: ___#FF9494___
        
    * __hash__ - Hash label styles:
    
        * __color__ - color of hash text; _DEFAULT_: ___#FFF___
    
        * __background__ - background color of the hash text; _DEFAULT_: ___#00A2FF___
        
* __visibility__ - Visibility options:
    
    * __title__ - visibility of the title; _DEFAULT_: ___true___
    
    * __filename__ - visibility of the file name; _DEFAULT_: ___true___
    
    * __progress__ - visibility of the progress bar; _DEFAULT_: ___true___
    
    * __hash__ - visibility of the hash label; _DEFAULT_: ___true___
    
    * __controls__ - visibility of the widget controls;
       
       * __reset__ - visibility of reset icon; _DEFAULT_: ___true___
    
* __file__ - Downloaded file options:
    
    * __url__ - URL of the file to download
    
    * __fastDownload__ - download the file as soon as the widget is initialized;  _DEFAULT_: ___false___

* __observers__ - callback functions called by the widget

    * __downloadingStarted__ - is called once the file is started to download. Parameters: ___widgetId___, ___url___;

    * __downloadingProgress__ - is called once the file downloading progress is changed. Parameters: ___widgetId___, ___progress (in percent)___;
    
    * __downloadingCanceled__ - is called once the file downloading is canceled. Parameters: ___widgetId___;
    
    * __downloadingFinished__ - is called once the file is downloaded. Parameters: ___widgetId___, ___downloaded file___;
    
    * __hashingStarted__ - is called once the hashing process is started. Parameters: ___widgetId___, ___hashed file___;
    
    * __hashingCanceled__ - is called once the hashing process is canceled. Parameters: ___widgetId___;
    
    * __hashingProgress__ - is called once the hashing progress has changed. Parameters: ___widgetId___, ___progress___ (_in percents_);
    
    * __hashCalculated__ - is called once the file is hashed. Parameters: ___widgetId___, ___hash___, ___hashed file___;
    
    * __widgetReset__ - is called when the widget is reset. Parameters: ___widgetId___;

### Usage

There are several ways to configure the widget:

* All parameters are in the attribute <b>config</b> as JSON object:

```html
<div class="file-hasher-widget" config='{"file": {"url": "http://pngimg.com/uploads/google/google_PNG19644.png"}, "styles": {"width": 250}, "observers": {"hashCalculated": "hashCalculated", "fileDownloaded": "fileDownloadedObserver"}}'></div>
```
* The parameters are attributes of the HTML element:

```html
<div class='file-hasher-widget'
     lang='fr'
     styles='{"width": 150}'
     file='{"url": "http://pngimg.com/uploads/google/google_PNG19634.png", "fastDownload": true}'
     observers='{"hashCalculated": "test.hashCalculated"}'></div>
 ```
* If a option has nested options they can be set also as HTML attributes by joining via '-' in lower case:

```html
<div class='file-hasher-widget' id='file-hasher-widget-de'
     observers-hashCalculated='window.hashCalculated'
     styles-width='270'
     lang='de'></div>
```

The dynamic initialization is also available. It is realized using the method __init__ of the widget. The an example in the file [examples/file-hasher-widget-delayed-several-instances-example.html](examples/file-hasher-widget-delayed-several-instances-example.html)

```html
<div class='file-hasher-widget' id='file-hasher-widget-de'
     observers-hashCalculated='window.hashCalculated'
     styles-width='270'
     lang='de'></div>
```

## Examples

### Embed the widget in a regular web page

See [examples/file-hasher-widget-example.html](examples/file-hasher-widget-example.html) for an example about how to insert the widget in a web page.

### Embed the widget in an Angular2+ web app

Go to `examples/angular2/file-hasher-widget` and read [README.md](examples/angular2/file-hasher-widget/README.md) to install and run a demo Angular2+ application using the widget.

See [index.html](examples/angular2/file-hasher-widget/src/index.html) and [app.component.html](examples/angular2/file-hasher-widget/src/app/app.component.html)
for an example about how to insert the widget in an Angular2+ application.

An example of a working Angular2+ component using the widget can be found in the [components](examples/angular2/file-hasher-widget/src/app/components) directory.

## Development

### Proxy Server

To allow the widget to download a file, the file URL must be proxied or the URL must support CORS.

For testing, a Node.js server is provided. This simple server simply redirect the resource flow to the widget.
Execute next command to launch the server:

```bash
cd ./server
node app
```

# Proof Verifier widget

This widget allows to verify and display a proof independently from Woleet.

TODO
