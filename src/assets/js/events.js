import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );
	
	document.querySelector( '#toggle-chat-pane1' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane1' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane1' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge1();
            }
        }, 300 );
    } );
    
    document.querySelector( '#toggle-chat-pane2' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane2' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

      
    } );


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );


    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector( '#err-msg' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?bridge=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `Bridge successfully created. Click <a href='${ roomLink }'>here</a> to enter room.
                Share the bridge link with your partners.<br><p style="font-size:12px">${ roomLink }<button class="btn" onclick="navigator.clipboard.writeText('${ roomLink }')
  .then(() => {
    console.log('Text copied to clipboard');
  })
  .catch(err => {
    // This can happen if the user denies clipboard permissions:
    console.error('Could not copy text: ', err);
  });">    <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/copy1.JPG" title="COPY" onmouseover="this.src='https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/copy2.JPG'" onmouseout="this.src='https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/copy1.JPG'" onclick="myFunction()" ></button></p>
  <a href="https://www.facebook.com/sharer.php?u=${roomLink}"><img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/facebook.JPG" height="24" width="24"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://api.whatsapp.com/send?text=[post-title] ${ roomLink }"><img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/instagram.jfif" height="24" width="24"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://api.whatsapp.com/send?text=[post-title] ${ roomLink }"><img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/whatsapp.png" height="24" width="24"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://twitter.com/share?url=${ roomLink }&text=[post-title]&via=[via]&hashtags=[hashtags]"><img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/twitter.jfif" height="24" width="24"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
  `;


            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
