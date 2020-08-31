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

You can also integrate it directly like this:

```html
<script type="text/javascript" id="file-hasher-widget" src="<url_to_script>/file-hasher-widget.js"></script>
```

Note that you need to replace *<url_to_script>* with the actual path of the script.

Then, instantiate the widget by creating a `<div>` tag with a `class="file-hasher-widget"` attribute:

```html
<div class="file-hasher-widget"></div>
```

## Configuration

### Attributes

The following attributes can be set on `<div>` tag to configure the look and behavior of the widget (see [Usage](#Usage) for more details).

* __id__ - Identifier of the widget.
 
 If it isn't defined it is generated by the widget (ex. _file-hasher-widget-00becbf7-f2d5-37c5-1b48-961c7389c900_).

* __styles__ - Styling options:
    
    * __icons__ - Widget icons styles:
        
        * __color__ - color of the icons; _DEFAULT_: ___#000___
       
* __icons__ - The option to customize widget icons:
    
    * __import__ - The icon URL of the drop container; _DEFAULT_: ___fa-file-import___
    
    * __download__ - The icon URL of the download file container; _DEFAULT_: ___fa-download___
       
* __proxy__ - A proxy to download external files via XMLHttpRequest:
           
    * __url__ - the proxy URL; _DEFAULT_: ___null___
           
    * __enabled__ - the proxy state; _DEFAULT_: ___false___
    
* __file__ - Downloaded file options:
    
    * __url__ - URL of the file to download

* __observers__ - callback functions called by the widget

    * __downloadingStarted__ - is called once the file is started to download. Parameters: ___widgetId___, ___url___;

    * __downloadingProgress__ - is called once the file downloading progress is changed. Parameters: ___widgetId___, ___progress (in percent)___;
    
    * __downloadingCanceled__ - is called once the file downloading is canceled. Parameters: ___widgetId___;
    
    * __downloadingFinished__ - is called once the file is downloaded. Parameters: ___widgetId___, ___downloaded file___;
    
    * __downloadingFailed__ - is called once the file is failed. Parameters: ___widgetId___, ___error code___, ___response status___, ___response message___;
    
    Possible codes:
         
            url_not_found - the download url is wrong;
            
            cors - CORS policy issue;
    
    * __hashingStarted__ - is called once the hashing process is started. Parameters: ___widgetId___, ___hashed file___, ___isPreviewable___;
    
    * __hashingCanceled__ - is called once the hashing process is canceled. Parameters: ___widgetId___;
    
    * __hashingProgress__ - is called once the hashing progress has changed. Parameters: ___widgetId___, ___progress___ (_in percents_);
    
    * __hashCalculated__ - is called once the file is hashed. Parameters: ___widgetId___, ___hash___, ___hashed file___;
    
    * __widgetReset__ - is called when the widget is reset. Parameters: ___widgetId___;

### Usage

There are several ways to configure the widget:

* All parameters are in the attribute <b>config</b> as JSON object:

```html
<div class="file-hasher-widget" config='{"file": {"url": "http://pngimg.com/uploads/google/google_PNG19644.png"}, "observers": {"hashCalculated": "hashCalculated", "fileDownloaded": "fileDownloadedObserver"}}'></div>
```
* The parameters are attributes of the HTML element:

```html
<div class='file-hasher-widget'
     lang='fr'
     file='{"url": "http://pngimg.com/uploads/google/google_PNG19634.png"}'
     observers='{"hashCalculated": "test.hashCalculated"}'></div>
 ```
* If a option has nested options they can be set also as HTML attributes by joining via '-' in lower case:

```html
<div class='file-hasher-widget'
     id='file-hasher-widget-de'
     observers-hashCalculated='window.hashCalculated'
     lang='fr'></div>
```

The dynamic initialization is also available. It is realized using the method __init__ of the widget. The an example in the file [examples/file-hasher-widget-delayed-several-instances-example.html](examples/file-hasher-widget-delayed-several-instances-example.html)

You can dynamically reset the widget while keeping the same configuration with the method __reset__ of the widget.

## Examples

### Embed the widget in a regular web page

See [examples/file-hasher-widget-example.html](examples/file-hasher-widget-example.html) for an example about how to insert the widget in a web page.

## Development

### Proxy Server

To allow the widget to download a file, the file URL must be proxied, or the URL must support CORS.

For testing, a Node.js server is provided. This simple server simply redirect the resource flow to the widget.
Execute next command to launch the server:

```bash
cd ./server
node app
```
