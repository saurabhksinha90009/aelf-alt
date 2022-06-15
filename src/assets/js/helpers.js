export default {
    generateRandomString() {
        const crypto = window.crypto || window.msCrypto;
        let array = new Uint32Array(1);
        
        return crypto.getRandomValues(array);
    },


    closeVideo( elemId ) {
        if ( document.getElementById( elemId ) ) {
            document.getElementById( elemId ).remove();
            this.adjustVideoElemSize();
        }
    },


    pageHasFocus() {
        return !( document.hidden || document.onfocusout || window.onpagehide || window.onblur );
    },


    getQString( url = '', keyToReturn = '' ) {
        url = url ? url : location.href;
        let queryStrings = decodeURIComponent( url ).split( '#', 2 )[0].split( '?', 2 )[1];

        if ( queryStrings ) {
            let splittedQStrings = queryStrings.split( '&' );

            if ( splittedQStrings.length ) {
                let queryStringObj = {};

                splittedQStrings.forEach( function ( keyValuePair ) {
                    let keyValue = keyValuePair.split( '=', 2 );

                    if ( keyValue.length ) {
                        queryStringObj[keyValue[0]] = keyValue[1];
                    }
                } );

                return keyToReturn ? ( queryStringObj[keyToReturn] ? queryStringObj[keyToReturn] : null ) : queryStringObj;
            }

            return null;
        }

        return null;
    },


    userMediaAvailable() {
        return !!( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
    },


    getUserFullMedia() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getUserMedia( {
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },


    getUserAudio() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getUserMedia( {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },



    shareScreen() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getDisplayMedia( {
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },


    getIceServer() {
        return {
            iceServers: [{   urls: [ "stun:bn-turn1.xirsys.com" ]}, {   username: "<<key>>",   credential: "<<cred>>",   urls: [       "turn:bn-turn1.xirsys.com:80?transport=udp",       "turn:bn-turn1.xirsys.com:3478?transport=udp",       "turn:bn-turn1.xirsys.com:80?transport=tcp",       "turn:bn-turn1.xirsys.com:3478?transport=tcp",       "turns:bn-turn1.xirsys.com:443?transport=tcp",       "turns:bn-turn1.xirsys.com:5349?transport=tcp"   ]}]
        };
    },


    addChat( data, senderType ) {
        let chatMsgDiv = document.querySelector( '#chat-messages' );
        let contentAlign = 'justify-content-end';
        let senderName = 'You';
        let msgBg = 'bg-white';

        if ( senderType === 'remote' ) {
            contentAlign = 'justify-content-start';
            senderName = data.sender;
            msgBg = '';

            this.toggleChatNotificationBadge();
        }

var b='';
var c='';
var d='[Tone: Neutral]';
if (data.msg=='hi')
{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hi.mp4" type="video/mp4"></video>';
}
else if (data.msg=='hello')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hello.mp4" type="video/mp4"></video>';
}
else if (data.msg=='where are you')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/whereareyou.mp4" type="video/mp4"></video>';
}
else if (data.msg=='how')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/how.mp4" type="video/mp4"></video>';
}
else if (data.msg=='how are')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/howare.mp4" type="video/mp4"></video>';
}
else if (data.msg=='how are you')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/howareyou.mp4" type="video/mp4"></video>';
}
else if (data.msg=='what is the status')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/whatisthestatus.mp4" type="video/mp4"></video>';
}
else if (data.msg=='what the hell')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/whatthehell.mp4" type="video/mp4"></video>';
	d='<span style="color:red;">[Tone: Anger]</span>';
}
else if (data.msg=='why homework is not done')
	{
	c='<video width="250" height="150" autoplay loop>  <source src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/whyhomeworkisnotdone.mp4" type="video/mp4"></video>';
    d='<span style="color:red;">[Tone: Fear]</span>';
} 
else
	{
	c='';
}
		for (var i = 0; i < data.msg.length; i++) {
  console.log(data.msg.charAt(i));
  if(data.msg.charAt(i)==' ')
  {b=b.concat(`&nbsp;&nbsp;&nbsp;`);
  }
  else if(data.msg.charAt(i)=='a')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/a.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='b')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/b.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='c')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/c.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='d')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/d.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='e')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/e.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='f')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/f.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='g')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/g.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='h')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/h.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='i')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/i.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='j')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/j.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='k')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/k.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='l')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/l.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='m')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/m.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='n')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/n.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='o')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/o.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='p')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/p.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='q')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/q.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='r')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/r.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='s')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/s.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='t')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/t.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='u')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/u.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='v')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/v.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='w')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/w.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='x')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/x.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='y')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/y.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='z')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/z.JPG" width="37" height="37"/>`);
		}
		 else if(data.msg.charAt(i)=='0')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/0.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='1')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/1.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='2')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/2.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='3')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/3.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='4')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/4.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='5')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/5.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='6')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/6.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='7')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/7.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='8')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/8.JPG" width="37" height="37"/>`);
		}
		else if(data.msg.charAt(i)=='9')
  {b=b.concat(`<img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/9.JPG" width="37" height="37"/>`);
		}
  else {
  b=b.concat(``);
  }
		}
        let infoDiv = document.createElement( 'div' );
        infoDiv.className = 'sender-info';
         infoDiv.innerHTML = `${b} <br> ${c} <br> ${ senderName } - ${ moment().format( 'Do MMMM, YYYY h:mm a' ) } &nbsp;&nbsp;<span  style="color:blue">${d}</span>`;

        let colDiv = document.createElement( 'div' );
        colDiv.className = `col-10 card chat-card msg ${ msgBg }`;
        let a= (data.msg=='hi')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hi.JPG" width="150" height="70"/>`:(data.msg=='hai')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hi.JPG" width="150" height="70"/>`:(data.msg=='hello')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hello.JPG" width="200" height="70"/>`:(data.msg=='how')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/how.JPG" width="200" height="70"/>`:(data.msg=='hello')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/hello.JPG" width="200" height="70"/>`:(data.msg=='how are')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/how%20are.JPG" width="200" height="70"/>`:(data.msg=='how are you')?` <img src="https://texttosignlanguage.s3.jp-tok.cloud-object-storage.appdomain.cloud/how%20are%20you.JPG" width="250" height="70"/>`:``; 
		
        colDiv.innerHTML = xssFilters.inHTMLData( data.msg ).autoLink( { target: "_blank", rel: "nofollow"});

        let rowDiv = document.createElement( 'div' );
        rowDiv.className = `row ${ contentAlign } mb-2`;


        colDiv.appendChild( infoDiv );
        rowDiv.appendChild( colDiv );

        chatMsgDiv.appendChild( rowDiv );

        /**
         * Move focus to the newly added message but only if:
         * 1. Page has focus
         * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
         */
        if ( this.pageHasFocus ) {
            rowDiv.scrollIntoView();
        }
    },


    toggleChatNotificationBadge() {
        if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
            document.querySelector( '#new-chat-notification' ).setAttribute( 'hidden', true );
        }

        else {
            document.querySelector( '#new-chat-notification' ).removeAttribute( 'hidden' );
        }
    },
	
	addChat1( data, senderType ) {
        let chatMsgDiv = document.querySelector( '#chat-messages1' );
        let contentAlign = 'justify-content-end';
        let senderName = 'You';
        let msgBg = 'bg-white';

        if ( senderType === 'remote' ) {
            contentAlign = 'justify-content-start';
            senderName = data.sender;
            msgBg = '';

            this.toggleChatNotificationBadge1();
        }

        let infoDiv = document.createElement( 'div' );
        infoDiv.className = 'sender-info';
        infoDiv.innerHTML = `${ senderName } - ${ moment().format( 'Do MMMM, YYYY h:mm a' ) }`;

        let colDiv = document.createElement( 'div' );
        colDiv.className = `col-10 card chat-card msg ${ msgBg }`;
        colDiv.innerHTML = xssFilters.inHTMLData( data.msg ).autoLink( { target: "_blank", rel: "nofollow"});

        let rowDiv = document.createElement( 'div' );
        rowDiv.className = `row ${ contentAlign } mb-2`;


        colDiv.appendChild( infoDiv );
        rowDiv.appendChild( colDiv );

        chatMsgDiv.appendChild( rowDiv );

        /**
         * Move focus to the newly added message but only if:
         * 1. Page has focus
         * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
         */
        if ( this.pageHasFocus ) {
            rowDiv.scrollIntoView();
        }
    },


    toggleChatNotificationBadge1() {
        if ( document.querySelector( '#chat-pane1' ).classList.contains( 'chat-opened' ) ) {
            document.querySelector( '#new-chat-notification1' ).setAttribute( 'hidden', true );
        }

        else {
            document.querySelector( '#new-chat-notification1' ).removeAttribute( 'hidden' );
        }
    },



    replaceTrack( stream, recipientPeer ) {
        let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find( s => s.track && s.track.kind === stream.kind ) : false;

        sender ? sender.replaceTrack( stream ) : '';
    },



    toggleShareIcons( share ) {
        let shareIconElem = document.querySelector( '#share-screen' );

        if ( share ) {
            shareIconElem.setAttribute( 'title', 'Stop sharing screen' );
            shareIconElem.children[0].classList.add( 'text-primary' );
            shareIconElem.children[0].classList.remove( 'text-white' );
        }

        else {
            shareIconElem.setAttribute( 'title', 'Share screen' );
            shareIconElem.children[0].classList.add( 'text-white' );
            shareIconElem.children[0].classList.remove( 'text-primary' );
        }
    },


    toggleVideoBtnDisabled( disabled ) {
        document.getElementById( 'toggle-video' ).disabled = disabled;
    },


    maximiseStream( e ) {
        let elem = e.target.parentElement.previousElementSibling;

        elem.requestFullscreen() || elem.mozRequestFullScreen() || elem.webkitRequestFullscreen() || elem.msRequestFullscreen();
    },


    singleStreamToggleMute( e ) {
        if ( e.target.classList.contains( 'fa-microphone' ) ) {
            e.target.parentElement.previousElementSibling.muted = true;
            e.target.classList.add( 'fa-microphone-slash' );
            e.target.classList.remove( 'fa-microphone' );
        }

        else {
            e.target.parentElement.previousElementSibling.muted = false;
            e.target.classList.add( 'fa-microphone' );
            e.target.classList.remove( 'fa-microphone-slash' );
        }
    },


    saveRecordedStream( stream, user ) {
        let blob = new Blob( stream, { type: 'video/webm' } );

        let file = new File( [blob], `${ user }-${ moment().unix() }-record.webm` );

        saveAs( file );
    },


    toggleModal( id, show ) {
        let el = document.getElementById( id );

        if ( show ) {
            el.style.display = 'block';
            el.removeAttribute( 'aria-hidden' );
        }

        else {
            el.style.display = 'none';
            el.setAttribute( 'aria-hidden', true );
        }
    },



    setLocalStream( stream, mirrorMode = true ) {
        const localVidElem = document.getElementById( 'local' );

        localVidElem.srcObject = stream;
        mirrorMode ? localVidElem.classList.add( 'mirror-mode' ) : localVidElem.classList.remove( 'mirror-mode' );
    },


    adjustVideoElemSize() {
        let elem = document.getElementsByClassName( 'card' );
        let totalRemoteVideosDesktop = elem.length;
        let newWidth = totalRemoteVideosDesktop <= 2 ? '50%' : (
            totalRemoteVideosDesktop == 3 ? '33.33%' : (
                totalRemoteVideosDesktop <= 8 ? '25%' : (
                    totalRemoteVideosDesktop <= 15 ? '20%' : (
                        totalRemoteVideosDesktop <= 18 ? '16%' : (
                            totalRemoteVideosDesktop <= 23 ? '15%' : (
                                totalRemoteVideosDesktop <= 32 ? '12%' : '10%'
                            )
                        )
                    )
                )
            )
        );


        for ( let i = 0; i < totalRemoteVideosDesktop; i++ ) {
            elem[i].style.width = newWidth;
        }
    },


    createDemoRemotes( str, total = 6 ) {
        let i = 0;

        let testInterval = setInterval( () => {
            let newVid = document.createElement( 'video' );
            newVid.id = `demo-${ i }-video`;
            newVid.srcObject = str;
            newVid.autoplay = true;
            newVid.className = 'remote-video';

            //video controls elements
            let controlDiv = document.createElement( 'div' );
            controlDiv.className = 'remote-video-controls';
            controlDiv.innerHTML = `<i class="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
                <i class="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;

            //create a new div for card
            let cardDiv = document.createElement( 'div' );
            cardDiv.className = 'card card-sm';
            cardDiv.id = `demo-${ i }`;
            cardDiv.appendChild( newVid );
            cardDiv.appendChild( controlDiv );

            //put div in main-section elem
            document.getElementById( 'videos' ).appendChild( cardDiv );

            this.adjustVideoElemSize();

            i++;

            if ( i == total ) {
                clearInterval( testInterval );
            }
        }, 2000 );
    }
};
