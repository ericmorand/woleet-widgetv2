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
       
* __proxy__ - A proxy to download external files via XMLHttpRequest:
           
    * __url__ - the proxy URL; _DEFAULT_: ___null___
           
    * __enabled__ - the proxy state; _DEFAULT_: ___false___
    
* __file__ - Downloaded file options:
    
    * __url__ - URL of the file to download
    
    * __fastDownload__ - download the file as soon as the widget is initialized; _DEFAULT_: ___false___

* __observers__ - callback functions called by the widget

    * __downloadingStarted__ - is called once the file is started to download. Parameters: ___widgetId___, ___url___;

    * __downloadingProgress__ - is called once the file downloading progress is changed. Parameters: ___widgetId___, ___progress (in percent)___;
    
    * __downloadingCanceled__ - is called once the file downloading is canceled. Parameters: ___widgetId___;
    
    * __downloadingFinished__ - is called once the file is downloaded. Parameters: ___widgetId___, ___downloaded file___;
    
    * __downloadingFailed__ - is called once the file is failed. Parameters: ___widgetId___, ___error code___, ___response status___, ___response message___;
    
    Possible codes:
         
            url_not_found - the download url is wrong;
            
            cors - CORS policy issue;
    
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

## Integration

To integrate one or several widgets in a web page, first insert the following code:

```javascript
<script>
  (function (d,s,i,f) {
    var js = d.createElement(s); var fjs = d.getElementsByTagName(s)[0];
    js.id = i; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'proof-verifier-widget', '<url_to_script>/proof-verifier-widget.js'));
</script>
```
Note that you need to replace *<url_to_script>* with the actual path of the script.

Then, instantiate the widget by creating a `<div>` tag with a `class="proof-verifier-widget"` attribute:

```html
<div class="proof-verifier-widget"></div>
```

## Configuration

### Attributes

The following attributes can be set on `<div>` tag to configure the look and behavior of the widget (see [Usage](#Usage) for more details).

* __lang__ - Language of the widget (the browser language is used by default).
 
 Possible values are `'en'` or `'fr'`.

* __id__ - Identifier of the widget.
 
 If it isn't defined it is generated by the widget (ex. _proof-verifier-widget-00becbf7-f2d5-37c5-1b48-961c7389c900_).
 
* __mode__ - The display mode of the widget. _DEFAULT_: ___icon___
 
 Possible values are `icon`, `banner`, `panel`

* __styles__ - Styling options:
    
    * __zindex__ - z-index of the panel block; _DEFAULT_: ___3___
    
    * __icon__ - Widget icon styles:
    
        * __width__ - width of the icon; _DEFAULT_: ___null___
        
        * __height__ - height of the icon; _DEFAULT_: ___null___
        
    * __banner__ - Widget banner styles:
        
        * __width__ - width of the banner; _DEFAULT_: ___600px___
        
        * __color__ - the banner text color;_DEFAULT_: ___#31708f___
                
        * __background__ - the banner background color;_DEFAULT_: ___#dff0d8___
            
    * __panel__ - Widget panel styles:
            
        * __width__ - width of the panel; _DEFAULT_: ___null___
            
        * __height__ - height of the panel; _DEFAULT_: ___400px___
        
        * __color__ - the title color of panels;_DEFAULT_: ___#333___
        
        * __background__ - the background color of panels;_DEFAULT_: ___#dff0d8___
        
        * __header__ - the styles of sections headers:
                
            * __color__ - the header color;_DEFAULT_: ___#31708f___
            
        * __control__ - the styles of the control section:
                
            * __color__ - the link color;_DEFAULT_: ___#31708f___
            
            * __background__ - the background color;_DEFAULT_: ___#eee___
            
        * __value__ - the value styles:
        
            * __color__ - the value color;_DEFAULT_: ___#31708f___
        
            * __background__ - the background value color;_DEFAULT_: ___none___
            
            * __style__ - the decoration style of the value element
            
                * __anchoredHash__ - The styles of the anchored hash value:
            
                    * __color__ - the value color of the anchored hash value;_DEFAULT_: ___#31708f___
                        
                    * __background__ - the background value color of the anchored hash value;_DEFAULT_: ___#D7E9F6___
                    
                * __signedHash__ - The styles of the signed hash value:
                        
                     * __color__ - the value color of the the signed hash value;_DEFAULT_: ___#fff___
                     
                     * __background__ - the background value color of the signed hash value;_DEFAULT_: ___#31708f___
        
* __receipt__ - The receipt file option:
    
    * __url__ - the receipt file URL; _DEFAULT_: ___null___
    
* __endpoints__ - The endpoint configuration:
    
    * __transaction__ - the transaction endpoint; _DEFAULT_: ___https://blockstream.info/tx/$sourceId___
    
    Possible params:
     
        $sourceId - the transaction hash;
    
    * __verification__ - the verification endpoint; _DEFAULT_: ___https://share.woleet.io/api/receipt/verify___
    
    * __identification__ - the identification endpoint; _DEFAULT_: ___https://identity.woleet.io/identity___
       
* __verification__ - The receipt file verification:
           
    * __client__ - The option defined the side of the receipt verification; _DEFAULT_: ___true___
    
    If the option is *true*, the the client side (Woleet WebLibs) is used for the verification process.
    If the option is *false*, receipt is verified by Woleet API (ie. backend side).

### Usage

There are several ways to configure the widget:

* The parameters are attributes of the HTML element:

```html
<div class='proof-verifier-widget'
     lang='en'
     verification='{"server": false}'
     styles='{"banner": {"width": "450px"}}'
     receipt='{"url": "https://api.woleet.io/v1/receipt/54ceeadc-e2e2-4d37-b76c-432ddf4b3967&name=Terms%20of%20Servicev3_20180727.pdf"}'
></div>
 ```
* If a option has nested options they can be set also as HTML attributes by joining via '-' in lower case:

```html
<div class='proof-verifier-widget'
     lang='fr'
     mode="banner"
     verification-client="false"
     styles-banner-width="650px"
     styles-zIndex="20"
     receipt-url='https://api.woleet.io/v1/receipt/54ceeadc-e2e2-4d37-b76c-432ddf4b3967&name=Terms%20of%20Servicev3_20180727.pdf'
></div>
```

The dynamic initialization is also available. It is realized using the method __init__ of the widget. The an example in the file [examples/proof-verifier-widget-delayed-several-instances-example.html](examples/proof-verifier-widget-delayed-several-instances-example.html)

## Examples

### Embed the widget in a regular web page

See [examples/proof-verifier-widget-example.html](examples/proof-verifier-widget-example.html) for an example about how to insert the widget in a web page.

### Embed the widget in an Angular2+ web app

Go to `examples/angular2/proof-verifier-widget` and read [README.md](examples/angular2/proof-verifier-widget/README.md) to install and run a demo Angular2+ application using the widget.

See [index.html](examples/angular2/proof-verifier-widget/src/index.html) and [app.component.html](examples/angular2/proof-verifier-widget/src/app/app.component.html)
for an example about how to insert the widget in an Angular2+ application.

An example of a working Angular2+ component using the widget can be found in the [components](examples/angular2/proof-verifier-widget/src/app/file-verifier-widget) directory.
