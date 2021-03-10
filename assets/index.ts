import MediaPlayer from "./MediaPlayer";
import AutoPlay from "./plugins/AutoPlay";
import AutoPause from "./plugins/AutoPause";
import AdsPlugin from "./plugins/Ads/";

const video = document.querySelector("video");
const buttonPlay: HTMLMediaElement = document.querySelector("#play");
const buttonMute: HTMLMediaElement = document.querySelector("#mute");

const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay(), new AutoPause(), new AdsPlugin()],
});

buttonPlay.onclick = () => {
  player.isPaused() === true ? player.play() : player.pause();
  player.isActive = !player.isActive;
};

buttonMute.onclick = () => {
  player.toggleSound();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.log(error.message);
  });
}
