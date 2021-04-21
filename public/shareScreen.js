

async function getScreenshareWithMicrophone() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaStream([audio.getTracks()[0], stream.getTracks()[0]]);
}

document.getElementById('shareScreen').onclick = async () => {
    document.querySelector('#cameraBtn').disabled = true;
    document.querySelector('#joinBtn').disabled = false;
    document.querySelector('#createBtn').disabled = false;
    document.querySelector('#hangupBtn').disabled = false;

    const stream = await getScreenshareWithMicrophone();
    console.log('got', stream.getTracks());
    document.querySelector('#localVideo').srcObject = stream;


    peerConnection = new RTCPeerConnection(configuration);
    registerPeerConnectionListeners();
    localStream.getTracks().forEach(track => {
        peerConnection.replaceTrack(track, localStream);
    })


    // peerConnection.getSenders().forEach(
    //     function (rtpSender) {
    //         if (rtpSender.track.kind == 'video') {
    //             rtpSender.replaceTrack(screen.getVideoTracks()[0]).then(function () {
    //                 console.log("Replaced video track from camera to screen");
    //             }).catch(function (error) {
    //                 console.log("Could not replace video track: " + error);
    //             });
    //         }
    //     }
    // );

    // peerConnection.addEventListener('track', event => {
    //     console.log('Got remote track:', event.streams[0]);
    //     event.streams[0].getTracks().forEach(track => {
    //         console.log('Add a track to the remoteStream:', track);
    //         remoteStream.addTrack(track);
    //     });
    // });

    // stream.getTracks().forEach(function (track) {
    //     // remote
    //     qcClient.calls.values().forEach(function (call) {
    //         var sender = call.pc.getSenders().find(function (s) {
    //             return s.track.kind == track.kind;
    //         });
    //         sender.replaceTrack(track);
    //     });
    // });
};




// document.getElementById('share-button').addEventListener('click', async () => {
//     if (!displayMediaStream) {
//         displayMediaStream = await navigator.mediaDevices.getDisplayMedia();
//     }
//     senders.find(sender => sender.track.kind === 'video').replaceTrack(displayMediaStream.getTracks()[0]);

//     //show what you are showing in your "self-view" video.
//     document.getElementById('self-view').srcObject = displayMediaStream;

//     //hide the share button and display the "stop-sharing" one
//     document.getElementById('share-button').style.display = 'none';
//     document.getElementById('stop-share-button').style.display = 'inline';
// });