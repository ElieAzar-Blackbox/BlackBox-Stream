async function getScreenshareWithMicrophone() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaStream([audio.getTracks()[0], stream.getTracks()[0]]);
}

document.getElementById('shareScreen').onclick = async () => {
    const stream = await getScreenshareWithMicrophone();
    console.log('got', stream.getTracks());
    document.querySelector('#localVideo').srcObject = stream;
};