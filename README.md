# Freedrum for RevealJS

# Presentation

This is a script allowing to use [Freedrum](https://www.freedrum.rocks/) sticks to navigate through slides into a RevealJS application, using the [Web Bluetooth API](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web).

# Video

# Add to your project

Simply add the freedrum.js script into your ReavealJS project and the following script tag into your index.html file.
```
<script src="path-to-file/freedrum.js></script>
```

## Explanation

The bluetooth sensors emits signals as an array of 5 integers.
We focus on the third and the fourth one to interact with RevealJS.

The third one is the command sent when a movement starts (`153`) and ends (`138`).
The fourth one is the note, corresponding to a position in space around you into a 90° angle :

![](https://images.squarespace-cdn.com/content/v1/58526a61d1758e4403c019d7/1561472013486-8LKE6ZICQQD2Q66SWSF3/ke17ZwdGBToddI8pDm48kIisVeufsLaqPYS75OuX1FxZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGUIyZMpo6jDvOlV8ELZznZDi-rr9EJ6o3n8IpvEJDIMaEcAfnVBrEqrgp1UxUHGkY/HorizontalAngles.gif?format=750w)


The note will also be different depending on the vertical position of your sensor when moving it, based on two layers levels :

![](https://images.squarespace-cdn.com/content/v1/58526a61d1758e4403c019d7/1561466544904-91P6R77YIEVWNG96QVFT/ke17ZwdGBToddI8pDm48kIisVeufsLaqPYS75OuX1FxZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGUIyZMpo6jDvOlV8ELZznZDi-rr9EJ6o3n8IpvEJDIMaEcAfnVBrEqrgp1UxUHGkY/VerticalAngles.gif?format=750w)

> For example the sensor will emit a note with the value of `38` when moving on lower layer in front of you and a value of `50` when moving on upper later still in front of you.

To trigger navigation on top of these notes, use [RevealJS API](https://github.com/hakimel/reveal.js/#api)

# Default settings

```
switch(note) {
          case 38: 
            Reveal.down();
            break;
          case 50:
           Reveal.up();
            break;
          case 41:
          case 51 :
            Reveal.right();
            break;
          case 42:
          case 57:  
           Reveal.left();
           break;
        }
```

# Trigger delay

As the sensors are really sensitive, there is a delay of `300 milliseconds` to avoid passing through several slides at once.

```
setTimeout(() =>  isTriggerReady = true , 300);
```

